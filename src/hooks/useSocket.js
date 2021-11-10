import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = ( serverPath ) => {

    // const socket = io('http://localhost:8080');
    const socket = useMemo(() => io(serverPath, { transports: ["websocket"] }), [serverPath]);

    const [online, setOnline] = useState(false);

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


    return {
        socket, 
        online
    }
}