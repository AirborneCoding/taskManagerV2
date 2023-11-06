import axios from "axios"

// const developmentUrl = "http://localhost:5000/api/v1"
const developmentUrl = import.meta.env.VITE_ORIGINE

export const customFetch = axios.create({
 baseURL: developmentUrl,
});


export const getUniqueCategories = (tasks) => {
 return [
  'all',
  ...new Set(tasks.map((task) => task.category)),
 ];
};

export const getUniqueStatus = (tasks) => {
 return [
  'all',
  ...new Set(tasks.map((task) => task.status)),
 ];
};

export const getStaticCategories = (tasks) => {
 return tasks.map((task) => task.category)
};

export const getStaticStatus = (tasks) => {
 return tasks.map((task) => task.status);
};



export const categoriesArray = [
 { category: "work" },
 { category: "personal", },
 { category: "health & fitness", },
 { category: "study", },
 { category: "social", },
 { category: "travel", },
 { category: "hobbies", },
 { category: "finance", },
 { category: "home improvement", },
 { category: "Project Specific", },
 { category: "goals", }
];

export const statusArray = [
 { status: "not started", },
 { status: "upcoming", },
 { status: "new", },
 { status: "done", },
 { status: "to-do", },
 { status: "In Progress", },
 { status: "planned", },
 { status: "pending approval", },
 { status: "scheduled", }
];