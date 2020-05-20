import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";

import axios from "axios";

function App() {
  //definir el state
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");

  useEffect(() => {
    //para revisar si un objeto está vacio
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const URL = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      const resultado = await axios(URL);
      guardarLetra(resultado.data.lyrics);
    };

    consultarAPILetra();
  }, [busquedaLetra]);
  return (
    <>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
    </>
  );
}

export default App;
