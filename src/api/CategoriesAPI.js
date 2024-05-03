import {useState, useEffect}  from 'react'
import axios from 'axios'

function CategoriesAPI(token) {

    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getCategories = async() => {
            const res = await axios.get('/api/category')
            // console.log(res)
            setCategories(res.data)
        }

        getCategories()
    },[callback]) //callback para que renderize en automatico el getCategories() cuando se cree una nueva categoria en el componente Categories.js
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI
