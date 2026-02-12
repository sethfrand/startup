import React from 'react';

import './expenses.css';

export default function Expenses(){
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
                <tr>
                    <td>date</td>
                    <td>Amount</td>
                    <td>description</td>
                    <td>category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                <tr>
                    <td>some date</td>
                    <td>some amount of money</td>
                    <td>something bought</td>
                    <td>some category</td>
                </tr>
                </tbody>
            </table>
            <button className="action button">Add Expense</button>
        </main>
    );
}