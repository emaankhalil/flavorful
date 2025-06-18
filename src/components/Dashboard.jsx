
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image as ImageIcon, Folder, Clock, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { PaletteIcon, LightningIcon, RocketIcon, BrandKitIcon } from '@/components/CustomIcons';

const Dashboard = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [stats, setStats] = useState({
    totalPalettes: 0,
    totalMoodboards: 0,
    totalIcons: 0,
    totalBrandKits: 0
  });

  useEffect(() => {
    // Load saved items from localStorage
    const palettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
    const moodboards = JSON.parse(localStorage.getItem('savedMoodboards') || '[]');
    const icons = JSON.parse(localStorage.getItem('savedIcons') || '[]');
    const brandKits = JSON.parse(localStorage.getItem('savedBrandKits') || '[]');

    const allItems = [
      ...palettes.map(item => ({ ...item, type: 'palette' })),
      ...moodboards.map(item => ({ ...item, type: 'moodboard' })),
      ...icons.map(item => ({ ...item, type: 'icon' })),
      ...brandKits.map(item => ({ ...item, type: 'brandkit' }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setSavedItems(allItems.slice(0, 6)); // Show latest 6 items
    setStats({
      totalPalettes: palettes.length,
      totalMoodboards: moodboards.length,
      totalIcons: icons.length,
      totalBrandKits: brandKits.length
    });
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'palette': return <PaletteIcon className="w-6 h-6" />;
      case 'moodboard': return <ImageIcon className="w-6 h-6 text-purple-400" />;
      case 'icon': return <LightningIcon className="w-6 h-6" />;
      case 'brandkit': return <BrandKitIcon className="w-6 h-6" />;
      default: return <Palette className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'palette': return 'from-pink-500 to-rose-500';
      case 'moodboard': return 'from-purple-500 to-indigo-500';
      case 'icon': return 'from-orange-500 to-yellow-500';
      case 'brandkit': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const statCards = [
    { 
      title: 'Color Palettes', 
      value: stats.totalPalettes, 
      icon: <PaletteIcon className="w-8 h-8" />,
      gradient: 'from-pink-500 to-rose-500'
    },
    { 
      title: 'Mood Boards', 
      value: stats.totalMoodboards, 
      icon: <ImageIcon className="w-8 h-8 text-purple-400" />,
      gradient: 'from-purple-500 to-indigo-500'
    },
    { 
      title: 'Custom Icons', 
      value: stats.totalIcons, 
      icon: <LightningIcon className="w-8 h-8" />,
      gradient: 'from-orange-500 to-yellow-500'
    },
    { 
      title: 'Brand Kits', 
      value: stats.totalBrandKits, 
      icon: <BrandKitIcon className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Your Creative Dashboard! 🎨
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Track your creative journey and manage all your design assets in one beautiful place
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => toast({
              title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
            })}
          >
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center mb-4 mx-auto`}>
              {stat.icon}
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.title}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Recent Activity
          </h2>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => toast({
              title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
            })}
          >
            View All
          </Button>
        </div>

        {savedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedItems.map((item, index) => (
              <motion.div
                key={`${item.type}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => toast({
                  title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                })}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getTypeColor(item.type)} flex items-center justify-center`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm">
                      {item.name || `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${index + 1}`}
                    </h3>
                    <p className="text-white/60 text-xs">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently created'}
                    </p>
                  </div>
                </div>
                
                {item.type === 'palette' && item.colors && (
                  <div className="flex gap-1">
                    {item.colors.slice(0, 5).map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-6 h-6 rounded-md"
                        style={{ backgroundColor: color.hex || color }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No creations yet!</h3>
            <p className="text-white/70 mb-6">Start creating amazing palettes, mood boards, and more!</p>
            <Button
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              onClick={() => toast({
                title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
              })}
            >
              Get Started
            </Button>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Extract Palette', icon: <PaletteIcon className="w-6 h-6" />, color: 'from-pink-500 to-rose-500' },
            { title: 'Create Mood Board', icon: <ImageIcon className="w-6 h-6 text-purple-400" />, color: 'from-purple-500 to-indigo-500' },
            { title: 'Customize Icon', icon: <LightningIcon className="w-6 h-6" />, color: 'from-orange-500 to-yellow-500' },
            { title: 'Generate Brand Kit', icon: <BrandKitIcon className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' }
          ].map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform cursor-pointer"
              onClick={() => toast({
                title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
              })}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mx-auto mb-3`}>
                {action.icon}
              </div>
              <h3 className="font-semibold text-white text-sm">{action.title}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
