import { useState } from "react";
import SingleTrame from "./SingleTrame"
import Result from "./Result";






function Inputs() {
  const [numberOfCalculateur, setNumberOfCalculateur] = useState(0)
  const [show, setShow] = useState(false);
  const [winner, setWinner] = useState(0);

  const TrameFormat = {
    sof: '0',                      /* 1 bit */
    id: '1111111',                 /* 11 bit */
    dataType: '1',                 /* 11 bit */
    champDeCommande: '111111',   /* 6 bit */
    dataFrame: [],           /* list of messages 0 a 64 bit */
    crc: '111111111111111',        /* 15 bit */
    delemeteurOFCRC: "1",
    ack: '11',                     /* 2 bit */
    eof: '1111111'                 /* 7 bit */
  }


  const [allTramesFormat, setAllTramesFormat] = useState([])

  const calculateWinnerOfTheBus = (allTramesFormat) => {
    let idWiner = 0 ;
  
    for (let i = 1; i < allTramesFormat.length; i++) {
      const winner = binaryMinimum(allTramesFormat[idWiner].id,allTramesFormat[i].id)
      if (allTramesFormat[i].id=== winner){
        idWiner = i 
      }
    }

    return idWiner

  }

  function binaryMinimum(bin1, bin2) {
    // If the lengths of the binary numbers are different, the shorter one is considered smaller
    if (bin1.length < bin2.length) {
      return bin1;
    } else if (bin2.length < bin1.length) {
      return bin2;
    } else {
      // If the lengths are the same, compare digit by digit
      for (let i = 0; i < bin1.length; i++) {
        if (bin1[i] < bin2[i]) {
          return bin1;
        } else if (bin2[i] < bin1[i]) {
          return bin2;
        }
      }
      // If both binary numbers are the same
      return bin1;
    }
  }





  return (
    <div className="mx-5 mb-3 p-3 rounded-4 border border-dark" style={{ backgroundColor: "lightslategray" }}>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">how many calculators want to transmit their message on the bus ?</label>
          <input type="number" className="form-control w-25" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
            setNumberOfCalculateur(e.target.value)
            setAllTramesFormat([])
            for (let i = 0; i < e.target.value; i++) {
              setAllTramesFormat((prev) => { return [...prev, { ...TrameFormat }] })
            }
          }} />
          <div id="emailHelp" className="form-text">enter a positive number</div>
        </div>


        <div>
          <table className="table rounded-4 border border-dark">
            <thead >
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Frame Type</th>
                <th scope="col">Size Of Message</th>
                <th scope="col">Messages</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>

              </tr>
            </thead>
            <tbody>
              {numberOfCalculateur > 0 && Array.from({ length: numberOfCalculateur }).map((_, index) => (
                <SingleTrame key={index} nb={index} allTramesFormat={allTramesFormat} setTrame={setAllTramesFormat} />
              ))
              }


            </tbody>
          </table>
          {allTramesFormat.length > 1 && <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-warning" onClick={() => {
              const newWinner = calculateWinnerOfTheBus(allTramesFormat)
              setWinner(newWinner)
              setShow(true)
            }}> Arbitration </button>
            <Result show={show} setShow={setShow} winner={winner} />


          </div>}
        </div>

      </form>
    </div>
  );
}

export default Inputs;
