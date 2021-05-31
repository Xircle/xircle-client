import { useState } from 'react';
import styled from '@emotion/styled';
import NavigationScroller from '../Navigation/NavigationScroller';
import ProfileArticleContainer from './ProfileArticleContainer';
import { useAppSelector, useAppDispatch } from '../../hooks/useSelector';
import type { Interest, InterestInfo } from '../../store/modules/articles';
import type { ActiveOptionProps } from '../Navigation/NavigationScroller';


interface Props {
  interestArr: ActiveOptionProps[];
  isFriendProfile?: boolean 
}

function ProfileMainContainer({ interestArr, isFriendProfile }: Props) {
  const [activeOption, setActiveOption] = useState<ActiveOptionProps>({
    name: '전체',
    count: undefined,
  });
  const [activeOptionArr, setActiveOptionArr] = useState<ActiveOptionProps[]>(interestArr);

  const handleClickedOption = (clickedOption: string) => {
      const activeOption = activeOptionArr.filter(option => option.name === clickedOption)[0];
      setActiveOption({
          name: activeOption.name,
          count: activeOption.count
      });
  };


  return (
    <>
      <Container>
        <NavigationScroller
          onClickOption={handleClickedOption}
          activeOptionArr={activeOptionArr}
          activeOption={activeOption}
        />
      </Container>
      <ProfileArticleContainer activeInterest={activeOption.name} />
    </>
  );
}

const Container = styled.div`
  margin: 30px 0 0;
`;

export default ProfileMainContainer;
