module.exports = (arrayAsString) => {
    return arrayAsString.split(',').map(subString => subString.trim())
}