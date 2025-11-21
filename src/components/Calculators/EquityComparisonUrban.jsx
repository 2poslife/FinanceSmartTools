'use client'

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import "../../styles/CalculatorsPage/CalculatorsGrid.css";
import "../../styles/Calculators/EquityComparison.css";
import EquityComparisonUrbanMobile from "./EquityComparisonUrbanMobile";
import CustomAlert from "./CustomAlert";

// Helper function to format numbers for RTL (minus sign on the right)
const formatNumberRTL = (num) => {
    if (num === null || num === undefined || isNaN(num)) return "0";
    const absNum = Math.abs(num);
    const formatted = absNum.toLocaleString();
    return num < 0 ? `${formatted}-` : formatted;
};

// Row component outside to prevent recreation on each render
const Row = ({ label, values, onChange, isTotal, years }) => {
    return (
        <div className={`eqc-row ${isTotal ? "eqc-row-total" : ""}`}>
            {years.map((year, idx) => {
                const cellKey = `${label}-${year}`;
                return (
                    <div key={cellKey} className="eqc-cell">
                        {isTotal ? (
                            <input 
                                className="eqc-input eqc-input-total" 
                                readOnly 
                                value={(() => {
                                    const val = values?.[idx];
                                    if (val === undefined || val === null || val === "") return "0";
                                    const numVal = typeof val === 'number' ? val : Number(val);
                                    return isNaN(numVal) ? "0" : numVal.toLocaleString();
                                })()}
                            />
                        ) : (
                            <input
                                className="eqc-input eqc-input-user"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                autoComplete="off"
                                value={values?.[idx] ?? ""}
                                onChange={e => {
                                    const next = (e.target.value || "").replace(/[^0-9]/g, "");
                                    onChange?.(idx, next);
                                }}
                                placeholder="0"
                            />
                        )}
                    </div>
                );
            })}
            {/* Row text/description label (read-only) */}
            <div className="eqc-label-cell">{label}</div>
        </div>
    );
};

function EquityComparisonUrban() {
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);

    // ✅ Check authentication on page load
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setShowAlert(true);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                localStorage.removeItem("access_token");
                setShowAlert(true);
                return;
            }
        } catch (err) {
            console.error("❌ Invalid token:", err);
            localStorage.removeItem("access_token");
            setShowAlert(true);
        }
    }, []);

    const handleAlertClose = () => {
        setShowAlert(false);
        router.push("/SigninForm");
    };

    // Only allow picking 2023 or 2024 as the anchor year
    const AVAILABLE_YEARS = [2024, 2023];
    const [selectedYear, setSelectedYear] = useState(2024);

    // Compute a 5-year window based on the chosen year
    // - For 2024 -> 2020-2024
    // - For 2023 -> 2019-2023
    const years = useMemo(() => {
        if (selectedYear === 2024) return [2020, 2021, 2022, 2023, 2024];
        return [2019, 2020, 2021, 2022, 2023];
    }, [selectedYear]);

    // ----- Sources (פירוט המקורות) state -----
    const sourceLabels = [
        "משכורת ברוטו לנישום",
        "משכורת ברוטו בת/בן זוג",
        "הכנסות משכירות",
        "רווח נקי מעסק עצמאי לנישום",
        "רווח נקי מעסק עצמאי בן/בת זוג",
        "הכנסות אחרות כמו: קופות גמל, דיבידנד,רווח הון..",
        "הכנסות מקצבאות ביטוח לאומי ",
        "הכנסות פטורות כמו: מלגות, מתנות,החזרי מס.. "
    ];
    const [sources, setSources] = useState(() =>
        sourceLabels.map(() => Array(5).fill(""))
    );
    const updateSource = React.useCallback((rowIdx, colIdx, value) => {
        setSources(prev => {
            const next = prev.map((arr, idx) => 
                idx === rowIdx ? arr.map((v, i) => i === colIdx ? value : v) : arr
            );
            return next;
        });
    }, []);
    const sourcesTotals = useMemo(() => {
        const totals = Array(5).fill(0);
        sources.forEach(row => {
            row.forEach((v, i) => {
                const numValue = v === "" || v === null || v === undefined ? 0 : Number(v);
                if (!isNaN(numValue)) {
                    totals[i] += numValue;
                }
            });
        });
        
        // Each column shows the sum of that column only
        return totals;
    }, [sources]);
    
    // Grand total of all income sources across all years
    const sourcesGrandTotal = useMemo(() => {
        const grandTotal = sourcesTotals.reduce((sum, val) => sum + val, 0);
        return Array(5).fill("").map((_, idx) => idx === 4 ? grandTotal.toString() : "");
    }, [sourcesTotals]);

    // ----- Family members count row state -----
    const [familyCounts, setFamilyCounts] = useState(Array(5).fill(""));
    const updateFamily = React.useCallback((idx, val) => {
        setFamilyCounts(prev => {
            const next = prev.slice();
            next[idx] = val;
            return next;
        });
    }, []);

    // ----- Expenses (פירוט שימושים והוצאות נוספות) state -----
    const expenseLabels = [
        "מס הכנסה ששולם לפי 106",
        "מס הכנסה ששולם לפי 106 בת/בן זוג",
        "ביטוח לאומי ששולם שכיר+ עצמאי",
        "ביטוח לאומי ששולם - בת /בן זוג",
        "הוצאות לא מוכרות",
        "הוצאות ריבית",
        "הוצאות שכר דירה",
        "הוצאות משמעתיות כגון ניתוחים, מתנות, משפטיות..",
        "מיסים ששולמו לעסק עצמאי לנישום",
        "מיסים ששולמו לעסק עצמאי- בן/בת זוג"
    ];
    const [expenses, setExpenses] = useState(() =>
        expenseLabels.map(() => Array(5).fill(""))
    );
    const updateExpense = React.useCallback((rowIdx, colIdx, value) => {
        setExpenses(prev => {
            const next = prev.map((arr, idx) => 
                idx === rowIdx ? arr.map((v, i) => i === colIdx ? value : v) : arr
            );
            return next;
        });
    }, []);
    const expensesTotals = useMemo(() => {
        const totals = Array(5).fill(0);
        expenses.forEach((row, rowIdx) => {
            row.forEach((v, colIdx) => {
                // Convert to number, handling empty strings and invalid values
                const numValue = v === "" || v === null || v === undefined ? 0 : Number(v);
                if (!isNaN(numValue)) {
                    totals[colIdx] += numValue;
                }
            });
        });
        
        // For the last column (index 4), calculate sum of all years (2020-2024 or 2019-2023)
        // סה״כ הוצאות في عمود السنة الأخيرة = مجموع جميع السنوات
        const sumOfAllYears = totals.reduce((sum, val) => sum + val, 0);
        totals[4] = sumOfAllYears;
        
        return totals;
    }, [expenses]);
    
    // Grand total of all expenses across all years
    const expensesGrandTotal = useMemo(() => {
        // Calculate totals without the special last column logic
        const totals = Array(5).fill(0);
        expenses.forEach((row, rowIdx) => {
            row.forEach((v, colIdx) => {
                const numValue = v === "" || v === null || v === undefined ? 0 : Number(v);
                if (!isNaN(numValue)) {
                    totals[colIdx] += numValue;
                }
            });
        });
        const grandTotal = totals.reduce((sum, val) => sum + val, 0);
        return Array(5).fill("").map((_, idx) => idx === 4 ? grandTotal.toString() : "");
    }, [expenses]);

    // ----- Assets and Liabilities (פירוט הרכוש והתחייבויות) state -----
    const assetLabels = [
        "סך הרכוש השוטף",
        "יתרת עו\"ש חשבונות הבנק -עסקי",
        "חסכונות, פיקדונות",
        "הלוואות",
        "שווי הנכסים בעסק (כולל כליי רכב, נדל\"ן,קרקע, לפי טופס י\"א)",
        "שווי הנכסים (כולל כליי רכב, נדל\"ן,קרקע,זהב, יהלומים,תכולת בית)",
        "יתרת עו\"ש בנק",
        "יתרת עו\"ש בנק בת/בן זוג",
        "שווי ההתחייבויות",
        "קופות גמל, חסכונות, ביטוח חיים"
    ];
    const [assets, setAssets] = useState(() =>
        assetLabels.map(() => Array(5).fill(""))
    );
    const updateAsset = React.useCallback((rowIdx, colIdx, value) => {
        setAssets(prev => {
            const next = prev.map((arr, idx) => 
                idx === rowIdx ? arr.map((v, i) => i === colIdx ? value : v) : arr
            );
            return next;
        });
    }, []);
    const assetsTotals = useMemo(() => {
        const totals = Array(5).fill(0);
        assets.forEach(row => {
            row.forEach((v, i) => {
                totals[i] += Number(v || 0);
            });
        });
        return totals;
    }, [assets]);

    // Calculate change in assets and liabilities
    const assetsChange = useMemo(() => {
        const values = Array(5).fill("");
        if (selectedYear === 2024) {
            // Last value (2024) = assetsTotals[4] - assetsTotals[0] (2024 - 2020)
            values[4] = (assetsTotals[4] - assetsTotals[0]).toString(); // 2024 - 2020
        } else if (selectedYear === 2023) {
            // Last value (2023) = assetsTotals[4] - assetsTotals[0] (2023 - 2019)
            values[4] = (assetsTotals[4] - assetsTotals[0]).toString(); // 2023 - 2019
        }
        return values;
    }, [assetsTotals, selectedYear]);

    // ----- Owner Balances and Loans (יתרות והלוואות בעלים) state -----
    const ownerLabels = [
        "יתרת חשבון החו\"ז",
        "יתרת חשבון ההון שלך",
        "הלוואות שנתת לעסק",
        "הלוואות שלקחת מעסק"
    ];
    const [ownerBalances, setOwnerBalances] = useState(() =>
        ownerLabels.map(() => Array(5).fill(""))
    );
    const updateOwnerBalance = React.useCallback((rowIdx, colIdx, value) => {
        setOwnerBalances(prev => {
            const next = prev.map((arr, idx) => 
                idx === rowIdx ? arr.map((v, i) => i === colIdx ? value : v) : arr
            );
            return next;
        });
    }, []);
    const ownerBalancesTotals = useMemo(() => {
        const totals = Array(5).fill(0);
        ownerBalances.forEach(row => {
            row.forEach((v, i) => {
                totals[i] += Number(v || 0);
            });
        });
        return totals;
    }, [ownerBalances]);

    // Calculate change in investment
    const investmentChange = useMemo(() => {
        const values = Array(5).fill("");
        if (selectedYear === 2024) {
            // Last value (2024) = ownerBalancesTotals[4] - ownerBalancesTotals[0] (2024 - 2020)
            values[4] = (ownerBalancesTotals[4] - ownerBalancesTotals[0]).toString(); // 2024 - 2020
        } else if (selectedYear === 2023) {
            // Last value (2023) = ownerBalancesTotals[4] - ownerBalancesTotals[0] (2023 - 2019)
            values[4] = (ownerBalancesTotals[4] - ownerBalancesTotals[0]).toString(); // 2023 - 2019
        }
        return values;
    }, [ownerBalancesTotals, selectedYear]);

    // ----- Cash (מזומנים) state -----
    const [cash, setCash] = useState(Array(5).fill(""));
    const updateCash = React.useCallback((idx, val) => {
        setCash(prev => {
            const next = prev.slice();
            next[idx] = val;
            return next;
        });
    }, []);

    // Calculate change in cash
    const cashChange = useMemo(() => {
        const values = Array(5).fill("");
        if (selectedYear === 2024) {
            // Last value (2024) = cash[4] - cash[0] (2024 - 2020)
            values[4] = ((Number(cash[4]) || 0) - (Number(cash[0]) || 0)).toString(); // 2024 - 2020
        } else if (selectedYear === 2023) {
            // Last value (2023) = cash[4] - cash[0] (2023 - 2019)
            values[4] = ((Number(cash[4]) || 0) - (Number(cash[0]) || 0)).toString(); // 2023 - 2019
        }
        return values;
    }, [cash, selectedYear]);

    // ----- Table 3-4: הוצאות המחיה (Living Expenses) -----
    // Income brackets for each year (sorted descending)
    const INCOME_BRACKETS = {
        2024: [534937, 534936, 390972, 305040, 246120, 197652, 162852, 126840, 97476, 61584],
        2023: [534937, 534936, 390972, 305040, 246120, 197652, 162852, 126840, 97476, 61584],
        2022: [534937, 534936, 390972, 305040, 246120, 197652, 162852, 126840, 97476, 61584],
        2021: [492085, 492084, 352224, 274308, 221844, 177864, 143904, 111408, 80952, 50628],
        2020: [474541, 474540, 341904, 270300, 218940, 179244, 142836, 111012, 82956, 53760],
        2019: [473809, 473808, 348936, 276396, 224880, 183312, 146148, 113352, 83772, 54636],
    };
    
    // Table 3-4 data for each year: [income_bracket][family_size_index]
    // Family sizes: 1, 2, 3, 4, 5, 6+
    const TABLE_3_4_DATA = {
        2024: [
            [39226, 72970, 76694, 85546, 74563, 97258],   // 61584
            [44669, 59770, 79814, 101683, 85594, 99130],  // 97476
            [53731, 80544, 95693, 94330, 131760, 117206], // 126840
            [75437, 84058, 107549, 116794, 123955, 119750], // 162852
            [71088, 98112, 100656, 114355, 137626, 123590], // 197652
            [90528, 105130, 110026, 123014, 144739, 154541], // 246120
            [83626, 114019, 125971, 142858, 142589, 168806], // 305040
            [101693, 119808, 145411, 145085, 164947, 169114], // 390972
            [135686, 146448, 148733, 160848, 180643, 171293], // 534936
            [125578, 214570, 199402, 210067, 223104, 209818], // 534937
        ],
        2023: [
            [39226, 72970, 76694, 85546, 74563, 97258],   // 61584
            [44669, 59770, 79814, 101683, 85594, 99130],  // 97476
            [53731, 80544, 95693, 94330, 131760, 117206], // 126840
            [75437, 84058, 107549, 116794, 123955, 119750], // 162852
            [71088, 98112, 100656, 114355, 137626, 123590], // 197652
            [90528, 105130, 110026, 123014, 144739, 154541], // 246120
            [83626, 114019, 125971, 142858, 142589, 168806], // 305040
            [101693, 119808, 145411, 145085, 164947, 169114], // 390972
            [135686, 146448, 148733, 160848, 180643, 171293], // 534936
            [125578, 214570, 199402, 210067, 223104, 209818], // 534937
        ],
        2022: [
            [39226, 72970, 76694, 85546, 74563, 97258],   // 61584
            [44669, 59770, 79814, 101683, 85594, 99130],  // 97476
            [53731, 80544, 95693, 94330, 131760, 117206], // 126840
            [75437, 84058, 107549, 116794, 123955, 119750], // 162852
            [71088, 98112, 100656, 114355, 137626, 123590], // 197652
            [90528, 105130, 110026, 123014, 144739, 154541], // 246120
            [83626, 114019, 125971, 142858, 142589, 168806], // 305040
            [101693, 119808, 145411, 145085, 164947, 169114], // 390972
            [135686, 146448, 148733, 160848, 180643, 171293], // 534936
            [125578, 214570, 199402, 210067, 223104, 209818], // 534937
        ],
        2021: [
            [32093, 54566, 74179, 70291, 73267, 80995],   // 50628
            [38266, 55066, 63936, 84432, 72451, 72816],  // 80952
            [45389, 57005, 73862, 84528, 88378, 112426], // 111408
            [56419, 72749, 80928, 103085, 105178, 105850], // 143904
            [60998, 81638, 76435, 106214, 119731, 107405], // 177864
            [71789, 89232, 102806, 101280, 119741, 120614], // 221844
            [61507, 101616, 105792, 109670, 124570, 138432], // 274308
            [81197, 118042, 127968, 116035, 142416, 158640], // 352224
            [85181, 113213, 123888, 136858, 148771, 153197], // 492084
            [180442, 184243, 164486, 162010, 191597, 199776], // 492085
        ],
        2020: [
            [31296, 56170, 55766, 48605, 74794, 58598],   // 53760
            [37901, 43853, 68179, 67584, 58253, 69062],  // 82956
            [45178, 51456, 58224, 79507, 71933, 79488], // 111012
            [53818, 63082, 62198, 89654, 85507, 93917], // 142836
            [51341, 69619, 78662, 78691, 100032, 83002], // 179244
            [64627, 78010, 79411, 100838, 94666, 98323], // 218940
            [50381, 82454, 83309, 102758, 114442, 116534], // 270300
            [73594, 88848, 113971, 109267, 132739, 130560], // 341904
            [89386, 99965, 114912, 122246, 129187, 133536], // 474540
            [94704, 130387, 133286, 152765, 161731, 175507], // 474541
        ],
        2019: [
            [31296, 56170, 55766, 48605, 74794, 58598],   // 53760
            [37901, 43853, 68179, 67584, 58253, 69062],  // 82956
            [45178, 51456, 58224, 79507, 71933, 79488], // 111012
            [53818, 63082, 62198, 89654, 85507, 93917], // 142836
            [51341, 69619, 78662, 78691, 100032, 83002], // 179244
            [64627, 78010, 79411, 100838, 94666, 98323], // 218940
            [50381, 82454, 83309, 102758, 114442, 116534], // 270300
            [73594, 88848, 113971, 109267, 132739, 130560], // 341904
            [89386, 99965, 114912, 122246, 129187, 133536], // 474540
            [94704, 130387, 133286, 152765, 161731, 175507], // 474541
        ],
    };

    // Function to find the appropriate table index for a given income and year
    // Brackets array is sorted descending: [highest, ..., lowest]
    // Table data is sorted ascending: [lowest, ..., highest]
    // Logic: if income < lowest_bracket → use table index 0
    //        if lowest_bracket <= income < next_bracket → use table index 1
    //        etc.
    const findBracketIndex = (income, year) => {
        const brackets = INCOME_BRACKETS[year] || INCOME_BRACKETS[2024];
        // If income is less than the lowest bracket (last element in array)
        if (income < brackets[9]) {
            return 0; // Use table index 0 (lowest bracket)
        }
        // Check each bracket range (from lowest to highest)
        // When income is in range [brackets[i], brackets[i-1]), we use brackets[i-1]
        for (let i = 9; i > 0; i--) {
            if (income >= brackets[i] && income < brackets[i - 1]) {
                // Use the higher bracket (brackets[i-1]), convert to table index: 9 - (i-1) = 10 - i
                return 10 - i; // brackets[8]→1, brackets[7]→2, brackets[6]→3, etc.
            }
        }
        // If income >= highest bracket (first element)
        return 9; // Use table index 9 (highest bracket)
    };

    // Function to get family size index (1 person = 0, 2 = 1, ..., 6+ = 5)
    const getFamilySizeIndex = (familyCount) => {
        const count = Number(familyCount) || 0;
        if (count <= 0) return 0; // Default to 1 person
        if (count >= 6) return 5; // 6 or more
        return count - 1; // 1->0, 2->1, 3->2, 4->3, 5->4
    };

    // Calculate value_3_4 for each year
    const value_3_4 = useMemo(() => {
        const values = Array(5).fill("");
        years.forEach((year, idx) => {
            const totalIncome = sourcesTotals[idx] || 0;
            const familyCount = familyCounts[idx] || "";
            
            if (totalIncome > 0 && familyCount) {
                const yearData = TABLE_3_4_DATA[year] || TABLE_3_4_DATA[2024];
                const bracketIdx = findBracketIndex(totalIncome, year);
                const familyIdx = getFamilySizeIndex(familyCount);
                const result = yearData[bracketIdx][familyIdx];
                values[idx] = result.toString();
            }
        });
        return values;
    }, [sourcesTotals, familyCounts, years]);

    // ----- Table 5-6: פער לוחות חישוב הוצאות המחיה (Gap in living expenses calculation tables) -----
    // Table 5-6 data structure: [family_size_index][bracket_index]
    // Rows = family sizes (1, 2, 3, 4, 5, 6+)
    // Columns = income brackets (descending: highest to lowest)
    // So bracket_index 0 = highest bracket, bracket_index 9 = lowest bracket
    const TABLE_5_6_DATA = {
        2024: [
            [60422, 46877, 45302, 36480, 43104, 31709, 37843, 25229, 15840, 15456],   // 1 person: [534937, 534936, ..., 61584]
            [115901, 69533, 55181, 54163, 48086, 42682, 30874, 30922, 23136, 28810], // 2 people
            [91200, 70445, 75859, 60893, 47664, 44765, 40253, 36451, 27821, 23914], // 3 people
            [111859, 78125, 67392, 72048, 54336, 46973, 45744, 42077, 33926, 32410], // 4 people
            [114058, 91670, 76838, 71885, 65376, 50765, 61450, 50045, 31997, 22310], // 5 people
            [112810, 81274, 73738, 75245, 63398, 50448, 43018, 43613, 38890, 27226], // 6+ people
        ],
        2023: [
            [60422, 46877, 45302, 36480, 43104, 31709, 37843, 25229, 15840, 15456],   // 1 person
            [115901, 69533, 55181, 54163, 48086, 42682, 30874, 30922, 23136, 28810], // 2 people
            [91200, 70445, 75859, 60893, 47664, 44765, 40253, 36451, 27821, 23914], // 3 people
            [111859, 78125, 67392, 72048, 54336, 46973, 45744, 42077, 33926, 32410], // 4 people
            [114058, 91670, 76838, 71885, 65376, 50765, 61450, 50045, 31997, 22310], // 5 people
            [112810, 81274, 73738, 75245, 63398, 50448, 43018, 43613, 38890, 27226], // 6+ people
        ],
        2022: [
            [60422, 46877, 45302, 36480, 43104, 31709, 37843, 25229, 15840, 15456],   // 1 person
            [115901, 69533, 55181, 54163, 48086, 42682, 30874, 30922, 23136, 28810], // 2 people
            [91200, 70445, 75859, 60893, 47664, 44765, 40253, 36451, 27821, 23914], // 3 people
            [111859, 78125, 67392, 72048, 54336, 46973, 45744, 42077, 33926, 32410], // 4 people
            [114058, 91670, 76838, 71885, 65376, 50765, 61450, 50045, 31997, 22310], // 5 people
            [112810, 81274, 73738, 75245, 63398, 50448, 43018, 43613, 38890, 27226], // 6+ people
        ],
        2021: [
            [85478, 31834, 39754, 26410, 31872, 26131, 22771, 18624, 13910, 10474],   // 1 person: [492085, 492084, ..., 50628]
            [89040, 47059, 56371, 41587, 39629, 32746, 27226, 23242, 19325, 23155], // 2 people
            [80045, 52330, 59184, 46982, 38486, 31814, 30547, 26131, 27965, 33178], // 3 people
            [71798, 61344, 48826, 49066, 43440, 51965, 43267, 33782, 33821, 27782], // 4 people
            [93936, 69322, 64742, 51264, 45542, 44957, 38074, 36653, 23731, 33053], // 5 people
            [86717, 66182, 61373, 56016, 49757, 39773, 46675, 32899, 24192, 33725], // 6+ people
        ],
        2020: [
            [44995, 41069, 34541, 21562, 26755, 21744, 23645, 16666, 14458, 11338],   // 1 person: [474541, 474540, ..., 53760]
            [61603, 49200, 39475, 34483, 30922, 30605, 23962, 17434, 15216, 27638], // 2 people
            [61968, 54586, 48941, 40877, 30614, 33581, 26669, 23088, 30605, 21350], // 3 people
            [73037, 53894, 47280, 44083, 47098, 32458, 37344, 29261, 29366, 19997], // 4 people
            [73392, 58157, 56179, 56957, 41693, 40080, 34416, 31862, 27398, 21782], // 5 people
            [82301, 59846, 60182, 51600, 47098, 37210, 39917, 30442, 28675, 25565], // 6+ people
        ],
        2019: [
            [66643, 60451, 41933, 38256, 32054, 41242, 24432, 26890, 16704, 11386],   // 1 person: [473809, 473808, ..., 54636]
            [90019, 65539, 60442, 49776, 40406, 37085, 36528, 27293, 20899, 22867], // 2 people
            [100310, 69024, 62602, 59856, 45130, 37642, 36874, 36845, 33485, 30739], // 3 people
            [104016, 82541, 63206, 59952, 49421, 47299, 33773, 35290, 27110, 15696], // 4 people
            [125050, 82243, 70637, 61133, 48154, 50496, 39773, 27744, 28819, 30019], // 5 people
            [120787, 90163, 65962, 62246, 50122, 52944, 41136, 39235, 33139, 49210], // 6+ people
        ],
    };

    // Function to find bracket index for table 5-6
    // In table 5-6, columns are in descending order (highest to lowest)
    // So bracket_index 0 = highest bracket, bracket_index 9 = lowest bracket
    // findBracketIndex returns: 0 = lowest, 9 = highest
    // So we need to reverse: bracket_index_5_6 = 9 - findBracketIndex(...)
    const findBracketIndexFor5_6 = (income, year) => {
        const bracketIdx = findBracketIndex(income, year);
        return 9 - bracketIdx; // Reverse: 0→9, 1→8, ..., 9→0
    };

    // Calculate value_5_6 for each year
    const value_5_6 = useMemo(() => {
        const values = Array(5).fill("");
        years.forEach((year, idx) => {
            const totalIncome = sourcesTotals[idx] || 0;
            const familyCount = familyCounts[idx] || "";
            
            if (totalIncome > 0 && familyCount) {
                const yearData = TABLE_5_6_DATA[year] || TABLE_5_6_DATA[2024];
                const bracketIdx = findBracketIndexFor5_6(totalIncome, year);
                const familyIdx = getFamilySizeIndex(familyCount);
                const result = yearData[familyIdx][bracketIdx];
                values[idx] = result.toString();
            }
        });
        return values;
    }, [sourcesTotals, familyCounts, years]);

    // Grand total of הוצאות המחיה (value_3_4) across all years
    const value_3_4_GrandTotal = useMemo(() => {
        const grandTotal = value_3_4.reduce((sum, val) => sum + (Number(val) || 0), 0);
        return Array(5).fill("").map((_, idx) => idx === 4 ? grandTotal.toString() : "");
    }, [value_3_4]);

    // Grand total of פער לוחות חישוב הוצאות המחיה (value_5_6) across all years
    const value_5_6_GrandTotal = useMemo(() => {
        const grandTotal = value_5_6.reduce((sum, val) => sum + (Number(val) || 0), 0);
        return Array(5).fill("").map((_, idx) => idx === 4 ? grandTotal.toString() : "");
    }, [value_5_6]);

    // ----- Calculation Results -----
    const [calculationResults, setCalculationResults] = useState({
        2023: null,
        2024: null
    });

    // Check if any inputs have values
    const hasInputs = useMemo(() => {
        // Check family counts
        const hasFamilyCounts = familyCounts.some(v => v && v !== "" && Number(v) > 0);
        
        // Check sources
        const hasSources = sources.some(row => row.some(v => v && v !== "" && Number(v) > 0));
        
        // Check expenses
        const hasExpenses = expenses.some(row => row.some(v => v && v !== "" && Number(v) > 0));
        
        // Check assets
        const hasAssets = assets.some(row => row.some(v => v && v !== "" && Number(v) > 0));
        
        // Check owner balances
        const hasOwnerBalances = ownerBalances.some(row => row.some(v => v && v !== "" && Number(v) > 0));
        
        // Check cash
        const hasCash = cash.some(v => v && v !== "" && Number(v) > 0);
        
        // Check value_3_4
        const hasValue34 = value_3_4.some(v => v && v !== "" && Number(v) > 0);
        
        // Check value_5_6
        const hasValue56 = value_5_6.some(v => v && v !== "" && Number(v) > 0);
        
        return hasFamilyCounts || hasSources || hasExpenses || hasAssets || hasOwnerBalances || hasCash || hasValue34 || hasValue56;
    }, [familyCounts, sources, expenses, assets, ownerBalances, cash, value_3_4, value_5_6]);

    const calculateResults = () => {
        // Get the last year index (always 4 for the selected year)
        const lastYearIdx = 4;
        
        // Get values for the selected year
        const cashChangeValue = Number(cashChange[lastYearIdx]) || 0; // השינוי במזומן
        // הוצאות מחיה = مجموع جميع السنوات من value_3_4 (2020-2024 أو 2019-2023)
        // Living Expenses = sum of all years from value_3_4
        const livingExpensesValue = value_3_4.reduce((sum, val) => sum + (Number(val) || 0), 0);
        const assetsChangeValue = Number(assetsChange[lastYearIdx]) || 0; // השינוי ברכוש ובהתחייבויות
        const investmentChangeValue = Number(investmentChange[lastYearIdx]) || 0; // השינוי בהשקעה
        // סה"כ הוצאות = مجموع כל الصفوف في "פירוט שימושים והוצאות נוספות"
        // Total Expenses = sum of all rows in "פירוט שימושים והוצאות נוספות" section
        const totalExpenses = expensesTotals[lastYearIdx] || 0;
        // מקורות הגידול (הכנסות) = סה״כ הכנסות (כל השנים)
        // Sources of Growth (Income) = Total Income (All Years)
        const totalSources = Number(sourcesGrandTotal[lastYearIdx]) || 0;
        // פער לוחות חישוב הוצאות המחיה = مجموع جميع السنوات מ value_5_6
        // Gap in living expenses calculation tables = sum of all years from value_5_6
        const value_5_6_Value = value_5_6.reduce((sum, val) => sum + (Number(val) || 0), 0);

        // 1. שינוי בהון = השינוי במזומן + השינוי בהשקעה + השינוי ברכוש ובהתחייבויות
        // Capital Change = Cash Change + Investment Change + Assets Change
        const capitalChange = cashChangeValue + investmentChangeValue + assetsChangeValue;

        // 2. סה"כ הוצאות = مجموع כל ההוצאות (מס הכנסה, ביטוח לאומי, הוצאות ריבית, וכו')
        // Total Expenses = sum of all expenses (income tax, national insurance, interest expenses, etc.)
        const totalExpensesValue = totalExpenses;

        // 3. גידול בהון + הוצאות = שינוי בהון + סה"כ הוצאות
        const capitalGrowthPlusExpenses = capitalChange + totalExpensesValue;

        // 4. מקורות הגידול (הכנסות) = סה״כ הכנסות (כל השנים)
        // Sources of Growth (Income) = Total Income (All Years)
        const sourcesOfGrowth = totalSources;

        // 5. גידול בהון לפני הוצאות המחיה = (גידול בהון + הוצאות) - מקורות הגידול (הכנסות)
        // Capital Growth Before Living Expenses = (Capital Growth + Expenses) - Sources of Growth (Income)
        // This is: Expenses - Income (but calculated as above)
        const capitalGrowthBeforeLivingExpenses = capitalGrowthPlusExpenses - sourcesOfGrowth;

        // 6. הוצאות מחיה = value_3_4 (sum of all years)
        const livingExpenses = livingExpensesValue;
        
        // 7. Empty row value = הוצאות מחיה + גידול בהון לפני הוצאות המחיה
        // Empty Row Value = Living Expenses + Capital Growth Before Living Expenses
        const emptyRowValue = livingExpenses + capitalGrowthBeforeLivingExpenses;

        // Check if absolute value of empty row is less than 10,000
        const absEmptyRowValue = Math.abs(emptyRowValue);
        const shouldStopEarly = absEmptyRowValue < 10000;

        // Determine which table was used (3-4 or 5-6)
        let tableUsed = livingExpensesValue > 0 ? "3+4" : "5+6";
        
        // Check result (תוצאת הבדיקה)
        let checkResult = "";
        let finalResult = 0;
        let intermediate1 = 0;
        let intermediate2 = 0;
        let intermediate3 = 0;
        let intermediate4 = 0;
        let intermediate5 = 0;

        // Get grand total of value_5_6 (פער לוחות חישוב הוצאות המחיה - כל השנים)
        const value_5_6_GrandTotalValue = Number(value_5_6_GrandTotal[4]) || 0;
        
        // Second empty row value = emptyRowValue - value_5_6_GrandTotal
        const secondEmptyRowValue = emptyRowValue - value_5_6_GrandTotalValue;
        
        // ניתוח תוצאה = abs(secondEmptyRowValue) / 60
        const resultAnalysis = Math.abs(secondEmptyRowValue) / 60;

        if (shouldStopEarly) {
            // If abs(emptyRowValue) < 10000, show "תקין" and stop calculation
            checkResult = "תקין";
            tableUsed = "3+4"; // Use לוח 3+4
        } else {
            // Continue with normal calculation
            // Additional calculations based on the image
            // These seem to be intermediate calculations
            intermediate1 = capitalGrowthBeforeLivingExpenses - value_5_6_Value;
            intermediate2 = sourcesOfGrowth - intermediate1;
            intermediate3 = capitalGrowthBeforeLivingExpenses;
            intermediate4 = intermediate2 - capitalGrowthPlusExpenses;
            intermediate5 = intermediate3;
            
            // תוצאת השוואת הון = min(emptyRowValue, secondEmptyRowValue)
            // Always use min of emptyRowValue and secondEmptyRowValue (when not shouldStopEarly)
            finalResult = Math.min(emptyRowValue, secondEmptyRowValue);

            // Check ניתוח תוצאה (resultAnalysis)
            // If resultAnalysis < 1000: תקין and use לוח 5+6
            // Else: חוסרים בהצהרת הון
            if (resultAnalysis < 1000) {
                checkResult = "תקין";
                tableUsed = "5+6";
            } else {
                checkResult = "חוסרים בהצהרת הון";
                // Keep existing tableUsed logic
                tableUsed = livingExpensesValue > 0 ? "3+4" : "5+6";
            }
        }

        const results = {
            capitalChange: Math.round(capitalChange),
            totalExpenses: Math.round(totalExpensesValue),
            capitalGrowthPlusExpenses: Math.round(capitalGrowthPlusExpenses),
            sourcesOfGrowth: Math.round(sourcesOfGrowth),
            capitalGrowthBeforeLivingExpenses: Math.round(capitalGrowthBeforeLivingExpenses),
            livingExpenses: Math.round(livingExpenses),
            emptyRowValue: Math.round(emptyRowValue), // הוצאות מחיה + גידול בהון לפני הוצאות המחיה
            intermediate1: Math.round(intermediate1),
            intermediate2: Math.round(intermediate2),
            intermediate3: Math.round(intermediate3),
            intermediate4: Math.round(intermediate4),
            intermediate5: Math.round(intermediate5),
            finalResult: Math.round(finalResult * 100) / 100,
            tableUsed: tableUsed,
            checkResult: checkResult,
            shouldStopEarly: shouldStopEarly,
            value_5_6_GrandTotal: Math.round(value_5_6_GrandTotalValue),
            secondEmptyRowValue: Math.round(secondEmptyRowValue),
            resultAnalysis: Math.round(resultAnalysis * 100) / 100
        };

        setCalculationResults(prev => ({
            ...prev,
            [selectedYear]: results
        }));
    };

    return (
        <>
            {showAlert && (
                <CustomAlert
                    title="התחברות נדרשת"
                    message="עליך להתחבר כדי להשתמש במחשבון"
                    onClose={handleAlertClose}
                />
            )}
            <EquityComparisonUrbanMobile />
            <section className="eqc-container" dir="rtl">
            <h2 className="calculators-desktop-section-title eqc-title">
                <span>השוואת הון - עירוני</span>
            </h2>

            {/* Year Selector */}
            <div className="eqc-year-selector">
                <div className="eqc-year-label">בחר שנה:</div>
                <div className="eqc-year-options">
                    {AVAILABLE_YEARS.map(y => (
                        <label key={y} className={`eqc-year-option ${selectedYear === y ? "active" : ""}`}>
                            <input
                                type="radio"
                                name="eqc-year"
                                value={y}
                                checked={selectedYear === y}
                                onChange={() => setSelectedYear(y)}
                            />
                            {y}
                        </label>
                    ))}
                </div>
                <div className="eqc-year-range">
                    טווח השנים: {years[0]} - {years[4]}
                </div>
            </div>

            {/* Grid header for years */}
            <div className="eqc-header-wrapper">
                {years.map(y => (
                    <div key={`head-${y}`} className="eqc-header">{y}</div>
                ))}
                <div className="eqc-header">מקור ההכנסה/ההוצאה</div>
            </div>

            <div className="eqc-grid">
                {/* Family members count */}
                <div className="eqc-section-bar">מס' נפשות בבית</div>
                <Row label="מס' נפשות בבית" values={familyCounts} onChange={updateFamily} years={years} />

                {/* Section 1: פירוט המקורות */}
                <div className="eqc-section-bar">פירוט המקורות</div>
                {sourceLabels.map((label, rIdx) => (
                    <Row
                        key={label}
                        label={label}
                        values={sources[rIdx]}
                        onChange={(cIdx, val) => updateSource(rIdx, cIdx, val)}
                        years={years}
                    />
                ))}
                <Row label="סה״כ הכנסות" isTotal values={sourcesTotals} years={years} />
                <div className="eqc-row eqc-row-total">
                    {years.map((year, idx) => (
                        <div 
                            key={`sources-grand-total-${year}`} 
                            className={`eqc-cell ${idx < years.length - 1 ? 'eqc-cell-hidden' : ''}`}
                            style={idx === years.length - 1 ? { background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eef8 100%)', borderColor: '#c5d5e8' } : {}}
                        >
                            {idx === years.length - 1 ? (
                                <input 
                                    className="eqc-input eqc-input-total" 
                                    readOnly 
                                    value={(() => {
                                        const val = sourcesGrandTotal[idx];
                                        if (val === undefined || val === null || val === "") return "0";
                                        const numVal = typeof val === 'number' ? val : Number(val);
                                        return isNaN(numVal) ? "0" : numVal.toLocaleString();
                                    })()}
                                />
                            ) : null}
                        </div>
                    ))}
                    <div className="eqc-label-cell">סה״כ הכנסות (כל השנים)</div>
                </div>

                {/* Section 2: פירוט שימושים והוצאות נוספות */}
                <div className="eqc-section-bar">פירוט שימושים והוצאות נוספות</div>
                {expenseLabels.map((label, rIdx) => (
                    <Row
                        key={label}
                        label={label}
                        values={expenses[rIdx]}
                        onChange={(cIdx, val) => updateExpense(rIdx, cIdx, val)}
                        years={years}
                    />
                ))}
                <Row label="סה״כ הוצאות" isTotal values={expensesTotals} years={years} />
                <div className="eqc-row eqc-row-total">
                    {years.map((year, idx) => (
                        <div 
                            key={`expenses-grand-total-${year}`} 
                            className={`eqc-cell ${idx < years.length - 1 ? 'eqc-cell-hidden' : ''}`}
                            style={idx === years.length - 1 ? { background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eef8 100%)', borderColor: '#c5d5e8' } : {}}
                        >
                            {idx === years.length - 1 ? (
                                <input 
                                    className="eqc-input eqc-input-total" 
                                    readOnly 
                                    value={(() => {
                                        const val = expensesGrandTotal[idx];
                                        if (val === undefined || val === null || val === "") return "0";
                                        const numVal = typeof val === 'number' ? val : Number(val);
                                        return isNaN(numVal) ? "0" : numVal.toLocaleString();
                                    })()}
                                />
                            ) : null}
                        </div>
                    ))}
                    <div className="eqc-label-cell">סה״כ הוצאות (כל השנים)</div>
                </div>

                {/* Section 3: פירוט הרכוש והתחייבויות */}
                <div className="eqc-section-bar">פירוט הרכוש והתחייבויות</div>
                {assetLabels.map((label, rIdx) => (
                    <Row
                        key={label}
                        label={label}
                        values={assets[rIdx]}
                        onChange={(cIdx, val) => updateAsset(rIdx, cIdx, val)}
                        years={years}
                    />
                ))}
                <Row label="סה״כ רכוש והתחייבויות" isTotal values={assetsTotals} years={years} />
                <div className="eqc-row eqc-row-change">
                    {years.map((year, idx) => (
                        <div key={`change-${year}`} className={`eqc-cell ${idx < years.length - 1 ? 'eqc-cell-hidden' : ''}`}>
                            {idx === years.length - 1 ? (
                                <input 
                                    className="eqc-input eqc-input-total" 
                                    readOnly 
                                    value={assetsChange[idx] ?? ""}
                                />
                            ) : null}
                        </div>
                    ))}
                    <div className="eqc-label-cell">השינוי ברכוש ובהתחייבויות</div>
                </div>

                {/* Section 4: יתרות והלוואות בעלים */}
                <div className="eqc-section-bar">יתרות והלוואות בעלים</div>
                {ownerLabels.map((label, rIdx) => (
                    <Row
                        key={label}
                        label={label}
                        values={ownerBalances[rIdx]}
                        onChange={(cIdx, val) => updateOwnerBalance(rIdx, cIdx, val)}
                        years={years}
                    />
                ))}
                <Row label="סך הכל ההשקעה בעסק בו נערך מאזן" isTotal values={ownerBalancesTotals} years={years} />
                <div className="eqc-row eqc-row-change">
                    {years.map((year, idx) => (
                        <div key={`investment-change-${year}`} className={`eqc-cell ${idx < years.length - 1 ? 'eqc-cell-hidden' : ''}`}>
                            {idx === years.length - 1 ? (
                                <input 
                                    className="eqc-input eqc-input-total" 
                                    readOnly 
                                    value={investmentChange[idx] ?? ""}
                                />
                            ) : null}
                        </div>
                    ))}
                    <div className="eqc-label-cell">השינוי בהשקעה</div>
                </div>

                {/* Section 5: מזומנים */}
                <div className="eqc-section-bar">מזומנים</div>
                <Row label="מזומנים לא בבנק או מוסד פיננסי ₪" values={cash} onChange={updateCash} years={years} />
                <div className="eqc-row eqc-row-change">
                    {years.map((year, idx) => (
                        <div key={`cash-change-${year}`} className={`eqc-cell ${idx < years.length - 1 ? 'eqc-cell-hidden' : ''}`}>
                            {idx === years.length - 1 ? (
                                <input 
                                    className="eqc-input eqc-input-total" 
                                    readOnly 
                                    value={cashChange[idx] ?? ""}
                                />
                            ) : null}
                        </div>
                    ))}
                    <div className="eqc-label-cell">השינוי במזומן</div>
                </div>

                {/* Section 6: הוצאות המחיה (Table 3-4) */}
                <div className="eqc-section-bar">הוצאות המחיה (טבלה 3-4)</div>
                <Row 
                    label="הוצאות המחיה" 
                    isTotal 
                    values={value_3_4} 
                    years={years} 
                />
                <div className="eqc-row eqc-row-total">
                    {years.map((year, idx) => (
                        <div 
                            key={`value-3-4-grand-total-${year}`} 
                            className={`eqc-cell ${idx < years.length - 1 ? 'eqc-cell-hidden' : ''}`}
                            style={idx === years.length - 1 ? { background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eef8 100%)', borderColor: '#c5d5e8' } : {}}
                        >
                            {idx === years.length - 1 ? (
                                <input 
                                    className="eqc-input eqc-input-total" 
                                    readOnly 
                                    value={(() => {
                                        const val = value_3_4_GrandTotal[idx];
                                        if (val === undefined || val === null || val === "") return "0";
                                        const numVal = typeof val === 'number' ? val : Number(val);
                                        return isNaN(numVal) ? "0" : numVal.toLocaleString();
                                    })()}
                                />
                            ) : null}
                        </div>
                    ))}
                    <div className="eqc-label-cell">סה״כ הוצאות המחיה (כל השנים)</div>
                </div>

                {/* Section 7: פער לוחות חישוב הוצאות המחיה (Table 5-6) */}
                <div className="eqc-section-bar">פער לוחות חישוב הוצאות המחיה (טבלה 5-6)</div>
                <Row 
                    label="פער לוחות חישוב הוצאות המחיה" 
                    isTotal 
                    values={value_5_6} 
                    years={years} 
                />
                <div className="eqc-row eqc-row-total">
                    {years.map((year, idx) => (
                        <div 
                            key={`value-5-6-grand-total-${year}`} 
                            className={`eqc-cell ${idx < years.length - 1 ? 'eqc-cell-hidden' : ''}`}
                            style={idx === years.length - 1 ? { background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eef8 100%)', borderColor: '#c5d5e8' } : {}}
                        >
                            {idx === years.length - 1 ? (
                                <input 
                                    className="eqc-input eqc-input-total" 
                                    readOnly 
                                    value={(() => {
                                        const val = value_5_6_GrandTotal[idx];
                                        if (val === undefined || val === null || val === "") return "0";
                                        const numVal = typeof val === 'number' ? val : Number(val);
                                        return isNaN(numVal) ? "0" : numVal.toLocaleString();
                                    })()}
                                />
                            ) : null}
                        </div>
                    ))}
                    <div className="eqc-label-cell">סה״כ פער לוחות חישוב הוצאות המחיה (כל השנים)</div>
                </div>
            </div>

            <div className="eqc-actions">
                <button 
                    className={`eqc-calculate-btn ${!hasInputs ? "disabled" : ""}`} 
                    onClick={calculateResults}
                    disabled={!hasInputs}
                >
                    חשב
                </button>
            </div>

            {/* Calculation Results Table */}
            {calculationResults[selectedYear] && (
                <div className="eqc-results-container">
                    <h3 className="eqc-results-title">החישוב וביצוע השוואת הון:</h3>
                    <div className="eqc-results-table">
                        <div className="eqc-results-header">
                            <div className="eqc-results-label">המשתנה</div>
                            <div className="eqc-results-value">{selectedYear}</div>
                        </div>
                        
                        <div className="eqc-results-row">
                            <div className="eqc-results-label">שינוי בהון</div>
                            <div className="eqc-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].capitalChange)}
                            </div>
                        </div>
                        
                        <div className="eqc-results-row">
                            <div className="eqc-results-label">סה"כ הוצאות</div>
                            <div className="eqc-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].totalExpenses)}
                            </div>
                        </div>
                        
                        <div className="eqc-results-row">
                            <div className="eqc-results-label">גידול בהון + הוצאות</div>
                            <div className="eqc-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].capitalGrowthPlusExpenses)}
                            </div>
                        </div>
                        
                        <div className="eqc-results-row">
                            <div className="eqc-results-label">מקורות הגידול (הכנסות)</div>
                            <div className="eqc-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].sourcesOfGrowth)}
                            </div>
                        </div>
                        
                        <div className="eqc-results-row">
                            <div className="eqc-results-label">גידול בהון לפני הוצאות המחיה</div>
                            <div className="eqc-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].capitalGrowthBeforeLivingExpenses)}
                            </div>
                        </div>
                        
                        {/* Check if should stop early (abs(emptyRowValue) < 10000) */}
                        {calculationResults[selectedYear].shouldStopEarly ? (
                            <>
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">הוצאות מחיה</div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].livingExpenses)}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label"></div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].emptyRowValue)}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row highlight" style={{ background: '#d4edda', border: '2px solid #28a745' }}>
                                    <div className="eqc-results-label" style={{ color: '#155724', fontWeight: 700 }}>
                                        תוצאת הבדיקה
                                    </div>
                                    <div className="eqc-results-value" style={{ background: '#d4edda', borderColor: '#28a745', color: '#155724', fontWeight: 700 }}>
                                        {calculationResults[selectedYear].checkResult}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">שימוש בלוחות</div>
                                    <div className="eqc-results-value">
                                        {calculationResults[selectedYear].tableUsed}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row" style={{ background: '#d1ecf1', border: '1px solid #bee5eb' }}>
                                    <div className="eqc-results-label" style={{ color: '#0c5460' }}>
                                        הערה: תקין - שימוש בלוח 3+4
                                    </div>
                                    <div className="eqc-results-value" style={{ background: '#d1ecf1', borderColor: '#bee5eb', color: '#0c5460' }}>
                                        הערה: תקין - שימוש בלוח 3+4
                                    </div>
                                </div>
                            </>
                        ) : calculationResults[selectedYear].capitalGrowthBeforeLivingExpenses > 0 ? (
                            <div className="eqc-results-row" style={{ background: '#fff3cd', border: '2px solid #ffc107' }}>
                                <div className="eqc-results-label" style={{ color: '#856404', fontWeight: 700 }}>
                                    קיימת חזקה כי ישנן הכנסות שלא דווחו
                                </div>
                                <div className="eqc-results-value" style={{ background: '#fff3cd', borderColor: '#ffc107', color: '#856404' }}>
                                    קיימת חזקה כי ישנן הכנסות שלא דווחו
                                </div>
                            </div>
                        ) : calculationResults[selectedYear].capitalGrowthBeforeLivingExpenses === 0 ? (
                            <>
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">לפי הערך נבדוק אם נמשיך</div>
                                    <div className="eqc-results-value">
                                        נמשיך
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">אם הערך = 0 נמשיך את הבדיקה</div>
                                    <div className="eqc-results-value">
                                        כן
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">הוצאות מחיה</div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].livingExpenses)}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label"></div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].emptyRowValue)}
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* If negative, only show הוצאות מחיה */
                            <>
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">הוצאות מחיה</div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].livingExpenses)}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label"></div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].emptyRowValue)}
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {/* Hide these fields if גידול בהון לפני הוצאות המחיה > 0 or shouldStopEarly */}
                        {!calculationResults[selectedYear].shouldStopEarly && calculationResults[selectedYear].capitalGrowthBeforeLivingExpenses <= 0 && (
                            <>
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">סה״כ פער לוחות חישוב הוצאות המחיה (כל השנים)</div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].value_5_6_GrandTotal)}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">סה״כ פער לוחות חישוב הוצאות המחיה (כל השנים) (טבלה 5-6)</div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].secondEmptyRowValue)}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row highlight">
                                    <div className="eqc-results-label">תוצאת השוואת הון:</div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].finalResult)}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">ניתוח תוצאה</div>
                                    <div className="eqc-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].resultAnalysis)}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">תוצאת הבדיקה</div>
                                    <div className="eqc-results-value">
                                        {calculationResults[selectedYear].checkResult}
                                    </div>
                                </div>
                                
                                <div className="eqc-results-row">
                                    <div className="eqc-results-label">שימוש בלוחות</div>
                                    <div className="eqc-results-value">
                                        {calculationResults[selectedYear].tableUsed}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
        </>
    );
}

export default EquityComparisonUrban;


