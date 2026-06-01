import React from 'react';
import {useState} from 'react'
const Sample= () => {
  const [data,setData] = useState([]);
  const [user,setUser]=useState({});
  const [index,setIndex]=useState(null);
const onchange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    console.log(user);
}
const onclick=()=>{
    if(index!==null&&index!==undefined){
        data.map((person,i)=>{
         data[i]=index==i?user:person
         setIndex(null);
         setUser({name:'',age:''})
        })
    }
    else{
    setData([...data,user]);
    setUser({name:'',age:''})
}}
function del(index){
   const filterdata= data.filter((_,i)=>
        i!==index
    )
    setData(filterdata)
}
const edit=(index)=>{
setIndex(index);
setUser(data[index]);

}

  return (
    <div className="p-4">
        <div className='flex flex-col w-32 gap-5'>
            <input className="bg-red-500" onChange={onchange} value={user.name} type="text" name='username'className='border outline-1 bg-gray-100'/>
            <input onChange={onchange} value={user.age}type="text" name='password' className='border outline-1 bg-gray-100'/>
            <button className=' ' onClick={onclick}> add</button>
        </div>
      <table className="  w-full">
        <thead>
          <tr className=" border bg-gray-100">
            <th className="border px-4 py-2">name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">operations</th>
          </tr>
        </thead>
        <tbody>
            
                {data.map((person,index)=>(
                 <tr key={index}>
                    <td>{person.name}</td>
                    <td>{person.age}</td>
                    <td>
                        <button className="bg-red-500" onClick={()=>edit(index)}>edit</button>
                        <button className="bg-red-500" onClick={()=>del(index)}>delete</button>
                    </td>
                 </tr>
                )


                )}
        
        </tbody>
      </table>
    </div>
  );
};

export default Sample;
