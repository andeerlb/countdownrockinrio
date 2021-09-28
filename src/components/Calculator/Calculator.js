import React, { useState } from 'react';
import CurrencyInput from 'react-currency-masked-input';
import { useTranslation } from 'react-i18next';
import { useCalculator } from '../../context/CalculatorContext';
import { useModal } from '../../context/ModalContext';
import Modal from '../Modal/Modal';

import style from "./Calculator.module.css";

const AddMoreModal = () => {
    const { t } = useTranslation();
    const { toggleModal } = useModal();
    const { items, setItems } = useCalculator();
    const [name, setName] = useState('');

    const addMore = () => {
        if(name === null || name === undefined || name.trim().length === 0)
            return;
            
        let tmp = [...items];
        tmp.push({ id: new Date().getTime() + Math.random(), label: name, value: "0.00" });
        setItems(tmp);
        toggleModal();
    }

    const inputValue = val => {
        setName(val);
    }
    
    return (
        <Modal>
            <Input id="vtotal" label="Nome" isCurrency={false} onChange={inputValue} defaultValue=""/>
            <div className={[style.button, style.regular].join(' ')} onClick={addMore}>
                {t('ADD_ITEM')}
            </div>
        </Modal>
    )
}

const Input = ( { id, label, isCurrency=true, hideLabel=false, width, onChange, defaultValue }) => {
    const [value, setValue] = useState(defaultValue)
    let customStyle = {};

    const change = (event, maskedValue) => {
        let val = maskedValue === null || maskedValue === undefined ? event.target.value : maskedValue;

        setValue(val);
        if(onChange) {
            onChange(val);
        }
    }

    if(width)
        customStyle['width'] = width;

    return (
        <>
        <div className={style.field} style={customStyle}>
            {isCurrency && <span className={style.currencyIcon}>R$</span>}
            { isCurrency ?
                <CurrencyInput defaultValue={value} onChange={change} name={id} id={id} placeholder=" " required style={{paddingLeft: '25px'}}/> :
                <input value={value} onChange={change} name={id} id={id} placeholder=" " required/>
            }
            {!hideLabel && <label htmlFor={id}>{label}</label>}
        </div>
        </>
    )
}

const Item = ({ item, index }) => {
    return (
        <Input id={item.id} label={item.label} defaultValue={item.value}/>
    )
}

export default function Calculator() {
    const { t } = useTranslation();
    const { items } = useCalculator();
    const { toggleModal } = useModal();

    const calculate = () => {
    }

    return (
        <>  
            <AddMoreModal />
            <div className={style.calculator}>
                {items.map((item, index) => {
                    return (
                        <Item key={index} item={item} index={index} />
                    )
                })}
                <div className={[style.button, style.regular].join(' ')} onClick={toggleModal}>
                    {t('ADD_MORE_ITEMS')}
                </div>
                <div style={{marginTop: "5px"}} className={[style.button, style.regular].join(' ')} onClick={calculate}>
                    {t('CALCULATE')}
                </div>
            </div>
        </>
    )
}