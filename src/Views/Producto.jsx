import Layout from "../Components/Layout/Layout";
import { useLocation } from "react-router-dom";

function Producto(){
  
  const location = useLocation()

  const producto = location.state

  return(
    <Layout>
      <div className="contenedor-producto">
        <h1>{producto.name}</h1>
        <p>Precio: {producto.price}</p>
        <p>SKU: {producto.sku}</p>
        <p>Descripcion: {producto.description}</p>
        <button>Comprar</button>
      </div>
    </Layout>
  )
}

export default Producto