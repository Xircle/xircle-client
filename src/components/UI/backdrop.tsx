import React, { MouseEvent } from 'react';

type BackdropProps = {
    show: boolean;
    clicked: (e: MouseEvent<HTMLDivElement>) => void;
}

function Backdrop({ show, clicked }: BackdropProps) {
    return (
        show ? ( 
            <div 
                style={{backgroundColor: 'rgba(0, 0, 0, .7', zIndex: 998}}
                className="w-full h-full fixed left-0 top-0" 
                onClick={clicked}
            /> 
        )
        : null
    )
}

export default Backdrop;