import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider ({ children }) {
    const [ showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <ModalContext.Provider value={ 
            {
                showModal, toggleModal
            }
        }>
            { children }
        </ModalContext.Provider>
    )
}

export function useModal() {
    return useContext(ModalContext);
}