import {useEffect, useState} from "react"
import Layout from "../Components/Layout/Layout"
import {auth, db} from "../Config/Firebase"
import { getDoc,doc,updateDoc } from "firebase/firestore"
import { useNavigate} from "react-router-dom"
import { useAuth } from "../Context/AuthContext"


function Perfil(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [apellido,setApellido] = useState("")
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)
  
  const navigate = useNavigate()

  const {user} = useAuth()
  
  async function HandleProduct(user){

   
    try {
      
      const docref = doc(db,"Usuarios",user.uid)
      const docsnap = await getDoc(docref)

      if (docsnap.exists()){
        const data = docsnap.data()
        setEmail(data.email)
        setPassword(data.password)
        setName(data.name)
        setApellido(data.apellido)
      }
    } catch (error) {
      setError(error.message)
      setError("")
    }
  }

    useEffect(()=>{
    HandleProduct(user)
  },[user])

  function handleSubmit(e){
    e.preventDefault()
    if(!name || !apellido)
    {
      setError("Completar los campos")
      return
    }

    try {
      const docref = doc(db,"Usuarios",user.uid)
      updateDoc(docref,{name,apellido})
      
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

  return(
    <Layout>
      <section id="admin-section">
        <h1>Perfil</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" name="name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
           <label htmlFor="name">Apellido:</label>
          <input type="text" name="apellido" id="apellido" value={apellido} onChange={(e)=>{setApellido(e.target.value)}}></input>
          <button>Editar Perfil</button>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
        </form>        
      </section>
    </Layout>
  )
}
export default Perfil