import { createContext,useContext,useEffect,useState } from "react";
import { auth } from "../Config/Firebase";
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext()

function AuthProvider(props){

  const [user,setUser] = useState()

  useEffect(()=>{

     const unsubscribe = onAuthStateChanged(auth,(user) =>{
    setUser(user)
  })
  
  return () => unsubscribe()

  },[])

  const login = (email,password) => signInWithEmailAndPassword(auth,email,password)

  const register = (email,password,name,apellido) => createUserWithEmailAndPassword(auth,email,password,name,apellido)

  const logout = () => signOut(auth)

  return(
    <AuthContext.Provider value = {{login,register,user,logout}}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export {AuthContext,AuthProvider,useAuth}