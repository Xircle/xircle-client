import React from 'react';

const Home = () => {
    return (
        <div className="w-full px-5">
            hello <br /> 
            adsad <br />
            asdsad <br/>

            <div 
                style={{ minWidth: "375px", maxWidth: "414px", border: '1px solid #ccc' }}
                className="flex flex-col items-center"
            >
                <nav
                    style={{  }}
                    className="flex flex-row justify-evenly absolute bottom-0"
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