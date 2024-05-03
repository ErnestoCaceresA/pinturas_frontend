import axios from 'axios';
import React, {useState, useContext} from 'react'

import {GlobalState} from '../../../GlobalState'

function Categories() {

    // Global state
    const state = useContext(GlobalState);
    const [categories] = state.CategoriesAPI.categories
    const [callback, setCallback] = state.CategoriesAPI.callback
    const [token] = state.token
    // crear variable para crear nueva categoria
    const [category, setCategory] = useState('')

    // variables para el renderizado condicional y el createCategory() condicional para ver si esta editando una categoria o si esta creando una nueva
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')


    // submit del form para llamar a la API de categorias para guardar en la base de datos la categoria creada y tambien en la variable categories del GlobalState que eso lo hace en automatico el CategoriesAPI.js
    
    // condicional si es que se esta editando o si se esta creando una nueva
    const createCategory = async (e) => {
        e.preventDefault()
        try {
            if(onEdit){

                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                // console.log(res)

                alert(res.data.msg)


            }else{

                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                // console.log(res)
    
                alert(res.data)
            }
            
            // cambiar setOnEdit
            setOnEdit(false)
            // borrar variable
            setCategory('')
            //callback para que se ejecute el useEffect donde esta el GetCategories() en el CategoriesAPI.js para que cada que se agregue una nueva categoria efectue la busqueda en la base de datos de nuevo y se renderize junto con la nueva sin tener que refrescar
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg) //error del backend
        }
    }


    //funcion para boton editar
    const editCategory = async (id, name) => {

        setID(id) //para usar en el axios.put para actualizar categoria
        setCategory(name) //para que se ponga en el input el nombre que ya tenia la categoria
        setOnEdit(true) //para el renderizado condicional y la funcion createCategory() condicional tambien
    }

    // funcion para boton eliminar
    const deleteCategory = async (id) => {
        try {  
        
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })

            alert(res.data.msg)
            setCallback(!callback) //para que renderize las categorias que estan en la base de datos sin tener que refrescar la pagina, CategoriesAPI.js
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }




    return (
        <div className="categories">

            <form onSubmit={createCategory} >
                <label htmlFor="category"> Category </label>
                <input type="text" name="category" value={category} required
                onChange={(e) => setCategory(e.target.value)} />

                <button type="submit" > {onEdit ? 'Update' : 'Save'} </button>
            </form>
            {/* <h4>{category}</h4> //imprimiría lo que vayas escribiendo en el input ya que se va guardando en la variable */}

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)} > Edit </button>
                                <button onClick={() => deleteCategory(category._id)} > Delete </button>
                            </div>
                        </div>
                    ))
                }
            </div>  
        </div>
    )
}

export default Categories
