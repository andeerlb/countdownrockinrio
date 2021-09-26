import React, { createContext, useContext, useState } from 'react';

const CountDownContext = createContext();

export function CountDownProvider ({ children }) {
    const [ days, updateDays] = useState(0);
    const [ minutes, setMinutes] = useState(0);
    const [ hours, setHours] = useState(0);
    const [ seconds, setSeconds] = useState(0);
    const [ months, setMonths] = useState(0);
    const [ weeks, setWeeks] = useState(0);

    const setDays = day => {
        updateDays(day);
        setWeeks(parseInt(day/7))
    }

    return (
        <CountDownContext.Provider value={ 
            {
                days, minutes, hours, seconds, months, weeks,
                setDays, setMinutes, setMonths, setHours, setWeeks, setSeconds
            }
        }>
            { children }
        </CountDownContext.Provider>
    )
}

export function useCountDown() {
    return useContext(CountDownContext);
}