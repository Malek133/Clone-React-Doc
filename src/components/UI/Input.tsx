import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-md focus:border-[#149eca] focus:outline-none focus:ring-1 focus:ring-[#149eca] rounded-lg px-2 py-2 text-sm w-full bg-transparent"
      {...rest}
    />
  );
};

export default Input;