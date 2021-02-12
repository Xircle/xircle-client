import React from 'react';
import { Link } from 'react-router-dom';
import Footer_nav from '../Components/Footer_nav/footer_nav';
import Layout from '../Components/layout';

const Globe = () => {
    return (
        <div className="w-full">
            <Layout>
                {/* Navigation */}
                <nav className="flex flex-row justify-between px-3 py-5">
                    <img
                        src="/yk-logo.png"
                    />
                    <div className="flex flex-row">
                        <Link to="/">
                            <h1 className="mx-2 font-bold">돌아가기</h1>
                        </Link>
                        <h1 className="mx-2 cursor-pointer font-bold hover:text-red-600 hover:font-bold">신고하기</h1>
                    </div>
                </nav>

                {/* main */}
                <section className="px-3">

                </section>
                
                {/* footer */}
                <Footer_nav/>
            </Layout>
        </div>
    )
}

export default Globe;