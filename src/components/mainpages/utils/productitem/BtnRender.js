import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import {GlobalState} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {

    // global state que contiene los productos y el estado si es admin o si esta loggeado y tambien contiene la funcion addCart
    const state = useContext(GlobalState) 
    const [isAdmin] = state.UserAPI.isAdmin
    const addCart = state.UserAPI.addCart

    return (
        <div className="row_btn">
                {/* RENDERIZAR CONDICIONALMENTE SI ES ADMIN O SI ES USUARIO NORMAL */}
            {
                isAdmin 
                ?
                 <>
                    <Link id="btn_buy" to="#!" onClick={ () => deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                 </>
                :
                <> 
                     <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                        Buy
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        view
                    </Link>
                </> 
            }

           
            
        </div>
    )
}

export default BtnRender
