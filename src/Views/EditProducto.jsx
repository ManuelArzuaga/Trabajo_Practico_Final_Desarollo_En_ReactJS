import {useEffect, useState} from "react"
import Layout from "../Components/Layout/Layout"
import {db} from "../Config/Firebase"
import { getDoc,doc,updateDoc } from "firebase/firestore"
import { useNavigate,useParams } from "react-router-dom"


function EditProducto(){

  const [name,setName] = useState("")
  const [price,setPrice] = useState(0)
  const [description,setDescription] = useState("")
  const [categoria,setCategoria] = useState("")
  const [sku,setSKU] = useState("")
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)
  
  const navigate = useNavigate()

  const {id} = useParams()

  async function HandleProduct(id){

    try {
      
      const docref = doc(db,"Productos",id)
      const docsnap = await getDoc(docref)

      if (docsnap.exists()){
        const data = docsnap.data()
        setName(data.name)
        setPrice(data.price)
        setDescription(data.description)
        setCategoria(data.categoria)
        setSKU(data.sku)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(()=>{
    HandleProduct(id)
  },[id])

  function handleSubmit(e){
    e.preventDefault()
    if(!name || !price || !sku || !description)
    {
      setError("Completar los campos")
      return
    }

    try {
      const docref = doc(db,"Productos",id)
      updateDoc(docref,{name,price,description,sku,categoria})
      
    } catch (error) {
      setError(error.message)
    }
    
    setTimeout(()=>{
      setMessage("Redirigiendo al home")
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
        <h1>Panel de actualizacion</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre del producto:</label>
          <input type="text" name="name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
          <label htmlFor="price">Precio:</label>
          <input type="number" name="price" id="price" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
          <label htmlFor="categoria">Precio:</label>
          <input type="text" name="categoria" id="categoria" value={categoria} onChange={(e)=>{setCategoria(e.target.value)}}></input>
          <label htmlFor="description">Descripcion:</label>
          <textarea name="description" id="description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
          <div className="sku">
            <label htmlFor="sku">SKU:</label>
            <input type="text" name="sku" id="sku" value={sku} onChange={(e)=>{setSKU(e.target.value)}}></input>
            {
              name && categoria &&  <button type="button" className="generar-sku-button" onClick={generarSKU}>Generar SKU</button>
            }   
          </div>
          <button>Editar Producto</button>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
        </form>        
      </section>
    </Layout>
  )
}
export default EditProducto