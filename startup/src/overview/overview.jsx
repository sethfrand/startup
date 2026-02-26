import React, {useEffect, useState} from 'react';

import './overview.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie,Legend} from 'recharts';

export default function Overview(props){

    const COLORS = ['#5DA5DA','#FAA43A','#60BD68','#F17CB0','#B2912F','#B276B2']


    const [budget,setBudget] = useState(0)
    const [expenses, setExpenses] = useState([])

    const [chartType, setChartType] = useState('bar')

    const amountSpent = expenses.reduce((total,expense) => total + Number(expense.amount), 0);
    const remainingBudget = budget - amountSpent;


    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem(`expenses_${props.currentSheet}`));
        if (storedExpenses) setExpenses(storedExpenses);
    },[]);

    const [edit,setEdit] = useState(false)


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

    const chartData = Object.keys(categoryAmounts).map((category,index) =>
        ({name: category, amount: categoryAmounts[category],fill: COLORS[index % COLORS.length]}));

    return (
        <main>

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
                        ? <button className="btn btn-secondary" onClick={() => setEdit(false)}>Save</button>
                        : <button className="btn btn-primary" onClick={() => setEdit(true)}>Edit Budget</button>
                    }
                </div>

                <div>
                    <h5>Total budget remaining this month</h5>
                    <svg aria-hidden="true" height="100" viewBox="0 0 100 100" width="100"></svg>
                    <p>${remainingBudget}</p>
                </div>

                <div>
                    <h5>Top Category</h5>
                    <svg aria-hidden="true" height="100" viewBox="0 0 100 100" width="100"></svg>
                    <p>Amount spent: ${categoryAmounts[topCategory]} on {topCategory}</p>
                </div>

                <div>
                    <div>
                        <h5>Monthly trend</h5>
                        <div className="d-flex gap-2 mb-2">
                            <button
                                className={`btn ${chartType === 'pie' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setChartType('pie')}>
                                Bar Chart
                            </button>
                            <button
                                className={`btn ${chartType === 'bar' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setChartType('bar')}>
                                Pie Chart
                            </button>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            {chartType === 'bar'
                                ?                                     <PieChart>
                                    <Pie data={chartData} dataKey="amount" nameKey="name" label>
                                    </Pie>
                                    <Tooltip/>
                                    <Legend/>
                                </PieChart>:
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Bar dataKey="amount" fill="#1a73e8"/>
                                </BarChart>
                            }
                        </ResponsiveContainer>
                    </div>
                </div>

            </section>

            {/* Expenses Section */}
            {/* This is going to show x most recent rows from the expenses page. */}
            <section>

                <h2>Expenses</h2>

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
                    {expenses.slice(0,5).map((expense, index) => (

                    <tr key = {index}>
                        <td>{expense.date}</td>
                        <td>{expense.description}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                    </tr>
                        ))}
                    </tbody>
                </table>

            </section>
            <div>
                <h5>Exchange rate</h5>
                <input placeholder="PL" type="text"/><button>Go</button>
            </div>
        </main>
    );
}