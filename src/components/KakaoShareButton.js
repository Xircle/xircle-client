import React, { useEffect } from 'react'

export const createKakaoButton = (btnId) => {
  const kakao = window.Kakao
  if (!kakao.isInitialized()) { //중복 방지
    // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
    kakao.init(process.env.REACT_APP_KAKAO_KEY)
  }
  kakao.Link.createDefaultButton({
    // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
    container: btnId,
    objectType: 'feed',
    content: {
      title: '연고링',
      description: '#대학생 #친구 #청춘 #20대',
      imageUrl: process.env.REACT_APP_FETCH_IMAGE_URL,
      link: {
        mobileWebUrl: 'https://2donny.github.io/',
        webUrl: 'https://2donny.github.io/',
      },
    },
    social: {
      likeCount: 133,
      commentCount: 255,
      sharedCount: 333,
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: 'https://2donny.github.io/',
          webUrl: 'https://2donny.github.io/',
        },
      },
      {
        title: '앱으로 보기',
        link: {
          mobileWebUrl: "https://2donny.github.io/",
          webUrl: 'https://2donny.github.io/',
        },
      },
    ],
  })
}

const KakaoShareButton = () => {
  useEffect(() => {
    createKakaoButton('#kakao-link-btn')
  }, [])

  return (
    <div style={{display: 'inline'}}>
      <button id="kakao-link-btn">
        <img style={{width: '64px', height: '64px', borderRadius: '120px', objectFit: 'contain'}} src="/kakao.png" alt="kakao-share-icon" />
      </button>
    </div>
  )
}
export default KakaoShareButton