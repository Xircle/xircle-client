import styled from '@emotion/styled';
import colors from '../../../../constants/colors';

export interface IChattingTypeProps {
    type: string
    onChangeType: (type: string) => void
}

export default function ChattingType ({ type, onChangeType }: IChattingTypeProps) {
    return (
        <TypeContainer>
            <p 
                onClick={() => onChangeType('1:1')} 
                className={type === '1:1' ? 'active' : undefined}
            >
                1:1
            </p>
            <p 
                onClick={() => onChangeType('단체')} 
                className={type === '단체' ? 'active' : undefined}
            >
                써클 Chat
            </p>
            <ActiveBlock left={type === '1:1' ? '0%' : '47%'} active={type}/>
        </TypeContainer>
    );
}

const TypeContainer = styled.section`
    display: flex;
    position: relative;

    padding: 20px 18px;
    margin: 15px 0;
    width: 100%;
    height: 60px;
    background-color: ${colors.xircleBg};
    border: 1px solid #E7ECF3;
    border-radius: 100px;
    box-sizing: border-box;

    font-size: 18px;
    line-height: 28px;
    color: #A7B0C0;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    p {
        flex: 1;
        z-index: 10;
        text-align: center;
    }
    .active {
        color: #fff;
        font-weight: 700;
    }
`;

const ActiveBlock = styled.div<{left: string, active: string}>`
    position: absolute;
    left: ${props => props.left};
    top: 0;
    transition: left 0.25s ease-in-out 0s;
    background-color: ${colors.mainBlack};
    border-radius: 100px;
    padding: 20px 18px;
    width: 53%;
    height: 60px;
    z-index: 5;
`;