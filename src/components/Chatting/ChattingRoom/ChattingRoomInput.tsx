/** @jsxImportSource @emotion/react */
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ArrowUpCircleSharp } from 'react-ionicons'

export interface Props {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
}

export default function ChattingRoomInput ({ value, onChange, onSubmit }: Props) {
    return (
        <InputContainer>
            <form onSubmit={(e) => {e.preventDefault(); onSubmit()}}>
                <StyledInput 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="친구에게 Chat을 보내보세요."
                />
                <StyledSendBtn
                    onClick={onSubmit}
                    color={'#007FFF'} 
                    title={"전송"}
                    height="44px"
                    width="44px"
                />
            </form>
        </InputContainer>
    );
}

const InputContainer = styled.div`
    position: fixed;
    bottom: 30px;
    width: 100%;
    padding: 0 20px;
`;

const StyledInput = styled.input`
    padding: 20px 30px;
    border-radius: 36px;
    box-shadow: 0px 2px 28px rgba(75, 88, 208, 0.1);
    border: 1px solid #F5F5F5;
    width: 100%;
    &:focus {
        outline: none;
    }
    @media (min-width: 700px) {
        width: 360px;
    }
`;

const StyledSendBtn = styled(ArrowUpCircleSharp)`
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translate(0, -50%);
`;