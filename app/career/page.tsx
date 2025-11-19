'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function CareerPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    position: '',
    preferredLocation: '',
    joinDate: '',
    shift: 'any',
    education: '',
    experience: '',
    exServiceman: false,
    previousWork: '',
    languages: [],
    skills: '',
    whyJoin: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/inquiries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'career',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: `Career Application\n\nPosition: ${formData.position}\nPreferred Location: ${formData.preferredLocation}\nJoin Date: ${formData.joinDate}\nShift: ${formData.shift}\nEducation: ${formData.education}\nExperience: ${formData.experience}\nEx-Serviceman: ${formData.exServiceman ? 'Yes' : 'No'}\nPrevious Work: ${formData.previousWork}\nSkills: ${formData.skills}\nWhy Join: ${formData.whyJoin}\nDOB: ${formData.dob}\nAddress: ${formData.address}`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Application submitted successfully! Our HR team will contact you soon.');
        // Reset form
        setFormData({
          fullName: '',
          dob: '',
          email: '',
          phone: '',
          address: '',
          position: '',
          preferredLocation: '',
          joinDate: '',
          shift: 'any',
          education: '',
          experience: '',
          exServiceman: false,
          previousWork: '',
          languages: [],
          skills: '',
          whyJoin: '',
        });
      } else {
        toast.error(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-22 h-22">
                <Image src="/logo.png" alt="Airavat Security" fill className="object-contain" />
              </div>
              <span className="text-xl font-heading font-bold text-[#040936] group-hover:text-[#0a1147] transition-colors">
                Airavat Security Service
              </span>
            </Link>

            <Link
              href="/"
              className="px-6 py-2 bg-[#040936] text-white rounded-lg font-semibold hover:bg-[#0a1147] transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Career Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h1 className="text-5xl font-heading font-bold text-[#040936] tracking-tight mb-4">
              Join Our Team
            </h1>
            <p className="text-gray-600 text-[17px] max-w-3xl mx-auto leading-relaxed">
              Build a rewarding career with Airavat Security Service. Join a team of dedicated professionals committed to excellence in security services across Gujarat.
            </p>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            className="mb-16 bg-linear-to-br from-[#040936] to-[#0a1147] p-12 rounded-2xl text-white relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >

            <div className="text-center relative z-10">
              <h2 className="text-3xl font-heading font-bold mb-4 tracking-tight">
                Be Part of Something Greater
              </h2>
              <p className="text-[17px] text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
                At Airavat Security Service, we're not just building a workforce—we're building a family of dedicated professionals who believe in discipline, integrity, and service excellence.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mt-10">
                {[
                  { number: '500+', label: 'Team Members' },
                  { number: '24/7', label: 'Support System' },
                  { number: '15+', label: 'Years Experience' },
                  { number: '100%', label: 'Job Security' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all duration-300">
                    <p className="text-4xl font-bold text-[#dec3a0] mb-2">{stat.number}</p>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Why Work With Us */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <h2 className="text-3xl font-heading font-bold text-[#040936] tracking-tight mb-8 text-center">
              Why Choose Airavat?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: 'Professional Training',
                  desc: 'Comprehensive training programs led by ex-servicemen covering security protocols and emergency response.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  title: 'Career Growth',
                  desc: 'Clear advancement paths from guard to supervisor to management roles with promotion opportunities.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Competitive Salary',
                  desc: 'Fair compensation with timely payments, overtime benefits, and performance-based incentives.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Job Security',
                  desc: 'Stable employment with long-term contracts, PF/ESI benefits, and insurance coverage.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: 'Respectful Culture',
                  desc: 'Work alongside ex-military professionals in an environment built on discipline and respect.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  ),
                  title: 'Modern Equipment',
                  desc: 'Access to state-of-the-art security equipment, uniforms, and communication devices.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm p-6 rounded-lg border-2 border-gray-200 hover:border-[#040936] hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                  variants={fadeInUp}
                >
                  {/* Flag Image - Top Left Corner */}
                  <div className="absolute top-0 left-0 w-12 h-22 z-10">
                    <Image src="/Flag.png" alt="" fill className="object-contain" />
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-22 z-10">
                    <Image src="/Flag.png" alt="" fill className="object-contain" />
                  </div>

                  <div className="w-16 h-16 bg-[#040936] rounded-lg flex items-center justify-center mb-4 mx-auto text-white mt-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-[#040936] mb-3 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-[15px] text-gray-700 leading-relaxed text-center">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            id="apply"
            className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl border-2 border-gray-200 shadow-xl relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            {/* Decorative Flags on Application Form */}
            <div className="absolute top-0 left-0 w-16 h-30 z-10">
              <Image src="/Flag.png" alt="" fill className="object-contain" />
            </div>
            <div className="absolute top-0 right-0 w-16 h-30 z-10">
              <Image src="/Flag.png" alt="" fill className="object-contain" />
            </div>

            <div className="text-center mb-10 pt-6">
              <h2 className="text-3xl font-heading font-bold text-[#040936] mb-3">
                Apply for a Position
              </h2>
              <p className="text-gray-600 text-[16px] max-w-2xl mx-auto">
                Fill out the form below and our HR team will contact you within 2-3 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-heading font-bold text-[#040936] mb-4 pb-2 border-b-2 border-gray-200">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] text-[#040936] bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] text-[#040936] bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] text-[#040936] bg-white"
                      placeholder="10-digit number"
                    />
                  </div>
                  <div>
                    <label className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Position <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] text-[#040936] bg-white"
                    >
                      <option value="">Select position</option>
                      <option value="security-guard">Security Guard</option>
                      <option value="supervisor">Security Supervisor</option>
                      <option value="cctv">CCTV Operator</option>
                      <option value="housekeeping">Housekeeping Staff</option>
                      <option value="chief-security-officer">Chief Security Officer</option>
                      <option value="field-security-officer">Field Security Officer</option>
                      <option value="bouncer">Bouncer</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Why do you want to join? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="whyJoin"
                      required
                      rows={4}
                      value={formData.whyJoin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] text-[#040936] bg-white resize-none"
                      placeholder="Tell us why you're interested..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-6">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#040936] text-white rounded-lg font-semibold hover:bg-[#0a1147] transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-[16px]"
                >
                  Submit Application
                </button>
              </div>
            </form>

            <div className="mt-10 p-6 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Questions about the application?</span>
              </p>
              <p className="text-sm text-gray-600">
                Call us at <a href="tel:+919913136994" className="text-[#040936] font-semibold hover:underline">+91 9913136994</a> or email{' '}
                <a href="mailto:airavats1@gmail.com" className="text-[#040936] font-semibold hover:underline">airavats1@gmail.com</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
