import { ChangeEvent, useState, useCallback } from 'react'
import ChattingHeader from './ChattingHeader/ChattingHeader';
import ChattingMain from './ChattingMain/ChattingMain';
import io from 'socket.io-client';

const Users = [
    {
        profileImgSrc: "https://api.xircle.org/7r1618730785216.png",
        adj: '배고픈',
        job: '개발자',
        displayName: '@2donny',
        date: '8:20 오후',
        recentTalk: '좋은 날이예요~',
        read: false,
    },
    {
        profileImgSrc: "https://api.xircle.org/7r1618208238025.jpg",
        adj: '운동을 좋아하는',
        job: '대학생',
        displayName: '@koguma',
        date: '7:20 오후',
        recentTalk: '데이트.. 할래요?',
        read: true
    },
    {
        profileImgSrc: "https://api.xircle.org/7r1616844790707.jpg",
        adj: '운동을 좋아하는',
        job: '대학생',
        displayName: '@kogquma',
        date: '7:20 오후',
        recentTalk: '데이트.. 할래요?',
        read: false
    },
    {
        profileImgSrc: "https://api.xircle.org/7r1616822911133.jpeg",
        adj: '운동을 좋아하는',
        job: '대학생',
        displayName: '@asdqxcsada',
        date: '7:20 오후',
        recentTalk: '데이트.. 할래요?',
        read: false
    },
    {
        profileImgSrc: "https://api.xircle.org/7r1620316808246.jpg",
        adj: '운동을 좋아하는',
        job: '대학생',
        displayName: '@verylonglongnamesdsd',
        date: '7:20 오후',
        recentTalk: '데이트.. 할래요?',
        read: true
    }
]

const socket = io();

export default function ChattingContainer() {
    const [users, setUsers] = useState(Users);
    const [type, setType] = useState('1:1');
    const [keyStroke, setKeyStroke] = useState<string>('');

    const onChangeKeyStroke = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyStroke(e.target.value);
    }, []) 
    
    const onChangeType = useCallback((type: string) => {
        setType(type);
    }, []);

    const filteredUser = users.filter(user => user.displayName.includes(keyStroke))

    console.log(keyStroke);
    return (
        <>
            <ChattingHeader 
                type={type}
                onChangeType={onChangeType}
                keyStroke={keyStroke}
                onChange={onChangeKeyStroke}
            />
            <ChattingMain type={type} users={filteredUser} />
        </>
    )
}
