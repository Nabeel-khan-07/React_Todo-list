import React, { useEffect, useState } from 'react'
import './style.css'

const getlocalData = ()=>{
    const lists = localStorage.getItem('mytodolist')
    if (lists){
        return JSON.parse(lists)
    }else{
        return []
    }
}

const Todo = () => {
    const[input,setInput]=useState("")
    const[items,setItems]=useState(getlocalData())
    const[isEditItem,setIsEditItem]=useState('')
    const[toggleButton,setToggleButton]=useState(false)

    function addItem(){
        if (!input){
            alert('Plz fill some data')
        }else if(input && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return {...curElem,name:input}
                    }
                    return curElem
                })
            )
            setInput('')
            setIsEditItem(null)
            setToggleButton(false)
        }else{
            const myNewInput = {
                id:new Date().getTime().toString(),
                name:input,
            }
            setItems([...items,myNewInput])
            setInput('')
        }
        
    }

    const deleItem = (index)=>{
        const updatedItem = items.filter((curElem)=>{
            return curElem.id !==index
        })
        setItems (updatedItem)
    }

    const editItem=(index)=>{
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index
        })
        setInput(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }

    const removeAll=()=>{
        setItems([])
    }

    useEffect(()=>{
        localStorage.setItem('mytodolist',JSON.stringify(items))
    },[items])

  return (
    <div>
      <div className='d1'>
        <div className='d2'>
            <figure>
                <img src="https://t3.ftcdn.net/jpg/04/69/37/96/240_F_469379678_sDEIXILblag24eA3ki4udVHsRv1hGKIn.jpg" alt="" />
                <figcaption>Add Your List Here ✔</figcaption>
            </figure>
            <div className='d3'>
                <input type="text" placeholder='Add Items' value={input} onChange={(e)=>setInput(e.target.value)}/>
                {toggleButton?(<i className="fa-solid fa-pen-to-square" onClick={addItem}></i>):(<i className="fa-solid fa-plus" onClick={addItem}></i>)}
              
            </div>

            <div>
                {items.map((curElem,index)=>{
                    return (
                        <div className='d4' key={curElem.id}>
                    <h4>{curElem.name}</h4>
                    <div className='d5'>
                    <i className="fa-solid fa-pen-to-square"  onClick={()=>editItem(curElem.id)}></i>
                    <i className="fa-solid fa-trash-can" onClick={()=>deleItem(curElem.id)}></i>
                    </div>
                    </div>
                    )
                })}
                
            </div>
            <br />
            <div>
                <button onClick={removeAll}>Remove All</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Todo