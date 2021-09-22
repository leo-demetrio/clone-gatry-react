import React from "react";
import ReactDom from "react-dom";
import './Modal.css';

const portalRoot = document.getElementById('portal-root');

const UIModal = ({ children, isOpen, onClickClose }) => {
    if(!isOpen) {
        return null;
    }
    return ReactDom.createPortal(
        <div className="ui-modal__overlay">
            <div className="ui-modal">
                <button className="ui-modal__close-button" type="button" onClick={onClickClose}>X</button>
                { children }
            </div>
        </div>,
        portalRoot
    );
};

export default UIModal;