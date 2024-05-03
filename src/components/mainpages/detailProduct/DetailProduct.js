import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productitem/ProductItem'

function DetailProduct() {

    // obtener los parametros que se mandan en el path="/detail/parametro_id_del_producto"
    // path = /detail/:id
    // en esa variable "params" es un objeto que contendra todos los parametros que se manden en la path
    const params = useParams()

    // objeter la productsAPI
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products

    // obtener funcion addCart de la UserAPI.js para agregar al carrito
    const addCart = state.UserAPI.addCart; 

    // useState hook para el detailProduct
    const [detailProduct, setDetailProduct] = useState([])


    useEffect(() => {
        // obtener el producto del arreglo "products" que contiene todos los productos, obetener unicamente el que coincida con el id que se mande en los params
        // y posteriormente guardarlo en la variable detailProduct

        console.log('re render')
        
        if(params){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params, products])

    // en la variable detailProduct estara en Objeto del producto que coincidio con la busqueda
    console.log(detailProduct)

    if(detailProduct.length === 0) return null

    return (
        <>
            <div className="detail">
                {/* ya que tenemos el detailProduct, usamos sus propiedades para hacer el diseño con su informacion */}

                <img src={detailProduct.images.url} alt=" " />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>${detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p className="content">{detailProduct.content}</p>
                    <p>Vendidos: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart" onClick={() => addCart(detailProduct)}>Comprar Ahora</Link>
                </div>
            </div>

            <div>
                {/* AHORA RENDERIZAMOS LOS PRODUCTOS RECOMENDADOS, los que coincidan en categoria con este detailProduct y renderizando el componente ProductItem pasandole el props del producto a renderizar */}
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
