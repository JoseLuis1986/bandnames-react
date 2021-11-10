import React, { useContext } from "react";
// import io from 'socket.io-client';

import { BandAdd } from "../components/BandAdd";
import { BandChart } from "../components/BandChart";
import { BandList } from "../components/BandList";
import { SocketContext } from "../context/SocketContext";
// import { useSocket } from "./hooks/useSocket";


function HomePage() {

  // const [bands, setBands] = useState([]);
  // const { socket, online } = useSocket('http://localhost:8080');
  const { online } = useContext(SocketContext);


  //escuchamos cualquier cambio en nuestras currents bands
  // useEffect(() => {

  //   socket.on('current-bands', (bands) => {
  //     setBands(bands);
  //   })
  // }, [socket]);


  // const toVote = (id) => {
  //   socket.emit('vote-band', id);
  // }

  // const deleteBand = ( id ) => {
  //   console.log(id);
  //   socket.emit('delete-band', id);
  // }

  // const changeNameBand = ( id, name ) => {

  //   socket.emit('change-name-band', { id, name})
  // }

  // const createBand = ( nombre ) => {

  //   socket.emit('create-band', { name: nombre });
  // }


  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {
            online
              ? <span className="text-success">  Online</span>
              : <span className="text-danger">  Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />
          <div className="row">
            <div className="col">
              <BandChart />
            </div>
          </div>
      <div className="row">
        <div className="col-8">
          <BandList
            // data={bands}
            // vote={ toVote }
            // deleteBand={ deleteBand }
            // changeBand={ changeNameBand }
          />
        </div>
        <div className="col-4">
          {/* <BandAdd createBand={ createBand }/> */}
          <BandAdd />
        </div>
      </div>

    </div>
  );
}

export default HomePage;
