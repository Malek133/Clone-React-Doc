
import { ChangeEvent, useState } from "react";
import useAuthenticatedQuery from "../../../hooks/useAuthenticatedQuery";
import TodoSkeleton from "../TodoSkeleton";
import Paginat from "../Paginate";

const AllTodo = () => {

  const [page,setPage]=useState<number>(1)
  const [pageSize,setPageSize]=useState<number>(5)
  const storageKey = 'routeLoged';
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null

const { isLoading, data } = useAuthenticatedQuery({
  queryKey:[`todos-pages ${page}`,`${pageSize}`]
,url:`/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}`,config:{
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

const onClickPrev =  () => {
  setPage(prev => prev-1) ;
};
const onClickNext = () => {
  setPage(prev => prev+1)
};

const onChangePageSize = (e:ChangeEvent<HTMLSelectElement>) =>{
  setPageSize(+e.target.value)
}

    return (
      <div>
      <select className="ml-10 border-2 border-blue-950 rounded-md p-1" 
          value={pageSize} onChange={onChangePageSize}
          >
            <option disabled>Page size</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
      <div className="flex justify-around items-center space-x-3 mb-10">
         <span></span>
      <span></span>
      <div className="space-y-4">
        {data.data.length ? data.data.map(({id,attributes}:
              {id:number;attributes:{title:string}}) => ( 
        <div key={id} className="text-sm rounded flex justify-around 
        items-center border-2 p-2 border-stone-700 w-80">
          <span></span>
      <div className="flex items-center justify-between p-3 space-x-8
       rounded-md even:bg-glray-100">
        <p className="w-full font-semibold">{id} - {attributes.title}</p> 
      </div>
      <span></span>
      <span></span>
      </div>
       )  
       ) : <h2>No Todo</h2> }
      </div>
      <span></span>
      <span></span>
      
      </div>
      <Paginat page={page} total={data.meta.pagination.total}
      pageCount={data.meta.pagination.pageCount} isLoading={isLoading}
      onClickPrev={onClickPrev} onClickNext={onClickNext} />
      </div>
    );
  };
  
  export default AllTodo;