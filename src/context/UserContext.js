import React from 'react'
import { createContext , useReducer} from 'react'
import reducer from '../store/Login/reducer' 


const UserContext = createContext()
export const UserProvider = ({children})=> {
    const initialuser=null


const [state,dispatch]=useReducer(reducer,initialuser)




return (<UserContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </UserContext.Provider>)
}

export default UserContext