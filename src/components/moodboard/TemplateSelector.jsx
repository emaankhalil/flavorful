import React from 'react';
import { motion } from 'framer-motion';

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    {
      id: 'minimal',
      name: 'Minimal & Clean',
      category: 'Design',
      preview: 'from-gray-100 to-white',
      description: 'Perfect for modern, clean aesthetics',
      layout: 'grid',
      colors: ['#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA']
    },
    {
      id: 'vibrant',
      name: 'Vibrant & Bold',
      category: 'Creative',
      preview: 'from-pink-500 to-orange-500',
      description: 'Eye-catching colors for creative projects',
      layout: 'masonry',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
    },
    {
      id: 'nature',
      name: 'Nature Inspired',
      category: 'Lifestyle',
      preview: 'from-green-400 to-blue-500',
      description: 'Organic, earth-toned mood boards',
      layout: 'organic',
      colors: ['#52C41A', '#73D13D', '#95DE64', '#B7EB8F', '#D9F7BE']
    },
    {
      id: 'luxury',
      name: 'Luxury & Elegant',
      category: 'Fashion',
      preview: 'from-purple-900 to-indigo-900',
      description: 'Sophisticated and premium feel',
      layout: 'asymmetric',
      colors: ['#722ED1', '#9254DE', '#B37FEB', '#D3ADF7', '#EFDBFF']
    },
    {
      id: 'tech',
      name: 'Tech & Modern',
      category: 'Technology',
      preview: 'from-blue-600 to-cyan-600',
      description: 'Futuristic and digital aesthetics',
      layout: 'grid',
      colors: ['#1890FF', '#40A9FF', '#69C0FF', '#91D5FF', '#BAE7FF']
    },
    {
      id: 'vintage',
      name: 'Vintage & Retro',
      category: 'Retro',
      preview: 'from-yellow-600 to-red-600',
      description: 'Nostalgic and classic vibes',
      layout: 'collage',
      colors: ['#FA8C16', '#FFA940', '#FFC069', '#FFD591', '#FFE7BA']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`glass-effect rounded-xl p-4 cursor-pointer transition-all ${
            selectedTemplate?.id === template.id ? 'ring-2 ring-blue-400' : ''
          }`}
          onClick={() => setSelectedTemplate(template)}
          whileHover={{ scale: 1.02 }}
        >
          <div className={`w-full h-20 rounded-lg bg-gradient-to-r ${template.preview} mb-3`} />
          <h3 className="font-semibold text-white text-sm mb-1">{template.name}</h3>
          <p className="text-white/60 text-xs mb-2">{template.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">{template.category}</span>
            <div className="flex gap-1">
              {template.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TemplateSelector;