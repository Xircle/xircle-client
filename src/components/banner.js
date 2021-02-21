import React from 'react';

const Banner = () => {
    return (
        <section >
            <div style={{backgroundColor: "#F3F3F3", height: "60px"}} className="flex flex-row items-center rounded-xl justify-evenly w-full">
                <div>
                    <h1 className="text-base font-bold m-0 py-1">[연고링 이벤트] 놓치면 후회합니다.</h1>
                    <p className="text-sm text-gray-400">팔로우하고 친구추가하면~</p>
                </div>
                <img 
                    src="/bannerImg.png"
                    alt="banner"
                    width={80}
                    height={80}
                />
            </div>
        </section>
    )
}

export default Banner;