import { ComponentProps } from 'react';
import styled from '@emotion/styled';
import Top02 from '../../../Top/Top02';
import ChattingSearchBox from './ChattingSearchBox';
import ChattingType from './ChattingType';

interface Props extends ComponentProps<typeof ChattingSearchBox> {
    type: string
    onChangeType: (type: string) => void
}

export default function ChattingHeader({ type, onChangeType, ...props }: Props) {
    return (
        <Container>
            <Top02>Chat</Top02>
            <ChattingType type={type} onChangeType={onChangeType}/>
            <ChattingSearchBox {...props} />
        </Container>
    );
}

const Container = styled.div`
    margin-top: 30px;
    padding: 30px 30px 5px;
`;