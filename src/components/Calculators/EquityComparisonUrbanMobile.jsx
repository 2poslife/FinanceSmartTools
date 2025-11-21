'use client'

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import "../../styles/CalculatorsPage/CalculatorsGrid.css";
import "../../styles/Calculators/EquityComparison.css";
import "../../styles/Calculators/EquityComparisonMobile.css";
import CustomAlert from "./CustomAlert";

// Helper function to format numbers for RTL (minus sign on the right)
const formatNumberRTL = (num) => {
    if (num === null || num === undefined || isNaN(num)) return "0";
    const absNum = Math.abs(num);
    const formatted = absNum.toLocaleString();
    return num < 0 ? `${formatted}-` : formatted;
};

// Mobile: Row component showing all years horizontally - moved outside to prevent recreation
const MobileRow = React.memo(({ label, values, onChange, isTotal, years }) => {
    return (
        <div className={`eqc-mobile-row ${isTotal ? "eqc-mobile-row-total" : ""}`}>
            <div className="eqc-mobile-row-label">{label}</div>
            <div className="eqc-mobile-row-inputs">
                {years.map((year, idx) => {
                    const value = values?.[idx] ?? "";
                    return (
                        <div key={`${label}-${year}-${idx}`} className="eqc-mobile-row-cell">
                            <div className="eqc-mobile-row-year">{year}</div>
                            {isTotal ? (
                                <input 
                                    className="eqc-mobile-row-input eqc-mobile-row-input-total" 
                                    readOnly 
                                    value={(() => {
                                        if (value === undefined || value === null || value === "") return "0";
                                        const numVal = typeof value === 'number' ? value : Number(value);
                                        return isNaN(numVal) ? "0" : numVal.toLocaleString();
                                    })()}
                                />
                            ) : (
                                <input
                                    className="eqc-mobile-row-input eqc-mobile-row-input-user"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    autoComplete="off"
                                    value={value || ""}
                                    onChange={e => {
                                        const inputValue = e.target.value || "";
                                        const next = inputValue.replace(/[^0-9]/g, "");
                                        if (onChange) {
                                            onChange(idx, next);
                                        }
                                    }}
                                    placeholder="0"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

MobileRow.displayName = 'MobileRow';

function EquityComparisonUrbanMobile() {
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
            // Error will be logged in development, removed in production by Next.js compiler
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
        expenses.forEach((row) => {
            row.forEach((v, colIdx) => {
                const numValue = v === "" || v === null || v === undefined ? 0 : Number(v);
                if (!isNaN(numValue)) {
                    totals[colIdx] += numValue;
                }
            });
        });
        const sumOfAllYears = totals.reduce((sum, val) => sum + val, 0);
        totals[4] = sumOfAllYears;
        return totals;
    }, [expenses]);
    
    // Grand total of all expenses across all years
    const expensesGrandTotal = useMemo(() => {
        const totals = Array(5).fill(0);
        expenses.forEach((row) => {
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

    const assetsChange = useMemo(() => {
        const values = Array(5).fill("");
        if (selectedYear === 2024) {
            values[4] = (assetsTotals[4] - assetsTotals[0]).toString();
        } else if (selectedYear === 2023) {
            values[4] = (assetsTotals[4] - assetsTotals[0]).toString();
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

    const investmentChange = useMemo(() => {
        const values = Array(5).fill("");
        if (selectedYear === 2024) {
            values[4] = (ownerBalancesTotals[4] - ownerBalancesTotals[0]).toString();
        } else if (selectedYear === 2023) {
            values[4] = (ownerBalancesTotals[4] - ownerBalancesTotals[0]).toString();
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

    const cashChange = useMemo(() => {
        const values = Array(5).fill("");
        if (selectedYear === 2024) {
            values[4] = ((Number(cash[4]) || 0) - (Number(cash[0]) || 0)).toString();
        } else if (selectedYear === 2023) {
            values[4] = ((Number(cash[4]) || 0) - (Number(cash[0]) || 0)).toString();
        }
        return values;
    }, [cash, selectedYear]);

    // ----- Table 3-4 and 5-6 data (same as desktop) -----
    const INCOME_BRACKETS = {
        2024: [534937, 534936, 390972, 305040, 246120, 197652, 162852, 126840, 97476, 61584],
        2023: [534937, 534936, 390972, 305040, 246120, 197652, 162852, 126840, 97476, 61584],
        2022: [534937, 534936, 390972, 305040, 246120, 197652, 162852, 126840, 97476, 61584],
        2021: [492085, 492084, 352224, 274308, 221844, 177864, 143904, 111408, 80952, 50628],
        2020: [474541, 474540, 341904, 270300, 218940, 179244, 142836, 111012, 82956, 53760],
        2019: [473809, 473808, 348936, 276396, 224880, 183312, 146148, 113352, 83772, 54636],
    };
    
    const TABLE_3_4_DATA = {
        2024: [
            [39226, 72970, 76694, 85546, 74563, 97258],
            [44669, 59770, 79814, 101683, 85594, 99130],
            [53731, 80544, 95693, 94330, 131760, 117206],
            [75437, 84058, 107549, 116794, 123955, 119750],
            [71088, 98112, 100656, 114355, 137626, 123590],
            [90528, 105130, 110026, 123014, 144739, 154541],
            [83626, 114019, 125971, 142858, 142589, 168806],
            [101693, 119808, 145411, 145085, 164947, 169114],
            [135686, 146448, 148733, 160848, 180643, 171293],
            [125578, 214570, 199402, 210067, 223104, 209818],
        ],
        2023: [
            [39226, 72970, 76694, 85546, 74563, 97258],
            [44669, 59770, 79814, 101683, 85594, 99130],
            [53731, 80544, 95693, 94330, 131760, 117206],
            [75437, 84058, 107549, 116794, 123955, 119750],
            [71088, 98112, 100656, 114355, 137626, 123590],
            [90528, 105130, 110026, 123014, 144739, 154541],
            [83626, 114019, 125971, 142858, 142589, 168806],
            [101693, 119808, 145411, 145085, 164947, 169114],
            [135686, 146448, 148733, 160848, 180643, 171293],
            [125578, 214570, 199402, 210067, 223104, 209818],
        ],
        2022: [
            [39226, 72970, 76694, 85546, 74563, 97258],
            [44669, 59770, 79814, 101683, 85594, 99130],
            [53731, 80544, 95693, 94330, 131760, 117206],
            [75437, 84058, 107549, 116794, 123955, 119750],
            [71088, 98112, 100656, 114355, 137626, 123590],
            [90528, 105130, 110026, 123014, 144739, 154541],
            [83626, 114019, 125971, 142858, 142589, 168806],
            [101693, 119808, 145411, 145085, 164947, 169114],
            [135686, 146448, 148733, 160848, 180643, 171293],
            [125578, 214570, 199402, 210067, 223104, 209818],
        ],
        2021: [
            [32093, 54566, 74179, 70291, 73267, 80995],
            [38266, 55066, 63936, 84432, 72451, 72816],
            [45389, 57005, 73862, 84528, 88378, 112426],
            [56419, 72749, 80928, 103085, 105178, 105850],
            [60998, 81638, 76435, 106214, 119731, 107405],
            [71789, 89232, 102806, 101280, 119741, 120614],
            [61507, 101616, 105792, 109670, 124570, 138432],
            [81197, 118042, 127968, 116035, 142416, 158640],
            [85181, 113213, 123888, 136858, 148771, 153197],
            [180442, 184243, 164486, 162010, 191597, 199776],
        ],
        2020: [
            [31296, 56170, 55766, 48605, 74794, 58598],
            [37901, 43853, 68179, 67584, 58253, 69062],
            [45178, 51456, 58224, 79507, 71933, 79488],
            [53818, 63082, 62198, 89654, 85507, 93917],
            [51341, 69619, 78662, 78691, 100032, 83002],
            [64627, 78010, 79411, 100838, 94666, 98323],
            [50381, 82454, 83309, 102758, 114442, 116534],
            [73594, 88848, 113971, 109267, 132739, 130560],
            [89386, 99965, 114912, 122246, 129187, 133536],
            [94704, 130387, 133286, 152765, 161731, 175507],
        ],
        2019: [
            [31296, 56170, 55766, 48605, 74794, 58598],
            [37901, 43853, 68179, 67584, 58253, 69062],
            [45178, 51456, 58224, 79507, 71933, 79488],
            [53818, 63082, 62198, 89654, 85507, 93917],
            [51341, 69619, 78662, 78691, 100032, 83002],
            [64627, 78010, 79411, 100838, 94666, 98323],
            [50381, 82454, 83309, 102758, 114442, 116534],
            [73594, 88848, 113971, 109267, 132739, 130560],
            [89386, 99965, 114912, 122246, 129187, 133536],
            [94704, 130387, 133286, 152765, 161731, 175507],
        ],
    };
    
    const TABLE_5_6_DATA = {
        2024: [
            [60422, 46877, 45302, 36480, 43104, 31709, 37843, 25229, 15840, 15456],
            [115901, 69533, 55181, 54163, 48086, 42682, 30874, 30922, 23136, 28810],
            [91200, 70445, 75859, 60893, 47664, 44765, 40253, 36451, 27821, 23914],
            [111859, 78125, 67392, 72048, 54336, 46973, 45744, 42077, 33926, 32410],
            [114058, 91670, 76838, 71885, 65376, 50765, 61450, 50045, 31997, 22310],
            [112810, 81274, 73738, 75245, 63398, 50448, 43018, 43613, 38890, 27226],
        ],
        2023: [
            [60422, 46877, 45302, 36480, 43104, 31709, 37843, 25229, 15840, 15456],
            [115901, 69533, 55181, 54163, 48086, 42682, 30874, 30922, 23136, 28810],
            [91200, 70445, 75859, 60893, 47664, 44765, 40253, 36451, 27821, 23914],
            [111859, 78125, 67392, 72048, 54336, 46973, 45744, 42077, 33926, 32410],
            [114058, 91670, 76838, 71885, 65376, 50765, 61450, 50045, 31997, 22310],
            [112810, 81274, 73738, 75245, 63398, 50448, 43018, 43613, 38890, 27226],
        ],
        2022: [
            [60422, 46877, 45302, 36480, 43104, 31709, 37843, 25229, 15840, 15456],
            [115901, 69533, 55181, 54163, 48086, 42682, 30874, 30922, 23136, 28810],
            [91200, 70445, 75859, 60893, 47664, 44765, 40253, 36451, 27821, 23914],
            [111859, 78125, 67392, 72048, 54336, 46973, 45744, 42077, 33926, 32410],
            [114058, 91670, 76838, 71885, 65376, 50765, 61450, 50045, 31997, 22310],
            [112810, 81274, 73738, 75245, 63398, 50448, 43018, 43613, 38890, 27226],
        ],
        2021: [
            [85478, 31834, 39754, 26410, 31872, 26131, 22771, 18624, 13910, 10474],
            [89040, 47059, 56371, 41587, 39629, 32746, 27226, 23242, 19325, 23155],
            [80045, 52330, 59184, 46982, 38486, 31814, 30547, 26131, 27965, 33178],
            [71798, 61344, 48826, 49066, 43440, 51965, 43267, 33782, 33821, 27782],
            [93936, 69322, 64742, 51264, 45542, 44957, 38074, 36653, 23731, 33053],
            [86717, 66182, 61373, 56016, 49757, 39773, 46675, 32899, 24192, 33725],
        ],
        2020: [
            [44995, 41069, 34541, 21562, 26755, 21744, 23645, 16666, 14458, 11338],
            [61603, 49200, 39475, 34483, 30922, 30605, 23962, 17434, 15216, 27638],
            [61968, 54586, 48941, 40877, 30614, 33581, 26669, 23088, 30605, 21350],
            [73037, 53894, 47280, 44083, 47098, 32458, 37344, 29261, 29366, 19997],
            [73392, 58157, 56179, 56957, 41693, 40080, 34416, 31862, 27398, 21782],
            [82301, 59846, 60182, 51600, 47098, 37210, 39917, 30442, 28675, 25565],
        ],
        2019: [
            [66643, 60451, 41933, 38256, 32054, 41242, 24432, 26890, 16704, 11386],
            [90019, 65539, 60442, 49776, 40406, 37085, 36528, 27293, 20899, 22867],
            [100310, 69024, 62602, 59856, 45130, 37642, 36874, 36845, 33485, 30739],
            [104016, 82541, 63206, 59952, 49421, 47299, 33773, 35290, 27110, 15696],
            [125050, 82243, 70637, 61133, 48154, 50496, 39773, 27744, 28819, 30019],
            [120787, 90163, 65962, 62246, 50122, 52944, 41136, 39235, 33139, 49210],
        ],
    };

    const findBracketIndex = (income, year) => {
        const brackets = INCOME_BRACKETS[year] || INCOME_BRACKETS[2024];
        if (income < brackets[9]) {
            return 0;
        }
        for (let i = 9; i > 0; i--) {
            if (income >= brackets[i] && income < brackets[i - 1]) {
                return 10 - i;
            }
        }
        return 9;
    };

    const getFamilySizeIndex = (familyCount) => {
        const count = Number(familyCount) || 0;
        if (count <= 0) return 0;
        if (count >= 6) return 5;
        return count - 1;
    };

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
    }, [sourcesTotals, familyCounts, years, TABLE_3_4_DATA, findBracketIndex]);

    const findBracketIndexFor5_6 = (income, year) => {
        const bracketIdx = findBracketIndex(income, year);
        return 9 - bracketIdx;
    };

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
    }, [sourcesTotals, familyCounts, years, TABLE_5_6_DATA, findBracketIndexFor5_6]);

    // Grand totals
    const value_3_4_GrandTotal = useMemo(() => {
        const grandTotal = value_3_4.reduce((sum, val) => sum + (Number(val) || 0), 0);
        return Array(5).fill("").map((_, idx) => idx === 4 ? grandTotal.toString() : "");
    }, [value_3_4]);

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
        const lastYearIdx = 4;
        
        const cashChangeValue = Number(cashChange[lastYearIdx]) || 0;
        const livingExpensesValue = value_3_4.reduce((sum, val) => sum + (Number(val) || 0), 0);
        const assetsChangeValue = Number(assetsChange[lastYearIdx]) || 0;
        const investmentChangeValue = Number(investmentChange[lastYearIdx]) || 0;
        const totalExpenses = expensesTotals[lastYearIdx] || 0;
        const totalSources = Number(sourcesGrandTotal[lastYearIdx]) || 0;
        const value_5_6_Value = value_5_6.reduce((sum, val) => sum + (Number(val) || 0), 0);

        const capitalChange = cashChangeValue + investmentChangeValue + assetsChangeValue;
        const totalExpensesValue = totalExpenses;
        const capitalGrowthPlusExpenses = capitalChange + totalExpensesValue;
        const sourcesOfGrowth = totalSources;
        const capitalGrowthBeforeLivingExpenses = capitalGrowthPlusExpenses - sourcesOfGrowth;
        const livingExpenses = livingExpensesValue;
        const emptyRowValue = livingExpenses + capitalGrowthBeforeLivingExpenses;

        const absEmptyRowValue = Math.abs(emptyRowValue);
        const shouldStopEarly = absEmptyRowValue < 10000;

        const value_5_6_GrandTotalValue = Number(value_5_6_GrandTotal[4]) || 0;
        const secondEmptyRowValue = emptyRowValue - value_5_6_GrandTotalValue;
        const resultAnalysis = Math.abs(secondEmptyRowValue) / 60;

        let tableUsed = livingExpensesValue > 0 ? "3+4" : "5+6";
        let checkResult = "";
        let finalResult = 0;
        let intermediate1 = 0;
        let intermediate2 = 0;
        let intermediate3 = 0;
        let intermediate4 = 0;
        let intermediate5 = 0;

        if (shouldStopEarly) {
            checkResult = "תקין";
            tableUsed = "3+4";
        } else {
            intermediate1 = capitalGrowthBeforeLivingExpenses - value_5_6_Value;
            intermediate2 = sourcesOfGrowth - intermediate1;
            intermediate3 = capitalGrowthBeforeLivingExpenses;
            intermediate4 = intermediate2 - capitalGrowthPlusExpenses;
            intermediate5 = intermediate3;
            
            finalResult = Math.min(emptyRowValue, secondEmptyRowValue);

            if (resultAnalysis < 1000) {
                checkResult = "תקין";
                tableUsed = "5+6";
            } else {
                checkResult = "חוסרים בהצהרת הון";
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
            emptyRowValue: Math.round(emptyRowValue),
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
            <div className="eqc-mobile-page">
                {/* Hero Section */}
                <section className="eqc-mobile-hero">
                    <div className="eqc-mobile-hero-card">
                        <span className="eqc-mobile-hero-badge">השוואת הון</span>
                        <h1 className="eqc-mobile-hero-title">השוואת הון - עירוני</h1>
                        <p className="eqc-mobile-hero-description">
                            מחשבון להשוואת הון עבור תושבי ערים. הזן את הנתונים לפי שנים ולחץ על חשב לקבלת התוצאות.
                        </p>
                        
                        {/* Year Selector in Hero */}
                        <div className="eqc-mobile-year-selector-inline">
                            <div className="eqc-mobile-year-label-inline">בחר שנה:</div>
                            <div className="eqc-mobile-year-options-inline">
                                {AVAILABLE_YEARS.map(y => (
                                    <button
                                        key={y}
                                        className={`eqc-mobile-year-btn-inline ${selectedYear === y ? "active" : ""}`}
                                        onClick={() => setSelectedYear(y)}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                            <div className="eqc-mobile-year-range-inline">
                                טווח השנים: {years[0]} - {years[4]}
                            </div>
                        </div>

                    </div>
                </section>

                {/* Collapsible Sections */}
                <div className="eqc-mobile-sections">
                    {/* Family members count */}
                    <details className="eqc-mobile-section" open>
                        <summary className="eqc-mobile-section-summary">
                            <span className="eqc-mobile-section-icon" aria-hidden="true">👥</span>
                            <div className="eqc-mobile-section-text">
                                <h2>מס' נפשות בבית</h2>
                                <p>הזן את מספר הנפשות בבית</p>
                            </div>
                            <span className="eqc-mobile-dot eqc-mobile-dot-blue" aria-hidden="true" />
                        </summary>
                        <div className="eqc-mobile-section-content">
                            <div className="eqc-mobile-rows-wrapper">
                                <MobileRow 
                                    label="מס' נפשות בבית" 
                                    values={familyCounts} 
                                    onChange={updateFamily}
                                    years={years}
                                />
                            </div>
                        </div>
                    </details>

                    {/* Section 1: פירוט המקורות */}
                    <details className="eqc-mobile-section" open>
                        <summary className="eqc-mobile-section-summary">
                            <span className="eqc-mobile-section-icon" aria-hidden="true">📘</span>
                            <div className="eqc-mobile-section-text">
                                <h2>פירוט המקורות</h2>
                                <p>הכנסות מכל המקורות</p>
                            </div>
                            <span className="eqc-mobile-dot eqc-mobile-dot-green" aria-hidden="true" />
                        </summary>
                        <div className="eqc-mobile-section-content">
                            <div className="eqc-mobile-rows-wrapper">
                                {sourceLabels.map((label, rIdx) => (
                                    <MobileRow
                                        key={label}
                                        label={label}
                                        values={sources[rIdx]}
                                        onChange={(cIdx, val) => updateSource(rIdx, cIdx, val)}
                                        years={years}
                                    />
                                ))}
                                <MobileRow 
                                    label="סה״כ הכנסות" 
                                    isTotal 
                                    values={sourcesTotals}
                                    years={years}
                                />
                                <MobileRow 
                                    label="סה״כ הכנסות (כל השנים)" 
                                    isTotal 
                                    values={sourcesGrandTotal}
                                    years={years}
                                />
                            </div>
                        </div>
                    </details>

                    {/* Section 2: פירוט שימושים והוצאות נוספות */}
                    <details className="eqc-mobile-section" open>
                        <summary className="eqc-mobile-section-summary">
                            <span className="eqc-mobile-section-icon" aria-hidden="true">📕</span>
                            <div className="eqc-mobile-section-text">
                                <h2>פירוט שימושים והוצאות נוספות</h2>
                                <p>הוצאות מכל המקורות</p>
                            </div>
                            <span className="eqc-mobile-dot eqc-mobile-dot-red" aria-hidden="true" />
                        </summary>
                        <div className="eqc-mobile-section-content">
                            <div className="eqc-mobile-rows-wrapper">
                                {expenseLabels.map((label, rIdx) => (
                                    <MobileRow
                                        key={label}
                                        label={label}
                                        values={expenses[rIdx]}
                                        onChange={(cIdx, val) => updateExpense(rIdx, cIdx, val)}
                                        years={years}
                                    />
                                ))}
                                <MobileRow 
                                    label="סה״כ הוצאות" 
                                    isTotal 
                                    values={expensesTotals}
                                    years={years}
                                />
                                <MobileRow 
                                    label="סה״כ הוצאות (כל השנים)" 
                                    isTotal 
                                    values={expensesGrandTotal}
                                    years={years}
                                />
                            </div>
                        </div>
                    </details>

                    {/* Section 3: פירוט הרכוש והתחייבויות */}
                    <details className="eqc-mobile-section" open>
                        <summary className="eqc-mobile-section-summary">
                            <span className="eqc-mobile-section-icon" aria-hidden="true">🏢</span>
                            <div className="eqc-mobile-section-text">
                                <h2>פירוט הרכוש והתחייבויות</h2>
                                <p>רכוש והתחייבויות</p>
                            </div>
                            <span className="eqc-mobile-dot eqc-mobile-dot-purple" aria-hidden="true" />
                        </summary>
                        <div className="eqc-mobile-section-content">
                            <div className="eqc-mobile-rows-wrapper">
                                {assetLabels.map((label, rIdx) => (
                                    <MobileRow
                                        key={label}
                                        label={label}
                                        values={assets[rIdx]}
                                        onChange={(cIdx, val) => updateAsset(rIdx, cIdx, val)}
                                        years={years}
                                    />
                                ))}
                                <MobileRow 
                                    label="סה״כ רכוש והתחייבויות" 
                                    isTotal 
                                    values={assetsTotals}
                                    years={years}
                                />
                                <MobileRow 
                                    label="השינוי ברכוש ובהתחייבויות" 
                                    isTotal 
                                    values={assetsChange}
                                    years={years}
                                />
                            </div>
                        </div>
                    </details>

                    {/* Section 4: יתרות והלוואות בעלים */}
                    <details className="eqc-mobile-section" open>
                        <summary className="eqc-mobile-section-summary">
                            <span className="eqc-mobile-section-icon" aria-hidden="true">💼</span>
                            <div className="eqc-mobile-section-text">
                                <h2>יתרות והלוואות בעלים</h2>
                                <p>יתרות והלוואות</p>
                            </div>
                            <span className="eqc-mobile-dot eqc-mobile-dot-orange" aria-hidden="true" />
                        </summary>
                        <div className="eqc-mobile-section-content">
                            <div className="eqc-mobile-rows-wrapper">
                                {ownerLabels.map((label, rIdx) => (
                                    <MobileRow
                                        key={label}
                                        label={label}
                                        values={ownerBalances[rIdx]}
                                        onChange={(cIdx, val) => updateOwnerBalance(rIdx, cIdx, val)}
                                        years={years}
                                    />
                                ))}
                                <MobileRow 
                                    label="סך הכל ההשקעה בעסק בו נערך מאזן" 
                                    isTotal 
                                    values={ownerBalancesTotals}
                                    years={years}
                                />
                                <MobileRow 
                                    label="השינוי בהשקעה" 
                                    isTotal 
                                    values={investmentChange}
                                    years={years}
                                />
                            </div>
                        </div>
                    </details>

                    {/* Section 5: מזומנים */}
                    <details className="eqc-mobile-section" open>
                        <summary className="eqc-mobile-section-summary">
                            <span className="eqc-mobile-section-icon" aria-hidden="true">💵</span>
                            <div className="eqc-mobile-section-text">
                                <h2>מזומנים</h2>
                                <p>מזומנים לא בבנק</p>
                            </div>
                            <span className="eqc-mobile-dot eqc-mobile-dot-teal" aria-hidden="true" />
                        </summary>
                        <div className="eqc-mobile-section-content">
                            <div className="eqc-mobile-rows-wrapper">
                                <MobileRow 
                                    label="מזומנים לא בבנק או מוסד פיננסי ₪" 
                                    values={cash} 
                                    onChange={updateCash}
                                    years={years}
                                />
                                <MobileRow 
                                    label="השינוי במזומן" 
                                    isTotal 
                                    values={cashChange}
                                    years={years}
                                />
                            </div>
                        </div>
                    </details>

                    {/* Section 6: הוצאות המחיה */}
                    <details className="eqc-mobile-section" open>
                        <summary className="eqc-mobile-section-summary">
                            <span className="eqc-mobile-section-icon" aria-hidden="true">🏠</span>
                            <div className="eqc-mobile-section-text">
                                <h2>הוצאות המחיה (טבלה 3-4)</h2>
                                <p>חישוב הוצאות המחיה</p>
                            </div>
                            <span className="eqc-mobile-dot eqc-mobile-dot-brown" aria-hidden="true" />
                        </summary>
                        <div className="eqc-mobile-section-content">
                            <div className="eqc-mobile-rows-wrapper">
                                <MobileRow 
                                    label="הוצאות המחיה" 
                                    isTotal 
                                    values={value_3_4}
                                    years={years}
                                />
                                <MobileRow 
                                    label="סה״כ הוצאות המחיה (כל השנים)" 
                                    isTotal 
                                    values={value_3_4_GrandTotal}
                                    years={years}
                                />
                            </div>
                        </div>
                    </details>

                    {/* Section 7: פער לוחות חישוב הוצאות המחיה */}
                    <details className="eqc-mobile-section" open>
                        <summary className="eqc-mobile-section-summary">
                            <span className="eqc-mobile-section-icon" aria-hidden="true">📊</span>
                            <div className="eqc-mobile-section-text">
                                <h2>פער לוחות חישוב הוצאות המחיה (טבלה 5-6)</h2>
                                <p>חישוב פער לוחות</p>
                            </div>
                            <span className="eqc-mobile-dot eqc-mobile-dot-purple" aria-hidden="true" />
                        </summary>
                        <div className="eqc-mobile-section-content">
                            <div className="eqc-mobile-rows-wrapper">
                                <MobileRow 
                                    label="פער לוחות חישוב הוצאות המחיה" 
                                    isTotal 
                                    values={value_5_6}
                                    years={years}
                                />
                                <MobileRow 
                                    label="סה״כ פער לוחות חישוב הוצאות המחיה (כל השנים)" 
                                    isTotal 
                                    values={value_5_6_GrandTotal}
                                    years={years}
                                />
                            </div>
                        </div>
                    </details>
                </div>

                <div className="eqc-mobile-actions">
                    <button 
                        className={`eqc-mobile-calculate-btn ${!hasInputs ? "disabled" : ""}`} 
                        onClick={calculateResults}
                        disabled={!hasInputs}
                    >
                        חשב
                    </button>
                </div>

            {/* Calculation Results */}
            {calculationResults[selectedYear] && (
                <div className="eqc-mobile-results-container">
                    <h3 className="eqc-mobile-results-title">החישוב וביצוע השוואת הון:</h3>
                    <div className="eqc-mobile-results-list">
                        <div className="eqc-mobile-results-item">
                            <div className="eqc-mobile-results-label">שינוי בהון</div>
                            <div className="eqc-mobile-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].capitalChange)}
                            </div>
                        </div>
                        
                        <div className="eqc-mobile-results-item">
                            <div className="eqc-mobile-results-label">סה"כ הוצאות</div>
                            <div className="eqc-mobile-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].totalExpenses)}
                            </div>
                        </div>
                        
                        <div className="eqc-mobile-results-item">
                            <div className="eqc-mobile-results-label">גידול בהון + הוצאות</div>
                            <div className="eqc-mobile-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].capitalGrowthPlusExpenses)}
                            </div>
                        </div>
                        
                        <div className="eqc-mobile-results-item">
                            <div className="eqc-mobile-results-label">מקורות הגידול (הכנסות)</div>
                            <div className="eqc-mobile-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].sourcesOfGrowth)}
                            </div>
                        </div>
                        
                        <div className="eqc-mobile-results-item">
                            <div className="eqc-mobile-results-label">גידול בהון לפני הוצאות המחיה</div>
                            <div className="eqc-mobile-results-value">
                                {formatNumberRTL(calculationResults[selectedYear].capitalGrowthBeforeLivingExpenses)}
                            </div>
                        </div>
                        
                        {/* Check if should stop early (abs(emptyRowValue) < 10000) */}
                        {calculationResults[selectedYear].shouldStopEarly ? (
                            <>
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">הוצאות מחיה</div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].livingExpenses)}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label"></div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].emptyRowValue)}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item highlight" style={{ background: '#d4edda', border: '2px solid #28a745' }}>
                                    <div className="eqc-mobile-results-label" style={{ color: '#155724', fontWeight: 700 }}>
                                        תוצאת הבדיקה
                                    </div>
                                    <div className="eqc-mobile-results-value" style={{ background: '#d4edda', borderColor: '#28a745', color: '#155724', fontWeight: 700 }}>
                                        {calculationResults[selectedYear].checkResult}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">שימוש בלוחות</div>
                                    <div className="eqc-mobile-results-value">
                                        {calculationResults[selectedYear].tableUsed}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item" style={{ background: '#d1ecf1', border: '1px solid #bee5eb' }}>
                                    <div className="eqc-mobile-results-label" style={{ color: '#0c5460' }}>
                                        הערה: תקין - שימוש בלוח 3+4
                                    </div>
                                    <div className="eqc-mobile-results-value" style={{ background: '#d1ecf1', borderColor: '#bee5eb', color: '#0c5460' }}>
                                        הערה: תקין - שימוש בלוח 3+4
                                    </div>
                                </div>
                            </>
                        ) : calculationResults[selectedYear].capitalGrowthBeforeLivingExpenses > 0 ? (
                            <div className="eqc-mobile-results-item" style={{ background: '#fff3cd', border: '2px solid #ffc107' }}>
                                <div className="eqc-mobile-results-label" style={{ color: '#856404', fontWeight: 700 }}>
                                    קיימת חזקה כי ישנן הכנסות שלא דווחו
                                </div>
                                <div className="eqc-mobile-results-value" style={{ background: '#fff3cd', borderColor: '#ffc107', color: '#856404' }}>
                                    קיימת חזקה כי ישנן הכנסות שלא דווחו
                                </div>
                            </div>
                        ) : calculationResults[selectedYear].capitalGrowthBeforeLivingExpenses === 0 ? (
                            <>
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">לפי הערך נבדוק אם נמשיך</div>
                                    <div className="eqc-mobile-results-value">
                                        נמשיך
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">אם הערך = 0 נמשיך את הבדיקה</div>
                                    <div className="eqc-mobile-results-value">
                                        כן
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">הוצאות מחיה</div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].livingExpenses)}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label"></div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].emptyRowValue)}
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* If negative, only show הוצאות מחיה */
                            <>
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">הוצאות מחיה</div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].livingExpenses)}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label"></div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].emptyRowValue)}
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {/* Hide these fields if גידול בהון לפני הוצאות המחיה > 0 or shouldStopEarly */}
                        {!calculationResults[selectedYear].shouldStopEarly && calculationResults[selectedYear].capitalGrowthBeforeLivingExpenses <= 0 && (
                            <>
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">סה״כ פער לוחות חישוב הוצאות המחיה (כל השנים)</div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].value_5_6_GrandTotal)}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">סה״כ פער לוחות חישוב הוצאות המחיה (כל השנים) (טבלה 5-6)</div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].secondEmptyRowValue)}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item highlight">
                                    <div className="eqc-mobile-results-label">תוצאת השוואת הון:</div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].finalResult)}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">ניתוח תוצאה</div>
                                    <div className="eqc-mobile-results-value">
                                        {formatNumberRTL(calculationResults[selectedYear].resultAnalysis)}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">תוצאת הבדיקה</div>
                                    <div className="eqc-mobile-results-value">
                                        {calculationResults[selectedYear].checkResult}
                                    </div>
                                </div>
                                
                                <div className="eqc-mobile-results-item">
                                    <div className="eqc-mobile-results-label">שימוש בלוחות</div>
                                    <div className="eqc-mobile-results-value">
                                        {calculationResults[selectedYear].tableUsed}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            </div>
        </>
    );
}

export default EquityComparisonUrbanMobile;

