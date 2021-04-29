/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import airpod_bg from '../images/airpod_bg.png';
import airpod from '../images/my-profile/airpod.svg';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Layout from '../components/layout';


const Intro = ({ history }: RouteComponentProps) => {
  const [tkInLocalStorage, setTkInLocalStorage] = useState<string | null>(null);
  const [userIDInLocalStorage, setUserIDInLocalStorage] = useState<string | null>(null);

  useEffect(() => {
    Aos.init();
    setTkInLocalStorage(localStorage.getItem('tk'));
    setUserIDInLocalStorage(localStorage.getItem('_UID'));
  }, []);

  return (
    <Layout isIntro footerNone>
      <>
        {/* 1번째 Slide */}
        <section css={css`min-height: 100vh;`}>
          <section css={css`position: relative;`}>
            <div css={css`height: 100vh;`}>
              <video 
                css={css`
                  object-fit: cover; 
                  height: 100vh;
                `} autoPlay loop muted playsInline preload="metadata" src="/Intro/intro-video.mp4" width="100%"
              >
                Your browser doesn't support video.
              </video>
              <div css={css`position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5);`}></div>
            </div>

            <div 
              css={css`
                position: absolute;
                left: 50%;
                top: 40%;
                text-align: center;
                transform: translate(-50%, -50%);
              `}
            >
              <div data-aos="fade-up" data-aos-duration="2000">
                  <h1
                    css={css`
                      font-size: 20px;
                      font-weight: normal;
                      color: #fff;
                      margin-bottom: 15px;
                    `}
                  >
                    연고대생 프로필 모음집
                  </h1>
                  <h1 
                    css={css`
                      font-size: 36px;
                      line-height: 50px;
                      word-break: keep-all;
                      font-weight: 800;
                      color: #ffffff;
                    `}
                  >
                    XIRCLE에서 네트워킹하자!
                  </h1>
                  {tkInLocalStorage && userIDInLocalStorage ? ( //바로 프로필 페이지로 보내기
                      <button 
                        onClick={() => window.location.href = 'my-profile'} 
                        css={css`
                          width: 256px;
                          height: 56px;
                          margin-top: 50px;
                          background-color: #F8FAFD;
                          border-radius: 60px;
                          border-radius: 60px;
                          &:focus {
                            outline: none;
                          }
                          &:active {
                            outline: none;
                            background-color: #d1d6db
                          }
                        `}
                      > 
                        <p 
                          css={css`
                            font-weight: 700; 
                            font-size: 18px;
                        `}>친구들 프로필 보기 </p>
                      </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => history.push('/select')} 
                        css={css`
                          width: 256px;
                          height: 56px;
                          margin-top: 50px;
                          background-color: #F8FAFD;
                          border-radius: 60px;
                          border-radius: 60px;
                          &:focus {
                            outline: none;
                          }
                          &:active {
                            outline: none;
                            background-color: #d1d6db
                          }
                        `}
                      > 
                      <p css={css`
                            font-weight: 700; 
                            font-size: 18px;
                        `}>
                          친구들 프로필 보기
                      </p>
                      </button>
                    </>
                  )}
                  <h3
                    onClick={() => history.push('/select')}
                    css={css`
                      color: #18A0FB;
                      font-weight: 800;
                      font-size: 18px;
                      margin-top: 30px;
                      cursor: pointer;
                    `}
                  >
                    로그인하기
                  </h3>
              </div>
            </div>
            
            <div 
              css={css`
                display: flex;
                align-items: center;
                position: absolute;
                bottom: 150px;
                left: 50%;
                transform: translate(-50%, 0);
              `}
            >
              <img 
                width="12px"
                height="12px"
                src="/Intro/prefix_keyboard_arrow_left_24px.svg"
                alt="Xircle 소개"
              />
              <span 
                css={css`
                  color: #fff;
                  margin: 0 10px;
                  font-weight: lighter;
                `}
              >
                Xircle 소개
              </span>
            </div>
          </section>
        </section>

        {/* 2번째 slide */}
        <section 
          style={{minHeight: '100vh', height: '100%', padding: '30px 15px 30px', backgroundColor: '#fff'}}>
          <section>
            {/* 내용 */}
            <div style={{marginBottom: 30}}>
              <div css={css`padding: 0px 20px; margin-top: 70px;`}>
                <h1 
                  data-aos="zoom-out" 
                  data-aos-duration="2000" 
                  data-aos-offset="200" 
                  css={css`
                    font-size: 35px;
                    font-weight: bold;
                    line-height: 45px;

                  `}
                >
                  대학생친구들과 <br /> 새로운 <span style={{color: "#2F51F0"}}>네트워킹!</span><br/> XIRCLE</h1> 
              </div>
            </div>

            <div 
              css={css`
                padding: 0px 20px; 
                margin-top: 70px;`
              }
            >
              <img 
                src="/Intro/circle_man.png"
                alt="남자"
              />
              <h1
                css={css`
                  font-weight: 700;
                  font-size: 18px;
                  line-height: 28px;
                  margin: 5px 0;
                `}
              >XIRCLE이 뭔가요?</h1>
              <p css={css`line-height: 22px; font-size: 13px;`}>코로나로 네트워킹이 어려워진 <br/> 대학생들을 위해서 만든 SNS입니다.</p>
              
            </div>
            

            <div 
              css={css`
                padding: 0px 20px; 
                margin-top: 70px;`
              }
            >
              <img 
                src="/Intro/circle_woman.png"
                alt="여자"
              />
              <h1
                css={css`
                  font-weight: 700;
                  font-size: 18px;
                  line-height: 28px;
                  margin: 5px 0;
                `}
              >어떻게 가입해요?</h1>
              <p css={css`line-height: 22px; font-size: 13px; margin: 10px 0;`}>신입생 졸업생 대학원생 모두 가능합니다.</p>
              <h1 
                css={css`
                  font-weight: 700;
                  line-height: 20px;
                  font-size: 13px;
              `}>
                베타테스트 단계로 서울대, 고려대(서울), 연세대(서울) <br/> 만을 대상으로 진행됩니다.</h1>
              <p
                css={css`
                  color: #007FFF;
                  line-height: 20px;
                  margin: 10px 0;
                  font-size: 13px;
                `}
              >[인증방법] 학교이메일 인증 / 학생증&포털사진인증 <br/> ※다른학교 추후 확대 예정입니다. 공지는  INSTAGRAM </p>
            </div>
            
          </section>
        </section>

        {/* 3번째 slide  */}
        <section 
          css={css`
            height: 100%;
            padding: 30px 0;
            background-color: #F7F7FA;
            border-style: hidden;
          `}
        >
          <section css={css`position: relative;`}>
            <div css={css`padding: 60px 20px;`}>
              
              {/* 내용 */}
              <div css={css`padding: 0 1rem;`}>
                <div data-aos="fade-right" data-aos-duration="2000">
                  <h1 
                    css={css`
                      font-size: 35px;
                      font-weight: bold;
                      line-height: 3.2rem;
                      word-break: keep-all;
                      position: relative;
                      z-index: 10;
                    `}
                  >
                    새로운 친구와의 <br /> 연결, XIRCLE 에서 <br/> 경험하세요! 
                  </h1> 
                  <div css={css`margin: 2rem 0;`}>
                    <h3 style={{fontSize: 16, lineHeight: 1.5, marginBottom: 5}}>인증을 통해서 들어온 친구들과의 <br/> 믿을수 있는 <span css={css`color: #007FFF;`}>네트워킹</span> </h3>
                  </div>
                </div>

                <div css={css`margin-top: 100px;`}>
                  <div className="my-20 text-center">
                    <p 
                      id="user_number" 
                      css={css`
                        font-weight: 700;
                        font-size: 35px;
                        line-height: 42px;
                        margin-right: 20px;
                        color: #007FFF;
                      `}
                    >
                      + 1,716명
                    </p>
                    <h5 
                      css={css`
                        margin: 10px 0;
                        font-size: 18px;
                        color: #1F1F1F;
                        line-height: 1.5;
                      `}
                    >
                      기존 1차 TEST 가입자 <br/> 9일만에 누적 1,700명이상 <br/> </h5>
                    <span 
                      css={css`
                        color: #7C7C7C;
                        font-size: 12px;
                        font-weight: 500;
                      `}
                    > ※ 1차 테스트는 서연고서성한 대학으로 진행.</span>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* 후기 Slide  */}
        <section style={{ height: '100%', backgroundColor: '#F7F7FA', border: 'none'}}>
          <section  className="relative">
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

              <div className=" mt-20">
                <p style={{color: "#12121D", fontSize: 25, marginBottom: 10, fontWeight: 'bold'}}>XIRCLE 친구들 리얼 후기</p>
                <p 
                  css={css`color: #8C94A4; font-size: 12px; word-break: keep-all; font-weight: bold;`}
                >
                  ※1차 테스트 실제 참여하신 분들께서 자발적으로 남겨주신 후기입니다.</p>
              </div>

              <ReviewContainer>
                <ImageContainer>
                  <img
                    css={css`
                      object-fit: cover;
                      transform: scale(1.7);
                      margin-bottom: 10px;
                    `} 
                    src="/Intro/User1.png"
                    alt="유저1"
                  />
                  <ReviewerInfo>
                    서울대 2**님
                  </ReviewerInfo>
                </ImageContainer>

                <ReviewComment>
                  <p>외부 20대를 만나기 위한 허들이 높아요. <span className="bolder">그래서 다른 사람들을 만날 장벽을 낮춰주는 이런 플랫폼이 반가워요.</span></p>
                </ReviewComment>
              </ReviewContainer>

              <ReviewContainer>
                <ReviewComment>
                  <p>여기서 정보공유하다가 친하게 지내다보니 연락을 계속 하게 되어서 <span className="bolder">찐친 만들었습니다! &gt;&lt; </span></p>
                </ReviewComment>

                <ImageContainer>
                  <img
                    css={css`
                      object-fit: cover;
                      transform: scale(1.7);
                      position: relative;
                      left: -7px;
                      margin-bottom: 10px;
                    `} 
                    
                    src="/Intro/User2.png"
                    alt="유저2"
                  />
                  <ReviewerInfo>
                    연세대 연**님
                  </ReviewerInfo>
                </ImageContainer>

              </ReviewContainer>

              <ReviewContainer>
                <ReviewComment>
                  <p><span className="bolder">다양한 친구들을 만날 수 있어서 너무  좋네요////.. </span>관심사같은 친구들하고 랩가사 제작했습니다 ㅋㅋ</p>
                </ReviewComment>
                <ImageContainer>
                  <img
                    css={css`
                      object-fit: cover;
                      transform: scale(1.7);
                      position: relative;
                      left: -10px;
                      bottom: 5px;
                      margin-bottom: 20px;
                    `} 
                    src="/Intro/User3.png"
                    alt="유저3"
                  />
                  <ReviewerInfo>
                    고려대 루**님
                  </ReviewerInfo>
                </ImageContainer>

              </ReviewContainer>

              <ReviewContainer>
                <ImageContainer>
                  <img
                    css={css`
                      object-fit: cover;
                      transform: scale(1.7);
                      position: relative;
                      right: -15px;
                      margin-bottom: 10px;
                    `} 
                    
                    src="/Intro/User4.png"
                    alt="유저4"
                  />
                  <ReviewerInfo>
                    고려대 청****님
                  </ReviewerInfo>
                </ImageContainer>

                <ReviewComment>
                  <p>사실 이 프로그램을 처음 접했을때 그리 기대하지 않았는데 <span className="bolder">세상에서 제일 잘 맞는 사람이랑 만날 기회가 생겼습니다. </span>적절한 시국에 사람을 만날 수 있는 좋은 프로그램이라고 생각합니다ㅎㅎ 진심으로요!</p>
                </ReviewComment>
              </ReviewContainer>
            </div>
          </section>
        </section>

        {/* Background Image */}
        <section css={css`margin: 30px 0;`}>
          <PreviewContainer>
            <PreviewText>
              나만의 <span className="blue">프로필</span> <br/>만들기
            </PreviewText>
            <PreviewText>
              <p>나를 가장 잘 표현 할 수 있는 프로필</p>
            </PreviewText>
            <PreviewImg
              src="/Intro/preview_1.png"
              alt="preview_1"
            />
          </PreviewContainer>

          <PreviewContainer>
            <PreviewText>
              원하는 설정으로 <br/> 친구들 <span className="blue">탐색</span>
            </PreviewText>
            <PreviewText>
              <p>관심사, 학교, 위치, 나이, 성별로 필터링</p>
            </PreviewText>
            <PreviewImg
              src="/Intro/preview_2.png"
              alt="preview_2"
            />
          </PreviewContainer>

          <PreviewContainer>
            <PreviewText>
              1:1 Chat 으로<br/> <span className="blue">소통하기</span> 
            </PreviewText>
            <PreviewText>
              <p>프로필을 보고 친해지고 싶은 친구와</p>
            </PreviewText>
            <PreviewImg
              src="/Intro/preview_3.png"
              alt="preview_3"
            />
          </PreviewContainer>

          <PreviewContainer>
            <PreviewText>
              내가 원하는 <br/> <span className="blue">네트워킹</span> 즐기기
            </PreviewText>
            <PreviewText>
              <p>소모임/스터디/번개/미팅 등등</p>
            </PreviewText>
            <PreviewImg
              src="/Intro/preview_4.png"
              alt="preview_4"
            />
          </PreviewContainer>
          
        </section>

        {/* 에어팟 Slide  */}
        <section 
          css={css`
            padding: 40px 0;
            margin: -83px 0;
            background: black;
            background-image: url(${airpod_bg});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          `}
        >
          <section>
            <div css={css`padding: 60px 20px;`}>
              {/* 내용 */}
              <div css={css`padding: 0 1rem;`}>
                <h1 
                  css={css`
                    font-size: 35px;
                    color: #ffffff;
                    font-weight: bold;
                    line-height: 3.5rem;
                  `}
                >-5/15 <br/> 지금 가입하면 <br/> 에어팟 프로 0원</h1> 
                <button
                  onClick={() => window.location.href = 'https://www.instagram.com/xircle_official/'}
                  css={css`
                    background-color: #007FFF;
                    width: 184px;
                    height: 50px;
                    border-radius: 60px;
                    color: #fff;
                    font-weight: 700;
                    font-size: 16px;
                    margin-top: 20px;
                    &:hover {
                      background-color: #4593fc;
                    }
                    &:active {
                      background-color: #2272eb;
                    }
                    &:focus {
                      outline: none;
                    }
                  `}
                >
                  이벤트 자세히 보기 &gt;
                </button>
                <div 
                  css={css`
                    height: 275px;
                    width: 252px;
                    margin: 100px 0 0 80px;
                    object-fit: contain;
                    background-size: cover;
                    background-image: url(${airpod});
                  `}
                >
                </div>
              </div>
              {/* 작은 원 */}
            </div>
          </section>
        </section>

        {/* 마지막 Q & A */}
        <section
          css={css`padding: 80px 0 0;`} 
        >
          <section>
            <div
              css={css`padding: 60px 20px;`}
            >
              {/* 내용 */}
              <div className="px-4">
                <h1 
                  css={css`
                    color: #007FFF;
                    font-size: 35px;
                    font-weight: bold;
                    margin-bottom: 50px;
                  `}
                >
                    XIRCLE QNA </h1> 
                
                <QNAContainer>
                  <h1>XIRCLE 만든이유.</h1>
                  <h1 className="gray">코로나로 어려워진 네트워킹의 기회 해결</h1>
                  <p>코로나로 인해 대학친구 사귀기가 어려워진 문제를 해소하고자 고려대 연세대 재학생들이 만든 서비스 입니다. * 웹사이트</p>
                </QNAContainer>

                <QNAContainer>
                  <h1>대학원생/ 졸업생도 가능한가요?</h1>
                  <h1 className="gray">네 물론입니다.</h1>
                  <p>현재 졸업생/대학원생 분들도 많이 있습니다.  </p>
                </QNAContainer>

                <QNAContainer>
                  <h1>신상및 얼굴 공개해야 하나요?</h1>
                  <h1 className="gray">XIRCLE은 새로운 SNS 입니다.</h1>
                  <p>프로필사진과 올리시는 사진은 모두 사용자분의 자유이며 원활한 네트워킹을 위해 공개되는 필수적인 정보외에는 모두 자유입니다. </p>
                </QNAContainer>

                <QNAContainer>
                  <h1>개인정보</h1>
                  <p>이용자의 사전 동의 없이는 개인정보를 함부로 공개하지 않습니다. 
                    모든 정보는  필요한 용도 이외로는  사용되지 않으며 
                    이용 목적이 변경될 시에는 이를 알리고 동의를 구할 것입니다.</p>
                </QNAContainer>

                <div css={css`font-size: 12px; margin: 80px 0 50px 0; text-align: center;`}>
                  <p>궁금증이 있으시다면? 카카오톡 채널[XIRCLE]로 문의주세요. </p>
                  <a 
                    css={css`
                      color: #A7B0C0;
                      margin: 20px 0;
                      display: block;
                    `}
                    href="https://pf.kakao.com/_kDxhtK"
                  > 고객센터 바로가기 </a>
                </div>

                <button 
                  onClick={() => history.push('/select')} 
                  css={css`
                    width: 315px;
                    height: 56px;
                    border-radius: 30px;
                    background-color: #000;
                    color: #fff;
                    font-weight: 700;
                    font-size: 18px;
                    &:hover {
                      background-color: #333d4b;
                    }
                    &:focus {
                      outline: none;
                    }
                    &:active {
                      background-color: #000;
                    }
                    
                  `}
                > 
                  친구들 프로필 보기
                </button>
                </div>
              </div>
          </section>
        </section>

      </>
    </Layout>
  );
}

const ReviewContainer = styled.div`
  margin: 30px 0;
  padding: 0 10px;
  display: flex;
  justify-content: center;
`;
const ReviewComment = styled.div`
  padding: 25px 12px;
  border: 1px solid #007FFF;
  white-space: pre-line;
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  box-sizing: border-box;
  color: #007FFF;
  .bolder {
    font-weight: 700;
  }
`;
const ReviewerInfo = styled.p`
  font-size: 10px;
  white-space: nowrap;
  color: #007FFF;
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PreviewContainer = styled.div`
  background-color: #F5F9FE;
  display: flex;
  flex-direction: column;
  border: none;
`;

const PreviewText = styled.div`
  font-weight: 700;
  font-size: 34px;
  line-height: 42px;
  text-align: center;
  .blue {
    font-weight: 700;
    font-size: 34px;
    line-height: 42px;
    color: #007FFF;  
  }
  p {
    color: #85869A;
    font-size: 17px;
    margin: 20px 0;
  }
`

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 50px 0;
`;

const QNAContainer = styled.div`
  margin: 30px 0;
  h1 {
    color: #1F1F1F;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    margin: 10px 0;
  }
  .gray {
    color: #A7B0C0;
    font-size: 16px;
    font-weight: 700;
  }
  p {
    color: #A7B0C0;
    font-size: 12px;
    line-height: 18px;
  }
`;



export default Intro;
