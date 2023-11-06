import React from "react";
import { Form, Link, redirect } from "react-router-dom"
import { FormInput, SubmitBtn } from "../../components/index"

const Register = () => {

  return <section className="h-screen grid place-items-center">
    <Form method="POST"
      className="card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4 shadow-black">

      <FormInput
        type="text"
        label="username"
        name="name"
      // defaultValue="tested user"
      />

      <FormInput
        type="email"
        label="email"
        name="email"
      // defaultValue="test@test.com"
      />

      <FormInput
        type="password"
        label="password"
        name="password"
      // defaultValue="secret"
      />

      <div className="form-row">
        <SubmitBtn text="register" />
      </div>

      <p className='text-center'>
        Already a member?
        <Link
          to='/login'
          className='ml-2 link link-hover link-primary capitalize'
        >
          login
        </Link>
      </p>

    </Form>
  </section>;
};

export default Register;






/* 
<h2 className="text-3xl font-bold text-white text-center mb-8">Register</h2>
    <div className="form-control w-full max-w-xs">

      <label className="label label-text text-white">Name</label>
      <input type="text" className="input input-bordered w-full max-w-xs" />
     
      <label className="label label-text text-white">Email</label>
      <input type="email" className="input input-bordered w-full max-w-xs" />

      <label className="label label-text text-white">Password</label>
      <input type="password" className="input input-bordered w-full max-w-xs" />

      <br />
      <button type="submit" className="btn hover:bg-sky-800 w-full">Register</button>
      <p className="mt-4 text-center">
        Already a member? <Link to="/login" className="text-sky-500 hover:text-sky-700">Login</Link>
      </p>
    </div >
*/