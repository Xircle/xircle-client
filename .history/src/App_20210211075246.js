import React from 'react';
import Layout from './Components/layout';
import bgImg from './public/yk.png'; 

const App = () => {
  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <section className="h-screen">
            <div 
              style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',  
                backgroundAttachment: 'fixed'
              }}
            />

          </section>
        </div>
      </Layout>
    </>
  );
}

export default App;
