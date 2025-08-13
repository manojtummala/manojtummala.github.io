"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Globe } from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      name: "Email",
      value: "manojtum@usc.edu",
      icon: Mail,
      href: "mailto:manojtum@usc.edu",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      name: "GitHub",
      value: "github.com/manojtummala",
      icon: Github,
      href: "https://github.com/manojtummala",
      color: "from-slate-700 to-slate-800",
      bgColor: "bg-slate-50 dark:bg-slate-800/20",
      borderColor: "border-slate-200 dark:border-slate-700"
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/manoj-tummala/",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/manoj-tummala/",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      name: "Portfolio",
      value: "manojtummala.github.io",
      icon: Globe,
      href: "https://manojtummala.github.io",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-700"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-slate-100/60 via-blue-100/30 to-indigo-100/30 dark:from-slate-800/60 dark:via-slate-700/30 dark:to-indigo-800/30">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-700 dark:from-slate-100 dark:to-indigo-300 bg-clip-text text-transparent mb-4"
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            I'm always interested in new opportunities, collaborations, and interesting conversations. 
            Feel free to reach out through any of these channels.
          </motion.p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group p-6 rounded-2xl border-2 ${method.bgColor} ${method.borderColor} hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {method.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 break-all">
                  {method.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
              What I'm Looking For
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Full-stack engineering roles, ML/DS opportunities, or interesting projects that challenge me to grow.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Full-Stack", "Backend", "ML/DS", "DevOps", "Open Source"].map((tag, i) => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
