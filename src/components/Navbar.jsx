import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {
  FiHome,
  FiUser,
  FiLayers,
  FiMail,
  FiShield,
  FiCpu,
  FiCode,
  FiFolder,
} from "react-icons/fi";
import { MdDesignServices } from "react-icons/md";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import image from "../assets/side.jpeg";

const Sidebar = ({
  sidebarOpen,
  profile,
  navigation,
  scrollToSection,
  projectsEnabled = true,
}) => {
  const socialIcons = [
    { icon: FaTwitter, link: "https://twitter.com", label: "Twitter" },
    { icon: FaFacebookF, link: "https://facebook.com", label: "Facebook" },
    { icon: FaInstagram, link: "https://instagram.com", label: "Instagram" },
    { icon: FaLinkedinIn, link: "https://linkedin.com", label: "LinkedIn" },
  ];

  const menuIcons = {
    home: <FiHome className="text-lg mr-3 group-hover:scale-110 transition-transform text-blue-400 group-hover:text-blue-300" />,
    about: <FiUser className="text-lg mr-3 group-hover:scale-110 transition-transform text-indigo-400 group-hover:text-indigo-300" />,
    skill: <FiCpu className="text-lg mr-3 group-hover:scale-110 transition-transform text-cyan-400 group-hover:text-cyan-300" />,
    skills: <FiCpu className="text-lg mr-3 group-hover:scale-110 transition-transform text-cyan-400 group-hover:text-cyan-300" />,
    resume: <FiLayers className="text-lg mr-3 group-hover:scale-110 transition-transform text-violet-400 group-hover:text-violet-300" />,
    projects: <FiFolder className="text-lg mr-3 group-hover:scale-110 transition-transform text-pink-400 group-hover:text-pink-300" />,
    services: <MdDesignServices className="text-lg mr-3 group-hover:scale-110 transition-transform text-amber-400 group-hover:text-amber-300" />,
    contact: <FiMail className="text-lg mr-3 group-hover:scale-110 transition-transform text-emerald-400 group-hover:text-emerald-300" />
  };

  // Filter or insert projects based on toggle
  const filteredNav = (navigation || []).filter((item) => {
    if (item.id === "projects") {
      return projectsEnabled !== false;
    }
    return true;
  });

  const hasProjects = filteredNav.some((item) => item.id === "projects");
  const finalNav = [...filteredNav];
  if (projectsEnabled !== false && !hasProjects) {
    const insertIdx = finalNav.findIndex((i) => i.id === "services" || i.id === "contact");
    const projNav = { id: "projects", label: "Projects" };
    if (insertIdx !== -1) {
      finalNav.splice(insertIdx, 0, projNav);
    } else {
      finalNav.push(projNav);
    }
  }

  return (
    <aside
      className={`w-72 bg-[#090E1A] text-gray-200 flex flex-col items-center fixed lg:static h-full py-8 transition-all duration-300 z-40 shadow-2xl border-r border-gray-800/80 overflow-y-auto overflow-x-hidden select-none
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      {/* Profile with Glowing Animated Ring */}
      <div className="flex flex-col items-center">
        <div className="relative group cursor-pointer">
          <Avatar
            sx={{ width: 120, height: 120 }}
            alt={profile?.name || "Deepanshu Srivastava"}
            src={image}
            className="ring-4 ring-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-transform duration-300 group-hover:scale-105"
          />
          {/* Active status pulse ping */}
          <span className="absolute bottom-1 right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#090E1A]"></span>
          </span>
        </div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-white text-center px-4">
          {profile?.name || "Deepanshu Srivastava"}
        </h1>
        <p className="text-xs uppercase tracking-wider text-blue-400 font-semibold mt-1 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          {profile?.profession || "Full Stack Developer"}
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex gap-2.5 mt-5">
        {socialIcons.map((item, i) => {
          const Icon = item.icon;
          return (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="p-2.5 rounded-xl bg-[#111827]/80 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-indigo-500 transition-all duration-200 text-gray-400 hover:text-white border border-gray-800 hover:border-transparent hover:scale-110 shadow-sm"
            >
              <Icon className="text-sm" />
            </a>
          );
        })}
      </div>

      {/* Navigation List with Dynamic Icons */}
      <div className="w-full mt-8 flex flex-col gap-1.5 px-5">
        {finalNav.map((item, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(item.id)}
            className="group flex items-center w-full px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-indigo-600/10 text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-blue-500/30 text-sm font-medium tracking-wide text-left cursor-pointer"
          >
            {menuIcons[item.id] || <FiCode className="text-lg mr-3 group-hover:scale-110 transition-transform text-cyan-400" />}
            <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Admin Quick Link */}
      <div className="w-full px-5 mt-6">
        <Link
          to="/login"
          className="group flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-gray-900/90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-xs text-gray-300 hover:text-white transition-all duration-200 border border-gray-800 hover:border-blue-500 shadow-md font-medium"
        >
          <FiShield className="text-sm text-blue-400 group-hover:text-white transition-colors" />
          <span>Admin Portal</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-auto text-gray-500 text-xs pt-6 text-center">
        © {new Date().getFullYear()} {profile?.name || "Deepanshu"}
      </div>
    </aside>
  );
};

export default Sidebar;
