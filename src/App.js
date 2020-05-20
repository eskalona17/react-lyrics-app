import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";

import axios from "axios";
import Cancion from "./components/Cancion";
import Info from "./components/Info";

function App() {
  //definir el state
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    //para revisar si un objeto está vacio
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const URL = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const URL2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      //hacemos una promesa para asegurarnos de que llamamos a las dos apis a la vez
      const [letra, informacion] = await Promise.all([axios(URL), axios(URL2)]);

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);

      // const resultado = await axios(URL);
      // guardarLetra(resultado.data.lyrics);
    };

    consultarAPILetra();
  }, [busquedaLetra, info]);
  return (
    <>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
