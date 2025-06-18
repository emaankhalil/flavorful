import React from 'react';
import { motion } from 'framer-motion';
import { Download, Save, RotateCcw, Eye, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { RocketIcon } from '@/components/CustomIcons';

const BrandKitDisplay = ({ 
  generatedKit, 
  isGenerating, 
  copiedElement, 
  onSave, 
  onDownload, 
  onReset, 
  onCopyToClipboard 
}) => {
  if (!generatedKit && !isGenerating) return null;

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Eye className="w-6 h-6" />
          {isGenerating ? 'Generating...' : 'Your Brand Kit'}
        </h2>
        {generatedKit && (
          <div className="flex gap-2">
            <Button
              onClick={onSave}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={onDownload}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {isGenerating ? (
        <div className="text-center py-12">
          <div className="pulse-glow rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <RocketIcon className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Creating Your Brand Identity...
          </h3>
          <p className="text-white/70">
            Analyzing your brand and generating the perfect visual identity
          </p>
        </div>
      ) : (
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="colors" className="data-[state=active]:bg-white/20 text-white">
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="data-[state=active]:bg-white/20 text-white">
              Typography
            </TabsTrigger>
            <TabsTrigger value="logo" className="data-[state=active]:bg-white/20 text-white">
              Logo
            </TabsTrigger>
            <TabsTrigger value="assets" className="data-[state=active]:bg-white/20 text-white">
              Assets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(generatedKit.colors).map(([name, color]) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-effect rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onCopyToClipboard(color, `${name} color`)}
                >
                  <div
                    className="w-full h-20 rounded-lg mb-3"
                    style={{ backgroundColor: color }}
                  />
                  <h3 className="font-semibold text-white capitalize">{name}</h3>
                  <p className="text-white/70 font-mono text-sm">{color}</p>
                  <div className="mt-2">
                    {copiedElement === `${name} color` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/60" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="typography" className="mt-6">
            <div className="space-y-6">
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Font Pairing</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white/80 mb-2">Primary Font</h4>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {generatedKit.typography.primary}
                      </h2>
                      <p className="text-white/70">For headings and brand name</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white/80 mb-2">Secondary Font</h4>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-lg text-white mb-2">
                        {generatedKit.typography.secondary}
                      </p>
                      <p className="text-white/70">For body text and descriptions</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-white/60 text-sm">
                    Style: {generatedKit.typography.style}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logo" className="mt-6">
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Logo Concept</h3>
              <div className="bg-white/5 rounded-lg p-8 text-center mb-4">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {generatedKit.brandName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{generatedKit.brandName}</h2>
                <p className="text-white/70">{generatedKit.description}</p>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">
                  {generatedKit.logoStyle.type} Logo
                </h4>
                <p className="text-white/70 text-sm">
                  {generatedKit.logoStyle.description}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(generatedKit.assets).map(([name, description]) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-effect rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toast({
                    title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                  })}
                >
                  <h3 className="font-semibold text-white capitalize mb-2">
                    {name.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-white/70 text-sm">{description}</p>
                  <div className="mt-3 text-white/40">
                    <Download className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default BrandKitDisplay;