"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Tag, Trophy, Sparkles, Award, Target } from 'lucide-react';

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

// ProjectMilestoneCard Component
function ProjectMilestoneCard({ 
  project, 
  index,
  isLeft 
}: { 
  project: Project; 
  index: number;
  isLeft: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-2xl p-6 shadow-xl cursor-pointer transition-all duration-500 border border-gray-200 hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 group"
    >
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100 to-transparent rounded-tr-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Corner Indicator for Desktop */}
      <div 
        className={`hidden md:block absolute top-12 ${
          isLeft ? '-right-4' : '-left-4'
        } w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 border-4 border-white shadow-lg transform rotate-45 z-10`}
      />

      {/* Floating Badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
        <Trophy className="w-6 h-6 text-white" />
      </div>

      {/* Number Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-4 shadow-md">
        <Tag className="w-4 h-4" />
        Project #{project.number}
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-medium">
        <Calendar className="w-4 h-4 text-blue-500" />
        <span>{project.date}</span>
      </div>

      {/* Title with Gradient */}
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
        {project.title}
      </h3>

      {/* Achievement */}
      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {project.achievement}
      </p>

      {/* Blog Link */}
      <a
        href={`/projects/${project.slug}`}
        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-all group"
      >
        <span>Read Full Story</span>
        <ExternalLink className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
      </a>

      {/* Sparkle Effect */}
      {isHovered && (
        <div className="absolute top-4 right-4">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
      )}

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}

// ProjectTimeline Component
function ProjectTimeline({ projects }: { projects: Project[] }) {
  const [visibleStations, setVisibleStations] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleStations((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.station-marker').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="relative pb-24">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-purple-50/30 to-pink-50/30 pointer-events-none rounded-3xl" />
      
      {/* Main Vertical Track - Desktop */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 transform -translate-x-1/2 hidden md:block shadow-lg" />
      
      {/* Animated Glow Effect on Track */}
      <div className="absolute left-1/2 top-0 w-2 h-32 bg-gradient-to-b from-blue-500 to-transparent transform -translate-x-1/2 hidden md:block animate-pulse blur-sm" />
      
      {/* Railway Ties - Decorative */}
      <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 hidden md:block pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-20 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30"
            style={{
              top: `${i * 4}%`,
              left: '-40px',
            }}
          />
        ))}
      </div>

      {/* Mobile Track */}
      <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 md:hidden shadow-lg" />

      {/* Start Marker */}
      <div className="flex justify-center mb-16">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-white shadow-2xl flex items-center justify-center animate-bounce">
            <Target className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              Journey Begins
            </span>
          </div>
        </div>
      </div>

      {/* Project Milestones */}
      <div className="space-y-32 md:space-y-40 mt-24">
        {projects.map((project, index) => {
          const isLeft = index % 2 === 0;
          const isVisible = visibleStations.has(index);

          return (
            <div
              key={project.id}
              data-index={index}
              className="station-marker relative"
            >
              {/* Station Circle with Pulse Animation */}
              <div
                className={`absolute top-8 md:left-1/2 left-10 md:transform md:-translate-x-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
              >
                <div className="relative">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 blur-xl opacity-50 animate-pulse" />
                  
                  {/* Main Circle */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-4 border-blue-500 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-inner">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" style={{ animationDuration: '2s' }} />
                </div>
              </div>

              {/* Connecting Line with Gradient */}
              <div
                className={`hidden md:block absolute top-16 h-1 bg-gradient-to-r transition-all duration-700 ${
                  isLeft
                    ? 'left-12 right-1/2 from-blue-400 via-purple-400 to-gray-300 mr-12'
                    : 'right-12 left-1/2 from-gray-300 via-purple-400 to-blue-400 ml-12'
                } ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                style={{ transformOrigin: isLeft ? 'right' : 'left' }}
              />

              {/* Project Card */}
              <div
                className={`relative transition-all duration-700 ${
                  isLeft
                    ? 'md:pr-[52%] pl-20 md:pl-0'
                    : 'md:pl-[52%] pl-20 md:pr-0'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <ProjectMilestoneCard 
                  project={project} 
                  index={index}
                  isLeft={isLeft}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* End Marker with Achievement Badge */}
      <div
        className={`flex justify-center mt-24 transition-all duration-700 ${
          visibleStations.size === projects.length ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-4 border-white shadow-2xl flex items-center justify-center transform hover:rotate-12 transition-transform">
            <Award className="w-14 h-14 text-white" />
          </div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              Current Achievement
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-20 px-4 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              Professional Journey
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Airavat Security Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the timeline of achievements, innovations, and milestones that define my professional journey.
          </p>
        </div>

        {/* Timeline */}
        <ProjectTimeline projects={projects} />

        {/* Footer Note */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>✨ This timeline is dynamically fetched from the database and can be managed by admins</p>
        </div>
      </div>
    </div>
  );
}
