import React from 'react';

function SettingProgress({questionNum}) { 
    let ProgressPercent = '0%'; //인자로 들어온 Question Num을 Progress percent로 나타내기.

    if(questionNum === '1') {
        ProgressPercent = '10%';
    } else if (questionNum === '2') {
        ProgressPercent = '18%';
    } else if (questionNum === '3') {
        ProgressPercent = '30%';
    } else if (questionNum === '4') {
        ProgressPercent = '47%';
    } else if (questionNum === '5') {
        ProgressPercent = '62%';
    } else if (questionNum === '6') {
        ProgressPercent = '80%';
    } else if (questionNum === '7') {
        ProgressPercent = '87%';
    } else if (questionNum === '8') {
        ProgressPercent = '90%';
    } else if (questionNum === '9') {
        ProgressPercent = '93%';
    } else if (questionNum === '10') {
        ProgressPercent = '96%';
    } else if (questionNum === '11') {
        ProgressPercent = '110%';
    }


    return (
        <div 
            style={{
                width: `${ProgressPercent}`, 
                transition: 'all .3s ease-in', 
                border: '10px solid black',  
                borderTopRightRadius: '10px', 
                borderBottomRightRadius: '10px'
            }}
        >
        </div>   
    )
}

export default SettingProgress;