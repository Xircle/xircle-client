/** @jsxImportSource @emotion/react */
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react'; 
import { ArrowForward, Briefcase, Earth, LocationSharp } from 'react-ionicons'
import { Link } from 'react-router-dom';
import ageGenerator from '../ageGenerator';

interface Props {
    profileImgSrc: string
    adj: string
    job: string
    displayName: string
    isGraduate: boolean | null
    isPublic: boolean | null
    isLocationPublic: boolean | null
    gender: string
    univ: string
    location: string
    age: number | null
    resume?: string
    workPlace?: string
    introText: string
}

function ProfileImageContainer ({
    ...data
}: Props) {
    const { profileImgSrc, adj, job, displayName, isGraduate, isPublic, isLocationPublic, gender, univ, location, age, resume,  workPlace, introText } = data;
    return (
        <>
            <ProfileImageContainerBlock>
                <ProfileImageBlock>
                    <Link to="/my-profile/edit">
                        <ProfileImage 
                            src={profileImgSrc}
                            alt="profile image"
                        />
                    </Link>
                    <Link to="/friend-profile">
                        <ArrowForward
                            style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)', right: '-23%', color: 'black', cursor: 'pointer'}}
                            color={'#00000'} 
                            title={"랜덤조회 버튼"}
                            height="26px"
                            width="26px"
                        />
                    </Link>
                </ProfileImageBlock>
                <ProfileDescriptionBlock>
                    <h3>{adj} {job} {displayName}</h3>
                    <div className="TagBlock">
                        {isPublic ? 
                            <div className="Tag">{univ} {isGraduate ? '졸업' : '재학중'}</div> : null
                        }
                        <div className="Tag">{ageGenerator(age!)}</div>
                        <div className="Tag">{gender}</div>
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
                <IntroRow>
                    <Briefcase
                        color={'#8C94A4'} 
                        css={{ marginRight: 10 }}
                        title="회사"
                        height="18px"
                        width="18px"
                    />
                    <strong>{workPlace}</strong> &nbsp;운영중
                </IntroRow>
                <IntroRow>
                    <Earth 
                        color={'#8C94A4'} 
                        css={{ marginRight: 10 }}
                        title="활동"
                        height="18px"
                        width="18px"
                    />
                    {resume}
                </IntroRow>
                {isLocationPublic ? (
                <IntroRow>
                    <LocationSharp 
                        color={'#8C94A4'} 
                        css={{ marginRight: 10 }}
                        title="위치"
                        height="18px"
                        width="18px"
                    />
                    {location}
                </IntroRow>
                ) : null}
                <IntroTextRow>{introText}</IntroTextRow>
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
        cursor: pointer;
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
    display: flex;
    margin: 8px 0;
    color: #12121D;
    strong {
        font-weight: 700;
    }
`;

const IntroTextRow = styled.div`
    margin-top: 20px;
`;

export default ProfileImageContainer;