
export interface PortfolioData {
  id: string;
  name: string;
  templateId: string;
  lastEdited: string;
  sections: {
    hero: {
      name: string;
      title: string;
      subtitle: string;
      image?: string;
    };
    about: {
      content: string;
      image?: string;
    };
    skills: {
      items: { name: string; level: number }[];
    };
    projects: {
      items: {
        id: string;
        title: string;
        description: string;
        image?: string;
        link?: string;
      }[];
    };
    contact: {
      email: string;
      phone?: string;
      location?: string;
      social: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        website?: string;
      };
    };
  };
}

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  features: string[];
}

export const defaultPortfolio: PortfolioData = {
  id: '',
  name: 'Untitled Portfolio',
  templateId: 'modern',
  lastEdited: new Date().toISOString(),
  sections: {
    hero: {
      name: 'Your Name',
      title: 'Professional Title',
      subtitle: 'Brief introduction about yourself',
    },
    about: {
      content: 'Write your professional summary here. Share your experience, passion, and expertise.',
    },
    skills: {
      items: [
        { name: 'Skill 1', level: 90 },
        { name: 'Skill 2', level: 85 },
        { name: 'Skill 3', level: 70 },
      ],
    },
    projects: {
      items: [
        {
          id: '1',
          title: 'Project 1',
          description: 'Description of your first project.',
        },
        {
          id: '2',
          title: 'Project 2',
          description: 'Description of your second project.',
        },
      ],
    },
    contact: {
      email: 'your.email@example.com',
      social: {},
    },
  },
};

export const availableTemplates: TemplateInfo[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and minimal design with focus on content',
    thumbnail: '/templates/modern-thumb.png',
    features: ['Minimalist design', 'Animation effects', 'Responsive layout']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic layout perfect for creatives',
    thumbnail: '/templates/creative-thumb.png',
    features: ['Unique layout', 'Artistic elements', 'Portfolio showcase']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic and professional look for corporate portfolios',
    thumbnail: '/templates/professional-thumb.png',
    features: ['Corporate style', 'Structured sections', 'Business-oriented']
  }
];
