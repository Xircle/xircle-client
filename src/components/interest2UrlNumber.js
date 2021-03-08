import startup from '../images/interest_startup.svg';
import coding from '../images/interest_coding.svg';
import lawschool from '../images/interest_lawschool.svg';

function interest2UrlNumber(interestArr){
    const newArr = interestArr.map(interest => {
        let value;
        if(interest.hashtag) {
            value = interest.hashtag;
        }else {
            value = interest;
        }
        switch(value) {
            case "스타트업": 
                return {
                    title: "스타트업",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "맛집": 
                return {
                    title: "맛집",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "애견인": 
                return {
                    title: "애견인",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "요리": 
                return {
                    title: "요리",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "코딩": 
                return {
                    title: "코딩",
                    url: coding,
                    rowSpan: 'row-span-1'
                }
            case "패션": 
                return {
                    title: "패션",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "헬스": 
                return {
                    title: "헬스",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "보드게임": 
                return {
                    title: "보드게임",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "음악": 
                return {
                    title: "음악",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "취업준비": 
                return {
                    title: "취업준비",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            case "로스쿨": 
                return {
                    title: "로스쿨",
                    url: lawschool,
                    rowSpan: 'row-span-1'
                }
            case "대학원": 
                return {
                    title: "대학원",
                    url: startup,
                    rowSpan: 'row-span-1'
                }
            default:
                return null;
        }
    });
    return newArr;
}

export default interest2UrlNumber;
