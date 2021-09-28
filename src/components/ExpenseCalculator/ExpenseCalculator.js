import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCountDown } from '../../context/CountDownContext';
import { replaceStringVar } from '../../utils/Utils';
import Calculator from '../Calculator/Calculator';

import './ExpenseCalculator.css';

function ExpenseCalculator() {
    const { t }  = useTranslation();
    const { weeks } = useCountDown();
    
    return (
        <div className="expense-calculator-wrapper">
            <div className="expense-calculator-container">
                <div className="expense-calculator-title">
                    <h1>{t('TITLE_CALCULATE_PAGE')}</h1>
                    <h2>{replaceStringVar(t('DESCRIBE_CALCULATE_PAGE'), "{weeks}", weeks)}</h2>
                </div>
                <hr />
                <article>{t('ARTICLE_USE_CALCULATE')}</article>
                <hr data-content={t('LETS_GO_TEST_CALCULATOR')}/>
                <Calculator />
            </div>
        </div>
    )
}

export default ExpenseCalculator;