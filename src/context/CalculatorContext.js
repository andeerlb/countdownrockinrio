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
    const [totalValue, setTotalValue] = useState(0.00);

    const resetState = () => {
        setItems([]);
    }

    const addItem = (name, value="0.00", id=new Date().getTime() + Math.random()) => {        
        let tmp = [...items];
        tmp.push({ id: id, label: name, value: value });
        setItems(tmp);
    }

    const updateItemValue = (currentItem, newValue) => {
        const newList = items.map((item, index) => {
            if (currentItem !== item) {
                return item;
            }

            return {
                ...item,
                value: newValue
            }
          });
          setItems(newList);
    }

    const calculateTotalValue = () => {
        let values = items.map(item => parseFloat(item.value));
        let total = values.reduce((partialSum, value) => partialSum + value,0);
        setTotalValue(total);
    }
    
    return (
        <CalculatorContext.Provider value={ 
            {
                items, setItems, resetState, addItem, totalValue, calculateTotalValue, updateItemValue
            }
        }>
            { children }
        </CalculatorContext.Provider>
    )
}

export function useCalculator() {
    return useContext(CalculatorContext);
}