import React, { useState, useReducer, useCallback} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import graduateSchool from '../../static/images/setting/interest_1.svg';
import startUp from '../../static/images/setting/startUp.jpg';
import friend from '../../static/images/setting/friend.svg';
import meet from '../../static/images/setting/meet.svg';
import dogLover from '../../static/images/setting/interest_10.svg';
import game from '../../static/images/setting/game.svg';
import coding from '../../static/images/setting/interest_5.svg';
import fashion from '../../static/images/setting/interest_12.svg';
import health from '../../static/images/setting/interest_8.svg';
import art from '../../static/images/setting/art.png';
import jobFinder from '../../static/images/setting/interest_11.svg';
import lawSchool from '../../static/images/setting/interest_2.svg';
// import {  } from '../store/modules/profile';
import { useAppDispatch } from '../../hooks/useSelector';

type InterestState = {
    startUpClicked: boolean,
    mukBangClicked: boolean,
    dogLoverClicked: boolean,
    friendClicked: boolean,
    codingClicked: boolean,
    fashionClicked: boolean,
    healthClicked: boolean,
    gameClicked: boolean,
    artClicked: boolean,
    prepareClicked: boolean,
    graduateSchoolClicked: boolean,
    lawSchoolClicked: boolean,
    interestArr: string[],
}

type InterestAction = 
    | ({ type: 'STARTUP_CLICKED'})
    | ({ type: 'MUKBANG_CLICKED'})
    | ({ type: 'DOGLOVER_CLICKED'})
    | ({ type: 'FRIEND_CLICKED'})
    | ({ type: 'CODING_CLICKED'})
    | ({ type: 'FASHION_CLICKED'})
    | ({ type: 'HEALTH_CLICKED'})
    | ({ type: 'GAME_CLICKED'})
    | ({ type: 'ART_CLICKED'})
    | ({ type: 'PREPARE_CLICKED'})
    | ({ type: 'LAWSCHOOL_CLICKED'})
    | ({ type: 'GRADUATESCHOOL_CLICKED'});

function reducer(state: InterestState, action: InterestAction) {
    let newArr: string[] = [];
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
                const index = newArr.findIndex(el => el === '술/맛집탐방');
                newArr.splice(index, 1);
            }else {
                newArr.push('술/맛집탐방')
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
        case 'FRIEND_CLICKED':
            newArr = state.interestArr.slice(); // swallow copy

            if(state.friendClicked) { // false이면 => true가 될테니, 배열에 추가
                const index = newArr.findIndex(el => el === '동네친구');
                newArr.splice(index, 1);
            }else {
                newArr.push('동네친구')
            }
            return {
                ...state,
                friendClicked: !state.friendClicked,
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
        case 'GAME_CLICKED':
            newArr = state.interestArr.slice(); 
            if(state.gameClicked){
                const index = newArr.findIndex(el => el === '게임');
                newArr.splice(index, 1);
            }else {
                newArr.push('게임')
            }
            return {
                ...state,
                gameClicked: !state.gameClicked,
                interestArr: newArr
            };
        case 'ART_CLICKED':
            newArr = state.interestArr.slice();
            if(state.artClicked) {
                const index = newArr.findIndex(el => el === '예술');
                newArr.splice(index, 1);
            }else {
                newArr.push('예술')
            }
            return {
                ...state,
                artClicked: !state.artClicked,
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
                const index = newArr.findIndex(el => el === '수험생');
                newArr.splice(index, 1);
            }else {
                newArr.push('수험생')
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
            throw new Error(`Unhandled action type`);
    }
}


const InterestSetting = ({ history }: RouteComponentProps) => {
    const [state, dispatch] = useReducer(reducer, {
        startUpClicked: false,
        mukBangClicked: false,
        dogLoverClicked: false,
        friendClicked: false,
        codingClicked: false,
        fashionClicked: false,
        healthClicked: false,
        gameClicked: false,
        artClicked: false,
        prepareClicked: false,
        graduateSchoolClicked: false,
        lawSchoolClicked: false,
        interestArr: [],
    });

    const dispatchRedux = useAppDispatch();
    const interestSubmitHandler = useCallback((event) => {
        event.preventDefault();
        if(state.interestArr.length < 2) {
            return alert("관심사를 2개 이상 골라주세요! 관심사가 많아질수록 다양한 친구들을 만날 확률이 높아집니다!")
        }

        // dispatchRedux(actions.addInterest(state.interestArr));
        history.push('/setting/6');
    }, [state]);
    
    const { 
        startUpClicked,
        mukBangClicked, 
        dogLoverClicked,
        friendClicked, 
        codingClicked,
        fashionClicked,
        healthClicked,
        gameClicked, 
        artClicked,
        prepareClicked,
        graduateSchoolClicked,
        lawSchoolClicked,
    } = state;
    return (
        <>
            <div style={{height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyItems: 'center'}}>
                <div
                    style={{
                        margin: 5, width: 90, height: 90, textAlign: 'center',  backgroundColor: "#C4C4C4", borderRadius: '100%', 
                        border: friendClicked ? '6px solid orange' : undefined, backgroundSize: 'cover', backgroundImage: `url(${friend})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "FRIEND_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@동네친구</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  backgroundColor: "#FFEAEA", borderRadius: '100%', 
                        border: mukBangClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${meet})`}} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "MUKBANG_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@술/맛집탐방</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: '100%', 
                        border: dogLoverClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${dogLover})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "DOGLOVER_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@애견인</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  backgroundColor: "#FFEAEA", borderRadius: '100%', 
                        border: startUpClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${startUp})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "STARTUP_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@스타트업</p>
                </div>
                <div
                    style={{
                        margin: 5, width: 90, height: 90, textAlign: 'center',  backgroundColor: "#C4C4C4", borderRadius: '100%', 
                        border: codingClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${coding})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "CODING_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@코딩</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90, borderRadius: '100%', 
                        border: fashionClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${fashion})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "FASHION_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@패션</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90, borderRadius: '100%', 
                        border: healthClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${health})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "HEALTH_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@헬스</p>
                </div>
                <div
                    style={{
                        margin: 5, width: 90, height: 90, textAlign: 'center',  backgroundColor: "#C4C4C4", borderRadius: '100%', 
                        border: gameClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${game})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "GAME_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@게임</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: '100%', 
                        border: artClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${art})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "ART_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@예술</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  backgroundColor: "#FFEAEA",borderRadius: '100%', 
                        border: prepareClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${jobFinder})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "PREPARE_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@취업준비</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90,  borderRadius: '100%', 
                        border: lawSchoolClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${lawSchool})`
                    }} 
                    className="cursor-pointer"
                    onClick={() => dispatch({type: "LAWSCHOOL_CLICKED"})}
                >
                    <p className="text-white h-full inline-flex items-center">@수험생</p>
                </div>
                <div 
                    style={{
                        margin: 5, width: 90, height: 90, borderRadius: '100%', 
                        border: graduateSchoolClicked ? '6px solid orange': undefined, backgroundSize: 'cover', backgroundImage: `url(${graduateSchool})`
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