
import { PortfolioData } from "@/types/portfolio";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface TemplateProps {
  data: PortfolioData;
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div id="portfolio-preview" className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-50 to-brand-100 py-20 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {data.sections.hero.image && (
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={data.sections.hero.image} 
                alt={data.sections.hero.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=755&auto=format&fit=crop";
                }}
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-800">{data.sections.hero.name}</h1>
            <h2 className="text-xl md:text-2xl text-brand-600 mt-2">{data.sections.hero.title}</h2>
            <p className="mt-3 text-gray-600 max-w-lg">{data.sections.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-brand-800">About Me</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <div className="prose prose-slate max-w-none">
                {data.sections.about.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
            {data.sections.about.image && (
              <div className="md:w-1/3">
                <img 
                  src={data.sections.about.image} 
                  alt="About me"
                  className="rounded-lg shadow-md w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=755&auto=format&fit=crop";
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-brand-800">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.sections.skills.items.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-brand-800">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.sections.projects.items.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=755&auto=format&fit=crop";
                    }}
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-brand-700">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:text-brand-800 font-medium inline-flex items-center"
                    >
                      View Project <span className="ml-2">→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-8 bg-brand-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-brand-800">Contact Me</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <h3 className="text-xl font-semibold text-brand-700">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-brand-600 mr-3" />
                  <span>{data.sections.contact.email}</span>
                </div>
                {data.sections.contact.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-brand-600 mr-3" />
                    <span>{data.sections.contact.phone}</span>
                  </div>
                )}
                {data.sections.contact.location && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-brand-600 mr-3" />
                    <span>{data.sections.contact.location}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-brand-700 mb-6">Social Links</h3>
              <div className="flex flex-wrap gap-3">
                {data.sections.contact.social.github && (
                  <a 
                    href={data.sections.contact.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" /> GitHub
                  </a>
                )}
                {data.sections.contact.social.linkedin && (
                  <a 
                    href={data.sections.contact.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                  </a>
                )}
                {data.sections.contact.social.twitter && (
                  <a 
                    href={data.sections.contact.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
                  >
                    <Twitter className="w-4 h-4 mr-2" /> Twitter
                  </a>
                )}
                {data.sections.contact.social.website && (
                  <a 
                    href={data.sections.contact.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
                  >
                    <span className="w-4 h-4 mr-2">🌐</span> Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 text-center py-8 text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} {data.sections.hero.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
