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
    { label: "새내기", value: "새내기" },
    { label: "미개봉새내기", value: "미개봉새내기" },
    { label: "졸업생", value: "졸업생" },
    { label: "대학원생", value: "대학원생" },
    { label: "유학원", value: "유학원" },
    { label: "교환학생", value: "교환학생" },
    { label: "문과대생", value: "문과대생" },
    { label: "상경대생", value: "상경대생" },
    { label: "공대생", value: "공대생" },
    { label: "이과대생", value: "이과대생" },
    { label: "미대생", value: "미대생" },
    { label: "음대생", value: "음대생" },
    { label: "체대생", value: "체대생" },
    { label: "의대생", value: "의대생" },
    { label: "마케터", value: "마케터" },
    { label: "디자이너", value: "디자이너" },
    { label: "기획자", value: "기획자" },
    { label: "개발자", value: "개발자" },
    { label: "편집자", value: "편집자" },
    { label: "사무원", value: "사무원" },
    { label: "간호사", value: "간호사" },
    { label: "프리랜서", value: "프리랜서" },
    { label: "영업원", value: "영업원" },
    { label: "서비스원", value: "서비스원" },
    { label: "공무원", value: "공무원" },
    { label: "의사", value: "의사" },
    { label: "매니저", value: "매니저" },
    { label: "예술가", value: "예술가" },
    { label: "조리사", value: "조리사" },
    { label: "운동선수", value: "운동선수" },
    { label: "강사", value: "강사" },
    { label: "백수", value: "백수" },
    { label: "운전사", value: "운전사" },
    { label: "기술자", value: "기술자" },
    { label: "운영자", value: "운영자" },
    { label: "관리자", value: "관리자" },
    { label: "세무사", value: "세무사" },
    { label: "선생님", value: "선생님" },
    { label: "전문가", value: "전문가" },
    { label: "CEO", value: "CEO" },
    { label: "건물주", value: "건물주" },
]

export const adjectives = [
    { label: "심심한", value: "심심한" },
    { label: "꿈이있는", value: "꿈이있는" },
    { label: "요리사 뺨치는", value: "요리사 뺨치는" },
    { label: "운동을 좋아하는", value: "운동을 좋아하는" },
    { label: "동물과 교감하는", value: "동물과 교감하는" },
    { label: "커피러버", value: "커피러버" },
    { label: "카페홀릭", value: "카페홀릭" },
    { label: "문화향유(자)", value: "문화향유(자)" },
    { label: "뮤지컬덕후", value: "뮤지컬덕후" },
    { label: "전시회 지박령", value: "전시회 지박령" },
    { label: "여행중독자 ", value: "여행중독자 " },
    { label: "게임을 좋아하는", value: "게임을 좋아하는" },
    { label: "가수뺨치는 노래실력", value: "가수뺨치는 노래실력" },
    { label: "술을 사랑하는", value: "술을 사랑하는" },
    { label: "책을 사랑하는", value: "책을 사랑하는" },
    { label: "감성이 풍부한", value: "감성이 풍부한" },
    { label: "영화를 좋아하는", value: "영화를 좋아하는" },
    { label: "고민이 많은", value: "고민이 많은" },
    { label: "뭘 해야할지 모르겠는", value: "뭘 해야할지 모르겠는" },
    { label: "패션러버", value: "패션러버" },
    { label: "창업을 꿈꾸는", value: "창업을 꿈꾸는" },
    { label: "개발자를 준비하는", value: "개발자를 준비하는" },
    { label: "디자이너를 준비하는", value: "디자이너를 준비하는" },
    { label: "마케터를 준비하는", value: "마케터를 준비하는" },
    { label: "기획자를 준비하는", value: "기획자를 준비하는" },
    { label: "취업을 준비하는", value: "취업을 준비하는" },
    { label: "대기업을 준비하는", value: "대기업을 준비하는" },
    { label: "공기업을 준비하는", value: "공기업을 준비하는" },
    { label: "대학원을 준비하는", value: "대학원을 준비하는" },
    { label: "동네친구를 사귀고 싶은", value: "동네친구를 사귀고 싶은" },
    { label: "연애가 하고 싶은", value: "연애가 하고 싶은" },
    { label: "결혼이 하고 싶은", value: "결혼이 하고 싶은" },
    { label: "심심한", value: "심심한" },
    { label: "큐티뽀짝", value: "큐티뽀짝" },
    { label: "잘생긴", value: "잘생긴" },
    { label: "예쁜", value: "예쁜" },
    { label: "돈이 많은", value: "돈이 많은" },
    { label: "영앤리치", value: "영앤리치" },
    { label: "목소리가 좋은", value: "목소리가 좋은" },
    { label: "피부가 좋은", value: "피부가 좋은" },
    { label: "카리스마 있는", value: "카리스마 있는" },
    { label: "애교넘치는", value: "애교넘치는" },
    { label: "자신감 있는", value: "자신감 있는" },
    { label: "이해심 깊은", value: "이해심 깊은" },
    { label: "말을 잘하는", value: "말을 잘하는" },
    { label: "목소리가 좋은", value: "목소리가 좋은" },

    { label: "유머넘치는", value: "유머넘치는" },
    { label: "부지런한", value: "부지런한" },
    { label: "웃음꾼", value: "웃음꾼" },
    { label: "조용한", value: "조용한" },
    { label: "털털한", value: "털털한" },
    { label: "활동적인", value: "활동적인" },
    { label: "호감형", value: "호감형" },
    { label: "다정다감한", value: "다정다감한" },
    { label: "매력적인", value: "매력적인" },
    { label: "착한", value: "착한" },
    { label: "도도한", value: "도도한" },
    { label: "보수적인", value: "보수적인" },
    { label: "마라탕을 좋아하는", value: "마라탕을 좋아하는" },
    { label: "민초를 사랑하는", value: "민초를 사랑하는" },

    { label: "외향적인 E", value: "외향적인 E" },
    { label: "내향적인 I", value: "내향적인 I" },
    { label: "감각적인 S", value: "감각적인 S" },
    { label: "직관적인 N", value: "직관적인 N" },
    { label: "MBTI신봉자", value: "MBTI신봉자" },
]




