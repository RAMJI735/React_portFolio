import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import { contactApi, authApi } from "../../services/api";
import { toast } from "react-toastify";
import {
  FiHome,
  FiUser,
  FiLayers,
  FiBriefcase,
  FiFileText,
  FiMail,
  FiLogOut,
  FiExternalLink,
  FiSave,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiCheckCircle,
  FiRefreshCw,
  FiKey,
  FiSliders,
  FiInbox,
  FiClock,
  FiCheck,
  FiFolder,
  FiGlobe,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { MdOutlineDashboard, MdDesignServices } from "react-icons/md";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { portfolio, updateSection, updateAll, resetToDefault } = usePortfolio();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [isSaving, setIsSaving] = useState(false);

  // Inquiries / Messages state
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Local draft state for editing portfolio
  const [formData, setFormData] = useState(portfolio);

  // Synchronize when portfolio updates from server
  useEffect(() => {
    if (portfolio) {
      setFormData(portfolio);
    }
  }, [portfolio]);

  // Load messages on mount or when switching to messages tab
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const res = await contactApi.getMessages();
      if (res.success && res.messages) {
        setMessages(res.messages);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  // Generic section saver
  const saveSection = async (sectionName, data) => {
    setIsSaving(true);
    const res = await updateSection(sectionName, data);
    setIsSaving(false);
    if (res.success) {
      toast.success(`${sectionName.toUpperCase()} section saved!`);
    } else {
      toast.error(res.message || "Failed to save section");
    }
  };

  // Full portfolio saver
  const saveAll = async () => {
    setIsSaving(true);
    const res = await updateAll(formData);
    setIsSaving(false);
    if (res.success) {
      toast.success("All portfolio changes published live!");
    } else {
      toast.error(res.message || "Failed to save portfolio");
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm("Are you sure you want to restore original default settings? Custom edits will be replaced.")) {
      setIsSaving(true);
      const res = await resetToDefault();
      setIsSaving(false);
      if (res.success) {
        toast.success("Portfolio restored to defaults!");
      }
    }
  };

  // Skills handlers
  const [newSkill, setNewSkill] = useState({ title: "", percentage: 80 });
  const handleAddSkill = () => {
    if (!newSkill.title.trim()) {
      toast.error("Please enter a skill title.");
      return;
    }
    const currentSkills = [...(formData.sections.about?.skills?.content || [])];
    currentSkills.push({ title: newSkill.title.trim(), percentage: String(newSkill.percentage) });
    const updatedAbout = {
      ...formData.sections.about,
      skills: {
        ...formData.sections.about.skills,
        content: currentSkills,
      },
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        about: updatedAbout,
      },
    });
    setNewSkill({ title: "", percentage: 80 });
    saveSection("about", updatedAbout);
  };

  const handleDeleteSkill = (index) => {
    const currentSkills = [...(formData.sections.about?.skills?.content || [])];
    currentSkills.splice(index, 1);
    const updatedAbout = {
      ...formData.sections.about,
      skills: {
        ...formData.sections.about.skills,
        content: currentSkills,
      },
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        about: updatedAbout,
      },
    });
    saveSection("about", updatedAbout);
  };

  // Services handlers
  const [newService, setNewService] = useState({ title: "", description: "", image: "frontend.jpg" });
  const handleAddService = () => {
    if (!newService.title.trim() || !newService.description.trim()) {
      toast.error("Please provide both title and description.");
      return;
    }
    const currentList = [...(formData.sections.services?.list || [])];
    currentList.push({
      id: "srv-" + Date.now(),
      title: newService.title.trim(),
      description: newService.description.trim(),
      image: newService.image || "frontend.jpg",
    });
    const updatedServices = {
      ...formData.sections.services,
      list: currentList,
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        services: updatedServices,
      },
    });
    setNewService({ title: "", description: "", image: "frontend.jpg" });
    saveSection("services", updatedServices);
  };

  const handleDeleteService = (index) => {
    const currentList = [...(formData.sections.services?.list || [])];
    currentList.splice(index, 1);
    const updatedServices = {
      ...formData.sections.services,
      list: currentList,
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        services: updatedServices,
      },
    });
    saveSection("services", updatedServices);
  };

  // Projects handlers
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
  });

  const handleToggleProjects = async (e) => {
    const isChecked = e.target.checked;
    const currentProjects = formData.sections?.projects || {
      title: "Featured Projects",
      subtitle: "A showcase of full-stack web applications, APIs, and client systems I have engineered.",
      enabled: true,
      list: [],
    };
    const updatedProjects = {
      ...currentProjects,
      enabled: isChecked,
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        projects: updatedProjects,
      },
    });
    const res = await updateSection("projects", updatedProjects);
    if (res.success) {
      toast.success(
        isChecked
          ? "Projects section enabled on live site!"
          : "Projects section hidden from live site!"
      );
    } else {
      toast.error(res.message || "Failed to update projects visibility");
    }
  };

  const handleAddProject = () => {
    if (!newProject.title.trim()) {
      toast.error("Project title is required.");
      return;
    }

    const tags = newProject.technologies
      ? newProject.technologies.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const currentList = [...(formData.sections?.projects?.list || [])];
    const projectItem = {
      id: "proj-" + Date.now(),
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      image:
        newProject.image.trim() ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      technologies: tags,
      liveUrl: newProject.liveUrl.trim(),
      githubUrl: newProject.githubUrl.trim(),
    };

    currentList.unshift(projectItem);
    const updatedProjects = {
      ...(formData.sections?.projects || {
        title: "Featured Projects",
        subtitle: "A showcase of full-stack web applications, APIs, and client systems I have engineered.",
        enabled: true,
      }),
      list: currentList,
    };

    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        projects: updatedProjects,
      },
    });

    setNewProject({
      title: "",
      description: "",
      image: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
    });

    saveSection("projects", updatedProjects);
  };

  const handleDeleteProject = (index) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const currentList = [...(formData.sections?.projects?.list || [])];
    currentList.splice(index, 1);
    const updatedProjects = {
      ...formData.sections?.projects,
      list: currentList,
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        projects: updatedProjects,
      },
    });
    saveSection("projects", updatedProjects);
  };

  // Experience handlers
  const [newExp, setNewExp] = useState({ role: "", company: "", year: "", points: "" });
  const handleAddExperience = () => {
    if (!newExp.role.trim() || !newExp.company.trim()) {
      toast.error("Role and company are required.");
      return;
    }
    const pointsArray = newExp.points
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const currentExp = [...(formData.sections.resume?.experience || [])];
    currentExp.unshift({
      role: newExp.role.trim(),
      company: newExp.company.trim(),
      year: newExp.year.trim(),
      points: pointsArray.length > 0 ? pointsArray : ["Accomplished major milestones"],
    });

    const updatedResume = {
      ...formData.sections.resume,
      experience: currentExp,
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        resume: updatedResume,
      },
    });
    setNewExp({ role: "", company: "", year: "", points: "" });
    saveSection("resume", updatedResume);
  };

  const handleDeleteExperience = (index) => {
    const currentExp = [...(formData.sections.resume?.experience || [])];
    currentExp.splice(index, 1);
    const updatedResume = {
      ...formData.sections.resume,
      experience: currentExp,
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        resume: updatedResume,
      },
    });
    saveSection("resume", updatedResume);
  };

  // Education handlers
  const [newEdu, setNewEdu] = useState({ degree: "", university: "", year: "", details: "" });
  const handleAddEducation = () => {
    if (!newEdu.degree.trim() || !newEdu.university.trim()) {
      toast.error("Degree and university are required.");
      return;
    }
    const currentEdu = [...(formData.sections.resume?.education || [])];
    currentEdu.unshift({
      degree: newEdu.degree.trim(),
      university: newEdu.university.trim(),
      year: newEdu.year.trim(),
      details: newEdu.details.trim(),
    });

    const updatedResume = {
      ...formData.sections.resume,
      education: currentEdu,
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        resume: updatedResume,
      },
    });
    setNewEdu({ degree: "", university: "", year: "", details: "" });
    saveSection("resume", updatedResume);
  };

  const handleDeleteEducation = (index) => {
    const currentEdu = [...(formData.sections.resume?.education || [])];
    currentEdu.splice(index, 1);
    const updatedResume = {
      ...formData.sections.resume,
      education: currentEdu,
    };
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        resume: updatedResume,
      },
    });
    saveSection("resume", updatedResume);
  };

  // Messages Actions
  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await contactApi.markRead(id, !currentStatus);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead: !currentStatus } : m))
        );
        toast.success(`Marked as ${!currentStatus ? "Read" : "Unread"}`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const res = await contactApi.deleteMessage(id);
        if (res.success) {
          setMessages((prev) => prev.filter((m) => m.id !== id));
          toast.success("Message deleted");
        }
      } catch (err) {
        toast.error("Failed to delete message");
      }
    }
  };

  // Change Password
  const [passData, setPassData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [isChangingPass, setIsChangingPass] = useState(false);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setIsChangingPass(true);
    try {
      const res = await authApi.changePassword(passData.currentPassword, passData.newPassword);
      if (res.success) {
        toast.success("Admin password updated successfully!");
        setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res.message || "Failed to update password");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setIsChangingPass(false);
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-[#070b14] text-gray-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0A1121] border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/30">
              D
            </div>
            <div>
              <h2 className="font-bold text-white tracking-wide">CMS Admin</h2>
              <p className="text-xs text-blue-400 font-mono">Deepanshu Portfolio</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: "overview", label: "Dashboard Overview", icon: <MdOutlineDashboard className="text-xl" /> },
            { id: "profile", label: "Hero & Profile", icon: <FiUser className="text-xl" /> },
            { id: "about", label: "About & Highlights", icon: <FiFileText className="text-xl" /> },
            { id: "skills", label: "Skills Stack", icon: <FiSliders className="text-xl" /> },
            { id: "projects", label: "Projects Showcase", icon: <FiFolder className="text-xl" /> },
            { id: "services", label: "Services", icon: <MdDesignServices className="text-xl" /> },
            { id: "resume", label: "Resume & Career", icon: <FiBriefcase className="text-xl" /> },
            { id: "contact", label: "Contact & Social", icon: <FiMail className="text-xl" /> },
            {
              id: "messages",
              label: "Inquiries Inbox",
              icon: <FiInbox className="text-xl" />,
              badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
            },
            { id: "security", label: "Admin Security", icon: <FiKey className="text-xl" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition"
          >
            <FiExternalLink /> View Live Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 border border-red-900/50 text-xs font-semibold transition cursor-pointer"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-[#0A1121]/90 border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Section</span>
            <span className="text-gray-600">/</span>
            <span className="text-sm font-bold text-white capitalize">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              title="Reset data back to default baseline"
              className="px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 text-xs text-gray-300 flex items-center gap-1.5 transition cursor-pointer"
            >
              <FiRefreshCw className="text-xs" /> Reset Defaults
            </button>
            <button
              onClick={saveAll}
              disabled={isSaving}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition disabled:opacity-50 cursor-pointer"
            >
              <FiSave /> {isSaving ? "Publishing..." : "Publish All"}
            </button>
          </div>
        </header>

        {/* Tab Contents */}
        <div className="p-6 md:p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/20 border border-blue-800/40 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                    Welcome, {user?.name || "Deepanshu"}!
                  </h1>
                  <p className="text-gray-300 text-sm mt-2 max-w-2xl">
                    Everything you customize here syncs instantaneously with your live portfolio website. You can edit skills, update career experience, curate services, and respond to incoming inquiries.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab("messages")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white transition flex items-center gap-2 cursor-pointer"
                    >
                      <FiInbox /> Check Inquiries ({unreadMessagesCount} unread)
                    </button>
                    <Link
                      to="/"
                      target="_blank"
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-xs font-semibold text-gray-200 transition flex items-center gap-2"
                    >
                      <FiExternalLink /> Open Live Site
                    </Link>
                  </div>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-5">
                  <span className="text-xs text-gray-400 font-medium">Technical Skills</span>
                  <div className="text-3xl font-bold text-white mt-1">
                    {formData.sections.about?.skills?.content?.length || 0}
                  </div>
                  <span className="text-xs text-blue-400 mt-2 block">Dynamic stack bars</span>
                </div>

                <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-5">
                  <span className="text-xs text-gray-400 font-medium">Services Offered</span>
                  <div className="text-3xl font-bold text-white mt-1">
                    {formData.sections.services?.list?.length || 0}
                  </div>
                  <span className="text-xs text-green-400 mt-2 block">Active offerings</span>
                </div>

                <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-5">
                  <span className="text-xs text-gray-400 font-medium">Work Experiences</span>
                  <div className="text-3xl font-bold text-white mt-1">
                    {formData.sections.resume?.experience?.length || 0}
                  </div>
                  <span className="text-xs text-purple-400 mt-2 block">Career milestones</span>
                </div>

                <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-5">
                  <span className="text-xs text-gray-400 font-medium">Contact Inquiries</span>
                  <div className="text-3xl font-bold text-white mt-1">{messages.length}</div>
                  <span className="text-xs text-orange-400 mt-2 block">
                    {unreadMessagesCount} unread messages
                  </span>
                </div>
              </div>

              {/* Quick Section Shortcuts */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Quick Management</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="p-4 rounded-xl bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 text-left transition cursor-pointer"
                  >
                    <FiUser className="text-blue-400 text-xl mb-2" />
                    <h4 className="font-semibold text-sm text-white">Hero & Profile</h4>
                    <p className="text-xs text-gray-400 mt-1">Change name, avatar, and typewriter words.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("skills")}
                    className="p-4 rounded-xl bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 text-left transition cursor-pointer"
                  >
                    <FiSliders className="text-green-400 text-xl mb-2" />
                    <h4 className="font-semibold text-sm text-white">Skills & Stack</h4>
                    <p className="text-xs text-gray-400 mt-1">Add new frameworks, libraries & adjust levels.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("services")}
                    className="p-4 rounded-xl bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 text-left transition cursor-pointer"
                  >
                    <MdDesignServices className="text-purple-400 text-xl mb-2" />
                    <h4 className="font-semibold text-sm text-white">Services & Work</h4>
                    <p className="text-xs text-gray-400 mt-1">Add, update or delete client service packages.</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROFILE & HERO */}
          {activeTab === "profile" && (
            <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Hero Section & Main Profile</h2>
                  <p className="text-xs text-gray-400">Configure your hero banner, titles, and avatar.</p>
                </div>
                <button
                  onClick={() => {
                    saveSection("profile", formData.profile);
                    saveSection("home", formData.sections.home);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FiSave /> Save Profile & Hero
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.profile?.name || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, name: e.target.value },
                        sections: {
                          ...formData.sections,
                          home: { ...formData.sections.home, title: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Profession / Title</label>
                  <input
                    type="text"
                    value={formData.profile?.profession || "Full Stack Developer"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, profession: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    Hero Typewriter Animated Roles (comma separated)
                  </label>
                  <input
                    type="text"
                    value={(formData.sections.home?.typewriterWords || ["Developer", "Designer", "Freelancer"]).join(", ")}
                    onChange={(e) => {
                      const words = e.target.value.split(",").map((w) => w.trim()).filter(Boolean);
                      setFormData({
                        ...formData,
                        sections: {
                          ...formData.sections,
                          home: { ...formData.sections.home, typewriterWords: words },
                        },
                      });
                    }}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Full Stack Developer, Next.js Architect, Problem Solver"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    These keywords rotate continuously with typewriter effect on the hero header.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    Hero Intro Tagline / Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.sections.home?.content || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sections: {
                          ...formData.sections,
                          home: { ...formData.sections.home, content: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT */}
          {activeTab === "about" && (
            <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">About Me Section</h2>
                  <p className="text-xs text-gray-400">Edit your biography, key stats, and personal facts.</p>
                </div>
                <button
                  onClick={() => saveSection("about", formData.sections.about)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FiSave /> Save About
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    Primary Biography Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={formData.sections.about?.content || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sections: {
                          ...formData.sections,
                          about: { ...formData.sections.about, content: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Position Title
                    </label>
                    <input
                      type="text"
                      value={formData.sections.about?.imageside?.position || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sections: {
                            ...formData.sections,
                            about: {
                              ...formData.sections.about,
                              imageside: {
                                ...formData.sections.about.imageside,
                                position: e.target.value,
                              },
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Position Statement / Philosophy
                    </label>
                    <textarea
                      rows={3}
                      value={formData.sections.about?.imageside?.content || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sections: {
                            ...formData.sections,
                            about: {
                              ...formData.sections.about,
                              imageside: {
                                ...formData.sections.about.imageside,
                                content: e.target.value,
                              },
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Personal Information items */}
                <div>
                  <h3 className="text-sm font-bold text-white mb-3">Key Attributes / Quick Facts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {(formData.sections.about?.imageHeading || []).map((item, idx) => (
                      <div key={idx} className="bg-gray-800/80 p-3 rounded-xl border border-gray-700">
                        <label className="text-[11px] font-bold text-blue-400 uppercase block mb-1">
                          {item.title}
                        </label>
                        <input
                          type="text"
                          value={item.content}
                          onChange={(e) => {
                            const updatedHeadings = [...formData.sections.about.imageHeading];
                            updatedHeadings[idx] = { ...item, content: e.target.value };
                            setFormData({
                              ...formData,
                              sections: {
                                ...formData.sections,
                                about: {
                                  ...formData.sections.about,
                                  imageHeading: updatedHeadings,
                                },
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              {/* Add New Skill Card */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Add New Technical Skill</h3>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Skill Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Next.js, Docker, PostgreSQL"
                      value={newSkill.title}
                      onChange={(e) => setNewSkill({ ...newSkill, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                      <span>Proficiency</span>
                      <span className="text-blue-400 font-bold">{newSkill.percentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={newSkill.percentage}
                      onChange={(e) => setNewSkill({ ...newSkill, percentage: Number(e.target.value) })}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      onClick={handleAddSkill}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <FiPlus /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing Skills List */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-bold text-white">
                    Current Skills ({formData.sections.about?.skills?.content?.length || 0})
                  </h3>
                  <button
                    onClick={() => saveSection("about", formData.sections.about)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FiSave /> Save All Skills
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(formData.sections.about?.skills?.content || []).map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={skill.title}
                          onChange={(e) => {
                            const updated = [...formData.sections.about.skills.content];
                            updated[index] = { ...skill, title: e.target.value };
                            setFormData({
                              ...formData,
                              sections: {
                                ...formData.sections,
                                about: {
                                  ...formData.sections.about,
                                  skills: { ...formData.sections.about.skills, content: updated },
                                },
                              },
                            });
                          }}
                          className="bg-transparent font-semibold text-white text-sm focus:outline-none focus:border-b focus:border-blue-500"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                            {skill.percentage}%
                          </span>
                          <button
                            onClick={() => handleDeleteSkill(index)}
                            className="text-gray-400 hover:text-red-400 p-1 transition cursor-pointer"
                            title="Delete Skill"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                      </div>

                      <div className="w-full">
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={skill.percentage}
                          onChange={(e) => {
                            const updated = [...formData.sections.about.skills.content];
                            updated[index] = { ...skill, percentage: e.target.value };
                            setFormData({
                              ...formData,
                              sections: {
                                ...formData.sections,
                                about: {
                                  ...formData.sections.about,
                                  skills: { ...formData.sections.about.skills, content: updated },
                                },
                              },
                            });
                          }}
                          className="w-full accent-blue-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROJECTS SHOWCASE */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Visibility Toggle Card */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/20 border border-blue-900/50">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-white text-base">Showcase Projects Section on Live Site</h4>
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                          formData.sections?.projects?.enabled !== false
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-gray-800 text-gray-400 border border-gray-700"
                        }`}
                      >
                        {formData.sections?.projects?.enabled !== false
                          ? "Visible on Live Website"
                          : "Hidden from Live Website"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 max-w-xl">
                      Click the switch below to showcase or hide the entire Projects section and its navbar button on your live portfolio.
                    </p>
                  </div>

                  {/* Toggle Checkbox */}
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.sections?.projects?.enabled !== false}
                      onChange={handleToggleProjects}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Section Details Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Section Heading</label>
                    <input
                      type="text"
                      value={formData.sections?.projects?.title || "Featured Projects"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sections: {
                            ...formData.sections,
                            projects: { ...(formData.sections?.projects || {}), title: e.target.value },
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Section Subtitle</label>
                    <input
                      type="text"
                      value={formData.sections?.projects?.subtitle || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sections: {
                            ...formData.sections,
                            projects: { ...(formData.sections?.projects || {}), subtitle: e.target.value },
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. A showcase of full-stack web applications and scalable APIs."
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => saveSection("projects", formData.sections?.projects)}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <FiSave /> Save Section Heading
                  </button>
                </div>
              </div>

              {/* Add New Project Card */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <FiPlus className="text-blue-400" />
                  <span>Add New Project</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Project Title *</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. Social Media Web App"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Screenshot (SS) Image URL
                    </label>
                    <input
                      type="text"
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      placeholder="https://... or /assets/..."
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                      placeholder="React, Node.js, Express, MongoDB, Tailwind"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Live Demo URL</label>
                    <input
                      type="text"
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                      placeholder="https://yourproject.com"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      GitHub Repository URL
                    </label>
                    <input
                      type="text"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      placeholder="https://github.com/username/repo"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Project Description
                    </label>
                    <textarea
                      rows={3}
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Describe what this project does, key features, and architecture..."
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Screenshot live preview if URL entered */}
                {newProject.image && (
                  <div className="mt-4 p-3 bg-gray-800/60 rounded-xl border border-gray-700 inline-block">
                    <span className="text-xs text-gray-400 block mb-1">Screenshot Preview:</span>
                    <img
                      src={newProject.image}
                      alt="Preview"
                      className="h-28 w-48 object-cover rounded-lg border border-gray-600"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                  </div>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleAddProject}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    <FiPlus /> Add Project
                  </button>
                </div>
              </div>

              {/* Existing Projects List */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">
                    Showcase Projects List ({formData.sections?.projects?.list?.length || 0})
                  </h3>
                  <span className="text-xs text-gray-400">
                    {formData.sections?.projects?.enabled !== false ? "🟢 Visible on Site" : "🔴 Hidden on Site"}
                  </span>
                </div>

                {(!formData.sections?.projects?.list || formData.sections.projects.list.length === 0) ? (
                  <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                    <FiFolder className="text-4xl mx-auto mb-2 text-gray-600" />
                    <p className="text-sm">No projects added yet. Use the form above to add your first project.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {formData.sections.projects.list.map((proj, idx) => (
                      <div
                        key={proj.id || idx}
                        className="bg-gray-800/80 border border-gray-700/80 rounded-xl overflow-hidden flex flex-col group hover:border-gray-600 transition"
                      >
                        <div className="relative h-36 bg-gray-900 overflow-hidden">
                          {proj.image ? (
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                              <FiFolder className="text-3xl" />
                            </div>
                          )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                          <h4 className="font-bold text-white text-base mb-1">{proj.title}</h4>
                          <p className="text-gray-400 text-xs line-clamp-2 mb-3 flex-1">{proj.description}</p>

                          {proj.technologies && proj.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {proj.technologies.map((t, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-gray-900 text-gray-300 text-[10px]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="pt-3 border-t border-gray-700/60 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              {proj.liveUrl && (
                                <a
                                  href={proj.liveUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                >
                                  <FiExternalLink /> Live
                                </a>
                              )}
                              {proj.githubUrl && (
                                <a
                                  href={proj.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-gray-300 hover:text-white flex items-center gap-1"
                                >
                                  <FaGithub /> Repo
                                </a>
                              )}
                            </div>

                            <button
                              onClick={() => handleDeleteProject(idx)}
                              className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40 transition cursor-pointer"
                              title="Delete project"
                            >
                              <FiTrash2 className="text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === "services" && (
            <div className="space-y-6">
              {/* Add Service Card */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Add New Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Service Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Cloud API Architecture"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Image Identifier</label>
                    <select
                      value={newService.image}
                      onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="frontend.jpg">Frontend Graphic (frontend.jpg)</option>
                      <option value="backend.jpg">Backend Graphic (backend.jpg)</option>
                      <option value="native.jpg">Mobile App Graphic (native.jpg)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Explain what value you deliver to clients..."
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      onClick={handleAddService}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <FiPlus /> Add Service
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Cards List */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-bold text-white">
                    Active Services ({formData.sections.services?.list?.length || 0})
                  </h3>
                  <button
                    onClick={() => saveSection("services", formData.sections.services)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FiSave /> Save All Services
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {(formData.sections.services?.list || []).map((service, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-5 flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-[11px] font-mono text-blue-400 uppercase bg-blue-950/60 px-2 py-0.5 rounded">
                            {service.image}
                          </span>
                          <button
                            onClick={() => handleDeleteService(index)}
                            className="text-gray-400 hover:text-red-400 p-1 transition cursor-pointer"
                            title="Delete Service"
                          >
                            <FiTrash2 className="text-base" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const updated = [...formData.sections.services.list];
                            updated[index] = { ...service, title: e.target.value };
                            setFormData({
                              ...formData,
                              sections: {
                                ...formData.sections,
                                services: { ...formData.sections.services, list: updated },
                              },
                            });
                          }}
                          className="w-full font-bold text-white text-base mt-2 bg-transparent border-b border-transparent hover:border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                        <textarea
                          rows={3}
                          value={service.description}
                          onChange={(e) => {
                            const updated = [...formData.sections.services.list];
                            updated[index] = { ...service, description: e.target.value };
                            setFormData({
                              ...formData,
                              sections: {
                                ...formData.sections,
                                services: { ...formData.sections.services, list: updated },
                              },
                            });
                          }}
                          className="w-full text-xs text-gray-300 mt-2 bg-gray-900/60 border border-gray-700/60 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: RESUME */}
          {activeTab === "resume" && (
            <div className="space-y-6">
              {/* Summary and CV Download Card */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-white">Resume Header & CV File</h3>
                  <button
                    onClick={() => saveSection("resume", formData.sections.resume)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FiSave /> Save Resume
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">CV Button Text</label>
                    <input
                      type="text"
                      value={formData.sections.resume?.["btn-name"] || "Download CV"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sections: {
                            ...formData.sections,
                            resume: { ...formData.sections.resume, "btn-name": e.target.value },
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">CV File Link</label>
                    <input
                      type="text"
                      value={formData.sections.resume?.cvUrl || "/resume.docx"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sections: {
                            ...formData.sections,
                            resume: { ...formData.sections.resume, cvUrl: e.target.value },
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Summary Role</label>
                    <input
                      type="text"
                      value={formData.sections.resume?.summary?.role || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sections: {
                            ...formData.sections,
                            resume: {
                              ...formData.sections.resume,
                              summary: { ...formData.sections.resume.summary, role: e.target.value },
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Summary Bio</label>
                    <textarea
                      rows={2}
                      value={formData.sections.resume?.summary?.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sections: {
                            ...formData.sections,
                            resume: {
                              ...formData.sections.resume,
                              summary: { ...formData.sections.resume.summary, description: e.target.value },
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Experience Manager */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Add Work Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Role Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Full Stack Engineer"
                      value={newExp.role}
                      onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Company & Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Google, Remote"
                      value={newExp.company}
                      onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Time Period</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024 - Present"
                      value={newExp.year}
                      onChange={(e) => setNewExp({ ...newExp, year: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                      Key Accomplishments (One per line)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Built scalable APIs&#10;Boosted Lighthouse performance by 40%"
                      value={newExp.points}
                      onChange={(e) => setNewExp({ ...newExp, points: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FiPlus /> Add Experience
                </button>

                {/* Experience Items List */}
                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-bold text-gray-300">Existing Experience</h4>
                  {(formData.sections.resume?.experience || []).map((exp, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-4 flex justify-between items-start gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-sm">{exp.role}</span>
                          <span className="text-xs text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">
                            {exp.year}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 italic">{exp.company}</p>
                        <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 mt-2">
                          {(exp.points || []).map((pt, pidx) => (
                            <li key={pidx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => handleDeleteExperience(index)}
                        className="text-gray-400 hover:text-red-400 p-1.5 transition cursor-pointer"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Manager */}
              <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Add Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Degree Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Bachelor of Computer Science"
                      value={newEdu.degree}
                      onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">University / Institute</label>
                    <input
                      type="text"
                      placeholder="e.g. Lucknow University"
                      value={newEdu.university}
                      onChange={(e) => setNewEdu({ ...newEdu, university: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Years Attended</label>
                    <input
                      type="text"
                      placeholder="e.g. 2021 - 2024"
                      value={newEdu.year}
                      onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Specialization / Highlights</label>
                    <textarea
                      rows={2}
                      placeholder="Specialized in Web Engineering and Algorithms"
                      value={newEdu.details}
                      onChange={(e) => setNewEdu({ ...newEdu, details: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddEducation}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FiPlus /> Add Education
                </button>

                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-bold text-gray-300">Existing Education</h4>
                  {(formData.sections.resume?.education || []).map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-4 flex justify-between items-start gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-sm">{edu.degree}</span>
                          <span className="text-xs text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 italic">{edu.university}</p>
                        <p className="text-xs text-gray-300 mt-1">{edu.details}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteEducation(index)}
                        className="text-gray-400 hover:text-red-400 p-1.5 transition cursor-pointer"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CONTACT & SOCIAL */}
          {activeTab === "contact" && (
            <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Contact Info & Social Links</h2>
                  <p className="text-xs text-gray-400">Update how prospective clients reach out to you.</p>
                </div>
                <button
                  onClick={() => saveSection("contact", formData.sections.contact)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FiSave /> Save Contact Info
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.sections.contact?.email || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sections: {
                          ...formData.sections,
                          contact: { ...formData.sections.contact, email: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={formData.sections.contact?.number || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sections: {
                          ...formData.sections,
                          contact: { ...formData.sections.contact, number: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">Location / Address</label>
                  <input
                    type="text"
                    value={formData.sections.contact?.address || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sections: {
                          ...formData.sections,
                          contact: { ...formData.sections.contact, address: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    Contact Heading Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.sections.contact?.content || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sections: {
                          ...formData.sections,
                          contact: { ...formData.sections.contact, content: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Social Links */}
                <div className="md:col-span-2 space-y-3 pt-4 border-t border-gray-800">
                  <h3 className="text-sm font-bold text-white">Social Media Profile URLs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(formData.sections.contact?.social || []).map((social, idx) => (
                      <div key={idx} className="bg-gray-800/80 p-3 rounded-xl border border-gray-700">
                        <span className="text-xs text-blue-400 font-semibold uppercase block mb-1">
                          {social.name || social.icon}
                        </span>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={social.link || ""}
                          onChange={(e) => {
                            const updated = [...formData.sections.contact.social];
                            updated[idx] = { ...social, link: e.target.value };
                            setFormData({
                              ...formData,
                              sections: {
                                ...formData.sections,
                                contact: { ...formData.sections.contact, social: updated },
                              },
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INBOX */}
          {activeTab === "messages" && (
            <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Contact Inquiries Inbox</h2>
                  <p className="text-xs text-gray-400">
                    Visitor messages submitted via the website contact form are saved here.
                  </p>
                </div>
                <button
                  onClick={fetchMessages}
                  className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FiRefreshCw /> Refresh Inbox
                </button>
              </div>

              {isLoadingMessages ? (
                <div className="py-12 flex flex-col items-center justify-center text-gray-400 text-sm">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  Loading inbox messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <FiInbox className="text-4xl mx-auto mb-3 text-gray-600" />
                  <p className="font-semibold text-base text-gray-300">No inquiries yet</p>
                  <p className="text-xs text-gray-500 mt-1">
                    When visitors submit the contact form, messages will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`rounded-xl border p-5 transition ${
                        msg.isRead
                          ? "bg-gray-900/60 border-gray-800 text-gray-300"
                          : "bg-blue-950/20 border-blue-800/70 text-white shadow-sm"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              msg.isRead ? "bg-gray-600" : "bg-blue-500 animate-pulse"
                            }`}
                          ></span>
                          <span className="font-bold text-sm text-white">{msg.name}</span>
                          <span className="text-xs text-gray-400 font-mono">({msg.email})</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <FiClock className="text-xs" />
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "Just now"}
                          </span>
                          <button
                            onClick={() => handleToggleRead(msg.id, msg.isRead)}
                            className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition ${
                              msg.isRead
                                ? "bg-gray-800 text-gray-400 hover:text-white"
                                : "bg-blue-600 text-white hover:bg-blue-500"
                            }`}
                          >
                            {msg.isRead ? "Mark Unread" : "Mark Read"}
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 text-gray-500 hover:text-red-400 transition cursor-pointer"
                            title="Delete Message"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-blue-300 mb-1">
                          Subject: {msg.subject || "No Subject"}
                        </h4>
                        <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed mt-2 bg-black/20 p-3 rounded-lg border border-gray-800/50">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: SECURITY */}
          {activeTab === "security" && (
            <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 md:p-8 max-w-xl">
              <h2 className="text-xl font-bold text-white mb-2">Admin Account & Credentials</h2>
              <p className="text-xs text-gray-400 mb-6">
                Update the password used to access this CMS dashboard.
              </p>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passData.currentPassword}
                    onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    New Password (min 6 characters)
                  </label>
                  <input
                    type="password"
                    required
                    value={passData.newPassword}
                    onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passData.confirmPassword}
                    onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  {isChangingPass ? "Updating Password..." : "Update Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
