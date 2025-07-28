import { Link } from "react-router-dom"
import "../Header/Header.css"

function Header(){
  return(
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/Registro">Registro</Link></li>
          <li><Link to="/Dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header