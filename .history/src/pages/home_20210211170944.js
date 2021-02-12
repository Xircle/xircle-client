import React from 'react';

const Home = () => {
    return (
        <React.Fragment className="w-full flex f">
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
        </React.Fragment>
    )
}

export default Home;