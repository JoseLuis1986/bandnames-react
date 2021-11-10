import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';


export const BandAdd = () => {

    const [value, setValue] = useState('');
    // const { socket } = useSocket('http://localhost:8080');
    const { socket } = useContext(SocketContext);


    const handleSubmit = ( ev ) => {
        ev.preventDefault();
        
        if(value.trim().length > 0){
            //TODO: llamar la funcion para emitir el evento
            // createBand( value );
            socket.emit('create-band', { name: value});
            setValue('');
        }else{
            console.log('error');
        }
    }

    return (
        <>
            <h3> Agregar Bandas </h3>

            <form onSubmit={ handleSubmit }>
                <input
                    className="form-control"
                    placeholder="Nuevo nombre de Banda"
                    value={ value }
                    onChange={ (ev) => setValue( ev.target.value )}
                />
            </form>
        </>
    )
}
