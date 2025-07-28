import Footer from "../Footer/Footer"
import Header from "../Header/Header"

function Layout(props){
  return(
    <>
    <Header></Header>
    {props.children}
    <Footer></Footer>
    </>
  )
}

export default Layout