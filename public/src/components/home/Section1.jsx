import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const img = "https://cdn.teamwave.com/ws/static/img/teamwave_special.png"

const Section1 = () => {
 const dispatch = useDispatch()
 const { theme, user } = useSelector(state => state.auth);

 return <section className="body-container mt-36 mb-56 md:mb-36 " style={{ height: "80vh" }}>
  <h4 className="text-2xl font-bold text-center mb-16">
   Work Management Software For Your Tasks.
  </h4>
  <div className="grid lg:grid-cols-2 gap-16">
   <div>
    <h5 className="text-xl">
     A better way to manage your sales, projects, team, clients & marketing - on a single platform. Powerful, affordable & easy to use software for your business.
    </h5>
    <div className="space-x-5 mt-6">
     {
      user ? (
       <Link to="/dashboard" className="btn text-gray-900 btn-outline bg-primary hover:bg-info">Access your dashboard</Link>
      ) : (
       <Link to="/register" className="btn text-gray-900 btn-outline bg-primary hover:bg-info">Get Started</Link>
      )
     }
     {/* <button className="btn-nc bg-gray-600">About Us</button> */}
     <Link to="/about" className="btn btn-outline hover:bg-gray-500">About Us</Link>
    </div>

   </div>
   <img src={img} alt="login" style={{ height: "430px" }} className="w-full" />
  </div>

 </section>;
};

export default Section1;
