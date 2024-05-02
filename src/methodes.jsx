export const hexToBinary = (hexString) => {
    let binaryResult = '';
    for (let i = 0; i < hexString.length; i++) {
        const binary = parseInt(hexString[i], 16).toString(2).padStart(4, '0');
        binaryResult += binary;
    }
    return binaryResult;
}


export const checkHex = (hexString) => {
    const hexNumbers = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
    for (let i = 0; i < hexString.length; i++) {
        if (!hexNumbers.includes(hexString[i])) {
            return false
        }
    }
    return true
}


export const setIDForOneTrame = (nb, value, trame, allTramesFormat, setError) => {
    if (checkHex(value.toString()) && value.length < 4) {
        const newTrameId = allTramesFormat
        const binary = hexToBinary(value)
        if (binary.length == 12) {
            newTrameId[nb].sof = binary[0]
            newTrameId[nb].id = binary.substring(1)
        }
        else {
            console.log('length', 11 - binary.length)
            newTrameId[nb].id = "0".repeat(11 - binary.length) + binary

        }
        setError(null)
        return trame((prev) => { return [...newTrameId] })
    }
    else {
        setError("wrong ID")
    }

}

export const setDataTypeForOneTrame = (nb, dataType, trame, allTramesFormat) => {
    const newFrame = allTramesFormat
    newFrame[nb].dataType = dataType
    return trame((prev) => { return [...newFrame] })
}

export const setNumberOfDataForOneTrame = (nb, NumberOfMessage, trame, allTramesFormat, setErrorNumberOfData) => {
    if (NumberOfMessage > 8) {
        setErrorNumberOfData('less then 8')
    } else {
        setErrorNumberOfData(null)
        const binary = hexToBinary(NumberOfMessage)
        const newFrame = allTramesFormat
        newFrame[nb].champDeCommande = '11' + binary
        return trame((prev) => { return [...newFrame] })

    }
}

export const setSingleDataForOneTrame = (nb, sizeOfMessage, message, index, trame, allTramesFormat) => {
    if (checkHex(message.toString()) && message.length < sizeOfMessage) {
        const binary = hexToBinary(message)
        const newFrame = allTramesFormat
        if (index == 0) {
            newFrame[nb].dataFrame = binary
        } else {
            newFrame[nb].dataFrame = newFrame[nb].dataFrame + binary  
        }
        return trame((prev) => { return [...newFrame] })

    }
    



}