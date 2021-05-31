/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, useEffect, ComponentProps, useState } from 'react';
import { css } from '@emotion/react';
import AuthLayout from './AuthLayout';
import styled from '@emotion/styled';
import { CameraOutline } from 'react-ionicons';
import FixedBottomModal from '../UI/FixedModalCTA';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { preUserJoinThunk } from '../../store/modules/auth';
import { NotificationsOutline } from 'react-ionicons';
import Button from '../UI/Button';
import Error from '../Error';

interface Props extends ComponentProps<typeof AuthLayout> {
  onNext: () => void;
}

export default function AuthProfileImage({ onNext, ...props }: Props) {
  const [show, setShow] = useState(true);
  const [profileImgSrc, setProfileImgSrc] = useState<string | null>('');
  const [profileFile, setProfileFile] = useState<File>();
  const dispatch = useAppDispatch();

  const { displayName, email, password, phoneNumber } = useAppSelector(
    (store) => store.auth.data,
  );
  const { data, status, error } = useAppSelector((store) => store.auth);
  const {
    gender,
    adj,
    isPublic,
    job,
    isGraduate,
    location,
    latitude,
    longitude,
    age,
    interestArr,
  } = useAppSelector((store) => store.profile.data);

  useEffect(() => {
    if(data.token)
      onNext();
  }, [data.token, onNext]);

  const uploadProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;

    const files = e.target.files;
    const __file = files[0];
    const __size = files[0].size;

    if (__size > 10000000) {
      // 10MB 이상이면 용량 제한
      return alert(
        '사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. ',
      );
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(__file);
    fileReader.onload = (e) => {
      setProfileImgSrc(e.target!.result as string);
    };

    setProfileFile(__file);
  };

  const submitHandler = () => {
    if (!profileFile) return alert('프로필 이미지를 선택해주세요!');
    const formData = new FormData();

    const data = {
      latitude,
      longitude,
      location,
      isPublic,
      isGraduate,
      age,
      adj,
      job,
      displayName,
      email,
      password,
      phoneNumber,
      gender,
      introText: '',
      interestArr,
    };
    formData.append('profileImgSrc', profileFile);
    formData.append('data', JSON.stringify(data));

    dispatch(preUserJoinThunk(formData));
  };

  return (
    <>
      <AuthLayout {...props}>
        <Container>
          {profileImgSrc ? (
            <ProfileImg src={profileImgSrc} alt="프로필사진" />
          ) : (
            <CameraOutline color={'#A7B0C0'} height="32px" width="32px" />
          )}
          <p
            css={css`
              color: #a7b0c0;
              margin: 0px;
            `}
          >
            여기를 클릭하세요
          </p>
          <input
            css={css`
              position: absolute;
              display: block;
              opacity: 0;
              top: 0;
              left: 50%;
              transform: translate(-50%, 0);
              width: 300px;
              height: 300px;
              border-radius: 150px;
              cursor: pointer;
            `}
            type="file"
            accept="image/x-png,image/png,image/svg,image/jpeg,image/jpg,image/gif"
            onChange={(e) => uploadProfileImg(e)}
          />
        </Container>
      </AuthLayout>

      {status === 'pending' && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 999;
          `}
        >
          <NotificationsOutline
            color={'#000'}
            height="45px"
            width="45px"
            shake
          />
          <p>잠시만 기다려주세요...</p>
        </div>
      )}

      <Button fullWidth={false} onClick={submitHandler}>
        업로드
      </Button>

      {error && (
        <FixedBottomModal
          show={show}
          clicked={() => setShow(!show)}
          mandatory={false}
        >
          <Error />
        </FixedBottomModal>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto 0px;
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: 160px;
  background-color: #f8fafd;
`;

const ProfileImg = styled.img`
  position: absolute;
  display: block;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 300px;
  height: 300px;
  border-radius: 150px;
  object-fit: cover;
  cursor: pointer;
`;
