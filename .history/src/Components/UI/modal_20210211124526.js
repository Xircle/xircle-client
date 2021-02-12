import React from 'react';
import Backdrop from './backdrop';

const Modal = ({ show, clicked }) => {
    return (
        <>
            <Backdrop show={show} clicked={clicked}/>
            <div 
                className="Modal"
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}
                >
                {this.props.children}
            </div>
        </>
    )
}

export default Modal;
