import React, {useCallback, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';
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
import Modal from '../../components/UI/modal';

const selectedTab = {
    backgroundColor: 'black',
    color: 'white',
};
const notSelectedTab = {
    backgroundColor: 'white',
    color: "#8D8D8D"
}
const MyProfile = ({ history }) => {
    const [pageNum, setPageNum] = useState(2);
    const [myProfileImgSrc, setMyProfileImgSrc] = useState('/UserImage/User4.png');
    const [anyThingClicked, setAnyThingClicked] = useState(false);
    
    const { isPublic, isGraduate, gender, age, job, adj, location, articleImgSrc, displayName, introText, profileImgSrc, resume, workPlace } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const updateProfile = useCallback((event) => {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = event => { 
            dispatch(actions.updateProfileImgToServer(event.target.result))
        };
        const files = event.target.files;
        const __file = files[0];

        reader.readAsDataURL(__file);
    }, []);

    const profileImgChangeHandler = useCallback((event) => {
        const files = event.target.files;
        const __file = files[0];

        const fileReader = new FileReader();
        fileReader.readAsDataURL(__file);
        fileReader.onload = e => { // async하게 다 읽었악면 실행 
            setMyProfileImgSrc(e.target.result);
        };

        // const formData = new FormData();
        // formData.append("img", __file);
        // setProfileImgSrcFormData(formData);
    }, []);

    let contents = null;
    if(pageNum === 1) {
        contents = (
            <div style={{paddingTop: 10}} className="h-screen relative">
                <section>
                    <section onClick={() => setAnyThingClicked(true)} style={{transform: 'translate(-50%, 0)'}} className="absolute left-1/2 top-1/4">
                        <img 
                            style={{width: 122, height: 122, margin: '0 auto'}}
                            src="add-circle-outline.svg"
                            alt="add"
                        />
                        <p style={{fontSize: 10, textAlign: 'center', whiteSpace: 'pre'}}>[개발중] 3월 12일부터 게시글을 올릴 수 있습니다. <br/> 일기장처럼 사용가능해요! <br/> 게시글 event도 있을 예정입니당 ^^  </p>
                    </section>
                    <div style={{height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyItems: 'center'}}>
                        <div 
                            style={{
                                margin: 5, width: 90, height: 90,  backgroundColor: "#FFEAEA", borderRadius: 40, borderRadius: '100%', 
                                backgroundSize: 'cover', backgroundImage: `url(${interest_7})`
                            }} 
                            className="cursor-pointer"
                            onClick={() => setAnyThingClicked(true)}
                        >
                        </div>
                    </div>
                </section>
                
            </div>
        )
    } else if(pageNum === 2) {
        contents = (
            <>
                {/* Profile Container */}
                <section style={{height: '100%'}} className="px-3 py-3 mx-3">
                {/* 프로필 사진 */}
                    <div className="relative">
                        <img 
                            style={{width: 228, height: 228, borderRadius: 114, backgroundColor: 'gray', margin: '0 auto', objectFit: 'cover'}}
                            src={myProfileImgSrc}
                        />
                        <input className="focus:outline-none" style={{position: 'absolute', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 228, height: 228, borderRadius: 114, cursor: 'pointer'}} type="file" onChange={(e) => profileImgChangeHandler(e)} />
                    </div>

                    {/* 닉네임, 개인정보 */}
                    <div className="mt-3">
                        <div className="text-center">
                            <p style={{color: "#8D8D8D", fontSize: 11}} className="text-sm cursor-pointer" onClick={() => history.push('/developer-profile')}>XIRCLE 개발자 프로필 구경하기</p>
                            <h3 style={{fontSize: 20, fontWeight: '600', margin: '5px 0'}}>패션러버 스타트업CEO <span style={{fontSize: 18, fontWeight: 'lighter'}}>@2donny</span></h3>
                        </div>
                        <div className="flex flex-row justify-center">
                            <div style={{height: 25, backgroundColor: '#CCF6FF', margin: '0 2px 0 0'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'bolder', padding: '7px'}}>남</p></div>
                            <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'bolder', padding: '7px'}}>고려대학교 재학중</p></div>
                            <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'bolder', padding: '7px'}}>서울특별시 성북구</p></div>
                            <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'bolder', padding: '7px'}}>20중반</p></div>
                        </div>
                        <p className="text-sm">{introText}</p>
                    </div>

                    {/* 직장, 한줄소개 */}
                    <ul className="mt-14">
                        <li className="flex flex-row text-sm mb-2">
                            <img 
                                style={{width: 15, height: 15}}
                                src="/company.svg"
                                alt="company"
                            />
                            <p className="font-extrabold mx-2 my-0">XIRCLE</p><span>운영중</span>
                        </li>
                        <li className="flex flex-row text-sm mb-2">
                            <p className="">개발공부하는 학생입니다. 개발 TALK 하실분들 환영 ✨</p>
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
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15, color: "#fff", opacity: 0.7}}>게시물 0개</button>
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
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15, opacity: 0.9}}>게시물 0개</button>
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
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15, opacity: 0.9}}>게시물 0개</button>
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
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15, opacity: 0.9}}>게시물 0개</button>
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
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15, opacity: 0.9}}>게시물 0개</button>
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
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15, opacity: 0.9}}>게시물 0개</button>
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
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15, opacity: 0.9}}>게시물 0개</button>
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
                                    <button className="absolute" style={{padding: '3px 5px', bottom: 20, fontSize: 3, border: '1px solid #fff', borderRadius: 15, opacity: 0.9}}>게시물 0개</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </>
        )
    }else if(pageNum === 3) {
        contents = (
            <div style={{padding: 10}} className="h-screen">
                <p>서비스 준비중입니다.</p>
            </div>
        )
    }else {
        alert('존재하지 않는 페이지입니다.')
    }
    return (
        <Layout invitement footerNone>
            {/* 어쩔수 없이 main안에 header 넣어야함 */}
            <header className="mt-5 mb-10">
                <section className="flex flex-row items-center justify-around mt-1">
                    <button 
                        style={pageNum === 1 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 m-0 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(1)}
                    >
                        게시물
                    </button>
                    <button 
                        style={pageNum === 2 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(2)}
                    > @2donny{displayName}
                    </button>
                    <button 
                        style={pageNum === 3 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(3)}
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

export default MyProfile;