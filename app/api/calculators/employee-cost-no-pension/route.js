import { requireAuth } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

// ========= Constants (Built-In Default Values) =========
const CREDIT_POINT_VALUE = 242.0;
const BTL_THRESHOLD = 7522.0;
const BTL_EMPLOYEE_LOW = 0.0427;
const BTL_EMPLOYER_LOW = 0.0451;
const BTL_EMPLOYEE_HIGH = 0.1217;
const BTL_EMPLOYER_HIGH = 0.076;

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

        if (typeof creditPoints !== 'number' || creditPoints < 0 || isNaN(creditPoints)) {
            return Response.json(
                { error: 'credit_points must be a non-negative number' },
                { status: 400 }
            );
        }

        // -------- Income tax --------
        const EPS = 0.01;  // prevents overlapping boundaries
        let tax_total = 0.0;
        let prev_limit = 0.0;

        for (const [limit, rate] of INCOME_TAX_BRACKETS) {
            if (salary > prev_limit) {
                const taxable = Math.min(salary, limit) - (prev_limit !== 0 ? prev_limit - EPS : 0);
                const part = Math.round(taxable * rate * 100) / 100;
                tax_total += part;
            } else {
                break;
            }
            prev_limit = limit;
        }

        tax_total = Math.round(tax_total * 100) / 100;
        const credit_value = Math.round(creditPoints * CREDIT_POINT_VALUE * 100) / 100;
        const income_tax_after_credit = Math.max(0, Math.round((tax_total - credit_value) * 100) / 100);

        // -------- National insurance --------
        let employee_low, employer_low, employee_high, employer_high;

        if (salary <= BTL_THRESHOLD) {
            employee_low = Math.round(salary * BTL_EMPLOYEE_LOW * 100) / 100;
            employer_low = Math.round(salary * BTL_EMPLOYER_LOW * 100) / 100;
            employee_high = 0.0;
            employer_high = 0.0;
        } else {
            employee_low = Math.round(BTL_THRESHOLD * BTL_EMPLOYEE_LOW * 100) / 100;
            employer_low = Math.round(BTL_THRESHOLD * BTL_EMPLOYER_LOW * 100) / 100;
            employee_high = Math.round((salary - BTL_THRESHOLD) * BTL_EMPLOYEE_HIGH * 100) / 100;
            employer_high = Math.round((salary - BTL_THRESHOLD) * BTL_EMPLOYER_HIGH * 100) / 100;
        }

        const ni_employee = Math.round((employee_low + employee_high) * 100) / 100;
        const ni_employer = Math.round((employer_low + employer_high) * 100) / 100;
        const ni_total = Math.round((ni_employee + ni_employer) * 100) / 100;

        // -------- Summary --------
        const employee_part = Math.round((income_tax_after_credit + ni_employee) * 100) / 100;
        const employer_part = ni_employer;
        const total_cost = Math.round((employee_part + employer_part) * 100) / 100;
        const net_salary = Math.round((salary - employee_part) * 100) / 100;

        return Response.json({
            inputs: {
                gross_salary: salary,
                credit_points: creditPoints
            },
            income_tax: {
                before_credit: tax_total,
                credit_points_value: credit_value,
                after_credit: income_tax_after_credit
            },
            national_insurance: {
                employee_low: employee_low,
                employee_high: employee_high,
                employee_total: ni_employee,
                employer_low: employer_low,
                employer_high: employer_high,
                employer_total: ni_employer,
                total: ni_total
            },
            summary: {
                employee_part: employee_part,
                employer_part: employer_part,
                total_cost: total_cost,
                net_salary: net_salary
            }
        });

    } catch (error) {
        console.error('Error in employee-cost-no-pension:', error);
        return Response.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

