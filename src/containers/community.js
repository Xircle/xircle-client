import React from 'react';
import Card from '../components/Card';
import { useMediaQuery } from 'react-responsive';

const Community = ({ users }) => {
    const isIPhoneX = useMediaQuery({
        minDeviceHeight: 811     
    });
    const isPC = useMediaQuery({
        minDeviceHeight: 795
    });
    const isIPhon_6_7_8_Plus = useMediaQuery({
        minDeviceHeight: 735
    });
    const isIPhon_6_7_8 = useMediaQuery({
        minDeviceHeight: 666
    });
    const remainder = useMediaQuery({
        minDeviceHeight: 0
    });

    const MediaQueryArr = [
        {
            Query: isIPhoneX, // 811px
            height: '500px'
        }, 
        {
            Query: isPC,   // 795px
            height: '450px'
        }, 
        {
            Query: isIPhon_6_7_8_Plus, // 735px
            height: '420px'
        }, 
        {
            Query: isIPhon_6_7_8, // 666px
            height: '350px'
        },
        {
            Query: remainder, // 0px
            height: '300px'
        }
    ];

    // 뷰포트 크기에 따라 Scroll pannel의 height 계산
    let height = 0;
    for(let i = 0 ; i < 5; i++) {
        if(MediaQueryArr[i].Query === true){
            height = MediaQueryArr[i].height;
            break;
        }
    }
    console.log('users : ', users);
    return (
        <>
            <section 
                    style={{height: height}}
                    className="flex flex-col overflow-scroll relative"
                >
                    {users.map((person, id) => (
                        <Card 
                            key={id}
                            profileImg={person.profileImg} 
                            description={person.description} 
                            displayName={person.displayName} 
                            heartCnt={person.heartCnt}
                            contents={person.contents}
                            tags={person.tags}
                        />
                    ))}                       
            </section>
        </>
    )
}

export default Community;