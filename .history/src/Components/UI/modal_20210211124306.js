import React from 'react';
import Backdrop from './backdrop';

class Modal extends React.Component {
    //최적화, Functional Component로도 가능.
    shouldComponentUpdate(nextProps, nextState) { //show에 true가 들어올 때만 업데이트된다.
        return ((nextProps.show !== this.props.show) || nextProps.children !== this.props.children)
    }

    render() {
        const { modalClosed, show } = this.props;
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
}

export default Modal;


.Modal {
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 70%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 15%;
    top: 30%;
    box-sizing: border-box;
    transition: all .3s ease-out;
}

@media (min-width: 600px) {
    .Modal {
        width: 500px;
        left: calc(50% - 250px);
    }
}