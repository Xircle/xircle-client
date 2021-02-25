import React, { useState, useReducer, useCallback} from 'react';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/index';

function reducer(state, action) {
    let newArr = null;
    switch (action.type) {
        case 'ART_CLICKED':
            newArr = state.interestArr.slice(); // swallow copy
            console.log('beforeArr : ', newArr);

            if(state.artClicked) { // false이면 => true가 될테니, 배열에 추가
                const index = newArr.findIndex(el => el === 'art');
                newArr.splice(index, 1);
                console.log('AfterArr : ', newArr);
            }else {
                newArr.push('art')
            }
            return {
                ...state,
                artClicked: !state.artClicked,
                interestArr: newArr
            };
        case 'MUKBANG_CLICKED':
            newArr = state.interestArr.slice(); 
            console.log('beforeArr : ', newArr);
            if(state.mukbangClicked) {
                const index = newArr.findIndex(el => el === 'mukbang');
                newArr.splice(index, 1);
                console.log('AfterArr : ', newArr);
            }else {
                newArr.push('mukbang')
            }
            return {
                ...state,
                mukbangClicked: !state.mukbangClicked,
                interestArr: newArr
            };
        case 'GAME_CLICKED':
            newArr = state.interestArr.slice(); 
            console.log('beforeArr : ', newArr);
            if(state.gameClicked){
                const index = newArr.findIndex(el => el === 'game');
                newArr.splice(index, 1);
                console.log('AfterArr : ', newArr);
            }else {
                newArr.push('game')
            }
            return {
                ...state,
                gameClicked: !state.gameClicked,
                interestArr: newArr
            };
        case 'DEVELOP_CLICKED':
            newArr = state.interestArr.slice();
            console.log('beforeArr : ', newArr);
            if(state.developmentClicked) {
                const index = newArr.findIndex(el => el === 'develope');
                newArr.splice(index, 1);
                console.log('AfterArr : ', newArr);
            }else {
                newArr.push('develope')
            }
            return {
                ...state,
                developmentClicked: !state.developmentClicked,
                interestArr: newArr
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

const InterestSetting = ({ history }) => {
    const [state, dispatch] = useReducer(reducer, {
        artClicked: false,
        mukbangClicked: false,
        gameClicked: false,
        developmentClicked: false,
        interestArr: [],
    });

    const dispatchRedux = useDispatch();
    const interestSubmitHandler = useCallback((event) => {
        event.preventDefault();
        dispatchRedux(actions.addInterest(state.interestArr));
        console.log(state);
        history.push('/setting/9');
    }, [state]);
    
    const { artClicked, mukbangClicked, gameClicked, developmentClicked } = state;
    return (
        <>
            <div style={{height: 400}} className="grid grid-cols-2 grid-rows-3 gap-2">
                <div 
                    style={{backgroundColor: "#C4C4C4", borderRadius: 40, border: artClicked && '5px solid lightskyblue'}} 
                    className="bg-blue-400 cursor-pointer"
                    onClick={() => dispatch({type: "ART_CLICKED"})}
                >
                    <h3 className="text-black text-2xl h-full inline-flex items-center">예술</h3>
                </div>
                <div 
                    style={{borderRadius: 40, border: mukbangClicked && '5px solid lightskyblue'}} 
                    className="bg-blue-400 cursor-pointer"
                    onClick={() => dispatch({type: "MUKBANG_CLICKED"})}
                >
                    <h3 className="text-white text-2xl h-full inline-flex items-center">먹방투어</h3>
                </div>
                <div 
                    style={{backgroundColor: "#FFEAEA", borderRadius: 40, border: gameClicked && '5px solid lightskyblue'}} 
                    className="bg-blue-400 cursor-pointer"
                    onClick={() => dispatch({type: "GAME_CLICKED"})}
                >
                    <h3 className="text-red text-2xl h-full inline-flex items-center">게임</h3>
                </div>
                <div 
                    style={{borderRadius: 40, border: developmentClicked && '5px solid lightskyblue'}} 
                    className="bg-cyan cursor-pointer"
                    onClick={() => dispatch({type: "DEVELOP_CLICKED"})}
                >
                    <h3 className="text-2xl h-full inline-flex items-center">개발</h3>
                </div>
            </div>
            <button onClick={(e) => interestSubmitHandler(e)} className="mt-5 w-1/2 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
            </button>
        </>            
    )
}

export default InterestSetting;