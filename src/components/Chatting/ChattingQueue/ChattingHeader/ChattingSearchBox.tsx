import { useState, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import colors from '../../../../constants/colors';
import { SearchOutline } from 'react-ionicons'

interface Props {
    keyStroke: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ChattingSearchBox({ keyStroke, onChange }: Props) {
    return (
        <Container>
            <SearchOutline 
                style={{position: 'absolute', left: 20, top: '47%', transform: `translate(0, -50%)`}}
                color={'#A7B0C0'} 
                title='search'
                height="24px"
                width="24px"
            />
            <StyledInput 
                value={keyStroke} 
                onChange={onChange} 
                placeholder="닉네임으로 검색"
            />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
`;

const StyledInput = styled.input`
    background-color: ${colors.xircleBg};
    border: 1px solid #E7ECF3;
    border-radius: 100px;
    box-sizing: border-box;
    padding: 20px 50px;
    width: 80%;
    &:focus {
        outline: none;
    }
`;