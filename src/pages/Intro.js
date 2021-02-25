import React, {useState, useEffect} from 'react';
import bgImg from '../images/yk.png';
import Modal from '../components/UI/modal';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Layout from '../components/layout';


const Intro = ({ history }) => {

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Layout isIntro footerNone headerNone>
      <>
        {/* 1번째 Slide */}
        <section style={{}} className="h-screen w-full">
          <section className="relative">
            <div className="h-screen w-full overflow-visible">
              <video className="h-screen object-cover" src="/Intro/intro-video.mp4" autoPlay loop muted></video>
            </div>
            <div  style={{transform: "translate(-50%, -50%)", position: 'absolute', left: '50%', top: '50%', textAlign: 'center'}}>
              <div data-aos="fade-up" data-aos-duration="2000">
                <h1
                  style={{fontSize: 24}} 
                  className="font-bold text-white leading-10"
                >
                  요즘 대학생들의 <br/> 새로운 네트워킹
                </h1>
                <h1 style={{fontSize: 38}} className="text-white m-0 font-extrabold">XIRCLE</h1>
                <button 
                  onClick={() => history.push('/start')} 
                  className="px-8 py-3   text-white mt-10 rounded-3xl bg-transparent-600 border-2 hover:bg-white hover:text-black focus:outline-none"
                > 
                  사전 신청하기
                </button>
              </div>
            </div>
          </section>
        </section>

        {/* 2번째 slide */}
        <section style={{height: '100vh'}}>
        </section>
      </>
      {/* 메인 글귀 */}
      {/* <section 
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
          <div data-aos="fade-up" data-aos-duration="2500" className="text-center">
            <h1
              style={{fontSize: 24}} 
              className="w-full pt-56 font-bold text-white text-center leading-10"
            >
              요즘 대학생들의 <br/> 새로운 네트워킹
            </h1>
            <h1 style={{fontSize: 38}} className="text-white m-0 font-extrabold">XIRCLE</h1>
            <button 
              onClick={() => setClicked(true)} 
              className="px-8 py-3   text-white mt-10 rounded-3xl bg-transparent-600 border-2 hover:bg-white hover:text-black focus:outline-none"
            > 
              신청하기
            </button>
          </div>
        </div>
      </section> */}
    </Layout>
  );
}

export default Intro;
