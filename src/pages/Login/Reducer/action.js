import { LOGIN_FAIL, LOGIN_FULLFILLEd, LOGIN_PEN } from "./actionType"

function login_fullfilled(){
    return {type:LOGIN_FULLFILLEd}
 }
 function login_pending(){
    return {type : LOGIN_PEN}
 }
 function login_fail(){
    return{type : LOGIN_FAIL}
 }

 function logins(name,password){
    return async(dispatch)=>{
try{
  dispatch(login_pending())
await fetch('https://epicbazaar.onrender.com/users',{
  method:"POST",
  headers:{
      "Content-Type":"application/json"
  },
  body:JSON.stringify({email:name,password})
}).then(res=>res.json())
  dispatch(login_fullfilled())

  
}
catch(err){
  console.log("error")
  dispatch(login_fail());
}
}
}

export default logins