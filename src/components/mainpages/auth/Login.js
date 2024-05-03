import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Login() {

    // crear variable del usuario
    const [user, setUser] = useState({
        email:'', password: ''
    })

    // crear Onchange para poder escribir en los inputs y guardar resultado en variable user
    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    // crear evento al presionar el boton submit del form
    const loginSubmit = async e => {
        e.preventDefault()
        try {

            // CONSUMIR API del backend para el login en: /user/login  ,  mandandole un POST con el email y password que se encuentran en la variable user
            await axios.post('/user/login', {...user});
            
            localStorage.setItem('firstLogin', true) //poner en el localStorage que esta logeado para usarlo como validacion en el GlobalState con el getItem() del refresh_token()

            window.location.href = '/';
        
        } catch (err) {

            /* SI ES QUE EL USUARIO NO EXISTE EN BASE DE DATOS O CONTRASEÑA INCORRECTA MANDAMOS UN ALERT CON ESTE VALOR QUE CONTIENE
               EL MENSAJE DE ERROR QUE NOSOTROS PERSONALIZAMOS EN EL BACKEND EN res.status(400).json({msg: "usuario no existe"})
            */
            alert(err.response.data.msg)

        }
    }

    return (
        <div className="login-page">

            <form onSubmit={loginSubmit}>

                <h2>Login</h2>
                
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput}/>

                <input type="password" name="password" required autoComplete="on"
                placeholder="password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit" >Login</button>
                    <Link  to="/register">Register</Link>
                </div>

            </form>

        </div>
    )
}

export default Login
