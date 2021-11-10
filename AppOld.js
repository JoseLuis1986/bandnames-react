import React, { useEffect, useState } from "react";
// import io from 'socket.io-client';

import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";


const connectSocketServer = () => {
  // const socket = io.conect('http://localhost:8080', {
  //   transports: ['websocket']
  // });
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
}

function App() {

  const [socket] = useState(connectSocketServer);
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  //si esta conectado el socket o no
  useEffect(() => {

    // console.log(socket);
    setOnline(socket.connected);

  }, [socket]);


  //escuchamos cuando nos conectamos 
  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    })
    // return socket.disconnect();
  }, [socket]);


  //escuchamos cuando nos desconectamos
  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    })
  }, [socket]);


  //escuchamos cualquier cambio en nuestras currents bands
  useEffect(() => {

    socket.on('current-bands', (bands) => {
      setBands(bands);
    })
  }, [socket]);


  const toVote = (id) => {
    socket.emit('vote-band', id);
  }

  const deleteBand = ( id ) => {
    console.log(id);
    socket.emit('delete-band', id);
  }

  const changeNameBand = ( id, name ) => {

    socket.emit('change-name-band', { id, name})
  }

  const createBand = ( nombre ) => {

    socket.emit('create-band', { name: nombre });
  }


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
        <div className="col-8">
          <BandList
            data={bands}
            vote={ toVote }
            deleteBand={ deleteBand }
            changeBand={ changeNameBand }
          />
        </div>
        <div className="col-4">
          <BandAdd createBand={ createBand }/>
        </div>
      </div>

    </div>
  );
}

export default App;
