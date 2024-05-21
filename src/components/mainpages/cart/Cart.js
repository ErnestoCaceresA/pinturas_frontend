import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'

import PaypalButton from './PaypalButton'
import {GlobalState} from '../../../GlobalState'


import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Divider, ButtonGroup, Grid, GridItem } from '@chakra-ui/react'

function Cart() {

    // usando el GlobalState para sacar los productos del carrito y el accesstoken
    const state = useContext(GlobalState)
    const [cart, setCart] = state.UserAPI.cart
    const [token] = state.token
    // const [callback, setCallback] = state.UserAPI.callback

    // Sacando el total de las compras en el carrito
    const [total, setTotal] = useState(0)

    // llamar a la funcion getTotal cada que la variable cart se actualice o cambie
    useEffect(()=> {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])

    // actualizar "cart" en la base de datos para al hacer refresh a la pagina no se borren las actualizaciones que se hicieron con el boton increment, decrement y removeProduct
    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    // funcion para boton incrementar cantidad de producto
    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    // funcion para boton decrementar cantidad de producto
    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    // funcion para boton remover producto
    const removeProduct = (id) => {
        if(window.confirm("¿Quieres borrar este producto de tu carrito de compras?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    // funcion para boton Paypal
    const tranSuccess = async(payment) => {
        
        console.log(payment) //imprime toda la informacion del pago

        const address = payment.payer.address;
        const paymentID = payment.id;

        console.log(address)
        console.log(paymentID)
        
        //const {paymentID, address} = payment;
        
        // consumir API para el payment en el backend para que lo procese (cambie la cantidad de vendidos del producto) y guarde en la base de datos el pedido
        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })
        
        
        // ya que se hizo el pago limpiar el carrito con setCart() pasandole un arreglo vacio y despues el addToCart para que lo guarde en la base de datos
        
        setCart([])
        addToCart([])
        alert('!Usted a hecho un pedido exitosamente!')
        
        // setCallback(!callback)
    }


    if(cart.length === 0) return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Carrito vacío</h2>

    return (
        <div>
            {

                <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
                    {cart.map(product => (
                        <GridItem key={product.id}>
                            <Card maxW='sm' h="100%">
                            <CardBody>
                                <Image
                                src={product.images.url}
                                alt={product.title}
                                borderRadius='lg'
                                h="200px" // Altura fija para la imagen
                                objectFit="cover" // Ajustar imagen dentro del tamaño especificado
                                />
                                <Stack mt='6' spacing='3'>
                                <Heading size='md'>${product.title}</Heading>
                                <Text>
                                    {product.description.length > 70 ? `${product.description.substring(0, 70)}...` : product.description}
                                </Text>
                                <Text>
                                    {product.content.length > 40 ? `${product.content.substring(0, 40)}...` : product.content}
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ${product.price * product.quantity}
                                </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span> {product.quantity} </span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
                            </CardFooter>
                            </Card>
                        </GridItem>
                    ))}
                </Grid>

            }

            <div className="total">
                <h3>Total: $ {total}</h3>
                {/* Boton del componente Paypal creado con react-paypal-express-checkout*/}
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess}
                />
            </div>
        </div>
    )
}

export default Cart
