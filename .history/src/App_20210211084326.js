import React from 'react';
import Layout from './Components/layout';
import bgImg from './images/yk.png';

const App = () => {
  return (
    <>
      <Layout>

        <section className="h-screen">
          <div 
            style={{
              backgroundImage: `url(${bgImg})`,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',  
              backgroundAttachment: 'fixed'
            }}
          />
          <div>
            <h1 className="absolute text-4xl text-red z-10">가슴뛰는 대학생활 연고링과 함께.</h1>

          </div>
        </section>

        <section className="h-screen">
            개인정보
        </section>
      </Layout>
    </>
  );
}

export default App;
