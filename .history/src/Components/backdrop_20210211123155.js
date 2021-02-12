import React from 'react';

function Backdrop(props) {
    return (
        props.show ? <div className="Backdrop" onClick={props.clicked}/> : null
    )
}

export default Backdrop;
