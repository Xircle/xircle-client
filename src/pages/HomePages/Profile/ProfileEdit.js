import React, {useCallback, useState, useRef, useEffect} from 'react';
import * as actions from '../../../store/actions/index';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../../components/layout';
import Spinner from 'react-spinner-material';
import Modal from '../../../components/UI/modal';
import { Checkbox } from 'semantic-ui-react';

const { kakao } = window;

const ProfileEdit = ({ history }) => {
    const [pageType, setPageType] = useState('default');
    // for location page
    const [isMapSupported, setIsMapSupported] = useState(true);
    const [addr, setAddr] = useState('');
    const [longitudeInEdit, setLongitudeInEdit] = useState(null);
    const [latitudeInEdit, setLatitudeInEdit] = useState(null);
    const [isLoading ,setIsLoading] = useState(true);
    
    // redux
    const {token, isPublic, isGraduate, displayNameInUser, gender, univInUser, age, job, adj, location, latitude, longitude, interestArr, articleImgSrc, articleTag, introText, profileImgSrc, resume, workPlace } = useSelector(store => store.user);
    const editLoading  = useSelector(store => store.user.loading);
    const editError  = useSelector(store => store.user.error);
    const dispatch = useDispatch();

    const [profileImgSrcInEdit, setProfileImgSrcInEdit] = useState(profileImgSrc);
    const [isLocationPublic, setIsLocationPublic] = useState(true);
    const [locationInEdit, setLocationInEdit] = useState(location);
    const [univClicked, setUnivClicked] = useState(false);
    const [isPublicInEdit, setIsPublicInEdit] = useState(isPublic); // 초기화
    const [isGraduateInEdit, setIsGraduateInEdit] = useState(isGraduate); // 초기화
    const [adjInEdit, setAdjInEdit] = useState(adj);
    const [isAdjClicked, setAdjClicked] = useState(false);
    const [jobInEdit, setJobInEdit] = useState(job);
    const [isJobClicked, setJobClicked] = useState(false);
    const [IntroTextInEdit, setIntroTextInEdit] = useState(introText);
    const [resumeInEdit, setResumeInEdit] = useState(resume);
    const [workPlaceInEdit, setWorkPlaceInEdit] = useState(workPlace);
    const [editedProfileFormData, setEditedProfileFormData] = useState(null);
    
    // ref
    const addrRef = useRef();
    
    // 리다이렉션
    useEffect(() => {
        if(!profileImgSrcInEdit)  
            return history.push('/my-profile')
    }, []);

    useEffect(() => {
        if(editError === false)
            window.location.href = '/my-profile';
    }, [editLoading]);
    
    // 카카오맵
    useEffect(() => {
        if(pageType !== 'location') return null;

        // 카카오맵 script 
        const container = document.getElementById('map'); 
        const options = {
            center: new kakao.maps.LatLng(37.585568, 127.029391),
            level: 5
        };
        const map = new kakao.maps.Map(container, options);
        let marker = null;
        const geocoder = new kakao.maps.services.Geocoder();
        const infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
        
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setLatitudeInEdit(lat);
                setLongitudeInEdit(lon);
                const locPosition = new kakao.maps.LatLng(lat, lon); 
                
                displayMarker(locPosition);

                // latitude, longitude로 현재 위치정보 반환하는 콜백함수.
                searchDetailAddrFromCoords({ lat: lat, lng: lon}, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const fullAddr = result[0].address.address_name; 
                    const newAddr = fullAddr.split(' ');
                    setAddr(newAddr[0] + ' ' + newAddr[1]);
                }
                });
            }, (err) => { // error 콜백함수
                console.log(err.message);
                if(err.code === err.PERMISSION_DENIED) {
                    console.log('permission denied');
                    setIsMapSupported(false);
                    setIsLoading(false);
                } else if(err.code === err.TIMEOUT) {
                    console.log('Time out')
                    setIsMapSupported(false);
                    setIsLoading(false);
                } else {
                    console.log('something made error')
                    setIsMapSupported(false);
                    setIsLoading(false);
                }
            }, { timeout: 8000, enableHighAccuracy: true });
        } else{
            alert("현 브라우저에서 Geolocation을 지원하지 않습니다.");
            setIsMapSupported(false);
            setIsLoading(false);
        }
        
        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition) {
            marker = new kakao.maps.Marker({  
                map: map, 
                position: locPosition
            }); 
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);      
            setIsLoading(false);
        }

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            if(isLoading)
                return null;
            searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                if(status === kakao.maps.services.Status.OK) {
                    let detailAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
                    detailAddr += result[0].address.address_name;
                    
                    const fullAddr = result[0].address.address_name; 
                    const newAddr = fullAddr.split(' ');
                    const displayAddr = '<p style="margin: 10px;"> ' + newAddr[0] + ' ' +  newAddr[1] +  '</p>';
                    setAddr(newAddr[0] + ' ' + newAddr[1])
                    setLongitudeInEdit(mouseEvent.latLng.getLng());
                    setLatitudeInEdit(mouseEvent.latLng.getLat());
                    const content = displayAddr;
        
                    // 마커를 클릭한 위치에 표시합니다 
                    if(!marker)
                        return alert("새로고침 해주세요!");
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);
        
                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }   
            });
        });
        
        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            if(coords.lng)
                geocoder.coord2Address(coords.lng, coords.lat, callback);
            else
                geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
    }, [pageType, isLoading]);

    // Location page callback
    const locationTextChangeHandler = useCallback((event) => {
        setLocationInEdit(event.target.value);
    }, []);

    const locationBtnHandler = useCallback((event) => {
        event.preventDefault();
        const locationRegex = /^(서울|경기도|강원도|충청북도|충청남도|전라북도|전라남도|경상북도|경상남도|부산|제주|세종|대구|인천|광주|대전|울산)/;
        if(!addr) {
            if(!locationInEdit.match(locationRegex))
            return alert('올바른 지역을 입력해주세요.');
        }
        const finalLocation = addr || locationInEdit;
        setLocationInEdit(finalLocation);
        setPageType('default');
    }, [addr, locationInEdit]);

    const checkboxHandler = useCallback((event, data) => {
        const checked = data.checked;
        setIsLocationPublic(checked);
    }, []);
    
    // Portfolio page callback
    const portfolioSubmit = useCallback(() => {
        // dispatch

        setPageType('default');
    }, []);

    // Default page callback
    const profileEditSubmit = useCallback(() => {
        // validation
        // 1) adj
        if(adjInEdit.trim().length === 0)
            return alert("수식어를 입력해주세요.");

        // 2) job
        if(jobInEdit.trim().length === 0)
            return alert("직업을 입력해주세요.");

        // 3) 한줄소개
        const introText = IntroTextInEdit.trim();
        if(introText.length < 3)
            return alert("한줄소개는 3자 이상으로 작성해주세요!");

        // dispatch
        if(editedProfileFormData) { // 변경된 프로필 이미지가 있는 상태
            const data = {
                latitude: latitudeInEdit,
                longitude: longitudeInEdit,
                location: locationInEdit,
                isPublic: isPublicInEdit,
                isGraduate: isGraduateInEdit,
                introText: IntroTextInEdit,
                adj: adjInEdit,
                job: jobInEdit,
                resume: resumeInEdit,
                workPlace: workPlaceInEdit,
                isLocationPublic: isLocationPublic
            };
            editedProfileFormData.append('data', JSON.stringify(data));
            dispatch(actions.updateProfile(token, editedProfileFormData));
        }else {
            const formData = new FormData();
            const data = {
                latitude: latitudeInEdit,
                longitude: longitudeInEdit,
                location: locationInEdit,
                isPublic: isPublicInEdit,
                isGraduate: isGraduateInEdit,
                introText: IntroTextInEdit,
                adj: adjInEdit,
                job: jobInEdit,
                resume: resumeInEdit,
                workPlace: workPlaceInEdit,
                isLocationPublic: isLocationPublic
            };
            formData.append('data', JSON.stringify(data));
            dispatch(actions.updateProfile(token, formData, null, latitudeInEdit,longitudeInEdit,locationInEdit,isPublicInEdit,isGraduateInEdit,IntroTextInEdit,adjInEdit,jobInEdit,resumeInEdit,workPlaceInEdit,isLocationPublic));
        }
        
    }, [latitudeInEdit, longitudeInEdit, locationInEdit, workPlaceInEdit, isPublicInEdit, isGraduateInEdit, adjInEdit, jobInEdit, resumeInEdit, IntroTextInEdit, profileImgSrcInEdit, editedProfileFormData, isLocationPublic]);

    const UnivPublicChangeHandler = useCallback((e, { value }) => {
        if(value === 'public')
            setIsPublicInEdit(true);
        else
            setIsPublicInEdit(false);
    }, [isPublicInEdit]);

    const UnivGraduateChangeHandler = useCallback((e, { value }) => {
        if(value === 'graduate') 
            setIsGraduateInEdit(true);
        else
            setIsGraduateInEdit(false);

    }, [isGraduateInEdit]);
    
    const uploadPhoto = useCallback((event) => {
        event.preventDefault();
        // file을 읽을 reader 객체 생성
        const files = event.target.files;
        const __file = files[0];
        const __size = files[0].size;

        if(__size > 10000000) { // 10MB 이상이면 용량 제한
            return alert("사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. ")
        } 
        // 미리보기용
        const fileReader = new FileReader();
        fileReader.readAsDataURL(__file);
        fileReader.onload = e => {
            setProfileImgSrcInEdit(e.target.result);
        }
        // 서버 제출용
        const formData = new FormData();
        formData.append("profileImgSrc", __file);
        setEditedProfileFormData(formData);
    }, []);
    

    let contents = null;
    if(pageType === 'default') {
        contents = (
            <section style={{height: '100%', marginTop: 10, position: 'relative'}} className="px-3 py-3 mx-3">
                {editLoading ? (
                    <div style={{position: 'absolute', zIndex: 100, left: '50%', top: '30%', transform: 'translate(-50%, -50%)'}}>
                        <Spinner
                            color="gray"
                        />
                    </div>
                ) : null}
                {/* 프로필 사진 */}
                <div className="relative">
                    <img 
                        style={{width: 111, height: 111, borderRadius: 60, backgroundColor: 'white', margin: '0 auto', objectFit: 'cover'}}
                        src={profileImgSrcInEdit}
                    />
                    <input 
                        style={{position: 'absolute', display: 'block', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 111, height: 111, borderRadius: 150, cursor: 'pointer'}} 
                        type="file" 
                        accept="image/x-png,image/jpeg,image/gif"
                        onChange={(e) => uploadPhoto(e)} 
                    />
                    <div style={{position: 'absolute', bottom: 15, right: '31%'}}>
                        <div className="flex flex-row justify-center items-center" style={{width: 26, height: 26, borderRadius: 13, boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.08)", backgroundColor: "#fff"}}>
                            <img src="/profile/camera_only.svg" alt="camera"/>
                        </div>
                    </div>
                </div>
                
                {/* displayName */}
                <div className="mt-3 text-center">
                    <p style={{fontSize: 20, margin: 0, fontWeight: 'lighter', fontFamily: 'cursive', margin: '5px 0'}}>{displayNameInUser}</p>
                </div>

                <div style={{margin: '10px 0', borderBottom: '1px solid #EBEBEB'}}></div>

                {/* 모든 Profile */}
                <ul style={{marginTop: 20, padding: '0 10px 0 0'}}>
                    <h1 style={{fontSize: 18, margin: '30px 0', color: "#595959", fontWeight: 'bold'}}>Profile</h1>
                    <li onClick={() => setPageType('location')} style={{margin: '10px 0'}} className="flex flex-row justify-between cursor-pointer">
                        <p style={{color: "#595959"}}>위치</p>
                        <span style={{color: "#B5B5B5"}}>{locationInEdit}{isLocationPublic ? null : "(비공개)"}</span>
                    </li>
                    <li onClick={() => setUnivClicked(true)} style={{margin: '10px 0'}} className="flex flex-row justify-between cursor-pointer">
                        <p style={{color: "#595959"}}>학교</p>
                        <p style={{color: "#B5B5B5"}}>{univInUser} {isGraduateInEdit  ? "졸업" : "재학"} {isPublicInEdit ? "(공개)" : "(비공개)"} </p>
                    </li>
                    <li style={{margin: '10px 0'}} className="flex flex-row justify-between">
                        <p style={{color: "#595959"}}>나이</p>
                        <p style={{color: "#B5B5B5"}}>{age}살</p>
                    </li>
                    <li style={{margin: '10px 0'}} className="flex flex-row justify-between">
                        <p style={{color: "#595959"}}>성별</p>
                        <p style={{color: "#B5B5B5"}}>{gender === '남' ? "남성" : "여성"}</p>
                    </li>
                    <li onClick={() => setAdjClicked(true)} style={{margin: '10px 0'}} className="flex flex-row justify-between cursor-pointer">
                        <p  style={{color: "#595959"}}>수식어</p>
                        <p style={{color: "#B5B5B5"}}>{adjInEdit}</p>
                    </li>
                    <li onClick={() => setJobClicked(true)} style={{margin: '10px 0'}} className="flex flex-row justify-between cursor-pointer">
                        <p style={{color: "#595959"}}>직업</p>
                        <p style={{color: "#B5B5B5"}}>{jobInEdit}</p>
                    </li>
                    <li style={{margin: '20px 0'}} style={{margin: "20px 0"}} className="flex flex-col justify-between">
                        <p style={{color: "#595959", fontWeight: 500}}>프로필 소개</p>
                        <textarea
                            id="introText"
                            placeholder="나를 자유롭게 표현해봐요!"
                            onChange={(e) => {e.preventDefault(); setIntroTextInEdit(e.target.value.trim())}}
                            defaultValue={IntroTextInEdit}
                            style={{backgroundColor: "#F7F7FA", padding: '20px 10px', height: 150, overflow: 'hidden'}}
                        >
                        </textarea>
                    </li>
                    <li style={{margin: "30px 0 100px"}}>
                        <div className="flex flex-row justify-between">
                            <p style={{color: "#595959", fontWeight: 500}}>포트폴리오</p>
                            <span onClick={() => setPageType('portfolio')} style={{color: "#B5B5B5"}} className="cursor-pointer">수정/추가하기</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center my-5">
                                {workPlaceInEdit ? (
                                <>
                                    <img 
                                        src="/profile/company.svg"
                                        alt="company"
                                    />
                                    <p style={{fontSize:14, margin: 0, fontWeight: 'bold', marginLeft: 10}}>{workPlaceInEdit}</p><p style={{whiteSpace: 'pre'}}>&nbsp;재직중</p>
                                </>
                                ) : <p style={{fontSize:14, margin: 0, fontWeight: 'bold', marginLeft: 10}}>근무직장을 추가해보세요!</p>}
                            </div>
                            <div className="flex flex-row items-center">
                                {resumeInEdit ? (
                                <>
                                    <img 
                                        src="/profile/grobal.svg"
                                        alt="grobal"
                                    />
                                    <p style={{fontSize:14, margin: 0, marginLeft: 10}}>{resumeInEdit}</p>
                                </>
                                ) : <p style={{fontSize:14, margin: 0, fontWeight: 'bold', marginLeft: 10}}>활동이력을 추가해보세요!</p>}
                            </div>
                        </div>
                    </li>
                </ul>
                {/* 고려대학교 (재학중) (공개) */}
                <Modal show={univClicked} clicked={() => setUnivClicked(false)}>
                    <div className="flex flex-row justify-between mb-5">
                        <img 
                            src="/arrow-back-outline.svg"
                            alt="뒤로가기"
                            style={{width: 20, heiht: 20, cursor: 'pointer'}}
                            onClick={() => setUnivClicked(false)}
                        />
                        <span onClick={() => setUnivClicked(false)} style={{color: "#4700FF", cursor: 'pointer'}}>확인</span>
                    </div>
                    <h1 style={{fontSize: 14, margin: '10px 0', fontWeight: 600}}>{univInUser}</h1>
                    <div className="flex flex-row justify-evenly my-10">
                        <Checkbox 
                            radio
                            label="재학중"
                            value="attending"
                            checked={isGraduateInEdit === false}
                            onChange={UnivGraduateChangeHandler}
                        />
                        <Checkbox 
                            radio
                            label="졸업"
                            value="graduate"
                            checked={isGraduateInEdit === true}
                            onChange={UnivGraduateChangeHandler}
                        />
                    </div>
                    <div className="flex flex-row justify-evenly my-10">
                        <Checkbox 
                            radio
                            label="공개"
                            value="public"
                            checked={isPublicInEdit === true}
                            onChange={UnivPublicChangeHandler}
                        />
                        <Checkbox 
                            radio
                            label="비공개"
                            value="private"
                            checked={isPublicInEdit === false}
                            onChange={UnivPublicChangeHandler}
                        />
                    </div>
                </Modal>
                {/* Adj */}
                <Modal show={isAdjClicked} clicked={() => setAdjClicked(false)} type="directInput">
                    <img 
                        onClick={() => setAdjClicked(false)}
                        style={{width: 25, height: 25, margin: '0 0 0 auto'}}
                        src="/close-outline.svg"
                        alt="x"
                    />
                    <form onSubmit={(e) => {e.preventDefault(); setAdjClicked(false);}}>
                        <textarea 
                            name="newAdj"
                            id="newAdj"
                            onChange={(e) => setAdjInEdit(e.target.value.trim())}
                            autoFocus
                            placeholder="회원님은 어떤 사람인가요? 직접입력해보세요."
                            style={{height: '100px', backgroundColor: "#F7F7FA", textAlign: 'center'}}
                            className="my-10 px-3 py-5 w-full text-base placeholder-gray-300">
                        </textarea>
                        <button onClick={(e) => {e.preventDefault(); setAdjClicked(false);}} style={{backgroundColor: "#979B9F", color: '#fff', padding: "10px 60px", borderRadius: 2}}>
                            확인
                        </button>
                    </form>
                </Modal>
                {/* Job */}
                <Modal show={isJobClicked} clicked={() => setJobClicked(false)}  type="directInput">
                    <img 
                        onClick={() => setJobClicked(false)}
                        style={{width: 25, height: 25, margin: '0 0 0 auto'}}
                        src="/close-outline.svg"
                        alt="x"
                    />
                    <form onSubmit={(e) => {e.preventDefault(); setJobClicked(false);}}>
                        <textarea 
                            name="newJob"
                            id="newJob"
                            onChange={(e) => setJobInEdit(e.target.value.trim())}
                            autoFocus
                            placeholder="회원님은 어떤 사람인가요? 직접입력해보세요."
                            style={{height: '100px', backgroundColor: "#F7F7FA", textAlign: 'center'}}
                            className="my-10 px-3 py-5 w-full text-base placeholder-gray-300">
                        </textarea>
                        <button onClick={(e) => {e.preventDefault(); setJobClicked(false);}} style={{backgroundColor: "#979B9F", color: '#fff', padding: "10px 60px", borderRadius: 2}}>
                            확인
                        </button>
                    </form>
                </Modal>
            </section>
        )
    }else if(pageType === 'portfolio') {
        contents = (
            <section style={{height: '100%'}} className="px-3 py-3 mx-3">
                <div>
                    <h1 style={{fontWeight: 600, fontSize: 24, marginTop: 30}}>포트폴리오</h1>
                    <p style={{color: '#C5C1C1'}}>회원님의 동아리/직장 등 활동이력을 기록하세요.</p>
                </div>
                <div style={{marginTop: 50}}>
                    <section style={{margin: "10px 0"}}>
                        <div className="flex flex-row">
                            <p style={{marginBottom: 0, marginRight: 5}} className="text-left"> 근무 직장 </p>
                            <img 
                            
                                src="/profile/company.svg"
                                alts="company"
                            />
                        </div>
                        
                        <div style={{position: 'relative'}}>
                            <textarea 
                                defaultValue={workPlaceInEdit}
                                onChange={(e) => setWorkPlaceInEdit(e.target.value.trim())}
                                placeholder="삼성 / 현대 / SKT / 카카오초콜렛 / 네이버"
                                style={{height: '60px', backgroundColor: "#F7F7FA"}}
                                className="mt-3 px-3 py-5 w-full text-base placeholder-gray-300">
                            </textarea>
                            <img 
                                style={{position: 'absolute', right: 10, bottom: '50%', transform: 'translate(0, 50%)'}}
                                src="/profile/pencil.svg"
                                alt="pencil"
                            />
                        </div>
                    </section>
                    <section style={{margin: "25px 0 15px"}}>
                        <div className="flex flex-row">
                            <p style={{marginBottom: 0, marginRight: 5}} className="text-left"> 활동 이력 </p>
                            <img 
                                src="/profile/grobal.svg"
                                alts="activity"
                            />
                        </div>
                        <div style={{position: 'relative'}}>
                            <textarea
                                defaultValue={resumeInEdit}
                                onChange={(e) => setResumeInEdit(e.target.value.trim())}
                                placeholder="가입한 동아리 / 학회활동 / 이전 직장 등등"
                                style={{height: '60px', backgroundColor: "#F7F7FA"}}
                                className="mt-3 px-3 py-5 w-full text-base placeholder-gray-300">
                            </textarea>
                            <img 
                                style={{position: 'absolute', right: 10, bottom: '50%', transform: 'translate(0, 50%)'}}
                                src="/profile/pencil.svg"
                                alt="pencil"
                            />
                        </div>
                    </section>
                    <p style={{margin: '20px 0', textAlign: 'center'}}>이력추가 / 직장 2개 이상 추가는 <br/> 런칭 후 가능해요</p>
                    <button onClick={() => portfolioSubmit()} style={{padding: '10px 0', margin: '50px 0', borderRadius: 4, width: '100%', backgroundColor: "#2F363E", color: '#fff'}}>저장</button>
                </div>
            </section>
        )
    }else if(pageType === 'location') {
        contents = (
            <section className="h-full px-3 py-3 mx-3">
                <div>
                    <h1 style={{fontWeight: 600, fontSize: 24, marginTop: 30}}>지금 어디있나요?</h1>
                    <p style={{color: '#C5C1C1'}}>회원님의 도시 정보까지만 표시합니다. <br/> 프라이버시에 대해 걱정 마세요!</p>
                </div>

                <div style={{opacity: isLoading ? 0.5 : 1, zIndex: 900, marginTop: 30}} className="flex flex-col items-center h-full relative">
                    {/* map */}
                    <div id="map" onClick={(e) => e.preventDefault()}  style={{ width: '80%', height: isMapSupported ? 300 : 0}}>
                        {isLoading ? (
                            <div style={{position: 'absolute', zIndex: 100, left: '50%', top: '50%', transform: 'translate(-50%, 0)'}}>
                                <Spinner
                                    color="gray"
                                />
                            </div>
                        ) : null}
                    </div>

                    {/* checkbox */}
                    <div style={{marginTop: 15, width: '80%'}} className="ui checkbox">
                        <Checkbox name="isLocationPublic" checked={isLocationPublic} onChange={checkboxHandler} label='내 위치 프로필에서 공개' />
                    </div>

                    {/* input */}
                    <div style={{marginTop: 20}} className="h-full flex flex-row justify-center items-center pt-5">
                        <p style={{marginBottom: 0, fontSize: 13, whiteSpace: 'pre'}} className="mr-5">나는</p>
                        {isMapSupported ? (
                        <input 
                            type="text"
                            placeholder="거주지"
                            className="bg-gray-100 px-5 py-3"
                            value={addr}
                            ref={addrRef}
                            onChange={(e) => locationTextChangeHandler(e)}
                            style={{width: 190}}
                        />
                        ) : (
                        <input 
                            type="text"
                            placeholder="거주지"
                            className="bg-gray-100 px-5 py-3"
                            onChange={(e) => locationTextChangeHandler(e)}
                            style={{width: 190}}
                        />
                        )}
                        <p style={{fontSize: 13, whiteSpace: 'pre'}} className="text-lg ml-5">에 있어요.</p>
                    </div>
                    <button onClick={(e) => locationBtnHandler(e)} disabled={isLoading ? true : false} className="w-full rounded-lg px-5 py-3 my-20 bg-gray-400 text-white focus:outline-none">확인</button>
                </div>
            </section>
        )
    }
    
    return (
        <Layout footerNone>
            <header style={{margin: '20px 0px 5px', paddingBottom: 10, borderBottom: '1px solid #EBEBEB'}} className="flex flex-row items-center justify-between px-5 mt-1 ">
                <img 
                    src="/arrow-back-outline.svg"
                    alt="뒤로가기"
                    style={{width: 20, heiht: 20, cursor: 'pointer'}}
                    onClick={() => { if(pageType === 'default') {history.goBack()} else {setPageType('default')} }}
                />
                {pageType === 'default' ? (
                <>
                    <p style={{margin: '5px 0 5px 10px'}}> 프로필 편집 </p>
                    <div onClick={() => profileEditSubmit()} style={{width: 25, color: "#4700FF", cursor: 'pointer'}}>수정</div>
                </>
                ) : <div style={{height: 29}}></div>}
            </header>

            {contents}

        </Layout>
    )
}

export default ProfileEdit;