import React from 'react';
import { motion } from 'framer-motion';
import { Pin, PinOff, Trash2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const MoodBoardElement = ({ 
  element, 
  selectedElement, 
  onMouseDown, 
  setBoardElements, 
  setSelectedElement 
}) => {
  const isSelected = selectedElement?.id === element.id;

  const togglePin = (elementId) => {
    setBoardElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, isPinned: !el.isPinned } : el
    ));
    
    toast({
      title: element.isPinned ? "Element unpinned! 📌" : "Element pinned! 🔒",
      description: element.isPinned ? "Element can now be moved" : "Element is now locked in place"
    });
  };

  const deleteElement = (elementId) => {
    setBoardElements(prev => prev.filter(el => el.id !== elementId));
    setSelectedElement(null);
    toast({
      title: "Element removed! 🗑️",
      description: "Element has been deleted from your mood board"
    });
  };

  const renderElementContent = () => {
    switch (element.type) {
      case 'image':
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
            <div className="absolute bottom-2 left-2 right-2 text-xs text-white bg-black/50 rounded p-1">
              {element.content}
            </div>
          </div>
        );
      
      case 'uploaded-image':
        return (
          <img
            src={element.content}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
            draggable={false}
          />
        );
      
      case 'color':
        return (
          <div
            className="w-full h-full rounded-lg shadow-lg"
            style={{ backgroundColor: element.content }}
          />
        );
      
      case 'text':
        return (
          <div className="w-full h-full bg-white/90 rounded-lg flex items-center justify-center p-2 shadow-lg">
            <span className="text-gray-800 font-semibold text-center text-sm">
              {element.content}
            </span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`absolute cursor-move select-none ${
        element.isPinned ? 'cursor-not-allowed' : 'cursor-move'
      } ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: element.zIndex
      }}
      onMouseDown={(e) => onMouseDown(e, element)}
      whileHover={{ scale: element.isPinned ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-full h-full relative group">
        {renderElementContent()}

        {/* Element Controls */}
        <div className="absolute -top-8 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              togglePin(element.id);
            }}
            className="h-6 w-6 p-0 bg-white/90 hover:bg-white text-gray-700"
          >
            {element.isPinned ? <PinOff className="w-3 h-3" /> : <Pin className="w-3 h-3" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              deleteElement(element.id);
            }}
            className="h-6 w-6 p-0 bg-white/90 hover:bg-red-100 text-red-600"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        {/* Pin Indicator */}
        {element.isPinned && (
          <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1">
            <Pin className="w-3 h-3" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MoodBoardElement;