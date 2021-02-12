import React from 'react';

function Backdrop({ show, clicked }) {
    return (
        show ? ( 
            <div 
                style={{backgroundColor: 'rgba(0, 0, 0, .5'}}
                className="w-full h-full z-50 fixed left-0 top-0" 
                onClick={clicked}
            /> 
        )
        : null
    )
}

export default Backdrop;