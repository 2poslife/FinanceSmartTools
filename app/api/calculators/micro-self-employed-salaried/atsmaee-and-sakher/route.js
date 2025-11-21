import { requireAuth } from '../../../../../lib/auth';
import { NextResponse } from 'next/server';

// ========= Constants =========
const MICRO_SELF_EMPLOYED_SALARIED_NI_RATE = 0.1283;  // 12.83%
const MICRO_SELF_EMPLOYED_SALARIED_HEALTH_RATE = 0.0517;  // 5.17%

/**
 * Calculate costs for עצמאי ושכיר (Self-employed + Salaried)
 * Uses rates: NI 12.83%, Health 5.17%
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

        // מלא (Full) calculations
        // I17 = J7*0.1283 (National Insurance - 12.83%)
        const ni_full = yearly_income * MICRO_SELF_EMPLOYED_SALARIED_NI_RATE;

        // I18 = J7*0.0517 (Health Tax - 5.17%)
        const health_full = yearly_income * MICRO_SELF_EMPLOYED_SALARIED_HEALTH_RATE;

        // K17 = I17+I18 (Total annual insurance fees)
        const yearly_total = ni_full + health_full;

        // Monthly calculations
        // J9 = I17/12 (National Insurance monthly)
        const ni_monthly = ni_full / 12;

        // J10 = I18/12 (Health Tax monthly)
        const health_monthly = health_full / 12;

        // Monthly prepayment
        const monthly_prepayment = yearly_total / 12;

        return Response.json({
            inputs: {
                yearly_income: yearly_income,
                calculation_type: "עצמאי ושכיר"
            },
            full_rate: {
                national_insurance: Math.round(ni_full),
                health_tax: Math.round(health_full)
            },
            totals: {
                national_insurance: Math.round(ni_full),
                health_tax: Math.round(health_full),
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
        console.error('Error in micro-self-employed-salaried/atsmaee-and-sakher:', error);
        return Response.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

