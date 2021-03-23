import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions/index';
import Spinner from 'react-spinner-material';

const { kakao } = window;

const KakaoMap = ({ history }) => {
  const [isMapSupported, setIsMapSupported] = useState(true);
  const [location, setLocation] = useState('');
  const [addr, setAddr] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [isLoading ,setIsLoading] = useState(true);

  const addrRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    mapScript();
    
    return () => {
      setIsMapSupported(true);
      setLocation(null);
      setAddr(null);
      setLongitude(null);
      setLatitude(null);
    }
  }, [isLoading])

  // 콜백 함수
  const locationBtnHandler = useCallback((event) => {
    event.preventDefault();
    // set 하기전에, 잘 적었는지 위치 필터링 한번 해야함.
    const locationRegex = /^(서울|경기도|강원도|충청북도|충청남도|전라북도|전라남도|경상북도|경상남도|부산|제주|세종|대구|인천|광주|대전|울산)/;

    if(!addr) {
      if(!location.match(locationRegex))
        return alert('올바른 지역을 입력해주세요.');
    }

    const finalLocation = addr || location;
    dispatch(actions.addLocation(finalLocation, longitude, latitude));
    history.push('/setting/2'); 
  }, [addr, location, longitude, latitude]);

  const locationTextChangeHandler = useCallback((event) => {
    setLocation(event.target.value);
  }, []);

  // 런타임에 실행
  const mapScript = useCallback(() => {
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
            setLatitude(lat);
            setLongitude(lon);
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
            if (status === kakao.maps.services.Status.OK) {
                let detailAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
                detailAddr += result[0].address.address_name;
                
                const fullAddr = result[0].address.address_name; 
                const newAddr = fullAddr.split(' ');
                const displayAddr = '<p style="margin: 10px;"> ' + newAddr[0] + ' ' +  newAddr[1] +  '</p>';
                setAddr(newAddr[0] + ' ' + newAddr[1])
                setLongitude(mouseEvent.latLng.getLng());
                setLatitude(mouseEvent.latLng.getLat());
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
  }, [isLoading]);

  return (
    <div style={{opacity: isLoading ? 0.5 : 1, zIndex: 900}} className="flex flex-col items-center h-full relative">
      
      <div onClick={(e) => e.preventDefault()} id="map" style={{ width: '80%', height: isMapSupported ? 300 : 0}}>
        {isLoading ? (
            <div style={{position: 'absolute', zIndex: 100, left: '50%', top: '50%', transform: 'translate(-50%, 0)'}}>
                <Spinner
                    color="gray"
                />
            </div>
        ) : null}
      </div>

      <div style={{marginTop: 20}} className="h-full flex flex-row justify-center items-center pt-5">
        <p style={{marginBottom: 0, fontSize: 13}} className="mr-5">나는</p>
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
        <p style={{fontSize: 13}} className="text-lg ml-5">에 있어요.</p>
      </div>
      <button onClick={(e) => locationBtnHandler(e)} disabled={!addr && !location} className="w-full rounded-lg px-5 py-3 my-20 bg-gray-400 text-white focus:outline-none">맞습니다.</button>
    </div>
  )
}
export default KakaoMap