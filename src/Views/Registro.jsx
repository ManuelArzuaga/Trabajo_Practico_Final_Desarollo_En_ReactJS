import Layout from "../Components/Layout/Layout"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../Styles/Registro.css"

function Registro(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [Apellido,setApellido] = useState("")
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)

  const navigate = useNavigate()


  function handleSubmit(e){

    e.preventDefault()
    setError(null)
    setMessage(null)

    if(!email || !password){
      setError("Complete los campos")
    }

    try {
      console.log({email,password})
      setMessage("Usuario logueado")
      setEmail("")
      setPassword("")
      setName("")
      setPassword("")

      setTimeout(()=>{
        setMessage("Redirigiendo al home")
      },2000)

      setTimeout(()=>{
        navigate("/")
      },4000)
    } catch (error) {
      setError(error.message)
    }
  }

  return(
    <Layout>
      <section id="registro">
        <h1>Regsitro</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electronico:</label>
          <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
          <label htmlFor="name">Nombre:</label>
          <input type="text" name="name" id="name" onChange={(e)=>{setName(e.target.value)}}></input>
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" name="apellido" id="apellido" onChange={(e)=>{setApellido(e.target.value)}}></input>
          <button>Registro</button>
        </form>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </section>
    </Layout>
    
  )
}
export default Registro