import React from 'react'
import {useState} from 'react'

const Sample2 = () => {
    const [data,setData]=useState({});
    const onchange=(e)=>{
setData({...data,[e.target.name]:e.taret.value});
    }

  return (
    <div className='flex flex-col bg-slate-950'>
      <input className='' placeholder='name' type="text"  name='name' value={data.name} onChange={onchange}/>
      <input type="text"  placeholder='age' name='age' value={data.age} onChange={onchange}/>
    </div>
  )
}

export default Sample2
