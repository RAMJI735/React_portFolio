import React from "react";
import Avatar from "@mui/material/Avatar";
import { FiHome, FiUser, FiLayers, FiMail } from "react-icons/fi";
import { MdDesignServices } from "react-icons/md";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaSkype } from "react-icons/fa";
import image from "../assets/side.jpeg";

const Sidebar = ({ sidebarOpen, profile, navigation, scrollToSection }) => {
  const socialIcons = [
    { icon: FaTwitter, link: "#" },
    { icon: FaFacebookF, link: "#" },
    { icon: FaInstagram, link: "#" },
    { icon: FaSkype, link: "#" },
    { icon: FaLinkedinIn, link: "#" }
  ];

  const menuIcons = {
    home: <FiHome className="text-xl mr-3" />,
    about: <FiUser className="text-xl mr-3" />,
    services: <MdDesignServices className="text-xl mr-3" />,
    resume: <FiLayers className="text-xl mr-3" />,
    contact: <FiMail className="text-xl mr-3" />
  };

  return (
    <div
      className={`w-72 bg-[#0A1121] text-gray-200 flex flex-col items-center fixed lg:static h-full py-8 transition-all duration-300 z-40 shadow-lg
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      {/* Profile */}
      <div className="flex flex-col items-center">
        <Avatar
          sx={{ width: 120, height: 120 }}
          alt={profile.name}
          src={image}
          className="ring-4 ring-blue-600"
        />
        <h1 className="mt-4 text-xl font-semibold">{profile.name}</h1>
        <p className="text-gray-400">{profile.profession || "Full Stack Developer"}</p>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 mt-5">
        {socialIcons.map((item, i) => {
          const Icon = item.icon;
          return (
            <a
              key={i}
              href={item.link}
              className="p-3 rounded-full bg-[#111827] hover:bg-blue-600 transition text-gray-300 hover:text-white"
            >
              <Icon />
            </a>
          );
        })}
      </div>

      {/* Navigation List */}
      <div className="w-full mt-10 flex flex-col gap-3 px-6">
        {navigation.map((item, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(item.id)}
            className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-all"
          >
            {menuIcons[item.id]}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto text-gray-500 text-sm pt-6">
        © {new Date().getFullYear()} {profile.name}
      </div>
    </div>
  );
};

export default Sidebar;
