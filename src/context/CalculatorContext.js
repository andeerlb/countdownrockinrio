import React, { createContext, useContext, useState } from 'react';

const CalculatorContext = createContext();

export function CalculatorProvider ({ children }) {
    const defaultState = [
        {id: 'Hospedagem', label: 'Hospedagem', value: "0.00"},
        {id: 'Passagens', label: 'Passagens', value: "0.00"},
        {id: 'alimentacao', label: 'Alimentação', value: "0.00"},
        {id: 'Transporte', label: 'Transporte', value: "0.00"}
    ];

    const [items, setItems] = useState(defaultState);
    const [expectedTotalValue, setExpectedTotalValue] = useState("0.00");

    const resetState = () => {
        setItems(defaultState);
    }
    
    return (
        <CalculatorContext.Provider value={ 
            {
                items, setItems, resetState, expectedTotalValue, setExpectedTotalValue
            }
        }>
            { children }
        </CalculatorContext.Provider>
    )
}

export function useCalculator() {
    return useContext(CalculatorContext);
}