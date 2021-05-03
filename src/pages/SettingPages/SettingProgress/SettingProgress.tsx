function SettingProgress({ questionNum }: { questionNum: string }) { 
    let ProgressPercent = '0%'; //인자로 들어온 Question Num을 Progress percent로 나타내기.

    if(questionNum === '1') {
        ProgressPercent = '10%';
    } else if (questionNum === '2') {
        ProgressPercent = '18%';
    } else if (questionNum === '3') {
        ProgressPercent = '30%';
    } else if (questionNum === '4') {
        ProgressPercent = '57%';
    } else if (questionNum === '5') {
        ProgressPercent = '72%';
    } else if (questionNum === '6') {
        ProgressPercent = '90%';
    }else {
        ProgressPercent = '0%';
    }

    return (
        <div 
            style={{
                width: `${ProgressPercent}`, 
                backgroundColor: 'black',
                transition: 'all .3s ease-in', 
                border: '5px solid black',  
                borderTopRightRadius: `10px`, 
                borderBottomRightRadius: '10px',
            }}
        >
        </div>   
    )
}

export default SettingProgress;