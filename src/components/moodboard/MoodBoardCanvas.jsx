import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import MoodBoardElement from './MoodBoardElement';

const MoodBoardCanvas = ({ 
  boardElements, 
  setBoardElements, 
  selectedElement, 
  setSelectedElement,
  draggedElement,
  setDraggedElement,
  dragOffset,
  setDragOffset,
  isGenerating 
}) => {
  const boardRef = useRef(null);

  const handleMouseDown = (e, element) => {
    if (element.isPinned) return;
    
    const rect = boardRef.current.getBoundingClientRect();
    setDraggedElement(element);
    setDragOffset({
      x: e.clientX - rect.left - element.position.x,
      y: e.clientY - rect.top - element.position.y
    });
    setSelectedElement(element);
  };

  const handleMouseMove = useCallback((e) => {
    if (!draggedElement || draggedElement.isPinned) return;

    const rect = boardRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setBoardElements(prev => prev.map(el => 
      el.id === draggedElement.id 
        ? { ...el, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
        : el
    ));
  }, [draggedElement, dragOffset, setBoardElements]);

  const handleMouseUp = useCallback(() => {
    setDraggedElement(null);
    setDragOffset({ x: 0, y: 0 });
  }, [setDraggedElement, setDragOffset]);

  React.useEffect(() => {
    if (draggedElement) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedElement, handleMouseMove, handleMouseUp]);

  if (isGenerating) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="pulse-glow rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Creating Your Mood Board...
          </h3>
          <p className="text-white/70">
            Analyzing your vision and curating the perfect elements
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={boardRef}
      className="relative w-full h-96 bg-white/5 rounded-xl border-2 border-dashed border-white/20 overflow-hidden"
      style={{ minHeight: '400px' }}
    >
      {boardElements.map(element => (
        <MoodBoardElement
          key={element.id}
          element={element}
          selectedElement={selectedElement}
          onMouseDown={handleMouseDown}
          setBoardElements={setBoardElements}
          setSelectedElement={setSelectedElement}
        />
      ))}
      
      {boardElements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/50">
            <Layers className="w-12 h-12 mx-auto mb-2" />
            <p>Your mood board elements will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodBoardCanvas;