export const scrolltoTop = (setBtnClicked) => {
    setBtnClicked(true);
    const rootEl = document.documentElement;
    rootEl.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
};  