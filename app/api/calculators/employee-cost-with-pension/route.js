// Explicitly set runtime to Node.js (not Edge)
export const runtime = 'nodejs';

// ========= Excel-Style Rounding =========
function r2(x) {
    /** Round to 2 decimals like Excel. */
    return Math.round(x * 100) / 100;
}

// ========= Constants (Built-In Default Values) =========
const CREDIT_POINT_VALUE = 242.0;
const BTL_THRESHOLD = 7522.0;
const BTL_EMPLOYEE_LOW = 0.0427;
const BTL_EMPLOYER_LOW = 0.0451;
const BTL_EMPLOYEE_HIGH = 0.1217;
const BTL_EMPLOYER_HIGH = 0.076;
const PENSION_EMPLOYEE = 0.06;
const PENSION_EMPLOYER = 0.125;
const PENSION_RELIEF_RATE = 0.35;
const SWITCH_THRESHOLD = 11317.0;
const FIXED_RELIEF_ABOVE_THRESHOLD = 238.0;

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

        // -------- Income Tax --------
        let tax_total = 0.0;
        let prev_limit = 0.0;
        const per_bracket = [];

        for (const [limit, rate] of INCOME_TAX_BRACKETS) {
            if (salary > prev_limit) {
                const taxable = Math.min(salary, limit) - prev_limit;
                const tax_here = r2(taxable * rate);
                tax_total += tax_here;
                per_bracket.push(tax_here);
            }
            prev_limit = limit;
        }

        // Pad brackets (Excel always has 6)
        while (per_bracket.length < 6) {
            per_bracket.push(0.0);
        }
        const [J18, J19, J20, J21, J22, J23] = per_bracket.slice(0, 6);

        // -------- Pension --------
        const pension_employer = r2(salary * PENSION_EMPLOYER);  // 12.5%
        const pension_employee = r2(salary * PENSION_EMPLOYEE);  // 6%
        const pension_total = r2(pension_employer + pension_employee);

        // -------- Pension Credit --------
        let pension_employee_tax_credit;
        if (salary < SWITCH_THRESHOLD) {
            pension_employee_tax_credit = r2(salary * PENSION_EMPLOYEE * PENSION_RELIEF_RATE);
        } else {
            pension_employee_tax_credit = FIXED_RELIEF_ABOVE_THRESHOLD;
        }

        const credit_points_value = r2(creditPoints * CREDIT_POINT_VALUE);
        const J17 = r2(tax_total - credit_points_value - pension_employee_tax_credit);
        const income_tax_after_credit = r2(Math.max(0.0, J17));

        // -------- National Insurance --------
        let ni_employee_low, ni_employer_low, ni_employee_high, ni_employer_high;

        if (salary < BTL_THRESHOLD) {
            ni_employee_low = r2(salary * BTL_EMPLOYEE_LOW);
            ni_employer_low = r2(salary * BTL_EMPLOYER_LOW);
            ni_employee_high = 0.0;
            ni_employer_high = 0.0;
        } else {
            const base = BTL_THRESHOLD;
            const over = salary - base;
            ni_employee_low = r2(base * BTL_EMPLOYEE_LOW);
            ni_employer_low = r2(base * BTL_EMPLOYER_LOW);
            ni_employee_high = r2(over * BTL_EMPLOYEE_HIGH);
            ni_employer_high = r2(over * BTL_EMPLOYER_HIGH);
        }

        const ni_employee_total = r2(ni_employee_low + ni_employee_high);
        const ni_employer_total = r2(ni_employer_low + ni_employer_high);
        const ni_total = r2(ni_employee_total + ni_employer_total);

        // -------- Excel Cells --------
        const M5 = r2(ni_employee_low + ni_employer_low + ni_employee_high + ni_employer_high);
        const M6 = r2(income_tax_after_credit);
        const M9 = r2(pension_employer + pension_employee);
        const M12 = r2(M5 + M6 + M9);

        // -------- Summary --------
        const employee_part = r2(income_tax_after_credit + pension_employee + ni_employee_total);
        const employer_part = r2(pension_employer + ni_employer_total);
        const total_cost = r2(ni_total + income_tax_after_credit + pension_total);

        return Response.json({
            inputs: { gross_salary: salary, credit_points: creditPoints },
            income_tax: {
                before_credit: tax_total,
                credit_points_value: credit_points_value,
                pension_employee_tax_credit: pension_employee_tax_credit,
                after_credit: income_tax_after_credit,
                brackets: {
                    J18: J18, J19: J19, J20: J20,
                    J21: J21, J22: J22, J23: J23
                }
            },
            national_insurance: {
                employee_low: ni_employee_low,
                employee_high: ni_employee_high,
                employee_total: ni_employee_total,
                employer_low: ni_employer_low,
                employer_high: ni_employer_high,
                employer_total: ni_employer_total,
                total: ni_total
            },
            pension: {
                employee: pension_employee,
                employer: pension_employer,
                total: pension_total
            },
            summary: {
                employee_part: employee_part,
                employer_part: employer_part,
                total_cost: total_cost,
                M5: M5, M6: M6, M9: M9, M12: M12
            }
        });

    } catch (error) {
        console.error('Error in employee-cost-with-pension:', error);
        return Response.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

