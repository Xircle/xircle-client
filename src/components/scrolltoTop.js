export const scrolltoTop = (setBtnClicked) => {
    if(setBtnClicked)
      setBtnClicked(true);
    const rootEl = document.documentElement;
    rootEl.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
};  

export const scrolltoPostNum = (postNum) => {
  const rootEl = document.documentElement;
  let top;
  if(postNum === 0) // 짝수번째 post인경우
    top = 0;
  else if(postNum === 1) {
    top = 890;
  }else {
    top = 890 + 830*(postNum-1); // 890 + 860
  }
  console.log(top)
  rootEl.scrollTo({
    top,
    behavior: 'smooth'
  })
};  