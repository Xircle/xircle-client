import React, { useState } from 'react';
import Layout from '../components/layout';
import ValidationButton from '../components/UI/validationButton';

const Login = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <Layout headerNone footerNone={true}>
                <div style={{paddingBottom: '200px'}} className="h-screen flex flex-col justify-center items-center">
                    <section  className="my-10 flex flex-row items-center ">
                        <img 
                            style={{height: '70px', width: '70px'}}
                            src="https://2donny.github.io/yk-logo.png"
                            alt="yk-logo"
                            className="rounded-2xl mx-auto"
                        />
                    </section>

                    <section  className="px-10 mb-5">
                        <p style={{color: '#C5C1C1'}} className=" text-sm text-center">친구들과 엑티비티를 즐기려면 로그인 해주세요.</p>
                        <ValidationButton history={history} />
                    </section>
                </div>
            </Layout>
        </div>
    )
}

export default Login;