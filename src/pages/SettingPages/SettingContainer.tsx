import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SettingProgress from './SettingProgress/SettingProgress';
import SettingContents from './SettingContents/SettingContents';
import Layout from '../../components/layout';

interface MatchParams { 
    questionNum: string;
}

const SettingContainer = ({ history, match }: RouteComponentProps<MatchParams>) => {
    const num = match.params.questionNum;
    return (
        <>
        {num !== '7' ? (
            <div className="overflow-x-hidden">
                <Layout num={num} footerNone>
                    <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                        <img
                            onClick={() => history.goBack()} 
                            style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                            src="/arrow-back-outline.svg"
                            alt="back"
                        />
                    </nav>
                    <SettingProgress questionNum={num}/>
                    <SettingContents history={history} questionNum={num}/>
                </Layout>
            </div>
        ) : (
            <Layout footerNone>
                <SettingContents history={history} questionNum={num}/>
            </Layout>
        )}
        </>
    )
}
export default SettingContainer; 