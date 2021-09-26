import React, { useState } from 'react';
import Modal from 'simple-react-modal'
import CurrencyInput from 'react-currency-masked-input';
import { useCalculator } from '../../context/CalculatorContext';

import style from "./Calculator.module.css";

const Input = ( { id, label, isCurrency=true, hideLabel=false, width, onChange }) => {
    const [value, setValue] = useState('')
    let customStyle = {};

    const change = (event) => {
        setValue(event.target.value);
        if(onChange) {
            onChange(event.target.value);
        }
    }

    if(width)
        customStyle['width'] = width;

    return (
        <div className={style.field} style={customStyle}>
            { isCurrency ?
                <CurrencyInput value={value} onChange={change} name={id} id={id} placeholder=" " required/> :
                <input value={value} onChange={change} name={id} id={id} placeholder=" " required/>
            }
            {!hideLabel && <label htmlFor={id}>{label}</label>}
        </div>
    )
}

const AddMoreModal = ({ showModal, toggleModal }) => {
    const { items, setItems } = useCalculator();
    const [name, setName] = useState('');

    const addMore = () => {
        let tmp = [...items];
        tmp.push({ id: new Date().getTime() + Math.random(), label: name, value: null });
        setItems(tmp);
        toggleModal();
    }

    const inputValue = val => {
        setName(val);
    }
    
    return (
        <Modal show={showModal} onClose={toggleModal}>
            <Input id="vtotal" label="Nome" isCurrency={false} onChange={inputValue}/>
            <div className={[style.button, style.regular].join(' ')} onClick={addMore}>
                Adicionar
            </div>
        </Modal>
    )
}

const Item = ({ item, index }) => {
    return (
        <Input id={item.id} label={item.label}/>
    )
}

export default function Calculator() {
    const { items, setItems } = useCalculator();
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>  
            <AddMoreModal showModal={showModal} toggleModal={toggleModal} />
            <div className={style.containerTitle}>
                <div className={style.title}>Qual valor você deseja arrecadar até a data do evento?</div>
                <Input id="vtotal" label="Valor final" hideLabel={true} width="100px"/>
            </div>
            <div className={style.calculator}>
                {items.map((item, index) => {
                    return (
                        <Item key={index} item={item} index={index} />
                    )
                })}
                <div className={[style.button, style.regular].join(' ')} onClick={toggleModal}>
                    Adicionar mais items
                </div>
                <div style={{marginTop: "5px"}} className={[style.button, style.regular].join(' ')} onClick={() => {}}>
                    Calcular
                </div>
            </div>
        </>
    )
}