import React from "react";
import { Github, Figma, Send, User } from "lucide-react";
import { HeroHeader } from "../../Layout/header";

export default function Contact() {
  
  const teamMembers = [
    {
      id: 1,
      name: "Mariem Hamada",
      track: "Machine Learning",
    },
    {
      id: 2,
      name: "Omniya Nasser",
      track: "FRONTEND",
    },
    {
      id: 3,
      name: "Mariem Osama",
      track: "BACKEND",
    },
    {
      id: 4,
      name: "Ahmed Tamer",
      track: "BACKEND",
    },
     {
      id: 5,
      name: "Ahmed Hassan",
      track: "UI/UX Designer",
    },
  ];

  return (
   <>
 <HeroHeader />

    <section className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen py-20 pt-35">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About The Project & Team
          </h1>
          <p className="text-gray-600 dark:text-white/70 text-lg">
            Stratify was developed as a comprehensive graduation project. Feel free to explore our workspace or send us your feedback!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Left Side: Project Links & Team */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Links */}
            <div className="bg-white dark:bg-white/[0.05] p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Project Workspace
              </h3>
              <div className="space-y-4">
                <a 
                  href="https://github.com/Smart-Business-Advisor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all group"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
                    <Github className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">GitHub Organization</h4>
                    <p className="text-sm text-gray-500 dark:text-white/50">View our source code</p>
                  </div>
                </a>

               
              </div>
            </div>

            {/* Team Members (Grid Layout) */}
            <div className="bg-white dark:bg-white/[0.05] p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                Meet the Team
              </h3>
              
             
              <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex flex-col items-center text-center">
                   
                    <div className="flex size-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4 shadow-sm border border-blue-100 dark:border-blue-500/20">
                      <User className="size-10 " />
                    </div>
                   
                    <h4 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-1">
                      {member.name}
                    </h4>
                    <p className="text-[11px] font-bold text-gray-500 dark:text-white/40 tracking-widest uppercase">
                      {member.track}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Real Feedback Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-white/[0.05] p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Project Feedback
                </h3>
                <p className="text-gray-600 dark:text-white/70">
                  We value your feedback! Send us a message and it will be delivered directly to our team's inbox.
                </p>
              </div>

              {/* Formspree Action URL goes here */}
              <form action="https://formspree.io/f/mwvdpekb" method="POST" className="space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Feedback / Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Write your feedback or questions here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-medium transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="size-5" />
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
   </>
  );
}