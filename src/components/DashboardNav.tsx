
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Calendar, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const studentNavItems: NavItem[] = [
  {
    title: "Find Tutors",
    href: "/student/find-tutors",
    icon: <Book className="w-5 h-5" />,
  },
  {
    title: "My Sessions",
    href: "/student/sessions",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "Notifications",
    href: "/student/notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    title: "Profile",
    href: "/student/profile",
    icon: <User className="w-5 h-5" />,
  },
];

const tutorNavItems: NavItem[] = [
  {
    title: "Sessions",
    href: "/tutor/sessions",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "Notifications",
    href: "/tutor/notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    title: "Profile",
    href: "/tutor/profile",
    icon: <User className="w-5 h-5" />,
  },
];

interface DashboardNavProps {
  userType: 'student' | 'tutor';
}

const DashboardNav: React.FC<DashboardNavProps> = ({ userType }) => {
  const navItems = userType === 'student' ? studentNavItems : tutorNavItems;
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)] md:relative md:shadow-none md:bg-transparent">
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex justify-around py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => 
              cn(
                "flex flex-col items-center justify-center text-xs font-medium px-2",
                isActive 
                  ? "text-cote-primary" 
                  : "text-gray-500 hover:text-cote-primary"
              )
            }
          >
            <span className="mb-1">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex flex-col p-4 gap-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => 
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-cote-light dark:bg-slate-800 text-cote-primary" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              )
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DashboardNav;
