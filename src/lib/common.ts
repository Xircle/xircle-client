export const scrolltoTop = () => {
    const rootEl = document.documentElement;
    rootEl.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
};  

export const scrolltoPostNum = (postNum: number) => {
  const rootEl = document.documentElement;
  let top;
  top = 760 * postNum;
  rootEl.scrollTo({
    top,
    behavior: 'smooth'
  })
};  

export const cardHeightGenerator = (idx: number) => {
  if(idx === 2 || idx === 5 || idx === 7 || idx === 10 || idx === 11) {
      if(idx === 5 || idx === 7 )
          return {
              height: 164,
              translateY: '-50px'
          }
      else if(idx === 10 || idx === 11)
          return {
              height: 164,
              translateY: '-100px'
          }
      else
          return {
              height: 164,
              translateY: '0px',
          }
  }else { // heigth : 111px
      if(idx === 3 || idx === 8 || idx === 9  ) {
          return {
              height: 111,
              translateY: '-50px',
          }
      }
      return {
          height: 111,
          translateY: '0px',
      }
  }
};