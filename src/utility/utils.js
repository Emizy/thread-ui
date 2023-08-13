export const extractAbbreviation = (word) => {
    if (!word) {
        return 'BB'
    }
    const splitter = word.split(' ')
    let join_word = []
    splitter.map(item => {
        if (String(item)) {
            join_word.push(String(item).charAt(0))
        }
    })
    return join_word.join('')
}

export const truncate = (word, length, suffix) => {
    if (!word) {
        return ''
    }
    if (word.length > length) {
        return word.substring(0, length) + suffix;
    } else {
        return word;
    }
}

export default {extractAbbreviation, truncate}