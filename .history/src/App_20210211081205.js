import React from 'react';
import Layout from './Components/layout';
import bgImg from './images/yk-1.png';

const App = () => {
  return (
    <>
      <Layout>
        <section className="h-screen">
          <img 
            src={bgImg} alt="bgImg"
          />
          <div 
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundSize: "cover",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',  
              backgroundAttachment: 'fixed'
            }}
          />
            here
        </section>
      </Layout>
    </>
  );
}

export default App;
