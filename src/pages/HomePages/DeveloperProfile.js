import React, { useState } from 'react';
import Layout from '../../components/layout';
import Modal from '../../components/UI/modal';
import interest_1 from '../../images/interest_1.svg';
import interest_2 from '../../images/interest_2.svg';
import interest_3 from '../../images/interest_3.svg';
import interest_4 from '../../images/interest_4.svg';
import interest_5 from '../../images/interest_5.svg';
import interest_6 from '../../images/interest_6.svg';
import interest_7 from '../../images/interest_7.svg';
import interest_8 from '../../images/interest_8.svg';
import interest_9 from '../../images/interest_9.svg';
import interest_10 from '../../images/interest_10.svg';
import interest_11 from '../../images/interest_11.svg';
import interest_12 from '../../images/interest_12.svg';

const selectedTab = {
    backgroundColor: 'black',
    color: 'white',
};
const notSelectedTab = {
    backgroundColor: 'white',
    color: "#8D8D8D"
}

const DeveloperProfile = ({ history }) => {
    const [pageNum, setPageNum] = useState(1);
    const [anyThingClicked, setAnyThingClicked] = useState(false);

    let contents = null;
    if(pageNum === 1) {
        contents = (
            <>
                {/* Profile Container */}
                <section style={{height: '100%'}} className="px-3 py-3 mx-3">
                {/* 프로필 사진 */}
                    <div className="relative">
                        <img 
                            style={{width: 228, height: 228, borderRadius: 114, backgroundColor: 'gray', margin: '0 auto', objectFit: 'cover'}}
                            src='/yk-logo.png'
                            alt="yklogo"
                        />
                    </div>

                    {/* 닉네임, 개인정보 */}
                    <div className="mt-3">
                        <div className="text-center">
                            <div className="flex flex-row items-center justify-center">
                                <a href="http://pf.kakao.com/_kDxhtK" style={{color: "#8D8D8D", fontSize: 11}} className="cursor-pointer">문의하기</a>
                                <img 
                                    src="/right_arrow.svg"
                                    alt="right_arrow"
                                    style={{width: 10, height: 10, marginLeft: 3}}
                                />
                            </div>
                            <h3 style={{fontSize: 20, fontWeight: '600', margin: '5px 0'}}>패션러버 스타트업CEO <span style={{fontSize: 18, fontWeight: 'lighter'}}>@ykring</span></h3>
                        </div>
                        <div className="flex flex-row justify-center">
                            <div style={{height: 25, backgroundColor: '#CCF6FF', margin: '0 2px 0 0'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'bolder', padding: '7px'}}>남</p></div>
                            <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'bolder', padding: '7px'}}>고려대 / 연세대</p></div>
                            <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'bolder', padding: '7px'}}>javascript 거주</p></div>
                            <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'bolder', padding: '7px'}}>20중반</p></div>
                        </div>
                    </div>

                    {/* 직장, 한줄소개 */}
                    <ul className="mt-14">
                        <li className="flex flex-row text-sm mb-2">
                            <img 
                                style={{width: 15, height: 15}}
                                src="/company.svg"
                                alt="company"
                            />
                            <p className="font-extrabold mx-2 my-0">연고링</p><span>운영중</span>
                        </li>
                        <li className="flex flex-row text-sm mb-2">
                            <p className="">XIRCLE은  잘 맞는 사람과 대화하며 <span style={{fontSize: 16}}>🚀</span> <br/> 네트워킹 할 수 있는 대학기반 랜선친구 서비스입니다 <br/> 서연고서성한카포대상 <br/> ❤️ 에어팟 사전신청이벤트중 (-3/21) ❤️<br/></p>
                        </li>
                        <li className="flex flex-row items-center my-3 ">
                            <img 
                                style={{width: 11, height: 11}}
                                src="/activity.svg"
                                alt="activity"
                            />
                            <p className="font-sans" style={{color: "#8D8D8D", fontSize: 13, marginLeft: 5}}>XIRCLE 창업멤버</p>
                        </li>
                    </ul>
                </section>

                {/* Album Container */}
                <section style={{minHeight: '300px', height: '100%', padding: '20px 0', margin: '10px 0', backgroundColor: "#F7F7FA"}}>
                    <section className="relative">
                        <div style={{position: 'absolute', top: -37, right: 30, borderRadius: 12.5}}>
                            <button
                                onClick={() => history.push('/event')} 
                                className="flex flex-row items-center px-5 py-3 text-white rounded-3xl bg-black focus:outline-none"
                            > 
                                <div style={{width: 4, height: 4, backgroundColor: 'red', borderRadius: 4}}></div>
                                <p className="font-sans" style={{fontSize: 10, fontWeight: 300, margin: '0 0 0 5px'}}>에어팟PRO 이벤트 참여하기</p>
                                <img
                                    style={{width: 42, height: 42, position: 'absolute', right: -10, top: -20}}
                                    src="airpod_tilt.svg"
                                    alt="airpod"
                                />
                            </button>
                        </div>
                        <div style={{height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyItems: 'center'}}>
                            <div 
                                style={{
                                    margin: 3, width: 100, height: 100,  backgroundColor: "#FFEAEA", borderRadius: 40, borderRadius: '100%', 
                                    backgroundSize: 'cover', backgroundImage: `url(${interest_7})`
                                }} 
                                className="cursor-pointer"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative text-white w-full h-full flex justify-center items-center">
                                    <p className="mb-1 relative">@스타트업</p>
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15}}>게시물 0개</button>
                                </div>
                            </div>
                            <div 
                                style={{
                                    margin: 3, width: 100, height: 100,  backgroundColor: "#FFEAEA", borderRadius: 40, borderRadius: '100%', 
                                    backgroundSize: 'cover', backgroundImage: `url(${interest_3})`
                                }} 
                                className="cursor-pointer"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative text-white w-full h-full flex justify-center items-center">
                                    <p className="text-white w-full h-full inline-flex justify-center items-center">@맛집</p>
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15}}>게시물 0개</button>
                                </div>
                            </div>
                            <div 
                                style={{
                                    margin: 3, width: 100, height: 100,  borderRadius: 40, borderRadius: '100%', 
                                    backgroundSize: 'cover', backgroundImage: `url(${interest_10})`
                                }} 
                                className="cursor-pointer"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative text-white w-full h-full flex justify-center items-center">
                                    <p className="text-white w-full h-full inline-flex justify-center items-center">@애견인</p>
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15}}>게시물 0개</button>
                                </div>
                            </div>
                            <div
                                style={{
                                    margin: 3, width: 100, height: 100, textAlign: 'center',  backgroundColor: "#C4C4C4", borderRadius: '100%', 
                                    backgroundSize: 'cover', backgroundImage: `url(${interest_4})`
                                }} 
                                className="cursor-pointer"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative text-white w-full h-full flex justify-center items-center">
                                    <p className="text-white w-full h-full inline-flex justify-center items-center">@요리</p>
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15}}>게시물 0개</button>
                                </div>
                            </div>
                            <div
                                style={{
                                    margin: 3, width: 100, height: 100, textAlign: 'center',  backgroundColor: "#C4C4C4", borderRadius: '100%', 
                                    backgroundSize: 'cover', backgroundImage: `url(${interest_5})`
                                }} 
                                className="cursor-pointer"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative text-white w-full h-full flex justify-center items-center">
                                    <p className="text-white w-full h-full inline-flex justify-center items-center">@코딩</p>
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15}}>게시물 0개</button>
                                </div>
                            </div>
                            <div 
                                style={{
                                    margin: 3, width: 100, height: 100,  backgroundColor: "#FFEAEA", borderRadius: 40,borderRadius: '100%', 
                                    backgroundSize: 'cover', backgroundImage: `url(${interest_11})`
                                }} 
                                className="cursor-pointer"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative text-white w-full h-full flex justify-center items-center">
                                    <p className="text-white w-full h-full inline-flex justify-center items-center">@취업준비</p>
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15}}>게시물 0개</button>
                                </div>
                            </div>
                            <div 
                                style={{
                                    margin: 3, width: 100, height: 100,  borderRadius: 40, borderRadius: '100%', 
                                    backgroundSize: 'cover', backgroundImage: `url(${interest_2})`
                                }} 
                                className="cursor-pointer"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative text-white w-full h-full flex justify-center items-center">
                                    <p className="text-white w-full h-full inline-flex justify-center items-center">@로스쿨</p>
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15}}>게시물 0개</button>
                                </div>
                            </div>
                            <div 
                                style={{
                                    margin: 3, width: 100, height: 100,  borderRadius: 40,borderRadius: '100%', 
                                    backgroundSize: 'cover', backgroundImage: `url(${interest_1})`
                                }} 
                                className="cursor-pointer"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative text-white w-full h-full flex justify-center items-center">
                                    <p className="text-white w-full h-full inline-flex justify-center items-center">@대학원</p>
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15}}>게시물 0개</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </>
        )
    }else {
        contents = (
            <div style={{padding: 10}} className="h-screen">
                <p>서비스 준비중입니다.</p>
            </div>
        )
    }
    return (
        <Layout footerNone invitement>
            <header className="mt-5 mb-10">
                <section className="flex flex-row items-center justify-around mt-1">
                    <div style={{width: 71}}>
                        <img
                            onClick={() => history.goBack()} 
                            style={{width: '20px', height: '20px', margin: '0 auto', cursor: 'pointer'}}
                            src="/arrow-back-outline.svg"
                            alt="back"
                        />
                    </div>
                    <button 
                        style={pageNum === 1 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(1)}
                    > @ykring
                    </button>
                    <button 
                        style={pageNum === 2 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(2)}
                    >
                        방명록
                    </button>
                </section>
            </header>

            <Modal show={anyThingClicked} clicked={() => setAnyThingClicked(false)}>
                <div className="mb-5">
                    <h1 className="text-xl mb-5">개발중입니다.</h1>
                </div>
            </Modal>

            {contents}
        </Layout>
    )
}

export default DeveloperProfile;