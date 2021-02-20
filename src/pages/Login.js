import React, { useState } from 'react';
import Layout from '../components/layout';
import ValidationButton from '../components/UI/validationButton';

const Login = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="w-full overflow-y-hidden">
            <Layout headerNone footerNone={true}>
                
                {/* main */}
                <section style={{height: '20%'}} className="my-5 flex flex-row items-center ">
                    <img 
                        style={{height: '70px', width: '70px'}}
                        src="https://2donny.github.io/yk-logo.png"
                        alt="yk-logo"
                        className="rounded-2xl mx-auto"
                    />
                </section>

                <section style={{height: '50%'}} className="px-10 mb-5">
                    <p style={{color: '#C5C1C1'}} className=" text-sm text-center">친구들과 엑티비티를 즐기려면 로그인 해주세요.</p>
                    <ValidationButton history={history} />
                </section>

                
            </Layout>
        </div>
    )
}

export default Login;