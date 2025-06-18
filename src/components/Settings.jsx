import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import ProfileSettings from '@/components/settings/ProfileSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import WorkspaceSettings from '@/components/settings/WorkspaceSettings';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Profile Settings
    displayName: 'Creative Designer',
    email: 'designer@example.com',
    bio: 'Passionate about creating beautiful designs',
    
    // Theme Settings
    theme: 'dark',
    accentColor: '#FF6B6B',
    fontSize: 'medium',
    language: 'en',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    projectUpdates: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showActivity: true,
    allowAnalytics: true,
    
    // Workspace Settings
    autoSave: true,
    gridSnap: true,
    showTips: true,
    defaultTemplate: 'minimal'
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
    }
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    
    toast({
      title: "Setting updated! ✨",
      description: "Your preferences have been saved"
    });
  };

  const resetSettings = () => {
    const defaultSettings = {
      theme: 'dark',
      accentColor: '#FF6B6B',
      fontSize: 'medium',
      language: 'en',
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: true,
      projectUpdates: true,
      profileVisibility: 'public',
      showActivity: true,
      allowAnalytics: true,
      autoSave: true,
      gridSnap: true,
      showTips: true,
      defaultTemplate: 'minimal'
    };
    
    setSettings(prev => ({ ...prev, ...defaultSettings }));
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
    
    toast({
      title: "Settings reset! 🔄",
      description: "All preferences have been restored to defaults"
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'creative-tools-settings.json';
    link.click();
    
    toast({
      title: "Settings exported! 📁",
      description: "Your settings have been downloaded as a JSON file"
    });
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(prev => ({ ...prev, ...importedSettings }));
          localStorage.setItem('userSettings', JSON.stringify({ ...settings, ...importedSettings }));
          
          toast({
            title: "Settings imported! 📥",
            description: "Your preferences have been successfully imported"
          });
        } catch (error) {
          toast({
            title: "Import failed",
            description: "Invalid settings file format",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
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
          <SettingsIcon className="w-10 h-10" />
          Settings ⚙️
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Customize your creative workspace and manage your preferences
        </p>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-2xl p-8"
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/20 text-white">
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-white/20 text-white">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white/20 text-white">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-white/20 text-white">
              Privacy
            </TabsTrigger>
            <TabsTrigger value="workspace" className="data-[state=active]:bg-white/20 text-white">
              Workspace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileSettings settings={settings} updateSetting={updateSetting} />
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <AppearanceSettings settings={settings} updateSetting={updateSetting} />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings settings={settings} updateSetting={updateSetting} />
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <PrivacySettings settings={settings} updateSetting={updateSetting} />
          </TabsContent>

          <TabsContent value="workspace" className="mt-6">
            <WorkspaceSettings 
              settings={settings} 
              updateSetting={updateSetting}
              exportSettings={exportSettings}
              importSettings={importSettings}
              resetSettings={resetSettings}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;