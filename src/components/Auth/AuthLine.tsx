/** @jsxImportSource @emotion/react */
import React, { ComponentProps } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import AuthLayout from './AuthLayout';
import { lines } from '../../model/person';
import AuthRowItem from './AuthRowItem';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAppDispatch } from '../../hooks/useSelector';
import { addAdj } from '../../store/modules/profile';

interface Props extends ComponentProps<typeof AuthLayout>{
    onNext: () => void;
}

export default function AuthLine({ onNext, ...props }: Props) {
    const [rowValue, setRowValue] = React.useState<string>('');
    const [show, setShow] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();

    const finalClickHandler = () => {
        if(!rowValue) return alert("선택지 중에 하나 선택해주세요!")
        dispatch(addAdj(rowValue));
        onNext();
    }

    return (
        <div css={css`position: relative;`}>
            <AuthLayout {...props}>
                <Container>
                    {lines.map(({ value }) => (
                        <AuthRowItem 
                            key={value}
                            value={value}
                            clicked={value === rowValue}
                            onClick={value => {
                                console.log(value);
                                setRowValue(value);
                                onNext();
                            }}
                        />
                    ))}
                </Container>
            </AuthLayout>
        </div>
    );
}

const Container = styled.div`
  flex: 1;
  margin: 50px 30px;
`;