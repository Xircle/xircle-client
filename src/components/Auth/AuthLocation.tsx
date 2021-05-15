/** @jsxImportSource @emotion/react */
import { ComponentProps } from 'react';
import AuthLayout from './AuthLayout';
import { Container } from './AuthContainer';
import KakaoMap from '../KakaoMap';

interface Props extends ComponentProps<typeof AuthLayout>{
    onNext: () => void;
}

export default function AuthLocation ({ onNext, ...rest }: Props) {
    return (
        <AuthLayout {...rest}>
            <Container>
                <KakaoMap onNext={onNext}/>
            </Container>
        </AuthLayout>
    );
}

