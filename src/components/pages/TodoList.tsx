
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
import TodoSkeleton from "./TodoSkeleton";
import { faker } from '@faker-js/faker';


const TodoList = () => {
  const storageKey = 'routeLoged';
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null

const [isOpenEdit, setIsOpenEdit] = useState(false);
const [todoToEdit,setTodoToEdit] =useState<ITodo>({title:"",des:""})
const [isOpenRemovModal,setIsOpenRemovModal] =useState(false)
const [isOpenAddModal,setIsOpenAddModal] =useState(false)
const [todoAdd, setTodoAdd] = useState({title:"",des:""});
const [queryVersion,setQueryversion]=useState(1)

const onCloseEditModal = () =>{
  setTodoToEdit({title:"",des:""})
  setIsOpenEdit(prev =>!prev)
}
const onopenEditModal = (todo:ITodo) =>{
  setTodoToEdit(todo)
  setIsOpenEdit(true)
}

const onOpenAddModal = () =>{
  setIsOpenAddModal(true)
}


const onCloseAddModal = () =>{
  setIsOpenAddModal(false)
  setTodoAdd({title:"",des:""})
}

const onCloseRemovModal = () =>{
  setIsOpenRemovModal(false)
}
const onOpenRemoveModal = (todo:ITodo) =>{
  setTodoToEdit(todo)
  setIsOpenRemovModal(true)
}

const { isLoading, data } = useAuthenticatedQuery({
  queryKey:[`todo,${queryVersion}`]
,url:'/users/me?populate=todos',config:{
  headers:{ 'Authorization': `Bearer ${userData.jwt}` }
}})

  if (isLoading) return <div className="flex justify-around items-center">
    <span></span>
    <span></span>
    <div className="space-y-1 ">
         {
          Array.from({length:4}).map((_,i)=>(
            <TodoSkeleton key={i} />
          ))
         }
       </div>
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

const onChangeAddTodoHandler = (e:
  ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
  const {value,name} = e.target;

  setTodoAdd({
    ...todoAdd,[name]: value
  })
}

const submitAddHandeler = async (e:FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
  const {title,des}= todoAdd;
  try {
  const {status} =  await axiosInstance.post(`/todos`,
  {data:{title,des,user:[userData.user.id]}},{
    headers:{ 
       Authorization: `Bearer ${userData.jwt}`,
              }
  })
  if(status === 200){
    onCloseAddModal()
    setQueryversion(prev => prev +1)
   
  }
  } catch (error) {
    console.log(error)
  }

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
      setQueryversion(prev => prev +1)
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
      setQueryversion(prev => prev +1)
    }
  } catch (error) {
    console.log(error)
  }
}


  const generateTodos = async () =>{
        
     for (let index = 0; index < 10; index++) {
       
  
    try {
         const {status}= await axiosInstance.post(`/todos/`,
     {data:{title:faker.word.words(5),
         des:faker.lorem.paragraph(2)
      ,user:[userData.user.id]}},{
         headers:{ 
            Authorization: `Bearer ${userData.jwt}`,
                  }
   })

      if(status === 200){
        
        setQueryversion(p => p + 1)
     }
      
       } catch (error) {
        console.log(error)
       }  
      
     }
   }



    return (
      <main className="space-y-1" >
        <div className="flex justify-center items-center space-x-4">
      
      <span></span>
      <span></span>
      
         <Button onClick={onOpenAddModal}
         className="bg-blue-700 text-sm text-white w-40">
        Create New Todo
        </Button>

        <Button 
        className="bg-stone-400 text-sm text-white w-40"
         onClick={generateTodos}>
        Take fake Todo
        </Button>
        
        </div>
        <div className="flex flex-col justify-around items-center space-y-5">

       
        <span></span>
        <span></span>
        {data.todos.length ? data.todos.map((todo:ITodo,idx:number) => ( 
        <div key={todo.id} className="text-sm rounded border-2 p-2 border-stone-700 w-96">
      <div className="flex items-center justify-between p-3 space-x-8
       rounded-md even:bg-glray-100">
        <p className="w-full font-semibold">{idx+1} - {todo.title}</p> 

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
        <Textarea name='des' value={todoToEdit.des} 
        onChange={changeHandler} />

        <div className="flex justify-center items-center space-x-1">
          <Button className="bg-green-600">Edit</Button>
          <Button type="button" onClick={onCloseEditModal} 
          className="bg-stone-400">Cancel</Button>
        </div>
        </form>
        
       </Modal>
        {/* fin Edit partie */}

        {/* Remove partie */}
       <Modal isOpen={isOpenRemovModal} closeModal={onCloseRemovModal} 
       title="Remove  todo">
        <form className="space-y-2" >

        <div className="flex justify-center items-center space-x-1">
          <Button onClick={onRemove} 
          className="bg-red-700">Remove this</Button>
          <Button onClick={onCloseRemovModal} type="button" 
          className="bg-stone-400">Cancel</Button>
        </div>
        </form>
        
       </Modal>
        {/* fin Remove partie */}

        {/* Create partie */}
       <Modal closeModal={onCloseAddModal} isOpen={isOpenAddModal}
      title="Create The Todo">
        <form onSubmit={submitAddHandeler} 
        className="space-y-1">

        <Input name='title' 
         value={todoAdd.title} onChange={onChangeAddTodoHandler} 
        />

         <Textarea name="des" 
          value={todoAdd.des} onChange={onChangeAddTodoHandler}
          /> 

        <div className="flex justify-center items-center space-x-3 m-3">
        <Button className="bg-stone-400" 
        onClick={onCloseAddModal} 
        type="button" >
            Cancel
          </Button>

          <Button className="bg-blue-700">
           Create
          </Button>
        </div> 

        </form>
      </Modal>
      {/* fin Create partie */}
     
     <span></span>
        <span></span>
         </div>
      </main>
      
    );
  };
  
  export default TodoList;