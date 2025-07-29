import Layout from "../Components/Layout/Layout"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import "../Styles/Login.css"

function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)
  const {login} = useAuth()

  const navigate = useNavigate()


  async function handleSubmit(e){

    e.preventDefault()
    setError(null)
    setMessage(null)

    if(!email || !password){
      setError("Complete los campos")
      return
    }

    try {
      await login(email,password)
      setMessage("Usuario logueado")
      setEmail("")
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
      <section id="Login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electronico:</label>
          <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
          <button>Login</button>
        </form>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </section>
    </Layout>
    
  )
}
export default Login