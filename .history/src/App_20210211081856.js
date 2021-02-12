import React from 'react';
import Layout from './Components/layout';
import bgImg from './images/yk.png';

const App = () => {
  return (
    <>
      <Layout>
        <section className="h-screen">
          <img 
            src={bgImg} alt="bgImg"
          />
          {/* <div 
            style={{
              backgroundImage: `url("http://www.veritas-a.com/news/photo/201310/18134_4435_4218.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',  
              backgroundAttachment: 'fixed'
            }}
          />
            here */}
        </section>
        <section className="h-screen">
            개인정보
        </section>
      </Layout>
    </>
  );
}

export default App;
