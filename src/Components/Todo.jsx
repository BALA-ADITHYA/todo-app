import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todos'))||[])
    const inputref = useRef();
    const add = () => {
        const inputText = inputref.current.value.trim();
        if(inputText===''){
            return null
        }else{
        const newToDo ={
            id:todoList.length? todoList[todoList.length-1].id + 1 :1,
            text :inputText,
            isComplete: false
        }

        setTodoList((prevalue)=> [...prevalue,newToDo] )
        inputref.current.value =''}

    }

   
       

    const deleteItem = (id) => {
            setTodoList((pre)=>(pre.filter((todo)=> todo.id!==id 
        )))
    }


    const toggle = (id)=> {
        setTodoList(
            (prevalue)=> ( prevalue.map((todo)=>{
                if(todo.id===id){
                    return {...todo,isComplete:!todo.isComplete}
                }return todo;
            }))
        )
    }

    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todoList))
    },[todoList])


  return (
    <div className=' bg-white place-self-center w-11/12  max-w-md flex flex-col p-7 min-h-[550px] rounded-xl ' >
           <div className=' flex items-center mt-7 gap-2 '>
           <img src={todo_icon} alt="todoicon"
           className=' w-8' />
                <h1 className=' text-3xl font-semibold '>ToDo List</h1>
           </div>
           <div className=' flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputref} type="text" placeholder='Add your task' className=' bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder: text-slate-600' />
            <button onClick={add} className=' border-none rounded-full bg-orange-400 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD+</button>
           </div>

        <div>
        {todoList.map((item,index)=>( <TodoItems 
               key={index} text={item.text}
               id={item.id} isComplete={item.isComplete} deleteItem={deleteItem}
               toggle={toggle}
            />))}
        </div>
    </div>
  )
}

export default Todo
 