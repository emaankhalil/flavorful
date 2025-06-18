
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Save, Palette, Search, Copy, Check, RotateCcw, Zap, Heart, Star, Home, User, Settings, Mail, Phone, Camera, Music, Play, Pause, Pause as Stop, Volume2, Wifi, Battery, Sun, Moon, Cloud, Umbrella } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { LightningIcon } from '@/components/CustomIcons';

const SVGIconCustomizer = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [extractedColors, setExtractedColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIcon, setCopiedIcon] = useState(null);
  const [customizedIcons, setCustomizedIcons] = useState([]);

  // Load extracted colors from localStorage
  useEffect(() => {
    const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
    if (savedPalettes.length > 0) {
      setExtractedColors(savedPalettes[0].colors || []);
    } else {
      // Default colors if no palettes exist
      setExtractedColors([
        { hex: '#FF6B6B', name: 'Coral Red' },
        { hex: '#4ECDC4', name: 'Turquoise' },
        { hex: '#45B7D1', name: 'Sky Blue' },
        { hex: '#96CEB4', name: 'Mint Green' },
        { hex: '#FFEAA7', name: 'Warm Yellow' }
      ]);
    }

    // Load saved customized icons
    const savedIcons = JSON.parse(localStorage.getItem('customizedIcons') || '[]');
    setCustomizedIcons(savedIcons);
  }, []);

  const iconLibrary = [
    { name: 'Lightning', component: Zap, category: 'action' },
    { name: 'Heart', component: Heart, category: 'emotion' },
    { name: 'Star', component: Star, category: 'rating' },
    { name: 'Home', component: Home, category: 'navigation' },
    { name: 'User', component: User, category: 'people' },
    { name: 'Settings', component: Settings, category: 'action' },
    { name: 'Mail', component: Mail, category: 'communication' },
    { name: 'Phone', component: Phone, category: 'communication' },
    { name: 'Camera', component: Camera, category: 'media' },
    { name: 'Music', component: Music, category: 'media' },
    { name: 'Play', component: Play, category: 'media' },
    { name: 'Pause', component: Pause, category: 'media' },
    { name: 'Stop', component: Stop, category: 'media' },
    { name: 'Volume', component: Volume2, category: 'media' },
    { name: 'Wifi', component: Wifi, category: 'connectivity' },
    { name: 'Battery', component: Battery, category: 'device' },
    { name: 'Sun', component: Sun, category: 'weather' },
    { name: 'Moon', component: Moon, category: 'weather' },
    { name: 'Cloud', component: Cloud, category: 'weather' },
    { name: 'Umbrella', component: Umbrella, category: 'weather' }
  ];

  const filteredIcons = iconLibrary.filter(icon =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customizeIcon = (icon) => {
    setSelectedIcon(icon);
  };

  const applyColor = (color) => {
    setSelectedColor(color.hex || color);
  };

  const saveCustomizedIcon = () => {
    if (!selectedIcon) {
      toast({
        title: "No icon selected",
        description: "Please select an icon to customize",
        variant: "destructive"
      });
      return;
    }

    const customizedIcon = {
      id: Date.now().toString(),
      name: `${selectedIcon.name} - ${selectedColor}`,
      icon: selectedIcon.name,
      color: selectedColor,
      createdAt: new Date().toISOString()
    };

    const updatedIcons = [customizedIcon, ...customizedIcons];
    setCustomizedIcons(updatedIcons);
    localStorage.setItem('customizedIcons', JSON.stringify(updatedIcons.slice(0, 20))); // Keep latest 20

    toast({
      title: "Icon customized! 🎨",
      description: "Your custom icon has been saved to your collection"
    });
  };

  const copyIconSVG = (icon, color) => {
    const IconComponent = iconLibrary.find(i => i.name === icon)?.component;
    if (!IconComponent) return;

    // Generate SVG string (simplified for demo)
    const svgString = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="..."/></svg>`;
    
    navigator.clipboard.writeText(svgString);
    setCopiedIcon(icon);
    setTimeout(() => setCopiedIcon(null), 2000);
    
    toast({
      title: "SVG copied! 📋",
      description: "Icon SVG code copied to clipboard"
    });
  };

  const downloadIcon = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const resetCustomization = () => {
    setSelectedIcon(null);
    setSelectedColor('#FF6B6B');
    toast({
      title: "Customization reset! 🔄",
      description: "Ready for a new icon customization"
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <LightningIcon className="w-10 h-10" />
          SVG Icon Customizer ⚡
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Customize icons with your extracted colors and create stunning visual elements
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Icon Library */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Search className="w-6 h-6" />
                Icon Library
              </h2>
              <div className="w-64">
                <Input
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {filteredIcons.map((icon, index) => {
                const IconComponent = icon.component;
                return (
                  <motion.div
                    key={icon.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-effect rounded-xl p-4 cursor-pointer hover:scale-110 transition-transform text-center ${
                      selectedIcon?.name === icon.name ? 'ring-2 ring-white/50' : ''
                    }`}
                    onClick={() => customizeIcon(icon)}
                  >
                    <IconComponent className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-white/70 text-xs">{icon.name}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Customized Icons Collection */}
          {customizedIcons.length > 0 && (
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Save className="w-6 h-6" />
                Your Custom Icons
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {customizedIcons.slice(0, 16).map((customIcon, index) => {
                  const IconComponent = iconLibrary.find(i => i.name === customIcon.icon)?.component;
                  return (
                    <motion.div
                      key={customIcon.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-effect rounded-xl p-4 cursor-pointer hover:scale-110 transition-transform text-center group"
                      onClick={() => copyIconSVG(customIcon.icon, customIcon.color)}
                    >
                      {IconComponent && (
                        <IconComponent 
                          className="w-8 h-8 mx-auto mb-2" 
                          style={{ color: customIcon.color }}
                        />
                      )}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedIcon === customIcon.icon ? (
                          <Check className="w-4 h-4 text-green-400 mx-auto" />
                        ) : (
                          <Copy className="w-4 h-4 text-white/60 mx-auto" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Customization Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Preview */}
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Preview
            </h2>
            
            <div className="bg-white/5 rounded-xl p-8 text-center mb-6">
              {selectedIcon ? (
                <div className="space-y-4">
                  <selectedIcon.component 
                    className="w-16 h-16 mx-auto" 
                    style={{ color: selectedColor }}
                  />
                  <div>
                    <h3 className="text-white font-semibold">{selectedIcon.name}</h3>
                    <p className="text-white/60 text-sm">{selectedColor}</p>
                  </div>
                </div>
              ) : (
                <div className="text-white/40">
                  <LightningIcon className="w-16 h-16 mx-auto mb-4 opacity-40" />
                  <p>Select an icon to customize</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={saveCustomizedIcon}
                disabled={!selectedIcon}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={downloadIcon}
                disabled={!selectedIcon}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                onClick={resetCustomization}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Color Palette */}
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Color Palette</h2>
            
            <div className="space-y-4">
              {extractedColors.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-effect rounded-xl p-3 cursor-pointer transition-all ${
                    selectedColor === (color.hex || color) ? 'ring-2 ring-white/50' : ''
                  }`}
                  onClick={() => applyColor(color)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg shadow-lg"
                      style={{ backgroundColor: color.hex || color }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm">
                        {color.name || 'Custom Color'}
                      </h3>
                      <p className="text-white/70 font-mono text-xs">
                        {color.hex || color}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <label className="text-white/80 text-sm mb-2 block">Custom Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border-2 border-white/20 bg-transparent cursor-pointer"
                />
                <Input
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  placeholder="#FF6B6B"
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SVGIconCustomizer;
