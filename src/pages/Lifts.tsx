
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronRight, ArrowUpDown, Zap, ShieldCheck, Clock, Activity, CheckCircle, Layers, Building, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample lift types data
const liftTypes = [
  {
    id: 1,
    title: "Residential Elevators",
    description: "Designed for homes and low-rise buildings",
    icon: <Building className="h-8 w-8 text-primary" />,
    features: [
      "Space-efficient designs",
      "Quiet operation",
      "Customizable finishes",
      "Energy-efficient options"
    ],
    image: "https://images.unsplash.com/photo-1603789045981-a6304d0b9576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Commercial Elevators",
    description: "High-capacity solutions for office buildings",
    icon: <Layers className="h-8 w-8 text-primary" />,
    features: [
      "High-speed operation",
      "Large capacity cabins",
      "Destination dispatch",
      "Advanced safety features"
    ],
    image: "https://images.unsplash.com/photo-1574175679797-9fc9eade1450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Hydraulic Elevators",
    description: "Smooth and reliable vertical transportation",
    icon: <ArrowUpDown className="h-8 w-8 text-primary" />,
    features: [
      "Excellent for low-rise buildings",
      "Cost-effective installation",
      "Smooth ride quality",
      "Low maintenance requirements"
    ],
    image: "https://images.unsplash.com/photo-1568736333610-eae6e0ab9206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Traction Elevators",
    description: "High-speed vertical transportation",
    icon: <Zap className="h-8 w-8 text-primary" />,
    features: [
      "Ideal for high-rise buildings",
      "Energy-efficient operation",
      "Faster speeds",
      "Smaller machine room requirements"
    ],
    image: "https://images.unsplash.com/photo-1664261165448-07fd597075e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

// Sample lift installations
const installations = [
  {
    id: 1,
    project: "Alpine Residence",
    type: "Residential Elevator",
    status: "In Progress",
    progress: 65,
    startDate: "Jun 15, 2023",
    estimatedCompletion: "Jul 30, 2023"
  },
  {
    id: 2,
    project: "Skyline Tower",
    type: "Commercial Traction",
    status: "Scheduled",
    progress: 0,
    startDate: "Aug 10, 2023",
    estimatedCompletion: "Oct 25, 2023"
  },
  {
    id: 3,
    project: "Lakefront Villa",
    type: "Hydraulic Elevator",
    status: "Completed",
    progress: 100,
    startDate: "Mar 05, 2023",
    estimatedCompletion: "May 20, 2023"
  }
];

// Sample compliance standards
const complianceStandards = [
  {
    id: 1,
    name: "ASME A17.1/CSA B44",
    description: "Safety Code for Elevators and Escalators",
    category: "Safety",
    icon: <ShieldCheck className="h-6 w-6 text-green-600" />
  },
  {
    id: 2,
    name: "EN 81-20/50",
    description: "European Standards for Lift Safety",
    category: "Safety",
    icon: <ShieldCheck className="h-6 w-6 text-green-600" />
  },
  {
    id: 3,
    name: "ADA Compliance",
    description: "Americans with Disabilities Act Standards",
    category: "Accessibility",
    icon: <CheckCircle className="h-6 w-6 text-blue-600" />
  },
  {
    id: 4,
    name: "ISO 8100",
    description: "International Standards for Lift Design",
    category: "Design",
    icon: <Activity className="h-6 w-6 text-purple-600" />
  },
  {
    id: 5,
    name: "IBC Chapter 30",
    description: "International Building Code Requirements",
    category: "Building Code",
    icon: <Building className="h-6 w-6 text-amber-600" />
  }
];

const Lifts = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/25">
      <Navbar onAuthClick={openAuthModal} />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 animate-fade-up">Lift Installation</h1>
            <p className="text-muted-foreground max-w-2xl animate-fade-up animate-delay-100">
              Manage and track elevator installations with detailed progress tracking and compliance information.
            </p>
          </div>
          
          <Tabs defaultValue="types" className="animate-fade-up animate-delay-200">
            <TabsList className="mb-8">
              <TabsTrigger value="types">Lift Types</TabsTrigger>
              <TabsTrigger value="installations">Your Installations</TabsTrigger>
              <TabsTrigger value="compliance">Safety & Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="types" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {liftTypes.map((lift, index) => (
                  <Card 
                    key={lift.id} 
                    className="overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${(index % 2) * 100 + 300}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={lift.image} 
                        alt={lift.title} 
                        className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg">
                        {lift.icon}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{lift.title}</h3>
                      <p className="text-muted-foreground mb-4">{lift.description}</p>
                      
                      <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {lift.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter className="px-6 pb-6 pt-0">
                      <Button variant="outline" className="w-full justify-between">
                        <span>Learn More</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="installations" className="m-0">
              <div className="grid gap-6 mb-8">
                {installations.map((installation, index) => {
                  const statusColor = 
                    installation.status === 'In Progress' ? 'bg-blue-500/80' :
                    installation.status === 'Scheduled' ? 'bg-amber-500/80' :
                    'bg-green-500/80';
                  
                  return (
                    <Card 
                      key={installation.id} 
                      className="animate-fade-up hover:shadow-md transition-all"
                      style={{ animationDelay: `${index * 100 + 300}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-semibold">{installation.project}</h3>
                                <p className="text-muted-foreground">{installation.type}</p>
                              </div>
                              <span className={cn(
                                "text-xs font-medium px-2.5 py-1 rounded-full text-white backdrop-blur-sm",
                                statusColor
                              )}>
                                {installation.status}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                                <p className="text-sm font-medium flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  {installation.startDate}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Estimated Completion</p>
                                <p className="text-sm font-medium flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  {installation.estimatedCompletion}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:w-48 flex-shrink-0">
                            <div className="flex flex-col items-center p-4 rounded-lg bg-muted">
                              <div className="flex items-center justify-center mb-2">
                                <svg className="w-16 h-16" viewBox="0 0 100 100">
                                  <circle 
                                    className="text-muted-foreground/20" 
                                    strokeWidth="10" 
                                    stroke="currentColor" 
                                    fill="transparent" 
                                    r="40" 
                                    cx="50" 
                                    cy="50" 
                                  />
                                  <circle 
                                    className="text-primary" 
                                    strokeWidth="10" 
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 * (1 - installation.progress / 100)} 
                                    strokeLinecap="round" 
                                    stroke="currentColor" 
                                    fill="transparent" 
                                    r="40" 
                                    cx="50" 
                                    cy="50" 
                                  />
                                </svg>
                                <span className="absolute text-xl font-bold">{installation.progress}%</span>
                              </div>
                              <p className="text-sm text-center">Installation Progress</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-6">
                          <Button variant="outline" className="flex-1">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Installation Timeline
                          </Button>
                          <Button className="flex-1">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                <Button variant="outline" className="animate-fade-up" style={{ animationDelay: '600ms' }}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Schedule New Installation
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="compliance" className="m-0">
              <Card className="mb-8 animate-fade-up animate-delay-300">
                <CardHeader>
                  <CardTitle>Safety & Compliance Standards</CardTitle>
                  <CardDescription>Essential regulations and standards for elevator installations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {complianceStandards.map((standard, index) => (
                      <div 
                        key={standard.id} 
                        className="flex gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-all"
                      >
                        <div className="flex-shrink-0">
                          {standard.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{standard.name}</h4>
                          <p className="text-sm text-muted-foreground mb-1">{standard.description}</p>
                          <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {standard.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up animate-delay-400">
                <Card>
                  <CardHeader>
                    <CardTitle>Inspection Checklist</CardTitle>
                    <CardDescription>Standard items verified during inspections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Emergency alarm and communication systems",
                        "Door operation and door protection devices",
                        "Suspension and compensation means",
                        "Machine room equipment and safety devices",
                        "Car lighting and ventilation systems"
                      ].map((item, index) => (
                        <li key={index} className="flex gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Requirements</CardTitle>
                    <CardDescription>Recommended maintenance schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Monthly: Visual inspection and testing",
                        "Quarterly: Lubrication and adjustment",
                        "Semi-annual: Electrical and mechanical checks",
                        "Annual: Comprehensive safety testing",
                        "Five-year: Load testing and certification"
                      ].map((item, index) => (
                        <li key={index} className="flex gap-2 text-sm">
                          <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
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

export default Lifts;
