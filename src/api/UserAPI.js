import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {

    // en el package.json se agrego el: "proxy": "http://localhost:5000" es LA DIRECCION DONDE ESTA CORRIENDO NUESTRO BACKEND

    // crear variables para ver si el usuario esta loggeado y si tiene rol de administrados y para ver su historial
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [history, setHistory] = useState([])
    // const [callback, useCallback] = useState(false)

    // crear variables para el carrito de compras
    const [cart, setCart] = useState([]);

    // consumir API para obtener la informacion general del usuario
    useEffect(()=> {
        if(token){
            // consumir API | /user/infor | MANDANDOLE EN LOS HEADERS EL: {Authorization: token} 
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    // si paso exitosamente el backend de | /user/infor | el cual tiene como condicion el accesstoken entonces ponemos variable isLogged en true
                    setIsLogged(true)

                    // IMPRIME ESA VARIABLE RES TODA LA INFORMACION DEL USUARIO EN UN OBJETO
                    console.log(res)

                    // Depues checar si su rol es 1 o 0 y si es 1 CAMBIAR VARIABLE isAdmin a true
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    // Añadir a variable cart los productos que tiene el usuario en el carrito LEYENDOLO DE LA BASE DE DATOS del atributo "cart"
                    setCart(res.data.cart)

                } catch (err) {
                    // en dado caso que haya un error se mandará un alert del que personalizamos en el backend ya sea si no tiene authorizacion para hacer eso etc
                    alert(err.response.data.msg)
                }
            }

            getUser();
        }
    }, [token])

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
    }, [token, isAdmin])

    // funcion para consumir API para guardar en base de datos el carrito de compras del usuario
    const addCart = async (product) => {
        // si no esta logeado
        if(!isLogged) return alert('Profavor haga login para continuar con la compra')
        // crear variable para ver si ese producto ya esta en el carrito de compras
        const check = cart.every(item => {
            return item._id !== product._id
        })
        // si no esta en el carrito de compras entonces agregarlo con setCart() y tambien consumiendo la API de /user/addcart
        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}] }, {
                headers: {Authorization: token}
            })

            alert('producto agregado al carrito de compras')
        }
        // si ya esta en el carrito entonces solo retornar un alert de que ya esta en el carrito
        else{
            alert('Este producto ya se encuentra en su carrito de compras')
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        // callback: [callback, useCallback]
    }
}

export default UserAPI
