import Layout from '../Components/Layout/Layout'
import {db} from "../Config/Firebase"
import { collection,getDocs,doc } from 'firebase/firestore'
import { useState,useEffect } from 'react'


function Home() {

  const [productos,setProductos] = useState([])
  const [error,setError] = useState(null)

  async function handleFetch(){

    const productosRef = collection(db,"Productos")
    const snapshot = await getDocs(productosRef)
    const docs = snapshot.docs.map((doc) => ({id:doc.id,...doc.data()}))
    setProductos(docs)

    useEffect(()=>{
      handleFetch()
    },[])
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
                <p>{producto.price}</p>
                <p>{producto.sku}</p>
                <p>{producto.description}</p>
                <button>Comprar</button>
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
