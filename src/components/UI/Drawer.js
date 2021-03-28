import Backdrop from './backdrop';
import React from 'react';

const Drawer = ({ children, show, clicked, type }) => {
    let height;
    if(type === 'univ') {
        height = 300;
    }else if(type === 'age') {
        height = 255;
    }else {
        height = '90%';
    }
    return (
        <div className="w-full">
            <Backdrop show={show} clicked={clicked}/>
            <div 
                id="drawerContainer"
                style={{
                    borderRadius: '25px 25px 0 0 ',
                    position: "fixed",
                    overflowY: 'scroll',
                    zIndex: 999,
                    maxWidth: 400,
                    width: '100%',
                    height: height,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    padding: 10,
                    bottom: 0,
                    boxSizing: 'border-box',
                    transition: 'all .3s ease-out',
                    transform: show ? 'translate(0, 0px)' : 'translate(0, 100%)',
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default Drawer;
