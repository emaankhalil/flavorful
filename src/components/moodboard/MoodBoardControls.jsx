import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TemplateSelector from './TemplateSelector';

const MoodBoardControls = ({
  keywords,
  setKeywords,
  selectedTemplate,
  setSelectedTemplate,
  generateMoodBoard,
  isGenerating,
  handleFileUpload,
  fileInputRef,
  suggestedKeywords
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-effect rounded-2xl p-6"
    >
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10">
          <TabsTrigger value="generate" className="data-[state=active]:bg-white/20 text-white">
            Generate
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-white/20 text-white">
            Templates
          </TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-white/20 text-white">
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="keywords" className="text-white/80 mb-2 block">
                Describe your vision
              </Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., minimalist workspace, vintage fashion, modern architecture..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.slice(0, 8).map((keyword, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => setKeywords(keyword)}
                  className="bg-white/10 border-white/20 text-white/80 hover:bg-white/20 text-xs"
                >
                  {keyword}
                </Button>
              ))}
            </div>

            <Button
              onClick={generateMoodBoard}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Mood Board
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <div
            className="upload-zone rounded-xl p-8 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Upload Your Images
            </h3>
            <p className="text-white/70">
              Drag and drop multiple images or click to browse
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MoodBoardControls;