"use client";
import React, { useState } from 'react'


interface TodoItemProps {
    id: string;
    title: string;
    complete: boolean;
}

const TodoItem = ({id, complete, title }: TodoItemProps) => {
    const [isComplete, setIsComplete] = useState<boolean>(complete);

   const handleComplete = () => {

    const completeStatus = !isComplete;

    setIsComplete(completeStatus);

    }

    console.log(isComplete);

    

  return (
    <li>
        <p>{title}</p>
       <input id={id} type='checkbox' onChange={handleComplete}></input> 
       <label htmlFor={id}></label>
      
    </li>
  )
}

export default TodoItem
