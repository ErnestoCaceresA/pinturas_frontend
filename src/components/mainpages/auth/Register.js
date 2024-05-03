import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {

    // crear variable del usuario
    const [user, setUser] = useState({
        name:'' , email:'' , password: ''
    })

    // crear Onchange para poder escribir en los inputs y guardar resultado en variable user
    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    // crear evento al presionar el boton submit del form
    const registerSubmit = async e => {
        e.preventDefault()
        try {

            // CONSUMIR API del backend para el login en: /user/register  ,  mandandole un POST con el email y password que se encuentran en la variable user
            //al mandarle los datos name, email y password el backend en automatico lo almacena en la base de datos
            await axios.post('/user/register', {...user});
            
            localStorage.setItem('firstLogin', true) //poner en el localStorage que esta logeado para usarlo como validacion en el GlobalState con el getItem() del refresh_token()

            window.location.href = '/';
        
        } catch (err) {

            /* SI ES QUE EL USUARIO YA EXISTE EN BASE DE DATOS O CONTRASEÑA NO VALIDA MANDAMOS UN ALERT CON ESTE VALOR QUE CONTIENE
               EL MENSAJE DE ERROR QUE NOSOTROS PERSONALIZAMOS EN EL BACKEND EN res.status(400).json({msg: "contraseña debe tener almenos 6 caracteres"})
            */
            alert(err.response.data.msg)

        }
    }

    return (
        <div className="login-page">

            <form onSubmit={registerSubmit}>

                <h2>Register</h2>

                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput}/>

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput}/>

                <input type="password" name="password" required autoComplete="on"
                placeholder="password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit" >Register</button>
                    <Link  to="/login">Login</Link>
                </div>

            </form>

        </div>
    )
}

export default Register
