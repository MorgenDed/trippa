import React from 'react';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Neem Contact Op</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <p className="text-lg text-gray-700 mb-6 text-center">
          Heb je een vraag over je bestelling of over een van onze deals? Het team van Trippa staat voor je klaar!
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="bg-tripper-pink/10 p-4 rounded-full mb-4">
              <Phone className="h-8 w-8 text-tripper-pink" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bellen</h3>
            <p className="text-gray-600 mb-2">085 - 401 05 89</p>
            <p className="text-sm text-gray-500">Dagelijks 08:30 - 17:00</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="bg-tripper-pink/10 p-4 rounded-full mb-4">
              <Mail className="h-8 w-8 text-tripper-pink" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-2">support@trippa.online</p>
            <p className="text-sm text-gray-500">Wij reageren zo snel mogelijk</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="bg-tripper-pink/10 p-4 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-tripper-pink" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Adres</h3>
            <p className="text-gray-600">Zijldijk 24B</p>
            <p className="text-gray-600">2352 AB Leiderdorp</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <Clock className="h-5 w-5" /> Openingstijden
        </h3>
        <p className="text-blue-700">
          Onze klantenservice is dagelijks geopend van 08:30 tot 17:00 uur. Ook in het weekend!
        </p>
      </div>
    </div>
  );
}
