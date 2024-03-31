
// import { useQuery } from "@tanstack/react-query";
import Button from "../UI/Button";
// import { axiosInstance } from "../config/axiosConfig";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery";


const TodoList = () => {
  const storageKey = 'routeLoged';
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null



const { isLoading, data } = useAuthenticatedQuery({
  queryKey:['todo']
,url:'/users/me?populate=todos',config:{
  headers:{ 'Authorization': `Bearer ${userData.jwt}` }
}})
// useQuery({
//   queryKey: ['todox'],
//   queryFn:async () =>{

//   const {data} = await axiosInstance.get('/users/me?populate=todos',{
//            headers:{
//              'Authorization': `Bearer ${userData.jwt}`,
//            }
//         })
        
//        return data
//   }
// })
  if (isLoading) return <div className="flex justify-around items-center">
    <span></span>
    <span></span>
    <h2>Loading.....</h2>
    <span></span>
    <span></span>
    </div>


    return (
      <main className="flex flex-col justify-around items-center space-y-5" >
        <span></span>
        <span></span>
        {data.todos.length ? data.todos.map(todo => ( 
        <div key={todo.id} className="border-2 p-2 border-white w-96">
      <div className="flex items-center justify-between p-3 space-x-8
       rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{todo.title}</p> 

        <div className="flex items-center justify-end w-full space-x-3">
            <Button  className="bg-green-600 text-sm p-1">Edit</Button>
          <Button className="bg-red-500 text-sm p-1">Remove</Button>
        </div>
      </div>
      </div>
       )  
       ) : <h2>No Todo</h2> }
       
     
     <span></span>
        <span></span>
      </main>
      
    );
  };
  
  export default TodoList;