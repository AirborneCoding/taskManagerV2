import React from "react";

const items = [
 {
  img: "https://cdn.teamwave.com/ws/static/img/discover/manage_sales.png",
  title: "Manage Sales",
  desc: "Our visual sales pipeline prompts you to take action, remain organized and stay in control of the complex sales process."
 },
 {
  img: "https://cdn.teamwave.com/ws/static/img/discover/customize_crm.png",
  title: "Customize your CRM",
  desc: "Easily customize your sales pipeline, filters, contacts and deals to suit any type of sales process."
 },
 {
  img: "https://cdn.teamwave.com/ws/static/img/discover/time_tracking.png",
  title: "Time Tracking",
  desc: "Our mobile apps let you access your deals, tasks, projects and contacts even when you're on the road."
 },
 {
  img: "https://cdn.teamwave.com/ws/static/img/discover/work_anywhere.png",
  title: "Work anywhere, anytime",
  desc: "Our mobile apps let you access your deals, tasks, projects and contacts even when you're on the road."
 },
 {
  img: "https://cdn.teamwave.com/ws/static/img/discover/calendar.png",
  title: "Team Calender",
  desc: "Schedule and track meetings, tasks, milestones and events for you or other team members."
 },
 {
  img: "https://cdn.teamwave.com/ws/static/img/discover/collaboration.png",
  title: "Collaborate",
  desc: "Work with clients, partners and your team. With the option to keep things private, you control what the client (and team members) can see."
 },
 {
  img: "https://cdn.teamwave.com/ws/static/img/discover/contact_management.png",
  title: "Contact Management",
  desc: "Manage all contacts from one place, get a clear overview, and build better relationships."
 },
 {
  img: "https://cdn.teamwave.com/ws/static/img/discover/reports.png",
  title: "Reports & Dashboard",
  desc: "Gain instant visibility and insights you need to make informed decisions in real-time. Spot issues before things go off-track."
 },
]

const Section2 = () => {
 return <section className="body-container my-32" >
  <h2 className="text-center font-bold mb-16">Discover how your business can work smarter!</h2>

  <article className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
   {
    items.map((item) => {
     const { title, desc, img } = item
     return <div key={title} className="flex flex-col space-y-6 p-5 shadow-md shadow-black hover:shadow-xl cursor-pointer">
      <img src={img} alt={title} className="h-16 w-16" />
      <h2 className="text-xl">{title}</h2>
      <p>{desc}</p>
     </div>
    })
   }

  </article>
 </section>
};

export default Section2;
