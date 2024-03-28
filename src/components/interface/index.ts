export interface IRegisterInput {
    type:string
    placeholder:string
    name:"username" | "email" | "password" |"phone"
    validation:{
        required?:boolean, 
        minLength?:number, 
        pattern?:RegExp
    }
}