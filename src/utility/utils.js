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
export default {extractAbbreviation}