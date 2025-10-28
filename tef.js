// import React, { useEffect } from 'react'
// import Avatar from '@mui/material/Avatar';
// import { Link } from 'react-router-dom';
// import { Grid } from '@mui/material';
// import Hero from './Hero';
// import back from '../assets/back.png';
// import data from '../../portfolioData.json';
// import backvideo from '../assets/backvideo.mp4';

// function Home() {
//   const { profile, navigation, sections } = data;
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   useEffect(() => {
//     const scrollContainer = document.querySelector('.main-scroll');
//     const elements = document.querySelectorAll('.fade-up');

//     console.log(elements, "dd")
//     const revealOnScroll = () => {
//       elements.forEach(el => {
//         const rect = el.getBoundingClientRect();
//         if (rect.top < window.innerHeight - 120) {
//           el.classList.add('show');
//         }
//       });
//     };

//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', revealOnScroll);
//       revealOnScroll();
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', revealOnScroll);
//       }
//     };
//   }, []);



//   const half = Math.ceil(sections.about.imageHeading.length / 2);
//   const left = sections.about.imageHeading.slice(0, half);
//   const right = sections.about.imageHeading.slice(half);

//   const halfSkills = Math.ceil(sections.about.skills.content.length / 2);
//   const leftSkill = sections.about.skills.content.slice(0, halfSkills);
//   const rightSkill = sections.about.skills.content.slice(halfSkills);


//   return (
//     <div className="flex h-screen overflow-hidden">

//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-gray-200 flex flex-col">
//         <div className="flex flex-col items-center py-6 fade-up delay-1">
//           <Avatar
//             sx={{ width: 100, height: 100 }}
//             alt="Sitaram"
//             src={profile.avatar}
//           />
//           <h1 className="mt-2 font-bold fade-up delay-2">{profile.name}</h1>
//         </div>

//         {/* navbar button */}
//         <div className="flex flex-col mt-6 space-y-4 px-4 fade-up delay-3">
//           {navigation.map((item) => (
//             <button onClick={() => scrollToSection(item.id)} className="hover:text-blue-500 text-left">{item.label}</button>
//           ))}
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 bg-gray-100 overflow-y-auto main-scroll">

//         {/* <section id="home" className="h-screen mb-10 p-10 flex-col fade-up delay-1 flex justify-center items-start gap-4" style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover' }}>
//           <h2 className="text-5xl font-bold fade-up delay-2 text-white">{profile.name}</h2>
//           {/* <p className="fade-up delay-3 text-white">Content for Home...</p> */}
//           {/* <div className="fade-up delay-3">
//             <Hero />
//           </div>
//         </section> */} 

//   <section id="home" className="relative h-screen overflow-hidden">
//   {/* Background video */}
//   <video 
//     autoPlay 
//     loop 
//     muted 
//     playsInline 
//     className="absolute top-0 left-0 w-full h-full object-cover"
//   >
//     <source src={backvideo} type="video/mp4" />
//   </video>

//   {/* Content overlay */}
//   <div className="relative z-10 flex flex-col justify-center items-start h-full p-10 gap-4 text-white">
//     <h2 className="text-5xl font-bold">{profile.name}</h2>
//     <div>
//       <Hero />
//     </div>
//   </div>
// </section>

//         <section id="about" className="h-fit mb-4 p-10 fade-up delay-1">
//           <div>
//             <h2 className="text-3xl font-bold fade-up delay-2 relative inline-block">
//               About
//               <span className="block w-16 h-1 bg-blue-500 mt-2"></span>
//             </h2>
//             <p className="fade-up delay-3 mt-4 opacity-80" style={{fontSize:18}}>{sections.about.content}</p>
//           </div>

//           {/* image about */}
//           <div className='my-10 flex flex-row p-2' >
//             <img className="h-96 w-96 object-cover rounded-md" src={back} />

//             {/* imageside */}
//             <div className='mx-4 flex flex-col'>
//               <span className='text-2xl font-semibold'>{sections.about.imageside.position}</span>
//               <span className='my-2'>
//                 <p className='font-serif opacity-80' style={{fontSize:18}}>{sections.about.imageside.content}</p>
//               </span>

//               <div>

//                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
//                   <div className='flex flex-col gap-2'>
//                     {left.map((item, i) => (
//                       <div className='flex justify-between gap-5 p-4' key={i}>
//                         <span className='font-semibold'>{item.title}:</span>
//                         <span className='text-gray-700 font-serif'>{item.content}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className='flex flex-col gap-2'>
//                     {right.map((item, i) => (
//                       <div className='flex justify-between gap-3 p-4' key={i}>
//                         <span className='font-semibold'>{item.title}:</span>
//                         <span className='text-gray-700 font-serif'>{item.content}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>


//                 <span>

//                 </span>

//               </div>
//             </div>


//           </div>
//         </section>



// <section id="skill" className="h-fit mb-10 p-4 fade-up delay-1" style={{background:"#F4FAFD"}}>
//   <h2 className="font-bold text-3xl fade-up delay-2">{sections.about.skills.title}</h2>
//   <span className="block w-10 h-1 bg-blue-500 mt-2 mb-10"></span>
  

//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
//     {/* Left Skills */}
//     <div className="flex flex-col gap-6">
//       {leftSkill.map((item, i) => (
//         <div key={i}>
//           <div className="flex justify-between">
//             <span className="text-gray-800 font-serif">{item.title}</span>
//             <span className="text-gray-600 font-medium">{item.percentage}%</span>
//           </div>
//           <div className="w-full h-2 bg-gray-300 rounded-full mt-1">
//             <div
//               className="h-2 bg-blue-600 rounded-full transition-all duration-700"
//               style={{ width: `${item.percentage}%` }}
//             ></div>
//           </div>
//         </div>
//       ))}
//     </div>

//     {/* Right Skills */}
//     <div className="flex flex-col gap-6">
//       {rightSkill.map((item, i) => (
//         <div key={i}>
//           <div className="flex justify-between">
//             <span className="text-gray-800 font-serif">{item.title}</span>
//             <span className="text-gray-600 font-medium">{item.percentage}%</span>
//           </div>
//           <div className="w-full h-2 bg-gray-300 rounded-full mt-1">
//             <div
//               className="h-2 bg-blue-600 rounded-full transition-all duration-700"
//               style={{ width: `${item.percentage}%` }}
//             ></div>
//           </div>
//         </div>
//       ))}
//     </div>

//   </div>
// </section>

//         <section id="resume" className="h-screen mb-10 p-4 fade-up delay-1">
//           <h2 className="text-3xl font-bold fade-up delay-2">{sections.resume.title}</h2>
//           <p className="fade-up delay-3">{sections.services.content}</p>
//           <a href={back} download={"deepanshu.jpg"}>{sections.resume['btn-name']}</a>
//         </section>
//         <section id="services" className="h-screen mb-10 p-4 fade-up delay-1">
//           <h2 className="text-3xl font-bold fade-up delay-2">{sections.services.title}</h2>
//           <p className="fade-up delay-3">{sections.services.content}</p>
//         </section>

//         <section id="contact" className="h-screen mb-10 p-4 fade-up delay-1">
//           <h2 className="text-3xl font-bold fade-up delay-2">Contact Section</h2>
//           <p className="fade-up delay-3">Content for contact...</p>
//         </section>

//       </div>

//     </div>
//   );
// }

// export default Home;

"use client";

import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Menu, Close } from "@mui/icons-material";
import Hero from "./Hero";
import back from "../assets/back.png";
import backvideo from "../assets/backvideo.mp4";
import data from "../../portfolioData.json";

function Home() {
  const { profile, navigation, sections } = data;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll reveal effect
  useEffect(() => {
    const scrollContainer = document.querySelector(".main-scroll");
    const elements = document.querySelectorAll(".fade-up");

    const revealOnScroll = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
          el.classList.add("show");
        }
      });
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", revealOnScroll);
      revealOnScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", revealOnScroll);
      }
    };
  }, []);

  const half = Math.ceil(sections.about.imageHeading.length / 2);
  const left = sections.about.imageHeading.slice(0, half);
  const right = sections.about.imageHeading.slice(half);

  const halfSkills = Math.ceil(sections.about.skills.content.length / 2);
  const leftSkill = sections.about.skills.content.slice(0, halfSkills);
  const rightSkill = sections.about.skills.content.slice(halfSkills);

  return (
    <div className="flex h-screen relative">

      {/* Hamburger button for mobile */}
      <button
        className="absolute top-4 left-4 z-30 md:hidden bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <Close /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-gray-200 flex flex-col transition-transform duration-300
          fixed md:relative top-0 left-0 h-full w-64 z-20
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col items-center py-6 fade-up delay-1">
          <Avatar
            sx={{ width: 100, height: 100 }}
            alt={profile.name}
            src={profile.avatar}
          />
          <h1 className="mt-2 font-bold fade-up delay-2 text-center">{profile.name}</h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-col mt-6 space-y-4 px-4 fade-up delay-3">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-blue-500 text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-30 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
     {/* Main content */}
<div
  className={`flex-1 bg-gray-100 overflow-y-auto transition-all duration-300 main-scroll
    md:ml-64`}
>
  <section id="home" className="relative h-screen overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src={backvideo} type="video/mp4" />
    </video>

    <div className="relative z-10 flex flex-col justify-center items-start h-full p-10 gap-4 text-white md:pl-10">
      <h2 className="text-5xl font-bold">{profile.name}</h2>
      <div>
        <Hero />
      </div>
    </div>
  </section>
{/* </div> */}


        {/* About Section */}
        <section id="about" className="h-fit mb-4 p-10 fade-up delay-1">
          <h2 className="text-3xl font-bold fade-up delay-2 relative inline-block">
            About
            <span className="block w-16 h-1 bg-blue-500 mt-2"></span>
          </h2>
          <p className="fade-up delay-3 mt-4 opacity-80" style={{ fontSize: 18 }}>
            {sections.about.content}
          </p>

          <div className="my-10 flex flex-col md:flex-row p-2 gap-6">
            <img className="h-96 w-full md:w-96 object-cover rounded-md" src={back} alt="About" />

            <div className="flex-1 flex flex-col">
              <span className="text-2xl font-semibold">{sections.about.imageside.position}</span>
              <p className="my-2 font-serif opacity-80" style={{ fontSize: 18 }}>
                {sections.about.imageside.content}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  {left.map((item, i) => (
                    <div className="flex justify-between gap-5 p-4" key={i}>
                      <span className="font-semibold">{item.title}:</span>
                      <span className="text-gray-700 font-serif">{item.content}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {right.map((item, i) => (
                    <div className="flex justify-between gap-3 p-4" key={i}>
                      <span className="font-semibold">{item.title}:</span>
                      <span className="text-gray-700 font-serif">{item.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skill" className="h-fit mb-10 p-4 fade-up delay-1" style={{ background: "#F4FAFD" }}>
          <h2 className="font-bold text-3xl fade-up delay-2">{sections.about.skills.title}</h2>
          <span className="block w-10 h-1 bg-blue-500 mt-2 mb-10"></span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {[leftSkill, rightSkill].map((col, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                {col.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-serif">{item.title}</span>
                      <span className="text-gray-600 font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-300 rounded-full mt-1">
                      <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-700"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="h-screen mb-10 p-4 fade-up delay-1">
          <h2 className="text-3xl font-bold fade-up delay-2">{sections.resume.title}</h2>
          <p className="fade-up delay-3">{sections.services.content}</p>
          <a href={back} download={"deepanshu.jpg"}>{sections.resume["btn-name"]}</a>
        </section>

        {/* Services Section */}
        <section id="services" className="h-screen mb-10 p-4 fade-up delay-1">
          <h2 className="text-3xl font-bold fade-up delay-2">{sections.services.title}</h2>
          <p className="fade-up delay-3">{sections.services.content}</p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="h-screen mb-10 p-4 fade-up delay-1">
          <h2 className="text-3xl font-bold fade-up delay-2">Contact Section</h2>
          <p className="fade-up delay-3">Content for contact...</p>
        </section>
      </div>
    </div>
  );
}

export default Home;
