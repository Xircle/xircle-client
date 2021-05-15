/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ArrowBackOutline } from 'react-ionicons';
import AuthProgress from './AuthProgress';

interface Props {
	onBackClick?: () => void;
	step: number;
}

const AuthHeader = ({ step, onBackClick }: Props) => {
	return (
		<header>
			<div
				css={css`
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 1.5rem 2rem 0.5rem;
				`}
			>
				<button
					css={css`
						background-color: #f8fafd;
						width: 44px;
						height: 44px;
						border-radius: 22px;
						border: none;
						cursor: pointer;
						&:focus {
							outline: none;
						}
					`}
					onClick={onBackClick}
				>
					<ArrowBackOutline
						color={'#00000'}
						title={'뒤로가기'}
						height="30px"
						width="30px"
					/>
				</button>
				{step === 0 && (
					<p
						css={css`
							color: #007fff;
							font-size: 16px;
							font-weight: bold;
							cursor: pointer;
						`}
					>
						로그인하기
					</p>
				)}
			</div>
			{step >= 4 && <AuthProgress step={step} />}
		</header>
	);
};

export default AuthHeader;
