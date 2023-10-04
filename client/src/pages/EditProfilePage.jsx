import { AiOutlineMail } from "react-icons/ai";

import { BiSolidUserRectangle } from "react-icons/bi";

import { Container, Loading } from "../components";

import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";

import { updateProfile } from "../redux/features/userSlice";
const EditProfilePage = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({ name: "", email: "", avatar: "" });

  const [imagePreview, setImagePreview] = useState("/Profile.png");

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch("http://localhost:5000/api/me", {
        method: "GET",
        credentials: "include",
      });

      const { user } = await response.json();

      setInput({
        name: user.name,
        email: user.email,
        avatar: {
          ...user.avatar,
        },
      });
      setImagePreview(user.avatar.url);
    };

    getUserInfo();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {};
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    setInput({ ...input, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("avatar", input.avatar);

    dispatch(updateProfile(formData));
  };
  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className=' w-full h-full flex flex-col  items-center justify-center  shadow-lg '
      >
        <h1 className='text-3xl lg:text-5xl uppercase mt-5 font-mono'>
          Update Profile
        </h1>
        <div className='lg:p-5 flex justify-center lg:w-1/6 w-1/4 items-center gap-5  border-b-gray-600'>
          <label htmlFor='file-upload'>
            <img
              src={imagePreview}
              alt='avatar'
              className='w-40 h-40 rounded-full object-cover'
            />
          </label>
          <input
            type='file'
            name='avatar'
            label='avatar'
            accept='.jpg,.png,.jpg'
            className='hidden'
            id='file-upload'
            onChange={handleImage}
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
            value={input.name}
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
            value={input.email}
            onChange={handleChange}
          />
        </div>

        <input
          type='submit'
          value={"Submit"}
          className=' bg-orange-500 text-2xl uppercase px-4 py-2 text-white hover:bg-blue-500 transition-colors shadow-md'
        />
      </form>
    </Container>
  );
};

export default EditProfilePage;
