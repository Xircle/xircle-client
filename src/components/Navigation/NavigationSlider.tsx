/** @jsxImportSource @emotion/react */
import { useState} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { ActiveOptions } from '../Profile/ProfileInterestContainer';
import { Interest } from '../../store/modules/articles';

export interface NavigationSliderProps {
    activeOptions: (string | Interest | null)[]
    onClick: (option: string) => void;
    active: string | Interest;
}

function NavigationSlider({ 
    activeOptions,
    onClick,
    active
}: NavigationSliderProps) {
    const [left, setLeft] = useState<number>(0);

    return (
        <Container>
            {activeOptions.map(title => {
                if(title === null) return <div css={css`width: 120px;`}></div>
                return (
                    <div
                        key={title}
                        onClick={() => {
                            const idx = activeOptions.findIndex(el => el === title);
                            setLeft(idx * 33.333);
                            onClick(title);
                        }}
                        css={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: ${active === title ? '#007FFF' : '#A7B0C0'};
                            width: 120px;
                            height: 2.5rem;
                            cursor: pointer;
                        `}
                    >
                        {title}
                    </div>
                )
            })}
            <Slider 
                left={left + '%'}
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`;

const Slider = styled.div<{ left: string }>`
    background-color: #007FFF;
    position: absolute;
    bottom: -2px;
    width: 120px;
    height: 2px;
    transition: left 0.25s ease-in-out 0s;
    left: ${props => props.left};
`;

export default NavigationSlider;