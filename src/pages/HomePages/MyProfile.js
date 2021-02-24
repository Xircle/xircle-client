import React, {useCallback, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';

const MyProfile = () => {
    const [isActivity, setIsActivity] = useState(true);

    const {age, gender, job, adj, location, articleImgSrc, displayName, introText, profileImgSrc} = useSelector(store => store.user);
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

    return (
        <div className="w-full">
            <Layout invitement footerNone>

                {/* Profile Container */}
                <section style={{height: '310px'}} className="px-3 py-3 mx-3">
                    {/* 프로필 사진, 게시물, 친구 수 */}
                    <div className="flex flex-row items-center justify-between">
                        <img 
                            style={{width: 80, height: 80, marginRight: 30, borderRadius: 100, backgroundColor: 'gray'}}
                            src={profileImgSrc}
                        />
                        <div className="text-center mx-2">
                            <h3 style={{margin: 5}}>1</h3>
                            <p className="text-sm">게시물</p>
                        </div>
                        <div className="text-center mx-2">
                            <h3 style={{margin: 5}}>0</h3>
                            <p className="text-sm">친구</p>
                        </div>
                        <div className="text-center mx-2">
                            <img
                                style={{width: 23, height: 23, margin: 5}} 
                                src="heart-red.png"
                                alt="heart"
                            />
                            <p className="text-sm">180</p>
                        </div>
                    </div>

                    {/* 3개 자기소개 */}
                    <div className="mt-5 mb-2">
                        <h3 className="my-1 text-lg">{adj} {job}<span className="text-lg mx-1 font-light">{displayName}</span></h3>
                        <div className="flex flex-row">
                            <div style={{height: 25, backgroundColor: '#CCF6FF', margin: '0 5px 0 0'}}><p style={{fontSize: '8px', color: '#8D8D8D', padding: '7px'}}>{gender}</p></div>
                            <div style={{height: 25, backgroundColor: '#EEEEEE', margin: '0 5px'}}><p style={{fontSize: '8px', color: '#8D8D8D', padding: '7px'}}>{location}</p></div>
                            <div style={{height: 25, backgroundColor: '#EEEEEE', margin: '0 5px'}}><p style={{fontSize: '8px', color: '#8D8D8D', padding: '7px'}}>{age}</p></div>
                        </div>
                    </div>
                    <p className="text-sm">{introText}</p>

                    {/* 학교, 직장 */}
                    <ul className="mb-2">
                        <li className="flex flex-row text-sm text-gray-500">
                            <img 
                                style={{width: 15, height: 15}}
                                src="/school.svg"
                                alt="univ"
                            />
                            <p className=" font-extrabold mx-2">고려대</p><span>재학중</span>
                        </li>
                        <li className="flex flex-row text-sm text-gray-500">
                            <img 
                                style={{width: 15, height: 15}}
                                src="/bag-remove.svg"
                                alt="univ"
                            />
                            <p className="font-extrabold mx-2">연고링</p><span>재직중</span>
                        </li>
                        <li className="flex flex-row text-sm text-gray-500">
                            <img 
                                style={{width: 10, height: 10, marginLeft: 2, marginTop: 3}}
                                src="/ellipsis-horizontal-outline.svg"
                                alt="더보기"
                            />
                            <p className="font-extrabold mx-2"></p><span>더보기</span>
                        </li>
                        <div className="w-full text-right relative">
                            <label htmlFor="file" className="inline-block" style={{position: 'absolute', right: 0, backgroundColor: "#FF6600", padding: '6px 25px', borderRadius: 4, color: 'white', cursor: 'pointer'}}>
                                프로필 변경
                            </label>
                            <input 
                                onChange={(e) => updateProfile(e)}
                                type="file" name="file" id="file" accept="impage/*" 
                                style={{visibility: 'hidden', width: 0}}
                            />
                        </div>
                    </ul>
                </section>

                {/* Album nav */}
                <section style={{height: '100%', borderBottom: '1px solid #ccc'}} className="pb-3">
                    <ul className="w-full flex flex-row justify-around">
                        <li onClick={() => setIsActivity(true)} style={{fontWeight: isActivity ? 'bold': null}} className="cursor-pointer">내 활동</li>
                        <li onClick={() => setIsActivity(false)} style={{fontWeight: isActivity ? null: 'bold'}} className="cursor-pointer">INTEREST</li>
                        <li className="font-bold px-5"></li>
                    </ul>
                </section>

                <section style={{minHeight: '300px'}} className="flex flex-col justify-center items-center">
                    {articleImgSrc ? (
                        <>
                            <div style={{minHeight: 300}} className="grid grid-cols-3 grid-rows-3 w-full">
                                {isActivity ? (
                                    <div>
                                        <img 
                                            className="bg-black"
                                            src={articleImgSrc}
                                            alt="article-image"
                                        />
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <img 
                                src="/add-circle-outline.svg"
                                alt="add-circle"
                                style={{width: 150, height: 150}}
                            />
                            <p className="px-5 ">정식 서비스는 20일날 시작합니다. 일기장처럼 사용해보세요 :) </p>
                        </>
                    )}
                </section>
                
            </Layout>
        </div>
    )
}

export default MyProfile;