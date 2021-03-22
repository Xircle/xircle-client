import React from 'react';
import { useSelector } from 'react-redux';

const ArticleBanner = () => {

    const displayNameInRedux = useSelector(store => store.user.displayNameInUser);

    return (
        <section style={{backgroundColor: "#F3F3F3", borderRadius: 7, padding: '10px 3px 0px 15px'}}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center">
                    <p style={{color: "#525151", textAlign: 'left', margin: 0, fontWeight: 700}}>나의 활동 기록하기</p>
                    <p style={{color: "#818080", margin: '5px 0 10px', fontWeight: 300, fontSize: 11}}>{displayNameInRedux}님의 이야기를 적어보세요.</p>
                </div>
                <img 
                    src="/profile/articleBanner.svg"
                    alt="banner"
                />
            </div>
        </section>
    )
}
export default ArticleBanner;