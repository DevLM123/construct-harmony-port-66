
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, ArrowRight, MapPin, FlipHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample before and after projects data
const projects = [
  {
    id: 1,
    name: 'Bayshore Residence',
    description: 'Complete home elevation to protect against flooding',
    location: 'Tampa, FL',
    completionDate: 'March 2023',
    elevationHeight: '12 feet',
    beforeImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
    afterImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811'
  },
  {
    id: 2,
    name: 'Coastal Heights',
    description: 'Waterfront property elevation with structural reinforcement',
    location: 'Miami Beach, FL',
    completionDate: 'June 2023',
    elevationHeight: '15 feet',
    beforeImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    afterImage: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff'
  },
  {
    id: 3,
    name: 'Palm Harbor Estate',
    description: 'Historic home elevation with foundation strengthening',
    location: 'Naples, FL',
    completionDate: 'September 2023',
    elevationHeight: '10 feet',
    beforeImage: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a',
    afterImage: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231'
  },
  {
    id: 4,
    name: 'Oceanview Bungalow',
    description: 'Beachfront bungalow elevated to maximize ocean views',
    location: 'Key West, FL',
    completionDate: 'December 2023',
    elevationHeight: '14 feet',
    beforeImage: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145',
    afterImage: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04'
  },
  {
    id: 5,
    name: 'Riverfront Cottage',
    description: 'Riverside property elevated to prevent seasonal flooding',
    location: 'Jacksonville, FL',
    completionDate: 'February 2024',
    elevationHeight: '11 feet',
    beforeImage: 'https://images.unsplash.com/photo-1486744328743-c1a306cf6b4e',
    afterImage: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145'
  },
  {
    id: 6,
    name: 'Gulf Breeze Villa',
    description: 'Luxury villa with complete elevation and structural updates',
    location: 'Pensacola, FL',
    completionDate: 'April 2024',
    elevationHeight: '16 feet',
    beforeImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
    afterImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811'
  },
];

const Projects = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBefore, setShowBefore] = useState({});

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const toggleBeforeAfter = (id) => {
    setShowBefore(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
              <h1 className="text-3xl font-bold mb-2 animate-fade-up">Before & After Projects</h1>
              <p className="text-muted-foreground animate-fade-up animate-delay-100">
                Explore our completed home elevation projects across Florida
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
              <Button onClick={openAuthModal}>
                Request Consultation
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="animate-fade-up animate-delay-300">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="tampa">Tampa</TabsTrigger>
              <TabsTrigger value="miami">Miami</TabsTrigger>
              <TabsTrigger value="other">Other Regions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <Card 
                    key={project.id} 
                    className="overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${(index % 3) * 100 + 400}ms` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={showBefore[project.id] ? project.beforeImage : project.afterImage} 
                        alt={showBefore[project.id] ? `${project.name} before` : `${project.name} after`} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <span className={cn(
                          "text-xs font-medium px-2.5 py-1 rounded-full text-white",
                          showBefore[project.id] ? "bg-amber-500/80 backdrop-blur-sm" : "bg-green-500/80 backdrop-blur-sm",
                        )}>
                          {showBefore[project.id] ? "Before" : "After"}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white"
                          onClick={() => toggleBeforeAfter(project.id)}
                        >
                          <FlipHorizontal className="h-4 w-4 mr-1" />
                          Flip
                        </Button>
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
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex flex-col p-2 rounded-lg bg-muted/50">
                          <span className="text-xs text-muted-foreground">Completion</span>
                          <span className="text-sm font-medium">{project.completionDate}</span>
                        </div>
                        <div className="flex flex-col p-2 rounded-lg bg-muted/50">
                          <span className="text-xs text-muted-foreground">Elevation</span>
                          <span className="text-sm font-medium">{project.elevationHeight}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full justify-between" onClick={openAuthModal}>
                        <span>Request Similar Project</span>
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
                  <Button onClick={openAuthModal}>Request Consultation</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="tampa" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.filter(p => p.location.includes('Tampa')).map((project, index) => (
                  // Same card structure as above
                  <Card key={project.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    {/* ... Card content structure same as above */}
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="miami" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.filter(p => p.location.includes('Miami')).map((project, index) => (
                  // Same card structure as above
                  <Card key={project.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    {/* ... Card content structure same as above */}
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="other" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.filter(p => !p.location.includes('Tampa') && !p.location.includes('Miami')).map((project, index) => (
                  // Same card structure as above
                  <Card key={project.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    {/* ... Card content structure same as above */}
                  </Card>
                ))}
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
