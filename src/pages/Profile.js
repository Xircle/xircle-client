import React from 'react';
import { Link } from 'react-router-dom';
import Footer_nav from '../components/footer_nav';
import Layout from '../components/layout';
import { personCommunity } from '../model/person';
import Card from '../components/card';

const Profile = ({ match }) => {
    const id = match.params.id;
    const __UserArr = personCommunity.filter(user => {
        return user.id === Number(id)
    });
    const __User = __UserArr[0];

    return (
        <div className="w-full">
            <Layout>
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
                        프로필
                    </h1>
                </nav>

                <div className="border-b-2"></div>

                {/* main */}
                <section className="px-3 my-5">
                    <img 
                        src={`${__User.profileImg}`}
                        alt="profile"
                        className="rounded-3xl mx-auto"
                    />
                </section>
                
                <section>
                <button onClick={() => console.log('clicked')} className="font-sans w-full border-2 rounded-3xl px-5 py-3 absolute bottom-28 hover:text-white hover:bg-black focus:outline-none">대화 걸기</button>
                </section>
                {/* footer */}
                <Footer_nav />
            </Layout>
        </div>
    )
}

export default Profile;