import React from 'react';

const Home = () => {
    return (
        <div className="w-full">
            <div 
                style={{ minWidth: "375px", maxWidth: "414px", border: '1px solid #ccc' }}
                className="flex flex-col justify-center items-center h-screen"
            >
                hello <br /> 
                adsad <br />
                asdsad <br/>
                <nav
                    style={{  }}
                    className="flex flex-row justify-evenly relative bottom-0"
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
                </nav>
            </div>
        </div>
    )
}

export default Home;