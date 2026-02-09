import React from 'react';
import { Briefcase, ArrowRight, Star } from 'lucide-react';

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Carrière bij Trippa</h1>
        <p className="text-xl text-gray-600">
          Wij zijn continu op zoek naar superhelden! 🚀
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Ons Team</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Je werkt nauw samen met jonge en enthousiaste collega’s in een dynamische branche met een hoge mate van zelfstandigheid en verantwoordelijkheid. Meedenken, initiatief tonen en snel schakelen wordt zeker gewaardeerd binnen onze organisatie. Dagelijks wordt hard gewerkt om Trippa.nl nog succesvoller te maken!
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Openstaande vacatures</h2>
        
        {/* Job Card 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-tripper-pink transition-colors">Online Content Creator</h3>
              <p className="text-gray-500">Leiderdorp • Fulltime</p>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-tripper-pink transition-colors" />
          </div>
        </div>

        {/* Job Card 2 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-tripper-pink transition-colors">Local Sales Accountmanager</h3>
              <p className="text-gray-500">Leiderdorp • Fulltime</p>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-tripper-pink transition-colors" />
          </div>
        </div>

         {/* Job Card 3 */}
         <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-tripper-pink transition-colors">Business Controller</h3>
              <p className="text-gray-500">Leiderdorp • Fulltime</p>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-tripper-pink transition-colors" />
          </div>
        </div>
      </div>

      <div className="mt-12 bg-tripper-pink/5 rounded-xl p-8 text-center">
        <div className="inline-block bg-white p-3 rounded-full shadow-sm mb-4">
          <Star className="h-8 w-8 text-tripper-pink" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Open Sollicitatie?</h3>
        <p className="text-gray-600 mb-6">
          Wij staan altijd open voor talent! Stuur een open sollicitatie met je CV en motivatie naar Ellen Berk.
        </p>
        <a 
          href="mailto:werken@tripper.nl" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-tripper-pink hover:bg-tripper-pink-dark transition-colors"
        >
          <Briefcase className="mr-2 h-5 w-5" />
          Mail je sollicitatie
        </a>
      </div>
    </div>
  );
}
