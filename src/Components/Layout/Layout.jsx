import Footer from "../Footer/Footer"
import Header from "../Header/Header"

function Layout(props){
  return(
    <div className="layout-container">
      <Header></Header>
      <main className="main-content">
        {props.children}
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Layout