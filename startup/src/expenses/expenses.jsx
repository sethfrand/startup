import React, { useState, useEffect } from 'react';
import './expenses.css';

const DEFAULT_CATEGORIES = ['Personal & Lifestyle', 'Food', 'Housing', 'Utilities', 'Gifts'];

export default function Expenses(props) {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem(`expenses_${props.username}`));
        if (storedExpenses) setExpenses(storedExpenses);

        const storedCategories = JSON.parse(localStorage.getItem(`categories_${props.username}`));
        if (storedCategories) setCategories(storedCategories);
    }, []);

    function handleAddExpense() {
        const updatedExpenses = [...expenses, { date: '', description: '', amount: '', category: '' }];
        setExpenses(updatedExpenses);
        localStorage.setItem(`expenses_${props.username}`, JSON.stringify(updatedExpenses));
    }

    function handleEditExpense(index, field, value) {
        const updatedExpenses = [...expenses];
        updatedExpenses[index][field] = value;
        setExpenses(updatedExpenses);
        localStorage.setItem(`expenses_${props.username}`, JSON.stringify(updatedExpenses));
    }

    function handleAddCategory() {
        if (!newCategory.trim()) return;
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        localStorage.setItem(`categories_${props.username}`, JSON.stringify(updatedCategories));
        setNewCategory('');
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

            <div className="mt-3">
                <input
                    placeholder="Add new category..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleAddCategory}>Add Category</button>
            </div>

            <button className="btn btn-primary mt-3" onClick={handleAddExpense}>Add Expense</button>
        </main>
    );
}