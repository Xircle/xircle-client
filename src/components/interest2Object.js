import coding from '../images/my-profile/coding.svg';
import lawschool from '../images/my-profile/lawSchool.svg';
import art from '../images/my-profile/art.svg';
import friend from '../images/my-profile/friend.svg';
import game from '../images/my-profile/game.svg';
import meet from '../images/my-profile/meet.svg';
import fashion from '../images/my-profile/fashion.svg';
import dog from '../images/my-profile/dog.svg';
import health from '../images/my-profile/health.svg';
import graduate from '../images/my-profile/graduate.svg';
import startup from '../images/my-profile/startUp.svg';
import jobfinder from '../images/my-profile/jobfinder.svg';

export function interest2Index(interest){
    switch(interest) {
        case "스타트업":
            return 0
        case "술/맛집탐방":
            return 1
        case "애견인":
            return 2
        case "동네친구":
            return 3
        case "코딩":
            return 4
        case "패션":
            return 5
        case "헬스":
            return 6
        case "게임":
            return 7
        case "예술":
            return 8
        case "취업준비":
            return 9
        case "로스쿨":
            return 10
        case "대학원":
            return 11
        default:
            break;
    }
}

export function interest2Object(interestArr){
    const newArr = interestArr.map(interest => {
        let value;
        if(interest.interest) {
            value = interest.interest;
        }else {
            value = interest;
        }
        switch(value) {
            case "스타트업": 
                return {
                    ...interest,
                    url: startup,
                }
            case "술/맛집탐방": 
                return {
                    ...interest,
                    url: meet,
                }
            case "애견인": 
                return {
                    ...interest,
                    url: dog,
                }
            case "동네친구": 
                return {
                    ...interest,
                    url: friend,
                }
            case "코딩": 
                return {
                    ...interest,
                    url: coding,
                }
            case "패션": 
                return {
                    ...interest,
                    url: fashion,
                }
            case "헬스": 
                return {
                    ...interest,
                    url: health,
                }
            case "게임": 
                return {
                    ...interest,
                    url: game,
                }
            case "예술": 
                return {
                    ...interest,
                    url: art,
                }
            case "취업준비": 
                return {
                    ...interest,
                    url: jobfinder,
                }
            case "로스쿨": 
                return {
                    ...interest,
                    url: lawschool,
                }
            case "대학원": 
                return {
                    ...interest,
                    url: graduate,
                }
            default:
                return null;
        }
    });
    return newArr;
}

