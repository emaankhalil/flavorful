import React from 'react';
import { Palette, Sun, Moon, Monitor, Globe } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AppearanceSettings = ({ settings, updateSetting }) => {
  const accentColors = [
    { name: 'Coral', value: '#FF6B6B' },
    { name: 'Turquoise', value: '#4ECDC4' },
    { name: 'Sky Blue', value: '#45B7D1' },
    { name: 'Mint', value: '#96CEB4' },
    { name: 'Sunshine', value: '#FFEAA7' },
    { name: 'Purple', value: '#A29BFE' },
    { name: 'Pink', value: '#FD79A8' },
    { name: 'Orange', value: '#FDCB6E' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
          <Palette className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Appearance & Theme</h3>
          <p className="text-white/70">Customize the look and feel of your workspace</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-white/80">Theme</Label>
          <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/20">
              <SelectItem value="light" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Light
                </div>
              </SelectItem>
              <SelectItem value="dark" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Dark
                </div>
              </SelectItem>
              <SelectItem value="system" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  System
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Language</Label>
          <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/20">
              <SelectItem value="en" className="text-white hover:bg-white/10">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  English
                </div>
              </SelectItem>
              <SelectItem value="es" className="text-white hover:bg-white/10">Español</SelectItem>
              <SelectItem value="fr" className="text-white hover:bg-white/10">Français</SelectItem>
              <SelectItem value="de" className="text-white hover:bg-white/10">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Font Size</Label>
          <Select value={settings.fontSize} onValueChange={(value) => updateSetting('fontSize', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/20">
              <SelectItem value="small" className="text-white hover:bg-white/10">Small</SelectItem>
              <SelectItem value="medium" className="text-white hover:bg-white/10">Medium</SelectItem>
              <SelectItem value="large" className="text-white hover:bg-white/10">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Default Template</Label>
          <Select value={settings.defaultTemplate} onValueChange={(value) => updateSetting('defaultTemplate', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/20">
              <SelectItem value="minimal" className="text-white hover:bg-white/10">Minimal</SelectItem>
              <SelectItem value="vibrant" className="text-white hover:bg-white/10">Vibrant</SelectItem>
              <SelectItem value="nature" className="text-white hover:bg-white/10">Nature</SelectItem>
              <SelectItem value="luxury" className="text-white hover:bg-white/10">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-white/80">Accent Color</Label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {accentColors.map((color) => (
            <button
              key={color.value}
              onClick={() => updateSetting('accentColor', color.value)}
              className={`w-12 h-12 rounded-lg transition-all hover:scale-110 ${
                settings.accentColor === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;