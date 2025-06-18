
import React from 'react';
import { motion } from 'framer-motion';
import { Home, FolderOpen, History, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'tools', label: 'Tools', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-4 mb-8"
    >
      <div className="flex items-center justify-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView(item.id)}
              className={`
                relative transition-all duration-300
                ${isActive 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-md"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
