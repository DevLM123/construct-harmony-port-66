
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search, Plus, ArrowRight, MapPin, Calendar, Clock, Users, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample project data
const projects = [
  {
    id: 1,
    name: 'Alpine Residence',
    description: 'Luxury residential home with modern amenities',
    location: 'Boulder, CO',
    progress: 75,
    status: 'In Progress',
    dueDate: 'Aug 15, 2023',
    team: 8,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Skyline Tower',
    description: 'Mixed-use high-rise with commercial space and apartments',
    location: 'Denver, CO',
    progress: 45,
    status: 'In Progress',
    dueDate: 'Sep 22, 2023',
    team: 15,
    image: 'https://images.unsplash.com/photo-1486744328743-c1a306cf6b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Lakefront Villa',
    description: 'Premium waterfront property with private dock',
    location: 'Chicago, IL',
    progress: 90,
    status: 'Final Review',
    dueDate: 'Jul 10, 2023',
    team: 6,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    name: 'Urban Heights',
    description: 'Modern apartment complex in the heart of the city',
    location: 'Seattle, WA',
    progress: 25,
    status: 'Early Stage',
    dueDate: 'Oct 30, 2023',
    team: 10,
    image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 5,
    name: 'Harbor Point',
    description: 'Coastal condominium development with ocean views',
    location: 'San Diego, CA',
    progress: 60,
    status: 'In Progress',
    dueDate: 'Nov 15, 2023',
    team: 12,
    image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 6,
    name: 'Parkview Terrace',
    description: 'Residential development adjacent to central park',
    location: 'Austin, TX',
    progress: 15,
    status: 'Planning',
    dueDate: 'Dec 05, 2023',
    team: 9,
    image: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
];

const Projects = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-muted/25">
      <Navbar onAuthClick={openAuthModal} />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 animate-fade-up">Projects</h1>
              <p className="text-muted-foreground animate-fade-up animate-delay-100">
                Manage and track all your construction projects in one place
              </p>
            </div>
            
            <div className="flex gap-3 animate-fade-up animate-delay-200">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="animate-fade-up animate-delay-300">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <Card 
                    key={project.id} 
                    className="overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${(index % 3) * 100 + 400}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className={cn(
                          "text-xs font-medium px-2.5 py-1 rounded-full text-white",
                          project.status === 'In Progress' && "bg-blue-500/80 backdrop-blur-sm",
                          project.status === 'Final Review' && "bg-green-500/80 backdrop-blur-sm",
                          project.status === 'Early Stage' && "bg-amber-500/80 backdrop-blur-sm",
                          project.status === 'Planning' && "bg-purple-500/80 backdrop-blur-sm",
                        )}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                      
                      <div className="flex items-center text-muted-foreground text-sm mb-3">
                        <MapPin className="h-3 w-3 mr-1" /> 
                        <span>{project.location}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/50">
                          <Calendar className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="text-xs text-center line-clamp-1">
                            {project.dueDate.split(' ')[0]}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/50">
                          <Users className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="text-xs text-center">{project.team}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/50">
                          <Building2 className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="text-xs text-center">Details</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full justify-between">
                        <span>View Project</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredProjects.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-lg font-medium mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                  <Button>Create New Project</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="active" className="m-0">
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">Active Projects</h3>
                <p className="text-muted-foreground">This tab would show only active projects</p>
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="m-0">
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">Completed Projects</h3>
                <p className="text-muted-foreground">This tab would show only completed projects</p>
              </div>
            </TabsContent>
            
            <TabsContent value="planning" className="m-0">
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">Planning Projects</h3>
                <p className="text-muted-foreground">This tab would show only projects in planning phase</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default Projects;
