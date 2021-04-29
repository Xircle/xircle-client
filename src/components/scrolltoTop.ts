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