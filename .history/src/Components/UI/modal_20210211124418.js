import React from 'react';
import Backdrop from './backdrop';

const Modal = ({ show, clicked}) => {
    return (
        <>
            <Backdrop clicked={modalClosed} show={show}/>
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
// memo

// .Modal {
//     position: fixed;
//     z-index: 500;
//     background-color: white;
//     width: 70%;
//     border: 1px solid #ccc;
//     box-shadow: 1px 1px 1px black;
//     padding: 16px;
//     left: 15%;
//     top: 30%;
//     box-sizing: border-box;
//     transition: all .3s ease-out;
// }

// @media (min-width: 600px) {
//     .Modal {
//         width: 500px;
//         left: calc(50% - 250px);
//     }
// }