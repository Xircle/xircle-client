/** @jsxImportSource @emotion/react */
import React, { ComponentProps, useReducer } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AuthLayout from './AuthLayout';
import { useAppDispatch } from '../../hooks/useSelector';

interface Props extends ComponentProps<typeof AuthLayout> {
  onNext: () => void;
}

type InterestState = {
  startup_clicked: boolean;
  mukBang_clicked: boolean;
  dogLover_clicked: boolean;
  friend_clicked: boolean;
  coding_clicked: boolean;
  fashion_clicked: boolean;
  health_clicked: boolean;
  game_clicked: boolean;
  art_clicked: boolean;
  prepare_clicked: boolean;
  graduateSchool_clicked: boolean;
  lawSchool_clicked: boolean;
  hobby_clicked: boolean;
  travel_clicked: boolean;
  portfolio_clicked: boolean;
  investment_clicked: boolean;
  interestArr: string[];
};

type InterestAction =
  | { type: 'STARTUP_CLICKED' }
  | { type: 'MUKBANG_CLICKED' }
  | { type: 'DOGLOVER_CLICKED' }
  | { type: 'FRIEND_CLICKED' }
  | { type: 'CODING_CLICKED' }
  | { type: 'FASHION_CLICKED' }
  | { type: 'HEALTH_CLICKED' }
  | { type: 'GAME_CLICKED' }
  | { type: 'ART_CLICKED' }
  | { type: 'PREPARE_CLICKED' }
  | { type: 'LAWSCHOOL_CLICKED' }
  | { type: 'GRADUATESCHOOL_CLICKED' }
  | { type: 'HOBBY_CLICKED' }
  | { type: 'TRAVEL_CLICKED' }
  | { type: 'PORTFOLIO_CLICKED' }
  | { type: 'INVESTMENT_CLICKED' };

function reducer(state: InterestState, action: InterestAction) {
  let newArr: string[] = [];
  switch (action.type) {
    case 'STARTUP_CLICKED':
      newArr = state.interestArr.slice(); // swallow copy

      if (state.startup_clicked) {
        // false이면 => true가 될테니, 배열에 추가
        const index = newArr.findIndex((el) => el === '스타트업');
        newArr.splice(index, 1);
      } else {
        newArr.push('스타트업');
      }
      return {
        ...state,
        startup_clicked: !state.startup_clicked,
        interestArr: newArr,
      };
    case 'MUKBANG_CLICKED':
      newArr = state.interestArr.slice();
      if (state.mukBang_clicked) {
        const index = newArr.findIndex((el) => el === '술/맛집탐방');
        newArr.splice(index, 1);
      } else {
        newArr.push('술/맛집탐방');
      }
      return {
        ...state,
        mukBang_clicked: !state.mukBang_clicked,
        interestArr: newArr,
      };
    case 'DOGLOVER_CLICKED':
      newArr = state.interestArr.slice();
      if (state.dogLover_clicked) {
        const index = newArr.findIndex((el) => el === '애견인');
        newArr.splice(index, 1);
      } else {
        newArr.push('애견인');
      }
      return {
        ...state,
        dogLover_clicked: !state.dogLover_clicked,
        interestArr: newArr,
      };
    case 'FRIEND_CLICKED':
      newArr = state.interestArr.slice(); // swallow copy

      if (state.friend_clicked) {
        // false이면 => true가 될테니, 배열에 추가
        const index = newArr.findIndex((el) => el === '동네친구');
        newArr.splice(index, 1);
      } else {
        newArr.push('동네친구');
      }
      return {
        ...state,
        friend_clicked: !state.friend_clicked,
        interestArr: newArr,
      };
    case 'CODING_CLICKED':
      newArr = state.interestArr.slice();
      if (state.coding_clicked) {
        const index = newArr.findIndex((el) => el === '코딩');
        newArr.splice(index, 1);
      } else {
        newArr.push('코딩');
      }
      return {
        ...state,
        coding_clicked: !state.coding_clicked,
        interestArr: newArr,
      };
    case 'FASHION_CLICKED':
      newArr = state.interestArr.slice();
      if (state.fashion_clicked) {
        const index = newArr.findIndex((el) => el === '패션');
        newArr.splice(index, 1);
      } else {
        newArr.push('패션');
      }
      return {
        ...state,
        fashion_clicked: !state.fashion_clicked,
        interestArr: newArr,
      };
    case 'HEALTH_CLICKED':
      newArr = state.interestArr.slice();
      if (state.health_clicked) {
        const index = newArr.findIndex((el) => el === '헬스');
        newArr.splice(index, 1);
      } else {
        newArr.push('헬스');
      }
      return {
        ...state,
        health_clicked: !state.health_clicked,
        interestArr: newArr,
      };
    case 'GAME_CLICKED':
      newArr = state.interestArr.slice();
      if (state.game_clicked) {
        const index = newArr.findIndex((el) => el === '게임');
        newArr.splice(index, 1);
      } else {
        newArr.push('게임');
      }
      return {
        ...state,
        game_clicked: !state.game_clicked,
        interestArr: newArr,
      };
    case 'ART_CLICKED':
      newArr = state.interestArr.slice();
      if (state.art_clicked) {
        const index = newArr.findIndex((el) => el === '예술');
        newArr.splice(index, 1);
      } else {
        newArr.push('예술');
      }
      return {
        ...state,
        art_clicked: !state.art_clicked,
        interestArr: newArr,
      };
    case 'PREPARE_CLICKED':
      newArr = state.interestArr.slice();
      if (state.prepare_clicked) {
        const index = newArr.findIndex((el) => el === '취업준비');
        newArr.splice(index, 1);
      } else {
        newArr.push('취업준비');
      }
      return {
        ...state,
        prepare_clicked: !state.prepare_clicked,
        interestArr: newArr,
      };
    case 'LAWSCHOOL_CLICKED':
      newArr = state.interestArr.slice();
      if (state.lawSchool_clicked) {
        const index = newArr.findIndex((el) => el === '수험생');
        newArr.splice(index, 1);
      } else {
        newArr.push('수험생');
      }
      return {
        ...state,
        lawSchool_clicked: !state.lawSchool_clicked,
        interestArr: newArr,
      };
    case 'GRADUATESCHOOL_CLICKED':
      newArr = state.interestArr.slice();
      if (state.graduateSchool_clicked) {
        const index = newArr.findIndex((el) => el === '대학원');
        newArr.splice(index, 1);
      } else {
        newArr.push('대학원');
      }
      return {
        ...state,
        graduateSchool_clicked: !state.graduateSchool_clicked,
        interestArr: newArr,
      };
    case 'HOBBY_CLICKED':
      newArr = state.interestArr.slice();
      if (state.hobby_clicked) {
        const index = newArr.findIndex((el) => el === '일상/취미');
        newArr.splice(index, 1);
      } else {
        newArr.push('일상/취미');
      }
      return {
        ...state,
        hobby_clicked: !state.hobby_clicked,
        interestArr: newArr,
      };
    case 'TRAVEL_CLICKED':
      newArr = state.interestArr.slice();
      if (state.travel_clicked) {
        const index = newArr.findIndex((el) => el === '여행');
        newArr.splice(index, 1);
      } else {
        newArr.push('여행');
      }
      return {
        ...state,
        travel_clicked: !state.travel_clicked,
        interestArr: newArr,
      };
    case 'PORTFOLIO_CLICKED':
      newArr = state.interestArr.slice();
      if (state.portfolio_clicked) {
        const index = newArr.findIndex((el) => el === '커리어/포트폴리오');
        newArr.splice(index, 1);
      } else {
        newArr.push('커리어/포트폴리오');
      }
      return {
        ...state,
        portfolio_clicked: !state.portfolio_clicked,
        interestArr: newArr,
      };
    case 'INVESTMENT_CLICKED':
      newArr = state.interestArr.slice();
      if (state.investment_clicked) {
        const index = newArr.findIndex((el) => el === '재테크');
        newArr.splice(index, 1);
      } else {
        newArr.push('재테크');
      }
      return {
        ...state,
        investment_clicked: !state.investment_clicked,
        interestArr: newArr,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

type option = {
  value: string;
  clickedType: InterestAction['type'];
  clicked: boolean;
};

export default function AuthInterest({ onNext, ...props }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    startup_clicked: false,
    mukBang_clicked: false,
    dogLover_clicked: false,
    friend_clicked: false,
    coding_clicked: false,
    fashion_clicked: false,
    health_clicked: false,
    game_clicked: false,
    art_clicked: false,
    prepare_clicked: false,
    graduateSchool_clicked: false,
    lawSchool_clicked: false,
    hobby_clicked: false,
    travel_clicked: false,
    portfolio_clicked: false,
    investment_clicked: false,
    interestArr: [],
  });

  const options: option[] = [
    {
      value: '맛집/카페',
      clickedType: 'MUKBANG_CLICKED',
      clicked: state.mukBang_clicked,
    },
    {
      value: '동네친구',
      clickedType: 'FRIEND_CLICKED',
      clicked: state.friend_clicked,
    },
    {
      value: '반려동물',
      clickedType: 'DOGLOVER_CLICKED',
      clicked: state.dogLover_clicked,
    },
    {
      value: '취업',
      clickedType: 'PREPARE_CLICKED',
      clicked: state.prepare_clicked,
    },
    {
      value: '수험생',
      clickedType: 'LAWSCHOOL_CLICKED',
      clicked: state.lawSchool_clicked,
    },
    {
      value: '대학원',
      clickedType: 'GRADUATESCHOOL_CLICKED',
      clicked: state.graduateSchool_clicked,
    },
    {
      value: '스타트업',
      clickedType: 'STARTUP_CLICKED',
      clicked: state.startup_clicked,
    },
    {
      value: '운동/엑티비티',
      clickedType: 'HEALTH_CLICKED',
      clicked: state.health_clicked,
    },
    {
      value: '게임',
      clickedType: 'GAME_CLICKED',
      clicked: state.game_clicked,
    },
    {
      value: '예술',
      clickedType: 'ART_CLICKED',
      clicked: state.art_clicked,
    },
    {
      value: '패션',
      clickedType: 'FASHION_CLICKED',
      clicked: state.fashion_clicked,
    },
    {
      value: '코딩',
      clickedType: 'CODING_CLICKED',
      clicked: state.coding_clicked,
    },
    {
      value: '일상/취미',
      clickedType: 'HOBBY_CLICKED',
      clicked: state.hobby_clicked,
    },
    {
      value: '여행',
      clickedType: 'TRAVEL_CLICKED',
      clicked: state.travel_clicked,
    },
    {
      value: '커리어/포트폴리오',
      clickedType: 'PORTFOLIO_CLICKED',
      clicked: state.portfolio_clicked,
    },
    {
      value: '재테크',
      clickedType: 'INVESTMENT_CLICKED',
      clicked: state.investment_clicked,
    },
  ];

  const dispatchRedux = useAppDispatch();

  return (
    <AuthLayout {...props}>
      <CircleCotnainer>
        {options.map(({ value, clickedType, clicked }) => (
          <CircleInterest
            key={value}
            clicked={clicked}
            onClick={() => dispatch({ type: clickedType })}
          >
            {value}
          </CircleInterest>
        ))}
      </CircleCotnainer>
    </AuthLayout>
  );
}

const CircleCotnainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  margin: 30px 0;
`;

const CircleInterest = styled.div<{ clicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0px 2px 28px rgba(75, 88, 208, 0.15);
  color: #18a0fb;
  font-weight: 700;
  border: 1px solid #18a0fb;
  -webkit-transition: background-color 0.1s ease-in-out;
  transition: background-color .1s, border .1s;
  cursor: pointer;
  ${(props) =>
    props.clicked &&
    css`
      background-color: #dbedff;
      border: 5px solid #007fff;
    `}
`;
