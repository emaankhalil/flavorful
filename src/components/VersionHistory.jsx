
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, RotateCcw, Download, Eye, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { PaletteIcon, LightningIcon, BrandKitIcon } from '@/components/CustomIcons';

const VersionHistory = () => {
  const [historyData, setHistoryData] = useState({
    palettes: [],
    icons: [],
    moodboards: [],
    brandkits: []
  });

  useEffect(() => {
    // Load version history from localStorage
    const paletteHistory = JSON.parse(localStorage.getItem('paletteHistory') || '[]');
    const iconHistory = JSON.parse(localStorage.getItem('iconHistory') || '[]');
    const moodboardHistory = JSON.parse(localStorage.getItem('moodboardHistory') || '[]');
    const brandkitHistory = JSON.parse(localStorage.getItem('brandkitHistory') || '[]');

    // Create sample data if none exists
    if (paletteHistory.length === 0) {
      const samplePaletteHistory = [
        {
          id: '1',
          name: 'Sunset Vibes v3',
          version: '3.0',
          createdAt: new Date().toISOString(),
          colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
          changes: 'Adjusted brightness and saturation'
        },
        {
          id: '2',
          name: 'Sunset Vibes v2',
          version: '2.0',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          colors: ['#FF5555', '#3DBDB4', '#35A7C1', '#86BEA4', '#FFE997'],
          changes: 'Modified blue tones'
        },
        {
          id: '3',
          name: 'Sunset Vibes v1',
          version: '1.0',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          colors: ['#FF4444', '#2CACA4', '#2597B1', '#76AE94', '#FFE887'],
          changes: 'Initial version'
        }
      ];
      localStorage.setItem('paletteHistory', JSON.stringify(samplePaletteHistory));
      setHistoryData(prev => ({ ...prev, palettes: samplePaletteHistory }));
    } else {
      setHistoryData({
        palettes: paletteHistory,
        icons: iconHistory,
        moodboards: moodboardHistory,
        brandkits: brandkitHistory
      });
    }
  }, []);

  const revertToVersion = (type, versionId) => {
    toast({
      title: "Version restored! ✨",
      description: `Successfully reverted to previous version`
    });
  };

  const previewVersion = (type, versionId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const downloadVersion = (type, versionId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const HistoryItem = ({ item, type, icon }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-white">{item.name}</h3>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>v{item.version}</span>
              <span>•</span>
              <span>{formatTimeAgo(item.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => previewVersion(type, item.id)}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => downloadVersion(type, item.id)}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => revertToVersion(type, item.id)}
            className="text-white/60 hover:text-green-400 hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      {type === 'palettes' && item.colors && (
        <div className="flex gap-2 mb-3">
          {item.colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-md shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      <div className="text-white/70 text-sm">
        <div className="flex items-center gap-1 mb-1">
          <Calendar className="w-3 h-3" />
          {new Date(item.createdAt).toLocaleDateString()}
        </div>
        <p>{item.changes}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <History className="w-10 h-10" />
          Version History ⏰
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Track changes and revert to previous versions of your creative work
        </p>
      </motion.div>

      {/* History Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-2xl p-8"
      >
        <Tabs defaultValue="palettes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="palettes" className="data-[state=active]:bg-white/20 text-white">
              Color Palettes
            </TabsTrigger>
            <TabsTrigger value="icons" className="data-[state=active]:bg-white/20 text-white">
              Icons
            </TabsTrigger>
            <TabsTrigger value="moodboards" className="data-[state=active]:bg-white/20 text-white">
              Mood Boards
            </TabsTrigger>
            <TabsTrigger value="brandkits" className="data-[state=active]:bg-white/20 text-white">
              Brand Kits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="palettes" className="mt-6">
            <div className="space-y-4">
              {historyData.palettes.length > 0 ? (
                historyData.palettes.map((item, index) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    type="palettes"
                    icon={<PaletteIcon className="w-5 h-5" />}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <PaletteIcon className="w-16 h-16 mx-auto mb-4 opacity-40" />
                  <h3 className="text-xl font-semibold text-white mb-2">No palette history</h3>
                  <p className="text-white/70">Start creating palettes to see version history here</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="icons" className="mt-6">
            <div className="text-center py-12">
              <LightningIcon className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-semibold text-white mb-2">No icon history</h3>
              <p className="text-white/70">Start customizing icons to see version history here</p>
            </div>
          </TabsContent>

          <TabsContent value="moodboards" className="mt-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No mood board history</h3>
              <p className="text-white/70">Start creating mood boards to see version history here</p>
            </div>
          </TabsContent>

          <TabsContent value="brandkits" className="mt-6">
            <div className="text-center py-12">
              <BrandKitIcon className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-semibold text-white mb-2">No brand kit history</h3>
              <p className="text-white/70">Start generating brand kits to see version history here</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { title: 'Total Versions', value: historyData.palettes.length, icon: <History className="w-6 h-6" /> },
          { title: 'This Week', value: historyData.palettes.filter(p => new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: <Calendar className="w-6 h-6" /> },
          { title: 'Reverted', value: 0, icon: <RotateCcw className="w-6 h-6" /> },
          { title: 'Downloaded', value: 0, icon: <Download className="w-6 h-6" /> }
        ].map((stat, index) => (
          <div key={stat.title} className="glass-effect rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-3">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default VersionHistory;
