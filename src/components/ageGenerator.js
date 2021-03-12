function ageGenerator(age){
    if(age >= 20 && age <= 23)
        return "20초"
    else if(age >= 24 && age <= 27)
        return '20중'
    else if(age >= 28 && age <= 29)
        return '20후'
    else if(age >= 30 && age <= 33)
        return '30초'
    else if(age >= 34 && age <= 37)
        return '30중'
    else if(age >= 38)
        return '30후'
}

export default ageGenerator;
