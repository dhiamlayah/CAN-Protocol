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
                            calculateCAN_CRC(nb, allTramesFormat)
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

                <td className="text-success  " style={{cursor:'pointer'}} onClick={() => { setFrameResult(frameCalculated(nb, allTramesFormat)) }}>calculate </td>
            </tr>
            {frameResult && <tr >
                <td colSpan="2" className="bg-warning">Frame :</td>
                <td colSpan="10" className="bg-warning">
                    {frameResult}
                </td>
                <td  className="bg-warning text-danger" style={{cursor:'pointer'}}  onClick={()=>setFrameResult(null)}>
                    delete
                </td>
            </tr>}
            {frameResult && <tr >
                <td colSpan="2" className="bg-warning">Graph :</td>
                <td colSpan="10" className="bg-warning  ">
                    { Array.from({ length: frameResult.length }).map((_, index)=>{
                        if(frameResult[index]=="0"){
                            return <span className=" ps-1  fw-bold " key={index}>--</span>
                        }else{
                            return <span className="text-danger ps-1 fw-bold"key={index} >__</span>
                        }
                    } )}
                </td>
                <td  className="bg-warning text-danger" style={{cursor:'pointer'}}  onClick={()=>setFrameResult(null)}>
                    delete
                </td>
            </tr>}
        </>

    )
}

export default SingleTrame;
