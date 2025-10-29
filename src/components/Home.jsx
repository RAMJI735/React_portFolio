"use client";

import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Menu, Close } from "@mui/icons-material";
import Hero from "./Hero";
import back from "../assets/back2.jpg";
import backvideo from "../assets/backvideo2.mp4";
import fontend from "../assets/frontend.jpg";
import backend from "../assets/backend.jpg";
import native from "../assets/native.jpg";
import data from "../../portfolioData.json";
import ServiceForm from "./Service";
import Contact from "./Contact";
import Sidebar from "./Navbar";



function Home() {
  const { profile, navigation, sections } = data;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

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




  const serviceImage={
    "frontend.jpg": fontend,
    "backend.jpg": backend,
    "native.jpg": native
  }

  return (
    <div className="flex h-screen overflow-hidden relative">

      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-900 text-white p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <Close /> : <Menu />}
      </button>

      {/* Sidebar */}
<Sidebar sidebarOpen={sidebarOpen} profile={profile} navigation={navigation} scrollToSection={scrollToSection} /> 

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black opacity-30 z-30" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-y-auto main-scroll">

        {/* Home Section */}
        {/* <section id="home" className="relative h-screen overflow-hidden" style={{}}>
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={backvideo} type="video/mp4" />
          </video> */}
{/* 
          <div className="relative z-10 flex flex-col justify-center items-start h-full p-6 md:p-10 gap-4 text-white">
            <h2 className="text-4xl md:text-5xl font-bold">{profile.name}</h2>
            <div><Hero /></div>
          </div>
        </section> */} 



        <section
  id="home"
  className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${back})` // adjust path based on your folder structure
  }}
>
  <div className="absolute inset-0 bg-black/40"></div> {/* Optional dark overlay for better text visibility */}

  <div className="relative z-10 flex flex-col justify-center items-start h-full p-6 md:p-10 gap-4 text-white">
    <h2 className="text-4xl md:text-5xl font-bold">{profile.name}</h2>
    <div><Hero /></div>
  </div>
</section>


        {/* About Section */}
        <section id="about" className="h-fit mb-4 p-6 md:p-10 fade-up delay-1">
          <h2 className="text-3xl md:text-4xl font-bold fade-up delay-2 relative inline-block">
            About
            <span className="block w-16 h-1 bg-blue-500 mt-2"></span>
          </h2>
          <p className="fade-up delay-3 mt-4 opacity-80 text-base md:text-lg">{sections.about.content}</p>

          <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Left Image */}
            <img
              className="w-full max-h-[450px] object-cover rounded-md"
              src={back}
              alt="About visual"
            />

            {/* Right Content */}
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-semibold">{sections.about.imageside.position}</span>
              <p className="font-serif opacity-80 text-base md:text-lg">{sections.about.imageside.content}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  {left.map((item, i) => (
                    <div className="flex justify-between gap-3 p-2 bg-gray-50 rounded-md" key={i}>
                      <span className="font-semibold">{item.title}:</span>
                      <span className="text-gray-700 font-serif">{item.content}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {right.map((item, i) => (
                    <div className="flex justify-between gap-3 p-2 bg-gray-50 rounded-md" key={i}>
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
        <section id="skill" className="h-fit mb-10 p-6 md:p-10 fade-up delay-1 bg-[#F4FAFD]">
          <h2 className="font-bold text-3xl md:text-4xl fade-up delay-2">{sections.about.skills.title}</h2>
          <span className="block w-10 h-1 bg-blue-500 mt-2 mb-6 md:mb-10"></span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {[leftSkill, rightSkill].map((col, idx) => (
              <div key={idx} className="flex flex-col gap-4 md:gap-6">
                {col.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-serif">{item.title}</span>
                      <span className="text-gray-600 font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-300 rounded-full mt-1">
                      <div className="h-2 bg-blue-600 rounded-full transition-all duration-700" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
     <section id="resume" className="h-fit mb-10 p-6 md:p-10 fade-up delay-1">
  <h2 className="text-3xl md:text-4xl font-bold fade-up delay-2">
    {sections.resume.title}
  </h2>

  {/* Summary Section */}
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">

    {/* Left Column: Summary + Education */}
    <div>
      <h3 className="text-2xl font-semibold mb-4">Summary</h3>
      <div className="border-l-2 pl-4 space-y-2">
        <p className="font-bold">{sections.resume.summary.name}</p>
        <p className="italic text-sm">{sections.resume.summary.role}</p>
        <p className="text-gray-600">{sections.resume.summary.description}</p>

        <ul className="text-sm mt-3 space-y-2">
          <li>{sections.resume.summary.location}</li>
          <li>{sections.resume.summary.phone}</li>
          <li>{sections.resume.summary.email}</li>
        </ul>
      </div>

      {/* Education */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">Education</h3>
      {sections.resume.education.map((edu, index) => (
        <div key={index} className="border-l-2 pl-4 mb-5">
          <p className="font-semibold">{edu.degree}</p>
          <span className="text-gray-500 text-sm">{edu.year}</span>
          <p className="italic">{edu.university}</p>
          <p className="text-sm text-gray-600 mt-2">{edu.details}</p>
        </div>
      ))}
    </div>

    {/* Right Column: Experience */}
    <div>
      <h3 className="text-2xl font-semibold mb-4">Professional Experience</h3>
      {sections.resume.experience.map((exp, index) => (
        <div key={index} className="border-l-2 pl-4 mb-8">
          <p className="font-semibold">{exp.role}</p>
          <span className="text-gray-500 text-sm">{exp.year}</span>
          <p className="italic">{exp.company}</p>
          <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc ml-4">
            {exp.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>

  {/* Download Button */}
  <a
    href="/resume.docx"
    download="Deepanshu-Resume.docx"
    className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-md"
  >
    {sections.resume['btn-name']}
  </a>
</section>


        {/* Services Section */}
<section id="services" className="h-fit p-10 bg-gray-50">
  <h2 className="text-3xl font-bold mb-6">{sections.services.title}</h2>
  
  {/* Auto scrolling container */}
  <div className="overflow-hidden relative">
    <div 
      className="flex space-x-6"
      style={{
        animation: 'marquee 4s linear infinite'
      }}
    >
      {[...sections?.services?.list, ...sections?.services?.list]?.map((item, i) => (
        <div key={i} className="flex-none w-64 bg-white rounded-lg shadow p-4">
          <img src={serviceImage[item.image]} alt={item.title} className="h-40 w-full object-cover rounded-md mb-4"/>
          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-700">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
  
  {/* Add the keyframes */}
  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
</section>


        {/* Contact Section */}
        <section id="contact" className="h-fit mb-10 p-6 md:p-10 fade-up delay-1">
          <h2 className="text-3xl md:text-4xl font-bold fade-up delay-2">Contact</h2>
          <Contact />
        </section>

      </div>
    </div>
  );
}

export default Home;
