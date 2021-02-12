import React from 'react';
import Layout from './Components/layout';
import BackgroundImg from '../public/yk.png'; 

const App = () => {
  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <section className="h-screen">
            <div className="bg-fixed" style={{backgroundImage: `url("${BackgroundImg}")`}}>

            </div>

          </section>
        </div>
      </Layout>
    </>
  );
}

export default App;
