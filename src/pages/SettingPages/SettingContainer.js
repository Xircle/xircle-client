import React from 'react';
import SettingProgress from './SettingProgress/SettingProgress';
import SettingContents from './SettingContents/SettingContents';
import Layout from '../../components/layout';

const SettingContainer = ({ history, match }) => {
    const num = match.params.questionNum;
    return (
        <>
        {num !== '13' ? (
            <div className="w-full overflow-x-hidden">
                <Layout num={num} headerNone footerNone>
                    <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                        <img
                            onClick={() => history.goBack()} 
                            style={{width: '25px', height: '25px', cursor: 'pointer'}}
                            src="/arrow-back-outline.svg"
                            alt="back"
                        />
                    </nav>
                    <SettingProgress questionNum={num}/>
                    <SettingContents history={history} questionNum={num}/>
                </Layout>
            </div>
        ) : (
            <div className="w-full">
                <Layout headerNone footerNone>
                    <SettingContents history={history} questionNum={num}/>
                </Layout>
            </div>
        )}
        </>
    )
}
export default SettingContainer; 