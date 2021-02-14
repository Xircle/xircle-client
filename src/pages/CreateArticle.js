import React from 'react';
import { Link } from 'react-router-dom';
import Footer_nav from '../components/footer_nav';
import Layout from '../components/layout';
import Banner from '../components/banner';

const CreateArticle = () => {
    return (
        <div className="w-full">
            <Layout>
                {/* Navigation */}
                <nav className="flex flex-row items-center px-3 py-5">
                    <Link to="/person">
                        <img
                            src="arrow-back-outline.svg"
                            className=" rounded-2xl"
                            width={25}
                            height={25}
                        />
                    </Link>
                    <h1 
                        style={{marginRight: '25px'}}
                        className="text-md font-bold w-full text-center"
                    >
                        글 작성
                    </h1>
                </nav>

                {/* 배너 */}
                <Banner />

                {/* main */}
                <section className="w-full ">
                    <textarea 
                        placeholder="글을 작성해 보세요. 글을 쓰면 대화신청확률을 높일 수 있습니다. 다른 친구에게 상처가 되는 비방/욕설은 삼가해주세요."
                        style={{height: '250px', border: '1px solid gray'}}
                        className="my-3 px-3 py-5 w-full text-sm placeholder-gray-300">
                    </textarea>
                    <Link to="/person">
                        <button onClick={() => alert('글이 작성되었습니다!')} className=" w-full block mx-auto mt-1 border-2 rounded-3xl px-5 py-3 bg-black text-white  focus:outline-none">작성하기</button>
                    </Link>
                </section>

                
                {/* footer */}
                <Footer_nav/>
            </Layout>
        </div>
    )
}

export default CreateArticle;
