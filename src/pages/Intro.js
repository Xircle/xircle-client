import React, { useEffect } from 'react';
import manHalf from '../images/man_half.jpeg';
import womanHalf from '../images/woman_half.jpeg';
import airpod_bg from '../images/airpod_bg.png';
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
        <section style={{minHeight: '100vh'}} className="h-full w-full">
          <section className="relative">
            <div className="h-screen w-full overflow-visible">
              <video autoPlay loop muted playsInline typeof="video/mp4" className="h-screen object-cover" src="/Intro/intro-video.mp4"></video>
              <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>
            </div>
            <div  style={{transform: "translate(-50%, -50%)", position: 'absolute', left: '50%', top: '35%', textAlign: 'center'}}>
              <div data-aos="fade-up" data-aos-duration="2000">
                <h1
                  style={{fontSize: 20, lineHeight: 2}} 
                  className="font-bold text-white"
                >
                  요즘 대학생들의
                </h1>
                <h1 style={{fontSize: 33, wordBreak: 'keep-all'}} className="text-white m-0 font-extrabold">XIRCLE, 써클</h1>
                <button 
                  onClick={() => history.push('/start')} 
                  className=" px-16 py-3 text-white mt-10 rounded-3xl bg-transparent-600 border-2 hover:bg-white hover:text-black focus:outline-none"
                > 
                  신청하기
                </button>
                <p style={{color: 'white', fontSize: '12px', margin: '10px 0 5px', wordBreak: 'keep-all', whiteSpace: 'nowrap'}}>[베타서비스] 서연고서성한포카 대상</p>
                <p style={{color: 'white', fontSize: '10px',  wordBreak: 'keep-all', whiteSpace: 'nowrap'}}> 고려대/연세대 재학생들이 만든 프로젝트입니다.</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between" style={{position: 'absolute', bottom: 100, left: "50%", transform: 'translate(-50%, 0)'}}>
              <img 
                style={{width: 12, height: 12}}
                src="/Intro/prefix_keyboard_arrow_left_24px.svg"
                alt="arrow"
              />
              <span style={{color: 'white', margin: '0 10px'}}>Xircle 소개</span>
            </div>
          </section>
        </section>

        {/* 2번째 slide */}
        <section style={{minHeight: '100vh', height: '100%', padding: '0px 0 30px 0', backgroundColor: '#fff'}}>
          <section className="h-full relative overflow-hidden">

            {/* 내용 */}
            <div style={{padding: '30px 20px', marginBottom: 30}}>
              <div className="px-4 mt-14">
                <h1 data-aos="zoom-out" data-aos-duration="2000" data-aos-offset="200" style={{fontSize: 35, fontWeight: 'bold', lineHeight: '3.2rem', whiteSpace: 'pre-line', position: "relative", zIndex: 10}}>대학생들만의 <br /> 새로운 <span style={{color: "#2F51F0"}}>네트워킹</span> 클럽 <br/> XIRCLE</h1> 
              </div>
            </div>

            {/* 원 */}
            <div style={{height: 600}} className="relative">
              <div style={{width: "450px", height: '450px', borderRadius: 450, backgroundColor: "#1F1F1F", position: 'absolute', left: -85, boxShadow: '20px 30px 15px 1px rgba(0, 0, 0, 0.2)'}}>
                <div style={{paddingLeft: 80}} className="w-full relative">
                  <div className="px-6 mt-16 mb-10">
                    <p style={{color: "#fff", marginBottom: 13, fontSize: 20}}>What is XIRCLE?</p>
                    <p style={{color: 'white'}}>취향과 성향이 잘 맞는 사람과 대화하며 <br/> 네트워킹 할 수 있는 상위대학기반소셜소통 서비스입니다.</p>
                  </div>
                  <div className="px-6 my-0">
                    <p style={{color: "#fff", marginBottom: 13, fontSize: 20}}>How?</p>
                    <p style={{color: "#fff", margin: "10px 0"}}>새내기분들 졸업생분들 모두 가능하세요.</p>
                    <p style={{color: "#fff", marginBottom: 13, fontSize: 13}}>베타테스트 단계로 서울대, 고려대(서울), 연세대(서울), 카이스트, 포스텍, 서강대, 성균관대, 한양대(서울)만을 대상으로 진행됩니다. </p>
                    <p style={{color: '#2F51F0', fontSize: 13}}>[인증방법] 학교이메일 인증 / 이메일이 없다면 학생증으로 진행. <br/>  *  다른 학교 추후 확대 예정입니다. 공지는 INSTAGRAM</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* 3번째 slide  */}
        <section style={{minHeight: '100vh', height: '100%', padding: '30px 0', backgroundColor: "#F7F7FA", borderStyle: 'hidden'}}>
          <section className="relative">
            <div style={{padding: '60px 20px'}}>
              
              {/* 내용 */}
              <div className="px-4">
                <h1 data-aos="fade-right" data-aos-duration="2000" style={{fontSize: 35, fontWeight: 'bold', lineHeight: '3.2rem', whiteSpace: 'pre-line', position: "relative", zIndex: 10}}>검증된 인맥 <br /> 오직 XIRCLE 에서만 <br/> 가능한 일 </h1> 
                <div className="my-12">
                  <h3 style={{fontSize: 16}}>이메일 인증을 통해서 들어온 사람들만의 <br/>새로운 형태의 <span style={{color: "#2F51F0"}}>네트워킹</span> </h3>
                  <p style={{}}>또 다른 인맥을 형성하세요</p>
                </div>

                <div style={{marginTop: 100}}>
                  <div className="my-20 text-center">
                    <p id="user_number" style={{color: "#2F51F0", fontSize: 30, fontWeight: 'bold'}}>+1716명</p>
                    <h5 style={{margin: "10px 0"}}>기존 1차 TEST(연고링) 가입자 <br/> 9일만에 누적 1,700명이상 <br/> </h5>
                    <span>  ※ 연고링이 XIRCLE로 서비스명이 변경되었습니다.</span>
                  </div>
                  <div className="my-10 text-center">
                    <p style={{color: "#2F51F0", fontSize: 30, fontWeight: 'bold'}}>56:44</p>
                    <h5 style={{margin: "10px 0"}}>남성 56% 여성 44% 이상적인 성비</h5>
                    <p style={{color: "#949393", fontSize: 12}}>※ XIRCLE은 단순 소개팅앱이 아닙니다. 대학친구사귀기 목적 </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* 후기 Slide  */}
        <section style={{ height: '100%', backgroundColor: '#F7F7FA', border: 'none'}}>
          <section style={{border: 'none'}} className="relative">
          <div style={{padding: '60px 20px'}}>
              {/* 작은 원 */}
              <div style={{width: "72px", height: '72px', boxShadow: "-10px 10px 10px rgba(0, 0, 0, 0.25)", borderRadius: 300, backgroundColor: "#1F1F1F", position: 'absolute', top: -36, left: '50%', transform: 'translate(-50%, 0%)'}}>
                <div className="relative w-full h-full">
                  <img 
                    style={{position: 'absolute', top: '50%', left: "50%", transform: 'translate(-50%, -50%)'}}
                    src="/Intro/prefix_keyboard_arrow_left_24px.svg"
                    alt="arrow"
                  />
                </div>
              </div>
              <div className="px-4 mt-20">
                <p style={{color: "#2F51F0", fontSize: 25, marginBottom: 10, fontWeight: 'bold'}}>XIRCLE 친구들 리얼 후기</p>
                <p style={{fontSize: 10}}>※1차 테스트 ( 연고링 ) 실제 참여하신 분들께서 자발적으로 남겨주신 후기입니다.</p>
              </div>

              <div className="px-2 py-5">
                <div style={{padding: "15px 15px 10px 15px", borderRadius: 10, boxShadow: '0px 0px 50px 5px rgba(0, 0, 0, 0.08)'}} className="my-5">
                  <p style={{fontWeight: '400', fontSize: 13}}>외부 20대를 만나기 위한 허들이 높아요.<br/> 물리적으로도 떨어져 있고 아마 물리적 거리가 근본 원인인 것 같아요. <strong>그래서 다른 사람들을 만날 장벽을 낮춰주는 이런 플랫폼이 반가워요.</strong></p>
                  <p style={{fontSize: 10, textAlign: "right"}}>서울대 2**님</p>
                </div>
                <div style={{padding: "15px 15px 10px 15px", borderRadius: 10, boxShadow: '0px 0px 50px 5px rgba(0, 0, 0, 0.08)'}} className="my-5">
                  <p style={{fontWeight: '400', fontSize: 13}}>여기서 친하게 지내다보니 연락을 계속 하게 되어서 <strong>남친 만들었습니다!</strong> 너무 감사합니다ㅎㅎㅎ  </p>
                  <p style={{fontSize: 10, textAlign: "right"}}>연세대 연*** 님 </p>
                </div>
                <div style={{padding: "15px 15px 10px 15px", borderRadius: 10, boxShadow: '0px 0px 50px 5px rgba(0, 0, 0, 0.08)'}} className="my-5">
                  <p style={{fontWeight: '400', fontSize: 13}}>학교 안에서만 우물안 개구리 같다는 생각을 계속 했는데 <strong>다양한 친구들을 만날 수 있어서 너무 좋네요////..</strong>관심사같은 친구들하고 랩가사 제작했습니다 ㅋㅋㅋㅋ </p>
                  <p style={{fontSize: 10, textAlign: "right"}}>고려대 루**님</p>
                </div>
                <div style={{padding: "15px 15px 10px 15px", borderRadius: 10, boxShadow: '0px 0px 50px 5px rgba(0, 0, 0, 0.08)'}} className="my-5">
                  <p style={{fontWeight: '400', fontSize: 13}}>개발자님 정말 감사합니다. <br/> 사실 이 프로그램을 처음 접했을때 그리 기대하지 않았는데 <strong>세상에서 제일 잘 맞는 사람이랑 만날 기회가 생겼습니다.</strong> 적절한 시국에 데이트 앱처럼 개인정보를 드러내지 않아 부담스럽지 않게 사람을 만날 수 있는 좋은 프로그램이라고 생각합니다ㅎㅎ 진심으로요! 다른 사람들이 이걸 알아줬으면 좋겠네요.<br/></p>
                  <p style={{fontSize: 10, textAlign: "right"}}>서울대 2**님</p>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* 에어팟 Slide  */}
        <section style={{
          minHeight: '100vh', 
          height: '100%', 
          padding: '30px 0', 
          backgroundColor: "black",
          backgroundImage: `url(${airpod_bg})`,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',  
        }}>
          <section className="relative overflow-hidden">
            <div style={{padding: '60px 20px'}}>
              {/* 내용 */}
              <div className="px-4">
                <h1 style={{fontSize: 35, color: "white", fontWeight: 'bold', lineHeight: '3.5rem', whiteSpace: 'pre-line', position: "relative", zIndex: 10}}>지금, XIRCLE <br /> 사전신청을 <br/> 해야 하는 이유 </h1> 
                <h5 style={{fontSize: 14, color: '#2F51F0', lineHeight: 2}}>사전신청하면 에어팟이 공짜 <br/> 이벤트 자세히 보기   > </h5>
                <p style={{color: 'white'}}>현재 베타테스트 단계로 <br/> 서울대, 고려대(서울), 연세대(서울), <br/> 카이스트, 포스텍, 서강대, 성균관대, 한양대(서울)만을 <br/> 대상으로 진행됩니다. </p>
                <div>
                  <img 
                    style={{width: 340, height: 340, objectFit: 'contain', marginLeft: 100}}
                    src="/Intro/airpod_prize.png"
                    alt="airpod"
                  />
                </div>
              </div>
              {/* 작은 원 */}
            </div>
          </section>
        </section>

        {/* Background Image */}
        {/* <section style={{minHeight: '100vh', height: '100%'}}>
          <section 
            style={{
              backgroundImage: `url(${manHalf})`,
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
                
              </div>
            </div>
          </section>
          <section 
            style={{
              backgroundImage: `url(${womanHalf})`,
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
                
              </div>
            </div>
          </section>
        </section> */}

        {/* 마지막 Q & A */}
        <section style={{minHeight: '100vh', height: '100%', padding: '30px 0', backgroundColor: "#F7F7FA"}}>
          <section className="relative">
            <div style={{padding: '60px 20px'}}>
              {/* 내용 */}
              <div className="px-4">
                <h1 style={{color: "#2F51F0", fontSize: 35, fontWeight: 'bold', lineHeight: '3.5rem', whiteSpace: 'pre-line', position: "relative", zIndex: 10}}>XIRCLE Q&A </h1> 
                <div className='mt-10'>
                  <h2 style={{fontSize: 20, margin: 0, fontWeight: 'bold', lineHeight: '3.5rem', whiteSpace: 'pre-line', position: "relative", zIndex: 10}}>XIRCLE 소개팅앱인가요? </h2> 
                  <div style={{color: "#7C7C7C", marginTop: 5 }}>
                    <p style={{fontSize: 16, marginBottom: 5}} className=" font-light"><strong>언론에 소개팅어플로 소개되었던 연고링. 그러나</strong></p>
                    <p style={{fontSize: 12}}>연고링의 목적은 대학친구 사귀기였습니다. 연고링의 리뉴얼 버전 XIRCLE은 단순 소개팅앱이 아닙니다. 목적은 ‘새로운 네트워킹’입니다. 소개팅 미팅도 가능하지만 부차적인 부분입니다.</p>
                  </div>
                </div>
                {/* 대학원생도 가능한가요? */}
                <div className="my-5">
                  <h2 style={{fontSize: 20, margin: 0, fontWeight: 'bold', lineHeight: '3.5rem', whiteSpace: 'pre-line', position: "relative", zIndex: 10}}>대학원생/ 졸업생도 가능한가요?  </h2> 
                  <div style={{color: "#7C7C7C", marginTop: 5 }}>
                    <p style={{fontSize: 16, marginBottom: 5}} className=" font-light"><strong>네 가능합니다. </strong></p>
                    <p style={{fontSize: 12}}>비슷한 업종에 계시는 현직자 분들 끼리의 네트워킹도 장려하고 있습니다.</p>
                  </div>
                </div>
                {/* 신상및 얼굴 공개해야하나요? */}
                <div className="my-5">
                  <h2 style={{fontSize: 20, margin: 0, fontWeight: 'bold', lineHeight: '3.5rem', whiteSpace: 'pre-line', position: "relative", zIndex: 10}}>신상및 얼굴 공개해야 하나요?  </h2> 
                  <div style={{color: "#7C7C7C", marginTop: 5 }}>
                    <p style={{fontSize: 16, marginBottom: 5}} className=" font-light"><strong>XIRCLE은 대학기반 새로운 SNS 입니다. </strong></p>
                    <p style={{fontSize: 12}}>그렇기에 프로필사진과 올리시는 사진은 모두 사용자분의 자유이며 원활한 네트워킹을 위해 공개되는 필수적인 정보 외에는 모두 자유입니다. </p>
                  </div>
                </div>
                {/* 개인정보 */}
                <div className="my-5">
                  <h2 style={{fontSize: 20, margin: 0, fontWeight: 'bold', lineHeight: '3.5rem', whiteSpace: 'pre-line', position: "relative", zIndex: 10}}>개인정보 </h2> 
                  <div style={{color: "#7C7C7C", marginTop: 5 }}>
                    <p style={{fontSize: 12}}>XIRCLE은 이용자의 사전 동의 없이는 이용자의 개인정보를 함부로 공개하지 않으며 이용자가 제공한 모든 정보는  필요한 용도 이외로는  사용되지 않으며 이용 목적이 변경될 시에는 이를 알리고 동의를 구할 것입니다.</p>
                  </div>
                </div>

                <div style={{fontSize: 12, margin: '120px 0 50px 0'}} className="text-center">
                  <p>  연고링이 XIRCLE로 서비스명이 변경되었습니다. </p>
                  <p>  궁금증이 있으시다면? 카카오톡 채널[XIRCLE]로 문의주세요. </p>
                  <a style={{color: 'goldenrod', margin: '20px 0', display: 'block'}} href="https://pf.kakao.com/_kDxhtK"> 고객센터 바로가기 </a>
                </div>

                </div>
              </div>
          </section>
        </section>

        <footer style={{height: '40vh', padding: '50px 20px 60px'}}>
          <div style={{color: '#D9D9D9'}}>
            <p style={{margin: 0}}>고객센터 (팀) 연고링</p> <br/>
            <p style={{margin: 0}}>각종 문의 : <a style={{color: '##4183c4'}} href="https://pf.kakao.com/_kDxhtK">[XIRCLE] 카카오톡 채널</a></p>
            <p style={{margin: 0}}>이메일 문의 : <a style={{color: '##4183c4'}} href="https://www.instagram.com/ykring_official/">XIRCLE 인스타그램</a></p>
            <p style={{margin: 0}}>비즈니스 문의 : <a style={{color: '##4183c4'}} href="https://www.instagram.com/ykring_official/">XIRCLE 인스타그램   010 8033 6028</a></p>
            <br/>
            <p style={{margin: 0}}>XIRCLE 인스타그램</p> 
            <p style={{margin: 0}}>XIRCLE 페이스북</p>  
            <p style={{margin: 0}}>XIRCLE 유튜브 채널 [오픈 예정]</p>
          </div>
        </footer>

      </>
    </Layout>
  );
}

export default Intro;
