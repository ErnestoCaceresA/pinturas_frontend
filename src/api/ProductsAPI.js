import {useState, useEffect} from 'react'
import axios from 'axios'



function ProductsAPI() {
    
    // useState hook
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    // variables
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

   // llamar API backend para obtener productos de la base de datos
    // en el package.json se agrego el: "proxy": "http://localhost:5000" es LA DIRECCION DONDE ESTA CORRIENDO NUESTRO BACKEND
    useEffect(()=>{

        const getProducts = async () => {
        // obteniendo la api de GET en el backend http://localhost:5000/api/products
        const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
        
        //la api esta en: 
        // console.log(res)
        // obteniendo los productos que estan en la base de datos:
        // console.log(res.data.products)
        // Asignando los datos de los productos a la variable products del useState hook
        setProducts(res.data.products)
        // console.log(res)
        setResult(res.data.result)
     }

        getProducts()
    },[callback, category, sort, search, page]) //para que cada que cambien esas variables vuelva a hacer la busqueda en la base de datos de los productos

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ProductsAPI
