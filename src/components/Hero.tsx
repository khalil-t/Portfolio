import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import profileImg from "../assets/profile.svg"

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
        <div className="mb-8">
         <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
    <img
  src={profileImg}
  alt="Profile"
  className="w-full h-full object-cover rounded-full"
/>
    </div>
  </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-4">
            TOUIL <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">KHALIL</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
Full-stack developer with a backend focus — building modern, secure, and scalable web experiences.          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => scrollToSection('projects')}
          >
            View My Work
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection('contact')}
          >
            Get In Touch
          </Button>
        </div>
        
        <div className="flex justify-center space-x-6 mb-12">
          <a href="https://github.com/khalil-t" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/khalil-touil-787a91290/" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform">
            <Linkedin size={24} />
          </a>
          <a href="mailto:khaliltouil2004s@gmail.com" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform">
            <Mail size={24} />
          </a>
        </div>
        
        <button 
          onClick={() => scrollToSection('about')}
          className="animate-bounce text-slate-500 hover:text-blue-600 transition-colors duration-300"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;