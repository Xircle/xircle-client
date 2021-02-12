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
                backgroundImage: `url("${bgImg}")`
              }}>

            </div>

          </section>
        </div>
      </Layout>
    </>
  );
}

export default App;
