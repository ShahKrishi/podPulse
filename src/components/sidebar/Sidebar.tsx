import React, { type ReactNode } from "react";
import {
  FaTachometerAlt,
  FaPodcast,
  FaUserFriends,
  FaTags,
  FaSignOutAlt,
  FaUserTie,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  ADMIN_DASHBOARD,
  ADMIN_EPISODE_CATEGORY,
  ADMIN_EPISODES,
  ADMIN_HOSTS,
  ADMIN_PODCAST,
  ADMIN_USERS,
  LOGIN,
} from "../../routes/RoutesNames";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 text-2xl font-bold border-b border-gray-800">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink
          icon={<FaTachometerAlt />}
          label="Dashboard"
          route={ADMIN_DASHBOARD}
          active
        />
        <SidebarLink icon={<FaUserTie />} label="Hosts" route={ADMIN_HOSTS} />
        <SidebarLink
          icon={<FaTags />}
          label="Categories"
          route={ADMIN_EPISODE_CATEGORY}
        />
        <SidebarLink
          icon={<FaPodcast />}
          label="Podcast"
          route={ADMIN_PODCAST}
        />
        <SidebarLink
          icon={<FaUserFriends />}
          label="Episodes"
          route={ADMIN_EPISODES}
        />

        <SidebarLink
          icon={<FaUserFriends />}
          label="Users"
          route={ADMIN_USERS}
        />
      </nav>

      <div className="p-4 border-t border-gray-800">
        <SidebarLink icon={<FaSignOutAlt />} label="Logout" route={LOGIN} />
      </div>
    </div>
  );
};

type SidebarLinkProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  route: string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  active = false,
  route,
}) => {
  return (
    <Link to={route}>
      <div
        className={`flex items-center p-3 rounded cursor-pointer transition-colors 
                ${active ? "bg-gray-800" : "hover:bg-gray-800"}`}
      >
        <div className="mr-3 text-lg">{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
