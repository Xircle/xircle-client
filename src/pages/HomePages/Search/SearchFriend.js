import React, {useState, useCallback, useEffect} from 'react';
import Layout from '../../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Placeholder, Card } from 'semantic-ui-react';
import Drawer from '../../../components/UI/Drawer';
import Spinner from 'react-spinner-material';

const { kakao } = window;

const SearchFriend = ({ history, match }) => { //postNum 최신부터 0 ~ n

    const { location, longitude, latitude, profileImgSrc } = useSelector(store => store.user);

    const [univClicked, setUnivClicked] = useState(false);
    const [ageClicked, setAgeClicked] = useState(false);
    const [locationClicked, setLocationClicked] = useState(false);
    const [newLatitude, setNewLatitude] = useState(latitude);
    const [newLongitude, setNewLongitude] = useState(longitude);
    const [addr, setAddr] = useState();
    const [genderClicked, setGenderClicked] = useState(false);
    const [isLoadingFriend, setIsLoadingFriend] = useState(true);
    const [isLocationLoading, setIsLocationLoading] = useState(true);
    const [rangeValue, setRangeValue] = useState(13);

    // 리다이렉션
    useEffect(() => {
        // if(!profileImgSrc)
        //     return window.location.href = '/my-profile';

        setTimeout(() => {
            setIsLoadingFriend(false);
        }, 1000);

    }, []);

    const rangeChangeHandler = useCallback((e) => {
        setRangeValue(e.target.value);
    }, []);

    useEffect(() => {
        if(!locationClicked || isLoadingFriend)
            return null;

            let level = null;
            if(rangeValue > 0 && rangeValue <= 10) {
                level = 3;
            }else if(rangeValue > 10 && rangeValue <= 20) {
                level = 4;
            }else if(rangeValue > 20 && rangeValue <= 30) {
                level = 5;
            }else if(rangeValue > 30 && rangeValue <= 40) {
                level = 6;
            }else if(rangeValue > 40 && rangeValue <= 50) {
                level = 7;
            }else if(rangeValue > 50 && rangeValue <= 60) {
                level = 8;
            }else if(rangeValue > 60 && rangeValue <= 70) {
                level = 9;
            }else if(rangeValue > 70 && rangeValue <= 80) {
                level = 10;
            }else if(rangeValue > 80 && rangeValue <= 90) {
                level = 11;
            }else if(rangeValue > 90 && rangeValue <= 100) {
                level = 12;
            }
            const container = document.getElementById('map'); 
            const options = {
                center: new kakao.maps.LatLng(newLatitude, newLongitude),
                level,
                draggable: false,
                disableDoubleClick: false,
                disableDoubleClickZoom: false,
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
        
    }, [locationClicked, isLoadingFriend, rangeValue]);

    return (
        <Layout footerNone>
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
                {isLoadingFriend ? (
                    <div style={{borderRadius: 25, maxheight: 1000, backgroundColor: "#fff"}}>
                        <section className="my-5 flex flex-row ">
                            <button onClick={() => setUnivClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 7px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>학교</button>
                            <button onClick={() => setAgeClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>나이</button>
                            <button onClick={() => setLocationClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>위치</button>
                            <button onClick={() => setGenderClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>성별</button>
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
                        <section className="my-5 flex flex-row ">
                            <button onClick={() => setUnivClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 7px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>학교</button>
                            <button onClick={() => setAgeClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>나이</button>
                            <button onClick={() => setLocationClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>위치</button>
                            <button onClick={() => setGenderClicked(true)} style={{backgroundColor: "#F7F7FA", margin: '0 3px', padding: '10px 23px', borderRadius: 50, fontSize: 13, fontWeight: 400, outline: 'none'}}>성별</button>
                        </section>

                        {/* 프로필 컨테이너 */}
                        <section className="px-2">
                            <div onClick={() => console.log('here')} className="flex flex-row items-center px-3 my-10">
                                <img 
                                    style={{width: 55, height: 55, borderRadius: 30}}
                                    src="https://api.xircle.org/1616523233781.png"
                                    alt="profile"
                                />
                                <div className="px-5 flex flex-col justify-center ">
                                    <p style={{color: "#9A9A9A", margin: 0, fontSize: 12}}>same interest 5</p>
                                    <h2 style={{margin: '0 0 5px 0', fontSize: 14, lineHeight: 1.5, fontWeight: 700}}>배부른 개발자 <span style={{fontWeight: 400, fontSize: 14}}>@2donny</span></h2>
                                    <p style={{color: "#9A9A9A"}}>책좋아하는 학생입니다. 독서 TALK 하실분...</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center px-3 my-10">
                                <img 
                                    style={{width: 55, height: 55, borderRadius: 30}}
                                    src="https://api.xircle.org/1615526650472.png"
                                    alt="profile"
                                />
                                <div className="px-5 flex flex-col justify-center ">
                                    <p style={{color: "#9A9A9A", margin: 0, fontSize: 12}}>same interest 5</p>
                                    <h2 style={{margin: '0 0 5px 0', fontSize: 14, lineHeight: 1.5, fontWeight: 700}}>배부른 개발자 <span style={{fontWeight: 400, fontSize: 14}}>@2donny</span></h2>
                                    <p style={{color: "#9A9A9A"}}>책좋아하는 학생입니다. 독서 TALK 하실분...</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center px-3 my-10">
                                <img 
                                    style={{width: 55, height: 55, borderRadius: 30}}
                                    src="https://api.xircle.org/1615853112677.jpg"
                                    alt="profile"
                                />
                                <div className="px-5 flex flex-col justify-center ">
                                    <p style={{color: "#9A9A9A", margin: 0, fontSize: 12}}>same interest 5</p>
                                    <h2 style={{margin: '0 0 5px 0', fontSize: 14, lineHeight: 1.5, fontWeight: 700}}>배부른 개발자 <span style={{fontWeight: 400, fontSize: 14}}>@2donny</span></h2>
                                    <p style={{color: "#9A9A9A"}}>책좋아하는 학생입니다. 독서 TALK 하실분...</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center px-3 my-10">
                                <img 
                                    style={{width: 55, height: 55, borderRadius: 30}}
                                    src="https://api.xircle.org/1615857659787.JPG"
                                    alt="profile"
                                />
                                <div className="px-5 flex flex-col justify-center ">
                                    <p style={{color: "#9A9A9A", margin: 0, fontSize: 12}}>same interest 5</p>
                                    <h2 style={{margin: '0 0 5px 0', fontSize: 14, lineHeight: 1.5, fontWeight: 700}}>배부른 개발자 <span style={{fontWeight: 400, fontSize: 14}}>@2donny</span></h2>
                                    <p style={{color: "#9A9A9A"}}>책좋아하는 학생입니다. 독서 TALK 하실분...</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center px-3 my-10">
                                <img 
                                    style={{width: 55, height: 55, borderRadius: 30}}
                                    src="https://api.xircle.org/1615859277221.jpeg"
                                    alt="profile"
                                />
                                <div className="px-5 flex flex-col justify-center ">
                                    <p style={{color: "#9A9A9A", margin: 0, fontSize: 12}}>same interest 5</p>
                                    <h2 style={{margin: '0 0 5px 0', fontSize: 14, lineHeight: 1.5, fontWeight: 700}}>배부른 개발자 <span style={{fontWeight: 400, fontSize: 14}}>@2donny</span></h2>
                                    <p style={{color: "#9A9A9A"}}>책좋아하는 학생입니다. 독서 TALK 하실분...</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center px-3 my-10">
                                <img 
                                    style={{width: 55, height: 55, borderRadius: 30}}
                                    src="https://api.xircle.org/1615863666967.jpeg"
                                    alt="profile"
                                />
                                <div className="px-5 flex flex-col justify-center ">
                                    <p style={{color: "#9A9A9A", margin: 0, fontSize: 12}}>same interest 5</p>
                                    <h2 style={{margin: '0 0 5px 0', fontSize: 14, lineHeight: 1.5, fontWeight: 700}}>배부른 개발자 <span style={{fontWeight: 400, fontSize: 14}}>@2donny</span></h2>
                                    <p style={{color: "#9A9A9A"}}>책좋아하는 학생입니다. 독서 TALK 하실분...</p>
                                </div>
                            </div>
                        </section>

                        {/* University  */}
                        <Drawer show={!isLoadingFriend && univClicked} clicked={() => setUnivClicked(false)} type="univ">
                            <section className="flex flex-row justify-between mx-5 my-5">
                                <p>학교를 선택하세요.</p>   
                                <img 
                                    onClick={() => setUnivClicked(false)}
                                    style={{width: 20, height: 20}}
                                    className="cursor-pointer"
                                    src="/close-outline.svg"
                                    alt="close"
                                />
                            </section>
                            <section className="flex flex-row justify-between mx-5">
                                <div>
                                    <img />
                                    <p style={{fontWeight: 300, fontSize: 13}}>고려대</p>
                                </div>
                                <div>
                                    <img />
                                    <p style={{fontWeight: 300, fontSize: 13}}>연세대</p>
                                </div>
                                <div>
                                    <img />
                                    <p style={{fontWeight: 300, fontSize: 13}}>한양대</p>
                                </div>
                            </section>
                            <section className="flex flex-row justify-between mx-5">
                                <div>
                                    <img />
                                    <p style={{fontWeight: 300, fontSize: 13}}>서강대</p>
                                </div>
                                <div>
                                    <img />
                                    <p style={{fontWeight: 300, fontSize: 13}}>성균관대</p>
                                </div>
                                <div>
                                    <img />
                                    <p style={{fontWeight: 300, fontSize: 13}}>서울대</p>
                                </div>
                            </section>
                        </Drawer>
                        
                        {/* Age */}
                        <Drawer show={!isLoadingFriend && ageClicked} clicked={() => setAgeClicked(false)} type="age">
                            <section className="flex flex-row justify-between mx-5 my-5">
                                <p>나이대를 설정하세요.</p>   
                                <img 
                                    className="cursor-pointer"
                                    onClick={() => setAgeClicked(false)}
                                    style={{width: 20, height: 20}}
                                    src="/close-outline.svg"
                                    alt="close"
                                />
                            </section>
                            <section className="flex flex-row justify-between mx-5">
                                <input type="range" min="1" max="100" defaultValue="50"/>
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
                                    ) : <div style={{width: 175, height: 175, borderRadius: 100, backgroundColor :"#2F51F0", opacity: .25, zIndex: 999, position: 'absolute', left: '50%', top: '47%', transform: 'translate(-50%, -50%)'}}></div>}
                                </div>
                                <p style={{color: "#8D8D8D", fontSize: 12, margin: '5px 0'}}>내위치 {addr || location}</p>

                                <label style={{fontSize: 16, color: "#2F51F0", margin: '15px', textAlign: 'right'}}>{rangeValue}km</label>
                                <input 
                                    type="range"
                                    min="3" 
                                    max="100" 
                                    defaultValue="13"
                                    onChange={(e) => rangeChangeHandler(e)}
                                />
                            </section>
                        </Drawer>
                    </section>

                )}
                
            </div>
        </Layout>
    )
}

export default SearchFriend;