import React, { createContext, useContext, useState } from 'react';

const CalculatorContext = createContext();

export function CalculatorProvider ({ children }) {
    const defaultState = [
        {id: 'Hospedagem', label: 'Hospedagem', value: null},
        {id: 'Passagens', label: 'Passagens', value: null},
        {id: 'alimentacao', label: 'Alimentação', value: null},
        {id: 'Transporte', label: 'Transporte', value: null}
    ];

    const [items, setItems] = useState(defaultState);

    const resetState = () => {
        setItems(defaultState);
    }
    
    return (
        <CalculatorContext.Provider value={ 
            {
                items, setItems, resetState
            }
        }>
            { children }
        </CalculatorContext.Provider>
    )
}

export function useCalculator() {
    return useContext(CalculatorContext);
}