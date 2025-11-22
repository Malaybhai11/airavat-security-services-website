'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { StructuredData } from './components/StructuredData';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

// Optimized animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
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

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth scroll and loading effect
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    setTimeout(() => setIsLoading(false), 500);

    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (token && name && email) {
      setIsLoggedIn(true);
      setUserName(name);
      setFormData(prev => ({
        ...prev,
        name: name,
        email: email
      }));
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -80% 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/inquiries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'service',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Service: ${formData.service}\n\nMessage: ${formData.message}`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Inquiry submitted successfully! We will contact you soon.');
        setFormData({ name: formData.name, email: formData.email, phone: '', service: '', message: '' });
        // Optionally redirect to success page
        // window.location.href = `/inquiry/${data.inquiryId}`;
      } else {
        toast.error(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserName('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-white relative">
      <StructuredData />
      {/* Main Content Wrapper */}
      <div className="relative z-10">
        {/* Skip to main content - Accessibility */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[#040936] text-white px-4 py-2 rounded z-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#040936]/50"
        >
          Skip to main content
        </a>

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#040936] origin-left z-60"
          style={{ scaleX }}
          aria-hidden="true"
        />

        {/* Navbar */}
        <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50" role="navigation" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <motion.a
                href="/admin"
                className="flex items-center space-x-3 group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="Airavat Security Service Logo"
                    width={78}
                    height={78}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    priority
                  />
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-[#040936] group-hover:text-[#0a1147] transition-colors tracking-tight">
                    AIRAVAT
                  </div>
                  <div className="text-xs text-gray-600">
                    सर्वदा शक्तिशाली
                  </div>
                </div>
              </motion.a>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8 items-center">
                {['Home', 'About', 'Services'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`relative text-gray-700 font-medium text-[15px] transition-colors duration-300 hover:text-[#040936] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded px-2 py-1 ${activeSection === item.toLowerCase() ? 'text-[#040936]' : ''
                      }`}
                    aria-current={activeSection === item.toLowerCase() ? 'page' : undefined}
                  >
                    {item}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#040936] transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                  </a>
                ))}
                {/* Career link - Navigate to Separate Page */}

                <Link
                  href="/career"
                  className="relative text-gray-700 font-medium text-[15px] transition-colors duration-300 hover:text-[#040936] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded px-2 py-1"
                >
                  Career
                  <span className="absolute bottom-0 left-0 h-0.5 bg-[#040936] transition-all duration-300 w-0 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/projects"
                  className="relative text-gray-700 font-medium text-[15px] transition-colors duration-300 hover:text-[#040936] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded px-2 py-1"
                >
                  Projects
                  <span className="absolute bottom-0 left-0 h-0.5 bg-[#040936] transition-all duration-300 w-0 group-hover:w-full"></span>
                </Link>
                <a
                  href="#contact"
                  className={`relative text-gray-700 font-medium text-[15px] transition-colors duration-300 hover:text-[#040936] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded px-2 py-1 ${activeSection === 'contact' ? 'text-[#040936]' : ''
                    }`}
                  aria-current={activeSection === 'contact' ? 'page' : undefined}
                >
                  Contact
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#040936] transition-all duration-300 ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 hover:text-[#040936] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded p-2"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  id="mobile-menu"
                  className="md:hidden pb-4 border-t overflow-hidden bg-white/95 backdrop-blur-sm"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {['Home', 'About', 'Services'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 text-gray-700 hover:text-[#040936] hover:pl-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded ${activeSection === item.toLowerCase() ? 'text-[#040936] font-semibold' : ''
                        }`}
                    >
                      {item}
                    </a>
                  ))}
                  {/* Career link - Mobile */}
                  <Link
                    href="/career"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-gray-700 hover:text-[#040936] hover:pl-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded"
                  >
                    Career
                  </Link>
                  <Link
                    href="/projects"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-gray-700 hover:text-[#040936] hover:pl-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded"
                  >
                    Projects
                  </Link>
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 text-gray-700 hover:text-[#040936] hover:pl-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#040936] rounded ${activeSection === 'contact' ? 'text-[#040936] font-semibold' : ''
                      }`}
                  >
                    Contact
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>

          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >

              <motion.h1
                className="text-5xl md:text-6xl font-heading font-bold mb-6 text-[#040936] tracking-tight"
                variants={fadeInUp}
              >
                AIRAVAT SECURITY SERVICE
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-4 font-heading font-semibold tracking-wide"
                variants={fadeInUp}
              >
                "YOUR SECURITY OUR PRIORITY"
              </motion.p>
              <motion.p
                className="text-[17px] text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
                variants={fadeInUp}
              >
                Professional security solutions backed by military discipline and modern technology.
                Serving across all districts of Gujarat with 24×7 protection.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                variants={fadeInUp}
              >
                <a
                  href="#contact"
                  className="px-8 py-3.5 bg-[#040936] text-white rounded-lg font-semibold text-[15px] hover:bg-[#0a1147] transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#040936]/50 transition-all duration-300"
                >
                  Get Started
                </a>
                <a
                  href="#services"
                  className="px-8 py-3.5 bg-white text-[#040936] rounded-lg font-semibold text-[15px] border-2 border-[#040936] hover:bg-[#040936] hover:text-white transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#040936]/50 transition-all duration-300"
                >
                  Our Services
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 backdrop-blur-sm relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-heading font-bold text-[#040936] tracking-tight">
                About Us
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div
                className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#040936] transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                variants={fadeInUp}
              >
                {/* Decorative Banners */}
                <div className="absolute top-0 left-0 w-16 h-26 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute top-0 right-0 w-16 h-26 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>

                <h3 className="text-2xl font-heading font-bold text-[#040936] mb-4 tracking-tight pt-4 pl-5">Who We Are</h3>
                <p className="text-gray-700 leading-relaxed text-[16px] pl-5">
                  Airavat Security Service is a premier security solutions provider committed to ensuring
                  the safety, protection, and peace of mind of our clients. Established by a team of highly
                  disciplined and experienced professionals, we bring together the unmatched expertise of
                  ex-servicemen with strategic insights of seasoned security managers.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#040936] transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                variants={fadeInUp}
              >
                {/* Decorative Banners */}
                <div className="absolute top-0 left-0 w-16 h-26 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute top-0 right-0 w-16 h-26 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>

                <h3 className="text-2xl font-heading font-bold text-[#040936] mb-4 tracking-tight pt-4 pl-5">What We Do</h3>
                <p className="text-gray-700 leading-relaxed text-[16px] pl-5">
                  We offer comprehensive security solutions including professionally trained security guards,
                  advanced surveillance systems, modern equipment (walkie-talkies, metal detectors, X-ray scanners),
                  and customized services for industries, offices, residential complexes, and events.
                </p>
              </motion.div>
            </motion.div>

            {/* Leadership Section - ENHANCED VERSION */}
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-heading font-bold text-[#040936] tracking-tight mb-3">
                Our Leadership
              </h3>
              <p className="text-gray-600 text-[17px] max-w-3xl mx-auto leading-relaxed">
                Led by experienced professionals combining military discipline, technical expertise, and strategic business vision
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Leader 1 - Mr. Meghraj Sinh Jadeja */}
              <motion.div
                className="backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#040936] transform hover:-translate-y-4 transition-all duration-500 group relative"
                variants={fadeInUp}
              >
                {/* Decorative Banners */}
                <div className="absolute top-0 left-0 w-14 h-35 z-20">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute top-0 right-0 w-14 h-35 z-20">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>

                {/* Circular Profile Image with Enhanced Background */}
                <div className="relative h-80 bg-linear-to-b from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group-hover:from-[#040936]/5 group-hover:via-[#040936]/10 group-hover:to-[#040936]/15 transition-all duration-500">
                  {/* Decorative Ring Background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border border-gray-300/40 group-hover:border-[#040936]/20 transition-all duration-500"></div>
                    <div className="absolute w-72 h-72 rounded-full border border-gray-200/30 group-hover:border-[#040936]/15 transition-all duration-500"></div>
                  </div>

                  {/* Profile Image - Rounded/Circular */}
                  <div className="relative z-10 w-56 h-56 rounded-full overflow-hidden border-[5px] border-[#040936] shadow-2xl group-hover:scale-110 group-hover:border-[#0a1147] group-hover:shadow-[0_20px_60px_rgba(4,9,54,0.4)] transition-all duration-700">
                    <Image
                      src="/Meghraj.png"
                      alt="Mr. Meghraj Sinh Jadeja - Founder"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-7">
                  <div className="text-center mb-5 pb-5 border-b-2 border-gray-200">
                    <h4 className="text-2xl font-heading font-bold mb-2 text-[#040936] group-hover:text-[#0a1147] transition-colors duration-300">
                      Mr. Meghraj Sinh Jadeja
                    </h4>
                    <p className="text-base text-[#040936] font-bold mb-1">Founder</p>
                    <p className="text-sm text-gray-600 font-semibold flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      RETD Army Infantry
                    </p>
                  </div>

                  <p className="text-[15px] leading-relaxed text-gray-700 mb-5">
                    Founder with 17 years of distinguished service in the Indian Army Infantry (2003-2020). Built Airavat on the pillars of discipline, reliability, and vigilance, providing comprehensive security solutions including trained guards, supervisors, and advanced equipment across Gujarat.
                  </p>

                  {/* Enhanced Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-4 py-2 bg-linear-to-r from-[#040936] to-[#0a1147] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
                      Security Operations
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 text-[#040936] rounded-full text-xs font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
                      Strategic Leadership
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 text-[#040936] rounded-full text-xs font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
                      Team Building
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Leader 2 - Mr. Manthan Gadhavi */}
              <motion.div
                className="backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#040936] transform hover:-translate-y-4 transition-all duration-500 group relative"
                variants={fadeInUp}
              >
                {/* Decorative Banners */}
                <div className="absolute top-0 left-0 w-14 h-35 z-20">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute top-0 right-0 w-14 h-35 z-20">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>

                {/* Circular Profile Image with Enhanced Background */}
                <div className="relative h-80 bg-linear-to-b from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group-hover:from-[#040936]/5 group-hover:via-[#040936]/10 group-hover:to-[#040936]/15 transition-all duration-500">
                  {/* Decorative Ring Background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border border-gray-300/40 group-hover:border-[#040936]/20 transition-all duration-500"></div>
                    <div className="absolute w-72 h-72 rounded-full border border-gray-200/30 group-hover:border-[#040936]/15 transition-all duration-500"></div>
                  </div>

                  {/* Profile Image - Rounded/Circular */}
                  <div className="relative z-10 w-56 h-56 rounded-full overflow-hidden border-[5px] border-[#040936] shadow-2xl group-hover:scale-110 group-hover:border-[#0a1147] group-hover:shadow-[0_20px_60px_rgba(4,9,54,0.4)] transition-all duration-700">
                    <Image
                      src="/Manthan.png"
                      alt="Mr. Manthan Gadhavi - Founder"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-7">
                  <div className="text-center mb-5 pb-5 border-b-2 border-gray-200">
                    <h4 className="text-2xl font-heading font-bold mb-2 text-[#040936] group-hover:text-[#0a1147] transition-colors duration-300">
                      Mr. Manthan Gadhavi
                    </h4>
                    <p className="text-base text-[#040936] font-bold mb-1">Co-Founder</p>
                    <p className="text-sm text-gray-600 font-semibold flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      RETD EME Corps
                    </p>
                  </div>

                  <p className="text-[15px] leading-relaxed text-gray-700 mb-5">
                    Co-Founder with 16 years of honorable service in the Indian Army – Corps of EME (2009-2025). Brings technical operations expertise, maintenance management and security coordination precision to deliver efficient, reliable and advanced security solutions.
                  </p>

                  {/* Enhanced Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-4 py-2 bg-linear-to-r from-[#040936] to-[#0a1147] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
                      Technical Operations
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 text-[#040936] rounded-full text-xs font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
                      Logistics Management
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 text-[#040936] rounded-full text-xs font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
                      Equipment Systems
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Leader 3 - Mr. Mahavir Gadhavi */}
              <motion.div
                className="bg-linear-to-br from-white to-gray-50/80 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#040936] transform hover:-translate-y-4 transition-all duration-500 group relative"
                variants={fadeInUp}
              >
                {/* Decorative Banners */}
                <div className="absolute top-0 left-0 w-14 h-35 z-20">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute top-0 right-0 w-14 h-35 z-20">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>

                {/* Circular Profile Image with Enhanced Background */}
                <div className="relative h-80 bg-linear-to-b from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group-hover:from-[#040936]/5 group-hover:via-[#040936]/10 group-hover:to-[#040936]/15 transition-all duration-500">
                  {/* Decorative Ring Background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border border-gray-300/40 group-hover:border-[#040936]/20 transition-all duration-500"></div>
                    <div className="absolute w-72 h-72 rounded-full border border-gray-200/30 group-hover:border-[#040936]/15 transition-all duration-500"></div>
                  </div>

                  {/* Profile Image - Rounded/Circular */}
                  <div className="relative z-10 w-56 h-56 rounded-full overflow-hidden border-[5px] border-[#040936] shadow-2xl group-hover:scale-110 group-hover:border-[#0a1147] group-hover:shadow-[0_20px_60px_rgba(4,9,54,0.4)] transition-all duration-700">
                    <Image
                      src="/Mahavir.png"
                      alt="Mr. Mahavir Gadhavi"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-7">
                  <div className="text-center mb-5 pb-5 border-b-2 border-gray-200">
                    <h4 className="text-2xl font-heading font-bold mb-2 text-[#040936] group-hover:text-[#0a1147] transition-colors duration-300">
                      Mr. Mahavir Gadhavi
                    </h4>
                    <p className="text-base text-[#040936] font-bold mb-1">Director</p>
                    <p className="text-sm text-gray-600 font-semibold flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      Security Services Professional
                    </p>
                  </div>

                  <p className="text-[15px] leading-relaxed text-gray-700 mb-5">
                    I am an experienced entrepreneur and Director of AIRAVAT Security Service, dedicated to providing reliable and professional security solutions. I value strong client relationships, effective team leadership, and delivering high-quality service with trust and integrity.
                  </p>

                  {/* Enhanced Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-4 py-2 bg-linear-to-r from-[#040936] to-[#0a1147] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
                      Security Specialist
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 text-[#040936] rounded-full text-xs font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
                      Client Relations
                    </span>
                    <span className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 text-[#040936] rounded-full text-xs font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
                      Growth Management
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 backdrop-blur-sm relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-heading font-bold text-[#040936] tracking-tight">
                Our Services
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                { title: 'Security Personnel', items: ['Security Guards', 'CCTV Operators', 'Gunmen & Bodyguards', 'Night Watchmen', 'Traffic Controllers'] },
                { title: 'Hospital & Institutional', items: ['Hospital Security', 'Ward Boys & Helpers', 'Lift Operators', 'Reception Staff', 'Support Services'] },
                { title: 'Administrative Support', items: ['HR Assistants', 'Training Officers', 'Supervisors', 'Shift Coordinators', 'Office Support'] }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm p-6 rounded-lg border-2 border-gray-200 hover:border-[#040936] hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                  variants={fadeInUp}
                >
                  {/* Decorative Banners */}
                  <div className="absolute top-0 left-0 w-12 h-22 z-10">
                    <Image src="/Flag.png" alt="" fill className="object-contain" />
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-22 z-10">
                    <Image src="/Flag.png" alt="" fill className="object-contain" />
                  </div>

                  <h3 className="text-xl pl-5 font-heading font-bold text-[#040936] mb-4 group-hover:text-[#0a1147] transition-colors duration-300 tracking-tight pt-4">{service.title}</h3>
                  <ul className="space-y-2 text-gray-700 pl-5">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center hover:pl-2 transition-all duration-300 text-[15px]">
                        <span className="text-[#dec3a0] mr-2" aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Equipment Section - Clean & Professional */}
            <div className="mt-16">
              <motion.div
                className="text-center mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <h3 className="text-3xl font-heading font-bold text-[#040936] tracking-tight">
                  Advanced Security Equipment
                </h3>
                <p className="text-gray-600 mt-3 text-16px max-w-3xl mx-auto">
                  State-of-the-art security technology with professionally trained operators for comprehensive protection
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-3 gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                {[
                  {
                    title: 'Hand Metal Detectors[HMD]',
                    desc: 'Professional-grade handheld metal detectors with trained operators for quick and reliable screening at entry points and security checkpoints.',
                    features: ['Pinpoint Detection', 'Adjustable Sensitivity', 'Audio & Vibration Alert', 'Lightweight & Portable'],
                    image: '/MetalDetector.png',
                    hasImage: true
                  },
                  {
                    title: 'Door Fram Metal Detectors[DFMD]',
                    desc: 'High-sensitivity door fram detectors for large-scale entry screening with multi-zone detection and real-time alarm indicators.',
                    features: ['Multi-Zone Detection', 'Auto Calibration', 'Visual & Audio Alarms', 'Weather Resistant'],
                    image: '/GateMetalDetector.png',
                    hasImage: true
                  },
                  {
                    title: 'Walkie Talkie Communication',
                    desc: 'Professional two-way radio communication systems for instant coordination between security personnel across large premises.',
                    features: ['Long Range Coverage', 'Crystal Clear Audio', 'Emergency Channels', 'Durable & Waterproof'],
                    image: '/Walkie-Talkie.png',
                    hasImage: true
                  }
                ].map((equip, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm p-8 rounded-lg border-2 border-gray-200 hover:border-[#040936] hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                    variants={fadeInUp}
                  >
                    {/* Decorative Banners */}
                    <div className="absolute top-0 left-0 w-12 h-26 z-10">
                      <Image src="/Flag.png" alt="" fill className="object-contain" />
                    </div>
                    <div className="absolute top-0 right-0 w-12 h-26 z-10">
                      <Image src="/Flag.png" alt="" fill className="object-contain" />
                    </div>

                    {/* Equipment Image - Rounded Shape */}
                    {equip.hasImage && equip.image && (
                      <div className="mb-6 mt-4 flex items-center justify-center">
                        <div className="relative w-56 h-56 rounded-full overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 p-6 border-4 border-gray-200 group-hover:border-[#040936] transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                          <Image
                            src={equip.image}
                            alt={equip.title}
                            fill
                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                            priority
                          />
                        </div>
                      </div>
                    )}

                    <h4 className="text-xl font-heading font-bold text-[#040936] mb-3 text-center tracking-tight group-hover:text-[#0a1147] transition-colors duration-300">
                      {equip.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-600 text-center mb-5">
                      {equip.desc}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      {equip.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm text-gray-700 hover:pl-2 transition-all duration-300"
                        >
                          <span className="text-[#040936] mr-2 font-bold" aria-hidden="true">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Professional Equipment Operation & Maintenance */}
              <motion.div
                className="mt-8 bg-gray-50/95 backdrop-blur-sm p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                {/* Decorative Banners */}
                <div className="absolute top-0 left-0 w-14 h-22 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute top-0 right-0 w-14 h-22 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-6">
                  <div>
                    <h4 className="text-lg font-heading font-bold text-[#040936] mb-4 tracking-tight pl-4">
                      Professional Equipment Operation
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed pl-4">
                      All equipment is operated by certified and trained personnel who undergo regular skill development programs. Our operators are proficient in threat identification, equipment maintenance, and emergency response protocols.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold text-[#040936] mb-4 tracking-tight pl-2">
                      Maintenance & Support
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed pl-2">
                      Regular equipment calibration, preventive maintenance schedules, and 24/7 technical support ensure optimal performance. We provide complete service packages including installation, training, and ongoing technical assistance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 backdrop-blur-sm relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-heading font-bold text-[#040936] tracking-tight">
                Our Reach
              </h2>
            </motion.div>

            <motion.div
              className="bg-white/95 backdrop-blur-sm p-10 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              {/* Decorative Banners */}
              <div className="absolute top-0 left-0 w-16 h-30 z-10">
                <Image src="/Flag.png" alt="" fill className="object-contain" />
              </div>
              <div className="absolute top-0 right-0 w-16 h-30 z-10">
                <Image src="/Flag.png" alt="" fill className="object-contain" />
              </div>

              <h3 className="text-2xl font-heading font-bold text-[#040936] mb-4 text-center tracking-tight pt-4">Statewide Security Network</h3>
              <p className="text-[17px] text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto text-center">
                Our security services are now available across every district of Gujarat. With a strong network
                of trained and experienced personnel, we are fully equipped to provide reliable and professional
                security solutions in all major cities and towns of the state.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-[#040936]">
                {['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Jamnagar', 'Bhavnagar', 'Junagadh', 'Gandhinagar',
                  'Kutch', 'Anand', 'Mehsana', 'Navsari'].map((city) => (
                    <div
                      key={city}
                      className="bg-gray-50 p-3 rounded text-center border border-gray-200 hover:bg-[#040936] hover:text-white hover:border-[#040936] transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <p className="font-semibold text-[15px]">{city}</p>
                    </div>
                  ))}
              </div>

              <div className="bg-[#040936] p-8 rounded-lg text-white text-center hover:bg-[#0a1147] transition-colors duration-300">
                <h4 className="text-xl font-heading font-bold mb-3 tracking-tight">24×7 Protection & Quick Response</h4>
                <p className="leading-relaxed text-gray-300 text-[16px]">
                  We serve residential societies, corporate offices, educational institutions, industrial units,
                  and government establishments with local operational units and quick-response teams ensuring
                  efficiency and accountability.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 backdrop-blur-sm relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-heading font-bold text-[#040936] tracking-tight">
                Get In Touch
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Jamnagar Office */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm p-8 rounded-lg border border-gray-200 hover:shadow-xl hover:border-[#040936] transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                {/* Decorative Banners */}
                <div className="absolute top-0 left-0 w-14 h-22 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute top-0 right-0 w-14 h-22 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>

                <h3 className="text-xl font-heading font-bold text-[#040936] mb-6 tracking-tight pt-4 pl-5">Head Office - Jamnagar</h3>
                <div className="space-y-4">
                  <div className="flex items-start transition-all duration-300 pl-5">
                    <svg className="w-5 h-5 text-[#040936] mr-3 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-[#040936] text-[15px]">Address</p>
                      <p className="text-gray-600 text-[15px] leading-relaxed">1st Floor, Akash Complex, Nilkamal Chowk, Khodiyar Colony, Jamnagar, Gujarat - 361 006</p>
                    </div>
                  </div>

                  <div className="flex items-start transition-all duration-300 pl-5">
                    <svg className="w-5 h-5 text-[#040936] mr-3 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-[#040936] text-[15px]">Phone</p>
                      <p className="text-gray-600 text-[15px]">+91 9426865263, +91 9913136994, +91 9724954080</p>
                    </div>
                  </div>

                  <div className="flex items-start transition-all duration-300 pl-5">
                    <svg className="w-5 h-5 text-[#040936] mr-3 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-[#040936] text-[15px]">Email</p>
                      <p className="text-gray-600 text-[15px]">airavats1@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start transition-all duration-300 pl-5">
                    <svg className="w-5 h-5 text-[#040936] mr-3 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <p className="font-semibold text-[#040936] text-[15px]">Website</p>
                      <p className="text-gray-600 text-[15px]">airavatsecurity.in</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Rajkot Branch */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm p-8 rounded-lg border border-gray-200 hover:shadow-xl hover:border-[#040936] transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                {/* Decorative Banners */}
                <div className="absolute top-0 left-0 w-14 h-22 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute top-0 right-0 w-14 h-22 z-10">
                  <Image src="/Flag.png" alt="" fill className="object-contain" />
                </div>

                <h3 className="text-xl font-heading font-bold text-[#040936] mb-6 tracking-tight pt-4 pl-5">Branch Office - Rajkot</h3>
                <div className="space-y-4">
                  <div className="flex items-start transition-all duration-300 pl-5">
                    <svg className="w-5 h-5 text-[#dec3a0] mr-3 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-[#040936] text-[15px]">Address</p>
                      <p className="text-gray-600 text-[15px] leading-relaxed">409 Shasvat Space, Nana Mauva Road, Mokaji Circle, Rajkot, Gujarat</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded mt-6 hover:bg-gray-100 transition-colors duration-300">
                    <h4 className="font-bold text-[#040936] mb-3 text-[16px]">Certifications & Partnerships</h4>
                    <div className="space-y-2 text-gray-700">
                      {['GeM Registered (Government e-Marketplace)', 'Make in India Supporter', 'Swachh Bharat Initiative', '24-Hour Service Available'].map((cert, i) => (
                        <p key={i} className="flex items-center transition-all duration-300 text-[15px]">
                          <span className="text-[#dec3a0] mr-2" aria-hidden="true">✓</span>
                          {cert}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              {/* Decorative Banners */}
              <div className="absolute top-0 left-0 w-16 h-30 z-10">
                <Image src="/Flag.png" alt="" fill className="object-contain" />
              </div>
              <div className="absolute top-0 right-0 w-16 h-30 z-10">
                <Image src="/Flag.png" alt="" fill className="object-contain" />
              </div>

              <h3 className="text-4xl font-heading font-bold text-[#040936] mb-2 text-center tracking-tight pt-6">Send Enquiry</h3>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 pt-10">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isLoggedIn}
                      className="w-full px-4 py-2.5 border text-[#040936] border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all duration-300 text-[15px] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoggedIn}
                      className="w-full px-4 py-2.5 border text-[#040936] border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all duration-300 text-[15px] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-2.5 border text-[#040936] border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all duration-300 text-[15px] bg-white"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border text-[#040936] border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all duration-300 text-[15px] bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="security">Security Personnel</option>
                      <option value="industrial">Industrial Manpower</option>
                      <option value="housekeeping">Housekeeping Services</option>
                      <option value="event">Event Security</option>
                      <option value="hospital">Hospital & Institutional</option>
                      <option value="admin">Administrative Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-[15px] font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 border text-[#040936] border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all duration-300 resize-none text-[15px] bg-white"
                    placeholder="Please provide details about your security requirements..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#040936] text-white rounded-lg font-semibold hover:bg-[#0a1147] transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#040936]/50 transition-all duration-300 text-[15px]"
                >
                  Submit Enquiry
                </button>
              </form>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              className="mt-12 bg-[#040936] p-10 rounded-lg text-center text-white hover:bg-[#0a1147] transition-colors duration-300 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >

              <h3 className="text-2xl font-heading font-bold mb-3 tracking-tight pt-4">Ready to Secure Your Premises?</h3>
              <p className="text-[17px] mb-6 text-gray-300 leading-relaxed">Contact us today for a free consultation and customized security solution</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+919426865263"
                  className="px-8 py-3.5 bg-white text-[#040936] rounded-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 transition-all duration-300 text-[15px]"
                >
                  Call Now
                </a>
                <a
                  href="mailto:airavats1@gmail.com"
                  className="px-8 py-3.5 bg-[#dec3a0] text-[#040936] rounded-lg font-semibold hover:bg-[#e5cfa8] transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#dec3a0]/50 transition-all duration-300 text-[15px]"
                >
                  Send Email
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#040936] backdrop-blur-sm text-white py-12 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div>
                    <h4 className="text-xl font-heading font-bold text-[#dec3a0] tracking-tight">
                      AIRAVAT
                    </h4>
                    <p className="text-gray-400 text-xs">SECURITY SERVICE</p>
                  </div>
                </div>
                <p className="text-gray-300 text-[15px] leading-relaxed mb-3">
                  YOUR SECURITY OUR PRIORITY
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Professional security solutions with military discipline and modern technology across Gujarat.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h5 className="font-bold mb-4 text-[16px]">Quick Links</h5>
                <nav aria-label="Footer navigation">
                  <div className="space-y-2">
                    {['Home', 'About Us', 'Services', 'Career', 'Contact'].map((link) => (
                      <a
                        key={link}
                        href={`#${link.toLowerCase().replace(' ', '')}`}
                        className="block text-gray-400 hover:text-[#dec3a0] hover:pl-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dec3a0] rounded transition-all duration-300 text-[15px]"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Service Areas */}
              <div>
                <h5 className="font-bold mb-4 text-[16px]">Service Areas</h5>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-4">
                  Serving all districts of Gujarat including Ahmedabad, Rajkot, Jamnagar, and more with 24/7 security solutions.
                </p>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <svg className="w-5 h-5 text-[#dec3a0]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91 9426865263</span>
                </div>
                <a 
                  href="mailto:airavat1@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#dec3a0] transition-colors text-sm mb-6 group"
                >
                  <svg className="w-5 h-5 text-[#dec3a0]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="group-hover:underline">airavat1@gmail.com</span>
                </a>

                {/* Social Media Icons */}
                <div className="flex gap-3">
                  {/* Instagram Icon */}
                  <a
                    href="https://instagram.com/airavat_security_service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="Follow us on Instagram"
                  >
                    <div className="w-11 h-11 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-300 group-hover:border-[#dec3a0] group-hover:bg-[#dec3a0] transform group-hover:-translate-y-1 group-hover:shadow-lg">
                      <FaInstagram className="text-gray-300 text-xl transition-colors duration-300 group-hover:text-[#040936]" />
                    </div>
                  </a>

                  {/* WhatsApp Icon */}
                  <a
                    href="https://wa.me/919913136994"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="Chat with us on WhatsApp"
                  >
                    <div className="w-11 h-11 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-300 group-hover:border-[#dec3a0] group-hover:bg-[#dec3a0] transform group-hover:-translate-y-1 group-hover:shadow-lg">
                      <FaWhatsapp className="text-gray-300 text-xl transition-colors duration-300 group-hover:text-[#040936]" />
                    </div>
                  </a>
                  {/* Gmail Icon */}
                  <a
                    href="https://wa.me/919913136994"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label="Chat with us on WhatsApp"
                  >
                    <div className="w-11 h-11 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-300 group-hover:border-[#dec3a0] group-hover:bg-[#dec3a0] transform group-hover:-translate-y-1 group-hover:shadow-lg">
                      <BiLogoGmail className="text-gray-300 text-xl transition-colors duration-300 group-hover:text-[#040936]" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Information Section - UPDATED WITH EMAILS */}
            <div className="border-t border-gray-800 pt-8 pb-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Management */}
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 hover:border-[#dec3a0]/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-[#dec3a0]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <h6 className="font-bold text-[15px] text-[#dec3a0]">Managed By</h6>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#dec3a0] rounded-full mt-1.5"></span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-300 text-sm mb-1">Kedar Thakar</p>
                        <div className="flex flex-col gap-1">
                          <a
                            href="tel:+919662955278"
                            className="text-gray-400 hover:text-[#dec3a0] transition-colors text-xs flex items-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            +91 96629 55278
                          </a>
                          <a
                            href="mailto:kedarthakar5278@gmail.com"
                            className="text-gray-400 hover:text-[#dec3a0] transition-colors text-xs flex items-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            kedarthakar5278@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Development Team */}
                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 hover:border-[#dec3a0]/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-[#dec3a0]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <h6 className="font-bold text-[15px] text-[#dec3a0]">Built By</h6>
                  </div>
                  <div className="space-y-3">
                    {/* Vivek Pankhaniya */}
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#dec3a0] rounded-full mt-1.5"></span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-300 text-sm mb-1">Vivek Pankhaniya</p>
                        <div className="flex flex-col gap-1">
                          <a
                            href="tel:+919327370047"
                            className="text-gray-400 hover:text-[#dec3a0] transition-colors text-xs flex items-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            +91 9327370047
                          </a>
                          <a
                            href="mailto:vivekpankhaniya43@gmail.com"
                            className="text-gray-400 hover:text-[#dec3a0] transition-colors text-xs flex items-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            vivekpankhaniya43@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Malay Raval */}
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#dec3a0] rounded-full mt-1.5"></span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-300 text-sm mb-1">Malay Raval</p>
                        <div className="flex flex-col gap-1">
                          <a
                            href="tel:+917016870163"
                            className="text-gray-400 hover:text-[#dec3a0] transition-colors text-xs flex items-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            +91 70168 70163
                          </a>
                          <a
                            href="mailto:malay.raval11@gmail.com"
                            className="text-gray-400 hover:text-[#dec3a0] transition-colors text-xs flex items-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            malay@ledgion.in
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-gray-800 pt-6 text-center">
              <p className="text-gray-400 text-[14px]">
                © 2025 Airavat Security Service. All rights reserved. Trusted Security Solutions Across Gujarat
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
