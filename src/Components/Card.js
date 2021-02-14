import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';

const Card = ({ id, profileImg, description, displayName, contents, heartCnt, tags }) => {
    const [isHeartClicked, setHeartClicked] = useState(null);
    const [heartStateCnt, setHeartCnt] = useState(heartCnt);

    useEffect(() => {
        if(isHeartClicked === true) 
            setHeartCnt(heartStateCnt + 1);
        else if(isHeartClicked === false) 
            setHeartCnt(heartStateCnt - 1);
        else 
            setHeartCnt(heartCnt)
    }, [isHeartClicked]);

    return (
        <article className="my-2 mx-3 relative">
                {/* Profle */}
                <div className="flex flex-row">
                    <Link to={`/profile/${id}`}>
                        <img 
                            src={profileImg}
                            alt={displayName}
                            width={50}
                            height={50}
                            className="rounded-full object-cover m-0"
                        />
                    </Link>
                    <div className="mx-5">
                        {description.map((keyword, id) => (
                            <span key={id} className="text-xs"> {keyword} / </span>
                        ))}
                        <h1 className="text-lg font-bold">{displayName}</h1>
                    </div>
                    <div className="absolute right-0">
                        {/* Heart */}
                        <button onClick={() => setHeartClicked(!isHeartClicked)} className="px-2 py-2 focus:outline-none">
                            {isHeartClicked ? (
                                <img 
                                    src="/heart-red.png"
                                    height={18}
                                    width={20}
                                    alt="heart"
                                />
                            ) : (
                                <img 
                                    src="/NavImage/heart-outline.svg"
                                    height={20}
                                    width={20}
                                    alt="heart-outline"
                                />
                            )}
                        </button>
                        {/* Heart count */}
                        <p className="text-center">
                            {heartCnt}
                        </p>
                    </div>

                </div>
                
                {/* 글 내용 */}
                <Link to={`/article/${id}`}>
                    <h1 className=" text-xs my-3">{contents}</h1>
                </Link>

                {/* 태그 */}
                <div className="border-b-2">
                    {tags.map((tag, id) => (
                        <p key={id} className="px-3 inline-block mx-1 mb-3 text-xs text-2xs border-2 rounded-2xl text-gray-400">{tag}</p>
                    ))}
                </div>

        </article>
    )
}

export default Card;