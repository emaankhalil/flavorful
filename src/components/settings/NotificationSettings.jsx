import React from 'react';
import { Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const NotificationSettings = ({ settings, updateSetting }) => {
  const notificationOptions = [
    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
    { key: 'pushNotifications', label: 'Push Notifications', description: 'Get browser notifications' },
    { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of your weekly activity' },
    { key: 'projectUpdates', label: 'Project Updates', description: 'Notifications about project changes' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
          <Bell className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
          <p className="text-white/70">Control how and when you receive notifications</p>
        </div>
      </div>

      <div className="space-y-4">
        {notificationOptions.map((item) => (
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
    </div>
  );
};

export default NotificationSettings;