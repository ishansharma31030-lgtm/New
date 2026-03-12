// NewOrbit Services – Project Portfolio Data
// 220 projects – International portfolio across USA, UK, UAE, Singapore, Australia and more

const COMPANY = {
  name: "NewOrbit Services",
  tagline: "Engineering Tomorrow's Spaces",
  location: "Global Operations — London, New York, Dubai, Singapore",
  email: "info@neworbitservices.com",
  phone: "+44-20-7946-0958",
  website: "www.neworbitservices.com",
  social: {
    linkedin: "https://linkedin.com/company/neworbitservices",
    twitter: "https://twitter.com/neworbitservices",
    facebook: "https://facebook.com/neworbitservices",
    instagram: "https://instagram.com/neworbitservices"
  },
  founded: "2015",
  projects_delivered: "200+",
  clients_served: "150+",
  countries: "12+"
};

const CATEGORIES = [
  "BIM Solutions",
  "Scan-to-BIM",
  "Automation",
  "Structural Engineering",
  "MEP Coordination",
  "Architectural Design",
  "Infrastructure",
  "Green Building",
  "Interior Design",
  "Smart Building"
];

const STATUSES = ["Completed", "Ongoing", "Planned"];

const CLIENTS = [
  "Bechtel Corporation", "Turner Construction", "Skanska Group", "Bouygues Construction",
  "British Land", "Hines Real Estate", "Grosvenor Group", "Related Companies",
  "Berkeley Group", "Lendlease", "Brookfield Properties", "Barratt Developments",
  "CBRE Group", "JLL Real Estate", "Westfield Group", "Hammerson PLC",
  "Google Campus", "Microsoft Real Estate", "Accenture Workplace", "IBM Global Campus",
  "Mayo Clinic", "MIT Cambridge", "ETH Zurich", "Oxford University",
  "Transport for London", "Dubai Industrial City", "National Grid UK", "Environment Agency UK",
  "London Underground", "Heathrow Airport", "Dubai Tourism Authority", "NHS Foundation Trust"
];

const LOCATIONS_NEARBY = [
  "Canary Wharf, London", "Midtown East, New York", "Downtown Dubai, UAE",
  "Marina Bay, Singapore", "CBD, Sydney", "Financial District, Toronto",
  "Mayfair, London", "Silicon Valley, California",
  "Business Bay, Dubai", "Shinjuku, Tokyo", "Mitte, Berlin",
  "La Défense, Paris", "Financial Centre, Hong Kong", "Northbank, Chicago",
  "Docklands, Melbourne", "Downtown Core, Vancouver",
  "Westminster, London", "Tribeca, New York", "DIFC, Dubai",
  "Orchard Road, Singapore", "Macquarie Park, Sydney", "Waterfront, Auckland"
];

// Determine project's location from its title and client
function getProjectOrigin(p, idx) {
  const combined = (p.title + ' ' + p.client).toLowerCase();
  if (combined.includes('london') || combined.includes('heathrow') || combined.includes('uk'))     return "London, United Kingdom";
  if (combined.includes('new york') || combined.includes('manhattan') || combined.includes('nyc')) return "New York, USA";
  if (combined.includes('dubai') || combined.includes('uae'))                                       return "Dubai, UAE";
  if (combined.includes('singapore') || combined.includes('sgd'))                                  return "Singapore";
  if (combined.includes('sydney') || combined.includes('australia'))                                return "Sydney, Australia";
  if (combined.includes('toronto') || combined.includes('canada'))                                  return "Toronto, Canada";
  if (combined.includes('tokyo') || combined.includes('japan'))                                     return "Tokyo, Japan";
  if (combined.includes('berlin') || combined.includes('germany'))                                  return "Berlin, Germany";
  if (combined.includes('paris') || combined.includes('france'))                                    return "Paris, France";
  if (combined.includes('chicago') || combined.includes('illinois'))                                return "Chicago, USA";
  // Default: international location based on index
  return LOCATIONS_NEARBY[idx % LOCATIONS_NEARBY.length];
}

// Unsplash placeholder images for projects (architectural/BIM/engineering)
const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
  "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=600&q=80",
  "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
  "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=600&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=600&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
];

function getImage(idx) {
  return PROJECT_IMAGES[idx % PROJECT_IMAGES.length];
}

function getExtraImages(seed) {
  const imgs = [];
  for (let i = 0; i < 4; i++) imgs.push(getImage(seed + i + 1));
  return imgs;
}

// Generate 220 realistic projects
const rawProjects = [
  // ── BIM Solutions ──────────────────────────────────────────────────
  { id: 1,  title: "Dubai Convention Centre BIM Model",         category: "BIM Solutions",        status: "Completed", client: "Transport for London",        budget: "$540K",  year: 2022, duration: "8 months",  progress: 100 },
  { id: 2,  title: "Heathrow Terminal 5 BIM Coordination",             category: "BIM Solutions",        status: "Completed", client: "Heathrow Airport",         budget: "$1.4M",   year: 2023, duration: "14 months", progress: 100 },
  { id: 3,  title: "Dubai Industrial City Clash Detection",      category: "BIM Solutions",        status: "Completed", client: "Dubai Industrial City",          budget: "$336K",  year: 2021, duration: "6 months",  progress: 100 },
  { id: 4,  title: "MIT Cambridge Campus BIM Integration",         category: "BIM Solutions",        status: "Ongoing",   client: "MIT Cambridge",               budget: "$624K",  year: 2024, duration: "12 months", progress: 65  },
  { id: 5,  title: "London Crossrail Phase 2 BIM Coordination",      category: "BIM Solutions",        status: "Ongoing",   client: "London Underground",         budget: "$2.2M",   year: 2024, duration: "24 months", progress: 45  },
  { id: 6,  title: "Singapore Supreme Court Complex BIM",           category: "BIM Solutions",        status: "Planned",   client: "Transport for London",        budget: "$1.1M",  year: 2025, duration: "18 months", progress: 0   },
  { id: 7,  title: "Sobha Crystalline BIM Model",               category: "BIM Solutions",        status: "Completed", client: "Berkeley Group",          budget: "$372K",  year: 2022, duration: "9 months",  progress: 100 },
  { id: 8,  title: "Godrej Habitat Sector 3 BIM",               category: "BIM Solutions",        status: "Completed", client: "Hines Real Estate",         budget: "$576K",  year: 2023, duration: "11 months", progress: 100 },
  { id: 9,  title: "Prestige Smart City BIM LOD 400",           category: "BIM Solutions",        status: "Ongoing",   client: "Related Companies",            budget: "$756K",  year: 2024, duration: "15 months", progress: 55  },
  { id: 10, title: "Skanska Data Centre London BIM",                category: "BIM Solutions",        status: "Completed", client: "Skanska Group",          budget: "$864K",  year: 2023, duration: "10 months", progress: 100 },
  { id: 11, title: "Google Campus London BIM Coordination",       category: "BIM Solutions",        status: "Completed", client: "Google Campus",            budget: "$1.0M",  year: 2022, duration: "12 months", progress: 100 },
  { id: 12, title: "DLF Ultima Floors BIM Services",            category: "BIM Solutions",        status: "Completed", client: "British Land",               budget: "$684K",  year: 2021, duration: "10 months", progress: 100 },
  { id: 13, title: "Bechtel Industrial Plant BIM",                    category: "BIM Solutions",        status: "Planned",   client: "Bechtel Corporation",               budget: "$1.4M", year: 2025, duration: "20 months", progress: 0   },
  { id: 14, title: "Microsoft Azure Campus BIM",                     category: "BIM Solutions",        status: "Completed", client: "Microsoft Real Estate",      budget: "$504K",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 15, title: "Dubai Smart City Command Centre BIM",             category: "BIM Solutions",        status: "Ongoing",   client: "Transport for London",        budget: "$456K",  year: 2024, duration: "9 months",  progress: 70  },

  // ── Scan-to-BIM ────────────────────────────────────────────────────
  { id: 16, title: "Tower of London Restoration Scan-to-BIM",        category: "Scan-to-BIM",          status: "Completed", client: "Dubai Tourism Authority",         budget: "$264K",  year: 2022, duration: "5 months",  progress: 100 },
  { id: 17, title: "Windsor Castle Heritage Scan",                 category: "Scan-to-BIM",          status: "Completed", client: "Dubai Tourism Authority",         budget: "$372K",  year: 2021, duration: "7 months",  progress: 100 },
  { id: 18, title: "Edinburgh Castle 3D Laser Scan",                  category: "Scan-to-BIM",          status: "Completed", client: "Dubai Tourism Authority",         budget: "$336K",  year: 2023, duration: "6 months",  progress: 100 },
  { id: 19, title: "Greenwich Observatory Point Cloud Capture",         category: "Scan-to-BIM",          status: "Completed", client: "Dubai Tourism Authority",         budget: "$228K",  year: 2022, duration: "4 months",  progress: 100 },
  { id: 20, title: "Rome Historical District Scan",              category: "Scan-to-BIM",          status: "Ongoing",   client: "Transport for London",        budget: "$540K",  year: 2024, duration: "12 months", progress: 40  },
  { id: 21, title: "Covent Garden As-Built Survey",             category: "Scan-to-BIM",          status: "Completed", client: "Dubai Tourism Authority",         budget: "$192K",  year: 2023, duration: "3 months",  progress: 100 },
  { id: 22, title: "Mayo Clinic Existing Conditions",         category: "Scan-to-BIM",          status: "Completed", client: "Mayo Clinic",             budget: "$408K",  year: 2022, duration: "8 months",  progress: 100 },
  { id: 23, title: "Tata Steel Factory Scan-to-BIM",            category: "Scan-to-BIM",          status: "Planned",   client: "Turner Construction",             budget: "$696K",  year: 2025, duration: "10 months", progress: 0   },
  { id: 24, title: "Prague Old Town Documentation",          category: "Scan-to-BIM",          status: "Ongoing",   client: "Transport for London",        budget: "$744K",  year: 2024, duration: "18 months", progress: 30  },
  { id: 25, title: "ETH Zurich Campus As-Built",               category: "Scan-to-BIM",          status: "Completed", client: "ETH Zurich",               budget: "$492K",  year: 2023, duration: "9 months",  progress: 100 },

  // ── Automation ─────────────────────────────────────────────────────
  { id: 26, title: "National Grid UK Substation Automation",         category: "Automation",           status: "Completed", client: "National Grid UK",         budget: "$1.1M",  year: 2022, duration: "14 months", progress: 100 },
  { id: 27, title: "Smart Metering Integration London",         category: "Automation",           status: "Completed", client: "National Grid UK",         budget: "$1.5M", year: 2023, duration: "18 months", progress: 100 },
  { id: 28, title: "Dubai Industrial Automation Platform",         category: "Automation",           status: "Ongoing",   client: "Dubai Industrial City",          budget: "$1.8M", year: 2024, duration: "24 months", progress: 50  },
  { id: 29, title: "IBM Campus BAS Automation",                 category: "Automation",           status: "Completed", client: "IBM Global Campus",                budget: "$804K",  year: 2022, duration: "10 months", progress: 100 },
  { id: 30, title: "Bechtel Logistics BMS New York",                category: "Automation",           status: "Planned",   client: "Bechtel Corporation",               budget: "$1.1M",  year: 2025, duration: "12 months", progress: 0   },
  { id: 31, title: "Singapore Smart Traffic Control System",       category: "Automation",           status: "Completed", client: "Transport for London",        budget: "$2.6M",   year: 2023, duration: "20 months", progress: 100 },
  { id: 32, title: "Shapoorji IT Park BAS",                     category: "Automation",           status: "Ongoing",   client: "Bouygues Construction",        budget: "$936K",  year: 2024, duration: "14 months", progress: 60  },
  { id: 33, title: "Google Data Centre DCIM",                  category: "Automation",           status: "Completed", client: "Google Campus",            budget: "$1.3M", year: 2022, duration: "16 months", progress: 100 },
  { id: 34, title: "Nexus Malls HVAC Automation",               category: "Automation",           status: "Completed", client: "Westfield Group",               budget: "$672K",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 35, title: "Phoenix Marketcity EMS",                    category: "Automation",           status: "Planned",   client: "Hammerson PLC",             budget: "$972K",  year: 2025, duration: "11 months", progress: 0   },

  // ── Structural Engineering ─────────────────────────────────────────
  { id: 36, title: "Sydney Metro Viaduct Structural Analysis",  category: "Structural Engineering", status: "Completed", client: "London Underground",       budget: "$3.0M",   year: 2021, duration: "24 months", progress: 100 },
  { id: 37, title: "NHS Critical Care Structural Design",         category: "Structural Engineering", status: "Completed", client: "NHS Foundation Trust",           budget: "$1.7M", year: 2022, duration: "18 months", progress: 100 },
  { id: 38, title: "Chevron Solar Plant Structural",              category: "Structural Engineering", status: "Ongoing",   client: "Bechtel Corporation",             budget: "$2.3M", year: 2024, duration: "22 months", progress: 55  },
  { id: 39, title: "Whitehall Government Buildings Retrofit",       category: "Structural Engineering", status: "Completed", client: "Transport for London",      budget: "$1.0M",  year: 2023, duration: "12 months", progress: 100 },
  { id: 40, title: "Hiranandani Towers Structural Design",      category: "Structural Engineering", status: "Planned",   client: "Lendlease",       budget: "$3.8M",   year: 2025, duration: "30 months", progress: 0   },
  { id: 41, title: "Skanska Industrial Shed Structural",            category: "Structural Engineering", status: "Completed", client: "Skanska Group",        budget: "$768K",  year: 2022, duration: "9 months",  progress: 100 },
  { id: 42, title: "Turner Motors Plant Structural Design",       category: "Structural Engineering", status: "Ongoing",   client: "Turner Construction",           budget: "$2.5M",   year: 2024, duration: "20 months", progress: 45  },
  { id: 43, title: "ETH Zurich Research Building Structural",      category: "Structural Engineering", status: "Completed", client: "ETH Zurich",             budget: "$2.1M", year: 2023, duration: "24 months", progress: 100 },
  { id: 44, title: "Oxford University Phase-2 Structural",         category: "Structural Engineering", status: "Planned",   client: "Oxford University",          budget: "$3.4M",   year: 2025, duration: "28 months", progress: 0   },
  { id: 45, title: "Godrej Nature Plus Structural",             category: "Structural Engineering", status: "Completed", client: "Hines Real Estate",       budget: "$1.1M",  year: 2023, duration: "12 months", progress: 100 },

  // ── MEP Coordination ───────────────────────────────────────────────
  { id: 46, title: "Microsoft Campus MEP Coordination",         category: "MEP Coordination",     status: "Completed", client: "Microsoft Real Estate",      budget: "$876K",  year: 2022, duration: "11 months", progress: 100 },
  { id: 47, title: "Nexus Malls MEP BIM",                       category: "MEP Coordination",     status: "Completed", client: "Westfield Group",               budget: "$612K",  year: 2021, duration: "8 months",  progress: 100 },
  { id: 48, title: "Mayo Clinic MEP Clash Detection",         category: "MEP Coordination",     status: "Completed", client: "Mayo Clinic",             budget: "$816K",  year: 2022, duration: "10 months", progress: 100 },
  { id: 49, title: "Prestige Falcon City MEP",                  category: "MEP Coordination",     status: "Ongoing",   client: "Related Companies",            budget: "$1.0M",  year: 2024, duration: "14 months", progress: 65  },
  { id: 50, title: "Shapoorji Pallonji MEP Integration",        category: "MEP Coordination",     status: "Planned",   client: "Bouygues Construction",        budget: "$1.2M", year: 2025, duration: "16 months", progress: 0   },
  { id: 51, title: "IBM Innovation Park MEP Coordination",       category: "MEP Coordination",     status: "Completed", client: "IBM Global Campus",                budget: "$948K",  year: 2023, duration: "12 months", progress: 100 },
  { id: 52, title: "Accenture Dublin Office MEP BIM",                 category: "MEP Coordination",     status: "Completed", client: "Accenture Workplace",             budget: "$540K",  year: 2023, duration: "7 months",  progress: 100 },
  { id: 53, title: "Google Office Block MEP",                     category: "MEP Coordination",     status: "Ongoing",   client: "Google Campus",            budget: "$672K",  year: 2024, duration: "9 months",  progress: 75  },
  { id: 54, title: "Embassy Business Park MEP",                 category: "MEP Coordination",     status: "Completed", client: "CBRE Group",             budget: "$1.1M",  year: 2022, duration: "14 months", progress: 100 },
  { id: 55, title: "JLL Tower New York MEP",                     category: "MEP Coordination",     status: "Planned",   client: "JLL Real Estate",                  budget: "$1.4M", year: 2025, duration: "18 months", progress: 0   },

  // ── Architectural Design ───────────────────────────────────────────
  { id: 56, title: "Kensington Luxury Residences",          category: "Architectural Design", status: "Completed", client: "Brookfield Properties",               budget: "$972K",  year: 2022, duration: "12 months", progress: 100 },
  { id: 57, title: "Mayfair Commercial Complex",          category: "Architectural Design", status: "Completed", client: "British Land",               budget: "$768K",  year: 2021, duration: "10 months", progress: 100 },
  { id: 58, title: "Canary Wharf Elite Tower Design",               category: "Architectural Design", status: "Ongoing",   client: "Grosvenor Group",             budget: "$1.7M", year: 2024, duration: "18 months", progress: 50  },
  { id: 59, title: "Silicon Roundabout IT Hub Design",                   category: "Architectural Design", status: "Planned",   client: "JLL Real Estate",                  budget: "$2.2M", year: 2025, duration: "24 months", progress: 0   },
  { id: 60, title: "Notting Hill Heritage-Inspired Homes",     category: "Architectural Design", status: "Completed", client: "Lendlease",         budget: "$696K",  year: 2023, duration: "9 months",  progress: 100 },
  { id: 61, title: "Docklands Business Park Design",            category: "Architectural Design", status: "Completed", client: "Barratt Developments",             budget: "$1.2M",  year: 2022, duration: "13 months", progress: 100 },
  { id: 62, title: "Westfield Stratford Mall Design",             category: "Architectural Design", status: "Ongoing",   client: "Hammerson PLC",             budget: "$2.7M", year: 2024, duration: "24 months", progress: 35  },
  { id: 63, title: "Dublin Tech Hub SEZ Master Plan",                  category: "Architectural Design", status: "Completed", client: "Dubai Industrial City",          budget: "$1.5M", year: 2023, duration: "15 months", progress: 100 },
  { id: 64, title: "King's Cross Healthcare Hub",               category: "Architectural Design", status: "Planned",   client: "Mayo Clinic",             budget: "$2.0M", year: 2025, duration: "20 months", progress: 0   },
  { id: 65, title: "Hackney Eco Residences",                  category: "Architectural Design", status: "Completed", client: "Berkeley Group",          budget: "$912K",  year: 2022, duration: "11 months", progress: 100 },

  // ── Infrastructure ─────────────────────────────────────────────────
  { id: 66, title: "Dubai Ring Road Alignment Study",          category: "Infrastructure",       status: "Completed", client: "Transport for London",        budget: "$5.4M",   year: 2021, duration: "30 months", progress: 100 },
  { id: 67, title: "Thames Water Pipeline BIM",               category: "Infrastructure",       status: "Completed", client: "Transport for London",        budget: "$3.4M",   year: 2022, duration: "20 months", progress: 100 },
  { id: 68, title: "Canary Wharf Multi-Level Parking",                category: "Infrastructure",       status: "Ongoing",   client: "London Underground",         budget: "$2.0M", year: 2024, duration: "18 months", progress: 60  },
  { id: 69, title: "M25 Corridor Road Widening",               category: "Infrastructure",       status: "Completed", client: "Transport for London",        budget: "$1.1M",  year: 2023, duration: "12 months", progress: 100 },
  { id: 70, title: "Toronto Pearson Airport Expansion",    category: "Infrastructure",       status: "Planned",   client: "Heathrow Airport",         budget: "$10.2M",   year: 2025, duration: "36 months", progress: 0   },
  { id: 71, title: "Brooklyn Flyover Design",                   category: "Infrastructure",       status: "Completed", client: "Transport for London",        budget: "$1.5M", year: 2022, duration: "14 months", progress: 100 },
  { id: 72, title: "Dubai Sheikh Zayed Six-Lane Expansion",              category: "Infrastructure",       status: "Ongoing",   client: "Transport for London",        budget: "$4.6M",   year: 2024, duration: "24 months", progress: 40  },
  { id: 73, title: "Singapore Pan Island Grade Separator",                category: "Infrastructure",       status: "Planned",   client: "Transport for London",        budget: "$2.6M",   year: 2025, duration: "18 months", progress: 0   },
  { id: 74, title: "Thames Tideway Sewage Treatment",               category: "Infrastructure",       status: "Completed", client: "Transport for London",        budget: "$1.7M",   year: 2023, duration: "16 months", progress: 100 },
  { id: 75, title: "Elizabeth Line Metro Station",              category: "Infrastructure",       status: "Ongoing",   client: "London Underground",         budget: "$3.7M",   year: 2024, duration: "28 months", progress: 55  },

  // ── Green Building ─────────────────────────────────────────────────
  { id: 76, title: "Sobha Green Residences LEED Certification",  category: "Green Building",      status: "Completed", client: "Berkeley Group",          budget: "$384K",  year: 2022, duration: "6 months",  progress: 100 },
  { id: 77, title: "Google Green Campus BREEAM Audit",           category: "Green Building",      status: "Completed", client: "Google Campus",            budget: "$336K",  year: 2021, duration: "5 months",  progress: 100 },
  { id: 78, title: "Lendlease Solar Rooftop Complex",                category: "Green Building",      status: "Ongoing",   client: "Bechtel Corporation",               budget: "$900K",  year: 2024, duration: "10 months", progress: 70  },
  { id: 79, title: "Dubai Net-Zero Industrial Factory",                     category: "Green Building",      status: "Planned",   client: "Dubai Industrial City",          budget: "$1.5M", year: 2025, duration: "15 months", progress: 0   },
  { id: 80, title: "Sydney Eco-Smart Residential Tower",         category: "Green Building",      status: "Completed", client: "Barratt Developments",             budget: "$1.2M",  year: 2023, duration: "12 months", progress: 100 },
  { id: 81, title: "Phoenix Mall Green Retrofit",                category: "Green Building",      status: "Completed", client: "Hammerson PLC",             budget: "$492K",  year: 2022, duration: "7 months",  progress: 100 },
  { id: 82, title: "Accenture Green IT Campus",                        category: "Green Building",      status: "Ongoing",   client: "Accenture Workplace",             budget: "$1.0M",  year: 2024, duration: "14 months", progress: 50  },
  { id: 83, title: "Scottish Highlands Solar Heritage Hotel",     category: "Green Building",      status: "Planned",   client: "Dubai Tourism Authority",         budget: "$1.4M", year: 2025, duration: "16 months", progress: 0   },
  { id: 84, title: "MIT Green Campus Initiative",                   category: "Green Building",      status: "Completed", client: "MIT Cambridge",               budget: "$708K",  year: 2023, duration: "9 months",  progress: 100 },
  { id: 85, title: "Hiranandani Green Towers",                   category: "Green Building",      status: "Ongoing",   client: "Lendlease",         budget: "$1.8M", year: 2024, duration: "18 months", progress: 40  },

  // ── Interior Design ────────────────────────────────────────────────
  { id: 86, title: "Oberoi Hotel Lobby Interiors",               category: "Interior Design",     status: "Completed", client: "Grosvenor Group",             budget: "$576K",  year: 2022, duration: "7 months",  progress: 100 },
  { id: 87, title: "Embassy Business Park Interiors",            category: "Interior Design",     status: "Completed", client: "CBRE Group",             budget: "$744K",  year: 2021, duration: "9 months",  progress: 100 },
  { id: 88, title: "RMZ Nexity Office Interiors",                category: "Interior Design",     status: "Ongoing",   client: "JLL Real Estate",                  budget: "$648K",  year: 2024, duration: "8 months",  progress: 60  },
  { id: 89, title: "Prestige Luxury Apartment Interiors",        category: "Interior Design",     status: "Planned",   client: "Related Companies",            budget: "$948K",  year: 2025, duration: "11 months", progress: 0   },
  { id: 90, title: "Nexus Mall Retail Interiors",                category: "Interior Design",     status: "Completed", client: "Westfield Group",               budget: "$444K",  year: 2023, duration: "6 months",  progress: 100 },
  { id: 91, title: "Microsoft Corporate Offices London",             category: "Interior Design",     status: "Completed", client: "Microsoft Real Estate",      budget: "$348K",  year: 2022, duration: "5 months",  progress: 100 },
  { id: 92, title: "Lodha Premium Residences Interiors",         category: "Interior Design",     status: "Ongoing",   client: "Brookfield Properties",               budget: "$996K",  year: 2024, duration: "12 months", progress: 45  },
  { id: 93, title: "Barratt Residences London Interiors",        category: "Interior Design",     status: "Completed", client: "Barratt Developments",             budget: "$372K",  year: 2023, duration: "5 months",  progress: 100 },
  { id: 94, title: "Mayo Clinic Patient Wards Interior",       category: "Interior Design",     status: "Planned",   client: "Mayo Clinic",             budget: "$672K",  year: 2025, duration: "9 months",  progress: 0   },
  { id: 95, title: "DLF Corporate Spaces Interiors",             category: "Interior Design",     status: "Completed", client: "British Land",               budget: "$516K",  year: 2022, duration: "7 months",  progress: 100 },

  // ── Smart Building ─────────────────────────────────────────────────
  { id: 96,  title: "Dubai Smart Office Tower IoT",             category: "Smart Building",      status: "Completed", client: "JLL Real Estate",                  budget: "$1.1M",  year: 2022, duration: "12 months", progress: 100 },
  { id: 97,  title: "IBM Smart Campus Integration",              category: "Smart Building",      status: "Completed", client: "IBM Global Campus",                budget: "$1.4M", year: 2023, duration: "14 months", progress: 100 },
  { id: 98,  title: "Shapoorji Smart Residences",                category: "Smart Building",      status: "Ongoing",   client: "Bouygues Construction",        budget: "$1.0M",  year: 2024, duration: "12 months", progress: 65  },
  { id: 99,  title: "Bechtel Smart Industrial Hub",                category: "Smart Building",      status: "Planned",   client: "Bechtel Corporation",               budget: "$2.9M",   year: 2025, duration: "24 months", progress: 0   },
  { id: 100, title: "Accenture Smart IT Park Toronto",                  category: "Smart Building",      status: "Completed", client: "Accenture Workplace",             budget: "$1.6M", year: 2023, duration: "18 months", progress: 100 },
  { id: 101, title: "Phoenix Smart Mall",                        category: "Smart Building",      status: "Ongoing",   client: "Hammerson PLC",             budget: "$2.0M", year: 2024, duration: "20 months", progress: 40  },
  { id: 102, title: "Google Smart Building Management",         category: "Smart Building",      status: "Completed", client: "Google Campus",            budget: "$1.2M", year: 2022, duration: "14 months", progress: 100 },
  { id: 103, title: "MIT Smart Campus Platform",                category: "Smart Building",      status: "Planned",   client: "MIT Cambridge",               budget: "$876K",  year: 2025, duration: "12 months", progress: 0   },
  { id: 104, title: "Embassy Smart Office",                      category: "Smart Building",      status: "Completed", client: "CBRE Group",             budget: "$1.5M", year: 2023, duration: "16 months", progress: 100 },
  { id: 105, title: "Nexus Smart Retail Hub",                    category: "Smart Building",      status: "Ongoing",   client: "Westfield Group",               budget: "$1.2M",  year: 2024, duration: "14 months", progress: 55  },

  // ── Additional BIM Solutions (106-130) ─────────────────────────────
  { id: 106, title: "Environment Agency Lab BIM",                 category: "BIM Solutions",       status: "Completed", client: "Environment Agency UK",                     budget: "$252K",  year: 2022, duration: "4 months",  progress: 100 },
  { id: 107, title: "Vidyadhar Nagar Mixed-Use BIM",             category: "BIM Solutions",       status: "Completed", client: "Brookfield Properties",               budget: "$816K",  year: 2023, duration: "10 months", progress: 100 },
  { id: 108, title: "Sikar Road Industrial Complex BIM",         category: "BIM Solutions",       status: "Ongoing",   client: "Dubai Industrial City",          budget: "$648K",  year: 2024, duration: "9 months",  progress: 70  },
  { id: 109, title: "Raja Park Residential BIM",                 category: "BIM Solutions",       status: "Completed", client: "Hines Real Estate",         budget: "$432K",  year: 2022, duration: "6 months",  progress: 100 },
  { id: 110, title: "Murlipura Commercial BIM",                  category: "BIM Solutions",       status: "Planned",   client: "British Land",               budget: "$504K",  year: 2025, duration: "8 months",  progress: 0   },
  { id: 111, title: "Sanganer Warehouse BIM",                    category: "BIM Solutions",       status: "Completed", client: "Skanska Group",          budget: "$348K",  year: 2023, duration: "5 months",  progress: 100 },
  { id: 112, title: "Mahindra SEZ BIM Services",                 category: "BIM Solutions",       status: "Ongoing",   client: "Bechtel Corporation",               budget: "$936K",  year: 2024, duration: "12 months", progress: 45  },
  { id: 113, title: "Jagatpura Logistics Park BIM",              category: "BIM Solutions",       status: "Completed", client: "Turner Construction",             budget: "$540K",  year: 2023, duration: "7 months",  progress: 100 },
  { id: 114, title: "Pratap Nagar Hospital BIM LOD 500",         category: "BIM Solutions",       status: "Planned",   client: "Mayo Clinic",             budget: "$996K",  year: 2025, duration: "15 months", progress: 0   },
  { id: 115, title: "Civil Lines Office Complex BIM",            category: "BIM Solutions",       status: "Completed", client: "CBRE Group",             budget: "$612K",  year: 2022, duration: "8 months",  progress: 100 },
  { id: 116, title: "Mansarovar Extension BIM",                  category: "BIM Solutions",       status: "Ongoing",   client: "Berkeley Group",          budget: "$756K",  year: 2024, duration: "11 months", progress: 60  },
  { id: 117, title: "Agra Road Commercial Hub BIM",              category: "BIM Solutions",       status: "Completed", client: "Barratt Developments",             budget: "$456K",  year: 2023, duration: "6 months",  progress: 100 },
  { id: 118, title: "Tonk Road IT Campus BIM",                   category: "BIM Solutions",       status: "Planned",   client: "Microsoft Real Estate",      budget: "$1.1M",  year: 2025, duration: "14 months", progress: 0   },
  { id: 119, title: "Delhi Road Mixed-Use BIM",                  category: "BIM Solutions",       status: "Completed", client: "Related Companies",            budget: "$564K",  year: 2023, duration: "7 months",  progress: 100 },
  { id: 120, title: "Kukas BIM & Coordination Hub",              category: "BIM Solutions",       status: "Ongoing",   client: "Bouygues Construction",        budget: "$672K",  year: 2024, duration: "10 months", progress: 50  },

  // ── Additional Scan-to-BIM (121-135) ───────────────────────────────
  { id: 121, title: "Albert Hall Museum Scan",                   category: "Scan-to-BIM",         status: "Completed", client: "Dubai Tourism Authority",         budget: "$288K",  year: 2022, duration: "5 months",  progress: 100 },
  { id: 122, title: "Nahargarh Fort 3D Documentation",           category: "Scan-to-BIM",         status: "Ongoing",   client: "Dubai Tourism Authority",         budget: "$384K",  year: 2024, duration: "8 months",  progress: 55  },
  { id: 123, title: "Rambagh Palace Scan-to-BIM",                category: "Scan-to-BIM",         status: "Completed", client: "Dubai Tourism Authority",         budget: "$492K",  year: 2023, duration: "9 months",  progress: 100 },
  { id: 124, title: "Sisodia Rani Bagh Scan",                    category: "Scan-to-BIM",         status: "Planned",   client: "Dubai Tourism Authority",         budget: "$216K",  year: 2025, duration: "4 months",  progress: 0   },
  { id: 125, title: "Galtaji Temple Complex Scan",               category: "Scan-to-BIM",         status: "Completed", client: "Dubai Tourism Authority",         budget: "$324K",  year: 2022, duration: "6 months",  progress: 100 },
  { id: 126, title: "Cambridge Heritage Building Scan",               category: "Scan-to-BIM",         status: "Completed", client: "MIT Cambridge",               budget: "$192K",  year: 2023, duration: "3 months",  progress: 100 },
  { id: 127, title: "Old Secretariat Complex Scan",              category: "Scan-to-BIM",         status: "Ongoing",   client: "Transport for London",        budget: "$456K",  year: 2024, duration: "9 months",  progress: 35  },
  { id: 128, title: "Pink City Heritage Walk Scan",              category: "Scan-to-BIM",         status: "Completed", client: "Dubai Tourism Authority",         budget: "$636K",  year: 2023, duration: "11 months", progress: 100 },
  { id: 129, title: "Sawai Man Singh Stadium Scan",              category: "Scan-to-BIM",         status: "Planned",   client: "Transport for London",        budget: "$552K",  year: 2025, duration: "8 months",  progress: 0   },
  { id: 130, title: "St. Bartholomew's Hospital As-Built",           category: "Scan-to-BIM",         status: "Completed", client: "NHS Foundation Trust",             budget: "$420K",  year: 2022, duration: "7 months",  progress: 100 },

  // ── Additional Automation (131-145) ────────────────────────────────
  { id: 131, title: "Mahindra SEZ Automation Platform",          category: "Automation",          status: "Completed", client: "Bechtel Corporation",               budget: "$1.7M", year: 2023, duration: "16 months", progress: 100 },
  { id: 132, title: "Microsoft Campus BMS Upgrade",             category: "Automation",          status: "Completed", client: "Microsoft Real Estate",      budget: "$756K",  year: 2022, duration: "9 months",  progress: 100 },
  { id: 133, title: "Skanska Industrial Control System",             category: "Automation",          status: "Ongoing",   client: "Skanska Group",          budget: "$2.2M", year: 2024, duration: "22 months", progress: 50  },
  { id: 134, title: "Tata Projects Automation Suite",            category: "Automation",          status: "Planned",   client: "Turner Construction",             budget: "$2.5M",   year: 2025, duration: "24 months", progress: 0   },
  { id: 135, title: "Environment Agency Monitoring Automation",               category: "Automation",          status: "Completed", client: "Environment Agency UK",                     budget: "$684K",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 136, title: "Dubai Tourism Smart Ticketing",         category: "Automation",          status: "Completed", client: "Dubai Tourism Authority",         budget: "$408K",  year: 2022, duration: "6 months",  progress: 100 },
  { id: 137, title: "IBM Factory Automation Integration",        category: "Automation",          status: "Ongoing",   client: "IBM Global Campus",                budget: "$1.2M",  year: 2024, duration: "14 months", progress: 60  },
  { id: 138, title: "Sobha Building Automation System",          category: "Automation",          status: "Completed", client: "Berkeley Group",          budget: "$852K",  year: 2023, duration: "10 months", progress: 100 },
  { id: 139, title: "Dubai Industrial Park Management",               category: "Automation",          status: "Planned",   client: "Dubai Industrial City",          budget: "$1.4M", year: 2025, duration: "16 months", progress: 0   },
  { id: 140, title: "CBRE Automation Controls London",        category: "Automation",          status: "Completed", client: "CBRE Group",             budget: "$1.0M",  year: 2022, duration: "12 months", progress: 100 },

  // ── Additional Infrastructure (141-155) ────────────────────────────
  { id: 141, title: "Sydney Metro Phase 3 Alignment",            category: "Infrastructure",      status: "Planned",   client: "London Underground",         budget: "$14.4M",  year: 2026, duration: "42 months", progress: 0   },
  { id: 142, title: "Sikar Road Industrial Corridor",             category: "Infrastructure",      status: "Ongoing",   client: "Dubai Industrial City",          budget: "$6.2M",   year: 2024, duration: "30 months", progress: 35  },
  { id: 143, title: "Dubai Smart City Phase 4",                 category: "Infrastructure",      status: "Planned",   client: "Transport for London",        budget: "$9.4M",   year: 2025, duration: "36 months", progress: 0   },
  { id: 144, title: "Durgapura Elevated Expressway",             category: "Infrastructure",      status: "Completed", client: "Transport for London",        budget: "$4.1M",   year: 2023, duration: "24 months", progress: 100 },
  { id: 145, title: "Kalwar Road Widening & Drainage",           category: "Infrastructure",      status: "Ongoing",   client: "Transport for London",        budget: "$2.2M", year: 2024, duration: "18 months", progress: 55  },
  { id: 146, title: "Tonk Road BRTS Corridor",                   category: "Infrastructure",      status: "Completed", client: "London Underground",         budget: "$3.5M", year: 2022, duration: "22 months", progress: 100 },
  { id: 147, title: "Mansarovar Extension Road",                 category: "Infrastructure",      status: "Planned",   client: "Transport for London",        budget: "$1.7M", year: 2025, duration: "15 months", progress: 0   },
  { id: 148, title: "Sanganer Dry Port Access Road",             category: "Infrastructure",      status: "Completed", client: "Transport for London",        budget: "$1.1M",  year: 2023, duration: "10 months", progress: 100 },
  { id: 149, title: "Mahindra SEZ Internal Roads",               category: "Infrastructure",      status: "Ongoing",   client: "Bechtel Corporation",               budget: "$1.4M", year: 2024, duration: "12 months", progress: 70  },
  { id: 150, title: "Pratap Nagar Pedestrian Bridge",            category: "Infrastructure",      status: "Completed", client: "London Underground",         budget: "$768K",  year: 2023, duration: "8 months",  progress: 100 },

  // ── Additional MEP Coordination (151-165) ──────────────────────────
  { id: 151, title: "London Metropolitan Police HQ MEP",                   category: "MEP Coordination",   status: "Completed", client: "Transport for London",        budget: "$732K",  year: 2022, duration: "9 months",  progress: 100 },
  { id: 152, title: "Heathrow Airport MEP Upgrade",                category: "MEP Coordination",   status: "Completed", client: "Heathrow Airport",         budget: "$1.7M", year: 2023, duration: "14 months", progress: 100 },
  { id: 153, title: "Sobha MEP Clash Free Model",                category: "MEP Coordination",   status: "Ongoing",   client: "Berkeley Group",          budget: "$864K",  year: 2024, duration: "11 months", progress: 65  },
  { id: 154, title: "Bechtel Data Centre MEP",                     category: "MEP Coordination",   status: "Planned",   client: "Bechtel Corporation",               budget: "$1.5M", year: 2025, duration: "16 months", progress: 0   },
  { id: 155, title: "St. Bartholomew's Hospital MEP",            category: "MEP Coordination",   status: "Completed", client: "NHS Foundation Trust",             budget: "$1.2M",  year: 2022, duration: "13 months", progress: 100 },
  { id: 156, title: "Brookfield Properties MEP Services",                 category: "MEP Coordination",   status: "Completed", client: "Brookfield Properties",               budget: "$588K",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 157, title: "NHS Hospital MEP BIM",                      category: "MEP Coordination",   status: "Ongoing",   client: "Skanska Group",          budget: "$1.0M",  year: 2024, duration: "13 months", progress: 50  },
  { id: 158, title: "Tata Projects MEP Integration",             category: "MEP Coordination",   status: "Planned",   client: "Turner Construction",             budget: "$1.2M", year: 2025, duration: "14 months", progress: 0   },
  { id: 159, title: "Prestige MEP 3D Coordination",              category: "MEP Coordination",   status: "Completed", client: "Related Companies",            budget: "$684K",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 160, title: "Barratt Properties MEP Coordination",           category: "MEP Coordination",   status: "Completed", client: "Barratt Developments",             budget: "$516K",  year: 2022, duration: "7 months",  progress: 100 },

  // ── Additional Structural & Green (161-185) ─────────────────────────
  { id: 161, title: "DLF Garden City Structural Design",         category: "Structural Engineering", status: "Completed", client: "British Land",             budget: "$2.0M", year: 2023, duration: "20 months", progress: 100 },
  { id: 162, title: "Lodha Bellevue Structural Analysis",        category: "Structural Engineering", status: "Ongoing",   client: "Brookfield Properties",             budget: "$2.4M", year: 2024, duration: "22 months", progress: 45  },
  { id: 163, title: "Phoenix Mall Extension Structural",         category: "Structural Engineering", status: "Planned",   client: "Hammerson PLC",           budget: "$2.9M", year: 2025, duration: "24 months", progress: 0   },
  { id: 164, title: "Houses of Parliament Structural Retrofit",         category: "Structural Engineering", status: "Completed", client: "Transport for London",      budget: "$2.7M", year: 2022, duration: "28 months", progress: 100 },
  { id: 165, title: "Nexus City Mall Structural",                category: "Structural Engineering", status: "Ongoing",   client: "Westfield Group",             budget: "$2.2M", year: 2024, duration: "20 months", progress: 40  },
  { id: 166, title: "Embassy Office Park Structural",            category: "Structural Engineering", status: "Completed", client: "CBRE Group",           budget: "$1.9M", year: 2023, duration: "18 months", progress: 100 },
  { id: 167, title: "Oberoi Trident Hotel Structural",           category: "Structural Engineering", status: "Planned",   client: "Grosvenor Group",           budget: "$3.3M", year: 2025, duration: "28 months", progress: 0   },
  { id: 168, title: "IBM Campus Expansion Structural",           category: "Structural Engineering", status: "Completed", client: "IBM Global Campus",              budget: "$1.6M", year: 2022, duration: "16 months", progress: 100 },
  { id: 169, title: "RMZ Nexity Structural Services",            category: "Structural Engineering", status: "Ongoing",   client: "JLL Real Estate",                budget: "$2.6M", year: 2024, duration: "24 months", progress: 35  },
  { id: 170, title: "Shapoorji Commercial Tower Structural",     category: "Structural Engineering", status: "Completed", client: "Bouygues Construction",      budget: "$2.1M", year: 2023, duration: "22 months", progress: 100 },

  { id: 171, title: "ETH Zurich Research Block Green Design",          category: "Green Building",      status: "Completed", client: "MIT Cambridge",               budget: "$816K",  year: 2022, duration: "10 months", progress: 100 },
  { id: 172, title: "New Zealand Eco Resort",                  category: "Green Building",      status: "Ongoing",   client: "Dubai Tourism Authority",         budget: "$1.1M",  year: 2024, duration: "14 months", progress: 55  },
  { id: 173, title: "Sobha Hartland LEED Gold",                  category: "Green Building",      status: "Completed", client: "Berkeley Group",          budget: "$564K",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 174, title: "Skanska Green Township",                        category: "Green Building",      status: "Planned",   client: "Skanska Group",          budget: "$1.9M", year: 2025, duration: "20 months", progress: 0   },
  { id: 175, title: "Lendlease Green City Initiative",               category: "Green Building",      status: "Ongoing",   client: "Bechtel Corporation",               budget: "$2.7M", year: 2024, duration: "28 months", progress: 30  },
  { id: 176, title: "CBRE Green Building London",                     category: "Green Building",      status: "Completed", client: "CBRE Group",             budget: "$1.0M",  year: 2023, duration: "12 months", progress: 100 },
  { id: 177, title: "Prestige Greenland GRIHA",                  category: "Green Building",      status: "Planned",   client: "Related Companies",            budget: "$1.3M", year: 2025, duration: "16 months", progress: 0   },
  { id: 178, title: "DLF Green Valley",                          category: "Green Building",      status: "Completed", client: "British Land",               budget: "$900K",  year: 2022, duration: "11 months", progress: 100 },
  { id: 179, title: "Phoenix Eco Mall Retrofit",                 category: "Green Building",      status: "Ongoing",   client: "Hammerson PLC",             budget: "$732K",  year: 2024, duration: "10 months", progress: 65  },
  { id: 180, title: "Brigade Green Homes",                       category: "Green Building",      status: "Completed", client: "Barratt Developments",             budget: "$636K",  year: 2023, duration: "9 months",  progress: 100 },

  // ── Final batch – Architectural & Smart (181-220) ──────────────────
  { id: 181, title: "Rotterdam Smart Warehouse",                     category: "Smart Building",      status: "Completed", client: "Bechtel Corporation",               budget: "$984K",  year: 2023, duration: "11 months", progress: 100 },
  { id: 182, title: "Frankfurt IoT Factory",                   category: "Smart Building",      status: "Ongoing",   client: "Dubai Industrial City",          budget: "$1.5M", year: 2024, duration: "16 months", progress: 50  },
  { id: 183, title: "NHS Smart Health Grid UK",               category: "Smart Building",      status: "Planned",   client: "Mayo Clinic",             budget: "$2.0M", year: 2025, duration: "20 months", progress: 0   },
  { id: 184, title: "Singapore Smart Parking Hub",                  category: "Smart Building",      status: "Completed", client: "London Underground",         budget: "$948K",  year: 2023, duration: "10 months", progress: 100 },
  { id: 185, title: "Fifth Avenue Smart Commerce Hub",                 category: "Smart Building",      status: "Ongoing",   client: "British Land",               budget: "$1.1M",  year: 2024, duration: "13 months", progress: 45  },
  { id: 186, title: "Zurich Smart Residences",               category: "Smart Building",      status: "Planned",   client: "Brookfield Properties",               budget: "$1.8M", year: 2025, duration: "18 months", progress: 0   },
  { id: 187, title: "Oxford Street Smart Retail Spine",                category: "Smart Building",      status: "Completed", client: "Hammerson PLC",             budget: "$1.4M", year: 2022, duration: "15 months", progress: 100 },
  { id: 188, title: "Silicon Valley Smart IT Corridor",               category: "Smart Building",      status: "Ongoing",   client: "Accenture Workplace",             budget: "$2.2M", year: 2024, duration: "22 months", progress: 40  },
  { id: 189, title: "Cleveland Clinic Smart Extension",                 category: "Smart Building",      status: "Completed", client: "Mayo Clinic",             budget: "$576K",  year: 2023, duration: "7 months",  progress: 100 },
  { id: 190, title: "Raffles Hotel Smart Heritage",            category: "Smart Building",      status: "Planned",   client: "Grosvenor Group",             budget: "$2.4M", year: 2025, duration: "22 months", progress: 0   },

  { id: 191, title: "UK Pavilion World Expo Architecture", category: "Architectural Design", status: "Planned",  client: "Transport for London",        budget: "$1.0M",  year: 2025, duration: "12 months", progress: 0   },
  { id: 192, title: "Ascot Racecourse Clubhouse Design",              category: "Architectural Design", status: "Completed", client: "Dubai Tourism Authority",        budget: "$648K",  year: 2023, duration: "9 months",  progress: 100 },
  { id: 193, title: "Sky UK Office Design London",             category: "Architectural Design", status: "Completed", client: "Turner Construction",            budget: "$348K",  year: 2022, duration: "5 months",  progress: 100 },
  { id: 194, title: "Monaco Waterfront Luxe Villa",             category: "Architectural Design", status: "Ongoing",   client: "Lendlease",        budget: "$1.4M", year: 2024, duration: "15 months", progress: 60  },
  { id: 195, title: "JLL Nextgen Office Tower Design",           category: "Architectural Design", status: "Planned",   client: "JLL Real Estate",                 budget: "$2.6M", year: 2025, duration: "24 months", progress: 0   },
  { id: 196, title: "Related Companies Sunbreeze Miami",                 category: "Architectural Design", status: "Completed", client: "Related Companies",           budget: "$1.0M",  year: 2023, duration: "11 months", progress: 100 },
  { id: 197, title: "Brigade Arcadia Design",                    category: "Architectural Design", status: "Ongoing",   client: "Barratt Developments",            budget: "$1.7M", year: 2024, duration: "18 months", progress: 35  },
  { id: 198, title: "Sobha Indraprastha Design",                 category: "Architectural Design", status: "Planned",   client: "Berkeley Group",         budget: "$1.5M", year: 2025, duration: "16 months", progress: 0   },
  { id: 199, title: "British Land Cyber City Design",             category: "Architectural Design", status: "Ongoing",   client: "British Land",              budget: "$3.4M", year: 2024, duration: "28 months", progress: 45  },
  { id: 200, title: "Bechtel Dry Port Design Dubai",       category: "Architectural Design", status: "Planned",   client: "Bechtel Corporation",              budget: "$4.2M", year: 2025, duration: "32 months", progress: 0   },

  { id: 201, title: "Madame Tussauds BIM Renovation",                    category: "BIM Solutions",        status: "Completed", client: "Dubai Tourism Authority",         budget: "$216K",  year: 2022, duration: "4 months",  progress: 100 },
  { id: 202, title: "Cambridge Innovation Centre BIM",               category: "BIM Solutions",        status: "Ongoing",   client: "MIT Cambridge",               budget: "$444K",  year: 2024, duration: "8 months",  progress: 55  },
  { id: 203, title: "ETH Zurich Research Park BIM",            category: "BIM Solutions",        status: "Planned",   client: "ETH Zurich",               budget: "$864K",  year: 2025, duration: "12 months", progress: 0   },
  { id: 204, title: "Environment Agency Lab Expansion BIM",                  category: "BIM Solutions",        status: "Completed", client: "Environment Agency UK",                     budget: "$276K",  year: 2023, duration: "5 months",  progress: 100 },
  { id: 205, title: "Lord's Cricket Ground Stadium BIM", category: "BIM Solutions",        status: "Ongoing",   client: "Transport for London",        budget: "$1.8M", year: 2024, duration: "20 months", progress: 40  },
  { id: 206, title: "Antwerp Diamond Quarter Scan-to-BIM",           category: "Scan-to-BIM",          status: "Completed", client: "Dubai Tourism Authority",         budget: "$252K",  year: 2023, duration: "4 months",  progress: 100 },
  { id: 207, title: "Chateau de Versailles Restoration Scan",               category: "Scan-to-BIM",          status: "Ongoing",   client: "Dubai Tourism Authority",         budget: "$408K",  year: 2024, duration: "8 months",  progress: 45  },
  { id: 208, title: "Hyde Park Heritage Garden Scan",                 category: "Scan-to-BIM",          status: "Completed", client: "Dubai Tourism Authority",         budget: "$204K",  year: 2022, duration: "3 months",  progress: 100 },
  { id: 209, title: "Kew Gardens Scan-to-BIM",              category: "Scan-to-BIM",          status: "Planned",   client: "Dubai Tourism Authority",         budget: "$300K",  year: 2025, duration: "5 months",  progress: 0   },
  { id: 210, title: "San Diego Zoo Master Plan Scan",               category: "Scan-to-BIM",         status: "Completed", client: "Transport for London",        budget: "$348K",  year: 2023, duration: "6 months",  progress: 100 },

  { id: 211, title: "National Grid Energy Automation UK",         category: "Automation",           status: "Completed", client: "National Grid UK",         budget: "$1.1M",  year: 2023, duration: "14 months", progress: 100 },
  { id: 212, title: "Thames Water SCADA System",                 category: "Automation",           status: "Ongoing",   client: "Transport for London",        budget: "$2.0M", year: 2024, duration: "20 months", progress: 50  },
  { id: 213, title: "NHS Hospital HVAC BAS",                   category: "Automation",           status: "Completed", client: "NHS Foundation Trust",             budget: "$936K",  year: 2022, duration: "11 months", progress: 100 },
  { id: 214, title: "London Underground AFC Automation",              category: "Automation",           status: "Completed", client: "London Underground",         budget: "$1.5M", year: 2023, duration: "15 months", progress: 100 },
  { id: 215, title: "Dubai Smart Factory SCADA",                category: "Automation",           status: "Planned",   client: "Dubai Industrial City",          budget: "$2.2M", year: 2025, duration: "22 months", progress: 0   },
  { id: 216, title: "Amsterdam Smart Street Lighting",             category: "Smart Building",       status: "Completed", client: "Transport for London",        budget: "$1.1M",  year: 2023, duration: "10 months", progress: 100 },
  { id: 217, title: "Frankfurt Smart Grid Project",            category: "Smart Building",       status: "Ongoing",   client: "National Grid UK",         budget: "$1.7M", year: 2024, duration: "18 months", progress: 55  },
  { id: 218, title: "Singapore E-Government Centre",          category: "Smart Building",       status: "Planned",   client: "Transport for London",        budget: "$1.4M", year: 2025, duration: "15 months", progress: 0   },
  { id: 219, title: "Helsinki Digital Twin City Pilot",           category: "Smart Building",       status: "Ongoing",   client: "London Underground",         budget: "$2.9M", year: 2024, duration: "24 months", progress: 30  },
  { id: 220, title: "UNESCO Smart Heritage Trail",   category: "Smart Building",       status: "Completed", client: "Dubai Tourism Authority",         budget: "$756K",  year: 2023, duration: "9 months",  progress: 100 }
];

// Enrich with location, images, descriptions
const PROJECTS = rawProjects.map((p, idx) => ({
  ...p,
  origin: getProjectOrigin(p, idx),
  location: getProjectOrigin(p, idx),
  image: getImage(idx),
  gallery: getExtraImages(idx),
  description: `A landmark ${p.category} engagement for ${p.client} executed by NewOrbit Services. The project involved cutting-edge digital engineering, delivering ${p.status === "Completed" ? "on time with exceptional client satisfaction" : p.status === "Ongoing" ? "active execution with rigorous quality control" : "detailed planning and stakeholder alignment"}.`,
  tags: [p.category, p.status, "International", "BIM", p.client.split(" ")[0]]
}));

// Testimonials
const TESTIMONIALS = [
  {
    name: "James Richardson",
    designation: "Director of Engineering, Skanska Group UK",
    text: "NewOrbit Services transformed our approach to BIM. Their remote team delivered clash-free MEP coordination that saved us weeks of rework on the Canary Wharf project.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=68"
  },
  {
    name: "Sarah Thompson",
    designation: "VP Technology, Google Campus Development (London)",
    text: "The Scan-to-BIM accuracy was phenomenal. We received a highly detailed as-built model for our King's Cross campus within the agreed timeline — truly exceptional quality.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=47"
  },
  {
    name: "Michael O'Brien",
    designation: "Head of Facilities, Hammerson PLC",
    text: "Their automation platform has reduced our retail facility operational costs by 31%. A genuinely world-class BIM team — we've extended our contract for three more sites.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=32"
  },
  {
    name: "Ahmed Al-Rashidi",
    designation: "Project Director, Dubai Industrial City",
    text: "We have completed eight projects with NewOrbit across the UAE. Their structural engineering BIM models are precise and always delivered ahead of schedule — outstanding.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=14"
  },
  {
    name: "Claire Beaumont",
    designation: "Heritage Preservation Lead, Historic England",
    text: "Our Edinburgh Castle Scan-to-BIM project required extreme sensitivity and precision. NewOrbit exceeded every expectation — the point cloud accuracy was remarkable.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=53"
  },
  {
    name: "Daniel Wong",
    designation: "CEO, Marina Bay Developments Singapore",
    text: "NewOrbit's BIM coordination for our Marina Bay mixed-use tower has been seamless. Their expertise in smart building integration is unmatched — highly recommended.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=61"
  },
  {
    name: "Emma Harrington",
    designation: "Infrastructure Lead, Transport for London",
    text: "The Elizabeth Line BIM deliverables exceeded our LOD 400 requirements. NewOrbit's team managed complex coordination across 24 disciplines flawlessly.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=44"
  },
  {
    name: "Robert Kowalski",
    designation: "Senior PM, Lendlease Australia",
    text: "From concept design to construction BIM, NewOrbit delivered on every milestone for our Sydney waterfront project. Their responsiveness and quality are exceptional.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=15"
  }
];
