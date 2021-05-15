import { useState, Fragment } from 'react';
import AuthHeader from './AuthHeader';
import AuthEmail from './AuthEmail';
import Layout from '../layout';
import AuthVerification from './AuthVerification';
import AuthJoinStart from './AuthJoinStart';
import AuthLocattion from './AuthLocation';
import AuthGender from './AuthGender';

export default function Auth() {
	const [step, setStep] = useState(0);

	const handleNext = () => {
		setStep((step) => step + 1);
	};

	const prevStep = () => {
		if (step > 0) setStep((step) => step - 1);
	};

	const components = [
		<AuthEmail
			title={'이메일 인증'}
			description={
				'이메일을 인증해주세요. \n XIRCLE은 고려대 연세대 학생들로만 진행중입니다.'
			}
			onNext={handleNext}
		/>,
		<AuthVerification
			title={'인증번호 입력'}
			description={`메일로 인증번호가 전송되었습니다. 이메일로 받은 인증번호를 입력해주세요`}
			onNext={handleNext}
		/>,
		<AuthJoinStart
			title={'회원가입 시작'}
			description={
				'※ 개인정보는 XIRCLE 관련 중요 공지사항을 보낼때 이외에 절대 사용하지 않습니다.'
			}
			onNext={handleNext}
		/>,
		<AuthLocattion
			title={'지금 어디 있나요?'}
			description={
				'회원님의 도시 정보까지만 표시합니다. \n 프라이버시에 대해 걱정 마세요! \n 프로필 수정에서 공개 비공개 설정이 가능해요.'
			}
			onNext={handleNext}
		/>,
		<AuthGender
			title={'성별'}
			description={'성별을 선택해주세요.'}
			onNext={handleNext}
		/>,
	];

	return (
		<Layout>
			<AuthHeader step={step} onBackClick={prevStep} />
			{/* {components.map((component, index) => {
                if (index === step)
                    return <Fragment key={index}>{component}</Fragment>

                return null
            })} */}
			<AuthGender
				title={'성별'}
				description={'성별을 선택해주세요.'}
				onNext={handleNext}
			/>,
		</Layout>
	);
}
