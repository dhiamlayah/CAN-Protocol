import React, { useState } from "react";
import { setIDForOneTrame, setDataTypeForOneTrame, setNumberOfDataForOneTrame, setSingleDataForOneTrame, calculateCAN_CRC, frameCalculated } from "../methodes";
const SingleTrame = ({ nb, setTrame, allTramesFormat }) => {
    const [errorFormID, SetErrorFormID] = useState(null)
    const [errorFromNumberOfMessage, setErrorFromNumberOfMessage] = useState(null)
    const [messageError, setMessageError] = useState(null)
    const [sizeOfMessage, setSizeOfMessage] = useState(0)
    const [frameResult, setFrameResult] = useState(null)
    return (
        <>
            <tr>
                <th scope="row">{nb + 1}</th>
                <td><input type="text" style={errorFormID ? { backgroundColor: "red", width: "100px" } : { width: "100px" }} onChange={(e) => { setIDForOneTrame(nb, e.target.value.trim(), setTrame, allTramesFormat, SetErrorFormID) }} /></td>
                <td>
                    <label htmlFor="DataType">D</label>
                    <input type="radio" className="mx-2" id="DataType" name="DataType" onChange={(e) => { setDataTypeForOneTrame(nb, 0, setTrame, allTramesFormat) }} />
                    <label htmlFor="Request">R</label>
                    <input type="radio" className="mx-2" id="DataType" name="DataType" onChange={(e) => { setDataTypeForOneTrame(nb, 1, setTrame, allTramesFormat) }} />
                </td>
                <td><input type="number" style={errorFromNumberOfMessage ? { backgroundColor: "red", width: "100px" } : { width: "100px" }} onChange={(e) => {
                    setSizeOfMessage(e.target.value)
                    setNumberOfDataForOneTrame(nb, e.target.value, setTrame, allTramesFormat, setErrorFromNumberOfMessage)
                }} /></td>

                {sizeOfMessage > 0 && Array.from({ length: Math.floor(8 / sizeOfMessage) }).map((_, index) => (
                    <td key={index} style={{ width: "100px" }}>
                        <input type="text" className="w-100" style={messageError ? { backgroundColor: 'red' } : {}} onChange={(e) => {
                            setSingleDataForOneTrame(nb, sizeOfMessage, e.target.value.trim(), index, setTrame, allTramesFormat, setMessageError)
                            const crc = calculateCAN_CRC(nb, allTramesFormat)
                            const newFrame = allTramesFormat
                            newFrame[nb].crc = crc
                            setMessageError(null)
                            return setTrame((prev) => { return [...newFrame] })
                        }} /></td>

                ))
                }
                {sizeOfMessage == 0 && Array.from({ length: 8 }).map((_, index) => (
                    <td key={index} >
                    </td>
                ))
                }
                {sizeOfMessage > 0 && Array.from({ length: 8 - Math.floor(8 / sizeOfMessage) }).map((_, index) => (
                    <td key={index} >
                    </td>
                ))
                }

                <td className="text-success  " style={{ cursor: 'pointer' }} onClick={() => { setFrameResult(frameCalculated(nb, allTramesFormat)) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "20px" }} viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" /></svg>

                </td>
            </tr>
            {frameResult && <tr >
                <td colSpan="2" style={{ backgroundColor: "cadetblue" }}>Frame :</td>
                <td colSpan="10" style={{ backgroundColor: "cadetblue" }}>
                    {frameResult}
                </td>
                <td rowSpan={2} className=" text-danger" style={{ cursor: 'pointer', backgroundColor: "cadetblue" }} onClick={() => setFrameResult(null)}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "20px", padding: '20px 0 0 5px' }} viewBox="0 0 448 512"><path fill="#a51d2d" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>                </td>

            </tr>}
            {frameResult && <tr >
                <td colSpan="2" style={{ backgroundColor: "cadetblue" }}>Graph :</td>
                <td colSpan="10" style={{ backgroundColor: "cadetblue" }}>
                    {Array.from({ length: frameResult.length }).map((_, index) => {
                        if (frameResult[index] == "0") {
                            return <span className="   fw-bold " key={index}>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '12px' }} viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>
                            </span>
                        } else {
                            return <span className="text-danger  fw-bold" key={index} >
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '12px',margin:"0 0 15px 0" }} viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>
                            </span>
                        }
                    })}
                </td>
            </tr>
            }
        </>

    )
}

export default SingleTrame;
