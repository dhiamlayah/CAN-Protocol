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
        newFrame[nb].dataFrame = []
        newFrame[nb].champDeCommande = '11' + binary
        return trame((prev) => { return [...newFrame] })

    }
}

export const setSingleDataForOneTrame = (nb, sizeOfMessage, message, index, trame, allTramesFormat, setMessageError) => {
    if (checkHex(message.toString()) && message.length <= sizeOfMessage) {
        const binary = hexToBinary(message)
        const newFrame = allTramesFormat
        newFrame[nb].dataFrame[index] = binary
        setMessageError(null)
        return trame((prev) => { return [...newFrame] })
    } else {
        setMessageError('wrong message')
    }

}

export const calculateCAN_CRC = (nb, allTramesFormat) => {
    let data = ""
    allTramesFormat[nb].dataFrame.map((message) => {
        data = data + message
    })


    let crc = parseInt("000000000000000", 2); // Initialisation du CRC à 0 en binaire

    for (let i = 0; i < data.length; i++) {
        crc ^= data[i] << 7; // Combinaison du CRC avec l'octet et décalage de 7 bits vers la gauche

        for (let j = 0; j < 8; j++) {
            if ((crc & parseInt("100000000000000", 2)) !== 0) { // Si le bit de poids le plus élevé est 1
                crc = (crc << 1) ^ parseInt("10100110011001", 2); // Opération XOR avec le polynôme CRC-15 (0x4599 en binaire)
            } else {
                crc <<= 1; // Décalage du CRC d'un bit vers la gauche
            }
        }
    }

    let crcInDegit = crc & parseInt("111111111111111", 2); // Masquage pour s'assurer que le CRC tient sur 15 bits
    console.log("subData =======>", crcInDegit.toString(2).padStart(15, '0'))

    return crcInDegit.toString(2).padStart(15, '0')
}


const addStafingBit = (frame) => {
    let i = 0
    while (i < frame.length - 6) {
        let newFrame = ""
        if (frame.substring(i, i + 5).toString() === "00000") {
            newFrame = frame.substring(0, i) + "000001" + frame.substring(i + 5, 1000000)
            i++
            frame = newFrame
        }
        else if (frame.substring(i, i + 5).toString() === "11111") {
            newFrame = frame.substring(0, i) + "111110" + frame.substring(i + 5, 1000000)
            i++
            frame = newFrame
        }
        else {
            i++
        }

    }

    return frame

}

export const frameCalculated = (nb, allTramesFormat) => {
    let data = ""
    allTramesFormat[nb].dataFrame.map((message) => {
        data = data + message
    })

    console.log("daaaataaa", data)

    let finalFrameBeforStuffing = allTramesFormat[nb].sof + allTramesFormat[nb].id + allTramesFormat[nb].dataType + allTramesFormat[nb].champDeCommande + data + allTramesFormat[nb].crc + allTramesFormat[nb].delemeteurOFCRC + allTramesFormat[nb].ack
    let AddStafingBitToTheFrame = addStafingBit(finalFrameBeforStuffing)
    console.log('sof', allTramesFormat[nb].sof.length)
    console.log('id', allTramesFormat[nb].id.length)
    console.log('dataType', allTramesFormat[nb].dataType.length)
    console.log('champDeCommande', allTramesFormat[nb].champDeCommande.length)
    console.log('data', data.length)
    console.log('crc', allTramesFormat[nb].crc.length)
    console.log('delemeteurOFCRC', allTramesFormat[nb].delemeteurOFCRC.length)
    console.log('ack', allTramesFormat[nb].ack.length)

 
    return AddStafingBitToTheFrame + allTramesFormat[nb].eof
}