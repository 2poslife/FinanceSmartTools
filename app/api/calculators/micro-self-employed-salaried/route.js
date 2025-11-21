import { requireAuth } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

// ========= Constants =========
const THRESHOLD = 90264;  // Income threshold
const MIN_MONTHLY = 241;  // Minimum monthly payment
const MIN_YEARLY = 2892;  // Minimum yearly payment (241 * 12)

// Rates for עצמאי (Self-employed only)
const MICRO_SELF_EMPLOYED_TAXABLE_FACTOR = 0.70;
const MICRO_SELF_EMPLOYED_NI_RATE = 0.0447;
const MICRO_SELF_EMPLOYED_HEALTH_RATE = 0.0323;

// Additional rates and fixed amounts
const REDUCED_NI_HIGH_RATE = 0.18;
const REDUCED_NI_LOW_RATE = 0.077;
const FIXED_AMOUNT_90264 = 6950;
const FIXED_BREAKDOWN_90264 = 4034.8;
const FIXED_HEALTH_90264 = 2915.5272;
const DEFINITION_THRESHOLD = 37608;
const INCOME_THRESHOLD_75216 = 75216;

// התשלום המינימאלי החודשי
const MIN_MONTHLY_NI = 140.09;
const MIN_MONTHLY_HEALTH = 101.23;
const MIN_MONTHLY_TOTAL = 241.0;

/**
 * Calculate costs for עצמאי (Self-employed only)
 * Uses rates: NI 4.47%, Health 3.23%
 */
export async function POST(request) {
    try {
        // Check authentication
        const authResult = requireAuth(request);
        if (authResult instanceof NextResponse) {
            return authResult; // Return error response
        }

        const data = await request.json();
        const { yearly_income: yearlyIncome } = data;

        // Validate inputs
        if (typeof yearlyIncome !== 'number' || yearlyIncome <= 0 || isNaN(yearlyIncome)) {
            return Response.json(
                { error: 'yearly_income must be a positive number' },
                { status: 400 }
            );
        }

        const yearly_income = yearlyIncome;

        // Taxable income (70% of yearly income)
        const taxable_income = yearly_income * MICRO_SELF_EMPLOYED_TAXABLE_FACTOR;

        // מלא (Full) - High rate calculations for income above 90264
        // D18 = IF(E7>90264, ((E7-90264)*0.1283), 0)
        const full_ni = yearly_income > THRESHOLD ? ((yearly_income - THRESHOLD) * 0.1283) : 0;

        // D19 = IF(E7>90264, ((E7-90264)*0.0517), 0)
        const full_health = yearly_income > THRESHOLD ? ((yearly_income - THRESHOLD) * 0.0517) : 0;

        // מופחת (Reduced) - Low rate calculations
        // E16 = IF(E7>90264, ((E7-90264)*0.18), 0)
        const reduced_ni_high = yearly_income > THRESHOLD ? ((yearly_income - THRESHOLD) * REDUCED_NI_HIGH_RATE) : 0;

        // E17 = IF(E7<90264, (E7*0.077), 6950)
        let reduced_ni_low;
        if (yearly_income < THRESHOLD) {
            reduced_ni_low = yearly_income * REDUCED_NI_LOW_RATE;
        } else {
            reduced_ni_low = FIXED_AMOUNT_90264; // Fixed amount for income >= 90264
        }

        // E18 = IF(E7<90264, (E7*0.0447), 4034.8)
        let reduced_ni_breakdown;
        if (yearly_income < THRESHOLD) {
            reduced_ni_breakdown = yearly_income * MICRO_SELF_EMPLOYED_NI_RATE;
        } else {
            reduced_ni_breakdown = FIXED_BREAKDOWN_90264; // Fixed amount for income >= 90264
        }

        // E19 = IF(E7<90264, (E7*0.0323), 2915.5272)
        let reduced_health;
        if (yearly_income < THRESHOLD) {
            reduced_health = yearly_income * MICRO_SELF_EMPLOYED_HEALTH_RATE;
        } else {
            reduced_health = FIXED_HEALTH_90264; // Fixed amount for income >= 90264
        }

        // D16 = E16+E17 (reduced NI total)
        const reduced_ni_total = reduced_ni_high + reduced_ni_low;

        // D17 = IF(E17<0, 0, E17)
        reduced_ni_low = Math.max(0, reduced_ni_low);

        // C18 = D18+E18 (full NI total)
        const total_ni = full_ni + reduced_ni_breakdown;

        // C19 = D19+E19 (full health total)
        const total_health = full_health + reduced_health;

        // Calculate monthly amounts before minimum check
        const ni_monthly_calc = total_ni / 12;
        const health_monthly_calc = total_health / 12;

        // Apply minimum check: MAX(calculated, minimum)
        const ni_monthly = Math.max(ni_monthly_calc, MIN_MONTHLY_NI);
        const health_monthly = Math.max(health_monthly_calc, MIN_MONTHLY_HEALTH);

        // Recalculate yearly totals from monthly amounts
        const final_ni = ni_monthly * 12;
        const final_health = health_monthly * 12;
        const yearly_total = final_ni + final_health;

        // Monthly prepayment
        const monthly_prepayment = yearly_total / 12;

        // Definition check
        const definition = yearly_income >= DEFINITION_THRESHOLD ? "עונה להגדרה" : "לא עונה להגדרה";

        // Income above minimum threshold (37,608) - only if income < 75,216
        const income_above_minimum = yearly_income < INCOME_THRESHOLD_75216 
            ? yearly_income - DEFINITION_THRESHOLD 
            : 0;

        return Response.json({
            inputs: {
                yearly_income: yearly_income,
                taxable_income: Math.round(taxable_income),
                income_above_minimum: Math.round(income_above_minimum),
                definition: definition,
                calculation_type: "עצמאי"
            },
            full_rate: {
                national_insurance: Math.round(full_ni),
                health_tax: Math.round(full_health)
            },
            reduced_rate: {
                national_insurance_high: Math.round(reduced_ni_high),
                national_insurance_low: Math.round(reduced_ni_low),
                national_insurance_breakdown: Math.round(reduced_ni_breakdown),
                health_tax: Math.round(reduced_health),
                national_insurance_total: Math.round(reduced_ni_total)
            },
            totals: {
                national_insurance: Math.round(final_ni),
                health_tax: Math.round(final_health),
                yearly_total: Math.round(yearly_total)
            },
            monthly: {
                national_insurance: Math.round(ni_monthly),
                health_tax: Math.round(health_monthly),
                prepayment: Math.round(monthly_prepayment)
            },
            summary: {
                net_after_deductions: Math.round(yearly_income - yearly_total)
            }
        });

    } catch (error) {
        console.error('Error in micro-self-employed-salaried:', error);
        return Response.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

