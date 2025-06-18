import React from 'react';
import { Shield, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const PrivacySettings = ({ settings, updateSetting }) => {
  const privacyOptions = [
    { key: 'showActivity', label: 'Show Activity Status', description: 'Let others see when you\'re active' },
    { key: 'allowAnalytics', label: 'Allow Analytics', description: 'Help improve the app with usage data' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Privacy & Security</h3>
          <p className="text-white/70">Manage your privacy settings and data preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Profile Visibility</Label>
          <Select value={settings.profileVisibility} onValueChange={(value) => updateSetting('profileVisibility', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/20">
              <SelectItem value="public" className="text-white hover:bg-white/10">Public</SelectItem>
              <SelectItem value="friends" className="text-white hover:bg-white/10">Friends Only</SelectItem>
              <SelectItem value="private" className="text-white hover:bg-white/10">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {privacyOptions.map((item) => (
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

        <div className="p-4 glass-effect rounded-xl border border-red-500/20">
          <h4 className="font-semibold text-red-400 mb-2">Danger Zone</h4>
          <p className="text-white/70 text-sm mb-4">These actions cannot be undone</p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              onClick={() => toast({
                title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
              })}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;