import React from 'react';
import { Link } from 'react-router-dom';
import Footer_nav from '../components/footer_nav';
import Layout from '../components/layout';
import Banner from '../components/banner';

const MyProfile = () => {
    return (
        <div className="w-full">
            <Layout>

                {/* Profile Container */}
                <section style={{height: '30%'}} className="px-3 py-3">
                    hi
                </section>

                {/* Album Container */}
                <section style={{height: '70%'}} className="px-3 py-3">
                    hello
                </section>
                
                {/* footer */}
            </Layout>
        </div>
    )
}

export default MyProfile;