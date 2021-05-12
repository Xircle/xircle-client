import { useState } from 'react';
import ChattingItem from './ChattingItem';
import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';

interface User {
    profileImgSrc: string
    adj: string
    job: string
    displayName: string
    date: string
    recentTalk: string
    read: boolean,
}

interface Props {
    users: User[]
    type: string
}

export default function ChattingMain ({ type, users }: Props) {
    if(type === '단체') return (
        <XircleChatContainer>
            <p className="icon">👨🏻‍💻</p>
            <p className="head">써클 기능 개발중!</p>
            <p className="desc">써클은 미팅/소모임/스터디/소개팅등 <br/> 네트워킹을 더 쉽게 해주는 기능이에요. <br/> 곧 만나요</p>
        </XircleChatContainer>
    )
    else return (
        <ChattingList>
            {users.map(user => (
                <Link 
                    to={{
                        pathname: `chat/${user.displayName}`,
                        state: {
                            image: `${user.profileImgSrc}`
                        }
                    }}
                    key={user.displayName} 
                >
                    <ChattingItem 
                        key={user.displayName}
                        profileImgSrc={user.profileImgSrc}
                        adj={user.adj}
                        job={user.job}
                        displayName={user.displayName}
                        date={user.date}
                        recentTalk={user.recentTalk}
                        read={user.read}
                    />
                </Link>
            ))}
        </ChattingList>
    );
}

const ChattingList = styled.ul`
  margin: 0;
  padding: 0 10px;
  list-style: none;
`;

const XircleChatContainer = styled.section`
    display: flex;
    flex-direction: column;
    height: 50vh;
    justify-content: center;
    align-items: center;
    padding: 0 50px;
    line-height: 28px;
    color: #A7B0C0;
    .head {
        color: #8C94A4;
        font-weight: 700;
        font-size: 28px;
        margin-bottom: 10px;
    }
    .icon {
        font-size: 100px;
    }
`;