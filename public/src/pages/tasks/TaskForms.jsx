import React, { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom"
// components
import { SearchInput, SelectInput, CheckboxInput, TextAreaInput, SubmitBtn } from "../../components/index"
// utilss
import { getStaticCategories, getStaticStatus, categoriesArray, statusArray, getUniqueCategories } from "../../utils"
import { useDispatch, useSelector } from "react-redux";


const Add = () => {

 const { isEdit, task } = useSelector(state => state.tasks)
 const dispatch = useDispatch()

 const TaskInfo = isEdit.item

 // utils
 const categories = getStaticCategories(categoriesArray)
 const status = getStaticStatus(statusArray)

 return <section className="mb-16">


  <Form
   method={isEdit.state ? "PATCH" : "POST"}
   className="bg-base-200 rounded-md px-8 py-4 space-y-5 " >
   <input type="hidden" name="taskID" value={isEdit.state ? isEdit.id : ""} />
   <SearchInput
    name="title"
    label="title"
    defaultValue={isEdit.state ? TaskInfo?.title : ""}
   />


   <SelectInput
    name="category"
    label="category"
    list={categories}
    defaultValue={isEdit.state ? TaskInfo?.category : ""}
   />

   <SelectInput
    name="status"
    label="status"
    list={status}
    defaultValue={isEdit.state ? TaskInfo?.status : ""}
   />

   <CheckboxInput
    name="completed"
    label="is Completed"
    defaultValue={isEdit.state ? TaskInfo?.completed : false}
   />

   <TextAreaInput
    name="description"
    label="description"
    // list=""
    defaultValue={isEdit.state ? TaskInfo?.description : ""}
   />

   <SubmitBtn text={isEdit.state ? "edit" : "add"} name="intent" value={isEdit.state ? "edit" : "add"} />
  </Form>
 </section>


};

export default Add;
