import React from 'react';

function Backdrop({ show }) {
    return (
        props.show ? <div className="Backdrop" onClick={props.clicked}/> : null
    )
}

export default Backdrop;
