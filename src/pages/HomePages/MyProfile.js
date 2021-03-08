import React, { useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';
import Modal from '../../components/UI/modal';
import interest2UrlNumber from '../../components/interest2UrlNumber';
import startup from '../../images/interest_startup.svg';
import coding from '../../images/interest_coding.svg';
import lawschool from '../../images/interest_lawschool.svg';
import airpod from '../../images/interest_airpod.svg';

const selectedTab = {
    backgroundColor: 'black',
    color: 'white',
};
const notSelectedTab = {
    backgroundColor: 'white',
    color: "#8D8D8D"
}

const MyProfile = ({ history }) => {
    const { isPublic, isGraduate, displayNameInUser, gender, univInUser, age, job, adj, location, interestArr, articleImgSrc, introText, profileImgSrc, resume, workPlace } = useSelector(store => store.user);
    const { displayName, univ } = useSelector(store => store.auth);
    
    const [pageNum, setPageNum] = useState(2);
    const [interestNum, setInterestNum] = useState(0);
    const [myProfileImgSrc, setMyProfileImgSrc] = useState(profileImgSrc);
    const [anyThingClicked, setAnyThingClicked] = useState(false);
    
    const newArr = interest2UrlNumber(interestArr);
    const dispatch = useDispatch();

    useEffect(() => {
        if(displayName && univ && gender && age && job && adj && location && interestArr && articleImgSrc && introText && profileImgSrc)
            return null;
        const storedToken = localStorage.getItem('tk');
        if(storedToken) {
            dispatch(actions.getUser(storedToken));
        }else {
            alert("로그인 해주세요.");
            window.location.href = "auth";
        }
    }, []);

    // 프로필이미지 업데이트
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
                    <section onClick={() => setAnyThingClicked(true)} style={{position: 'absolute', left: '50%', top: '25%', transform: 'translate(-50%, 0)'}}>
                        <p style={{fontSize: 20, textAlign: 'center', whiteSpace: 'pre'}}>Xircle은 이런 가치를 제공합니다.</p>
                    </section>
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
                            style={{width: 228, height: 228, borderRadius: 114, backgroundColor: 'white', margin: '0 auto', objectFit: 'cover'}}
                            src={profileImgSrc}
                        />
                        <input className="focus:outline-none" style={{position: 'absolute', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 228, height: 228, borderRadius: 114, cursor: 'pointer'}} type="file" onChange={(e) => profileImgChangeHandler(e)} />
                    </div>

                    {/* 닉네임, 개인정보 */}
                    <div className="mt-3">
                        <div className="text-center">
                            <p style={{color: "#8D8D8D", fontSize: 11}} className="text-sm cursor-pointer" onClick={() => history.push('/developer-profile')}>XIRCLE 개발자 프로필 구경하기</p>
                            <h3 style={{fontSize: 20, fontWeight: '600', margin: '5px 0'}}>{adj} {job} <span style={{fontSize: 18, fontWeight: 'lighter'}}>{displayName || displayNameInUser}</span></h3>
                        </div>
                        <div className={`flex flex-row justify-center`}>
                            <div style={{height: 25, backgroundColor: '#CCF6FF', margin: '0 2px 0 0'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{gender}</p></div>
                            {isPublic ? <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{univ || univInUser} {isGraduate ? "졸업" : "재학중"}</p></div> : null}
                            <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{location}</p></div>
                            <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{age}</p></div>
                        </div>
                    </div>

                    {/* 직장, 한줄소개 */}
                    <ul className="mt-14">
                        {workPlace ? (
                        <li className="flex flex-row text-sm mb-2">
                            <img 
                                style={{width: 15, height: 15}}
                                src="/company.svg"
                                alt="company"
                            />
                            <p className="font-extrabold mx-2 my-0">{workPlace}</p><span>재직중</span>
                        </li>
                        ) : null}
                        <li className="flex flex-row text-sm mb-2">
                            <p className="">{introText}</p>
                        </li>
                        <li className="flex flex-row items-center my-3 ">
                            <img 
                                style={{width: 11, height: 11}}
                                src="/activity.svg"
                                alt="activity"
                            />
                            <p className="font-sans" style={{color: "#8D8D8D", fontSize: 13, marginLeft: 5}}>{resume}</p>
                        </li>
                    </ul>
                </section>

                {/* Album Navigation */}
                <section className="flex flex-row items-center justify-around mt-1">
                    <button 
                        style={interestNum === 0 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 m-0 rounded-3xl focus:outline-none"
                        onClick={() => setInterestNum(0)}
                    >
                        X-terest
                    </button>
                    <button 
                        style={interestNum === 1 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setInterestNum(1)}
                    > 스타트업
                    </button>
                    <button 
                        style={interestNum === 2 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setInterestNum(2)}
                    > 코딩
                    </button>
                    <button 
                        style={interestNum === 3 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setInterestNum(3)}
                    > 로스쿨
                    </button>
                </section>


                {/* Album Container */}
                <section style={{minHeight: '300px', height: '100%', padding: '20px 0', margin: '10px 0', backgroundColor: "#F7F7FA"}}>
                    <section className="relative">
                        <ul className="grid grid-cols-2">
                            {newArr.map((interest, id) => (
                            <li
                                key={id}
                                style={{ margin: 5, backgroundColor: "#fff", borderRadius: 15, backgroundSize: 'cover', backgroundImage: `url(${interest.url})`, height: 300 }} 
                                className={`col-span-1 ${interest.rowSpan} cursor-pointer`}
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div onClick={() => setAnyThingClicked(true)} className="relative h-full text-white flex flex-col justify-center items-center">
                                    <p style={{fontSize: 18, fontFamily: 'sans-serif'}} className="mb-1 relative">@{interest.title}</p>
                                    <img 
                                        style={{width: 30, height: 30}}
                                        src="/person_img.svg"
                                        alt="person"
                                    />
                                </div>
                            </li>
                            ))}
                            <li 
                                style={{
                                    margin: 5, backgroundColor: "#fff", borderRadius: 15, 
                                    backgroundColor: '#000', overflow: 'hidden',
                                    height: 140, color: '#fff'
                                }} 
                                className="col-span-2 row-span-1 cursor-pointer relative"
                                onClick={() => setAnyThingClicked(true)}
                            >
                                <div style={{height: '80%'}} className="h-full flex flex-col justify-center items-center">
                                    <p style={{margin: 0, fontSize: 12, margin: '2px 0', fontWeight: 'lighter'}}>친구도 사귀고 에어팟도 받고</p>
                                    <p style={{margin: 0, fontSize: 12, margin: '2px 0', fontWeight: 'bold', textAlign: 'center'}}>에어팟 프로 0원 이벤트</p>
                                    <p style={{margin: 0, fontSize: 6, margin: '2px 0', fontWeight: 'lighter', textAlign: 'center'}}>바로가기</p>
                                    <div style={{ height: 50, width: 50, position: 'absolute', bottom: -3, left: '50%', transform: 'translate(-50%, 0)', backgroundSize: 'cover', backgroundImage: `url(${airpod})` }}></div>
                                </div>
                                <div 
                                    onClick={() => setAnyThingClicked(true)} 
                                    className="relative h-full text-white flex justify-center items-center"
                                >
                                    <p className="mb-1 relative"></p>
                                </div>
                            </li>
                        </ul>

                        <div style={{height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyItems: 'center'}}>
                            
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
                        <p style={{fontFamily: 'serif', fontWeight: 'bolder'}}>XIRCLE</p>
                    </button>
                    <button 
                        style={pageNum === 2 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(2)}
                    > {displayName || displayNameInUser}
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