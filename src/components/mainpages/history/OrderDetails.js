import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'

import {GlobalState} from '../../../GlobalState'

function OrderDetails() {

    // global state
    const state = useContext(GlobalState)
    const [history] = state.UserAPI.history

    // variables para el orderDatils
    const [orderDetails, setOrderDetails] = useState([])

    // obtener paramentros para este componente /history/:id
    const params = useParams()

    useEffect(() => {
        if(params.id){
            // iterramos entre todos los pedidos del usuario para obtener y guardar en variable el pedido que coincida con el id que se mando como parametro
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])

    // console.log(orderDetails) //retorna el objeto del pedido que coincidio con el id que se mando en los parametros

    if(orderDetails.length === 0) return null;

    return (
        <div className="history-page">

            {/* ya que tenemos el orderDetails sacamos su informaicon del objeto */}

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Codigo Postal</th>
                        <th>Codigo de pais</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> {orderDetails.address.recipient_name} </td>
                        <td> {orderDetails.address.line1 + " - " + orderDetails.address.city} </td>
                        <td> {orderDetails.address.postal_code} </td>
                        <td> {orderDetails.address.country_code} </td>
                    </tr>
                </tbody>
            </table>


            <table style={{margin: "30px 0"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Productos</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // iteramos en el cart y sacamos la informacion
                        orderDetails.cart.map(item => (
                            <tr key={item._id}>
                                <td> <img src={item.images.url} alt=""/> </td>
                                <td> {item.title} </td>
                                <td> {item.quantity} </td>
                                <td> {item.price * item.quantity} </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>

        </div>
    )
}

export default OrderDetails
