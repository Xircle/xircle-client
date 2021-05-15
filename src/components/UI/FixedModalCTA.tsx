/** @jsxImportSource @emotion/react */
import React from 'react';
import { PortalConsumer } from '../../providers/PortalProviders';
import Backdrop from './Backdrop';
import Modal from './Modal';

interface Props {
    children: React.ReactNode;
}

export default function FixedModalCTA({ children }: Props) {
    return (
        <PortalConsumer>
            <Backdrop show={true}/>
            <Modal show={true}>
                {children}
            </Modal>
        </PortalConsumer>
    );
}
