import Layout from '../Components/Layout/Layout'
import {db} from "../Config/Firebase"
import { collection,getDocs,doc,deleteDoc} from 'firebase/firestore'
import { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {useAuth} from "../Context/AuthContext"
import "../Styles/Home.css"


function Home() {

  const [productos,setProductos] = useState([])
  const [error,setError] = useState(null)

  const navigate = useNavigate()

  const {user} = useAuth() 

  async function handleFetch(){

    try {
      const productosRef = collection(db,"Productos")
      const snapshot = await getDocs(productosRef)
      const docs = snapshot.docs.map((doc) => ({id:doc.id,...doc.data()}))
      setProductos(docs)
    } catch (error) {
      setError(error.message)    
    }
  }

  useEffect(()=>{
      
      handleFetch()
      
    },[])

    function iraDetalles(producto){
      navigate("/Producto",{state:producto})
    }

    async function handleDelete(id){

      try {

        if(confirm("Borrar el producto")){
          await deleteDoc(doc(db,"Productos",id))
          setProductos(productos.filter(p=>p.id !=id))
        }

      } catch (error) {
        setError(error.message)
      }
    }



  return (
    <Layout>
      <main>
        <section className='Banner-Inicial'>
          <h1>Bienvenidos a la tienda</h1>
        </section>
        <section className='Productos'>
          {
            error && <p>{error}</p> 
          }
         {
          productos.map((producto) =>{
            return(
              <div className='producto'>
                <h1>{producto.name}</h1>
                <p>Precio: {producto.price}</p>
                <p>SKU: {producto.sku}</p>
                <p>Descripcion: {producto.description}</p>
                <button onClick={()=>iraDetalles(producto)}>Detalles</button>
                
                {
                user && <div className='botones-usuario'>
                    <Link to={`/editar-producto/${producto.id}`}>Editar</Link>
                    <button onClick={()=>handleDelete(producto.id)}>Borrar</button>
                  </div>
                }
                
              </div>
            )
          })
        }
        </section>
      </main>
    </Layout>
  )
}

export default Home
