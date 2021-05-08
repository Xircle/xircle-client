/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ArrowBackOutline } from 'react-ionicons'
import { EllipsisVerticalOutline, StarOutline } from 'react-ionicons'

export default function ChattingRoomHeader({ 
    profileImgSrc,
    displayName
} : { 
    profileImgSrc: string 
    displayName: string
}) {

    return (
        <RowItem
            css={css`
                align-items: center;
                box-shadow: 0px -4px 26px 8px rgba(51, 63, 85, 0.08);
                padding: 20px 20px;
            `}
        >
            <StyledLink to="/chat">
                <ArrowBackOutline
                    color={'#00000'} 
                    title={"뒤로가기"}
                    height="25px"
                    width="25px"
                />
            </StyledLink>
            <RowItem css={css`
                justify-content: space-between;
                width: 90%;
                align-items: center;
            `}>
                <RowItem css={css`align-items: center; margin-left: 30px;`}>
                    <img 
                        css={css`
                            width: 40px;
                            height: 40px;
                            border-radius: 20px;
                            margin-right: 10px;
                        `}
                        src={profileImgSrc} 
                        alt="프로필"
                    />
                    <p>{displayName}</p>
                </RowItem>
                <RowItem css={css`display: flex;`}>
                    <StarOutline
                        style={{margin: '0 10px'}}
                        color={'#E7ECF3'} 
                        title={"즐겨찾기"}
                        height="24px"
                        width="24px"
                    />
                    <EllipsisVerticalOutline
                        color={'#00000'} 
                        title={"설정"}
                        height="24px"
                        width="24px"
                    />
                </RowItem>
            </RowItem>
        </RowItem>
    )
}

const RowItem = styled.div`
    display: flex;
`;

const StyledLink = styled(Link)`
    color: black;
`;