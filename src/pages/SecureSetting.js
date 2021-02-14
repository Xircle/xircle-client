import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import Select from 'react-select';
import { 
    UniversityOptions, 
    UnivgroupedOptions,
    GenderOptions,
    GendergroupedOptions,
    AgeOptions,
    AgegroupedOptions,
    InterestOptions,
    InterestgroupedOptions,
} from '../model/person';
import { personCommunity } from '../model/person';

const SecureSetting = () => {
    
    return (
        <div className="w-full">
            <Layout>
                {/* Navigation */}
                <nav className="flex flex-row px-3 py-5"> 
                    <Link to="/person">
                        <img 
                            src="/arrow-back-outline.svg"
                            className="rounded-2xl"
                            width={25}
                            height={25}
                        />
                    </Link>
                    <h1 
                        style={{marginRight: '27px', color:"#30E3D2"}}
                        className="w-full text-md text-center text-md font-bold"
                    >
                        안전 설정하기
                    </h1>
                </nav>

                <section className="mt-3">
                    <div 
                        style={{
                            width: '90%',
                        }}
                        className="flex flex-row justify-between items-center mx-auto py-5 border-b-2 px-5"
                    >
                        <h1 className="text-md font-bold mr-3">학교</h1>
                        <Select
                            className="w-4/5"
                            defaultValue={UniversityOptions[1]}
                            options={UnivgroupedOptions}
                        />
                    </div>
                    <div 
                        style={{
                            width: '90%',
                        }}
                        className="flex flex-row justify-between items-center mx-auto py-5 mx-3 border-b-2 px-5"
                    >
                        <h1 className="text-md font-bold mr-3">학과</h1>
                        <Select 
                            className="w-4/5"
                            defaultValue={GenderOptions[1]}
                            options={GendergroupedOptions}
                        />
                    </div>
                    <div 
                        style={{
                            width: '90%',
                        }}
                        className="flex flex-row justify-between items-center mx-auto py-5 border-b-2 px-5"
                    >
                        <h1 className="text-md font-bold mr-3">지역</h1>
                        <Select
                            className="w-4/5"
                            defaultValue={AgeOptions[1]}
                            options={AgegroupedOptions}
                        />
                    </div>
                    <div 
                        style={{
                            width: '90%',
                        }}
                        className="flex flex-row justify-between items-center mx-auto py-5 border-b-2 px-5"
                    >
                        <h1 className="text-md font-bold mr-5">키</h1>
                        <Select
                            className="w-4/5"
                            defaultValue={InterestOptions[0]}
                            options={InterestgroupedOptions}
                        />
                    </div>
                    <Link to="/person">
                        <button 
                            onClick={() => alert('이제 안전하게 친구를 만들어봐요!')} 
                            className="border-2 rounded-full px-5 py-3 hover:text-white hover:bg-black focus:outline-none w-full mt-5"
                        >
                            안전 설정 완료
                        </button>
                    </Link>
                </section>

            </Layout>
        </div>
    )
}

export default SecureSetting;