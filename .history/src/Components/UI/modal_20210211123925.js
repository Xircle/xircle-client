import React from 'react';
import "./Modal.css";
import Backdrop from '../Backdrop/Backdrop';

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
