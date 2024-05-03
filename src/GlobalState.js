import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";

export const GlobalState = createContext();

// basicamente es el que tendra los state de las API's
export const DataProvider = ({ children }) => {
  // crear variable para guardar el token del usuario
  const [token, setToken] = useState(false);

  // usarlo solo una vez
  useEffect(() => {
    // obtener del localStorage (que se pone al momento de hacer login o register y se quita a la hora de hacer logout) el item firstLogin para que solo efectue el resfresToken() si esta logeado
    const firstLogin = localStorage.getItem("firstLogin", true);
    if (firstLogin) {
      // consumir API para el refresh_token
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        // nos dara un objeto con mucha informacion del token entre ellas el accesstoken que es el que nos interesa
        // console.log(token)

        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000); //cada 10 minutos volvera a ejecutarse
      };

      refreshToken();
    }
  }, []);

  // retorna
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    UserAPI: UserAPI(token), //pasarle el token para que verifique si es admin o user
    CategoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
