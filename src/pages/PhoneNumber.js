import React, {useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/layout';
import TextFieldUI from '../components/UI/textFieldUI';
import * as actions from '../store/actions/index';

const PhoneNumber = ({ history }) => {
    const [phoneNum, setPhoneNum] = useState('');
    const dispatch = useDispatch();

    const phoneNumberChangeHandler = useCallback((e) => {
        console.log(e.target.value);
        setPhoneNum(e.target.value);
    }, []);

    const phoneNumerBtnHandler = useCallback((e) => {
        e.preventDefault();
        if(phoneNum.length !== 11)
            return alert('전화번호를 올바르게 입력해주세요.');
        
        dispatch(actions.addPhoneNumber(phoneNum));
        history.push('/login');
    }, [phoneNum]);
    
    return (
        <Layout headerNone footerNone={true}>
            <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                <img
                    onClick={() => history.goBack()} 
                    style={{width: '25px', height: '25px', cursor: 'pointer'}}
                    src="/arrow-back-outline.svg"
                    alt="back"
                />
            </nav>
            <section className="mb-10">
                <section style={{padding: '10px 30px'}} className="text-left mt-5">
                    <h1 style={{margin: '10px 0', fontSize: '24px'}} className="text-2xl text-left">전화번호</h1>
                    <p style={{color: "#C5C1C1"}}>XIRCLE 관련 중요 공지사항을 보낼때 이외에는 <br/> 절대 사용하지 않습니다.</p>
                </section>
                <section className="px-10 mt-32">
                    <TextFieldUI 
                        width="100%"
                        submitted={(e) => phoneNumerBtnHandler(e)} 
                        changeHandler={(e) => phoneNumberChangeHandler(e)}
                        label="전화번호" 
                        placeholder="-없이 입력해주세요" 
                    />
                </section>
                <div className="flex flex-row justify-center">
                    <button onClick={(e) => phoneNumerBtnHandler(e)} className="mt-20 w-3/4 border-2 rounded-xl px-5 py-3 bg-gray-400 text-white focus:bg-black focus:outline-none">다음</button>
                </div>
            </section>
        </Layout>
    )
}

export default PhoneNumber;