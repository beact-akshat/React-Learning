import React, { useState } from "react"
import { useTodo } from "../Context"
import moment from "moment"


function TodoItems({ todo }) {
    const [isEditting, setIsEdditing] = useState(false)
    const [todoName, setTodoName] = useState(todo.todo)
    const { updateTodo, deleteTodo, complateTodo } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, todoName)
        setIsEdditing(false)
    }

    const markDoneTodo = () => {
        complateTodo(todo.id)
    }

    const removeTodo = () => {
        deleteTodo(todo.id)
    }

    return (
        <div className={`flex  border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todo.complated ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.complated}
                onChange={markDoneTodo}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isEditting ? "border-black/10 px-2" : "border-transparent"} ${todo.complated ? "line-through" : ""}`}
                onChange={(e) => setTodoName(e.target.value)}
                value={todoName}
                readOnly={!isEditting}
            />
            <span>
                {moment(todo.time).format('hh:mm:ss')}
            </span>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50  hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.complated) return
                    if (isEditting) {
                        editTodo()
                    } else setIsEdditing(prev => !prev)
                }}
                disabled={todo.complated}
            >
                {isEditting ? "📁" : "✏️"}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => removeTodo(true)}
            >
                ❌
            </button>
        </div>
    )
}

export default TodoItems