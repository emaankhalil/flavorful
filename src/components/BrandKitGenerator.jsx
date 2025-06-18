import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { RocketIcon } from '@/components/CustomIcons';
import BrandKitForm from '@/components/brandkit/BrandKitForm';
import BrandKitDisplay from '@/components/brandkit/BrandKitDisplay';
import SavedKitsSidebar from '@/components/brandkit/SavedKitsSidebar';

const BrandKitGenerator = () => {
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [generatedKit, setGeneratedKit] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedKits, setSavedKits] = useState([]);
  const [copiedElement, setCopiedElement] = useState(null);

  const industries = [
    { id: 'tech', name: 'Technology', colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'] },
    { id: 'health', name: 'Healthcare', colors: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'] },
    { id: 'finance', name: 'Finance', colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'] },
    { id: 'food', name: 'Food & Beverage', colors: ['#fa709a', '#fee140', '#ff9a9e', '#fecfef'] },
    { id: 'fashion', name: 'Fashion', colors: ['#a8edea', '#fed6e3', '#ffecd2', '#fcb69f'] },
    { id: 'education', name: 'Education', colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'] },
    { id: 'real-estate', name: 'Real Estate', colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'] },
    { id: 'creative', name: 'Creative Agency', colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'] }
  ];

  const fontPairings = [
    { primary: 'Montserrat', secondary: 'Open Sans', style: 'Modern & Clean' },
    { primary: 'Playfair Display', secondary: 'Source Sans Pro', style: 'Elegant & Professional' },
    { primary: 'Roboto', secondary: 'Lato', style: 'Tech & Minimal' },
    { primary: 'Merriweather', secondary: 'PT Sans', style: 'Traditional & Trustworthy' },
    { primary: 'Oswald', secondary: 'Nunito', style: 'Bold & Friendly' }
  ];

  const logoStyles = [
    { type: 'Wordmark', description: 'Text-based logo with custom typography' },
    { type: 'Symbol', description: 'Icon-based logo with abstract or literal symbol' },
    { type: 'Combination', description: 'Text and symbol combined harmoniously' },
    { type: 'Emblem', description: 'Text inside a symbol or badge-like design' }
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedBrandKits') || '[]');
    setSavedKits(saved);
  }, []);

  const generateBrandKit = () => {
    if (!brandName.trim()) {
      toast({
        title: "Brand name required",
        description: "Please enter a brand name to generate your kit",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const selectedIndustryData = industries.find(i => i.id === selectedIndustry) || industries[0];
      const selectedFonts = fontPairings[Math.floor(Math.random() * fontPairings.length)];
      const selectedLogoStyle = logoStyles[Math.floor(Math.random() * logoStyles.length)];

      const kit = {
        id: Date.now().toString(),
        brandName,
        description: brandDescription,
        industry: selectedIndustryData.name,
        colors: {
          primary: selectedIndustryData.colors[0],
          secondary: selectedIndustryData.colors[1],
          accent: selectedIndustryData.colors[2],
          neutral: selectedIndustryData.colors[3]
        },
        typography: selectedFonts,
        logoStyle: selectedLogoStyle,
        createdAt: new Date().toISOString(),
        assets: {
          logo: 'Generated logo concept',
          businessCard: 'Business card design',
          letterhead: 'Letterhead template',
          socialMedia: 'Social media templates'
        }
      };

      setGeneratedKit(kit);
      setIsGenerating(false);

      toast({
        title: "Brand kit generated! 🎨",
        description: "Your complete brand identity is ready!"
      });
    }, 3000);
  };

  const saveBrandKit = () => {
    if (!generatedKit) return;

    const updatedKits = [generatedKit, ...savedKits];
    setSavedKits(updatedKits);
    localStorage.setItem('savedBrandKits', JSON.stringify(updatedKits.slice(0, 10)));

    toast({
      title: "Brand kit saved! 💾",
      description: "Your brand kit has been saved to your collection"
    });
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedElement(type);
    setTimeout(() => setCopiedElement(null), 2000);

    toast({
      title: "Copied! 📋",
      description: `${type} copied to clipboard`
    });
  };

  const downloadKit = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const resetGenerator = () => {
    setBrandName('');
    setBrandDescription('');
    setSelectedIndustry('');
    setGeneratedKit(null);
    toast({
      title: "Generator reset! 🔄",
      description: "Ready to create a new brand kit"
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
          <RocketIcon className="w-10 h-10" />
          Brand Kit Generator 🚀
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Create comprehensive brand identities with colors, typography, logos, and marketing materials
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Generator Controls */}
        <div className="lg:col-span-2 space-y-6">
          <BrandKitForm
            brandName={brandName}
            setBrandName={setBrandName}
            brandDescription={brandDescription}
            setBrandDescription={setBrandDescription}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            isGenerating={isGenerating}
            onGenerate={generateBrandKit}
          />

          <BrandKitDisplay
            generatedKit={generatedKit}
            isGenerating={isGenerating}
            copiedElement={copiedElement}
            onSave={saveBrandKit}
            onDownload={downloadKit}
            onReset={resetGenerator}
            onCopyToClipboard={copyToClipboard}
          />
        </div>

        {/* Saved Kits Sidebar */}
        <SavedKitsSidebar
          savedKits={savedKits}
          onSelectKit={setGeneratedKit}
        />
      </div>
    </div>
  );
};

export default BrandKitGenerator;