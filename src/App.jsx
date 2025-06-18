
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Palette, Download, Copy, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import ProjectManager from '@/components/ProjectManager';
import VersionHistory from '@/components/VersionHistory';
import MoodBoardGenerator from '@/components/MoodBoardGenerator';
import SVGIconCustomizer from '@/components/SVGIconCustomizer';
import BrandKitGenerator from '@/components/BrandKitGenerator';
import Settings from '@/components/Settings';
import { PaletteIcon, LightningIcon, RocketIcon } from '@/components/CustomIcons';

function App() {
  const [currentView, setCurrentView] = useState('tools');
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedColors, setExtractedColors] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedColor, setCopiedColor] = useState(null);
  const fileInputRef = useRef(null);

  const fontSuggestions = [
    { name: 'Montserrat', category: 'Sans-serif', style: 'font-sans font-bold' },
    { name: 'Playfair Display', category: 'Serif', style: 'font-serif font-bold' },
    { name: 'Inter', category: 'Sans-serif', style: 'font-sans font-medium' },
    { name: 'Crimson Text', category: 'Serif', style: 'font-serif font-semibold' },
    { name: 'Poppins', category: 'Sans-serif', style: 'font-sans font-semibold' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        extractColors(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image file (JPG, PNG, WebP)",
        variant: "destructive"
      });
    }
  };

  const extractColors = (imageSrc) => {
    setIsProcessing(true);
    
    // Simulate color extraction process
    setTimeout(() => {
      const mockColors = [
        { hex: '#FF6B6B', rgb: 'rgb(255, 107, 107)', name: 'Coral Red' },
        { hex: '#4ECDC4', rgb: 'rgb(78, 205, 196)', name: 'Turquoise' },
        { hex: '#45B7D1', rgb: 'rgb(69, 183, 209)', name: 'Sky Blue' },
        { hex: '#96CEB4', rgb: 'rgb(150, 206, 180)', name: 'Mint Green' },
        { hex: '#FFEAA7', rgb: 'rgb(255, 234, 167)', name: 'Warm Yellow' }
      ];
      
      setExtractedColors(mockColors);
      setIsProcessing(false);
      
      // Save to localStorage for dashboard
      const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
      const newPalette = {
        id: Date.now().toString(),
        name: 'Extracted Palette',
        colors: mockColors,
        createdAt: new Date().toISOString()
      };
      savedPalettes.unshift(newPalette);
      localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes.slice(0, 10))); // Keep only latest 10
      
      toast({
        title: "Colors extracted successfully! 🎨",
        description: "Your color palette is ready to use!"
      });
    }, 2000);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color.hex);
    setCopiedColor(color.hex);
    setTimeout(() => setCopiedColor(null), 2000);
    
    toast({
      title: "Color copied! 📋",
      description: `${color.hex} copied to clipboard`
    });
  };

  const downloadPalette = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;
      case 'projects':
        return <ProjectManager />;
      case 'history':
        return <VersionHistory />;
      case 'moodboard':
        return <MoodBoardGenerator />;
      case 'iconCustomizer':
        return <SVGIconCustomizer />;
      case 'brandKit':
        return <BrandKitGenerator />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <>
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
                <div className="p-2 md:p-3 rounded-full glass-effect floating">
                  <Palette className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white">Creative Tools Suite</h1>
              </div>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
                Extract stunning color palettes from images and discover perfect font pairings for your creative projects
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
              {/* Upload Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="glass-effect rounded-2xl p-4 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 md:w-6 md:h-6" />
                    Upload Your Image
                  </h2>
                  
                  <div
                    className="upload-zone rounded-xl p-6 md:p-12 text-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {selectedImage ? (
                      <div className="space-y-4">
                        <img
                          src={selectedImage}
                          alt="Uploaded"
                          className="max-w-full max-h-48 md:max-h-64 mx-auto rounded-lg shadow-lg"
                        />
                        <p className="text-white/80 text-sm md:text-base">Click to upload a different image</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 md:w-16 md:h-16 text-white/60 mx-auto" />
                        <div>
                          <p className="text-lg md:text-xl font-semibold text-white mb-2">
                            Drop your image here or click to browse
                          </p>
                          <p className="text-white/60 text-sm md:text-base">
                            Supports JPG, PNG, and WebP formats
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Processing Animation */}
                <AnimatePresence>
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass-effect rounded-2xl p-6 md:p-8 text-center"
                    >
                      <div className="pulse-glow rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white animate-spin" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                        Extracting Colors...
                      </h3>
                      <p className="text-white/70 text-sm md:text-base">
                        Analyzing your image to find the perfect color palette
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 md:space-y-6"
              >
                {/* Color Palette */}
                {extractedColors.length > 0 && (
                  <div className="glass-effect rounded-2xl p-4 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
                      <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                        <Palette className="w-5 h-5 md:w-6 md:h-6" />
                        Extracted Palette
                      </h2>
                      <Button
                        onClick={downloadPalette}
                        variant="outline"
                        size="sm"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                      {extractedColors.map((color, index) => (
                        <motion.div
                          key={color.hex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="color-card glass-effect rounded-xl p-3 md:p-4 cursor-pointer"
                          onClick={() => copyToClipboard(color)}
                        >
                          <div className="flex items-center gap-3 md:gap-4">
                            <div
                              className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg flex-shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white text-base md:text-lg truncate">
                                {color.name}
                              </h3>
                              <p className="text-white/70 font-mono text-sm">
                                {color.hex}
                              </p>
                              <p className="text-white/50 text-xs">
                                {color.rgb}
                              </p>
                            </div>
                            <div className="text-white/60 flex-shrink-0">
                              {copiedColor === color.hex ? (
                                <Check className="w-5 h-5 text-green-400" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Font Suggestions */}
                {extractedColors.length > 0 && (
                  <div className="glass-effect rounded-2xl p-4 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                      Recommended Fonts
                    </h2>
                    
                    <div className="space-y-3 md:space-y-4">
                      {fontSuggestions.map((font, index) => (
                        <motion.div
                          key={font.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="font-preview glass-effect rounded-xl p-3 md:p-4 cursor-pointer"
                          onClick={() => toast({
                            title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                          })}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="min-w-0 flex-1">
                              <h3 className={`text-lg md:text-xl text-white ${font.style} truncate`}>
                                {font.name}
                              </h3>
                              <p className="text-white/60 text-sm">
                                {font.category}
                              </p>
                            </div>
                            <div className="text-white/40 flex-shrink-0 ml-2">
                              <Copy className="w-4 h-4" />
                            </div>
                          </div>
                          <p className={`text-white/80 text-sm md:text-base ${font.style}`}>
                            The quick brown fox jumps over the lazy dog
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  title: "Mood Board Generator",
                  description: "Create stunning mood boards from your color palettes",
                  icon: <PaletteIcon className="w-6 h-6 md:w-8 md:h-8" />,
                  action: () => setCurrentView('moodboard')
                },
                {
                  title: "SVG Icon Customizer",
                  description: "Customize icons with your extracted colors",
                  icon: <LightningIcon className="w-6 h-6 md:w-8 md:h-8" />,
                  action: () => setCurrentView('iconCustomizer')
                },
                {
                  title: "Brand Kit Generator",
                  description: "Generate complete brand kits with colors and fonts",
                  icon: <RocketIcon className="w-6 h-6 md:w-8 md:h-8" />,
                  action: () => setCurrentView('brandKit')
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass-effect rounded-2xl p-4 md:p-6 text-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={feature.action}
                >
                  <div className="mb-3 md:mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        {renderCurrentView()}
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
