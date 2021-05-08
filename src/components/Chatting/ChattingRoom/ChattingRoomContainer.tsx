import { useState, useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import Layout from '../../layout';
import ChattingRoomHeader from './ChattingRoomHeader';
import ChattingRoomMain from './ChattingRoomMain';
import ChattingRoomInput from './ChattingRoomInput';
import io from 'socket.io-client';

const socket = io();

export default function ChattingRoomContainer () {
    const [inputMsg, setInputMsg] = useState<string>('');


    useEffect(() => {

    }, []);
    const onChangeMsg = (value: string) => {
        setInputMsg(value);
    };
    
    const onSubmitMsg = () => {
        // io.emit('message', inputMsg);
        console.log(inputMsg);
        setInputMsg('');
    }

    const location = useLocation<{ image: string }>();
    const match = useRouteMatch<{ displayName: string}>();

    return (
        <Layout>
            <ChattingRoomHeader 
                profileImgSrc={location.state.image}
                displayName={match.params.displayName}
            />
            <ChattingRoomMain />
            <ChattingRoomInput 
                value={inputMsg}
                onSubmit={onSubmitMsg}
                onChange={onChangeMsg}
            />
        </Layout>
    );
}
