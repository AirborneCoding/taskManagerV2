import React from "react";
import { Navbar, Loading, Footer } from "../../components";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
 const navigation = useNavigate()
 // console.log(navigation.state);
 const isPageLoading = navigation.state === "loading"
 return <>
  <Navbar />
  <Outlet />
  {/* {
   isPageLoading ? (
    <Loading />
   ) : (
    <section className='align-element py-20'>
     <Outlet />
    </section>
   )
  } */}
  <Footer />
 </>;
};

export default HomeLayout;
