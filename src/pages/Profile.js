import React from 'react';
import { Link } from 'react-router-dom';
import Footer_nav from '../components/footer_nav';
import Layout from '../components/layout';
import { personCommunity } from '../model/person';

const Profile = ({ match }) => {
    const id = match.params.id;
    const __UserArr = personCommunity.filter(user => {
        return user.id === Number(id)
    });
    const __User = __UserArr[0];

    return (
        <div className="w-full">
            <Layout headerNone>
                {/* Navigation */}
                <nav className="flex flex-row px-3 py-5"> 
                    <Link to="/person">
                        <img 
                            src="/arrow-back-outline.svg"
                            className="rounded-2xl"
                            width={25}
                            height={25}
                        />
                    </Link>
                    <h1 
                        style={{marginRight: '27px'}}
                        className="w-full text-center text-md"
                    >
                        {__User.displayName}님의 프로필
                    </h1>
                </nav>

                <div className="border-b-2"></div>

                {/* main */}
                <section className="px-3 my-5 relative">
                    <Link to="/secure-setting">
                        <button 
                            style={{position: 'absolute', top: '151px', left: '140px'}}
                            className="z-50 border-2 text-sm rounded-full px-5 py-3  bg-white hover:bg-gray-300 focus:outline-none"
                        >
                            안전 설정하고 <br /> 선명하게 보기
                        </button>
                    </Link>
                    <img
                        id="profile" 
                        src={`${__User.profileImg}`}
                        alt="profile"
                        width="480px"
                        height="480px"
                        className="rounded-3xl mx-auto"
                    >
                    </img>
                </section>
                
                <section>
                    <Link to="/person">
                        <button className="border-2 rounded-full px-5 py-3 absolute bottom-28 left-3 hover:text-white hover:bg-black focus:outline-none">다음에</button>
                    </Link>
                    <button onClick={() => alert('친구를 신청했습니다!')} className="border-2 rounded-full px-5 py-3 absolute bottom-28 right-3 hover:text-white hover:bg-black focus:outline-none">친구 신청</button>
                </section>
            </Layout>
        </div>
    )
}

export default Profile;