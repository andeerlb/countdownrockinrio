import React from 'react';
import { useCountDown } from '../../context/CountDownContext';

import './ExpenseCalculator.css';

function ExpenseCalculator() {
    const { weeks } = useCountDown();
    return (
        <div className="expense-calculator-wrapper">
            <div className="expense-calculator-container">
                <div className="expense-calculator-title">
                    <h1>Já sei, comprou e ingresso e não sabe como ir?</h1>
                    <h4>Calma, o Rock in Rio é apenas em 2022, ainda faltam {weeks} semanas, vamos pensar em algo juntos</h4>
                </div>
                <hr />
                <article>Para isso, deixei uma calculadora, com ela você pode separar os gastos desejados e obter um valor final.</article>
                <hr data-content="Vamos testar?"/>
            </div>
        </div>
    )
}

export default ExpenseCalculator;