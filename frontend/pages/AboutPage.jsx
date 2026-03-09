import React from 'react';
import { Link } from 'react-router-dom';

const TeamMember = ({ name, role, initial, gradient }) => (
  <div className="text-center group">
    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500" style={{ background: gradient }}>
      {initial}
    </div>
    <h3 className="font-bold text-slate-800 dark:text-white">{name}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
  </div>
);

const ValueCard = ({ icon, title, description }) => (
  <div className="group p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 hover:-translate-y-2">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const MilestoneItem = ({ year, title, description }) => (
  <div className="relative pl-8 pb-10 border-l-2 border-indigo-200 dark:border-indigo-800 last:border-transparent last:pb-0 group">
    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-900 group-hover:scale-150 transition-transform duration-300"></div>
    <div className="ml-4">
      <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">{year}</span>
      <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  </div>
);

const AboutPage = () => {
  const team = [
    { name: 'Alex Johnson', role: 'Founder & CEO', initial: 'A', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
    { name: 'Sarah Williams', role: 'Head of Content', initial: 'S', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
    { name: 'Michael Chen', role: 'Lead Developer', initial: 'M', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    { name: 'Emily Davis', role: 'Community Manager', initial: 'E', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
  ];

  const values = [
    {
      icon: <svg className="w-7 h-7 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
      title: 'Accessibility',
      description: 'We believe great stories should be available to everyone, everywhere. Our platform removes traditional barriers to reading and publishing.'
    },
    {
      icon: <svg className="w-7 h-7 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      title: 'Community',
      description: 'We foster a vibrant community of readers and authors who share, discuss, and celebrate the power of storytelling together.'
    },
    {
      icon: <svg className="w-7 h-7 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
      title: 'Quality',
      description: 'Every book on our platform goes through a curation process to ensure readers always find stories that inspire, educate, and entertain.'
    },
    {
      icon: <svg className="w-7 h-7 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      title: 'Trust & Safety',
      description: 'Your data, purchases, and reading habits are always protected with enterprise-grade encryption and privacy standards.'
    },
  ];

  const milestones = [
    { year: '2022', title: 'The Beginning', description: 'Ebook Emporium was founded with a mission to democratize digital reading.' },
    { year: '2023', title: '1,000 Books Milestone', description: 'Hit our first major milestone with 1,000 books and 5,000 active readers.' },
    { year: '2024', title: 'Author Publishing Platform', description: 'Launched our self-publishing tools, empowering indie authors worldwide.' },
    { year: '2025', title: 'Global Community', description: 'Grew to 50,000+ readers and 2,500+ published authors across 50 countries.' },
    { year: '2026', title: 'AI-Powered Discovery', description: 'Introduced smart recommendations and personalized reading lists.' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 py-24 md:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-indigo-300 dark:bg-indigo-800 rounded-full blur-3xl"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-300 dark:bg-purple-800 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ebook Emporium</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Your digital library, reimagined. We're building the world's most inspiring platform for readers and authors.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Our Mission</h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    Ebook Emporium was founded on a simple yet powerful idea: to create a seamless and inspiring space for both readers and authors in the digital age.
                  </p>
                  <p>
                    We believe that stories have the power to connect us, to broaden our horizons, and to spark our imaginations. Our mission is to make those stories more accessible than ever before.
                  </p>
                  <p>
                    For readers, we offer a carefully curated collection across every genre imaginable. For authors, we provide a platform to share their voice with the world without traditional barriers.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="text-7xl mb-4">📚</div>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">"Stories connect us all"</p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-slate-50 dark:bg-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Ebooks', icon: '📖' },
              { value: '50K+', label: 'Readers', icon: '👥' },
              { value: '2.5K+', label: 'Authors', icon: '✍️' },
              { value: '50+', label: 'Countries', icon: '🌍' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
                <p className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Our Values</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-20 bg-slate-50 dark:bg-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Our Journey</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">Key milestones in our story</p>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone) => (
              <MilestoneItem key={milestone.year} {...milestone} />
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Meet Our Team</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg max-w-2xl mx-auto">The passionate people behind Ebook Emporium</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">Whether you're here to read, to write, or simply to explore, we're glad to have you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Start Reading
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
