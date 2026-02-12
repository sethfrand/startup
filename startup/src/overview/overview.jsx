import React from 'react';

import './overview.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Overview(){
    return (
        <main>

            {/* Stats Section */}
            <section>

                <div>
                    <h5>Total spent this month</h5>
                    <svg aria-hidden="true" height="100" viewBox="0 0 100 100" width="100"></svg>
                    <p>$0.00</p>
                </div>

                <div>
                    <h5>Total budget remaining this month</h5>
                    <svg aria-hidden="true" height="100" viewBox="0 0 100 100" width="100"></svg>
                    <p>$0.00</p>
                    <button className="btn btn-primary">edit budget</button>
                </div>

                <div>
                    <h5>Top Category</h5>
                    <svg aria-hidden="true" height="100" viewBox="0 0 100 100" width="100"></svg>
                    <p>Some Category</p>
                </div>

                <div>
                    <h5>Monthly trend</h5>
                    <svg aria-hidden="true" height="100" viewBox="0 0 100 100" width="100"></svg>
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
                    <tr>
                        <td>some date</td>
                        <td>something bought</td>
                        <td>some amount of money</td>
                        <td>some category</td>
                    </tr>

                    <tr>
                        <td>some date</td>
                        <td>something bought</td>
                        <td>some amount of money</td>
                        <td>some category</td>
                    </tr>

                    <tr>
                        <td>some date</td>
                        <td>something bought</td>
                        <td>some amount of money</td>
                        <td>some category</td>
                    </tr>

                    <tr>
                        <td>some date</td>
                        <td>something bought</td>
                        <td>some amount of money</td>
                        <td>some category</td>
                    </tr>
                    </tbody>

                </table>

            </section>

        </main>
    );
}