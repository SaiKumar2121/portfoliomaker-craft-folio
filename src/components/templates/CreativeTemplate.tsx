
import { PortfolioData } from "@/types/portfolio";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

interface TemplateProps {
  data: PortfolioData;
}

export function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div id="portfolio-preview" className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-brand-700 to-pink-700 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_40%)] z-0"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            {data.sections.hero.image && (
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white/30">
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
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-3 animate-fade-in">{data.sections.hero.name}</h1>
          <h2 className="text-2xl md:text-3xl text-white/80 mb-6">{data.sections.hero.title}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{data.sections.hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#about" className="px-6 py-3 rounded-full bg-white text-brand-700 font-medium hover:bg-white/90 transition-colors">
              About Me
            </a>
            <a href="#contact" className="px-6 py-3 rounded-full bg-brand-600 text-white font-medium border border-brand-500 hover:bg-brand-700 transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About <span className="text-brand-400">Me</span></h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {data.sections.about.image && (
              <div className="md:w-2/5">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-brand-500 to-pink-600 opacity-50 blur"></div>
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={data.sections.about.image} 
                      alt="About me"
                      className="w-full h-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=755&auto=format&fit=crop";
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="md:w-3/5">
              <div className="prose prose-invert max-w-none">
                {data.sections.about.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-300 mb-4 text-lg">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_60%)]"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">My <span className="text-brand-400">Skills</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.sections.skills.items.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-xl text-white">{skill.name}</span>
                  <span className="text-brand-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-pink-600 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-8 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">My <span className="text-brand-400">Projects</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {data.sections.projects.items.map((project) => (
              <div key={project.id} className="group bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors duration-300 border border-gray-700/50">
                {project.image && (
                  <div className="h-52 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=755&auto=format&fit=crop";
                      }}
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-brand-400">{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 border border-brand-500 text-brand-400 hover:bg-brand-500 hover:text-white rounded-md transition-colors"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-8 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.15),transparent_60%)]"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">Get in <span className="text-brand-400">Touch</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-brand-900/30 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                  <p className="text-gray-400">{data.sections.contact.email}</p>
                </div>
              </div>
              
              {data.sections.contact.phone && (
                <div className="flex items-start gap-4">
                  <div className="bg-brand-900/30 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                    <p className="text-gray-400">{data.sections.contact.phone}</p>
                  </div>
                </div>
              )}
              
              {data.sections.contact.location && (
                <div className="flex items-start gap-4">
                  <div className="bg-brand-900/30 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                    <p className="text-gray-400">{data.sections.contact.location}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {data.sections.contact.social.github && (
                  <a 
                    href={data.sections.contact.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-brand-600 rounded-full transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {data.sections.contact.social.linkedin && (
                  <a 
                    href={data.sections.contact.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-brand-600 rounded-full transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {data.sections.contact.social.twitter && (
                  <a 
                    href={data.sections.contact.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-brand-600 rounded-full transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
                {data.sections.contact.social.website && (
                  <a 
                    href={data.sections.contact.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 hover:bg-brand-600 rounded-full transition-colors"
                    aria-label="Personal Website"
                  >
                    <span className="text-xl">🌐</span>
                  </a>
                )}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-gray-400">Let's work together on your next project!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} {data.sections.hero.name} • All rights reserved</p>
      </footer>
    </div>
  );
}
