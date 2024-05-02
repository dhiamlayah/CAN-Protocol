import { useState } from "react";
import SingleTrame from "./SingleTrame"






function Inputs() {
  const [numberOfCalculateur, setNumberOfCalculateur] = useState(0)
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

  if (allTramesFormat[0]) console.log('this message frame ==>', allTramesFormat[0].dataFrame)

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

        </div>

      </form>
    </div>
  );
}

export default Inputs;
