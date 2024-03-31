
// import { useQuery } from "@tanstack/react-query";
import Button from "../UI/Button";
// import { axiosInstance } from "../config/axiosConfig";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";
import { ITodo } from "../interface";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "../UI/Textarea";
import { axiosInstance } from "../config/axiosConfig";


const TodoList = () => {
  const storageKey = 'routeLoged';
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null

const [isOpenEdit, setIsOpenEdit] = useState(false);
const [todoToEdit,setTodoToEdit] =useState<ITodo>({title:"",des:""})
const [isOpenModalRemov,setIsOpenRemovModal] =useState(false)

const onCloseEditModal = () =>{
  setTodoToEdit({title:"",des:""})
  setIsOpenEdit(prev =>!prev)
}
const onopenEditModal = (todo:ITodo) =>{
  setTodoToEdit(todo)
  setIsOpenEdit(true)
}

const onCloseRemovModal = () =>{
  setIsOpenRemovModal(false)
}
const onOpenRemoveModal = (todo:ITodo) =>{
  setTodoToEdit(todo)
  setIsOpenRemovModal(true)
}

const { isLoading, data } = useAuthenticatedQuery({
  queryKey:[`todo,${todoToEdit.id}`]
,url:'/users/me?populate=todos',config:{
  headers:{ 'Authorization': `Bearer ${userData.jwt}` }
}})

  if (isLoading) return <div className="flex justify-around items-center">
    <span></span>
    <span></span>
    <h2>Loading.....</h2>
    <span></span>
    <span></span>
    </div>


const changeHandler = (e:ChangeEvent<HTMLInputElement | 
  HTMLTextAreaElement>) => {
 const {value , name} =e.target

 setTodoToEdit({
  ...todoToEdit,
  [name]: value
 })
}

const submitHandeler = async (e:FormEvent<HTMLFormElement>) =>{
  e.preventDefault()
  const {title,des}= todoToEdit;
  try {
    const {status} = await axiosInstance.put(`/todos/${todoToEdit.id}`
    ,{data:{title,des}},{
      headers:{
        Authorization: `Bearer ${userData.jwt}`
      }
    });
    if(status===200){
      onCloseEditModal()
    }
  } catch (error) {
    console.log(error)
  }
  
}

const onRemove = async () => {
   
  try {
    const {status} = await axiosInstance.delete(`/todos/${todoToEdit.id}`,{
      headers:{Authorization:`Bearer ${userData.jwt}`}})
    
    if(status === 200){
      onCloseRemovModal()
    }
  } catch (error) {
    console.log(error)
  }
}


    return (
      <main className="flex flex-col justify-around items-center space-y-5" >
        <span></span>
        <span></span>
        {data.todos.length ? data.todos.map((todo:ITodo) => ( 
        <div key={todo.id} className="border-2 p-2 border-white w-96">
      <div className="flex items-center justify-between p-3 space-x-8
       rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{todo.title}</p> 

        <div className="flex items-center justify-end w-full space-x-3">
            <Button onClick={() =>{onopenEditModal(todo)}} 
            className="bg-green-600 text-sm p-1">Edit</Button>
          <Button onClick={() => onOpenRemoveModal(todo)}
           className="bg-red-500 text-sm p-1">Remove</Button>
        </div>
      </div>
      </div>
       )  
       ) : <h2>No Todo</h2> }
       
       {/* Edit partie */}
       <Modal isOpen={isOpenEdit} closeModal={onCloseEditModal} 
       title="edit todo">
        <form onSubmit={submitHandeler} className="space-y-2" >

          <Input name='title' value={todoToEdit.title} 
          onChange={changeHandler}/>
        <Textarea name='descreption' value={todoToEdit.des} 
        onChange={changeHandler} />

        <div className="flex justify-center items-center space-x-1">
          <Button className="bg-blue-700">Edit</Button>
          <Button onClick={onCloseEditModal} className="bg-stone-400">Cancel</Button>
        </div>
        </form>
        
       </Modal>
        {/* fin Edit partie */}

        {/* Remove partie */}
       <Modal isOpen={isOpenModalRemov} closeModal={onCloseRemovModal} 
       title="Remove  todo">
        <form className="space-y-2" >

        <div className="flex justify-center items-center space-x-1">
          <Button onClick={onRemove} 
          className="bg-red-700">Remove this</Button>
          <Button onClick={onCloseRemovModal} 
          className="bg-stone-400">Cancel</Button>
        </div>
        </form>
        
       </Modal>
        {/* fin Remove partie */}
     
     <span></span>
        <span></span>
      </main>
      
    );
  };
  
  export default TodoList;