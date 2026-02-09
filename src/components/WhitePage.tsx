
import React from 'react';
import { MapPin, Camera, Coffee, Book } from 'lucide-react';

export default function WhitePage() {
  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="font-serif text-2xl font-bold tracking-tight text-gray-900">
            Dutch<span className="text-blue-600">Journeys</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Destinations</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Culture</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Food</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-[500px] bg-gray-100 overflow-hidden">
        <img 
          src="/images/deals/roompot.jpg" 
          alt="Dutch Nature" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-md">
              Explore the Netherlands
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto font-light drop-shadow-sm">
              A personal guide to the hidden gems, culture, and stories of the Low Countries.
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Stories</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Article 1 */}
          <article className="group cursor-pointer">
            <div className="h-64 rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
              <img 
                src="/images/deals/photo-course.jpg" 
                alt="Photography" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">
              <Camera size={14} />
              <span>Photography</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              Capturing the Dutch Light
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tips and tricks for photographing the unique landscapes and lighting of the Netherlands.
            </p>
          </article>

          {/* Article 2 */}
          <article className="group cursor-pointer">
            <div className="h-64 rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
              <img 
                src="/images/deals/fletcher.jpg" 
                alt="Architecture" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">
              <MapPin size={14} />
              <span>City Guide</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              Historic Hotels & Stays
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Experience history by staying in some of the most beautiful renovated buildings in the country.
            </p>
          </article>

          {/* Article 3 */}
          <article className="group cursor-pointer">
            <div className="h-64 rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
              <img 
                src="/images/deals/wine-tasting.jpg" 
                alt="Food & Drink" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">
              <Coffee size={14} />
              <span>Lifestyle</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              Culinary Secrets
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Discovering the best local flavors, from cheese markets to hidden wine cellars.
            </p>
          </article>
        </div>
      </main>

      {/* About Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Book className="mx-auto text-blue-600 mb-6" size={40} />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Blog</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Welcome to DutchJourneys. I'm a travel enthusiast sharing my love for the Netherlands. 
            From bustling cities to quiet villages, I document my experiences to help you plan your perfect trip.
            This site is a personal project dedicated to sustainable tourism and cultural exchange.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
            Read More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="text-white font-bold mb-4">DutchJourneys</h4>
            <p>© 2024 All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p>info@dutchjourneys.local</p>
            <p>Amsterdam, Netherlands</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <p className="hover:text-white cursor-pointer">Privacy Policy</p>
            <p className="hover:text-white cursor-pointer">Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
