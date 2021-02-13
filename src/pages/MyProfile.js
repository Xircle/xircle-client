import React from 'react';
import { Link } from 'react-router-dom';
import Footer_nav from '../components/footer_nav';
import Layout from '../components/layout';
import Banner from '../components/banner';

const MyProfile = () => {
    return (
        <div className="w-full">
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

                <Banner />
                {/* main */}
                <section className="px-3">

                </section>
                
                {/* footer */}
                <Footer_nav/>
            </Layout>
        </div>
    )
}

export default MyProfile;