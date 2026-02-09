import React from 'react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Het Verhaal van Trippa</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Op Trippa vind je de leukste deals voor de beste prijs. Ga met Trippa erop uit en geniet van pretparken, dierentuinen, sauna's, restaurants en nog veel meer. Geniet van de beste deals met vrienden en familie zonder te veel te betalen.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Op Trippa vind je alleen deals die wij zelf ook zouden willen ervaren. Door samen te werken met bekende merken ben je verzekerd van een perfect dagje weg.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Je koopt een deal op Trippa makkelijk en kosteloos. Stel zelf de deal samen, kies opties en kies het aantal tickets. Bij Trippa betaal je geen boeking- en/of administratiekosten.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-tripper-pink">Onze Gegevens</h2>
          <ul className="space-y-3 text-gray-600">
            <li><strong>Trippa B.V.</strong></li>
            <li>Zijldijk 24B</li>
            <li>2352 AB Leiderdorp</li>
            <li>Nederland</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-tripper-pink">Administratieve Details</h2>
          <ul className="space-y-3 text-gray-600">
            <li><strong>KVK:</strong> 68847130</li>
            <li><strong>BTW:</strong> NL857616262B01</li>
            <li><strong>Tel:</strong> 085 - 401 05 89</li>
            <li><strong>Email:</strong> support@trippa.online</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
