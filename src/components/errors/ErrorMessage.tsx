interface IProps {
    msg?: string;
  }
  
  const ErrorMessage = ({ msg }: IProps) => {
    return msg ? <span 
    className="block text-red-200 font-semibold 
    text-lg">
      {msg}</span> : null;
  };
  
  export default ErrorMessage;