import Top02 from '../Top/Top02';
import Top06 from '../Top/Top06';
import React from 'react';

interface Props {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

export default function AuthLayout({ title, description, children }: Props) {
  return (
    <>
      <Top02>{title}</Top02>
      {description !== null && <Top06>{description}</Top06>}
      {children}
    </>
  );
}
