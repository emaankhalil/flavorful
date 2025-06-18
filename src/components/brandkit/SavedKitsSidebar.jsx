import React from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { RocketIcon } from '@/components/CustomIcons';

const SavedKitsSidebar = ({ savedKits, onSelectKit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <div className="glass-effect rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Save className="w-5 h-5" />
          Saved Brand Kits
        </h2>

        {savedKits.length > 0 ? (
          <div className="space-y-4">
            {savedKits.slice(0, 5).map((kit, index) => (
              <motion.div
                key={kit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onSelectKit(kit)}
              >
                <h3 className="font-semibold text-white text-sm mb-2">
                  {kit.brandName}
                </h3>
                <div className="flex gap-1 mb-2">
                  {Object.values(kit.colors).slice(0, 4).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-white/60 text-xs">
                  {new Date(kit.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <RocketIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-white/60 text-sm">No saved brand kits yet</p>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="glass-effect rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Pro Tips</h2>
        <div className="space-y-3 text-sm text-white/70">
          <p>• Choose an industry that matches your brand's core values</p>
          <p>• Keep your brand name short and memorable</p>
          <p>• Consider your target audience when reviewing colors</p>
          <p>• Test your brand kit across different mediums</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SavedKitsSidebar;