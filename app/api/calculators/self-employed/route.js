import { requireAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// ========= Constants =========
const SELF_EMPLOYED_NI_MIN_MONTHLY = 241.0;
const SELF_EMPLOYED_NI_LOW_RATE = 0.077;
const SELF_EMPLOYED_NI_HIGH_RATE = 0.18;
const SELF_EMPLOYED_NI_THRESHOLD = 37608.0;
const SELF_EMPLOYED_NI_HIGH_LIMIT = 90264.0;
const INCOME_THRESHOLD_75216 = 75216;

// Additional constants for calculations
const FIXED_AMOUNT_90264 = 6950;
const ADDITIONAL_NI_LOW_RATE = 0.1209;
const ADDITIONAL_NI_HIGH_RATE = 0.1217;
const FIXED_ADDITIONAL_AMOUNT = 10912.9176;
const MIN_YEARLY_PAYMENT = 2892;  // 241 * 12

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

        // F17 = IF(G17<0,0,G17)
        // G17 = IF(G7<90264,(G7*0.077),6950)
        let ni_low_calc;
        if (yearly_income < SELF_EMPLOYED_NI_HIGH_LIMIT) {
            ni_low_calc = yearly_income * SELF_EMPLOYED_NI_LOW_RATE;
        } else {
            ni_low_calc = FIXED_AMOUNT_90264; // Fixed amount for income >= 90264
        }

        const ni_low = Math.max(0, ni_low_calc);  // F17 = IF(G17<0,0,G17)

        // F18 = IF(G18<0,0,G18)
        // G18 = IF(G7>90264,((G7-90264)*0.18),(0))
        let ni_high_calc;
        if (yearly_income > SELF_EMPLOYED_NI_HIGH_LIMIT) {
            ni_high_calc = (yearly_income - SELF_EMPLOYED_NI_HIGH_LIMIT) * SELF_EMPLOYED_NI_HIGH_RATE;
        } else {
            ni_high_calc = 0;
        }

        const ni_high = Math.max(0, ni_high_calc);  // F18 = IF(G18<0,0,G18)

        // F16 = F17+F18 (Total NI calculation)
        let yearly_ni = ni_low + ni_high;

        // G8 = IF(G7<37608,(241),(H7))
        let yearly_total;
        if (yearly_income < SELF_EMPLOYED_NI_THRESHOLD) {
            yearly_total = MIN_YEARLY_PAYMENT;  // 2892
        } else {
            // For income >= 37608, use the calculated NI
            yearly_total = yearly_ni;
        }

        // Additional calculation for income < 75216
        // G20 = IF(G7<75216,(G7-37608),0)
        let income_above_minimum;
        if (yearly_income < INCOME_THRESHOLD_75216) {
            income_above_minimum = yearly_income - SELF_EMPLOYED_NI_THRESHOLD;
        } else {
            income_above_minimum = 0;
        }

        // F21 = IF(G21<0,0,G21)
        // G21 = IF(G20<90264,(G20*0.1209),10912.9176)
        let additional_ni_low = 0;
        if (income_above_minimum > 0) {
            if (income_above_minimum < SELF_EMPLOYED_NI_HIGH_LIMIT) {
                additional_ni_low = income_above_minimum * ADDITIONAL_NI_LOW_RATE;
            } else {
                additional_ni_low = FIXED_ADDITIONAL_AMOUNT;
            }
            additional_ni_low = Math.max(0, additional_ni_low);
        }

        // F22 = IF(G22<0,0,G22)
        // G22 = IF(G20>90264,((G20-90264)*0.1217),0)
        let additional_ni_high = 0;
        if (income_above_minimum > SELF_EMPLOYED_NI_HIGH_LIMIT) {
            additional_ni_high = (income_above_minimum - SELF_EMPLOYED_NI_HIGH_LIMIT) * ADDITIONAL_NI_HIGH_RATE;
        }
        additional_ni_high = Math.max(0, additional_ni_high);

        // F20 = F21+F22 (Additional NI for income < 75216)
        const additional_ni = additional_ni_low + additional_ni_high;

        // Final calculation: use additional NI if income < 75216
        let final_ni_low = ni_low;
        let final_ni_high = ni_high;
        
        if (yearly_income < INCOME_THRESHOLD_75216 && yearly_income >= SELF_EMPLOYED_NI_THRESHOLD) {
            yearly_total = additional_ni;
            // Update breakdown for additional NI calculation
            final_ni_low = additional_ni_low;
            final_ni_high = additional_ni_high;
        }

        // H10 = IF(H8>2892,(H8/12),241)
        let monthly_prepayment;
        if (yearly_total > MIN_YEARLY_PAYMENT) {
            monthly_prepayment = yearly_total / 12;
        } else {
            monthly_prepayment = SELF_EMPLOYED_NI_MIN_MONTHLY;
        }

        // Recalculate yearly_total from monthly_prepayment
        yearly_total = monthly_prepayment * 12;

        // G9 = IF(G8=241,("לא עונה להגדרה"),(H9))
        // H9 = IF(H8=F20,("לא עונה להגדרה"),("עונה להגדרה"))
        let definition;
        if (yearly_income < INCOME_THRESHOLD_75216) {
            definition = "לא עונה להגדרה";
        } else {
            definition = "עונה להגדרה";
        }

        return Response.json({
            inputs: {
                yearly_income: yearly_income
            },
            national_insurance: {
                definition: definition,
                monthly_prepayment: Math.round(monthly_prepayment),
                yearly_total: Math.round(yearly_total),
                breakdown: {
                    low_rate_part: Math.round(final_ni_low),
                    high_rate_part: Math.round(final_ni_high)
                }
            },
            summary: {
                net_after_ni: Math.round(yearly_income - yearly_total)
            }
        });

    } catch (error) {
        console.error('Error in self-employed:', error);
        return Response.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

