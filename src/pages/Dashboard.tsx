
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { Building2, Clock, FileText, Users, AlertTriangle, CheckCircle2, Layers, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Sample data for charts
const barChartData = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 8 },
  { name: 'Apr', value: 12 },
  { name: 'May', value: 18 },
  { name: 'Jun', value: 24 },
];

const lineChartData = [
  { name: 'Week 1', value: 40 },
  { name: 'Week 2', value: 45 },
  { name: 'Week 3', value: 55 },
  { name: 'Week 4', value: 60 },
  { name: 'Week 5', value: 65 },
  { name: 'Week 6', value: 75 },
  { name: 'Week 7', value: 80 },
];

const pieChartData = [
  { name: 'Completed', value: 60, fill: '#3b82f6' },
  { name: 'In Progress', value: 30, fill: '#f97316' },
  { name: 'Pending', value: 10, fill: '#ef4444' },
];

// Sample project data
const projects = [
  {
    id: 1,
    name: 'Alpine Residence',
    location: 'Boulder, CO',
    progress: 75,
    status: 'In Progress',
    dueDate: '15 Aug 2023',
  },
  {
    id: 2,
    name: 'Skyline Tower',
    location: 'Denver, CO',
    progress: 45,
    status: 'In Progress',
    dueDate: '22 Sep 2023',
  },
  {
    id: 3,
    name: 'Lakefront Villa',
    location: 'Chicago, IL',
    progress: 90,
    status: 'Final Review',
    dueDate: '10 Jul 2023',
  },
  {
    id: 4,
    name: 'Urban Heights',
    location: 'Seattle, WA',
    progress: 25,
    status: 'Early Stage',
    dueDate: '30 Oct 2023',
  },
];

const Dashboard = () => {
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
            <h1 className="text-3xl font-bold mb-2 animate-fade-up">Welcome back, John</h1>
            <p className="text-muted-foreground animate-fade-up animate-delay-100">
              Here's what's happening with your construction projects today.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: 'Active Projects', 
                value: '12', 
                icon: <Building2 className="w-5 h-5" />,
                change: '+2 from last month',
                positive: true,
              },
              { 
                title: 'Total Tasks', 
                value: '148', 
                icon: <Layers className="w-5 h-5" />,
                change: '+24 new tasks',
                positive: true,
              },
              { 
                title: 'Upcoming Deadlines', 
                value: '5', 
                icon: <Clock className="w-5 h-5" />,
                change: '2 due this week',
                positive: false,
              },
              { 
                title: 'Team Members', 
                value: '32', 
                icon: <Users className="w-5 h-5" />,
                change: '+3 new members',
                positive: true,
              },
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="animate-fade-up shadow-sm hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                    <div className="p-2 bg-primary/10 text-primary rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <p className={cn(
                    "text-xs mt-2",
                    stat.positive ? "text-green-600" : "text-amber-600"
                  )}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts and Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Project Progress */}
            <Card className="col-span-1 shadow-sm animate-fade-up">
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Overall completion across all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <PieChart
                    data={pieChartData}
                    index="name"
                    category="value"
                    valueFormatter={(value) => `${value}%`}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Monthly Expenses */}
            <Card className="col-span-1 shadow-sm animate-fade-up animate-delay-100">
              <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>Budget utilization in the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <BarChart
                    data={barChartData}
                    index="name"
                    categories={["value"]}
                    colors={["#3b82f6"]}
                    valueFormatter={(value) => `$${value}k`}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Project Completion Trend */}
            <Card className="col-span-1 shadow-sm animate-fade-up animate-delay-200">
              <CardHeader>
                <CardTitle>Completion Trend</CardTitle>
                <CardDescription>Weekly progress over the last 7 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <LineChart
                    data={lineChartData}
                    index="name"
                    categories={["value"]}
                    colors={["#3b82f6"]}
                    valueFormatter={(value) => `${value}%`}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Projects Table */}
          <Card className="shadow-sm animate-fade-up animate-delay-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Your current construction projects</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.location}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={cn(
                          "text-xs font-medium px-2.5 py-0.5 rounded-full",
                          project.status === 'In Progress' && "bg-blue-100 text-blue-800",
                          project.status === 'Final Review' && "bg-green-100 text-green-800",
                          project.status === 'Early Stage' && "bg-amber-100 text-amber-800",
                        )}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="mb-1.5">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5" />
                    </div>
                    <div className="flex justify-between mt-4">
                      <span className="text-xs text-muted-foreground">Due: {project.dueDate}</span>
                      <Button variant="ghost" size="sm" className="h-6 p-0 text-xs text-primary">
                        <span>Details</span>
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Alerts and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <Card className="shadow-sm animate-fade-up animate-delay-400">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent activities and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
                      title: 'Permit Approved',
                      description: 'Building permit for Alpine Residence has been approved',
                      time: '1 hour ago'
                    },
                    { 
                      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
                      title: 'Inspection Scheduled',
                      description: 'Foundation inspection for Skyline Tower on July 15',
                      time: '3 hours ago'
                    },
                    { 
                      icon: <FileText className="w-4 h-4 text-blue-500" />,
                      title: 'Document Updated',
                      description: 'John Smith uploaded revised blueprints for Urban Heights',
                      time: '5 hours ago'
                    },
                  ].map((notification, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="mt-0.5">
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm animate-fade-up animate-delay-500">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: 'Review contractor proposals',
                      project: 'Skyline Tower',
                      dueDate: 'Tomorrow',
                      priority: 'High'
                    },
                    { 
                      title: 'Approve material selections',
                      project: 'Alpine Residence',
                      dueDate: 'Jul 12, 2023',
                      priority: 'Medium'
                    },
                    { 
                      title: 'Schedule final inspections',
                      project: 'Lakefront Villa',
                      dueDate: 'Jul 18, 2023',
                      priority: 'Low'
                    },
                  ].map((task, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors duration-200">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <p className="text-xs text-muted-foreground">Project: {task.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium">{task.dueDate}</p>
                        <span className={cn(
                          "inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full",
                          task.priority === 'High' && "bg-red-100 text-red-800",
                          task.priority === 'Medium' && "bg-amber-100 text-amber-800",
                          task.priority === 'Low' && "bg-green-100 text-green-800",
                        )}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default Dashboard;
