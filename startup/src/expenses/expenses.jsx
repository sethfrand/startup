import React, {useState} from 'react';

import './expenses.css';
export default function Expenses(){

    const [expenses, setExpenses] = useState([]);


    function handleAddExpense() {
        setExpenses([...expenses, { date: '', description: '', amount: '', category: '' }]);
    }

    function handleEditExpense(index, field, value) {
        const updatedExpenses = [...expenses];
        updatedExpenses[index][field] = value;
        setExpenses(updatedExpenses);
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
                        <td>     <input
                            value={expense.date}
                            onChange={(e) => handleEditExpense(index, 'date', e.target.value)}
                        /></td>
                        <td>    <input
                            value={expense.description}
                            onChange={(e) => handleEditExpense(index, 'description', e.target.value)}
                        /></td>
                        <td>    <input
                            value={expense.amount}
                            onChange={(e) => handleEditExpense(index, 'amount', e.target.value)}
                        /></td>
                        <td>    <input
                            value={expense.category}
                            onChange={(e) => handleEditExpense(index, 'category', e.target.value)}
                        /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="action button" onClick={()=> handleAddExpense()}>Add Expense</button>
        </main>
    );
}