import React from 'react';

function Backdrop({ show, clicked }) {
    return (
        show ? ( 
        <div 
            className="w-full h-full z-50" 
            onClick={clicked}
        /> 
        )
        : null
    )
}

export default Backdrop;


.Backdrop {
    width: 100%;
    z-index: 100;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
}