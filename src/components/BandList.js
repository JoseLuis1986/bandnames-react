import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';



export const BandList = () => {
    const [bandas, setBands] = useState([]);

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        })
        // setBandas(data);
        return () => socket.off('current-bands');
    }, [socket]);


    const changeName = (ev, id) => {

        const newName = ev.target.value;

        setBands(bandas => bandas.map(band => {
            if (band.id === id) {
                band.name = newName;
            }
            return band;
        }))
    };

    const loseFocus = (id, name) => {
        socket.emit('change-name-band', { id, name })
    };

    const toVote = (id) => {
        socket.emit('vote-band', id);
    };

    const deleteBand = (id) => {
        console.log(id);
        socket.emit('delete-band', id);
    }


    const createRows = () => {
        return (
            bandas.map(bands => (
                <tr key={bands.id}>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => toVote(bands.id)}
                        >
                            +1
                        </button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            value={bands.name}
                            onChange={(event) => changeName(event, bands.id)}
                            onBlur={() => loseFocus(bands.id, bands.name)}
                        />
                    </td>
                    <td>
                        <h3>{bands.votes}</h3>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteBand(bands.id)}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}
