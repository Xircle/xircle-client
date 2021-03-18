import React from 'react';

const airpodEvent = ({ history }) => {
    return (
        <div style={{backgroundColor: '#000'}}>
            <nav style={{height: '80px'}} className="flex flex-row items-center justify-between ">
                <img
                    onClick={() => history.goBack()} 
                    style={{width: '15px', height: '15px', marginLeft: 15, cursor: 'pointer'}}
                    src="/event/arrow_left_white.svg"
                    alt="back"
                />
            </nav>
            <section>
                <img 
                    style={{margin: '0 auto'}}
                    src="/event/airpod_event1.svg"
                    alt="event1"
                />
                <img 
                    src="/event/final_event.jpg"
                    alt="event2"
                />

                <section style={{width: '90%', margin: '0 auto'}}>
                    <button 
                        onClick={() => history.push('/my-profile')}
                        style={{ backgroundColor: '#F7F7FA', border: '1px solid #7C7C7C'}} 
                        className="w-full rounded-lg py-3 text-black focus:outline-none"
                    > 내 프로필 캡쳐하기 </button>
                    <button 
                        onClick={() => history.push('/developer-profile')}
                        style={{backgroundColor: '#F7F7FA', border: '1px solid #7C7C7C'}} 
                        className="w-full rounded-lg py-3 mt-3 mb-5 text-black focus:outline-none"
                    > 개발자 프로필 캡쳐하기 </button>
                </section>
            </section>

            <section style={{height: 100}}>

            </section>
        </div>
    )
}

export default airpodEvent;