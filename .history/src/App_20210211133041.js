import React, {useState, useEffect} from 'react';
import Layout from './Components/layout';
import bgImg from './images/yk.png';
import Modal from './Components/UI/modal';

const App = () => {
  const [isclicked, setClicked] = useState(false);

  return (
    <>
      <Layout>
        <section className="h-screen">
          <Modal show={isclicked} clicked={() => setClicked(false)}>
            <div className="my-10 text-2x">
              <h1>계정 만들기</h1>
            </div>
            <div>
              <span>로그인을 함으로써 연고링 이용약관에 동의합니다. 연고링은 학교 인증 기반 웹 어플리케이션으로서 인증하기 위해서는 학교 메일로 인증해야합니다.</span>
            </div>
          </Modal>
          <div 
            style={{
              backgroundImage: `url(${bgImg})`,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',  
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="flex flex-col items-center w-full h-full" style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
              <h1 className="w-full pt-56 text-5xl md:text-7xl lg:text-7xl font-bold text-white text-center leading-normal md:leading-normal lg:leading-normal">가슴뛰는 대학생활 <br /> 연고링과 함께</h1>
              <button onClick={() => setClicked(true)} className="font-sans text-white w-48 h-16 mt-10 rounded-3xl bg-transparent-600 border-2 hover:bg-white hover:text-black focus:outline-none">계정 만들기</button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default App;
