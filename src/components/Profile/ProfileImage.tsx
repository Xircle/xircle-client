/** @jsxImportSource @emotion/react */
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react'; 
import { ArrowForward } from 'react-ionicons'
import { Link } from 'react-router-dom';

function ProfileImageContainer () {
    return (
        <>
            <ProfileImageContainerBlock>
                <ProfileImageBlock>
                    <Link to="/my-profile">
                        <ProfileImage 
                            src="https://api.xircle.org/7r1618730785216.png"
                            alt="profileImage"
                        />
                    </Link>
                    <ArrowForward
                        onClick={() => console.log('hi')}
                        style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)', right: '-23%', cursor: 'pointer'}}
                        color={'#00000'} 
                        title={"랜덤조회 버튼"}
                        height="26px"
                        width="26px"
                    />
                </ProfileImageBlock>
                <ProfileDescriptionBlock>
                    <h3>유학중인 미대생 @Yujoo</h3>
                    <div className="TagBlock">
                        <div className="Tag">고려대학교 졸업</div>
                        <div className="Tag">20초</div>
                        <div className="Tag">여</div>
                    </div>
                    <div 
                        onClick={() => alert("팔로우 기능 개발중이예요!")} 
                        className="TagBlock"
                    >
                        <div className="Follow">친구 0  </div>
                        <div className="Follow">팔로워 0 </div>
                        <div className="Follow">팔로잉 0 </div>
                    </div>
                </ProfileDescriptionBlock>
            </ProfileImageContainerBlock>
            <IntroTextBlock>
                <IntroRow><strong>Xircle</strong> 운영중</IntroRow>
                <IntroRow>XIRCLE 1기</IntroRow>
                <IntroRow>서울특별시 성동구</IntroRow>
                <IntroTextRow>예술을 좋아하고 스타트업에 관심이 있어요. 관련 있으신 분들과 이야기 나누고 싶네요 ✨</IntroTextRow>
            </IntroTextBlock>
        </>
    )
}

const ProfileImageContainerBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0 5px;
`;

const ProfileImageBlock = styled.div`
    position: relative;
`;

const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    margin: 0 auto;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
`;

const ProfileDescriptionBlock = styled.div`
    margin: 10px 0;
    h3 {
        color: #12121D;
        font-weight: bold;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
    }
    .Tag {
        background: #DBEDFF;
        border-radius: 3px;
        font-size: 12px;
        line-height: 32px;
        margin: 0 2px;
        padding: 0 7px;
        height: 28px;
    }
    .TagBlock {
        display: flex;
        justify-content: center;
    }
    .Follow {
        font-size: 12px;
        line-height: 32px;
        color: #A7B0C0;
        margin: 0 3px;
    }
`;

const IntroTextBlock = styled.div`
    margin: 0 0 10px;
    padding: 0 20px;
`;

const IntroRow = styled.div`
    margin: 5px 0;
    color: #12121D;
    strong {
        font-weight: 700;
    }
`;

const IntroTextRow = styled.div`
    margin-top: 20px;
`;

export default ProfileImageContainer;