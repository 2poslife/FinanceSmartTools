import { requireAuth } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

// ========= Constants =========
const MICRO_SELF_EMPLOYED_TAXABLE_FACTOR = 0.70;  // 70% מהברוטו
const MICRO_SELF_EMPLOYED_NI_RATE = 0.0447;      // ביטוח לאומי
const MICRO_SELF_EMPLOYED_HEALTH_RATE = 0.0323;  // ביטוח בריאות

// התשלום המינימאלי החודשי
const MIN_MONTHLY_NI = 140.09;
const MIN_MONTHLY_HEALTH = 101.23;
const MIN_MONTHLY_TOTAL = 241.0;

export async function POST(request) {
    try {
        // Check authentication
        const authResult = requireAuth(request);
        if (authResult instanceof NextResponse) {
            return authResult; // Return error response
        }

        const data = await request.json();
        const { yearly_income } = data;

        // Validate inputs
        if (typeof yearly_income !== 'number' || yearly_income <= 0 || isNaN(yearly_income)) {
            return Response.json(
                { error: 'yearly_income must be a positive number' },
                { status: 400 }
            );
        }

        // ההכנסה החייבת = 70% מהברוטו
        const taxable_income = yearly_income * MICRO_SELF_EMPLOYED_TAXABLE_FACTOR;
        
        // ביטוח לאומי
        let ni = taxable_income * MICRO_SELF_EMPLOYED_NI_RATE;
        
        // ביטוח בריאות
        let health = taxable_income * MICRO_SELF_EMPLOYED_HEALTH_RATE;
        
        // בדיקה אם התשלום החודשי נמוך מהמינימום
        const monthly_ni = ni / 12;
        const monthly_health = health / 12;
        const monthly_total = monthly_ni + monthly_health;
        
        if (monthly_total < MIN_MONTHLY_TOTAL) {
            // אם נמוך מהמינימום, נשתמש בערכי המינימום
            ni = MIN_MONTHLY_NI * 12;
            health = MIN_MONTHLY_HEALTH * 12;
        }

        // סה"כ
        const yearly_total = ni + health;
        const monthly_prepayment = yearly_total / 12;

        return Response.json({
            inputs: {
                yearly_income: yearly_income,
                taxable_income: Math.round(taxable_income)
            },
            breakdown: {
                national_insurance: Math.round(ni),
                health_insurance: Math.round(health)
            },
            summary: {
                monthly_prepayment: Math.round(monthly_prepayment),
                yearly_total: Math.round(yearly_total),
                net_after_deductions: Math.round(yearly_income - yearly_total)
            }
        });

    } catch (error) {
        console.error('Error in micro-self-employed:', error);
        return Response.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

