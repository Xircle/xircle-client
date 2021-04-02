import React from 'react';
import Backdrop from './backdrop';

let memoizedModal = null;

const Modal = ({ children, show, clicked, type }) => {
    let top;
    if(type === 'directInput') {
        top = '10%';
    }else {
        top = '30%';
    }
    return (
        <div className="w-full">
            <Backdrop show={show} clicked={clicked}/>
            <div className="w-full">
                <div 
                    style={{
                        visibility: show ? 'visible' :'hidden',
                        borderRadius: '10px',
                        position: "fixed",
                        zIndex: 999,
                        width: '340px',
                        textAlign: 'center',
                        border: '1px solid #ccc',
                        boxShadow: '1px 1px 1px black',
                        backgroundColor: 'white',
                        padding: '36px',
                        left: `calc(50% - 170px)`,
                        top: top,
                        boxSizing: 'border-box',
                        transition: 'all .3s ease-out',
                        transform: show ? 'scale(1)' : 'scale(0.5)',
                        opacity: show ? '1' : '0'
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default memoizedModal = React.memo(Modal);
