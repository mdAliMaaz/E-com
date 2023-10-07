import { Link } from "react-router-dom";
import { Container } from "../components";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { BiSolidUserRectangle } from "react-icons/bi";
import { useState } from "react";
import { register } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [imagePreview, setImagePreview] = useState("/Profile.png");

  const [avatar, setAvatar] = useState({});

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlefile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {};
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("avatar", avatar);

    dispatch(register(formData));
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className=' w-full h-full flex flex-col  items-center justify-center  shadow-lg '
      >
        <h1 className='text-3xl lg:text-5xl uppercase mt-5 font-mono'>
          Register
        </h1>
        <div className='lg:p-5 flex justify-center lg:w-1/6 w-1/4 items-center gap-5  border-b-gray-600'>
          <label htmlFor='file-upload'>
            <img
              src={imagePreview}
              alt='avatar'
              className=' rounded-full lg:w-40 lg:h-40 h-20 w-20 object-cover'
            />
          </label>
          <input
            type='file'
            name='avatar'
            label='avatar'
            accept='.jpg,.png,.jpg'
            className='hidden'
            id='file-upload'
            onChange={handlefile}
          />
        </div>
        <div className='lg:p-5 flex justify-between lg:w-1/2 items-center gap-5  border-b-gray-600'>
          <span>
            <BiSolidUserRectangle className=' text-2xl lg:text-5xl text-gray-700' />
          </span>
          <input
            type='text'
            placeholder='Username'
            className=' px-2 lg:px-4 py-2 w-full border-2 border-black active:border-none font-mono'
            name='name'
            onChange={handleChange}
          />
        </div>
        <div className='lg:p-5 flex justify-between lg:w-1/2 items-center gap-5  border-b-gray-600'>
          <span>
            <AiOutlineMail className=' text-2xl lg:text-5xl text-gray-700' />
          </span>
          <input
            type='text'
            placeholder='Email'
            className=' px-2 lg:px-4 py-2 w-full border-2 border-black active:border-none font-mono'
            name='email'
            onChange={handleChange}
          />
        </div>
        <div className='lg:p-5 flex justify-between lg:w-1/2 items-center gap-5  border-b-gray-600'>
          <span>
            <AiFillLock className=' text-2xl lg:text-5xl text-gray-700' />
          </span>
          <input
            type='password'
            placeholder='Password'
            className=' px-2 lg:px-4 py-2 w-full border-2 border-black active:border-none font-mono'
            name='password'
            onChange={handleChange}
          />
        </div>
        <input
          type='submit'
          value={"Submit"}
          className=' bg-orange-500 text-2xl uppercase px-4 py-2 text-white hover:bg-blue-500 transition-colors shadow-md'
        />
        <div>
          <span className=' lg:text-lg text-gray-600'>
            Already a user ?
            <Link className=' text-blue-500' to={"/login"}>
              click here
            </Link>
          </span>
        </div>
      </form>
    </Container>
  );
};

export default RegisterPage;
