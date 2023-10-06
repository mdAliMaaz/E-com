import { AiFillCaretRight } from "react-icons/ai";
const CustomInput = ({ name, type, onChange, value }) => {
  return (
    <div className=' flex items-center justify-between gap-5  lg:w-1/3 p-1 border-b-2'>
      <label className=' text-lg font-semibold text-orange-500 w-fit'>
        <AiFillCaretRight className=' text-2xl' />
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={name}
        className='  outline-orange-500 p-2 w-full'
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
