const languages = require('./languageFlag.json');
const langFlagArray = require('./langsheet.json');

langFlagArray.forEach(lang => {
    if (lang.code === 'ab' || lang.code === 'os') {
        languages[lang.code] = {
            langName: lang.language,
            flag: lang.flag,
            flagEmoji: false
        }
    } else {
        languages[lang.code] = {
            langName: lang.language,
            flag: lang.flag,
            flagEmoji: true
        }
    }
    
})

console.log('languages array: ', languages);
const toDelete = [];
Object.entries(languages).forEach(lang => {
    if (Object.values(lang[1]).length === 0) {
        toDelete.push(lang[0])
    }
})

console.log('empty list item: ', toDelete)
toDelete.forEach(trash => {
    delete languages[trash]
})
console.log('languages array cleaned: ', languages);
export default languages