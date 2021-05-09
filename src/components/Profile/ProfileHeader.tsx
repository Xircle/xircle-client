import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Notifications } from 'react-ionicons'
import { Menu } from 'react-ionicons'
import { Link } from 'react-router-dom';
type Props = {
    displayName: string
}
function ProfileHeader ({ displayName }: Props) {
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
            <IconBlock>
                <Menu
                    onClick={() => console.log('hi')}
                    color={'#00000'} 
                    title={'hamburger'}
                    height="40px"
                    width="40px"
                />
            </IconBlock>
        </ProfileHeaderBlock>
    )
}

const ProfileHeaderBlock = styled.div`
    display: flex;
    justify-content: space-around;
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
`

const IconBlock = styled.a`
    background-color: #F9F9F9;
    box-shadow: -10px -10px 30px #FFFFFF, 10px 10px 20px rgba(174, 174, 192, 0.3);
    border-radius: 50%;
    color: black;
    padding: 10px;
    cursor: pointer;
`
export default ProfileHeader;