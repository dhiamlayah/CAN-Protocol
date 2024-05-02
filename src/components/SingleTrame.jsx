import React, { useState } from "react";
import { setIDForOneTrame, setDataTypeForOneTrame, setNumberOfDataForOneTrame,setSingleDataForOneTrame } from "../methodes";
const SingleTrame = ({ nb, setTrame, allTramesFormat }) => {
    const [errorFormID, SetErrorFormID] = useState(null)
    const [errorFromNumberOfMessage, setErrorFromNumberOfMessage] = useState(null)
    const [sizeOfMessage, setSizeOfMessage] = useState(0)

    return (
        <tr>
            <th scope="row">{nb + 1}</th>
            <td><input type="text" style={errorFormID ? { backgroundColor: "red" ,width:"100px"} : {width:"100px"}} onChange={(e) => { setIDForOneTrame(nb, e.target.value.trim(), setTrame, allTramesFormat, SetErrorFormID) }} /></td>
            <td>
                <label htmlFor="DataType">D</label>
                <input type="radio" className="mx-2" id="DataType" name="DataType" onChange={(e) => { setDataTypeForOneTrame(nb, 0, setTrame, allTramesFormat) }} />
                <label htmlFor="Request">R</label>
                <input type="radio" className="mx-2" id="DataType" name="DataType" onChange={(e) => { setDataTypeForOneTrame(nb, 1, setTrame, allTramesFormat) }} />
            </td>
            <td><input type="number" style={errorFromNumberOfMessage ? { backgroundColor: "red" ,width:"100px"} : {width:"100px"}} onChange={(e) => {
                setSizeOfMessage(e.target.value)
                setNumberOfDataForOneTrame(nb, e.target.value, setTrame, allTramesFormat, setErrorFromNumberOfMessage)
            }} /></td>

            {sizeOfMessage > 0 && Array.from({ length:  Math.floor(8/sizeOfMessage) }).map((_, index) => (
                <td key={index} style={{width:"100px"}}>
                    <td><input type="text" className="w-100" onChange={(e) => { setSingleDataForOneTrame(nb,sizeOfMessage,e.target.value.trim(),index, setTrame, allTramesFormat) }} /></td>

                </td>
            ))
            }
        </tr>
    )
}

export default SingleTrame;
