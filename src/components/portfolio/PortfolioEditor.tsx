
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { exportToPdf } from "@/lib/pdf-export";
import { savePortfolio } from "@/lib/storage";
import { PortfolioData } from "@/types/portfolio";
import { Download, Eye, Save, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface PortfolioEditorProps {
  portfolio: PortfolioData;
}

export function PortfolioEditor({ portfolio: initialPortfolio }: PortfolioEditorProps) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolio);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const updatePortfolio = (updates: Partial<PortfolioData>) => {
    setPortfolio(prev => ({ ...prev, ...updates }));
  };
  
  const updateSection = <T extends keyof PortfolioData["sections"]>(
    section: T, 
    data: Partial<PortfolioData["sections"][T]>
  ) => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: {
          ...prev.sections[section],
          ...data
        }
      }
    }));
  };
  
  const handleSave = async () => {
    try {
      setSaving(true);
      savePortfolio(portfolio);
      toast({
        title: "Success",
        description: "Your portfolio has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save portfolio.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleExport = async () => {
    try {
      setExporting(true);
      await exportToPdf(portfolio);
      toast({
        title: "Success",
        description: "Your portfolio has been exported to PDF.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export portfolio.",
        variant: "destructive"
      });
    } finally {
      setExporting(false);
    }
  };
  
  const updateSkill = (index: number, updates: Partial<{ name: string; level: number }>) => {
    setPortfolio(prev => {
      const skills = [...prev.sections.skills.items];
      skills[index] = { ...skills[index], ...updates };
      return {
        ...prev,
        sections: {
          ...prev.sections,
          skills: {
            ...prev.sections.skills,
            items: skills
          }
        }
      };
    });
  };
  
  const addSkill = () => {
    setPortfolio(prev => {
      const skills = [...prev.sections.skills.items, { name: "New Skill", level: 50 }];
      return {
        ...prev,
        sections: {
          ...prev.sections,
          skills: {
            ...prev.sections.skills,
            items: skills
          }
        }
      };
    });
  };
  
  const removeSkill = (index: number) => {
    setPortfolio(prev => {
      const skills = [...prev.sections.skills.items];
      skills.splice(index, 1);
      return {
        ...prev,
        sections: {
          ...prev.sections,
          skills: {
            ...prev.sections.skills,
            items: skills
          }
        }
      };
    });
  };
  
  const updateProject = (index: number, updates: Partial<PortfolioData["sections"]["projects"]["items"][0]>) => {
    setPortfolio(prev => {
      const projects = [...prev.sections.projects.items];
      projects[index] = { ...projects[index], ...updates };
      return {
        ...prev,
        sections: {
          ...prev.sections,
          projects: {
            ...prev.sections.projects,
            items: projects
          }
        }
      };
    });
  };
  
  const addProject = () => {
    setPortfolio(prev => {
      const projects = [
        ...prev.sections.projects.items, 
        { id: Date.now().toString(), title: "New Project", description: "Project description" }
      ];
      return {
        ...prev,
        sections: {
          ...prev.sections,
          projects: {
            ...prev.sections.projects,
            items: projects
          }
        }
      };
    });
  };
  
  const removeProject = (index: number) => {
    setPortfolio(prev => {
      const projects = [...prev.sections.projects.items];
      projects.splice(index, 1);
      return {
        ...prev,
        sections: {
          ...prev.sections,
          projects: {
            ...prev.sections.projects,
            items: projects
          }
        }
      };
    });
  };
  
  const updateSocial = (key: keyof PortfolioData["sections"]["contact"]["social"], value: string) => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        contact: {
          ...prev.sections.contact,
          social: {
            ...prev.sections.contact.social,
            [key]: value
          }
        }
      }
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Portfolio</h2>
          <p className="text-muted-foreground">Customize your portfolio content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/preview/${portfolio.id}`)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={exporting}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        <Card className="p-4">
          <Label htmlFor="portfolio-name">Portfolio Name</Label>
          <Input
            id="portfolio-name"
            value={portfolio.name}
            onChange={(e) => updatePortfolio({ name: e.target.value })}
            className="mt-1"
          />
        </Card>

        <Tabs defaultValue="hero">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4 pt-4">
            <Card className="p-4 space-y-4">
              <div>
                <Label htmlFor="hero-name">Your Name</Label>
                <Input
                  id="hero-name"
                  value={portfolio.sections.hero.name}
                  onChange={(e) => updateSection('hero', { name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="hero-title">Professional Title</Label>
                <Input
                  id="hero-title"
                  value={portfolio.sections.hero.title}
                  onChange={(e) => updateSection('hero', { title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="hero-subtitle">Brief Introduction</Label>
                <Textarea
                  id="hero-subtitle"
                  value={portfolio.sections.hero.subtitle}
                  onChange={(e) => updateSection('hero', { subtitle: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="hero-image">Profile Image URL (optional)</Label>
                <Input
                  id="hero-image"
                  value={portfolio.sections.hero.image || ''}
                  onChange={(e) => updateSection('hero', { image: e.target.value })}
                  placeholder="https://example.com/your-image.jpg"
                  className="mt-1"
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4 pt-4">
            <Card className="p-4 space-y-4">
              <div>
                <Label htmlFor="about-content">About Me</Label>
                <Textarea
                  id="about-content"
                  value={portfolio.sections.about.content}
                  onChange={(e) => updateSection('about', { content: e.target.value })}
                  className="mt-1 min-h-[200px]"
                />
              </div>

              <div>
                <Label htmlFor="about-image">About Section Image URL (optional)</Label>
                <Input
                  id="about-image"
                  value={portfolio.sections.about.image || ''}
                  onChange={(e) => updateSection('about', { image: e.target.value })}
                  placeholder="https://example.com/your-image.jpg"
                  className="mt-1"
                />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4 pt-4">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Skills</h3>
                <Button onClick={addSkill} size="sm">Add Skill</Button>
              </div>

              {portfolio.sections.skills.items.map((skill, index) => (
                <div key={index} className="grid gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(index, { name: e.target.value })}
                      placeholder="Skill name"
                    />
                    <Input
                      type="number"
                      value={skill.level}
                      min="0"
                      max="100"
                      onChange={(e) => updateSkill(index, { level: parseInt(e.target.value) || 0 })}
                      className="w-20"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeSkill(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  {index < portfolio.sections.skills.items.length - 1 && <Separator />}
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 pt-4">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Projects</h3>
                <Button onClick={addProject} size="sm">Add Project</Button>
              </div>

              {portfolio.sections.projects.items.map((project, index) => (
                <div key={project.id} className="space-y-4 mb-6">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                      <Input
                        id={`project-title-${index}`}
                        value={project.title}
                        onChange={(e) => updateProject(index, { title: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`project-desc-${index}`}>Project Description</Label>
                      <Textarea
                        id={`project-desc-${index}`}
                        value={project.description}
                        onChange={(e) => updateProject(index, { description: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`project-image-${index}`}>Project Image URL (optional)</Label>
                      <Input
                        id={`project-image-${index}`}
                        value={project.image || ''}
                        onChange={(e) => updateProject(index, { image: e.target.value })}
                        placeholder="https://example.com/project-image.jpg"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`project-link-${index}`}>Project Link (optional)</Label>
                      <Input
                        id={`project-link-${index}`}
                        value={project.link || ''}
                        onChange={(e) => updateProject(index, { link: e.target.value })}
                        placeholder="https://example.com/your-project"
                        className="mt-1"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeProject(index)}
                      >
                        Remove Project
                      </Button>
                    </div>
                  </div>
                  {index < portfolio.sections.projects.items.length - 1 && <Separator />}
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 pt-4">
            <Card className="p-4 space-y-4">
              <div>
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={portfolio.sections.contact.email}
                  onChange={(e) => updateSection('contact', { email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contact-phone">Phone Number (optional)</Label>
                <Input
                  id="contact-phone"
                  value={portfolio.sections.contact.phone || ''}
                  onChange={(e) => updateSection('contact', { phone: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contact-location">Location (optional)</Label>
                <Input
                  id="contact-location"
                  value={portfolio.sections.contact.location || ''}
                  onChange={(e) => updateSection('contact', { location: e.target.value })}
                  className="mt-1"
                  placeholder="City, Country"
                />
              </div>

              <Separator />
              <h4 className="font-medium">Social Media</h4>

              <div>
                <Label htmlFor="social-linkedin">LinkedIn URL (optional)</Label>
                <Input
                  id="social-linkedin"
                  value={portfolio.sections.contact.social.linkedin || ''}
                  onChange={(e) => updateSocial('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="social-github">GitHub URL (optional)</Label>
                <Input
                  id="social-github"
                  value={portfolio.sections.contact.social.github || ''}
                  onChange={(e) => updateSocial('github', e.target.value)}
                  placeholder="https://github.com/your-username"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="social-twitter">Twitter URL (optional)</Label>
                <Input
                  id="social-twitter"
                  value={portfolio.sections.contact.social.twitter || ''}
                  onChange={(e) => updateSocial('twitter', e.target.value)}
                  placeholder="https://twitter.com/your-username"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="social-website">Personal Website (optional)</Label>
                <Input
                  id="social-website"
                  value={portfolio.sections.contact.social.website || ''}
                  onChange={(e) => updateSocial('website', e.target.value)}
                  placeholder="https://your-website.com"
                  className="mt-1"
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
