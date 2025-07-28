import { Link } from "react-router-dom"

function Header(){
  return(
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/Registro">Registro</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header