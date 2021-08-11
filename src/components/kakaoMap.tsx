/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { css } from '@emotion/react';
import { useAppDispatch } from '../hooks/useSelector';
import Spinner from 'react-spinner-material';
import { addLocation } from '../store/modules/profile';
import Button from './UI/Button';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  onNext: () => void;
}

const kakao = window.kakao;

export default function KakaoMap({ onNext }: Props) {
  const [isMapSupported, setIsMapSupported] = useState(true);
  const [location, setLocation] = useState('');
  const [addr, setAddr] = useState('');
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    mapScript();
  }, [isLoading]);

  // 콜백 함수
  const locationBtnHandler = useCallback(
    (event) => {
      event.preventDefault();

      const finalLocation = addr || location;
      dispatch(
        addLocation({
          location: finalLocation,
          longitude,
          latitude,
        }),
      );

      onNext();
    },
    [addr, location, longitude, latitude],
  );

  const locationTextChangeHandler = useCallback((event) => {
    setLocation(event.target.value);
  }, []);

  // 런타임에 실행
  const mapScript = useCallback(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao()?.maps.LatLng(37.585568, 127.029391),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    let marker: any = null;
    const geocoder = new kakao.maps.services.Geocoder();
    const infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          const locPosition = new kakao.maps.LatLng(lat, lon);

          displayMarker(locPosition);

          // latitude, longitude로 현재 위치정보 반환하는 콜백함수.
          searchDetailAddrFromCoords(
            { lat: lat, lng: lon },
            function (result: any, status: boolean) {
              if (status === kakao.maps.services.Status.OK) {
                const fullAddr = result[0].address.address_name;
                const newAddr = fullAddr.split(' ');
                setAddr(newAddr[0] + ' ' + newAddr[1]);
              }
            },
          );
        },
        (err) => {
          // error 콜백함수
          console.log(err.message);
          if (err.code === err.PERMISSION_DENIED) {
            console.log('permission denied');
            setIsMapSupported(false);
            setIsLoading(false);
          } else if (err.code === err.TIMEOUT) {
            console.log('Time out');
            setIsMapSupported(false);
            setIsLoading(false);
          } else {
            console.log('something made error');
            setIsMapSupported(false);
            setIsLoading(false);
          }
        },
        { timeout: 8000, enableHighAccuracy: true },
      );
    } else {
      alert('현 브라우저에서 Geolocation을 지원하지 않습니다.');
      setIsMapSupported(false);
      setIsLoading(false);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition: any) {
      marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
      setIsLoading(false);
    }

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
      if (isLoading) return null;
      searchDetailAddrFromCoords(
        mouseEvent.latLng,
        function (result: any, status: boolean) {
          if (status === kakao.maps.services.Status.OK) {
            let detailAddr = !!result[0].road_address
              ? result[0].road_address.address_name
              : '';
            detailAddr += result[0].address.address_name;

            const fullAddr = result[0].address.address_name;
            const newAddr = fullAddr.split(' ');
            const displayAddr =
              '<p style="margin: 10px;"> ' +
              newAddr[0] +
              ' ' +
              newAddr[1] +
              '</p>';
            setAddr(newAddr[0] + ' ' + newAddr[1]);
            setLongitude(mouseEvent.latLng.getLng());
            setLatitude(mouseEvent.latLng.getLat());
            const content = displayAddr;

            // 마커를 클릭한 위치에 표시합니다
            if (!marker) return alert('새로고침 해주세요!');
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
        },
      );
    });

    function searchDetailAddrFromCoords(
      coords: any,
      callback: (result: any, status: boolean) => void,
    ) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      if (coords.lng) geocoder.coord2Address(coords.lng, coords.lat, callback);
      else geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
  }, [isLoading]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        position: relative;
        opacity: ${isLoading ? 0.5 : 1};
      `}
    >
      <div
        id="map"
        css={css`
          width: 80%;
          height: ${isMapSupported ? '300px' : '0px'};
        `}
        onClick={(e) => e.preventDefault()}
      >
        {isLoading && (
          <div
            css={css`
              position: absolute;
              z-index: 100;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            <Spinner color="#aaa" radius={30} stroke={5} visible />
          </div>
        )}
      </div>

      <div
        css={css`
          margin: 0 0 30px;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
        `}
      >
        <p
          css={css`
            font-size: 13px;
          `}
        >
          나는
        </p>
        {isMapSupported ? (
          <input
            css={css`
              width: 190px;
              padding: 0.75rem 1.25rem;
              border: none;
              &:focus {
                outline: none;
              }
            `}
            type="text"
            placeholder="거주지"
            value={addr}
            onChange={(e) => locationTextChangeHandler(e)}
          />
        ) : (
          <input
            placeholder="거주지"
            css={css`
              width: 190px;
              padding: 0.75rem 1.25rem;
              border: none;
              &:focus {
                outline: none;
              }
            `}
            type="text"
            onChange={(e) => locationTextChangeHandler(e)}
          />
        )}
        <p
          css={css`
            font-size: 13px;
          `}
        >
          에 있어요.
        </p>
      </div>

      <Button
        onClick={locationBtnHandler}
        disabled={!addr && !location}
        fullWidth={false}
      >
        확인
      </Button>
    </div>
  );
}
