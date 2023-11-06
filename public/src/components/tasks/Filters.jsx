import React, { useState } from "react";
import { Form, Link, useLoaderData } from "react-router-dom"
import { SearchInput, SelectInput, CheckboxInput, SubmitBtn } from "../index"
import { getUniqueCategories, getUniqueStatus, categoriesArray, statusArray } from "../../utils";

const Filters = () => {
 const { params,tasks } = useLoaderData();
 const { title, statusForFilter, category, completed, sort } = params;
 const categories = getUniqueCategories(categoriesArray)
 const status = getUniqueStatus(statusArray)

 return <Form
  method="GET"
  className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-center">
  <SearchInput
   label="Search Task"
   name="title"
   defaultValue={title}
  />

  <SelectInput
   name="category"
   label="category"
   list={categories}
   defaultValue={category}
  />

  <SelectInput
   name="status"
   label="status"
   list={status}
   defaultValue={statusForFilter}
  />

  <SelectInput
   label='sort by'
   name='sort'
   defaultValue={sort}
   list={['a-z', 'z-a', , 'latest', 'oldest']}
  />

  <CheckboxInput
   label='is completed'
   name='completed'
   defaultValue={completed}
  />
  
  <div className="form-row"></div>
  <button type='submit' className='btn btn-primary btn-xs '>
   search
  </button>
  <Link to='/dashboard' className='btn btn-accent btn-xs'>
   reset
  </Link>

 </Form>;
};

export default Filters;
