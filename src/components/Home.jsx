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
import { usePortfolio } from "../context/PortfolioContext";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiMui,
  SiGit,
  SiPython,
  SiRedux,
} from "react-icons/si";
import {
  FiCpu,
  FiCode,
  FiArrowRight,
  FiDownload,
  FiBriefcase,
  FiBookOpen,
  FiCheckCircle,
  FiMail,
  FiFolder,
  FiExternalLink,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const getSkillIcon = (title = "") => {
  const t = (title || "").toLowerCase();
  if (t.includes("react native")) return <SiReact className="text-cyan-400 text-xl" />;
  if (t.includes("react")) return <SiReact className="text-sky-400 text-xl" />;
  if (t.includes("next")) return <SiNextdotjs className="text-gray-800 text-xl" />;
  if (t.includes("node")) return <SiNodedotjs className="text-emerald-500 text-xl" />;
  if (t.includes("express")) return <SiExpress className="text-gray-700 text-xl" />;
  if (t.includes("mongo")) return <SiMongodb className="text-emerald-600 text-xl" />;
  if (t.includes("tailwind")) return <SiTailwindcss className="text-cyan-400 text-xl" />;
  if (t.includes("type")) return <SiTypescript className="text-blue-500 text-xl" />;
  if (t.includes("java") || t.includes("js")) return <SiJavascript className="text-amber-500 text-xl" />;
  if (t.includes("html")) return <SiHtml5 className="text-orange-500 text-xl" />;
  if (t.includes("css")) return <SiCss3 className="text-blue-500 text-xl" />;
  if (t.includes("mui") || t.includes("material")) return <SiMui className="text-blue-500 text-xl" />;
  if (t.includes("python")) return <SiPython className="text-yellow-500 text-xl" />;
  if (t.includes("git")) return <SiGit className="text-orange-600 text-xl" />;
  if (t.includes("redux")) return <SiRedux className="text-purple-500 text-xl" />;
  return <FiCpu className="text-blue-500 text-xl" />;
};

function Home() {
  const { portfolio } = usePortfolio();
  const currentData = portfolio || data;
  const profile = currentData?.profile || data.profile;
  const navigation = currentData?.navigation || data.navigation;
  const sections = currentData?.sections || data.sections;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToSection = (id) => {
    const targetId = id === "skills" ? "skill" : id;
    const element = document.getElementById(targetId) || document.getElementById(id);
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
        if (rect.top < window.innerHeight - 80) {
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

  const imageHeadings = sections?.about?.imageHeading || data.sections.about.imageHeading || [];
  const half = Math.ceil(imageHeadings.length / 2);
  const left = imageHeadings.slice(0, half);
  const right = imageHeadings.slice(half);

  const skillsList = sections?.about?.skills?.content || data.sections.about.skills.content || [];

  const serviceImage = {
    "frontend.jpg": fontend,
    "backend.jpg": backend,
    "native.jpg": native,
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative bg-[#090E1A]">
      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-900/90 text-white p-2.5 rounded-xl border border-gray-700/80 shadow-lg backdrop-blur-md cursor-pointer hover:bg-gray-800 transition-colors"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Menu"
      >
        {sidebarOpen ? <Close /> : <Menu />}
      </button>

      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        profile={profile}
        navigation={navigation}
        scrollToSection={scrollToSection}
        projectsEnabled={sections?.projects?.enabled !== false}
      />

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Scrollable Content Area */}
      <div className="flex-1 bg-white overflow-y-auto overflow-x-hidden main-scroll">
        {/* Hero Section */}
        <section
          id="home"
          className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex items-center"
          style={{
            backgroundImage: `url(${back})`,
          }}
        >
          {/* Rich Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45"></div>

          <div className="relative z-10 flex flex-col justify-center items-start p-6 md:p-14 gap-5 text-white max-w-3xl">
            {/* Status Pulse Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md">
              {profile?.name || "Deepanshu Srivastava"}
            </h1>

            <div>
              <Hero words={sections?.home?.typewriterWords} />
            </div>

            <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              {sections?.home?.content ||
                "Specializing in modern full-stack web architectures, Next.js, React, Node.js, and MongoDB."}
            </p>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mt-2">
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Get In Touch</span>
                <FiArrowRight className="text-base" />
              </button>

              <button
                onClick={() => scrollToSection("skill")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all duration-200 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FiCpu className="text-base text-cyan-400" />
                <span>View Skills</span>
              </button>

              <a
                href="/resume.docx"
                download="Deepanshu-Resume.docx"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900/80 hover:bg-gray-800 text-gray-200 border border-gray-700/80 font-semibold text-sm transition-all duration-200 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FiDownload className="text-base text-blue-400" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="h-fit py-14 px-6 md:px-14 fade-up delay-1 bg-white">
          <div className="max-w-6xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Introduction
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
              {sections?.about?.title || "About Me"}
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3 mb-6"></div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {sections?.about?.content}
            </p>

            <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left Image with Modern Frame */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <img
                  className="relative w-full max-h-[460px] object-cover rounded-2xl shadow-xl border border-gray-100"
                  src={back}
                  alt="About visual"
                />
              </div>

              {/* Right Content */}
              <div className="flex flex-col gap-5">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-100">
                  <span className="text-xl font-bold text-gray-900">
                    {sections?.about?.imageside?.position || "Full Stack Developer"}
                  </span>
                  <p className="text-gray-700 text-sm md:text-base mt-2 leading-relaxed">
                    {sections?.about?.imageside?.content}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="flex flex-col gap-2.5">
                    {left.map((item, i) => (
                      <div
                        className="flex justify-between items-center gap-3 p-3 bg-gray-50/80 rounded-xl border border-gray-100 text-sm"
                        key={i}
                      >
                        <span className="font-semibold text-gray-800">{item.title}:</span>
                        <span className="text-gray-600 truncate max-w-[160px] text-right font-medium">
                          {item.content}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {right.map((item, i) => (
                      <div
                        className="flex justify-between items-center gap-3 p-3 bg-gray-50/80 rounded-xl border border-gray-100 text-sm"
                        key={i}
                      >
                        <span className="font-semibold text-gray-800">{item.title}:</span>
                        <span className="text-gray-600 truncate max-w-[160px] text-right font-medium">
                          {item.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section with Modern Tech Cards & Animated Progress */}
        <section
          id="skill"
          className="h-fit py-14 px-6 md:px-14 fade-up delay-1 bg-gradient-to-b from-[#F8FAFC] via-slate-50 to-white relative overflow-hidden"
        >
          {/* Decorative ambient gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-cyan-600 font-bold bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
              Technical Stack
            </span>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {sections?.about?.skills?.title || "Skills & Expertise"}
                </h2>
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 rounded-full mt-3"></div>
              </div>
              <p className="text-gray-500 text-sm max-w-md">
                Hands-on production expertise in modern web ecosystems, frontend frameworks, and backend architectures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
              {skillsList.map((item, i) => (
                <div
                  key={i}
                  className="group p-5 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50/80 group-hover:scale-110 transition-all duration-300 shadow-xs">
                        {getSkillIcon(item.title)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-400 font-medium">Proficiency</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-100 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-xs">
                      {item.percentage}%
                    </span>
                  </div>

                  {/* Gradient Animated Progress Track */}
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out relative group-hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                      style={{ width: `${item.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume & Work Experience Section */}
        <section id="resume" className="h-fit py-14 px-6 md:px-14 fade-up delay-1 bg-white">
          <div className="max-w-6xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-violet-600 font-bold bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
              Career Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
              {sections?.resume?.title || "Resume & Experience"}
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mt-3 mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Summary + Education */}
              <div className="flex flex-col gap-8">
                {/* Summary Card */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FiBookOpen className="text-blue-600" />
                    <span>Summary</span>
                  </h3>
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2.5">
                    <p className="font-bold text-gray-900 text-lg">
                      {sections?.resume?.summary?.name || profile?.name}
                    </p>
                    <p className="text-blue-600 text-sm font-semibold">
                      {sections?.resume?.summary?.role || profile?.profession}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {sections?.resume?.summary?.description}
                    </p>
                    <ul className="text-xs text-gray-500 pt-2 border-t border-gray-200/80 space-y-1">
                      {sections?.resume?.summary?.location && (
                        <li>📍 {sections.resume.summary.location}</li>
                      )}
                      {sections?.resume?.summary?.phone && (
                        <li>📞 {sections.resume.summary.phone}</li>
                      )}
                      {sections?.resume?.summary?.email && (
                        <li>✉️ {sections.resume.summary.email}</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FiBookOpen className="text-indigo-600" />
                    <span>Education</span>
                  </h3>
                  <div className="space-y-4">
                    {(sections?.resume?.education || []).map((edu, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-2xl bg-gray-50 border-l-4 border-l-indigo-600 border border-gray-100 space-y-1.5"
                      >
                        <p className="font-bold text-gray-900">{edu.degree}</p>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                          {edu.year}
                        </span>
                        <p className="text-gray-700 font-medium text-sm">{edu.university}</p>
                        <p className="text-xs text-gray-500 leading-relaxed pt-1">{edu.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Professional Experience */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiBriefcase className="text-blue-600" />
                  <span>Work Experience</span>
                </h3>

                <div className="space-y-5">
                  {(sections?.resume?.experience || []).map((exp, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-gray-50 border-l-4 border-l-blue-600 border border-gray-100 shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-bold text-gray-900 text-base">{exp.role}</p>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          {exp.year}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mt-1">{exp.company}</p>

                      <ul className="text-xs text-gray-600 mt-3 space-y-2 list-none">
                        {(exp.points || []).map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Resume Button */}
            <div className="mt-10 pt-4">
              <a
                href="/resume.docx"
                download="Deepanshu-Resume.docx"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-600/25 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FiDownload className="text-lg" />
                <span>{sections?.resume?.["btn-name"] || "Download CV (Resume)"}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Showcase Section - Only shown when enabled by admin */}
        {sections?.projects?.enabled !== false && (
          <section
            id="projects"
            className="h-fit py-14 px-6 md:px-14 fade-up delay-1 bg-[#F8FAFC] relative overflow-hidden"
          >
            {/* Ambient lighting */}
            <div className="absolute top-0 right-10 w-80 h-80 bg-pink-100/40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
              <span className="text-xs uppercase tracking-widest text-pink-600 font-bold bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                Portfolio Showcase
              </span>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2 mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {sections?.projects?.title || "Featured Projects"}
                  </h2>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-full mt-3"></div>
                </div>
                <p className="text-gray-500 text-sm max-w-md">
                  {sections?.projects?.subtitle ||
                    "Production-grade web applications, dynamic CMS platforms, and scalable APIs."}
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(sections?.projects?.list || []).map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className="group rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                  >
                    {/* Project Screenshot / Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 text-gray-400">
                          <FiFolder className="text-4xl text-gray-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Project Links / Actions */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                          >
                            <FiExternalLink className="text-xs" />
                            <span>Live Demo</span>
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Internal Demo</span>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-800 text-gray-700 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                          >
                            <FaGithub className="text-xs" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        <section id="services" className="h-fit py-14 px-6 md:px-14 bg-slate-50 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              What I Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
              {sections?.services?.title || "Services & Capabilities"}
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-3 mb-8"></div>

            {/* Marquee Carousel Container */}
            <div className="overflow-hidden relative -mx-4 px-4 py-2">
              <div className="flex space-x-6 animate-marquee">
                {[
                  ...(sections?.services?.list || []),
                  ...(sections?.services?.list || []),
                ]?.map((item, i) => (
                  <div
                    key={i}
                    className="flex-none w-72 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={serviceImage[item.image] || fontend}
                      alt={item.title}
                      className="h-44 w-full object-cover rounded-xl mb-4 shadow-xs"
                    />
                    <h3 className="font-bold text-gray-900 text-lg mb-1.5">{item.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="h-fit py-14 px-6 md:px-14 fade-up delay-1 bg-white">
          <div className="max-w-6xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Communication
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
              Get In Touch
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-3 mb-6"></div>

            <Contact />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
