import { useState } from 'react';
import styled from '@emotion/styled';
import NavigationScroller from '../Navigation/NavigationScroller';
import ProfileArticleContainer from './ProfileArticleContainer';
import { useAppSelector, useAppDispatch } from '../../hooks/useSelector';
import type { Interest, InterestInfo } from '../../store/modules/articles';

type options = {
    name: Interest | '전체'
    count: number
}
export type ActiveOptions = options[]

function optionGenerator(interests: InterestInfo[]) {
    let cnt = 0;
    const optionArr: ActiveOptions = interests.map(el => {
        cnt += el.activity;
        return {
            name: el.interest,
            count: el.activity
        }
    });
    optionArr.unshift({ name: '전체', count: cnt });
    return optionArr;
}

function ProfileMainContainer() {
    const { interests } = useAppSelector(store => store.articles);
    const [active, setActive] = useState<'전체' | Interest>("전체");
    const [activeOptions, setActiveOptions] = useState<ActiveOptions>(() => optionGenerator(interests));

    const NaviClickHandler = (activeOption: '전체' | Interest) => {
        setActive(activeOption);
    }

    return (
        <>
            <Container>
                <NavigationScroller 
                    active={active}
                    activeOptions={activeOptions} 
                    onClick={NaviClickHandler}
                />
            </Container>
            <ProfileArticleContainer active={active} />
        </>
    )
}

const Container = styled.div`
    margin: 30px 0 0;
`;

export default ProfileMainContainer;