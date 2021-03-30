import React, { useState, useEffect } from 'react';

const Footer_nav = ({ history, footerNone }) => {
    const [selectedPage, setSelectedPage] = useState(4);

    useEffect(() => {
        const currPath = window.location.pathname;
        if(currPath === 'my-profile' || currPath === 'friend-profile') 
            setSelectedPage(4);
        else if(currPath === '/search')
            setSelectedPage(2);
        else if(currPath.includes('/my/article') || currPath.includes('/friend/article'))
            setSelectedPage(4);
        else
            return null;
    }, []);

    return (
        !footerNone && (
        <nav
            style={{width: 231, padding: '16px 0', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', borderRadius: 30 }}
            className="flex flex-row w-full justify-evenly"
        >
            {/* Diary */}
            <section>
                <img 
                    src={selectedPage === 1 ? '/NavImage/diary-outline.svg' : "/NavImage/diary.svg"}
                    alt="diary"
                    style={{width: 20, height:20, cursor: 'pointer'}}
                    onClick={() => history.push('/diary')}
                />
            </section>

            {/* Search */}
            <section>
                <img 
                    src={selectedPage === 2 ? '/NavImage/search-outline.svg' : "/NavImage/search.svg"}
                    alt="search"
                    style={{width: 20, height:20, cursor: 'pointer'}}
                    onClick={() => history.push('/search')}
                />
            </section>

            {/* Message  */}
            <section>
                <img 
                    src={selectedPage === 3 ? '/NavImage/message-outline.svg' : "/NavImage/message.svg"}
                    alt="chat"
                    style={{width: 20, height:20, cursor: 'pointer'}}
                    onClick={() => alert('채팅기능 개발중입니다. 4월 16일 런칭 후 만나요! ')}
                />
            </section>

            {/* 게시글 작성 */}
            <img 
                src={selectedPage === 4 ? "/NavImage/pencil-outline.svg" : "/NavImage/pencil.svg"}
                alt="pencil"
                style={{width: 20, height:20, cursor: 'pointer'}}
                onClick={() => history.push('/createArticle/1')}
            />
        </nav>
        )
    )
}

export default Footer_nav;