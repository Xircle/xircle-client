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
                    <h1>연고링 로고</h1>
                    <div className="flex flex-row">
                        <Link to="/">
                            <h1>돌아가기</h1>
                        </Link>
                        <h1>신고하기</h1>
                    </div>
                </nav>

                {/* main */}
                <main className="px-3">

                </main>
                
                {/* footer */}
                <footer
                    style={{ borderTop: '1px solid #ccc' }}
                    className="flex flex-row w-full justify-evenly absolute bottom-0 py-5 bg-gray-100"
                >
                    <img 
                        src="heart-outline.svg"
                        width={35}
                        height={35}
                    />
                    <img 
                        src="heart-outline.svg"
                        width={35}
                        height={35}
                    />
                    <img 
                        src="heart-outline.svg"
                        width={35}
                        height={35}
                    />
                    <img 
                        src="heart-outline.svg"
                        width={35}
                        height={35}
                    />
                    <img 
                        src="profile.svg"
                        width={35}
                        height={35}
                    />
                </footer>
            </div>
        </div>
    )
}

export default Home;