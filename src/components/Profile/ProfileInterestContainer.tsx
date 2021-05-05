import { useState } from 'react';
import styled from '@emotion/styled';
import NavigationSlider from '../Navigation/NavigationSlider';
import ProfileInterest from './ProfileInterest';
import type { Interest } from '../../store/modules/articles';

export type ActiveOptions = ["Interest", "모든 게시글", Interest | null];

function ProfileInterestContainer() {
    const [active, setActive] = useState<string | Interest>("Interest");
    const [activeOptions, setActiveOptions] = useState<ActiveOptions>([
        "Interest",
        "모든 게시글",
        null
    ]);
    
    const NaviClickHandler = (activeOption: string) => {
        setActive(activeOption);
    }

    const InterestClickHandler = (clickedInterest: Interest) => {
        setActive(clickedInterest);
        setActiveOptions(["Interest", "모든 게시글", clickedInterest]);
    }

    return (
        <>
            <Container>
                <NavigationSlider 
                    onClick={NaviClickHandler}
                    activeOptions={activeOptions} 
                    active={active}
                />
            </Container>
            <ProfileInterest 
                interestClickHandler={InterestClickHandler}
                active={active}
            />
        </>
    )
}

const Container = styled.div`
    padding: 0 20px;
    margin: 30px 0 0;
`;

export default ProfileInterestContainer;