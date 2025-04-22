
import { PortfolioData } from "@/types/portfolio";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

interface TemplateProps {
  data: PortfolioData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  return (
    <div id="portfolio-preview" className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">{data.sections.hero.name}</h1>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-gray-600 hover:text-brand-600 font-medium">About</a>
            <a href="#skills" className="text-gray-600 hover:text-brand-600 font-medium">Skills</a>
            <a href="#projects" className="text-gray-600 hover:text-brand-600 font-medium">Projects</a>
            <a href="#contact" className="text-gray-600 hover:text-brand-600 font-medium">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Hi, I'm <span className="text-brand-600">{data.sections.hero.name}</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 mb-6">{data.sections.hero.title}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {data.sections.hero.subtitle}
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="px-6 py-3 bg-brand-600 text-white font-medium rounded hover:bg-brand-700 transition-colors">
                  Contact Me
                </a>
                <a href="#projects" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors">
                  View Projects
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {data.sections.hero.image ? (
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-xl">
                  <img 
                    src={data.sections.hero.image} 
                    alt={data.sections.hero.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=755&auto=format&fit=crop";
                    }}
                  />
                </div>
              ) : (
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-7xl">
                  {data.sections.hero.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h6 className="text-brand-600 font-medium mb-2">ABOUT ME</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Professional Background</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="prose prose-gray max-w-none">
                {data.sections.about.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-6 text-gray-600 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              {data.sections.about.image ? (
                <img 
                  src={data.sections.about.image} 
                  alt="About me" 
                  className="w-full h-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=755&auto=format&fit=crop";
                  }}
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h6 className="text-brand-600 font-medium mb-2">MY SKILLS</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Expertise & Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.sections.skills.items.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-brand-600 h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h6 className="text-brand-600 font-medium mb-2">MY WORK</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.sections.projects.items.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {project.image && (
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=755&auto=format&fit=crop";
                      }}
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 transition-colors"
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
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h6 className="text-brand-600 font-medium mb-2">CONTACT</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get In Touch</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-brand-600" />
                    <span>{data.sections.contact.email}</span>
                  </div>
                  {data.sections.contact.phone && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-brand-600" />
                      <span>{data.sections.contact.phone}</span>
                    </div>
                  )}
                  {data.sections.contact.location && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-brand-600" />
                      <span>{data.sections.contact.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  {data.sections.contact.social.linkedin && (
                    <a 
                      href={data.sections.contact.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-gray-700" />
                    </a>
                  )}
                  {data.sections.contact.social.github && (
                    <a 
                      href={data.sections.contact.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-gray-700" />
                    </a>
                  )}
                  {data.sections.contact.social.twitter && (
                    <a 
                      href={data.sections.contact.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5 text-gray-700" />
                    </a>
                  )}
                  {data.sections.contact.social.website && (
                    <a 
                      href={data.sections.contact.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="Personal Website"
                    >
                      <span className="text-xl">🌐</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send Me a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        disabled 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      rows={4} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      disabled
                    ></textarea>
                  </div>
                  <div className="text-center md:text-left">
                    <button
                      type="button"
                      className="px-6 py-3 bg-brand-600 text-white font-medium rounded hover:bg-brand-700 transition-colors disabled:opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Contact Form (Preview Only)
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} {data.sections.hero.name}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="#about" className="text-gray-400 hover:text-white">About</a>
            <a href="#skills" className="text-gray-400 hover:text-white">Skills</a>
            <a href="#projects" className="text-gray-400 hover:text-white">Projects</a>
            <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
