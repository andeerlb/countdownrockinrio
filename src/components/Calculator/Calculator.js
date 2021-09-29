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
    const { addItem } = useCalculator();
    const [name, setName] = useState('');

    const addMore = () => {
        if(name === null || name === undefined || name.trim().length === 0)
            return;

        addItem(name);
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
                <CurrencyInput defaultValue={value} onChange={change} onBlur={change} name={id} id={id} placeholder=" " required style={{paddingLeft: '25px'}}/> :
                <input value={value} onChange={change} onBlur={change} name={id} id={id} placeholder=" " required/>
            }
            {!hideLabel && <label htmlFor={id}>{label}</label>}
        </div>
        </>
    )
}

const Item = ({ item, index }) => {
    const { updateItemValue } = useCalculator();

    const onChange = val => {
        updateItemValue(item, val);
    }

    return (
        <Input id={item.id} label={item.label} defaultValue={item.value} onChange={onChange}/>
    )
}

export default function Calculator() {
    const { t } = useTranslation();
    const { items, resetState, totalValue } = useCalculator();
    const { toggleModal } = useModal();

    const calculate = () => {
        console.log(totalValue);
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
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <div className={[style.button, style.primary].join(' ')} onClick={toggleModal}>
                        {t('ADD_MORE_ITEMS')}
                    </div>
                    <div className={[style.button, style.secondary].join(' ')} onClick={resetState}>
                        {t('RESET_CALCULATOR')}
                    </div>
                </div>
                <div style={{marginTop: "5px"}} className={[style.button, style.primary].join(' ')} onClick={calculate}>
                    {t('CALCULATE')}
                </div>
            </div>
        </>
    )
}