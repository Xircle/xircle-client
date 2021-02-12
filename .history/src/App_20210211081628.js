import React from 'react';
import Layout from './Components/layout';
import bgImg from './images/yk-1.png';

const App = () => {
  return (
    <>
      <Layout>
        <section className="h-screen">
          {/* <img 
            src="http://www.veritas-a.com/news/photo/201310/18134_4435_4218.jpg" alt="bgImg"
          /> */}
          <div 
            style={{
              backgroundImage: `url("http://www.veritas-a.com/news/photo/201310/18134_4435_4218.jpg")`,
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
