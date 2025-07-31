import { createContext,useContext,useEffect,useState } from "react";
import { auth } from "../Config/Firebase";
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";
import { db } from "../Config/Firebase";

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

  async function register(email,password,name,apellido){
    
    const userCredential = await createUserWithEmailAndPassword(auth,email,password,name,apellido)
    
    const useruid = userCredential.user

    await setDoc(doc(db,"Usuarios",useruid.uid),{
        name:name,
        apellido:apellido,
        email:email,
        password:password
      })
  }

  const logout = () => signOut(auth)

  return(
    <AuthContext.Provider value = {{login,register,user,logout}}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export {AuthContext,AuthProvider,useAuth}