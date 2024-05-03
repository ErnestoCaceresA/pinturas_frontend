import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


import {GlobalState} from '../../../GlobalState'

function OrderHistory() {
    
    // global state
    const state = useContext(GlobalState)
    const [history, setHistory] = state.UserAPI.history //objeto con todos los pedidos hechos
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token

    // console.log(history)

    // consumir API para obtener el hisorial de sus pedidos
    useEffect(() => {
        if(token){
            const getHistory = async () => {
                // si es admin
                if(isAdmin){

                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)

                }else{

                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
    
                    // console.log(res) //imprime un objeto el historial de pedidos del usuario
    
                    // guardar de todos esos objetos el atributo data que es donde esta el arreglo de pedidos en la variable history
                    setHistory(res.data)
                }
            }

            getHistory();
        }
    }, [token, isAdmin, setHistory])
    

    return (
        <div className="history-page">
            <h2>History</h2>

            <h4>Tiene {history.length} pedidos </h4>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Fecha de compra</th>
                        <th>Fecha exacta</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // ya que tenemos el objeto history iteramos y sacamos la informacion
                        history.map(items => (
                            <tr key={items._id} >
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(items.createdAt).toString()}</td>
                                <td> <Link to={`/history/${items._id}`} >View</Link> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default OrderHistory
