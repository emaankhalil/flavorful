import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RocketIcon } from '@/components/CustomIcons';

const BrandKitForm = ({ 
  brandName, 
  setBrandName, 
  brandDescription, 
  setBrandDescription, 
  selectedIndustry, 
  setSelectedIndustry, 
  isGenerating, 
  onGenerate 
}) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-effect rounded-2xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Sparkles className="w-6 h-6" />
        Brand Information
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="brandName" className="text-white/80 mb-2 block">
            Brand Name *
          </Label>
          <Input
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter your brand name..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div>
          <Label htmlFor="brandDescription" className="text-white/80 mb-2 block">
            Brand Description
          </Label>
          <Input
            id="brandDescription"
            value={brandDescription}
            onChange={(e) => setBrandDescription(e.target.value)}
            placeholder="Describe your brand's mission and values..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div>
          <Label className="text-white/80 mb-3 block">Industry</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  selectedIndustry === industry.id
                    ? 'bg-white/20 text-white ring-2 ring-white/50'
                    : 'bg-white/10 text-white/70 hover:bg-white/15'
                }`}
              >
                {industry.name}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Generating Brand Kit...
            </>
          ) : (
            <>
              <RocketIcon className="w-4 h-4 mr-2" />
              Generate Brand Kit
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default BrandKitForm;