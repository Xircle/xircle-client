/** @jsxImportSource @emotion/react */
import React from 'react';
import { PortalConsumer } from '../../providers/PortalProviders';
import Backdrop from './Backdrop';
import Modal from './Modal';

interface Props {
  children: React.ReactNode;
  mandatory?: boolean;
  show: boolean;
  clicked?: () => void;
}

export default function FixedModalCTA({
  show,
  clicked,
  mandatory = true,
  children,
}: Props) {
  return (
    <PortalConsumer>
      <Backdrop clicked={!mandatory ? clicked : undefined} show={show} />
      <Modal show={show}>{children}</Modal>
    </PortalConsumer>
  );
}
