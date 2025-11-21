import { requireAuth } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

// ========= Constants (Built-In Default Values) =========
const CREDIT_POINT_VALUE = 242.0;

// Monthly tax brackets (NIS)
const INCOME_TAX_BRACKETS = [
    [7010, 0.10],
    [10060, 0.14],
    [16050, 0.20],
    [22400, 0.31],
    [46690, 0.35],
    [60130, 0.47],
    [Infinity, 0.50]
];

// ========= Truncate Function =========
function truncate(value, decimals = 2) {
    const factor = Math.pow(10, decimals);
    return Math.floor(value * factor) / factor;
}

export async function POST(request) {
    try {
        // Check authentication
        const authResult = requireAuth(request);
        if (authResult instanceof NextResponse) {
            return authResult; // Return error response
        }

        const data = await request.json();
        const { gross_salary: salary, credit_points: creditPoints } = data;

        // Validate inputs
        if (typeof salary !== 'number' || salary <= 0 || isNaN(salary)) {
            return Response.json(
                { error: 'gross_salary must be a positive number' },
                { status: 400 }
            );
        }

        const credit_points = creditPoints || 0.0;
        if (typeof credit_points !== 'number' || credit_points < 0 || isNaN(credit_points)) {
            return Response.json(
                { error: 'credit_points must be a non-negative number' },
                { status: 400 }
            );
        }

        // Calculate income tax brackets
        const bracket_details = [];
        let tax_total = 0.0;
        let prev_limit = 0.0;

        for (const [limit, rate] of INCOME_TAX_BRACKETS) {
            if (salary > prev_limit) {
                const taxable = Math.min(salary, limit) - prev_limit;
                const amount = taxable * rate;
                
                const range = limit === Infinity 
                    ? `${Math.floor(prev_limit) + 1}-∞`
                    : `${Math.floor(prev_limit) + 1}-${Math.floor(limit)}`;
                
                bracket_details.push({
                    range: range,
                    rate: rate,
                    taxable: truncate(taxable, 2),
                    amount: truncate(amount, 2),
                });
                
                tax_total += amount;
            }
            prev_limit = limit;
        }

        // Calculate credits
        const credit_points_value = credit_points * CREDIT_POINT_VALUE;
        const after_credit = Math.max(0.0, tax_total - credit_points_value);

        return Response.json({
            inputs: {
                gross_salary: salary,
                credit_points: credit_points,
            },
            brackets: bracket_details,
            income_tax: {
                before_credit: truncate(tax_total, 2),
                credit_points_value: truncate(credit_points_value, 2),
                after_credit: truncate(after_credit, 2),
                yearly_total: truncate(after_credit * 12, 2),
            },
        });

    } catch (error) {
        console.error('Error in income-tax-with-points:', error);
        return Response.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

