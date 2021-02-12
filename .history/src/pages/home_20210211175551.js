import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="w-full">
            <div 
                style={{ minWidth: "320px", maxWidth: "414px", border: '1px solid #ccc' }}
                className="flex flex-col mx-auto h-screen relative"
            >
                {/* Navigation */}
                <nav className="flex flex-row justify-between px-3 py-5">
                    <h1 className="text-xl font-bold">연고링 로고</h1>
                    <div className="flex flex-row">
                        <Link to="/">
                            <h1 className="mx-2 font-bold">돌아가기</h1>
                        </Link>
                        <h1 className="mx-2 cursor-pointer font-bold hover:text-red-600 hover:font-bold">신고하기</h1>
                    </div>
                </nav>

                {/* main */}
                <main className="px-3">

                </main>
                
                {/* footer */}
                
            </div>
        </div>
    )
}

export default Home;