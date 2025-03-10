
import React from 'react';
import { LayoutDashboard, BarChart3, Building, Rocket, Clock, Lock, MessageSquare, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <LayoutDashboard className="w-10 h-10 text-primary" />,
    title: "Intuitive Dashboard",
    description: "Get a bird's-eye view of all your projects with real-time status updates and important notifications."
  },
  {
    icon: <Building className="w-10 h-10 text-primary" />,
    title: "Project Management",
    description: "Create and manage multiple construction projects, track tasks, and store important documents."
  },
  {
    icon: <Rocket className="w-10 h-10 text-primary" />,
    title: "Lift Installation",
    description: "Monitor elevator installations with detailed progress tracking and compliance information."
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-primary" />,
    title: "Construction Insights",
    description: "Access interactive maps, market trends, and AI-driven recommendations for your projects."
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: "Seamless Communication",
    description: "Stay connected with in-app messaging and automated status updates for all stakeholders."
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: "Time-Saving Analytics",
    description: "Generate custom reports on project progress, expenses, and projected completion times."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "Mobile Accessibility",
    description: "Access your projects anytime, anywhere with our fully responsive web application."
  },
  {
    icon: <Lock className="w-10 h-10 text-primary" />,
    title: "Enhanced Security",
    description: "Rest easy with end-to-end encryption and role-based access for all your sensitive data."
  }
];

export function Features() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-secondary/50" id="features">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-secondary z-0"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your construction projects efficiently in one platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card rounded-2xl p-6 transition-all hover:shadow-lg hover:translate-y-[-4px]",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
