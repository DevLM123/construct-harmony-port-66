
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Building, 
  DollarSign, 
  FileText, 
  Gavel, 
  Calendar, 
  Users, 
  Calculator, 
  Search,
  Info,
  MessageSquare,
  Map,
  BookOpen,
  Compass,
  Video,
  Download,
  Shield
} from 'lucide-react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

// Import all the data from BankResourcesDialog
const financingOptions = [
  {
    name: "Construction Loans",
    description: "Specialized short-term financing for Florida home elevation and rebuilding projects.",
    details: "Florida banks offer specialized construction loans with competitive rates for coastal property improvements."
  },
  {
    name: "Renovation Loans",
    description: "FHA 203k and Fannie Mae HomeStyle loans for combining purchase and renovation costs.",
    details: "These products allow you to finance both the purchase and renovation of a property with just one loan."
  },
  {
    name: "HELOCs",
    description: "Home equity lines of credit with Florida-specific regulations and LTV limits.",
    details: "Florida law provides certain protections regarding home equity, though maximum loan-to-value ratios typically range from 80-90%."
  },
  {
    name: "Government Programs",
    description: "USDA Rural Housing Repair Loans and other federal assistance programs.",
    details: "Low-interest loans and grants for very-low-income homeowners to repair, improve, or modernize their homes."
  }
];

const localLenders = [
  {
    name: "Suncoast Credit Union",
    description: "Florida's largest credit union offering specialized home improvement loans.",
    logo: "suncoast"
  },
  {
    name: "VyStar Credit Union",
    description: "Competitive rates on home equity loans and construction financing.",
    logo: "vystar"
  },
  {
    name: "First Florida Credit Union",
    description: "Member-focused lending with flexible terms for renovation projects.",
    logo: "firstflorida"
  },
  {
    name: "Florida Community Loan Fund",
    description: "Nonprofit lender supporting affordable housing and community development.",
    logo: "fclf"
  },
  {
    name: "BankUnited",
    description: "Florida-based bank with specialized coastal property lending expertise.",
    logo: "bankunited"
  }
];

const grantPrograms = [
  {
    name: "My Safe Florida Home",
    description: "Free wind mitigation inspections and matching grants up to $10,000.",
    details: "Program helps homeowners identify hurricane safety improvements and provides grants for qualified upgrades."
  },
  {
    name: "Rebuild Florida",
    description: "Assistance for low/moderate income property owners affected by disasters.",
    details: "State-run program that helps rebuild or replace damaged homes for qualified applicants."
  },
  {
    name: "Hurricane Loss Mitigation Program",
    description: "Funding for retrofits to make homes more resistant to hurricane damage.",
    details: "Provides up to $10,000 for specific mitigation improvements to qualifying structures."
  },
  {
    name: "Community Development Block Grants",
    description: "Disaster recovery funding (CDBG-DR) for affected communities.",
    details: "Federal funds allocated to states for long-term recovery efforts in disaster-affected areas."
  }
];

const permitRequirements = [
  {
    county: "Miami-Dade",
    link: "https://www.miamidade.gov/permits/",
    description: "Strict coastal construction requirements and wind load regulations."
  },
  {
    county: "Broward",
    link: "https://www.broward.org/permittingandlicensing/",
    description: "Environmental impact assessments required for coastal properties."
  },
  {
    county: "Lee",
    link: "https://www.leegov.com/dcd/BldPermitServ",
    description: "Special regulations for properties in storm surge zones."
  },
  {
    county: "Pinellas",
    link: "https://www.pinellascounty.org/permits.htm",
    description: "Elevation certificate requirements for coastal construction."
  },
  {
    county: "Duval",
    link: "https://www.coj.net/departments/planning-and-development/building-inspection-division",
    description: "Special considerations for historic district renovations."
  },
  {
    county: "Monroe",
    link: "https://www.monroecounty-fl.gov/149/Building-and-Permitting",
    description: "Stringent Keys-specific elevation and environmental requirements."
  }
];

const codeGuidelines = [
  {
    name: "Florida Building Code Chapter 16",
    description: "Flood Load design requirements specific to coastal zones."
  },
  {
    name: "FEMA P-55",
    description: "Coastal Construction Manual with Florida-specific guidance."
  },
  {
    name: "ASCE 24 Compliance",
    description: "Minimum elevation standards for flood-resistant design."
  }
];

const specialtyServices = [
  {
    name: "Coastal Surveyors",
    type: "Surveyors",
    description: "Specializing in elevation certificates and flood zone determinations."
  },
  {
    name: "Structural Engineers",
    type: "Engineers",
    description: "Expert assessment of lifting feasibility and structural requirements."
  },
  {
    name: "Environmental Consultants",
    type: "Environmental",
    description: "Specialized in wetlands, mangroves, and coastal ecosystem regulations."
  }
];

const guides = [
  {
    title: "Should I Lift or Rebuild?",
    description: "Decision guide to help determine the most cost-effective approach.",
    type: "guide"
  },
  {
    title: "Preparing for Home Elevation",
    description: "Step-by-step process for Florida homeowners planning to elevate.",
    type: "guide"
  },
  {
    title: "Understanding the FEMA 50% Rule",
    description: "Critical information about substantial improvement requirements.",
    type: "guide"
  },
  {
    title: "Reading Your Flood Zone Map",
    description: "Florida-specific examples of how to interpret FEMA flood maps.",
    type: "guide"
  }
];

const videos = [
  {
    title: "Platform Tools Walkthrough",
    duration: "12 min",
    type: "tutorial"
  },
  {
    title: "Florida Case Study: Keys Home Elevation",
    duration: "24 min",
    type: "case-study"
  },
  {
    title: "Engineer Talk: Lifting on Sandy Soil",
    duration: "35 min",
    type: "expert"
  }
];

const downloadables = [
  {
    title: "Budget Planning Worksheet",
    format: "Excel",
    type: "worksheet"
  },
  {
    title: "Floodproofing Comparison Chart",
    format: "PDF",
    type: "chart"
  },
  {
    title: "Florida Permit Preparation Checklist",
    format: "PDF",
    type: "checklist"
  }
];

const events = [
  {
    title: "Home Elevation Workshop",
    date: "June 15, 2025",
    location: "Tampa Convention Center"
  },
  {
    title: "Hurricane Prep Expo",
    date: "July 8, 2025",
    location: "Miami-Dade Fairgrounds"
  },
  {
    title: "My Safe Florida Home Application Drive",
    date: "August 2, 2025",
    location: "Jacksonville Public Library"
  }
];

const communityPartners = [
  {
    name: "Habitat for Humanity Florida",
    type: "Housing",
    description: "Rebuilding assistance for qualified homeowners."
  },
  {
    name: "Florida Legal Services",
    type: "Legal",
    description: "Free legal assistance with insurance claims and permits."
  },
  {
    name: "United Way",
    type: "Support",
    description: "Connecting residents with recovery resources."
  }
];

const faqs = [
  {
    question: "Is my house eligible for a lift?",
    answer: "Most homes can be lifted, but factors like foundation type, construction method, and current condition affect feasibility. Our structural engineers can provide a free assessment."
  },
  {
    question: "Can I still get a grant if I've already started work?",
    answer: "In most cases, grant programs require approval before work begins. Contact the specific program administration before starting any work if you plan to apply for funding assistance."
  },
  {
    question: "How long do Florida permitting approvals usually take?",
    answer: "Timeframes vary by county, but typically range from 2-8 weeks. Coastal properties and special flood hazard areas often require additional review time."
  },
  {
    question: "How do I find my flood zone?",
    answer: "You can use FEMA's Flood Map Service Center (msc.fema.gov) or contact your local floodplain manager. Our platform also offers a flood zone lookup tool for Florida properties."
  }
];

const Resources = () => {
  const [activeTab, setActiveTab] = useState("financing");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthClick={() => {}} />
      <div className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl mb-4">Florida Home Resources</h1>
            <p className="text-lg text-muted-foreground">
              Access tools, financial resources, and guidance for your Florida home improvement projects
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="financing" className="py-3">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Financing</span>
              </TabsTrigger>
              <TabsTrigger value="permits" className="py-3">
                <Gavel className="h-4 w-4 mr-2" />
                <span>Permits & Legal</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="py-3">
                <Users className="h-4 w-4 mr-2" />
                <span>Services</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="py-3">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>Resources</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Financing Tab */}
            <TabsContent value="financing" className="mt-0">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="financing-options">
                  <AccordionTrigger className="text-lg font-medium">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    Financing Options
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      <p className="text-sm text-muted-foreground">
                        Overview of home lifting vs. rebuilding costs in Florida, with typical costs ranging from $30,000-$150,000 depending on home size and construction type.
                      </p>
                      {financingOptions.map((option) => (
                        <Collapsible key={option.name}>
                          <Card>
                            <CardHeader className="py-3">
                              <CollapsibleTrigger className="flex items-center justify-between w-full">
                                <CardTitle className="text-md">{option.name}</CardTitle>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </CollapsibleTrigger>
                            </CardHeader>
                            <CollapsibleContent>
                              <CardContent className="pt-0">
                                <CardDescription className="text-sm">{option.description}</CardDescription>
                                <p className="mt-2 text-sm">{option.details}</p>
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="local-lenders">
                  <AccordionTrigger className="text-lg font-medium">
                    <Building className="h-5 w-5 mr-2 text-primary" />
                    Resources
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {localLenders.map((lender) => (
                        <Card key={lender.name} className="flex flex-col">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-md">{lender.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>{lender.description}</CardDescription>
                            <Button variant="outline" size="sm" className="mt-3 w-full">
                              Visit Website
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="mt-4 bg-muted/50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Special Programs</h4>
                      <p className="text-sm">MyFloridaMyHome programs via the Florida Housing Finance Corporation offer additional assistance for first-time homebuyers and renovation projects.</p>
                      <Button variant="link" className="p-0 h-auto mt-1">Learn More</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="grant-programs">
                  <AccordionTrigger className="text-lg font-medium">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Florida Grant Programs
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      {grantPrograms.map((program) => (
                        <Collapsible key={program.name}>
                          <Card>
                            <CardHeader className="py-3">
                              <CollapsibleTrigger className="flex items-center justify-between w-full">
                                <CardTitle className="text-md">{program.name}</CardTitle>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </CollapsibleTrigger>
                            </CardHeader>
                            <CollapsibleContent>
                              <CardContent className="pt-0">
                                <CardDescription className="text-sm">{program.description}</CardDescription>
                                <p className="mt-2 text-sm">{program.details}</p>
                                <Button variant="outline" size="sm" className="mt-3">
                                  Program Details
                                </Button>
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="loan-checklist">
                  <AccordionTrigger className="text-lg font-medium">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Loan Application Checklist
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium mb-2">Required Documents</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                          <li>Property deed and title information</li>
                          <li>Current mortgage statements</li>
                          <li>Proof of income and employment</li>
                          <li>Tax returns (past 2 years)</li>
                          <li>Home insurance documentation</li>
                          <li>Flood insurance documentation</li>
                          <li>Contractor estimates for project</li>
                          <li>Permits or pre-approval documentation</li>
                        </ul>
                        
                        <h4 className="font-medium mb-2">Credit Score Requirements</h4>
                        <div className="text-sm mb-4">
                          <p>Typical ranges by lender type:</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li>Bank loans: 680+</li>
                            <li>Credit union programs: 650+</li>
                            <li>FHA 203k loans: 620+</li>
                            <li>Government assistance programs: 580-640</li>
                          </ul>
                        </div>
                        
                        <h4 className="font-medium mb-2">Timeline Expectations</h4>
                        <div className="text-sm">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Pre-approval: 3-5 business days</li>
                            <li>Full approval: 2-4 weeks</li>
                            <li>Closing: 30-45 days from application</li>
                            <li>Fund disbursement: Varies by project phase</li>
                          </ul>
                        </div>
                        
                        <Button variant="outline" size="sm" className="mt-4">
                          <Download className="h-4 w-4 mr-1" />
                          Download Full Checklist
                        </Button>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            {/* Permits & Legal Tab */}
            <TabsContent value="permits" className="mt-0">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="permit-requirements">
                  <AccordionTrigger className="text-lg font-medium">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Permit Requirements by County
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      {permitRequirements.map((county) => (
                        <Card key={county.county}>
                          <CardHeader className="py-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-md">{county.county} County</CardTitle>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={county.link} target="_blank" rel="noopener noreferrer">
                                  Visit
                                </a>
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription>{county.description}</CardDescription>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                              <div className="bg-muted p-2 rounded">
                                <span className="font-medium block">Common Forms:</span>
                                <ul className="list-disc list-inside text-xs mt-1">
                                  <li>Elevation Certificate</li>
                                  <li>Building Permit</li>
                                  <li>Zoning Approval</li>
                                </ul>
                              </div>
                              <div className="bg-muted p-2 rounded">
                                <span className="font-medium block">Processing Time:</span>
                                <p className="text-xs mt-1">2-8 weeks depending on project scope and location</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="code-guidelines">
                  <AccordionTrigger className="text-lg font-medium">
                    <Gavel className="h-5 w-5 mr-2 text-primary" />
                    Florida Building Code & FEMA Guidelines
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      {codeGuidelines.map((code) => (
                        <Card key={code.name}>
                          <CardHeader className="py-3">
                            <CardTitle className="text-md">{code.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription>{code.description}</CardDescription>
                            <Button variant="outline" size="sm" className="mt-3">
                              View Guidelines
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-md mt-4">
                      <h4 className="font-medium mb-2">Key Compliance Areas</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Base Flood Elevation (BFE) determinations</li>
                        <li>Freeboard requirements (additional height above BFE)</li>
                        <li>Foundation design for hydrostatic/hydrodynamic forces</li>
                        <li>Breakaway wall requirements in V zones</li>
                        <li>Wind-borne debris protection standards</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="insurance-guidance">
                  <AccordionTrigger className="text-lg font-medium">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Insurance Guidance
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-md">National Flood Insurance Program (NFIP)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Federal program providing flood insurance to property owners in participating communities.
                          </CardDescription>
                          <div className="text-sm mt-2">
                            <p className="font-medium">Key Points:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                              <li>Coverage limits up to $250,000 for structure</li>
                              <li>Additional coverage available for contents</li>
                              <li>30-day waiting period in most cases</li>
                            </ul>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3">
                            NFIP Details
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-md">How Home Elevation Affects Premiums</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <p>Elevating your home above the Base Flood Elevation (BFE) can significantly reduce flood insurance premiums:</p>
                            <table className="w-full text-xs mt-2 border-collapse">
                              <thead className="bg-muted">
                                <tr>
                                  <th className="p-2 text-left">Height Above BFE</th>
                                  <th className="p-2 text-left">Premium Reduction</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-muted">
                                  <td className="p-2">At BFE</td>
                                  <td className="p-2">Standard rate</td>
                                </tr>
                                <tr className="border-b border-muted">
                                  <td className="p-2">1 foot above</td>
                                  <td className="p-2">Up to 30% reduction</td>
                                </tr>
                                <tr className="border-b border-muted">
                                  <td className="p-2">2 feet above</td>
                                  <td className="p-2">Up to 40% reduction</td>
                                </tr>
                                <tr>
                                  <td className="p-2">3+ feet above</td>
                                  <td className="p-2">Up to 60% reduction</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-md">Private Flood Insurance Options</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Florida's growing private flood insurance market offers alternatives to NFIP policies.
                          </CardDescription>
                          <div className="mt-2 text-sm space-y-2">
                            <p>Leading Florida private flood insurers:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Neptune Flood Insurance</li>
                              <li>TypTap Insurance</li>
                              <li>Florida Peninsula Insurance</li>
                              <li>Security First Flood</li>
                            </ul>
                            <p className="text-xs text-muted-foreground mt-2">
                              Private policies may offer higher coverage limits, shorter waiting periods, and coverage for additional living expenses.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            {/* Services Tab */}
            <TabsContent value="services" className="mt-0">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="verified-contractors">
                  <AccordionTrigger className="text-lg font-medium">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    Verified Contractors by Region
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-4 flex items-center">
                      <div className="relative flex-1 mr-2">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="text"
                          placeholder="Search by zip code or county"
                          className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                    </div>
                    
                    <div className="grid gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-md">Coastal Elevation Experts</CardTitle>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Verified</span>
                          </div>
                          <CardDescription className="text-xs">Home Elevation | Miami-Dade, Broward</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium block text-xs">License Status:</span>
                              <span className="text-xs text-green-600">Active & Insured</span>
                            </div>
                            <div>
                              <span className="font-medium block text-xs">Experience:</span>
                              <span className="text-xs">15+ years</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3 w-full">
                            View Profile
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-md">Gulf Coast Lifters</CardTitle>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Verified</span>
                          </div>
                          <CardDescription className="text-xs">Home Elevation | Pinellas, Lee, Charlotte</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium block text-xs">License Status:</span>
                              <span className="text-xs text-green-600">Active & Insured</span>
                            </div>
                            <div>
                              <span className="font-medium block text-xs">Experience:</span>
                              <span className="text-xs">20+ years</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3 w-full">
                            View Profile
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-md">Northeast Florida Builders</CardTitle>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Verified</span>
                          </div>
                          <CardDescription className="text-xs">New Construction, Elevation | Duval, St. Johns</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium block text-xs">License Status:</span>
                              <span className="text-xs text-green-600">Active & Insured</span>
                            </div>
                            <div>
                              <span className="font-medium block text-xs">Experience:</span>
                              <span className="text-xs">12+ years</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3 w-full">
                            View Profile
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <div className="text-center">
                        <Button variant="link">
                          Load More Results
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="specialty-services">
                  <AccordionTrigger className="text-lg font-medium">
                    <Compass className="h-5 w-5 mr-2 text-primary" />
                    Specialty Services
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      {specialtyServices.map((service) => (
                        <Card key={service.name}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-md">{service.name}</CardTitle>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{service.type}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <CardDescription>{service.description}</CardDescription>
                            <Button variant="outline" size="sm" className="mt-3 w-full">
                              Find Providers
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-0">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="guides">
                  <AccordionTrigger className="text-lg font-medium">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Step-by-Step Guides
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      {guides.map((guide) => (
                        <Card key={guide.title}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md">{guide.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription>{guide.description}</CardDescription>
                            <Button variant="outline" size="sm" className="mt-3">
                              Read Guide
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="videos">
                  <AccordionTrigger className="text-lg font-medium">
                    <Video className="h-5 w-5 mr-2 text-primary" />
                    Video Tutorials & Webinars
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {videos.map((video) => (
                        <Card key={video.title} className="flex flex-col">
                          <div className="bg-muted h-32 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-md">{video.title}</CardTitle>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                {video.type}
                              </span>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <Button variant="outline">
                        View All Videos
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="downloads">
                  <AccordionTrigger className="text-lg font-medium">
                    <Download className="h-5 w-5 mr-2 text-primary" />
                    Downloadable Templates
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {downloadables.map((item) => (
                        <Card key={item.title} className="flex items-center p-4">
                          <div className={cn(
                            "h-10 w-10 rounded-md flex items-center justify-center mr-3",
                            item.format === "Excel" ? "bg-green-100" : "bg-red-100"
                          )}>
                            <span className={cn(
                              "font-medium text-sm",
                              item.format === "Excel" ? "text-green-700" : "text-red-700"
                            )}>
                              {item.format}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.type}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="tools">
                  <AccordionTrigger className="text-lg font-medium">
                    <Calculator className="h-5 w-5 mr-2 text-primary" />
                    Tools & Calculators
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-md">Loan Affordability Calculator</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Estimate monthly payments and total costs based on loan amount, term, and interest rate.
                          </CardDescription>
                          <Button className="mt-3 w-full">
                            Open Calculator
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-md">Flood Risk Visualizer</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            GIS-powered tool showing property risk zones and historical flood data.
                          </CardDescription>
                          <Button className="mt-3 w-full">
                            View Flood Map
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-md">Cost Estimator</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Compare lifting vs. rebuilding costs based on square footage and zip code.
                          </CardDescription>
                          <Button className="mt-3 w-full">
                            Start Estimate
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="events">
                  <AccordionTrigger className="text-lg font-medium">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Local Events & Support
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-md">Upcoming Workshops & Events</h4>
                        <div className="grid gap-3">
                          {events.map((event) => (
                            <Card key={event.title} className="p-4">
                              <div className="flex gap-3">
                                <div className="bg-primary/10 text-primary font-medium p-2 rounded text-center min-w-14">
                                  <div className="text-xs">
                                    {event.date.split(" ")[0]}
                                  </div>
                                  <div className="text-lg">
                                    {event.date.split(" ")[1].replace(",", "")}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-medium">{event.title}</h5>
                                  <p className="text-xs text-muted-foreground">{event.location}</p>
                                </div>
                              </div>
                              <div className="mt-2 flex gap-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  Details
                                </Button>
                                <Button size="sm" className="text-xs">
                                  Register
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2 text-md">Community Partners</h4>
                        <div className="grid gap-3">
                          {communityPartners.map((partner) => (
                            <Card key={partner.name} className="p-4">
                              <div className="flex justify-between">
                                <h5 className="font-medium">{partner.name}</h5>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                  {partner.type}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{partner.description}</p>
                              <Button size="sm" variant="link" className="mt-1 p-0 h-auto">
                                Visit Website
                              </Button>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faqs">
                  <AccordionTrigger className="text-lg font-medium">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    FAQs & Live Help
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={faq.question} value={`faq-${index}`}>
                          <AccordionTrigger className="text-md">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <div className="bg-muted/50 p-4 rounded-md mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Need more help?</h4>
                          <p className="text-sm text-muted-foreground">Our experts are available to answer your questions.</p>
                        </div>
                        <Button>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Live Chat
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
