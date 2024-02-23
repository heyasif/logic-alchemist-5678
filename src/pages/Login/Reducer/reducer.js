import { LOGIN_FAIL, LOGIN_FULLFILLEd, LOGIN_PEN } from "./actionType";
const initial={
    isAuth=false;
    isLoading=true;
}
const reducer=(state=initial,action)=>{
  switch(action.type){
    case LOGIN_PEN:
        return {...state,isAuth:false,isLoading:true}
        case LOGIN_FULLFILLEd:
            return {...state,isAuth:true,isLoading:false}
            case LOGIN_FAIL:
                return {...state,isAuth:false,isLoading:false}
                default:
                    return state;
  }
}