// import React from "react";
// import { Link, useRouteError } from "react-router-dom"
// const NotFoundError = () => {

//  const error = useRouteError()
//  console.log(error);

//  if (error.status === 404) {
//   return (
//    <main className='grid min-h-[100vh] place-items-center px-8 '>
//     <div className='text-center'>
//      <p className='text-9xl font-semibold text-primary'>404</p>
//      <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
//       Page not found
//      </h1>
//      <p className='mt-6 text-lg leading-7 '>
//       Sorry, we couldn’t find the page you’re looking for.
//      </p>
//      <div className='mt-10 '>
//       <Link to='/' className='btn btn-secondary'>
//        Go back home
//       </Link>
//      </div>
//     </div>
//    </main>
//   )
//  }
// };

// export default NotFoundError;

import React, { useEffect } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";

const NotFoundError = () => {
 const navigate = useNavigate();
 const error = useRouteError()

 useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
   navigate("/");
  }
 }, [navigate]);

 if (error.status === 404) {
  return (
   <main className="grid min-h-[100vh] place-items-center px-8 ">
    <div className="text-center">
     <p className="text-9xl font-semibold text-primary">404</p>
     <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
      Page not found
     </h1>
     <p className="mt-6 text-lg leading-7 ">
      Sorry, we couldn’t find the page you’re looking for.
     </p>
     <div className="mt-10 ">
      <Link to="/" className="btn btn-secondary">
       Go back home
      </Link>
     </div>
    </div>
   </main>
  );
 }
};

export default NotFoundError;

