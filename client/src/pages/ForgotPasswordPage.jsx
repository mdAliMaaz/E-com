import { AiOutlineMail } from "react-icons/ai";
import { Container } from "../components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/features/authSlice";
const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    
    dispatch(forgotPassword(formData));
  };

  return (
    <Container>
      <h1 className=' text-center text-gray-500 text-xl'>
        Enter your email to receive reset password token
      </h1>
      <div className='w-full h-[70vh] flex items-center justify-center'>
        <div className=' lg:w-1/2  shadow-xl p-4'>
          <form
            onSubmit={handleSubmit}
            className='flex items-center flex-col lg:flex-row justify-center gap-5'
          >
            <div className=' flex gap-3'>
              <label htmlFor='email' className=' font-semibold text-3xl'>
                <AiOutlineMail className=' text-2xl lg:text-5xl text-gray-700' />
              </label>
              <input
                type='email'
                placeholder='Email'
                className=' px-2 lg:px-4 py-2 w-full border-2 border-black active:border-none font-mono'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type='submit'
              value={"Submit"}
              className=' bg-orange-500 text-2xl uppercase px-3 py-2 text-white hover:bg-blue-500 transition-colors shadow-md'
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;
