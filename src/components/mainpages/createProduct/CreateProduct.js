import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "Descripcion breve de su producto",
  content: "Descripcion mas profunda del producto",
  category: "",
  _id: "",
};

function CreateProduct() {
  // global state
  const state = useContext(GlobalState);
  // variables
  const [product, setProduct] = useState(initialState); //modelo arriba en el initialState es un objeto
  const [categories] = state.CategoriesAPI.categories;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [products] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.callback;
  const [token] = state.token;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const navigate = useNavigate();
  const param = useParams();

  // useEffect para el edit mode
  useEffect(() => {
    if (param.id) {
      // de todos lso productos de la base de datos que trajimos del GlobalState buscar el que coincida con el param.id
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product); //para que en el form de crear producto aparezca con la informacion de ese producto a editar
          setImages(product.images); //para que en el form de crear producto aparezca con la imagen de el producto a editar
        }
      });
      setOnEdit(true);
    } else {
      setProduct(initialState);
      setImages(false);
      setOnEdit(false);
    }
  }, [param.id, products]); //efectuar cada que cambie el param.id

  // oncChange , input file upload handler para subir imagen a cloudinary
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Usted no tiene permisos de administrador");

      const file = e.target.files[0]; //obtener archivo subido
      // console.log(file) //imprime un objeto con toda la informacion del archivo subido como size, type, etc

      if (!file) return alert("No se subió ningun archivo");

      if (file.size > 1024 * 1024)
        //1mb
        return alert("Archivo demasiado pesado");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        //1mb
        return alert("Tipo de archivo no valido");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true); //para animacion de cargando

      // API para subir imagen a cludinary
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false); //para detener animacion de cargando

      // console.log(res) //retorna el bjeto con la respuesta del API y en el atributo data esta el public_id y el url de el archivo

      setImages(res.data); //guardar en variable
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  // onClick,  span de tachita para quitar el archivo subido y borrarlo de cloudinary
  const handleDestory = async () => {
    try {
      if (!isAdmin) return alert("Usted no tiene permisos de administrador");

      setLoading(true);

      // API para delete image
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );

      setLoading(false);

      setImages(false); //para quitar vista del file_upload
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  // onChange, input de texto handler
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value }); // en la variable product guardamos las actualizaciones de la plantilla initialState (con el ...product) cuando en los inputs poniamos value={product.product_id} y todos esos para ir haciendo la plantilla
  };

  // onSubmit, handler para el form al dar click en submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Usted no tiene permisos de administrador");
      if (!images) return alert("No image Upload");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }

      setCallback(!callback);
      navigate("/"); //guardamos en history
    } catch (err) {
      // console.log(err)
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none", //dependiendo de la variable del useState "images" si esta en true o en false cambia la vista del style para el .file_img html
  };

  return (
    <div className="create_product">
      <div className="upload">
        {/* tipo file para subir una imagen */}
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {
          // vista de Loading si aun se esta haciendo la peticion http al servidor
          loading ? (
            <div id="file_img">
              {" "}
              <Loading />{" "}
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              {/* si el images esta en false saldra la vista para subir imagen si esta en true saldra la imagen que esta aqui en grande y el span de la " X " */}
              {/* src= a la variable images en la cual se guarda la imagen que se mando al backen en el handerUpload function */}
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDestory}> X </span>
            </div>
          )
        }
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id"> Product ID </label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title"> Title </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price"> Price </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description"> Description </label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content"> Content </label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories"> Category </label>
          {/* para seleccionar entre las categorias creadas en la base de datos */}
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Porfavor seleccione una categoría</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit"> {onEdit ? "Actualizar" : "Crear"} </button>
      </form>
    </div>
  );
}

export default CreateProduct;
