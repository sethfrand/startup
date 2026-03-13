import React, {useEffect, useState} from 'react';

import './overview.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Legend} from 'recharts';

export default function Overview(props){

    const COLORS = ['#5DA5DA','#FAA43A','#60BD68','#F17CB0','#B2912F','#B276B2'];

    const mockExchangeRates = {
        EUR: 0.92,
        USD: 1,
        PLN: 4.02,
        GBP: 0.79,
    };

    const [currency, setCurrency] = useState('EUR');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);

    async function handleCurrencyChange() {
        const response = await fetch('/api/exchange-rate',{credentials: 'include'});
        const data = await response.json();
        const rates = data.rates
        const result =  amount * (rates[currency] / rates.USD);
        setConvertedAmount(result);

    }

    const [budget, setBudget] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [sheets, setSheets] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState(props.currentSheet || null);
    const [chartType, setChartType] = useState('bar');
    const [edit, setEdit] = useState(false);

    const amountSpent = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
    const remainingBudget = budget - amountSpent;

    // Load sheets on mount
    useEffect(() => {
        async function loadSheets() {
            const response = await fetch('/api/sheets', {
                credentials: 'include',
            });
            if (response?.status === 200) {
                const data = await response.json();
                setSheets(data);
                // If no sheet selected yet, default to first sheet
                if (!selectedSheet && data.length > 0) {
                    setSelectedSheet(data[0].id);
                }
            }
        }
        loadSheets();

        const storedBudget = localStorage.getItem(`budget_${props.username}`);
        if (storedBudget) setBudget(Number(storedBudget));
    }, []);

    // Load expenses whenever selected sheet changes
    useEffect(() => {
        if (!selectedSheet) return;
        async function loadExpenses() {
            const response = await fetch(`/api/expenses?sheetId=${selectedSheet}`, {
                credentials: 'include',
            });
            if (response?.status === 200) {
                const data = await response.json();
                setExpenses(data);
            }
        }
        loadExpenses();
    }, [selectedSheet]);

    const categoryAmounts = expenses.reduce((amounts, expense) => {
        if (expense.category) {
            amounts[expense.category] = (amounts[expense.category] || 0) + Number(expense.amount);
        }
        return amounts;
    }, {});

    const categoryCounts = expenses.reduce((counts, expense) => {
        if (expense.category) {
            counts[expense.category] = (counts[expense.category] || 0) + 1;
        }
        return counts;
    }, {});

    const topCategory = Object.keys(categoryCounts).reduce((a, b) =>
        categoryAmounts[a] > categoryAmounts[b] ? a : b, ''
    );

    const chartData = Object.keys(categoryAmounts).map((category, index) =>
        ({ name: category, amount: categoryAmounts[category], fill: COLORS[index % COLORS.length] }));

    function handleSaveBudget() {
        setBudget(budget);
        localStorage.setItem(`budget_${props.username}`, budget);
        setEdit(false);
    }

    function handleSheetChange(e) {
        const newSheetId = Number(e.target.value);
        setSelectedSheet(newSheetId);
        props.setCurrentSheet(newSheetId);
        localStorage.setItem('currentSheet', newSheetId);
    }

    return (
        <main>

            {/* Sheet Selector */}
            <div className="mb-3 d-flex align-items-center gap-2">
                <label><strong>Viewing sheet:</strong></label>
                <select
                    className="form-select w-auto"
                    value={selectedSheet || ''}
                    onChange={handleSheetChange}
                >
                    {sheets.map(sheet => (
                        <option key={sheet.id} value={sheet.id}>{sheet.name}</option>
                    ))}
                </select>
            </div>

            {/* Stats Section */}
            <section>

                <div>
                    <h5>Total Budget</h5>
                    {edit
                        ? <input
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                        />
                        : <p>${budget}</p>
                    }
                    {edit
                        ? <button className="btn btn-secondary" onClick={handleSaveBudget}>Save</button>
                        : <button className="btn btn-primary" onClick={() => setEdit(true)}>Edit Budget</button>
                    }
                </div>

                <div>
                    <h5>Total budget remaining this month</h5>
                    <p>${remainingBudget}</p>
                </div>

                <div>
                    <h5>Top Category</h5>
                    <p>Amount spent: ${categoryAmounts[topCategory] || 0} on {topCategory || 'N/A'}</p>
                </div>

                <div>
                    <h5>Monthly trend</h5>
                    <div className="d-flex gap-2 mb-2">
                        <button
                            className={`btn ${chartType === 'bar' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setChartType('bar')}>
                            Bar Chart
                        </button>
                        <button
                            className={`btn ${chartType === 'pie' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setChartType('pie')}>
                            Pie Chart
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        {chartType === 'pie'
                            ? <PieChart>
                                <Pie data={chartData} dataKey="amount" nameKey="name" label/>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                            : <BarChart data={chartData}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey="amount" fill="#1a73e8"/>
                            </BarChart>
                        }
                    </ResponsiveContainer>
                </div>

            </section>

            {/* Recent Expenses Section */}
            <section>
                <h2>Recent Expenses</h2>
                <table border="1" cellPadding="6">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.slice(0, 5).map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.date}</td>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/* Currency Converter */}
            <div className="mt-3">
                <h5>Exchange Rate (USD)</h5>
                <div className="d-flex gap-2 align-items-center">
                    <input
                        type="number"
                        placeholder="Amount in USD"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="PLN">PLN</option>
                    </select>
                    <button className="btn btn-primary" onClick={handleCurrencyChange}>Convert</button>
                </div>
                {convertedAmount > 0 && (
                    <p>${amount} USD = {convertedAmount} {currency}</p>
                )}
            </div>

        </main>
    );
}