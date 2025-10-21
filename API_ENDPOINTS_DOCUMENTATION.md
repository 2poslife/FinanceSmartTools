# Finance Smart Tools - API Endpoints Documentation

## 🔒 Authentication

All calculator endpoints now require **Bearer Token Authentication**. Users must login first to get an access token.

### Login Endpoint

**POST** `/user/signin`

**Request:**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Using the Token

Include the token in the `Authorization` header for all calculator endpoints:

```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

---

## 📊 Calculator Endpoints

### 1. Employee Cost with Pension

**POST** `/employee-cost-with-pension/with-pension`

**Description:** Calculate employee costs including pension contributions

**Authentication:** ✅ Required (Bearer Token)

**Request:**
```json
{
  "gross_salary": 10000,
  "credit_points": 2.25
}
```

**Response:**
```json
{
  "inputs": {
    "gross_salary": 10000,
    "credit_points": 2.25
  },
  "income_tax": {
    "before_credit": 1119.6,
    "credit_points_value": 544.5,
    "pension_employee_tax_credit": 105.0,
    "after_credit": 470.1
  },
  "national_insurance": {
    "employee_low": 321.19,
    "employee_high": 301.57,
    "employee_total": 622.76,
    "employer_low": 339.24,
    "employer_high": 188.33,
    "employer_total": 527.57,
    "total": 1150.33
  },
  "pension": {
    "employee": 600.0,
    "employer": 1250.0,
    "total": 1850.0
  },
  "summary": {
    "employee_part": 1692.86,
    "employer_part": 1777.57,
    "total_cost": 3470.43
  }
}
```

---

### 2. Employee Cost No Pension

**POST** `/employee-cost/no-pension`

**Description:** Calculate employee costs without pension contributions

**Authentication:** ✅ Required (Bearer Token)

**Request:**
```json
{
  "gross_salary": 10000,
  "credit_points": 2.25
}
```

**Response:**
```json
{
  "inputs": {
    "gross_salary": 10000,
    "credit_points": 2.25
  },
  "income_tax": {
    "before_credit": 1119.6,
    "credit_points_value": 544.5,
    "after_credit": 575.1
  },
  "national_insurance": {
    "employee_low": 321.19,
    "employee_high": 301.57,
    "employee_total": 622.76,
    "employer_low": 339.24,
    "employer_high": 188.33,
    "employer_total": 527.57,
    "total": 1150.33
  },
  "summary": {
    "employee_part": 1197.86,
    "employer_part": 527.57,
    "total_cost": 1725.43
  }
}
```

---

### 3. Income Tax Calculation

**POST** `/cost/income-tax-with-points`

**Description:** Calculate income tax with credit points breakdown

**Authentication:** ✅ Required (Bearer Token)

**Request:**
```json
{
  "gross_salary": 10000,
  "credit_points": 2.25
}
```

**Response:**
```json
{
  "inputs": {
    "gross_salary": 10000,
    "credit_points": 2.25
  },
  "brackets": [
    {
      "range": "1-7010",
      "rate": 0.1,
      "taxable": 7010.0,
      "amount": 701.0
    },
    {
      "range": "7010-10060",
      "rate": 0.14,
      "taxable": 2990.0,
      "amount": 418.6
    }
  ],
  "income_tax": {
    "before_credit": 1119.6,
    "credit_points_value": 544.5,
    "after_credit": 575.1,
    "yearly_total": 6901.2
  }
}
```

---

### 4. Micro Self-Employed (Simple)

**POST** `/micro-self-employed`

**Description:** Calculate costs for עצמאי (Self-employed only) - Simple calculation

**Authentication:** ✅ Required (Bearer Token)

**Calculation Type:** עצמאי  
**Rates:** NI 4.47%, Health 3.23%

**Request:**
```json
{
  "yearly_income": 60000
}
```

**Response:**
```json
{
  "inputs": {
    "yearly_income": 60000,
    "taxable_income": 42000.0
  },
  "breakdown": {
    "national_insurance": 1877.4,
    "health_insurance": 1356.6
  },
  "summary": {
    "monthly_prepayment": 269.5,
    "yearly_total": 3234.0,
    "net_after_deductions": 56766.0
  }
}
```

---

### 5. Micro Self-Employed (Complex with Thresholds)

**POST** `/micro-self-employed-salaried`

**Description:** Calculate costs for עצמאי (Self-employed only) - Complex calculation with thresholds

**Authentication:** ✅ Required (Bearer Token)

**Calculation Type:** עצמאי  
**Rates:** NI 4.47%, Health 3.23%  
**Threshold:** 90,264 NIS

**Request:**
```json
{
  "yearly_income": 90000
}
```

**Response:**
```json
{
  "inputs": {
    "yearly_income": 90000,
    "taxable_income": 63000.0,
    "income_above_minimum": 52392.0,
    "definition": "עונה להגדרה",
    "calculation_type": "עצמאי"
  },
  "full_rate": {
    "national_insurance": 0.0,
    "health_tax": 0.0
  },
  "reduced_rate": {
    "national_insurance_high": 0.0,
    "national_insurance_low": 6930.0,
    "national_insurance_breakdown": 4023.0,
    "health_tax": 2907.0,
    "national_insurance_total": 6930.0
  },
  "totals": {
    "national_insurance": 4023.0,
    "health_tax": 2907.0,
    "yearly_total": 6930.0
  },
  "monthly": {
    "national_insurance": 335.25,
    "health_tax": 242.25,
    "prepayment": 577.5
  },
  "summary": {
    "net_after_deductions": 83070.0
  }
}
```

---

### 6. Micro Self-Employed + Salaried

**POST** `/micro-self-employed-salaried/atsmaee-and-sakher`

**Description:** Calculate costs for עצמאי ושכיר (Self-employed + Salaried)

**Authentication:** ✅ Required (Bearer Token)

**Calculation Type:** עצמאי ושכיר  
**Rates:** NI 12.83%, Health 5.17%

**Request:**
```json
{
  "yearly_income": 60000
}
```

**Response:**
```json
{
  "inputs": {
    "yearly_income": 60000,
    "calculation_type": "עצמאי ושכיר"
  },
  "full_rate": {
    "national_insurance": 7698.0,
    "health_tax": 3102.0
  },
  "totals": {
    "national_insurance": 7698.0,
    "health_tax": 3102.0,
    "yearly_total": 10800.0
  },
  "monthly": {
    "national_insurance": 641.5,
    "health_tax": 258.5,
    "prepayment": 900.0
  },
  "summary": {
    "net_after_deductions": 49200.0
  }
}
```

---

### 7. Self-Employed

**POST** `/self-employed/self-employed`

**Description:** Calculate costs for self-employed (regular)

**Authentication:** ✅ Required (Bearer Token)

**Request:**
```json
{
  "yearly_income": 80000
}
```

**Response:**
```json
{
  "inputs": {
    "yearly_income": 80000
  },
  "national_insurance": {
    "definition": "עונה להגדרה",
    "monthly_prepayment": 320.83,
    "yearly_total": 3850.0,
    "breakdown": {
      "low_rate_part": 3850.0,
      "high_rate_part": 0.0
    }
  },
  "summary": {
    "net_after_ni": 76150.0
  }
}
```

---

## 📝 Summary of Changes

### Authentication
- ✅ All calculator endpoints now require Bearer token authentication
- ✅ Users must login via `/user/signin` first
- ✅ Token must be included in `Authorization` header

### Endpoints
- ✅ `/employee-cost-with-pension/with-pension` - Employee cost with pension
- ✅ `/employee-cost/no-pension` - Employee cost without pension
- ✅ `/cost/income-tax-with-points` - Income tax calculation
- ✅ `/micro-self-employed` - Simple micro self-employed
- ✅ `/micro-self-employed-salaried` - Complex micro self-employed with thresholds
- ✅ `/micro-self-employed-salaried/atsmaee-and-sakher` - Micro self-employed + salaried
- ✅ `/self-employed/self-employed` - Regular self-employed

### New Features
- ✅ Bearer token authentication using `HTTPAuthorizationCredentials`
- ✅ Separate endpoints for different calculation types
- ✅ Detailed breakdowns with full_rate and reduced_rate
- ✅ Monthly and yearly calculations
- ✅ Definition checks (עונה להגדרה / לא עונה להגדרה)

---

## 🧪 Testing Examples

### Using curl

```bash
# 1. Login
TOKEN=$(curl -X POST http://localhost:8000/user/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"your_username","password":"your_password"}' \
  | jq -r '.access_token')

# 2. Call calculator endpoint
curl -X POST http://localhost:8000/employee-cost/no-pension \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"gross_salary":10000,"credit_points":2.25}'
```

### Using Python

```python
import requests

# Login
response = requests.post(
    "http://localhost:8000/user/signin",
    json={"username": "user", "password": "pass"}
)
token = response.json()["access_token"]

# Call calculator
response = requests.post(
    "http://localhost:8000/employee-cost/no-pension",
    json={"gross_salary": 10000, "credit_points": 2.25},
    headers={"Authorization": f"Bearer {token}"}
)
print(response.json())
```

---

## ⚠️ Error Responses

### 401 Unauthorized (No Token)
```json
{
  "detail": "Not authenticated"
}
```

### 401 Unauthorized (Invalid/Expired Token)
```json
{
  "detail": "Invalid token"
}
```

### 403 Forbidden (Invalid Role)
```json
{
  "detail": "Access denied"
}
```

### 422 Validation Error (Invalid Input)
```json
{
  "detail": [
    {
      "loc": ["body", "gross_salary"],
      "msg": "ensure this value is greater than 0",
      "type": "value_error.number.not_gt"
    }
  ]
}
```

---

## 📊 Test Data

Test files with actual inputs/outputs are available in:
- `test_before/api_outputs.csv` - 42 test cases with real API responses
- `test_before/test_all_routes.py` - Automated testing script

---

## 🔗 Quick Reference

| Endpoint | Type | Auth | Description |
|----------|------|------|-------------|
| `/user/signin` | POST | ❌ | Login to get access token |
| `/employee-cost-with-pension/with-pension` | POST | ✅ | Employee cost with pension |
| `/employee-cost/no-pension` | POST | ✅ | Employee cost without pension |
| `/cost/income-tax-with-points` | POST | ✅ | Income tax calculation |
| `/micro-self-employed` | POST | ✅ | Simple micro self-employed |
| `/micro-self-employed-salaried` | POST | ✅ | Complex micro self-employed |
| `/micro-self-employed-salaried/atsmaee-and-sakher` | POST | ✅ | Micro self-employed + salaried |
| `/self-employed/self-employed` | POST | ✅ | Regular self-employed |

---

## 📞 Support

For issues or questions:
1. Check the Swagger documentation at `/docs`
2. Review test cases in `test_before/` folder
3. Check authentication guide in `test_before/AUTHENTICATION_GUIDE.md`

