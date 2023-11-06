import React from "react";
import { Loading, Menu } from "../../components";
import { Link, Outlet, useNavigation } from "react-router-dom";

const Dashboard = () => {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === "loading"
  return <>
    {/* loading logic */}

    <main className="my-16 px-8 flex flex-col lg:flex-row gap-5">
      <div className="w-full md:w-1/4">
        <Menu />
      </div>
      {/* md:w-3/4 */}
      <div className="w-full mb-48">
        <Outlet />
        {/* {isPageLoading ? (
          <Loading />
        ) : (
          <section className='align-element'>
            <Outlet />
          </section>
        )} */}
      </div>
    </main>
  </>;
};

export default Dashboard;
