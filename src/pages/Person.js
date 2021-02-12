import React from 'react';
import { Link } from 'react-router-dom';
import Footer_nav from '../components/footer_nav';
import Layout from '../components/layout';
import Banner from '../components/banner';
import Community from '../containers/community';

const Person = () => {
    return (
        <div className="max-h-screen overflow-hidden">
            <Layout>
                {/* Navigation */}
                <nav className="flex flex-row justify-between px-3 py-5">
                    <img
                        src="/yk-logo.png"
                        className=" rounded-2xl"
                        width={50}
                        height={50}
                    />
                    <div className="flex flex-row items-center">
                        <Link to="/">
                        <h1 className="mx-2 font-bold hover:text-blue-400">돌아가기</h1>
                        </Link>
                        <h1 className="mx-2 cursor-pointer font-bold hover:text-red-600 hover:font-bold">신고하기</h1>
                    </div>
                </nav>

                {/* Banner */}
                <Banner />

                {/* main */}
                <section className="px-3 my-2">

                    {/* Button Nav */}
                    <div className="my-3">
                        <button id="univ" className="px-3 py-2 border-2 rounded-xl mx-1 text-xs focus:outline-none hover:bg-blue-400 hover:text-white">학교</button>
                        <button id="gender" className="px-3 py-2 border-2 rounded-xl mx-1 text-xs focus:outline-none hover:bg-blue-400 hover:text-white">성별</button>
                        <button id="age" className="px-3 py-2 border-2 rounded-xl mx-1 text-xs focus:outline-none hover:bg-blue-400 hover:text-white">나이</button>
                        <button id="interest" className="px-3 py-2 border-2 rounded-xl mx-1 text-xs focus:outline-none hover:bg-blue-400 hover:text-white">관심사</button>

                        <button id="submit" className="px-3 py-2 border-2 rounded-xl mx-1 text-xs bg-black text-white focus:outline-none">친구찾기</button>
                    </div>

                    {/* 커뮤니티 컨테이너 */}
                    <Community />
                </section>
                
                {/* footer NavBar */}
                <Footer_nav/>
            </Layout>
        </div>
    )
}

export default Person;