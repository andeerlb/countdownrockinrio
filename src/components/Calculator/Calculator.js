import React from 'react';
import CurrencyInput from 'react-currency-masked-input';
import { useCalculator } from '../../context/CalculatorContext';

import style from "./Calculator.module.css";

const Input = ( { id, label, type="text", hideLabel=false, width }) => {
    let customStyle = {};

    if(width)
        customStyle['width'] = width;

    return (
        <div className={style.field} style={customStyle}>
            <CurrencyInput name={id} id={id} placeholder=" " required/>
            {!hideLabel && <label htmlFor={id}>{label}</label>}
        </div>
    )
}

export default function Calculator() {
    const { items, setItems } = useCalculator();

    const addMore = (label) => {
        let tmp = [...items];
        tmp.push({ id: new Date().getTime() + Math.random(), label: label, value: null });
        // setItems(tmp);
    }

    return (
        <>
            <div className={style.containerTitle}>
                <div className={style.title}>Qual valor você deseja arrecadar até a data do evento?</div>
                <Input id="vtotal" label="Valor final" hideLabel={true} width="100px"/>
            </div>
            <div className={style.calculator}>
                {items.map(item => {
                    return (
                        <Input key={item.id} id={item.id} label={item.label}/>
                    )
                })}
                <div className={[style.button, style.regular].join(' ')} onClick={() => addMore('nao sei')}>
                    Adicionar mais items
                </div>
                <div style={{marginTop: "5px"}} className={[style.button, style.regular].join(' ')} onClick={() => addMore('nao sei')}>
                    Calcular
                </div>
            </div>
        </>
    )
}