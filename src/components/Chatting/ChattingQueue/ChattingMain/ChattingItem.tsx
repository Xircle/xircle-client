/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface IChattingItemProps {
    profileImgSrc: string
    adj: string
    job: string
    displayName: string
    date: string
    recentTalk: string
    read: boolean
}

export default function ChattingItem({ 
    profileImgSrc,
    adj,
    job,
    displayName,
    date,
    recentTalk,
    read
}: IChattingItemProps) {
    return (
        <div
            css={css`
                display: flex;
                padding: 15px 5px;
                &:active {
                    background-color: lightgray;
                }
            `}
        >
            <div css={css`
                position: relative;
                width: 56px;
                height: 56px;
                        
            `}>
                <img 
                    css={css`
                        border-radius: 50%;
                        width: 56px;
                        height: 56px;
                        object-fit: cover;
                    `}
                    src={profileImgSrc}
                    alt={displayName + '프로필'}
                />
                {!read && (
                    <div css={css`
                        position: absolute;
                        top: 20%;
                        right: 0;
                        background-color: #18A0FB; 
                        width: 10px; 
                        height: 10px;
                        border: 1px solid white;
                        border-radius: 6px;
                `} />
                )}
            </div>
            <div
                css={css`
                    display: flex; 
                    width: 80%;
                    justify-content: space-between;
                    align-items: center;
                `}
            >
                <LineCampBlock>
                    <EllipsText css={css`color: #262626; text-overflow: ellipsis; overflow: hidden;  font-weight: ${read ? '400' : '700'};`}>{adj} {job}{displayName}</EllipsText>
                    <EllipsText css={css`color: ${!read ? '#007FFF' : '#A7B0C0'}; font-size: 13px;`}>{recentTalk}</EllipsText>
                </LineCampBlock>
                <span css={css`color: #A7B0C0; white-space: nowrap; margin-bottom: 20px; font-size: 13px;`}>{date}</span>
            </div>
        </div>
    );
}

const LineCampBlock = styled.div`
    overflow: hidden;
    white-space: nowrap;
    margin-left: 15px;
`;

const EllipsText = styled.p`
    text-overflow: ellipsis;
`;