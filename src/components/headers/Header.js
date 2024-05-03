import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {GlobalState} from '../../GlobalState'
import Menu from './icon/bars-solid.svg'
import Close from './icon/times-solid.svg'
import Cart from './icon/shopping-cart-solid.svg'

import logo from '../../utils/logo_pinturas.png'

function Header() {

    const state = useContext(GlobalState)
    // console.log(state) //imprime el UserAPI (donde viene si esta loggeado y si es admin ) y el productsAPI (donde vienen los products)

    // obteniendo las variables de si esta loggeado y es administrador que sacamos en la UserAPI.js
    const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin

    // obteniendo el carrito de compra del usuario del GlobalState en el UserAPI.js
    const [cart] = state.UserAPI.cart

    // variables
    const [menu, setMenu] = useState(false)


    // Crear funcion para el Logout Link
    const logoutUser = async () => {
        // consumir API para el logout y borrar todo
        await axios.get('/user/logout')
        window.location.href = "/";

        // quitar del localStororage el "firstLogin" para la validacion del GlobalState del refresh_token()
        localStorage.removeItem('firstLogin')
    }

    // CREAR ROUTER PARA LOS ADMINISTRADORES
    const adminRouter = () => {
        return(
            <>
                <li> <Link to="/create_product"> Create Product </Link> </li>
                <li> <Link to="/category"> Categories </Link> </li>
            </>
        )
    }

    // CREAR ROUTER PARA LOS USUARIOS NORMALES QUE YA ESTAN REGISTRADOS O LOGGEADOS
    const loggedRouter = () => {
        return(
            <>
                <li> <Link to="/history"> History </Link> </li>
                <li> <Link to="/" onClick={logoutUser}> Logout </Link> </li>
            </>
        )
    }


    const toggleMenu = () => setMenu(!menu)

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }




    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    {/* en Pages.js este esta linkeado al componente Products.js */}
                    {/* si es admin le saldra "Admin" en vez de "Pajo-Design" */}
                    {/*<Link to="/"> {isAdmin ? 'Admin' : 'Pajo-Design'} </Link>*/}
                    <Link to="/"> <img src={logo} alt="logo" width="80px"></img> </Link>
                </h1>
            </div>


            <ul style={styleMenu} >
                {/* en Pages.js este esta linkeado para redireccionar al componente Products.js */}
                <li><Link to="/"> {isAdmin ? 'Products' : 'Shop'} </Link></li>

                {/* si es admin saldran los otros dos <li></li> del adminRouter */}
                {isAdmin && adminRouter() }

                {/* si es usuario normal pero esta loggeado saldra el loggesRouter si no le saldra el apartado de Loggin y Register */}
                {isLogged ? loggedRouter() : <li><Link to="/login">Login ~ Register</Link></li> }

                {<li><Link to="/aboutUs">About us</Link></li>}


                
                <li onClick={() => setMenu(!menu)} >
                    <img src={Close} alt="" width="30"  className="menu" />
                </li>
            </ul>


            {
                isAdmin
                ? ''
                :   <div className="cart-icon">
                    <span>{cart.length}</span>
                    {/* en Pages.js este esta linkeado para redireccionar al componente Cart.js */}
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
            </div>
            }

            
        </header>
    )
}

export default Header
