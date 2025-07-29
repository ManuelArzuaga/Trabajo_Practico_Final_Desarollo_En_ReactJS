import { Link } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import "../Header/Header.css"

function Header(){

  const {user,logout} = useAuth()

  function HandleLogout(){
    logout()
  }
  return(
    <header>
      <nav>
        <ul>
          {user && <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Dashboard">Dashboard</Link></li>
            <button onClick={HandleLogout}>Cerrar Sesion</button>
          </>
          }
          {
            !user && <>
               <li><Link to="/Login">Login</Link></li>
              <li><Link to="/Registro">Registro</Link></li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header