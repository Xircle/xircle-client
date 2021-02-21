import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

const Start = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, []);
    return (
        <div className="w-full">
            <Layout headerNone footerNone={true}>
                
                {/* main */}
                {isLoading ? (
                    <div className="w-full h-screen flex flex-col justify-center items-center">
                        <img 
                            style={{height: '150px', width: '150px', marginBottom: '10px'}}
                            src="https://2donny.github.io/yk-logo.png"
                            alt="yk-logo"
                            className="rounded-2xl mx-auto"
                        />
                        <p>로딩중입니다..</p>
                    </div>
                ) : (
                    <div className="h-screen pb-20 flex flex-col items-center justify-center overflow-hidden">
                        <section className="mt-5 flex flex-row items-center ">
                            <img 
                                style={{height: '70px', width: '70px'}}
                                src="https://2donny.github.io/yk-logo.png"
                                alt="yk-logo"
                                className="rounded-2xl mx-auto"
                            />
                        </section>

                        <section className="flex flex-row justify-center px-16 my-5">
                            <div style={{backgroundColor: '#ccc', height: '200px', width: '250px'}}></div>
                        </section>

                        <section className="text-center px-10">
                            <h1 style={{wordBreak: "keep-all"}} className="mb-3 font-light text-4xl">대학생들의 네트워킹 공간</h1>
                            <p>연고링은 대학생들의 네트워킹 공간이예요. <br /> 새로운 대학생 친구들을 사귀어봐요!</p>
                            <p></p>
                        </section>

                        <section style={{height: '10%', padding: '0 10px'}}>
                            <Link to="/login">
                                <button onClick={() => console.log('clicked')} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-5 bg-black text-white hover:text-black hover:bg-white focus:outline-none">'나'에 대해서 질문하고 시작하기</button>
                            </Link>
                        </section>
                    </div>
                )}
                
            </Layout>
        </div>
    )
}

export default Start;