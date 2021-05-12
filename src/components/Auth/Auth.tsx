import { useState, Fragment } from 'react'
import Header from './Header';
import Email from './Email';
import Layout from '../layout';
import Verification from './Verification';
import JoinStart from './JoinStart';

export default function Auth() {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep((step) => step + 1);
    }

    const prevStep = () => {
        if(step > 0) setStep((step) => step - 1);
    }

    const components = [
        <Email 
            title={"이메일 인증"}
            description={"이메일을 인증해주세요. \n XIRCLE은 고려대 연세대 학생들로만 진행중입니다."}
            onNext={handleNext}
        />,
        <Verification 
            title={"인증번호 입력"}
            description={`메일로 인증번호가 전송되었습니다. 이메일로 받은 인증번호를 입력해주세요`}
            onNext={handleNext}
        />,
        <JoinStart 
            title={"회원가입 시작"}
            description={"※ 개인정보는 XIRCLE 관련 중요 공지사항을 보낼때 이외에 절대 사용하지 않습니다."}
            onNext={handleNext}
        />
    ];

    return (
        <Layout>
            <Header step={step} onBackClick={prevStep}/>  
            {components.map((component, index) => {
                if(index === step)
                    return <Fragment key={index}>{component}</Fragment>

                return null;
            })}
        </Layout>
    )
}
