import React, { useState, useReducer, useCallback} from 'react';
import { useDispatch} from 'react-redux';
import interest_1 from '../images/interest_1.svg';
import interest_2 from '../images/interest_2.svg';
import interest_3 from '../images/interest_3.svg';
import interest_4 from '../images/interest_4.svg';
import interest_5 from '../images/interest_5.svg';
import interest_6 from '../images/interest_6.svg';
import interest_7 from '../images/interest_7.svg';
import interest_8 from '../images/interest_8.svg';
import interest_9 from '../images/interest_9.svg';
import interest_10 from '../images/interest_10.svg';
import interest_11 from '../images/interest_11.svg';
import interest_12 from '../images/interest_12.svg';

import * as actions from '../store/actions/index';

function reducer(state, action) {
    let newArr = null;
    switch (action.type) {
        case 'STARTUP_CLICKED':
            newArr = state.interestArr.slice(); // swallow copy

            if(state.startUpClicked) { // false이면 => true가 될테니, 배열에 추가
                const index = newArr.findIndex(el => el === '스타트업');
                newArr.splice(index, 1);
            }else {
                newArr.push('스타트업')
            }
            return {
                ...state,
                startUpClicked: !state.startUpClicked,
                interestArr: newArr
            };
        case 'MUKBANG_CLICKED':
            newArr = state.interestArr.slice(); 
            if(state.mukBangClicked) {
                const index = newArr.findIndex(el => el === '맛집');
                newArr.splice(index, 1);
            }else {
                newArr.push('맛집')
            }
            return {
                ...state,
                mukBangClicked: !state.mukBangClicked,
                interestArr: newArr
            };
        case 'DOGLOVER_CLICKED':
            newArr = state.interestArr.slice(); 
            if(state.dogLoverClicked) {
                const index = newArr.findIndex(el => el === '애견인');
                newArr.splice(index, 1);
            }else {
                newArr.push('애견인')
            }
            return {
                ...state,
                dogLoverClicked: !state.dogLoverClicked,
                interestArr: newArr
            };
        case 'COOKING_CLICKED':
            newArr = state.interestArr.slice(); // swallow copy

            if(state.cookingClicked) { // false이면 => true가 될테니, 배열에 추가
                const index = newArr.findIndex(el => el === '요리');
                newArr.splice(index, 1);
            }else {
                newArr.push('요리')
            }
            return {
                ...state,
                cookingClicked: !state.cookingClicked,
                interestArr: newArr
            };
        case 'CODING_CLICKED':
            newArr = state.interestArr.slice();
            if(state.codingClicked) {
                const index = newArr.findIndex(el => el === '코딩');
                newArr.splice(index, 1);
            }else {
                newArr.push('코딩')
            }
            return {
                ...state,
                codingClicked: !state.codingClicked,
                interestArr: newArr
            };
        case 'FASHION_CLICKED':
            newArr = state.interestArr.slice();
            if(state.fashionClicked) {
                const index = newArr.findIndex(el => el === '패션');
                newArr.splice(index, 1);
            }else {
                newArr.push('패션')
            }
            return {
                ...state,
                fashionClicked: !state.fashionClicked,
                interestArr: newArr
            };
        case 'HEALTH_CLICKED':
            newArr = state.interestArr.slice(); 
            if(state.healthClicked){
                const index = newArr.findIndex(el => el === '헬스');
                newArr.splice(index, 1);
            }else {
                newArr.push('헬스')
            }
            return {
                ...state,
                healthClicked: !state.healthClicked,
                interestArr: newArr
            };
        case 'BOARDGAME_CLICKED':
            newArr = state.interestArr.slice(); 
            if(state.boardGameClicked){
                const index = newArr.findIndex(el => el === '보드게임');
                newArr.splice(index, 1);
            }else {
                newArr.push('보드게임')
            }
            return {
                ...state,
                boardGameClicked: !state.boardGameClicked,
                interestArr: newArr
            };
        case 'MUSIC_CLICKED':
            newArr = state.interestArr.slice();
            if(state.musicClicked) {
                const index = newArr.findIndex(el => el === '음악');
                newArr.splice(index, 1);
            }else {
                newArr.push('음악')
            }
            return {
                ...state,
                musicClicked: !state.musicClicked,
                interestArr: newArr
            };
        case 'PREPARE_CLICKED':
            newArr = state.interestArr.slice();
            if(state.prepareClicked) {
                const index = newArr.findIndex(el => el === '취업준비');
                newArr.splice(index, 1);
            }else {
                newArr.push('취업준비')
            }
            return {
                ...state,
                prepareClicked: !state.prepareClicked,
                interestArr: newArr
            };
        case 'LAWSCHOOL_CLICKED':
            newArr = state.interestArr.slice(); 
            if(state.lawSchoolClicked){
                const index = newArr.findIndex(el => el === '로스쿨');
                newArr.splice(index, 1);
            }else {
                newArr.push('로스쿨')
            }
            return {
                ...state,
                lawSchoolClicked: !state.lawSchoolClicked,
                interestArr: newArr
            };
        case 'GRADUATESCHOOL_CLICKED':
            newArr = state.interestArr.slice(); 
            if(state.graduateSchoolClicked){
                const index = newArr.findIndex(el => el === '대학원');
                newArr.splice(index, 1);
            }else {
                newArr.push('대학원')
            }
            return {
                ...state,
                graduateSchoolClicked: !state.graduateSchoolClicked,
                interestArr: newArr
            };
        
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

const InterestSetting = ({ history }) => {
    const [state, dispatch] = useReducer(reducer, {
        startUpClicked: false,
        mukBangClicked: false,
        dogLoverClicked: false,
        cookingClicked: false,
        codingClicked: false,
        fashionClicked: false,
        healthClicked: false,
        boardGameClicked: false,
        healthClicked: false,
        healthClicked: false,
        healthClicked: false,
        interestArr: [],
    });

    const dispatchRedux = useDispatch();
    const interestSubmitHandler = useCallback((event) => {
        event.preventDefault();
        if(state.interestArr.length < 2) {
            return alert("관심사를 2개 이상 골라주세요! 관심사가 많아질수록 다양한 친구들을 만날 확률이 높아집니다!")
        }

        dispatchRedux(actions.addInterest(state.interestArr));
        history.push('/setting/6');
    }, [state]);
    
    const { 
        startUpClicked,
        mukBangClicked, 
        dogLoverClicked,
        cookingClicked, 
        codingClicked,
        fashionClicked,
        healthClicked,
        boardGameClicked, 
        musicClicked,
        prepareClicked,
        graduateSchoolClicked,
        lawSchoolClicked,
    } = state;
    return (
        <>
            <div style={{height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyItems: 'center'}}>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  backgroundColor: "#FFEAEA", borderRadius: 40, borderRadius: '100%', 
                        border: startUpClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_7})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "STARTUP_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@스타트업</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  backgroundColor: "#FFEAEA", borderRadius: 40,borderRadius: '100%', 
                        border: mukBangClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_3})`}} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "MUKBANG_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@맛집</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: 40, borderRadius: '100%', 
                        border: dogLoverClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_10})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "DOGLOVER_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@애견인</p>
                </div>
                <div
                    style={{
                        margin: 5, width: 90, height: 90, textAlign: 'center',  backgroundColor: "#C4C4C4", borderRadius: '100%', 
                        border: cookingClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_4})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "COOKING_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@요리</p>
                </div>
                <div
                    style={{
                        margin: 5, width: 90, height: 90, textAlign: 'center',  backgroundColor: "#C4C4C4", borderRadius: '100%', 
                        border: codingClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_5})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "CODING_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@코딩</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: 40,borderRadius: '100%', 
                        border: fashionClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_12})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "FASHION_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@패션</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: 40,borderRadius: '100%', 
                        border: healthClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_8})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "HEALTH_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@헬스</p>
                </div>
                <div
                    style={{
                        margin: 5, width: 90, height: 90, textAlign: 'center',  backgroundColor: "#C4C4C4", borderRadius: '100%', 
                        border: boardGameClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_9})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "BOARDGAME_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@보드게임</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: 40, borderRadius: '100%', 
                        border: musicClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_6})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "MUSIC_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@음악</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  backgroundColor: "#FFEAEA", borderRadius: 40,borderRadius: '100%', 
                        border: prepareClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_11})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "PREPARE_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@취업준비</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: 40, borderRadius: '100%', 
                        border: lawSchoolClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_2})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "LAWSCHOOL_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@로스쿨</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: 40,borderRadius: '100%', 
                        border: graduateSchoolClicked && '7px solid orange', backgroundSize: 'cover', backgroundImage: `url(${interest_1})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "GRADUATESCHOOL_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@대학원</p>
                </div>
            </div>
            <button onClick={(e) => interestSubmitHandler(e)} style={{width: '100%'}} className="my-10 rounded-lg px-5 py-3 bg-black text-white focus:outline-none">
                    다음
            </button>
        </>            
    )
}

export default InterestSetting;