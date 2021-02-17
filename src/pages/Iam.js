import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import Select from 'react-select';
import { 
    UniversityOptions, 
    UnivgroupedOptions,
} from '../model/person';

const Login = ({ history }) => {
    const UnivHandler = useCallback((selectedOption) => {
        // setUniv(selectedOption.label);
    }, []);
    return (
        <div className="w-full">
            <Layout headerNone footerNone={true}>
                
                {/* main */}
                <section style={{height: '7%'}} className="flex flex-row items-center justify-between border-b-2">
                    <img
                        style={{marginLeft: '10px', cursor: 'pointer'}}
                        onClick={() => history.goBack()}
                        src="https://2donny.github.io/ykring/arrow-back-outline.svg"
                        width={30}
                        height={30}
                        alt="back"
                    />
                    <p style={{marginRight: '40px'}} className="w-full text-lg text-center">자기소개</p>
                </section>

                <section style={{height: '35%'}} className="flex flex-row items-center px-5">
                    <p className="text-center text-sm">연고링에는 현재 966의 남성분, 719의 여성분들이 이용중입니다. 베타테스트 단계로 서울대 고려대 연세대 서강대 한양대 성균관대 학생들로만 진행중입니다.</p>
                </section>

                <section style={{height: '20%'}} className="text-center">
                    <div className="flex flex-row items-center mx-3">
                        <p>나는</p>
                        <div style={{width: '60%', margin: '0 10px'}}>
                            <Select
                                defaultValue={UniversityOptions[1]}
                                options={UnivgroupedOptions}
                                onChange={UnivHandler}
                            />
                        </div>
                        <p>학생입니다.</p>
                    </div>

                    <Link to="/person">
                        <div style={{width: '80%', margin: '20px auto'}}>
                            <button onClick={() => console.log('clicked')} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-10 bg-black text-white hover:text-black hover:bg-white focus:outline-none">
                                다음
                            </button>
                        </div>
                    </Link>
                </section>

                <section style={{height: '10%'}}>
                    
                </section>
                
            </Layout>
        </div>
    )
}

export default Login;