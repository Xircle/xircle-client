import React from 'react';

const Banner = () => {
    return (
        <section className="px-3 rounded-3xl">
            <div className="flex flex-row items-center justify-evenly w-full h-16 bg-gray-100">
                <div>
                    <h1 className="text-sm font-bold">[연고링 사용법] 알려드려요.</h1>
                    <p className="text-xs text-gray-400">알아보기 START!</p>
                </div>
                <img 
                    src="https://2donny.github.io/ykring/logo192.png"
                    width={50}
                    height={50}
                />
                </div>
        </section>
    )
}

export default Banner;