const { useState, useEffect } = React;

// Icon components
const Icon = ({ name, ...props }) => {
  useEffect(() => {
    lucide.createIcons();
  }, []);
  return React.createElement('i', { 'data-lucide': name, ...props });
};

function KFSWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllReferences, setShowAllReferences] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    propertyType: '',
    message: '',
    files: []
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    lucide.createIcons();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    lucide.createIcons();
  }, [menuOpen, showAllReferences, submitStatus, quoteForm.files]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm({ ...quoteForm, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setQuoteForm({ ...quoteForm, files: files });
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    
    if (!quoteForm.name || !quoteForm.email || !quoteForm.phone || 
        !quoteForm.service || !quoteForm.propertyType || !quoteForm.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    setSubmitStatus('submitting');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus('success');
    
    setTimeout(() => {
      const successElement = document.getElementById('success-message');
      if (successElement) {
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    setQuoteForm({
      name: '',
      email: '',
      phone: '',
      service: '',
      propertyType: '',
      message: '',
      files: []
    });
    
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
    
    setTimeout(() => {
      setSubmitStatus(null);
    }, 8000);
  };

  const isFormValid = () => {
    return quoteForm.name && quoteForm.email && quoteForm.phone && 
           quoteForm.service && quoteForm.propertyType && quoteForm.message;
  };

  const services = [
    { name: 'Plumbing & Electrical', desc: 'Repairs, installations, inspections, and emergency call-outs.' },
    { name: 'Painting', desc: 'Interior and exterior painting for maintenance and renovations.' },
    { name: 'Waterproofing', desc: 'Long-term protection against leaks and water damage.' },
    { name: 'Gas Services', desc: 'Safe, compliant gas installations and servicing.' },
    { name: 'Preventative Maintenance', desc: 'Scheduled inspections and proactive maintenance to reduce downtime.' },
    { name: 'Security & CCTV', desc: 'Installation and maintenance of access control and surveillance systems.' },
    { name: 'Renovations & Building', desc: 'Small to large-scale renovations, repairs, and building work.' },
    { name: 'Facilities Management', desc: 'End-to-end property and facilities management solutions.' }
  ];

  const references = [
    { name: 'Gweniffer', text: 'Outstanding professionalism, reliability, and quality workmanship across renovations, electrical, painting, plumbing, and general maintenance.' },
    { name: 'Athena', text: 'Always punctual, competitively priced, and willing to assist with additional work beyond scope.' },
    { name: 'Gary', text: 'Professional, trustworthy, and experienced team with excellent communication.' },
    { name: 'Carl', text: 'Excellent service across multiple residential properties for over five years.' },
    { name: 'Kerri', text: 'Efficient, extremely reliable staff. Highly recommended.' },
    { name: 'Jason', text: 'Consistently high standards and dependable support beyond contract requirements.' }
  ];

  const benefits = [
    { title: 'Cost Efficient', desc: 'Reduced overheads, preventative maintenance, and predictable budgeting.' },
    { title: 'Experienced Team', desc: 'Skilled professionals with deep knowledge of property maintenance.' },
    { title: 'Single Point of Contact', desc: 'Clear communication, faster response times, and streamlined coordination.' },
    { title: 'Higher Property Value', desc: 'Consistent standards that protect and enhance asset value.' },
    { title: 'Tenant Satisfaction', desc: 'Reliable service delivery that improves comfort and retention.' },
    { title: 'Time Saving', desc: 'We manage the details so owners can focus on priorities.' }
  ];

  const management = [
    { title: 'Planning & Inspections', desc: 'Structured maintenance planning with routine inspections to identify issues early.' },
    { title: 'Coordination & Reporting', desc: 'Single point of contact managing contractors, timelines, and reporting.' },
    { title: 'Proactive Maintenance', desc: 'Preventative approach that minimizes disruption and extends asset lifespan.' }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">KFS</span>
              </div>
              <span className="text-white font-bold text-sm md:text-xl">Key Facility Solutions</span>
            </div>
            
            <div className="hidden lg:flex space-x-6">
              <button onClick={() => scrollToSection('home')} className="text-cyan-400 hover:text-cyan-300 transition">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-cyan-400 transition">About</button>
              <button onClick={() => scrollToSection('management')} className="text-white hover:text-cyan-400 transition">Management</button>
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-cyan-400 transition">Services</button>
              <button onClick={() => scrollToSection('whyus')} className="text-white hover:text-cyan-400 transition">Why Us</button>
              <button onClick={() => scrollToSection('references')} className="text-white hover:text-cyan-400 transition">References</button>
              <button onClick={() => scrollToSection('gallery')} className="text-white hover:text-cyan-400 transition">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-cyan-400 transition">Contact</button>
            </div>

            <button onClick={() => scrollToSection('quote')} className="hidden md:block px-4 md:px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm md:text-base rounded-lg hover:from-cyan-600 hover:to-teal-600 transition font-semibold">
              Get a Quote
            </button>

            <button 
              className="lg:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-slate-800 border-t border-cyan-500/20">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-cyan-400 hover:text-cyan-300 py-2">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-white hover:text-cyan-400 py-2">About</button>
              <button onClick={() => scrollToSection('management')} className="block w-full text-left text-white hover:text-cyan-400 py-2">Management</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-white hover:text-cyan-400 py-2">Services</button>
              <button onClick={() => scrollToSection('whyus')} className="block w-full text-left text-white hover:text-cyan-400 py-2">Why Us</button>
              <button onClick={() => scrollToSection('references')} className="block w-full text-left text-white hover:text-cyan-400 py-2">References</button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left text-white hover:text-cyan-400 py-2">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-white hover:text-cyan-400 py-2">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
            Complete Property Maintenance,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Managed Properly
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl mb-6 md:mb-10 max-w-3xl mx-auto px-4">
            One trusted partner for facilities management, repairs, preventative maintenance, and renovations across South Africa.
          </p>
          <button onClick={() => scrollToSection('quote')} className="inline-block px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-base md:text-lg rounded-lg hover:from-cyan-600 hover:to-teal-600 transition font-semibold">
            Request a Quote
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">
            About <span className="text-cyan-400">Us</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                <span className="font-bold text-white">Key Facility Solutions</span> offers over <span className="font-bold text-cyan-400">60 years of collective industry experience</span>, providing seamless maintenance and building solutions.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                We eliminate the hassle of coordinating multiple contractors by offering <span className="font-bold text-cyan-400">complete turnkey services under one roof</span>.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Our team ensures your property operates optimally in terms of <span className="font-bold text-white">functionality, safety, and aesthetics</span>.
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                From routine upkeep to emergency repairs, we handle <span className="font-bold text-cyan-400">electrical, plumbing, aircon, waterproofing</span>, and more.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Trust us to enhance tenant satisfaction and prolong the lifespan of your building with our expertise and commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section id="management" className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center">
            How We Manage <span className="text-cyan-400">Your Property</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 text-base md:text-lg">Management</p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {management.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 md:p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500/50 transition">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center">
            All Services <span className="text-cyan-400">Under One Roof</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 text-base md:text-lg">Services</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 md:p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">{service.name}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="whyus" className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center">
            Why Choose <span className="text-cyan-400">Us</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 text-base md:text-lg">Practical benefits for property owners</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 md:p-6 rounded-xl border border-cyan-500/30">
                <div className="flex items-center mb-3">
                  <Icon name="check-circle" className="text-cyan-400 mr-3 flex-shrink-0" size={20} />
                  <h3 className="text-lg md:text-xl font-bold text-white">{benefit.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base ml-8">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="references" className="py-12 md:py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center">
            Client <span className="text-cyan-400">References</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 text-sm md:text-lg px-4">
            Trusted by clients for professional, reliable property maintenance services
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {references.slice(0, showAllReferences ? references.length : 3).map((ref, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 md:p-6 rounded-xl border border-cyan-500/30">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="star" className="text-cyan-400 fill-cyan-400" size={16} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed italic text-sm md:text-base">"{ref.text}"</p>
                <p className="text-white font-semibold text-sm md:text-base">— {ref.name}</p>
              </div>
            ))}
          </div>
          
          {!showAllReferences && (
            <div className="text-center">
              <button 
                onClick={() => setShowAllReferences(true)}
                className="px-6 md:px-8 py-2 md:py-3 border-2 border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition font-semibold text-sm md:text-base"
              >
                See More References
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center">
            Our Work <span className="text-cyan-400">In Action</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 text-base md:text-lg">Gallery</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
              'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
              'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600',
              'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
              'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600',
              'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
              'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600'
            ].map((img, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 transition">
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 text-base md:text-lg">
            Request a quote or ask us a question
          </p>
          
          <div className="bg-slate-900 p-6 md:p-8 rounded-xl border border-cyan-500/30 space-y-5 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Contact Details</h3>
            
            <div className="flex items-start space-x-3 md:space-x-4">
              <Icon name="phone" className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-400 text-xs md:text-sm mb-1">Phone</p>
                <a href="tel:0698469293" className="text-white font-semibold text-sm md:text-base hover:text-cyan-400 transition">069 846 9293</a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 md:space-x-4">
              <Icon name="message-circle" className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-400 text-xs md:text-sm mb-1">WhatsApp</p>
                <a href="https://wa.me/27698469293" target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-sm md:text-base hover:text-cyan-400 transition">069 846 9293</a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 md:space-x-4">
              <Icon name="mail" className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-400 text-xs md:text-sm mb-1">Email</p>
                <a href="mailto:rcward2013@gmail.com" className="text-white font-semibold text-sm md:text-base hover:text-cyan-400 transition break-all">rcward2013@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 md:space-x-4">
              <Icon name="map-pin" className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-400 text-xs md:text-sm mb-1">Address</p>
                <p className="text-white font-semibold text-sm md:text-base">4 Willow Road<br />Blouberg Rise</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 md:space-x-4">
              <Icon name="clock" className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-400 text-xs md:text-sm mb-1">Working Hours</p>
                <p className="text-white font-semibold text-sm md:text-base">8:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Form Section */}
      <section id="quote" className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center">
            Request a <span className="text-cyan-400">Quote</span>
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 text-base md:text-lg">
            Fill out the form below and we'll get back to you with a detailed quote
          </p>

          <div className="bg-slate-900 p-6 md:p-8 rounded-xl border border-cyan-500/30">
            {submitStatus === 'success' && (
              <div id="success-message" className="mb-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-6 flex items-start space-x-4 animate-pulse">
                <Icon name="check-circle" className="text-green-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Quote Request Submitted Successfully!</h3>
                  <p className="text-gray-300 mb-2">Thank you for your quote request. We've received your information and will get back to you within 24 hours.</p>
                  <p className="text-gray-400 text-sm">A confirmation email has been sent to your email address.</p>
                </div>
              </div>
            )}

            <div className="space-y-5 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm md:text-base">Phone Number *</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={quoteForm.phone}
                    onChange={handleQuoteChange}
                    required
                    placeholder="069 123 4567"
                    className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm md:text-base">Service Required *</label>
                  <select
                    name="service"
                    value={quoteForm.service}
                    onChange={handleQuoteChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-sm md:text-base"
                  >
                    <option value="">Select a service</option>
                    <option value="plumbing-electrical">Plumbing & Electrical</option>
                    <option value="painting">Painting</option>
                    <option value="waterproofing">Waterproofing</option>
                    <option value="gas-services">Gas Services</option>
                    <option value="preventative-maintenance">Preventative Maintenance</option>
                    <option value="security-cctv">Security & CCTV</option>
                    <option value="renovations">Renovations & Building</option>
                    <option value="facilities-management">Facilities Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm md:text-base">Property Type *</label>
                <select
                  name="propertyType"
                  value={quoteForm.propertyType}
                  onChange={handleQuoteChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-sm md:text-base"
                >
                  <option value="">Select property type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm md:text-base">Project Details *</label>
                <textarea
                  name="message"
                  value={quoteForm.message}
                  onChange={handleQuoteChange}
                  required
                  rows="5"
                  placeholder="Please describe your project requirements, timeline, and any specific details..."
                  className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm md:text-base"
                ></textarea>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm md:text-base">Attach Files (Optional)</label>
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-8 bg-slate-800 border-2 border-dashed border-cyan-500/30 rounded-lg cursor-pointer hover:border-cyan-500/50 transition"
                  >
                    <div className="text-center">
                      <Icon name="upload" className="text-cyan-400 mx-auto mb-2" size={32} />
                      <p className="text-white font-semibold mb-1 text-sm md:text-base">Click to upload files</p>
                      <p className="text-gray-400 text-xs md:text-sm">Images, PDFs, or documents (Max 10MB each)</p>
                    </div>
                  </label>
                </div>
                {quoteForm.files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {quoteForm.files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm bg-slate-800 p-2 rounded">
                        <Icon name="file-text" className="text-cyan-400" size={16} />
                        <span className="text-gray-300">{file.name}</span>
                        <span className="text-gray-500 text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={handleQuoteSubmit}
                disabled={submitStatus === 'submitting' || !isFormValid()}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition font-semibold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Quote Request'}
              </button>

              {!isFormValid() && (
                <p className="text-amber-400 text-xs md:text-sm text-center">
                  * Please fill in all required fields to submit
                </p>
              )}

              <p className="text-gray-400 text-xs md:text-sm text-center">
                By submitting this form, you agree to be contacted regarding your quote request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-cyan-500/20 py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h4 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3">Key Facility Solutions</h4>
              <p className="text-gray-400 text-sm md:text-base">Professional facilities and maintenance services.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3">Contact</h4>
              <a href="mailto:howard@keyfs.co.za" className="text-gray-400 text-sm md:text-base hover:text-cyan-400 transition">Email: howard@keyfs.co.za</a>
            </div>
            <div>
              <h4 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3">Legal</h4>
              <p className="text-gray-400 text-sm md:text-base">© 2025 Key Facility Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 md:p-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full shadow-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <Icon name="arrow-up" size={24} />
        </button>
      )}
    </div>
  );
}

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<KFSWebsite />);-2 gap-5 md:gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm md:text-base">Full Name *</label>
                  <input 
                    type="text"
                    name="name"
                    value={quoteForm.name}
                    onChange={handleQuoteChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm md:text-base">Email Address *</label>
                  <input 
                    type="email"
                    name="email"
                    value={quoteForm.email}
                    onChange={handleQuoteChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols