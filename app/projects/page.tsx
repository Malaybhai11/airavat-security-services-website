"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Building2, Shield, CheckCircle2, ArrowRight, MapPin, Award, TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Types
interface Project {
  id: string;
  title: string;
  slug: string;
  date: string;
  achievement: string;
  blogContent: string;
  thumbnail: string;
  number: number;
}

// MilestoneCard Component
function MilestoneCard({ project, index, isLeft }: { project: Project; index: number; isLeft: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-[#040936] overflow-hidden cursor-pointer"
      >
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#040936]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Achievement Badge */}
        <div className="absolute -top-3 -left-3 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
          <Award className="w-7 h-7 text-white" />
        </div>

        <div className="p-6 pt-8">
          {/* Header with Number and Status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#040936] to-[#0a1147] flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">#{project.number}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Milestone</span>
                <span className="text-sm font-bold text-[#040936]">Project Completed</span>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Success
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
            <Calendar className="w-4 h-4 text-[#040936]" />
            <span className="font-medium">{project.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#040936] transition-colors duration-300">
            {project.title}
          </h3>

          {/* Achievement Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
            {project.achievement}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-[#040936] font-semibold text-sm group-hover:gap-3 transition-all duration-300 pt-3 border-t border-gray-100">
            <span>View Full Details</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#040936] via-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </Link>
  );
}

// MilestoneTimeline Component
function MilestoneTimeline({ projects }: { projects: Project[] }) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.milestone-item').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="relative milestone-timeline-container">
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#040936] via-blue-600 to-purple-600 transform -translate-x-1/2 hidden md:block" />

      {/* Mobile Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#040936] via-blue-600 to-purple-600 md:hidden" />

      {/* Start Marker */}
      <div className="flex justify-center mb-16">
        <div className="relative z-20">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-4 border-white shadow-xl flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
              Our Journey
            </span>
          </div>
        </div>
      </div>

      {/* Milestone Items */}
      <div className="space-y-24 md:space-y-32 mt-20">
        {projects.map((project, index) => {
          const isLeft = index % 2 === 0;
          const isVisible = visibleItems.has(index);

          return (
            <div
              key={project.id}
              data-index={index}
              className="milestone-item relative"
            >
              {/* Timeline Node */}
              <div className="absolute top-8 left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 z-20">
                <div className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}>
                  {/* Outer Glow */}
                  <div className="absolute inset-0 rounded-full bg-[#040936] blur-lg opacity-40 animate-pulse" />
                  
                  {/* Node Circle */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-4 border-[#040936] shadow-xl flex items-center justify-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#040936] to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                      {index + 1}
                    </div>
                  </div>

                  {/* Pulse Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#040936] animate-ping opacity-20" />
                </div>
              </div>

              {/* Connecting Line (Desktop) */}
              <div
                className={`hidden md:block absolute top-12 h-0.5 bg-gradient-to-r transition-all duration-700 ${
                  isLeft
                    ? 'left-12 right-1/2 from-[#040936] to-gray-300 mr-10'
                    : 'right-12 left-1/2 from-gray-300 to-[#040936] ml-10'
                } ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                style={{ transformOrigin: isLeft ? 'right' : 'left' }}
              />

              {/* Milestone Card */}
              <div
                className={`relative transition-all duration-700 ${
                  isLeft
                    ? 'md:pr-[52%] pl-20 md:pl-0'
                    : 'md:pl-[52%] pl-20 md:pr-0'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <MilestoneCard project={project} index={index} isLeft={isLeft} />
              </div>
            </div>
          );
        })}
      </div>

      {/* End Marker */}
      <div
        className={`flex justify-center mt-20 transition-all duration-700 ${
          visibleItems.size === projects.length ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="relative z-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 blur-xl opacity-50 animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-4 border-white shadow-xl flex items-center justify-center">
            <Award className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg">
              Achievement Milestone
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo Component
export default function TimelineDemo() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects/list');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading projects: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      {/* Back to Home Button */}
      <div className="w-full flex justify-end px-4 pt-6 lg:pt-8 lg:px-10 absolute z-30">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-gray-100 shadow-lg rounded-lg text-[#040936] font-semibold border border-gray-200 transition-all"
          style={{ position: "fixed", top: "24px", right: "32px", zIndex: 50 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#040936] to-[#0a1147] text-white py-20 px-4 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-white rounded-lg transform rotate-45" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Our Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Security Projects
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover our successful security implementations across Gujarat. Each project represents our commitment to excellence, professionalism, and unwavering dedication to safety.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">{projects.length}+</div>
                  <div className="text-gray-300 text-xs">Completed Projects</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-gray-300 text-xs">Security Services</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-gray-300 text-xs">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Timeline Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        {projects.length > 0 ? (
          <MilestoneTimeline projects={projects} />
        ) : (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Yet</h3>
            <p className="text-gray-500">Check back soon for our latest security project.</p>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            ✨ Each milestone represents our commitment to excellence and client satisfaction
          </p>
        </div>
      </div>
    </div>
  );
}
