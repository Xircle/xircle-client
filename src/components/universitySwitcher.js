
function universitySwitcher(universityEng){
    switch(universityEng) {
        case 'korea.ac.kr':
            return "고려대학교"
        case 'yonsei.ac.kr':
            return "연세대학교"
        case 'snu.ac.kr':
            return "서울대학교"
        case 'sogang.ac.kr':
            return "서강대학교"
        case 'skky.ac.kr':
            return "성균관대학교"
        case 'hanyang.ac.kr':
            return "한양대학교"
        default:
            return null
    }
}

export default universitySwitcher;