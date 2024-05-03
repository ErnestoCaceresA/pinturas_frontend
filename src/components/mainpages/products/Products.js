import React, {useContext, useState} from 'react'
import axios from 'axios'

import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productitem/ProductItem'
import Loading from '../utils/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'

function Products() {

    const state = useContext(GlobalState) 
    
    // imprime objeto que contiene el productsAPI y el token y el UserAPI que contien si esta loggeado y si es Admin (GlobalState.js)
    // console.log(state)
    // del objeto state sacar solamente los productos
    const [products, setProducts] = state.productsAPI.products
    // imprime unicamente los productos
    // console.log(products)

    // sacar variable isAdmin del UserAPI.js para saber si es Admin el usuario o no 
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback

    // variables nuevas
    const [loading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)


    const handleCheck = (id) => {
        // console.log(id) //el id se paso como argumento en ProductItem.js en el handleCheck
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        // console.log(id, public_id) //retorna el id del producto y el public_id de la imagen (se mandaron como argumento en BtnRender.js)
        try {
            
            setLoading(true)
            const destroyImg = await axios.post('api/destroy', {public_id}, {
                headers: {Authorization: token}
            })

            const deleteProduct = await axios.delete(`api/products/${id}`, {
                headers: {Authorization: token}
            })
            await destroyImg
            await deleteProduct
            setLoading(false)


            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isChecked
        })
        setProducts([...products])
        setIsChecked(!isChecked)
    }

    const deleteAll = async () => {
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }


    if(loading) return  <Loading />   

    return (
        <>  

            <Filters />

            {
                isAdmin && 
                <div className="delete-all">
                    <span>Seleccionar Todo</span>
                    <input type="checkbox" checked={isChecked} onChange={checkAll} />
                    <button onClick={deleteAll} >Borrar Todo</button>
                </div>
            }

            <div className="products">
                {
                    // con este clasname se hace el diseño general de la caja contenedora de todos los productos y en el '../utils/productitem/productItem.css' va el diseño de cada Item
                
                    // hacer un mapping del arreglo para sacar cada producto del arreglo junto con su unique key y retornando el componente ProductItem que esta en la carpeta utils/prodcutitem/
                    // se le pasa de props el producto que se esta mappeando para que el componente agarre la info y la presente ya en bonito
                    products.map(product => {
                        return <ProductItem key={product._id} product={product}
                            isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} //variable para saber si es admin o no (sirve para la vista de administrador en ProductIten.js)
                        />
                    })
                }
            </div>

            {/* Cargar mas productos siguiente pagina*/}
            <LoadMore />

            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products
