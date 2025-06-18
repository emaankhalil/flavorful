import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Save, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const ProfileSettings = ({ settings, updateSetting }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile saved! 👤",
        description: "Your profile information has been updated"
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Profile Information</h3>
          <p className="text-white/70">Manage your account details and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-white/80">Display Name</Label>
          <Input
            id="displayName"
            value={settings.displayName}
            onChange={(e) => updateSetting('displayName', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-white/50" />
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => updateSetting('email', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio" className="text-white/80">Bio</Label>
          <Input
            id="bio"
            value={settings.bio}
            onChange={(e) => updateSetting('bio', e.target.value)}
            placeholder="Tell us about yourself..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentPassword" className="text-white/80">Current Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
            <Input
              id="currentPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0 text-white/50 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-white/80">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={saveProfile}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={() => toast({
            title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
          })}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Enable 2FA
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;