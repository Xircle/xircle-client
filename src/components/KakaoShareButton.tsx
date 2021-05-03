import React, { useEffect } from 'react'

declare global {
  interface Window {
    kakao: any
  }

}
export const createKakaoButton = (btnId: string) => {
  const kakao = window.kakao;
  if (!kakao.isInitialized()) { //중복 방지
    // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
    kakao.init(process.env.REACT_APP_KAKAO_KEY)
  }
  
  kakao.Link.createDefaultButton({
    // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
    container: btnId,
    objectType: 'feed',
    content: {
      title: 'Xircle',
      description: '새로운 네트워킹 클럽, Xircle',
      imageUrl: 'https://xircle.org/Logo/xircleLogo.png',
      link: {
        mobileWebUrl: 'https://xircle.org/',
        webUrl: 'https://xircle.org/',
      },
    },
    social: {
      likeCount: 190,
      commentCount: 215,
      sharedCount: 103,
    },
    buttons: [
      {
        title: 'Xircle 방문하기',
        link: {
          mobileWebUrl: 'https://xircle.org/',
          webUrl: 'https://xircle.org/',
        },
      }
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
        <img style={{width: '64px', height: '64px', borderRadius: '120px', objectFit: 'cover'}} src="/setting/kakao.svg" alt="kakao-share-icon" />
      </button>
    </div>
  )
}
export default KakaoShareButton