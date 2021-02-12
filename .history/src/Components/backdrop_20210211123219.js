import React from 'react';

function Backdrop({ show, clicked }) {
    return (
        show ? <div className="Backdrop" onClick={props.clicked}/> : null
    )
}

export default Backdrop;
