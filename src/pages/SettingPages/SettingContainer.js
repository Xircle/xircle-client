import React, { useCallback, useState } from 'react';
import SettingProgress from './SettingProgress/SettingProgress';
import SettingContents from './SettingContents/SettingContents';
import Layout from '../../components/layout';

const SettingContainer = ({ history, match }) => {
    const num = match.params.questionNum;
    return (
        <div className="w-full overflow-x-hidden">
            <Layout headerNone footerNone>
                {num === '12' ? null : (
                    <>
                        <div style={{height: '2%'}}></div>
                        <nav style={{height: '7%', borderBottom: '1px solid #ccc'}} className="flex flex-row items-center justify-between border-b-2">
                            <p className="w-full text-lg text-center">회원가입</p>
                        </nav>
                        <SettingProgress questionNum={num}/>
                    </>
                )}
                <SettingContents history={history} questionNum={num}/>
            </Layout>
        </div>
    )
}
export default SettingContainer; 