import React, { useState, useEffect } from 'react';
import './expenses.css';

const DEFAULT_CATEGORIES = ['Personal & Lifestyle', 'Food', 'Housing', 'Utilities', 'Gifts'];

export default function Expenses(props) {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        async function loadExpenses() {
            const response = await fetch(`/api/expenses?sheetId=${props.currentSheet}`, {
                credentials: 'include',
            });
            if (response?.status === 200) {
                const data = await response.json();
                setExpenses(data);
            }
        }
        loadExpenses();
    }, [props.currentSheet]); // reruns when sheet changes

    async function handleAddExpense() {
        const response = await fetch('/api/expenses', {
            method: 'post',
            body: JSON.stringify({
                date: new Date().toISOString().split('T')[0],
                description: 'New Expense',
                amount: 0,
                category: '',
                sheetId: props.currentSheet,
            }),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            credentials: 'include',
        });
        if (response?.status === 200) {
            const newExpense = await response.json();
            setExpenses([newExpense, ...expenses]);

            props.socketRef.current.send(JSON.stringify({
                type: 'expense_added',
                message: `A new expense was added to sheet ${props.currentSheet} by ${props.username}: ${newExpense.description} for $${newExpense.amount}`,
            }));
        }
    }

    async function handleEditExpense(index, field, value) {
        const response = await fetch(`/api/expenses/${expenses[index].id}/update`, {
            method: 'post',
            body: JSON.stringify({[field]: value}),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            credentials: 'include',
        });
        if (response?.status === 200) {
            const updatedExpenses = [...expenses];
            updatedExpenses[index][field] = value;
            setExpenses(updatedExpenses);
        }
    }

    async function handleAddCategory() {
        if (!newCategory.trim()) return;
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        localStorage.setItem(`categories_${props.currentSheet}`, JSON.stringify(updatedCategories));
    }

    if (!props.currentSheet) {
        return <main><p>Please select a sheet from <a href="/Sheets">All Sheets</a> first.</p></main>;
    }

    return (
        <main>
            <h1>Expenses</h1>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((expense, index) => (
                    <tr key={index}>
                        <td>
                            <input
                                value={expense.date}
                                onChange={(e) => handleEditExpense(index, 'date', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                value={expense.description}
                                onChange={(e) => handleEditExpense(index, 'description', e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={expense.amount}
                                onChange={(e) => handleEditExpense(index, 'amount', e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={expense.category}
                                onChange={(e) => handleEditExpense(index, 'category', e.target.value)}
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button className="btn btn-primary mt-3" onClick={handleAddExpense}>Add Expense</button>

            <div className="mt-3">
                <input
                    placeholder="Add new category..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleAddCategory}>Add Category</button>
            </div>
        </main>
    );
}