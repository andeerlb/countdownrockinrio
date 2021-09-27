import React from 'react';
import SimpleModal from 'simple-react-modal';
import { useModal } from '../../context/ModalContext';

import './Modal.css';

export default function Modal({ children }) {
    const { showModal, toggleModal } = useModal();

    return (
        <SimpleModal show={showModal} closeOnOuterClick={false} className="modal">
            <span className="modalClose" onClick={toggleModal}>X</span>
            {children}
        </SimpleModal>
    )
}