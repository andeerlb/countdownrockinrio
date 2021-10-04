import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CalculatorContext = createContext();

export function CalculatorProvider ({ children }) {
    const { t } = useTranslation();

    const separator = ",";

    const defaultValue = `0${separator}00`;

    const defaultState = [
        {id: 'accommodation', label: t('ACCOMMODATION'), value: defaultValue},
        {id: 'tickets', label: t('TICKETS'), value: defaultValue},
        {id: 'food', label: t('FOOD'), value: defaultValue},
        {id: 'transport', label: t('TRANSPORT'), value: defaultValue}
    ];

    const [items, setItems] = useState(defaultState);
    const [totalValue, setTotalValue] = useState(0.00);
    const [prefix, setPrefix] = useState('R$');

    useEffect(() => {
        if(items.length === 0)  {
            setTotalValue(0.00);
        } else {
            let values = items.map(item => parseFloat(item.value.replace(separator, ".")));
            let total = (values.reduce((partialSum, value) => partialSum + value,0) + 0.00001).toFixed(2);
            setTotalValue(total);
        }
    }, [items])

    const resetState = () => {
        setItems([]);
    }

    const addItem = (name, value=defaultValue, id=new Date().getTime() + Math.random()) => {        
        let tmp = [...items];
        tmp.push({ id: id, label: name, value: value });
        setItems(tmp);
    }

    const updateItemValue = (currentItem, newValue) => {  
        if(newValue === null || newValue === undefined)
            newValue = 0;

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
    
    return (
        <CalculatorContext.Provider value={ 
            {
                items, setItems, resetState, addItem, totalValue, updateItemValue, prefix, setPrefix, separator
            }
        }>
            { children }
        </CalculatorContext.Provider>
    )
}

export function useCalculator() {
    return useContext(CalculatorContext);
}