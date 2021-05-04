import coding from '../static/images/my-profile/coding.svg';
import lawschool from '../static/images/my-profile/lawSchool.svg';
import art from '../static/images/my-profile/art.svg';
import friend from '../static/images/my-profile/friend.svg';
import game from '../static/images/my-profile/game.svg';
import meet from '../static/images/my-profile/meet.svg';
import fashion from '../static/images/my-profile/fashion.svg';
import dog from '../static/images/my-profile/dog.svg';
import health from '../static/images/my-profile/health.svg';
import graduate from '../static/images/my-profile/graduate.svg';
import startup from '../static/images/my-profile/startUp.svg';
import jobfinder from '../static/images/my-profile/jobfinder.svg';

export function interest2Index(interest: string): number | undefined{
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
        case "수험생":
            return 10
        case "대학원":
            return 11
        default:
            break;
    }
}

export function interest2Object(interestArr: any[]) {
    const newArr = interestArr?.map(el => {
        let value;
        if(el.interest) {
            value = el.interest;
        }else {
            value = el;
        }
        switch(value) {
            case "스타트업": 
                return {
                    ...el,
                    url: startup,
                }
            case "술/맛집탐방": 
                return {
                    ...el,
                    url: meet,
                }
            case "애견인": 
                return {
                    ...el,
                    url: dog,
                }
            case "동네친구": 
                return {
                    ...el,
                    url: friend,
                }
            case "코딩": 
                return {
                    ...el,
                    url: coding,
                }
            case "패션": 
                return {
                    ...el,
                    url: fashion,
                }
            case "헬스": 
                return {
                    ...el,
                    url: health,
                }
            case "게임": 
                return {
                    ...el,
                    url: game,
                }
            case "예술": 
                return {
                    ...el,
                    url: art,
                }
            case "취업준비": 
                return {
                    ...el,
                    url: jobfinder,
                }
            case "수험생": 
                return {
                    ...el,
                    url: lawschool,
                }
            case "대학원": 
                return {
                    ...el,
                    url: graduate,
                }
            default:
                return null;
        }
    });
    return newArr;
}

