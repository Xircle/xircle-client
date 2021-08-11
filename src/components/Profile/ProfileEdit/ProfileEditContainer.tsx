/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import Header from '../../UI/Header';
import Layout from '../../layout';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Title } from '../../Setting/SettingContainer';
import ProfileImage from './ProfileEditImage';
import { useAppSelector, useAppDispatch } from '../../../hooks/useSelector';
import ProfileEditDataRow from './ProfileEditDataRow';

interface Props {
  history: RouteComponentProps['history'];
}

export default function ProfileEditContainer({ history }: Props) {
  const [pageType, setPageType] = useState('default');

  const {
    adj,
    job,
    age,
    gender,
    location,
    introText,
    profileImgSrc,
    resume,
    displayName,
    isGraduate,
    univ,
    isPublic,
    isLocationPublic,
    workPlace,
  } = useAppSelector((store) => store.profile.data);

  const uploadPhoto = () => {};

  return (
    <Layout>
      <Header onBackClick={() => history.goBack()} />
      <Container>
        <Title>프로필 편집</Title>
        <ProfileImage
          profileImgSrc={profileImgSrc}
          displayName={displayName!}
          uploadPhoto={uploadPhoto}
        />
        <hr
          css={css`
            border: 1px solid #ebebeb;
          `}
        />
        <h1
          css={css`
            font-size: 18px;
            margin: 30px 0;
            color: #595959;
            font-weight: bold;
          `}
        >
          Profile
        </h1>
        <ProfileEditDataRow
          isLocationPublic={isLocationPublic!}
          location={location}
          onClicked={() => setPageType('location')}
        />
      </Container>
    </Layout>
  );
}
