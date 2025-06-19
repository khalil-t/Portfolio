
import { Code, Database, Globe, } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const About = () => {
  const skills = [
    {
      icon: Code,
      title: "Frontend Development", 
      description: "React, TypeScript, Tailwind CSS",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Backend Development",
description: "Node.js, Django, MongoDB, Express.js, Go (soon)",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "RESTful APIs, GraphQL,  Docker(soon)",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer . 
            I love turning complex problems into simple, beautiful solutions that provide exceptional user experiences.
          </p>
        </div>
        
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <Card key={skill.title} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${skill.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{skill.title}</h3>
                <p className="text-slate-600 text-sm">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">My Journey</h3>
            <p className="text-slate-600 leading-relaxed">
           Started as a curious teenager learning HTML and CSS, I've evolved into a full-stack developer with a strong backend focus. I enjoy building robust architectures, scalable APIs, and bringing ideas to life with clean, maintainable code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;