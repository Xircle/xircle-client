import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyleRoot } from 'radium';
import Select from 'react-select';
import LoadingIndicator from 'react-loading-indicator';
import Footer_nav from '../components/footer_nav';
import Layout from '../components/layout';
import Banner from '../components/banner';
import Community from '../containers/community';
import Modal from '../components/UI/modal';
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

const Person = () => {
    // filtering state => 필터링 시작 여부
    const [isFiltering, setFiltering] = useState(false);
    const [FilteredUser, setFilteringUser] = useState(personCommunity);
    // button click state => 버튼 클릭 여부
    const [isUnivClicked, setUnivClicked] = useState(false);
    const [isGenderClicked, setGenderClicked] = useState(false);
    const [isAgeClicked, setAgeClicked] = useState(false);
    const [isInterestClicked, setInterestClicked] = useState(false);
    // filtered state => Select 후 상태
    const [Univ, setUniv] = useState("고려대학교");
    const [Gender, setGender] = useState("여자");
    const [Age, setAge] = useState([23, 26]);
    const [Interest, setInterest] = useState("맛집");

    // filtering state Handler => Select를 할 때 발생
    const UnivHandler = useCallback((selectedOption) => {
        setUniv(selectedOption.label);
    }, []);
    const GenderHandler = useCallback((selectedOption) => {
        setGender(selectedOption.label);
    }, []);
    const AgeHandler = useCallback((selectedOption) => {
        setAge(selectedOption.value);
    }, []);
    const InterestHandler = useCallback((selectedOption) => {
        setInterest(selectedOption.value);
    }, []);

    // Filtering User Handler => 확인 버튼. 클릭 시 발생.
    const UnivFilteringHandler = useCallback(() => {
        setFiltering(true);
        const filteredArr = personCommunity.filter(user => {
            return user.univ === Univ
        });
        setFilteringUser(filteredArr);
        setFiltering(false);
        setUnivClicked(false);
    }, [Univ]);

    const GenderFilteringHandler = useCallback(() => {
        setFiltering(true);
        const filteredArr = personCommunity.filter(user => {
            return user.gender === Gender
        });
        setFilteringUser(filteredArr);
        setFiltering(false);
        setGenderClicked(false);
    }, [Gender]);

    const AgeFilteringHandler = useCallback(() => {
        setFiltering(true);
        const filteredArr = personCommunity.filter(user => {
            return (user.age >= Age[0]) && (user.age <= Age[1])
        });
        setFilteringUser(filteredArr);
        setFiltering(false);
        setAgeClicked(false);
    }, [Age]);

    const InterestFilteringHandler = useCallback(() => {
        setFiltering(true);
        const filteredArr =  personCommunity.filter(user => {
            return user.interests.find(interest => interest === Interest)
        });
        setFilteringUser(filteredArr);
        setFiltering(false);
        setInterestClicked(false);
    }, [Interest]);
    

    return (
        <div className="max-h-screen overflow-hidden">
            <Layout>
                {/* Navigation */}
                <nav className="flex flex-row justify-between px-3 py-5">
                    <img
                        src="/yk-logo.png"
                        className=" rounded-2xl"
                        width={50}
                        height={50}
                    />
                    <div className="flex flex-row items-center">
                        <Link to="/">
                        <h1 className="mx-2 font-bold hover:text-blue-400">돌아가기</h1>
                        </Link>
                        <h1 className="mx-2 cursor-pointer font-bold hover:text-red-600 hover:font-bold">신고하기</h1>
                    </div>
                </nav>

                {/* Banner */}
                <Banner />

                {/* main */}
                <section className="px-3 my-2">

                    {/* Button Nav */}
                    <div className="my-3 flex-nowrap overflow-hidden">
                        <button id="univ" onClick={() => setUnivClicked(true)} className="px-1 py-2 border-2 rounded-xl mx-1 text-xs focus:outline-none ">
                            학교 <span className="text-blue-500">{Univ}</span>
                        </button>
                        <Modal show={isUnivClicked} clicked={() => setUnivClicked(false)}>
                            <div>
                                <h1 className="font-bold mb-5">대학교</h1>
                                <Select 
                                    defaultValue={UniversityOptions[1]}
                                    options={UnivgroupedOptions}
                                    onChange={UnivHandler}
                                />
                                <button 
                                    onClick={() => UnivFilteringHandler()} 
                                    className=" w-full mt-20 border-2 rounded-3xl px-5 py-3 bg-blue-400 text-white hover:text-white hover:bg-blue-500 focus:outline-none"
                                >
                                    확인
                                </button>
                            </div>
                        </Modal>

                        <button id="gender" onClick={() => setGenderClicked(true)} className="px-1 py-2 border-2 rounded-xl mx-1 text-xs focus:outline-none ">
                            성별 <span className="text-blue-500">{Gender}</span>
                        </button>
                        <Modal show={isGenderClicked} clicked={() => setGenderClicked(false)}>
                            <div>
                                <h1 className="font-bold mb-5">성별</h1>
                                <Select 
                                    defaultValue={GenderOptions[1]}
                                    options={GendergroupedOptions}
                                    onChange={GenderHandler}
                                />
                                <button 
                                    onClick={() => GenderFilteringHandler()} 
                                    className=" w-full mt-20 border-2 rounded-3xl px-5 py-3 bg-blue-400 text-white hover:text-white hover:bg-blue-500 focus:outline-none"
                                >
                                    확인
                                </button>
                            </div>
                        </Modal>

                        <button id="age" onClick={() => setAgeClicked(true)} className="px-1 py-2 border-2 rounded-xl mx-1 text-xs focus:outline-none ">
                            나이 <span className="text-blue-400">{Age.join('~')}살</span>
                        </button>
                        <Modal show={isAgeClicked} clicked={() => setAgeClicked(false)}>
                            <div>
                                <h1 className="font-bold mb-5">나이</h1>
                                <Select 
                                    defaultValue={AgeOptions[1]}
                                    options={AgegroupedOptions}
                                    onChange={AgeHandler}
                                />
                                <button 
                                    onClick={() => AgeFilteringHandler()} 
                                    className=" w-full mt-20 border-2 rounded-3xl px-5 py-3 bg-blue-400 text-white hover:text-white hover:bg-blue-500 focus:outline-none"
                                >
                                    확인
                                </button>
                            </div>
                        </Modal>

                        <button id="interest" onClick={() => setInterestClicked(true)} className="px-1 py-2 mt-2 mr-2 border-2 rounded-xl mx-1 text-xs focus:outline-none ">
                            관심사 <span className="text-blue-400">{Interest}</span>
                        </button>
                        <Modal show={isInterestClicked} clicked={() => setInterestClicked(false)}>
                            <div>
                                <h1 className="font-bold mb-5">{Interest}</h1>
                                <Select 
                                    defaultValue={InterestOptions[0]}
                                    options={InterestgroupedOptions}
                                    onChange={InterestHandler}
                                />
                                <button 
                                    onClick={() => InterestFilteringHandler()} 
                                    className=" w-full mt-20 border-2 rounded-3xl px-5 py-3 bg-blue-400 text-white hover:text-white hover:bg-blue-500 focus:outline-none"
                                >
                                    확인
                                </button>
                            </div>
                        </Modal>
                        <img 
                            onClick={() => setFilteringUser(personCommunity)}
                            src="refresh-outline.svg"
                            width={20}
                            height={20}
                            className="inline-block cursor-pointer "
                        />
                    </div>

                    {/* 커뮤니티 컨테이너 */}
                    {isFiltering ? (
                        <StyleRoot
                            className="flex flex-row justify-center mt-5"
                        >
                            <LoadingIndicator 
                                color={{red: 0, green: 0, blue: 200, alpha: .5}}
                                segmentWidth={5}
                            />
                        </StyleRoot>    
                    ) : (
                        <Community users={FilteredUser} />
                    )}

                    {/* 작성 버튼 */}
                    <Link to="/create-article">
                        <img 
                            src="add-circle.svg"
                            alt="add-circle"
                            width={50}
                            height={50}
                            className="absolute right-1 bottom-20 mr-3"
                        />
                    </Link>
                </section>
                
                {/* footer NavBar */}
                <Footer_nav/>
            </Layout>
        </div>
    )
}

export default Person;