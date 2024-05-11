import { useEffect, useState } from "react";
import { TodoProvider } from "./Context";
import { TodoForm, TodoItems } from "./Components";

function App() {
  const [todos, setTodos] = useState([])
  // const [duplicate, setDuplicate] = useState(false)
  // const [duplicateTodo, setDuplicateTodo] = useState({})

  const addTodo = (todo) => {
    let duplicate = false, duplicateTodo = {}
    todos.forEach((data, i) => {
      if (data.todo.toLowerCase() === todo.todo.toLowerCase()) {
        duplicate = true
        duplicateTodo = data
        return
      }
      console.log(i);
    })
    if (!duplicate) {
      setTodos((prev) => [{ id: Date.now(), time: Date.now(), ...todo }, ...prev])
    } else {
      alert(`Duplicate Todo Name!, ${duplicateTodo.todo}`)
    }
  }


  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map(prevTodo => (prevTodo.id === id ? { ...prevTodo, todo: todo } : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
  }
  const complateTodo = (id) => {
    setTodos((prev) => prev.map(prevTodo => prevTodo.id === id ? { ...prevTodo, complated: !prevTodo.complated } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, complateTodo }}>
      <div className="bg-gray-500 min-h-screen py-8 ">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white ">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map(todo => (
              <div key={todo.id}
                className='w-full'>
                <TodoItems todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
