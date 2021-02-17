import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import ValidationButton from '../components/UI/validationButton';

const Login = () => {
    return (
        <div className="w-full">
            <Layout headerNone footerNone={true}>
                
                {/* main */}
                <section style={{height: '20%'}} className="my-5 flex flex-row items-center ">
                    <img 
                        style={{height: '70px', width: '70px'}}
                        src="https://2donny.github.io/ykring/yk-logo.png"
                        alt="yk-logo"
                        className="rounded-2xl mx-auto"
                    />
                </section>

                <section style={{height: '50%'}} className="px-10 mb-5">
                    <p style={{color: '#C5C1C1'}} className=" text-sm text-center">친구들과 엑티비티를 즐기려면 로그인 해주세요.</p>
                    <ValidationButton />
                    <Link to="/person">
                        <button onClick={() => console.log('clicked')} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-10 bg-black text-white hover:text-black hover:bg-white focus:outline-none">메일로 인증하기</button>
                    </Link>
                </section>

                <section style={{height: '20%'}} className=" text-center">
                    
                </section>

                <section style={{height: '10%'}}>
                    
                </section>
                
            </Layout>
        </div>
    )
}

export default Login;