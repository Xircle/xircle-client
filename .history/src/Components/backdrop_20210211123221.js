import React from 'react';

function Backdrop({ show, clicked }) {
    return (
        show ? <div className="Backdrop" onClick={clicked}/> : null
    )
}

export default Backdrop;
