/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Notifications } from 'react-ionicons';
import { Menu } from 'react-ionicons';
import { Link } from 'react-router-dom';

type Props = {
  displayName: string;
  isFriendProfile?: boolean;
};

function ProfileHeader({ displayName, isFriendProfile }: Props) {
  if (isFriendProfile)
    return (
      <ProfileHeaderBlock>
        <p css={css`color: #12121D; font-weight: bold;`}>Xircle</p>
        <NameBlock onClick={() => alert("채팅 기능 개발중입니다!")}>chat하기 </NameBlock>
        <p css={css`cursor: pointer; width: 35px;`} onClick={() => alert("신고기능 개발중입니다!")}>신고</p>
      </ProfileHeaderBlock>
    );
  return (
    <ProfileHeaderBlock>
      <IconBlock href="https://www.notion.so/XIRCLE-1ac1183aa4804e8e9b6bdef420842155">
        <Notifications
          color={'#00000'}
          title="notification"
          height="40px"
          width="40px"
        />
      </IconBlock>
      <NameBlock> {displayName} </NameBlock>
      <Link to="/setting/profile">
        <IconBlock>
            <Menu
            onClick={() => console.log('hi')}
            color={'#00000'}
            title={'hamburger'}
            height="40px"
            width="40px"
            />
        </IconBlock>
      </Link>
    </ProfileHeaderBlock>
  );
}

const ProfileHeaderBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px 0;
`;

const NameBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222;
  width: 90px;
  height: 35px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 18px;
  color: #fff;
  cursor: pointer;
`;

const IconBlock = styled.a`
  background-color: #f9f9f9;
  box-shadow: -10px -10px 30px #ffffff, 10px 10px 20px rgba(174, 174, 192, 0.3);
  border-radius: 50%;
  color: black;
  padding: 10px;
  cursor: pointer;
`;
export default ProfileHeader;
