
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, Folder, MoreVertical, Edit, Trash2, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { PaletteIcon, LightningIcon, RocketIcon, BrandKitIcon } from '@/components/CustomIcons';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    if (savedProjects.length === 0) {
      // Create default projects with sample data
      const defaultProjects = [
        {
          id: '1',
          name: 'Brand Redesign 2024',
          description: 'Complete brand identity overhaul',
          createdAt: new Date().toISOString(),
          itemCount: 12,
          starred: true,
          color: 'from-pink-500 to-rose-500'
        },
        {
          id: '2',
          name: 'Website Color Schemes',
          description: 'Color palettes for web projects',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          itemCount: 8,
          starred: false,
          color: 'from-blue-500 to-cyan-500'
        },
        {
          id: '3',
          name: 'Mobile App Icons',
          description: 'Custom icon set for mobile application',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          itemCount: 24,
          starred: true,
          color: 'from-orange-500 to-yellow-500'
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('projects', JSON.stringify(defaultProjects));
    } else {
      setProjects(savedProjects);
    }
  }, []);

  const createProject = () => {
    if (!newProjectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project",
        variant: "destructive"
      });
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      name: newProjectName,
      description: '',
      createdAt: new Date().toISOString(),
      itemCount: 0,
      starred: false,
      color: 'from-purple-500 to-indigo-500'
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    setNewProjectName('');
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Project created! 🎉",
      description: `"${newProjectName}" is ready for your creative work!`
    });
  };

  const toggleStar = (projectId) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId ? { ...project, starred: !project.starred } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Project deleted",
      description: "Project has been removed from your workspace"
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Project Manager 📁</h1>
          <p className="text-xl text-white/80">
            Organize your creative work into focused project spaces
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
              <FolderPlus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName" className="text-white/80">Project Name</Label>
                <Input
                  id="projectName"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  onKeyPress={(e) => e.key === 'Enter' && createProject()}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={createProject}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(project.id);
                    }}
                    className="text-white/60 hover:text-yellow-400 hover:bg-white/10"
                  >
                    <Star className={`w-4 h-4 ${project.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({
                        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                      });
                    }}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                  <p className="text-white/70 text-sm">{project.description || 'No description'}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{project.itemCount} items</span>
                  </div>
                </div>

                {/* Sample Items Preview */}
                <div className="flex items-center gap-2 pt-2">
                  <PaletteIcon className="w-5 h-5" />
                  <LightningIcon className="w-5 h-5" />
                  <BrandKitIcon className="w-5 h-5" />
                  <div className="text-white/40 text-xs">+{Math.max(0, project.itemCount - 3)} more</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <FolderPlus className="w-12 h-12 text-white/40" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No projects yet!</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Create your first project to start organizing your creative work
          </p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            Create Your First Project
          </Button>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-effect border-white/20 text-white max-w-4xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white text-2xl flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${selectedProject.color} flex items-center justify-center`}>
                    <Folder className="w-5 h-5 text-white" />
                  </div>
                  {selectedProject.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedProject.itemCount}</div>
                    <div className="text-white/60 text-sm">Total Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {new Date(selectedProject.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-white/60 text-sm">Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {selectedProject.starred ? '⭐' : '📁'}
                    </div>
                    <div className="text-white/60 text-sm">Status</div>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Project Contents</h3>
                  <p className="text-white/70 mb-4">This project is ready for your creative assets!</p>
                  <Button
                    onClick={() => toast({
                      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    Add Items to Project
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManager;
