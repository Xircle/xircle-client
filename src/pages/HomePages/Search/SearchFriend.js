import React, {useState, useCallback, useRef, useEffect} from 'react';
import Layout from '../../../components/layout';
import { useSelector, useDispatch } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';
import Drawer from '../../../components/UI/Drawer';
import { Axios } from '../../../axios-instance';
import Spinner from 'react-spinner-material';
import { scrolltoTop } from '../../../components/scrolltoTop';
import * as actions from '../../../store/actions/index';

let searchFriendArr = [];
let page = 0;
const { kakao } = window;

const SearchFriend = ({ history }) => { //postNum 최신부터 0 ~ n
    const { token, location, longitude, latitude, profileImgSrc } = useSelector(store => store.user);

    const [univClicked, setUnivClicked] = useState(false);
    const [ageClicked, setAgeClicked] = useState(false);
    const [locationClicked, setLocationClicked] = useState(false);
    const [newLatitude, setNewLatitude] = useState(latitude);
    const [newLongitude, setNewLongitude] = useState(longitude);
    const [addr, setAddr] = useState();
    const [isLocationLoading, setIsLocationLoading] = useState(true);
    const [ageValue, setAgeValue] = useState();
    const [rangeValue, setRangeValue] = useState(4);

    // 서버에 보낼 4개 변수들
    const [filteredUniv, setFilteredUniv] = useState(null);
    const [filteredAge, setFilteredAge] = useState(null);
    const [filteredLocation, setFilteredLocation] = useState(null);
    const [filteredGender, setFilteredGender] = useState(null);
    const [isFiltering, setIsFiltering] = useState(null);

    const [filteringPage, setFilteringPage] = useState(page);
    const observer = useRef()
    const dispatch = useDispatch();

    // 리다이렉션
    useEffect(() => {
        if(searchFriendArr.length !== 0) return null;
        if(!token) return window.location.href = '/my-profile';
        if(searchFriendArr.length !== 0) return null; // 뭔가 있으면 http 금지

        scrolltoTop();
        filteringSubmitHandler();
    }, []);

    const lastFriendElementRef = useCallback(node => {
        if(isFiltering) 
            return null;
        if(observer.current) 
            observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                page++;
                setFilteringPage(prev => prev + 1);
            }
        })
        if(node) 
            observer.current.observe(node);
    }, [isFiltering, filteringPage])
    
    console.log(isFiltering)
    // Filtering dispatching 
    const filteringSubmitHandler = useCallback(() => {
        setIsFiltering(true);
        const finalGender = filteredGender === null ? null : filteredGender ? "남" : "여";
        
        console.log(filteredUniv, filteredAge, filteredLocation, finalGender, filteringPage);

        console.log(filteringPage)
        Axios.get(`/users?university=고려대학교&page=${filteringPage}`, {
            headers: {
                'access-token': token
            }
        })
        .then(res => {
            console.log(res);
            const isSuccess = res.data.success;
            if(isSuccess) {
                const newFriend = res.data.data; // [{userId, sameInterest, profileImgSrc, adj, job, displayName, introText}]
                searchFriendArr = [...searchFriendArr, ...newFriend];
                // setHasMore(res.data.data.length > 0)
                setIsFiltering(false);
            }else {
                setIsFiltering(false);
                alert("필터링 실패. 다시 시도해주세요.");
            }
        })
        .catch(err => {
            console.log(err);
            setIsFiltering(false);
            alert("필터링 실패. 다시 시도해주세요.");
        })

    }, [token, filteredAge, filteredLocation, filteredGender, filteredUniv, filteringPage]);

    // Age
    const ageRangeHandler = useCallback((e) => {
        let filteredAge;
        switch(Number(e.target.value)) {
            case 1:
                filteredAge = "20초";
                return setAgeValue(filteredAge);
            case 2:
                filteredAge = "20중";
                return setAgeValue(filteredAge);
            case 3:
                filteredAge = "20후";
                return setAgeValue(filteredAge);
            case 4:
                filteredAge = "30초";
                return setAgeValue(filteredAge);
            case 5:
                filteredAge = "30중";
                return setAgeValue(filteredAge);
            case 6:
                filteredAge = "30후";
                return setAgeValue(filteredAge);
            case 7:
                filteredAge = "40대";
                return setAgeValue(filteredAge);
            case 8:
                filteredAge = "50대";
                return setAgeValue(filteredAge);
            default:
                alert("나이를 다시 설정해주세요!");
                return null;
        }
    }, []);
    // Location
    const rangeChangeHandler = useCallback((e) => {
        const step = e.target.value;
        switch(Number(step)) {
            case 1:
                return setRangeValue(2)
            case 2:
                return setRangeValue(4)
            case 3:
                return setRangeValue(8)
            case 4:
                return setRangeValue(16)
            case 5:
                return setRangeValue(32)
            case 6:
                return setRangeValue(64)
            case 7:
                return setRangeValue(128)
            case 8:
                return setRangeValue(256)
            default:
                return null;
        };
        
    }, []);

    useEffect(() => {
        if(!locationClicked || isFiltering) return null;
            let level = null;
            if(rangeValue === 2) {
                level = 7; // 1km -> 2km
            }else if(rangeValue === 4) {
                level = 8; // 2km => 4km
            }else if(rangeValue === 8) {
                level = 9; //4km -> 8km
            }else if(rangeValue === 16) {
                level = 10; //8km -> 16km
            }else if(rangeValue === 32) {
                level = 11; // 16km -> 32km
            }else if(rangeValue === 64) {
                level = 12; // 32km -> 64km 
            }else if(rangeValue === 128) {
                level = 13; // 64km -> 128km
            }else if(rangeValue === 256) {
                level = 14; // 128km -> 256km
            }else {
                console.log('error!')
            }
            const container = document.getElementById('map'); 
            const options = {
                center: new kakao.maps.LatLng(newLatitude, newLongitude),
                level,
                draggable: false,
                disableDoubleClick: false,
                disableDoubleClickZoom: false,
                scrollwheel: false,
            };
            const map = new kakao.maps.Map(container, options);
            let marker = null;
            const geocoder = new kakao.maps.services.Geocoder();

            if(!newLongitude || !newLatitude) { // 위도경도 허용안했을때, 이 기능 쓰려면 위치허용해야함.
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setNewLatitude(lat);
                    setNewLongitude(lon);
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
                        setIsLocationLoading(false);
                        alert("위치 필터링 기능을 사용하려면 설정에서 위치허용을 해주세요!");
                        setLocationClicked(false);
                    } else if(err.code === err.TIMEOUT) {
                        console.log('Time out')
                        alert("Time out");
                        setLocationClicked(false);
                        setIsLocationLoading(false);
                    } else {
                        console.log('something made error')
                        alert("something made error");
                        setLocationClicked(false);
                        setIsLocationLoading(false);
                    }
                }, { timeout: 8000, enableHighAccuracy: true });
            }else { // 이미 위치허용해서, 위도/경도 있는 경우
                const locPosition = new kakao.maps.LatLng(newLatitude, newLongitude); 
                displayMarker(locPosition);

                searchDetailAddrFromCoords({ lat: newLatitude, lng: newLongitude}, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        const fullAddr = result[0].address.address_name; 
                        const newAddr = fullAddr.split(' ');
                        setAddr(newAddr[0] + ' ' + newAddr[1]);
                    }
                });
            }

            // 지도에 마커와 인포윈도우를 표시하는 함수입니다
            function displayMarker(locPosition) {
                const imgSrc = '/Logo/xircleLogo.png';
                const imgSize = new kakao.maps.Size(30, 30);
                const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);
                marker = new kakao.maps.Marker({  
                    map: map, 
                    position: locPosition,
                    image: markerImage
                }); 
                // 지도 중심좌표를 접속위치로 변경합니다
                map.setCenter(locPosition);      
                setIsLocationLoading(false);
            }

            // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
            function searchDetailAddrFromCoords(coords, callback) {
                // 좌표로 법정동 상세 주소 정보를 요청합니다
                if(coords.lng)
                    geocoder.coord2Address(coords.lng, coords.lat, callback);
                else
                    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
            }
        
    }, [locationClicked, isFiltering, rangeValue]);

    return (
        <Layout>
            <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                <img
                    onClick={() => history.goBack()} 
                    style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                    src="/arrow-back-outline.svg"
                    alt="back"
                />
                <p style={{textAlign: 'center', width: '100%', marginRight: 35, fontSize: 15, color: "#595959"}}>친구탐색</p>
            </nav>
            <div style={{minHeight: '100vh'}}>
                {isFiltering ? ( // filteredFriend.length === 0
                    <div style={{borderRadius: 25, maxheight: 1000, backgroundColor: "#fff"}}>
                        <section className="my-5 flex flex-row ">
                            <button style={{backgroundColor: "#F7F7FA", margin: '0 7px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>학교</button>
                            <button style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>나이</button>
                            <button style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>위치</button>
                            <button style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>성별</button>
                        </section>
                        <div style={{padding: 10}} className="flex px-5 py-5 flex-col items-center">
                            <Placeholder style={{width: '95%', margin: '30px 0'}}>
                                <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{width: '95%', margin: '30px 0'}}>
                                <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{width: '95%', margin: '30px 0'}}>
                                <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{width: '95%', margin: '30px 0'}}>
                                <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{width: '95%', margin: '30px 0'}}>
                                <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{width: '95%', margin: '30px 0'}}>
                                <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{width: '95%', margin: '30px 0'}}>
                                <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{width: '95%', margin: '30px 0'}}>
                                <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            
                        </div>
                    </div>
                ) : (
                    <section>
                        {/* 필터링 네비게이션 */}
                        <section className="mt-5 flex flex-row ">
                            <button onClick={() => setUnivClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 7px', padding: '10px 23px', borderRadius: 50, outline: 'none'}}><p style={{fontSize: 13, fontWeight: 300}}>{filteredUniv ? filteredUniv : "학교"}</p></button>
                            <button onClick={() => setAgeClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, outline: 'none'}}><p style={{fontSize: 13, fontWeight: 300}}>{filteredAge ? filteredAge : "나이"}</p></button>
                            <button onClick={() => setLocationClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, outline: 'none'}}><p style={{fontSize: 13, fontWeight: 300}}>{filteredLocation ? filteredLocation + 'km' : "위치"}</p></button>
                            <button onClick={() => setFilteredGender(!filteredGender)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, outline: 'none'}}><p style={{fontSize: 13, fontWeight: 300}}>{filteredGender === null ? "성별" : filteredGender ? "남성" : "여성" }</p></button>
                        </section>

                        <section style={{marginTop: 15, marginLeft: 15}} className="flex flex-row">
                            <img
                                onClick={() => {setFilteredAge(); setFilteredGender(null); setFilteredLocation(); setFilteredUniv();}} 
                                className="cursor-pointer"
                                src="/UI/refresh.svg"
                                alt="refresh"
                            />    
                            <p onClick={() => {searchFriendArr = []; setFilteringPage(0); filteringSubmitHandler()}} style={{color: "#2F51F0", margin: '0 15px', cursor: 'pointer'}}>검색하기</p>
                        </section>

                        {/* 친구들 프로필 */}
                        <section className="px-2">
                            {searchFriendArr.map((friend, index) => {
                                console.log(searchFriendArr);
                                console.log(page);
                                if(searchFriendArr.length === index + 1) {
                                    return (
                                        <div ref={lastFriendElementRef} onClick={() => {history.push('/friend-profile'); dispatch(actions.getFriend(token, friend.userId))}} key={friend.userId} className="flex flex-row items-center px-3 my-10 cursor-pointer">
                                            <img 
                                                loading="lazy"
                                                style={{width: 60, height: 60, borderRadius: 30}}
                                                src={friend.profileImgSrc}
                                                alt="profile"
                                            />
                                            <div className="px-5 flex flex-col justify-center ">
                                                <p style={{color: "#9A9A9A", margin: 0, fontSize: 12}}>same interest {friend.sameInterest}</p>
                                                <h2 style={{margin: '0 0 5px 0', fontSize: 14, lineHeight: 1.5, fontWeight: 700}}>{friend.adj} {friend.job} <span style={{fontWeight: 400, fontSize: 14}}>{friend.displayName} </span></h2>
                                                <p style={{color: "#9A9A9A", fontWeight: 300, fontSize: 11, width: 200, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{friend.introText}</p>
                                            </div>
                                        </div>
                                    )
                                }else {
                                    return (
                                        <div onClick={() => { history.push('/friend-profile'); dispatch(actions.getFriend(token, friend.userId))}} key={friend.userId} className="flex flex-row items-center px-3 my-10 cursor-pointer">
                                            <img 
                                                loading="lazy"
                                                style={{width: 60, height: 60, borderRadius: 30}}
                                                src={friend.profileImgSrc}
                                                alt="profile"
                                            />
                                            <div className="px-5 flex flex-col justify-center ">
                                                <p style={{color: "#9A9A9A", margin: 0, fontSize: 12}}>same interest {friend.sameInterest}</p>
                                                <h2 style={{margin: '0 0 5px 0', fontSize: 14, lineHeight: 1.5, fontWeight: 700}}>{friend.adj} {friend.job} <span style={{fontWeight: 400, fontSize: 14}}>{friend.displayName} </span></h2>
                                                <p style={{color: "#9A9A9A", fontWeight: 300, fontSize: 11, width: 200, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{friend.introText}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            {isFiltering && (
                                <Spinner 
                                    color='#ccc'
                                />
                            )}
                        </section>

                        {/* University  */}
                        <Drawer show={!isFiltering && univClicked} clicked={() => setUnivClicked(false)} type="univ">
                            <section className="flex flex-col justify-between mx-5 my-3">
                                <img 
                                    onClick={() => setUnivClicked(false)}
                                    style={{width: 20, height: 20, alignSelf: 'flex-end'}}
                                    className="cursor-pointer"
                                    src="/close-outline.svg"
                                    alt="close"
                                />
                                <p style={{textAlign: 'left'}}>학교를 선택하세요.</p>   
                            </section>
                            <section className="mt-5 mb-10 flex flex-row justify-between mx-5">
                                <img onClick={() => {setFilteredUniv('서울대'); setUnivClicked(false)}} style={{cursor: 'pointer', width: 70, height: 68, objectFit: 'fill'}} src="/Univ/snu_univ.svg" alt="snu"/>
                                <img onClick={() => {setFilteredUniv('고려대'); setUnivClicked(false)}} style={{cursor: 'pointer', width: 70, height: 68, objectFit: 'fill'}} src="/Univ/korea_univ.svg" alt="korea"/>
                                <img onClick={() => {setFilteredUniv('연세대'); setUnivClicked(false)}} style={{cursor: 'pointer', width: 70, height: 68, objectFit: 'fill'}} src="/Univ/yonsei_univ.svg" alt="yonsei"/>
                            </section>
                            <section className="my-5 flex flex-row justify-between mx-5">
                                <img onClick={() => {setFilteredUniv('서강대'); setUnivClicked(false)}} style={{cursor: 'pointer', width: 70, height: 68, objectFit: 'fill'}} src="/Univ/sogang_univ.svg" alt="sogang"/>
                                <img onClick={() => {setFilteredUniv('성균관대'); setUnivClicked(false)}} style={{cursor: 'pointer', width: 70, height: 68, objectFit: 'fill'}} src="/Univ/skku_univ.svg" alt="skku"/>
                                <img onClick={() => {setFilteredUniv('한양대'); setUnivClicked(false)}} style={{cursor: 'pointer', width: 70, height: 68, objectFit: 'fill'}} src="/Univ/hanyang_univ.svg" alt="hanyang"/>
                            </section>
                        </Drawer>
                        
                        {/* Age */}
                        <Drawer show={!isFiltering && ageClicked} clicked={() => setAgeClicked(false)} type="age">
                            <section className="flex flex-col justify-between mx-3 mt-3">
                                <img 
                                    onClick={() => setAgeClicked(false)}
                                    style={{width: 20, height: 20, alignSelf: 'flex-end'}}
                                    className="cursor-pointer"
                                    src="/close-outline.svg"
                                    alt="close"
                                />
                            </section>
                            <section style={{marginTop: 10}} className="flex flex-col justify-between">
                                <label style={{textAlign: 'left', margin: '10px 0 40px 10px'}}>친구 나이대를 설정하세요.</label>   
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="8" 
                                    defaultValue="50"
                                    onChange={(e) => ageRangeHandler(e)} 
                                    style={{width: "100%", margin: '0 auto', cursor: 'pointer', outline: 'none'}}
                                    step='1'
                                />
                                <datalist style={{marginTop: 10, width: '100%'}} className="flex flex-row justify-evenly">
                                    <option value="20초" label="20초" style={{fontWeight: 300, textAlign: 'left', padding: 0, paddingLeft: 3, width: '12.5%', fontSize: 9}}>20 초</option>
                                    <option value="20중" label="20중" style={{fontWeight: 300, textAlign: 'left', padding: 0, paddingLeft: 3, width: '12.5%', fontSize: 9}}>20 중</option>
                                    <option value="20후" label="20후" style={{fontWeight: 300, textAlign: 'left', padding: 0, paddingLeft: 5, width: '12.5%', fontSize: 9}}>20 후</option>
                                    <option value="30초" label="30초" style={{fontWeight: 300, textAlign: 'center', padding: 0, paddingRight: 7,  width: '12.5%', fontSize: 9}}>30 초</option>
                                    <option value="30중" label="30중" style={{fontWeight: 300, textAlign: 'center', padding: 0, paddingLeft: 5, width: '12.5%', fontSize: 9}}>30 중</option>
                                    <option value="30후" label="30후" style={{fontWeight: 300, textAlign: 'center', padding: 0, paddingLeft: 12, width: '12.5%', fontSize: 9}}>30 후</option>
                                    <option value="40대" label="40대" style={{fontWeight: 300, textAlign: 'right', padding: 0, width: '12.5%', fontSize: 9}}>40대</option>
                                    <option value="50대" label="50대" style={{fontWeight: 300, textAlign: 'right', padding: 0, width: '12.5%', fontSize: 9}}>50대</option>
                                </datalist>
                            </section>

                            <section style={{margin: '30px 0'}}>
                                <button onClick={() => {setFilteredAge(ageValue); setAgeClicked(false);}} style={{color: "#fff", outline: 'none', backgroundColor: "#2F363E", borderRadius: 4, padding: '10px 30px', width: '100%', fontSize: 12}}>확인</button>
                            </section>

                        </Drawer>

                        {/* Location */}
                        <Drawer show={locationClicked} clicked={() => setLocationClicked(false)} type="location">
                            <section className="flex flex-row justify-between mx-5 my-5">
                                <p>찾고싶은 친구들의 위치범위를 설정하세요</p>   
                                <img 
                                    onClick={() => setLocationClicked(false)}
                                    className="cursor-pointer"
                                    style={{width: 20, height: 20}}
                                    src="/close-outline.svg"
                                    alt="close"
                                />
                            </section>
                            <section className="flex flex-col justify-between mx-5">
                                <div id="map" onClick={(e) => e.preventDefault()}  style={{ opacity: isLocationLoading ? 0.5 : 1, width: '100%', height: 300}}>
                                    {isLocationLoading ? (
                                        <div style={{position: 'absolute', zIndex: 100, left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                                            <Spinner
                                                color="#2F51F0"
                                            />
                                        </div>
                                    ) : <div style={{width: 200, height: 200, borderRadius: 100, backgroundColor :"#2F51F0", opacity: .25, zIndex: 999, position: 'absolute', left: '50%', top: '47%', transform: 'translate(-50%, -50%)'}}></div>}
                                </div>
                                <p style={{color: "#8D8D8D", fontSize: 12, margin: '5px 0'}}>내위치 {addr || location}</p>

                                <label style={{fontSize: 16, color: "#2F51F0", margin: '15px', textAlign: 'right'}}>{rangeValue}km</label>
                                <input 
                                    type="range"
                                    min="1" // 2km 
                                    max="8" 
                                    step="1"
                                    defaultValue="2"
                                    className="cursor-pointer"
                                    onChange={(e) => rangeChangeHandler(e)}
                                />
                            </section>
                            <section style={{margin: '50px 0'}}>
                                <button onClick={() => {setFilteredLocation(rangeValue); setLocationClicked(false)}} style={{color: "#fff", outline: 'none', backgroundColor: "#2F363E", borderRadius: 4, padding: '10px 30px', width: '90%', fontSize: 12}}>확인</button>
                            </section>
                        </Drawer>

                    </section>
                )}
                
            </div>
        </Layout>
    )
}

export default SearchFriend;