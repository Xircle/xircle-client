import React from 'react';

const Footer_nav = ({ history, footerNone }) => {
    return (
        !footerNone && (
        <nav
            style={{width: 231, padding: '16px 0', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', borderRadius: 30 }}
            className="flex flex-row w-full justify-evenly"
        >
            {/* Search */}
            <section>
                <img 
                    src="/NavImage/search.svg"
                    alt="search"
                    style={{width: 20, height:20, cursor: 'pointer'}}
                    onClick={() => history.push('search')}
                />
            </section>

            {/* Message  */}
            <section>
                <img 
                    src="/NavImage/message.svg"
                    alt="message"
                    style={{width: 20, height:20, cursor: 'pointer'}}
                    onClick={() => alert('채팅기능 개발중입니다. 4월 16일 런칭 후 만나요! ')}
                />
            </section>

            {/* 게시글 작성 */}
            <img 
                src="/NavImage/pencil.svg"
                alt="pencil"
                style={{width: 20, height:20, cursor: 'pointer'}}
                onClick={() => history.push('/createArticle/1')}
            />
        </nav>
        )
    )
}

export default Footer_nav;