import React, {useContext} from 'react'

import  {GlobalState} from '../../../GlobalState'


function Filters() {

    // GlobalState
    const state = useContext(GlobalState)
    const [categories] = state.CategoriesAPI.categories
    const[category, setCategory] = state.productsAPI.category
    const[sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    // const [page, setPage] = state.productsAPI.page
    // const [result, setResult] = state.productsAPI.result


    const handleCategory = (e) => {
        setCategory(e.target.value)
        setSearch('')
    }


    return (
        <div className="filter_menu">
            
            {/* por categoria */}
            <div className="row">
                <span>Filtros: </span>
                <select name="category" value={category} onChange={handleCategory} >

                    <option value=""> Todos los productos </option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id } key={category._id} >
                                {category.name}  
                            </option>
                        ))
                    }

                </select>
            </div>

            {/* por busqueda la que incluya lo que se escribe en el input */}
            <input type="text" value={search} placeholder='Buscar producto' 
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            
            {/* por clasificacion */}
            <div className="row sort">
                <span>Clasificar por: </span>
                <select value={sort} onChange={ e => setSort(e.target.value) } >

                    <option value=""> Mas Nuevo </option>
                    <option value="sort=oldest"> Mas Antiguo </option>
                    <option value="sort=sold">  Mejores Ventas  </option>
                    <option value="sort=-price">  Precio: Alto - Bajo  </option>
                    <option value="sort=price">  Precio: Bajo - Alto  </option>

                </select>
            </div>

        </div>
    )
}

export default Filters
