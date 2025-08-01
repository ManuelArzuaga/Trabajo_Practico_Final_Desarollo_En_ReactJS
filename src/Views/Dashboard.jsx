import {useEffect, useState} from "react"
import Layout from "../Components/Layout/Layout"
import {db} from "../Config/Firebase"
import { collection,addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import "../Styles/Dashboard.css"

function Dashboard(){

  const [name,setName] = useState("")
  const [price,setPrice] = useState(0)
  const [description,setDescription] = useState("")
  const [sku,setSKU] = useState("")
  const [categoria,setCategoria] = useState("")
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)

  const productosRef = collection(db,"Productos")
  const navigate = useNavigate()

  async function CreateProduct(productData){

    try {
      const productosref = await addDoc(productosRef,productData)
      return productosref
    } catch (error) {
      setError(error.message)
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!name || !price || !sku || !description || !categoria)
    {
      setError("Completar los campos")
      return
    }

    const newProduct = {name,price,sku,description,categoria}

    CreateProduct(newProduct)
    setTimeout(()=>{
      setName("")
      setPrice(0)
      setDescription("")
      setSKU("")
      setCategoria("")
      setError("")
      setMessage("Producto agregado")
    },2000)

     setTimeout(()=>{
      navigate("/")
    },4000)
  }

  function generarSKU(){
    
    const nombreAbreviado = name.slice(0,3).toUpperCase()
    const categoriaAbreviada = categoria.slice(0,3).toUpperCase()
    const tiempodecreacion = Date.now().toString().slice(-5)

    setSKU(`${nombreAbreviado}-${categoriaAbreviada}-${tiempodecreacion}`)
    
  }
  
  return(
    <Layout>
      <section id="admin-section">
        <h1>Panel de administracion</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre del producto:</label>
          <input type="text" name="name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
          <label htmlFor="price">Precio:</label>
          <input type="number" name="price" id="price" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
          <label htmlFor="categoria">Categoria:</label>
          <input name="categoria" id="categoria" value={categoria} onChange={(e)=>{setCategoria(e.target.value)}}></input>
          <label htmlFor="description">Descripcion:</label>
          <textarea name="description" id="description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
          <div className="sku">
            <label htmlFor="sku">SKU:</label>
            <input type="text" name="sku" id="sku" value={sku} onChange={(e)=>{setSKU(e.target.value)}}></input>
            {
              name && categoria &&  <button type="button" className="generar-sku-button" onClick={generarSKU}>Generar SKU</button>
            }   
          </div>
          <button>Agregar Producto</button>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
        </form>   
        
        
      </section>
    </Layout>
  )
}
export default Dashboard