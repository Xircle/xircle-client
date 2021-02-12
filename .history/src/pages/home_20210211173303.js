import React from 'react';

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
                    <h1>신고하기</h1>
                </nav>

                {/* main */}
                <main>

                </main>
                
                {/* footer */}
                <footer
                    style={{ borderTop: '1px solid #ccc' }}
                    className="flex flex-row w-full justify-evenly absolute bottom-0 py-5"
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
                        src="heart-outline.svg"
                        width={35}
                        height={35}
                    />
                </footer>
            </div>
        </div>
    )
}

export default Home;