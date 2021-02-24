import React, { useState, useReducer, useCallback} from 'react';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/index';

function reducer(state, action) {
    switch (action.type) {
        case 'ART_CLICKED':
            return {
                artClicked: !state.artClicked,
                mukbangClicked: state.mukbangClicked,
                gameClicked: state.gameClicked,
                developmentClicked: state.developmentClicked,
            };
        case 'MUKBANG_CLICKED':
            return {
                artClicked: state.artClicked,
                mukbangClicked: !state.mukbangClicked,
                gameClicked: state.gameClicked,
                developmentClicked: state.developmentClicked,
            };
        case 'GAME_CLICKED':
            return {
                artClicked: state.artClicked,
                mukbangClicked: state.mukbangClicked,
                gameClicked: !state.gameClicked,
                developmentClicked: state.developmentClicked,
            };
            
        case 'DEVELOP_CLICKED':
            return {
                artClicked: state.artClicked,
                mukbangClicked: state.mukbangClicked,
                gameClicked: state.gameClicked,
                developmentClicked: !state.developmentClicked,
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
    });

    const dispatchRedux = useDispatch();
    const interestSubmitHandler = useCallback((event) => {
        event.preventDefault();

        dispatchRedux(actions.addInterest());
        history.push('/setting/9');
    }, []);
    
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