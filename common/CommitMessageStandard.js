const standardForCommon = {
    'merge': {
        'required': [],
        'options': []
    },
    'feature': {
        'required': [],
        'options': []
    },
    'bugfix': {
        'required': ['why', 'how'],
        'options': []
    },
    'optimize': {
        'required': [],
        'options': []
    },
    'config': {
        'required': [],
        'options': []
    },
    'revert': {
        'required': [],
        'options': []
    }
}

function standardChecker(commitMessage, standard = standardForCommon){
    let isSubKeyAllHave = true;
    let missKeywords = [];
    for(let i in standard){
        const keyReg = new RegExp(i, 'ig');
        const bol = keyReg.test(commitMessage);
        if(bol){
            const required = standard[i].required;
            for(let j=0; j<required.length; j++){
                const requiredKeyWord = required[j];
                if(requiredKeyWord === 'jiraId'){
                    if(jiraIdReg.test(commitMessage)){
                        continue;
                    }else{
                        isSubKeyAllHave = false;
                        missKeywords.push(requiredKeyWord);
                        break;
                    }
                }else{
                    const subKeyReg = new RegExp(requiredKeyWord, 'ig');
                    if(subKeyReg.test(commitMessage)){
                        continue;
                    }else{
                        isSubKeyAllHave = false;
                        missKeywords.push(requiredKeyWord);
                        break;
                    }
                }
            }

            
            if(!isSubKeyAllHave){
                return {
                    isPass: false,
                    missKeywords: missKeywords
                }
            } 

            const options = standard[i].options;
            
            if(options.length > 0){
                for(let k=0; k<options.length; k++){
                    const optionsKeyWord = options[k];
                    const subKeyReg = new RegExp(optionsKeyWord, 'ig');
                    if(subKeyReg.test(commitMessage)){
                        return {
                            isPass: true,
                            missKeywords: missKeywords
                        }
                    }
                }
                missKeywords = missKeywords.concat(standard[i].options);
                return {
                    isPass: false,
                    missKeywords: missKeywords
                }
            }else{
                return {
                    isPass: isSubKeyAllHave,
                    missKeywords: missKeywords
                };
            }
        }
    }

    //收集一级miss key word
    for(let i in standard){
        missKeywords.push(i);
    }

    return {
        isPass: false,
        missKeywords: missKeywords
    };
}


module.exports = standardChecker;