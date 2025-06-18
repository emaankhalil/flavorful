import React from 'react';
import { Settings as SettingsIcon, Download, Upload, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

const WorkspaceSettings = ({ settings, updateSetting, exportSettings, importSettings, resetSettings }) => {
  const workspaceOptions = [
    { key: 'autoSave', label: 'Auto Save', description: 'Automatically save your work every few minutes' },
    { key: 'gridSnap', label: 'Grid Snap', description: 'Snap elements to grid when moving' },
    { key: 'showTips', label: 'Show Tips', description: 'Display helpful tips and tutorials' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
          <SettingsIcon className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Workspace Preferences</h3>
          <p className="text-white/70">Customize your creative workspace behavior</p>
        </div>
      </div>

      <div className="space-y-4">
        {workspaceOptions.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 glass-effect rounded-xl">
            <div>
              <h4 className="font-semibold text-white">{item.label}</h4>
              <p className="text-white/70 text-sm">{item.description}</p>
            </div>
            <Switch
              checked={settings[item.key]}
              onCheckedChange={(checked) => updateSetting(item.key, checked)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
        <Button
          onClick={exportSettings}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Settings
        </Button>
        <Button
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={() => document.getElementById('import-settings').click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Import Settings
        </Button>
        <input
          id="import-settings"
          type="file"
          accept=".json"
          onChange={importSettings}
          className="hidden"
        />
        <Button
          onClick={resetSettings}
          variant="outline"
          className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceSettings;