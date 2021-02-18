export const personCommunity = [
    {
        id: 0,
        profileImg: "https://2donny.github.io/ykring/UserImage/User1.png",
        description: ["고려대학교", "ENTP", "23살", "진지충"],
        displayName: "정이든",
        heartCnt: 32,
        contents: "요즘 취준하느라 너무 힘들어요! 고민이야기 같이 하실 분 구해요 ✨ ",
        tags: ["영화", "동네산책", "솔직한 대화", "개발"],
        univ: "고려대학교",
        gender: "남자",
        age: 23,
        interests: ["헬스", "넷플릭스", "개발"]
    },
    {
        id: 1,
        profileImg: "https://2donny.github.io/ykring//UserImage/User2.png",
        description: ["연세대학교", "ISFP", "26살", "수다쟁이"],
        displayName: "양지원",
        heartCnt: 2,
        contents: "제일 좋아하는 건 마라탕이고 인천살아용 친구사귀고 싶어요~! 연락주세요 ㅎㅎ!",
        tags: ["영화", "동네산책", "솔직한 대화", "예술"],
        univ: "연세대학교",
        gender: "여자",
        age: 26,
        interests: ["독서", "넷플릭스"]
    },
    {
        id: 2,
        profileImg: "https://2donny.github.io/ykring//UserImage/User3.png",
        description: ["서강대학교", "ENTP", "20살", "신입생"],
        displayName: "김현우",
        heartCnt: 3,
        contents: "코로나라 밖에 못나가는.... 불쌍한 신입생과 영상통화 하실 분.... ㅎㅎ",
        tags: ["영화", "동네산책", "솔직한 대화", "예술"],
        univ: "서강대학교",
        gender: "남자",
        age: 20,
        interests: ["헬스", "넷플릭스", "맛집"]
    },
    {
        id: 3,
        profileImg: "https://2donny.github.io/ykring//UserImage/User4.png",
        description: ["한양대학교", "ENTP", "22살", "재수생"],
        displayName: "김소연",
        heartCnt: 15,
        contents: "피아노잘침. 인공지능 관심 있어요! / 대화잘 통하는 분 원해요. 개발스터디 같이하실분",
        tags: ["영화", "동네산책", "솔직한 대화", "예술"],
        univ: "한양대학교",
        gender: "여자",
        age: 22,
        interests: ["맛집", "독서", "게임"]
    },
];

// Select Options data

// 대학교
export const UniversityOptions = [
    { value: 'seoul', label: '서울대학교', color: '#00B8D9', isFixed: true },
    { value: 'korea', label: '고려대학교', color: '#0052CC'},
    { value: 'yonsei', label: '연세대학교', color: '#5243AA' },
    { value: 'hanyang', label: '한양대학교', color: '#FF5630', isFixed: true },
    { value: 'seokang', label: '서강대학교', color: '#FF5630', isFixed: true },
    { value: 'sungkyunkwan', label: '성균관대학교', color: '#FF5630', isFixed: true },
]

export const UnivgroupedOptions = [
    {
      label: '대학',
      options: UniversityOptions,
    },
];

// 성별
export const GenderOptions = [
    { value: 'man', label: '남자', color: '#00B8D9', isFixed: true },
    { value: 'woman', label: '여자', color: '#0052CC'},
]

export const GendergroupedOptions = [
    {
      label: '성별',
      options: GenderOptions,
    },
];

// 나이
export const AgeOptions = [
    // value => 최대 나이
    { value: [20, 22], label: '20세 ~ 22세', color: '#00B8D9', isFixed: true },
    { value: [23, 26], label: '23세 ~ 26세', color: '#0052CC'},
    { value: [27, 29], label: '27세 ~ 29세', color: '#0052CC'},
    { value: [30, 40], label: '30세 이상', color: '#0052CC'},
]

export const AgegroupedOptions = [
    {
      label: '나이',
      options: AgeOptions,
    },
];

// 취향
export const InterestOptions = [
    { value: '맛집', label: '🍣 맛집 탐방하기', color: '#0052CC'},
    { value: '넷플릭스', label: '🍿 넷플릭스 보기', color: '#0052CC'},
    { value: '게임', label: '🎮 게임', color: '#00B8D9', isFixed: true },
    { value: '독서', label: '📚 독서', color: '#00B8D9', isFixed: true },
    { value: '헬스', label: '💪🏻 헬스', color: '#0052CC'},
    { value: '개발', label:'💻 개발', color: '#00B8D9', isFixed: true },
]

export const InterestgroupedOptions = [
    {
      label: '관심사',
      options: InterestOptions,
    },
];

export const AgeSettingOptions = [
    { label: 20, value: 20 },
    { label: 21, value: 21 },
    { label: 22, value: 22 },
    { label: 23, value: 23 },
    { label: 24, value: 24 },
    { label: 25, value: 25 },
    { label: 26, value: 26 },
    { label: 27, value: 27 },
    { label: 28, value: 28 },
    { label: 29, value: 29 },
    { label: 30, value: 30 },
    { label: 31, value: 31 },
    { label: 32, value: 32 },
    { label: 33, value: 33 },
    { label: 34, value: 34 },
    { label: 35, value: 35 },
];

export const jobs = [
    { label: "대학생", value: "대학생" },
    { label: "신입생", value: "신입생" },
    { label: "개발자", value: "개발자" },
    { label: "기획자", value: "기획자" },
    { label: "마케터", value: "마케터" },
    { label: "대표", value: "대표" },
    { label: "편집자", value: "편집자" },
    { label: "생산원", value: "생산원" },
    { label: "선생님", value: "선생님" },
    { label: "마술사", value: "마술사" },
    { label: "사업가", value: "사업가" },
    { label: "프리랜서", value: "프리랜서" },
    { label: "알바생", value: "알바생" },
    { label: "서비스원", value: "서비스원" },
    { label: "생산원", value: "생산원" },
    { label: "기술자", value: "기술자" },
]

export const adjectives = [
    { label: "심심한", value: "심심한" },
    { label: "배부른", value: "배부른" },
    { label: "똑똑한", value: "똑똑한" },
    { label: "열정이 넘치는", value: "열정이 넘치는" },
    { label: "독특한", value: "독특한" },
    { label: "매력있는", value: "매력있는" },
    { label: "배고픈", value: "배고픈" },
    { label: "헤롱헤롱한", value: "헤롱헤롱한" },
    { label: "디자이너가 되고싶은", value: "디자이너가 되고싶은" },
    { label: "개발자가 되고싶은", value: "개발자가 되고싶은" },
    
]