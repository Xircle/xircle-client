/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import Top02 from '../Top/Top02';
import Top06 from '../Top/Top06';

interface Props {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

export default function AuthLayout({ title, description, children }: Props) {
  return (
    <LayoutContainer>
      <Top02>{title}</Top02>
      {description !== null && <Top06>{description}</Top06>}
      {children}
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  margin: 30px 0;
`;