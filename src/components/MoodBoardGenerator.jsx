import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Save, 
  Search, 
  Grid3X3, 
  Layers,
  Move,
  Pin,
  Trash2,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import MoodBoardControls from './moodboard/MoodBoardControls';
import MoodBoardCanvas from './moodboard/MoodBoardCanvas';

const MoodBoardGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [boardElements, setBoardElements] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedElement, setSelectedElement] = useState(null);
  const [relatedKeywords, setRelatedKeywords] = useState([]);
  const fileInputRef = useRef(null);

  const suggestedKeywords = [
    'minimalist design', 'modern architecture', 'natural textures', 'urban lifestyle',
    'vintage aesthetics', 'luxury branding', 'tech innovation', 'creative workspace',
    'sustainable living', 'artistic expression', 'digital art', 'fashion trends',
    'interior design', 'product photography', 'brand identity', 'color harmony'
  ];

  const generateMoodBoard = useCallback(async () => {
    if (!keywords.trim() && !selectedTemplate) {
      toast({
        title: "Keywords or template required",
        description: "Please enter keywords or select a template to generate your mood board",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation process
    setTimeout(() => {
      const mockElements = [
        {
          id: '1',
          type: 'image',
          content: 'Modern minimalist workspace with clean lines',
          position: { x: 50, y: 50 },
          size: { width: 200, height: 150 },
          isPinned: false,
          zIndex: 1
        },
        {
          id: '2',
          type: 'color',
          content: selectedTemplate?.colors[0] || '#FF6B6B',
          position: { x: 280, y: 80 },
          size: { width: 100, height: 100 },
          isPinned: false,
          zIndex: 1
        },
        {
          id: '3',
          type: 'text',
          content: keywords || selectedTemplate?.name || 'Inspiration',
          position: { x: 400, y: 120 },
          size: { width: 150, height: 50 },
          isPinned: false,
          zIndex: 1
        },
        {
          id: '4',
          type: 'image',
          content: 'Abstract geometric patterns in soft colors',
          position: { x: 100, y: 250 },
          size: { width: 180, height: 120 },
          isPinned: false,
          zIndex: 1
        },
        {
          id: '5',
          type: 'color',
          content: selectedTemplate?.colors[1] || '#4ECDC4',
          position: { x: 320, y: 280 },
          size: { width: 80, height: 80 },
          isPinned: false,
          zIndex: 1
        }
      ];

      setBoardElements(mockElements);
      setIsGenerating(false);

      // Generate related keywords
      const related = [
        'explore similar themes', 'color variations', 'texture alternatives',
        'complementary styles', 'trending aesthetics', 'seasonal inspiration'
      ];
      setRelatedKeywords(related);

      // Save to localStorage
      const savedMoodboards = JSON.parse(localStorage.getItem('savedMoodboards') || '[]');
      const newMoodboard = {
        id: Date.now().toString(),
        name: `${keywords || selectedTemplate?.name} Mood Board`,
        elements: mockElements,
        template: selectedTemplate?.id,
        keywords: keywords,
        createdAt: new Date().toISOString()
      };
      savedMoodboards.unshift(newMoodboard);
      localStorage.setItem('savedMoodboards', JSON.stringify(savedMoodboards.slice(0, 10)));

      toast({
        title: "Mood board generated! 🎨",
        description: "Your creative vision is ready to inspire!"
      });
    }, 3000);
  }, [keywords, selectedTemplate]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newElement = {
            id: Date.now().toString() + index,
            type: 'uploaded-image',
            content: e.target.result,
            position: { x: 100 + index * 20, y: 100 + index * 20 },
            size: { width: 200, height: 150 },
            isPinned: false,
            zIndex: boardElements.length + 1
          };
          setBoardElements(prev => [...prev, newElement]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const saveMoodBoard = () => {
    const savedMoodboards = JSON.parse(localStorage.getItem('savedMoodboards') || '[]');
    const newMoodboard = {
      id: Date.now().toString(),
      name: `${keywords || 'Untitled'} Mood Board`,
      elements: boardElements,
      template: selectedTemplate?.id,
      keywords: keywords,
      createdAt: new Date().toISOString()
    };
    savedMoodboards.unshift(newMoodboard);
    localStorage.setItem('savedMoodboards', JSON.stringify(savedMoodboards.slice(0, 10)));
    
    toast({
      title: "Mood board saved! 💾",
      description: "Your creation has been saved to your dashboard"
    });
  };

  const downloadMoodBoard = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
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
          <Layers className="w-10 h-10" />
          Mood Board Generator 🎨
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Create stunning visual mood boards with drag-and-drop elements, templates, and AI-powered suggestions
        </p>
      </motion.div>

      {/* Controls Panel */}
      <MoodBoardControls
        keywords={keywords}
        setKeywords={setKeywords}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        generateMoodBoard={generateMoodBoard}
        isGenerating={isGenerating}
        handleFileUpload={handleFileUpload}
        fileInputRef={fileInputRef}
        suggestedKeywords={suggestedKeywords}
      />

      {/* Mood Board Canvas */}
      {(boardElements.length > 0 || isGenerating) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Grid3X3 className="w-6 h-6" />
              Your Mood Board
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={saveMoodBoard}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={downloadMoodBoard}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <MoodBoardCanvas
            boardElements={boardElements}
            setBoardElements={setBoardElements}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            draggedElement={draggedElement}
            setDraggedElement={setDraggedElement}
            dragOffset={dragOffset}
            setDragOffset={setDragOffset}
            isGenerating={isGenerating}
          />
        </motion.div>
      )}

      {/* Related Suggestions */}
      {relatedKeywords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Explore More Like This
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedKeywords.map((keyword, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => {
                  setKeywords(keyword);
                  generateMoodBoard();
                }}
                className="bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
              >
                {keyword}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {boardElements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-effect rounded-xl p-4"
        >
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <div className="flex items-center gap-1">
              <Move className="w-4 h-4" />
              <span>Drag to move</span>
            </div>
            <div className="flex items-center gap-1">
              <Pin className="w-4 h-4" />
              <span>Pin to lock</span>
            </div>
            <div className="flex items-center gap-1">
              <Trash2 className="w-4 h-4" />
              <span>Delete element</span>
            </div>
            <div className="flex items-center gap-1">
              <Upload className="w-4 h-4" />
              <span>Upload your own images</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MoodBoardGenerator;