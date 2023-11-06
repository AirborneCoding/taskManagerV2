import React from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom"
import { FormInput, SubmitBtn } from "../../components/index"
import { customFetch } from "../../utils";
import { login } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux"


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/login', {
        naimal: 'test@test.com',
        password: 'secret',
      });
      dispatch(login(response.data));
      navigate('/dashboard');
    } catch (error) {
      // console.log(error);
      toast.error('guest user login error.please try later.');
    }
  };

  return <section className="h-screen grid place-items-center">
    <Form
      method="POST"
      className="card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4 shadow-black">

      <FormInput
        type="text"
        label="username OR Email"
        name="naimal"
        defaultValue='test@test.com'
      />

      <FormInput
        type="password"
        label="password"
        name="password"
        defaultValue='secret'
      />

      <div className="form-row">
        <SubmitBtn text="login" />
      </div>

      <p className='text-center'>
        Not a member yet?
        <Link
          to='/register'
          className='ml-2 link link-hover link-primary capitalize'
        >
          register
        </Link>
      </p>
      <button
        type='button'
        className='btn btn-secondary btn-block'
        onClick={loginAsGuestUser}
      >
        guest user
      </button>

    </Form>
  </section>;
};

export default Login;





