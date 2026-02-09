export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'top-10-pretparken-nederland',
    title: 'Top 10 Pretparken in Nederland',
    excerpt: 'Ontdek de leukste pretparken van Nederland voor een geweldig dagje uit met het hele gezin.',
    content: `
      <p>Nederland is een land vol met geweldige pretparken. Of je nu op zoek bent naar spanning en sensatie of juist naar een leuk dagje uit met de allerkleinsten, er is voor ieder wat wils.</p>
      <h2>1. Efteling</h2>
      <p>De Efteling is natuurlijk het bekendste pretpark van Nederland. Met zijn sprookjesbos en spannende attracties is het een magische plek voor jong en oud.</p>
      <h2>2. Walibi Holland</h2>
      <p>Voor de echte waaghalzen is Walibi Holland the place to be. Hier vind je de snelste en hoogste achtbanen van Nederland.</p>
      <h2>3. Duinrell</h2>
      <p>Duinrell staat bekend om zijn tikibad, maar heeft ook een erg leuk pretpark. Ideaal voor een combinatie van zwemmen en attracties.</p>
      <p>Dit is slechts een greep uit het aanbod. Houd onze site in de gaten voor de beste deals voor deze parken!</p>
    `,
    image: 'https://images.unsplash.com/photo-1605548230624-8d2d639e7021?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-20',
    author: 'Lisa de Vries'
  },
  {
    slug: 'wellness-tips-voor-beginners',
    title: 'Wellness Tips voor Beginners',
    excerpt: 'Nog nooit naar de sauna geweest? Lees hier onze tips voor een ontspannen eerste keer.',
    content: `
      <p>Een dagje wellness is heerlijk ontspannend, maar als je voor het eerst gaat kan het ook best spannend zijn. Wat moet je meenemen? Wat zijn de regels? Wij helpen je op weg.</p>
      <h2>Voorbereiding</h2>
      <p>Zorg dat je voldoende water drinkt voordat je gaat. Neem een badjas, slippers en handdoeken mee (of huur ze ter plekke).</p>
      <h2>In de sauna</h2>
      <p>Begin rustig aan. Ga niet meteen in de heetste sauna zitten en blijf niet te lang. Luister goed naar je lichaam.</p>
      <h2>Na afloop</h2>
      <p>Neem na de sauna een koude douche of duik in het dompelbad om af te koelen. Rust daarna minimaal 15 minuten uit.</p>
    `,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-15',
    author: 'Mark Jansen'
  },
  {
    slug: 'goedkoop-dagje-weg',
    title: 'Goedkoop Dagje Weg: Tips & Tricks',
    excerpt: 'Bespaar op je dagje uit met deze handige bespaartips. Geniet meer voor minder!',
    content: `
      <p>Een dagje uit hoeft niet duur te zijn. Met een beetje slim plannen kun je flink besparen.</p>
      <h2>1. Boek online</h2>
      <p>Tickets aan de kassa zijn vaak duurder dan online. Bovendien vind je online vaak extra kortingen.</p>
      <h2>2. Neem je eigen lunch mee</h2>
      <p>Eten en drinken op locatie is vaak prijzig. Door je eigen broodjes en drinken mee te nemen bespaar je al snel tientallen euro's.</p>
      <h2>3. Ga met het OV of carpool</h2>
      <p>Parkeerkosten kunnen flink oplopen. Kijk of je met de trein of bus kunt gaan, of rijd samen met vrienden.</p>
      <p>En natuurlijk: check altijd Trippa.nl voor de beste deals!</p>
    `,
    image: 'https://images.unsplash.com/photo-1596435667083-29479b182748?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-10',
    author: 'Sarah Bakker'
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
