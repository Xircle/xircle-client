import * as React from 'react';
import styled from '@emotion/styled';

export interface IChattingRoomMainProps {
}

export default function ChattingRoomMain (props: IChattingRoomMainProps) {
    return (
        <Container>
            <Date>2021년 5월 8일</Date>
            <TalkContainer>
                <FriendTalk>
                    Hey, What's up?
                </FriendTalk>
                <FriendTalk>
                    안녕하세요. 질문이 있어서 문의 드려요.
                </FriendTalk>
                <MyTalk>
                    프로필 보고 관심이 생겨서 연락드려으요!루피 좋아하시는거 같던데 루피인서성은 알고 계시나요?
                </MyTalk>
            </TalkContainer>
        </Container>
    );
}

const Container = styled.div`
    padding: 30px 20px 0;
`;
const Date = styled.p`
    color: #A7B0C0;
    font-size: 12px;
    text-align: center;
`;
const TalkContainer = styled.div`
    margin: 10px 0;
    overflow-y: auto;
`;
const FriendTalk = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 16px 22px;
    float: left;
    background-color: #F8FAFD;
    border-radius: 24px 27px 27px 0px;
    margin: 5px 0;
    max-width: 260px;
`;

const MyTalk = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: right;
    max-width: 260px;
    padding: 16px 22px 16px 20px;
    background: #007FFF;
    border-radius: 24px 0 27px 27px;
    color: #fff;
    margin: 5px 0;
`;