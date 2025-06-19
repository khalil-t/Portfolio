import {  Github } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-featured online store , inventory management, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["React", "Node.js", "MongoDB","Express JS"],
    github: import.meta.env.VITE_ECOMMERCE_GITHUB,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Real-Time Chat App",
      description: "This is a real-time chat application that utilizes Socket.IO . Users can search for other users online and start chatting with them.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      tags: ["React", "Node.js", "MongoDB","Express JS", "Socket.io" , "JWT (Authentication)", "Tailwind CSS"],
    github: import.meta.env.VITE_CHATAPP_GITHUB,
      gradient: "from-green-500 to-emerald-600"
    },
   {
  title: "Mini Web Development Projects",
  description: "A curated set of small-scale web applications demonstrating proficiency in core development concepts such as RESTful APIs, server-side logic, and frontend integration.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
  tags: ["JavaScript", "Node.js", "REST API", "HTML/CSS"],
    github: import.meta.env.VITE_MINIPROJECTS_GITHUB,
  gradient: "from-purple-500 to-pink-600"
}

  ];

  return (
    <section id="projects" className="py-20 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills and passion for creating innovative solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                  <div className="flex space-x-4">
                 <a href={project.github} target="_blank" rel="noopener noreferrer">
  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                          <Github size={16} className="mr-2" />

    Code
  </Button>
</a>

               
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;