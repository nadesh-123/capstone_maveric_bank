const initialState={
    transactions:[]
}
export const transactionReducer=(state=initialState,action)=>{
    if(action.type==="STORE_TRANSACTIONS"){
        return{
            ...state,
transactions:action.payload
        }
    }
     return state;
}