// NewOrbit Services – Project Portfolio Data
// 220 projects – All originating from Jaipur, Rajasthan

const COMPANY = {
  name: "NewOrbit Services",
  tagline: "Engineering Tomorrow's Spaces",
  location: "Jaipur, Rajasthan, India",
  email: "info@neworbitservices.com",
  phone: "+91-141-123-4567",
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
  "Adani Group", "Tata Projects", "L&T Construction", "Shapoorji Pallonji",
  "DLF Limited", "Godrej Properties", "Oberoi Realty", "Prestige Group",
  "Sobha Developers", "Hiranandani Group", "Lodha Group", "Brigade Group",
  "Embassy Group", "RMZ Corp", "Nexus Malls", "Phoenix Mills",
  "Infosys Campus", "Wipro Infrastructure", "TCS Buildings", "HCL Campus",
  "AIIMS Jodhpur", "MNIT Jaipur", "IIT Jodhpur", "JNU New Campus",
  "Rajasthan Govt PWD", "RIICO Industrial", "JVVNL Substations", "RSPCB",
  "Jaipur Metro Rail", "Pink City Airport", "Rajasthan Tourism", "RUHS Hospital"
];

const LOCATIONS_NEARBY = [
  "Malviya Nagar, Jaipur", "Vaishali Nagar, Jaipur", "Mansarovar, Jaipur",
  "C-Scheme, Jaipur", "MI Road, Jaipur", "Tonk Road, Jaipur",
  "Ajmer Road, Jaipur", "Sitapura Industrial Area, Jaipur",
  "Mahindra SEZ, Jaipur", "Pratap Nagar, Jaipur", "Jagatpura, Jaipur",
  "Sanganer, Jaipur", "Murlipura, Jaipur", "Vidyadhar Nagar, Jaipur",
  "Raja Park, Jaipur", "Civil Lines, Jaipur", "Bani Park, Jaipur",
  "Sikar Road, Jaipur", "Agra Road, Jaipur", "Delhi Road, Jaipur",
  "Kukas Industrial Area, Jaipur", "Vishwakarma Industrial, Jaipur"
];

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
  { id: 1,  title: "Jaipur Convention Centre BIM Model",         category: "BIM Solutions",        status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹4.5 Cr",  year: 2022, duration: "8 months",  progress: 100 },
  { id: 2,  title: "Pink City Airport Terminal BIM",             category: "BIM Solutions",        status: "Completed", client: "Pink City Airport",         budget: "₹12 Cr",   year: 2023, duration: "14 months", progress: 100 },
  { id: 3,  title: "RIICO Industrial Park Clash Detection",      category: "BIM Solutions",        status: "Completed", client: "RIICO Industrial",          budget: "₹2.8 Cr",  year: 2021, duration: "6 months",  progress: 100 },
  { id: 4,  title: "MNIT Jaipur Campus BIM Integration",         category: "BIM Solutions",        status: "Ongoing",   client: "MNIT Jaipur",               budget: "₹5.2 Cr",  year: 2024, duration: "12 months", progress: 65  },
  { id: 5,  title: "Jaipur Metro Phase 2 BIM Coordination",      category: "BIM Solutions",        status: "Ongoing",   client: "Jaipur Metro Rail",         budget: "₹18 Cr",   year: 2024, duration: "24 months", progress: 45  },
  { id: 6,  title: "Rajasthan High Court Complex BIM",           category: "BIM Solutions",        status: "Planned",   client: "Rajasthan Govt PWD",        budget: "₹9.5 Cr",  year: 2025, duration: "18 months", progress: 0   },
  { id: 7,  title: "Sobha Crystalline BIM Model",               category: "BIM Solutions",        status: "Completed", client: "Sobha Developers",          budget: "₹3.1 Cr",  year: 2022, duration: "9 months",  progress: 100 },
  { id: 8,  title: "Godrej Habitat Sector 3 BIM",               category: "BIM Solutions",        status: "Completed", client: "Godrej Properties",         budget: "₹4.8 Cr",  year: 2023, duration: "11 months", progress: 100 },
  { id: 9,  title: "Prestige Smart City BIM LOD 400",           category: "BIM Solutions",        status: "Ongoing",   client: "Prestige Group",            budget: "₹6.3 Cr",  year: 2024, duration: "15 months", progress: 55  },
  { id: 10, title: "L&T Data Centre Jaipur BIM",                category: "BIM Solutions",        status: "Completed", client: "L&T Construction",          budget: "₹7.2 Cr",  year: 2023, duration: "10 months", progress: 100 },
  { id: 11, title: "Infosys SEZ Jaipur BIM Coordination",       category: "BIM Solutions",        status: "Completed", client: "Infosys Campus",            budget: "₹8.5 Cr",  year: 2022, duration: "12 months", progress: 100 },
  { id: 12, title: "DLF Ultima Floors BIM Services",            category: "BIM Solutions",        status: "Completed", client: "DLF Limited",               budget: "₹5.7 Cr",  year: 2021, duration: "10 months", progress: 100 },
  { id: 13, title: "Adani Wilmar Plant BIM",                    category: "BIM Solutions",        status: "Planned",   client: "Adani Group",               budget: "₹11.4 Cr", year: 2025, duration: "20 months", progress: 0   },
  { id: 14, title: "Wipro BPO Jaipur BIM",                     category: "BIM Solutions",        status: "Completed", client: "Wipro Infrastructure",      budget: "₹4.2 Cr",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 15, title: "Smart City Command Centre BIM",             category: "BIM Solutions",        status: "Ongoing",   client: "Rajasthan Govt PWD",        budget: "₹3.8 Cr",  year: 2024, duration: "9 months",  progress: 70  },

  // ── Scan-to-BIM ────────────────────────────────────────────────────
  { id: 16, title: "Hawa Mahal Restoration Scan-to-BIM",        category: "Scan-to-BIM",          status: "Completed", client: "Rajasthan Tourism",         budget: "₹2.2 Cr",  year: 2022, duration: "5 months",  progress: 100 },
  { id: 17, title: "City Palace Heritage Scan",                 category: "Scan-to-BIM",          status: "Completed", client: "Rajasthan Tourism",         budget: "₹3.1 Cr",  year: 2021, duration: "7 months",  progress: 100 },
  { id: 18, title: "Amber Fort 3D Laser Scan",                  category: "Scan-to-BIM",          status: "Completed", client: "Rajasthan Tourism",         budget: "₹2.8 Cr",  year: 2023, duration: "6 months",  progress: 100 },
  { id: 19, title: "Jantar Mantar Point Cloud Capture",         category: "Scan-to-BIM",          status: "Completed", client: "Rajasthan Tourism",         budget: "₹1.9 Cr",  year: 2022, duration: "4 months",  progress: 100 },
  { id: 20, title: "Old City Heritage Block Scan",              category: "Scan-to-BIM",          status: "Ongoing",   client: "Rajasthan Govt PWD",        budget: "₹4.5 Cr",  year: 2024, duration: "12 months", progress: 40  },
  { id: 21, title: "Johari Bazaar as-Built Survey",             category: "Scan-to-BIM",          status: "Completed", client: "Rajasthan Tourism",         budget: "₹1.6 Cr",  year: 2023, duration: "3 months",  progress: 100 },
  { id: 22, title: "RUHS Hospital Existing Conditions",         category: "Scan-to-BIM",          status: "Completed", client: "RUHS Hospital",             budget: "₹3.4 Cr",  year: 2022, duration: "8 months",  progress: 100 },
  { id: 23, title: "Tata Steel Factory Scan-to-BIM",            category: "Scan-to-BIM",          status: "Planned",   client: "Tata Projects",             budget: "₹5.8 Cr",  year: 2025, duration: "10 months", progress: 0   },
  { id: 24, title: "Jaipur Walled City Documentation",          category: "Scan-to-BIM",          status: "Ongoing",   client: "Rajasthan Govt PWD",        budget: "₹6.2 Cr",  year: 2024, duration: "18 months", progress: 30  },
  { id: 25, title: "IIT Jodhpur Campus As-Built",               category: "Scan-to-BIM",          status: "Completed", client: "IIT Jodhpur",               budget: "₹4.1 Cr",  year: 2023, duration: "9 months",  progress: 100 },

  // ── Automation ─────────────────────────────────────────────────────
  { id: 26, title: "JVVNL Substation Automation Suite",         category: "Automation",           status: "Completed", client: "JVVNL Substations",         budget: "₹8.9 Cr",  year: 2022, duration: "14 months", progress: 100 },
  { id: 27, title: "Smart Metering Integration Jaipur",         category: "Automation",           status: "Completed", client: "JVVNL Substations",         budget: "₹12.5 Cr", year: 2023, duration: "18 months", progress: 100 },
  { id: 28, title: "RIICO Factory Automation Platform",         category: "Automation",           status: "Ongoing",   client: "RIICO Industrial",          budget: "₹15.3 Cr", year: 2024, duration: "24 months", progress: 50  },
  { id: 29, title: "HCL Campus BAS Automation",                 category: "Automation",           status: "Completed", client: "HCL Campus",                budget: "₹6.7 Cr",  year: 2022, duration: "10 months", progress: 100 },
  { id: 30, title: "Adani Logistics BMS Jaipur",                category: "Automation",           status: "Planned",   client: "Adani Group",               budget: "₹9.4 Cr",  year: 2025, duration: "12 months", progress: 0   },
  { id: 31, title: "Jaipur Smart Traffic Control System",       category: "Automation",           status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹22 Cr",   year: 2023, duration: "20 months", progress: 100 },
  { id: 32, title: "Shapoorji IT Park BAS",                     category: "Automation",           status: "Ongoing",   client: "Shapoorji Pallonji",        budget: "₹7.8 Cr",  year: 2024, duration: "14 months", progress: 60  },
  { id: 33, title: "Infosys Data Centre DCIM",                  category: "Automation",           status: "Completed", client: "Infosys Campus",            budget: "₹11.2 Cr", year: 2022, duration: "16 months", progress: 100 },
  { id: 34, title: "Nexus Malls HVAC Automation",               category: "Automation",           status: "Completed", client: "Nexus Malls",               budget: "₹5.6 Cr",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 35, title: "Phoenix Marketcity EMS",                    category: "Automation",           status: "Planned",   client: "Phoenix Mills",             budget: "₹8.1 Cr",  year: 2025, duration: "11 months", progress: 0   },

  // ── Structural Engineering ─────────────────────────────────────────
  { id: 36, title: "Jaipur Metro Viaduct Structural Analysis",  category: "Structural Engineering", status: "Completed", client: "Jaipur Metro Rail",       budget: "₹25 Cr",   year: 2021, duration: "24 months", progress: 100 },
  { id: 37, title: "AIIMS Jodhpur Critical Structures",         category: "Structural Engineering", status: "Completed", client: "AIIMS Jodhpur",           budget: "₹14.5 Cr", year: 2022, duration: "18 months", progress: 100 },
  { id: 38, title: "Adani Solar Plant Structural",              category: "Structural Engineering", status: "Ongoing",   client: "Adani Group",             budget: "₹19.3 Cr", year: 2024, duration: "22 months", progress: 55  },
  { id: 39, title: "Rajasthan Govt Secretariat Retrofit",       category: "Structural Engineering", status: "Completed", client: "Rajasthan Govt PWD",      budget: "₹8.7 Cr",  year: 2023, duration: "12 months", progress: 100 },
  { id: 40, title: "Hiranandani Towers Structural Design",      category: "Structural Engineering", status: "Planned",   client: "Hiranandani Group",       budget: "₹32 Cr",   year: 2025, duration: "30 months", progress: 0   },
  { id: 41, title: "L&T Industrial Shed Structural",            category: "Structural Engineering", status: "Completed", client: "L&T Construction",        budget: "₹6.4 Cr",  year: 2022, duration: "9 months",  progress: 100 },
  { id: 42, title: "Tata Motors Jaipur Plant Structural",       category: "Structural Engineering", status: "Ongoing",   client: "Tata Projects",           budget: "₹21 Cr",   year: 2024, duration: "20 months", progress: 45  },
  { id: 43, title: "IIT Jodhpur Main Building Structural",      category: "Structural Engineering", status: "Completed", client: "IIT Jodhpur",             budget: "₹17.8 Cr", year: 2023, duration: "24 months", progress: 100 },
  { id: 44, title: "JNU New Campus Phase-2 Structural",         category: "Structural Engineering", status: "Planned",   client: "JNU New Campus",          budget: "₹28 Cr",   year: 2025, duration: "28 months", progress: 0   },
  { id: 45, title: "Godrej Nature Plus Structural",             category: "Structural Engineering", status: "Completed", client: "Godrej Properties",       budget: "₹9.2 Cr",  year: 2023, duration: "12 months", progress: 100 },

  // ── MEP Coordination ───────────────────────────────────────────────
  { id: 46, title: "Wipro SEZ Jaipur MEP Coordination",         category: "MEP Coordination",     status: "Completed", client: "Wipro Infrastructure",      budget: "₹7.3 Cr",  year: 2022, duration: "11 months", progress: 100 },
  { id: 47, title: "Nexus Malls MEP BIM",                       category: "MEP Coordination",     status: "Completed", client: "Nexus Malls",               budget: "₹5.1 Cr",  year: 2021, duration: "8 months",  progress: 100 },
  { id: 48, title: "RUHS Hospital MEP Clash Detection",         category: "MEP Coordination",     status: "Completed", client: "RUHS Hospital",             budget: "₹6.8 Cr",  year: 2022, duration: "10 months", progress: 100 },
  { id: 49, title: "Prestige Falcon City MEP",                  category: "MEP Coordination",     status: "Ongoing",   client: "Prestige Group",            budget: "₹8.4 Cr",  year: 2024, duration: "14 months", progress: 65  },
  { id: 50, title: "Shapoorji Pallonji MEP Integration",        category: "MEP Coordination",     status: "Planned",   client: "Shapoorji Pallonji",        budget: "₹10.2 Cr", year: 2025, duration: "16 months", progress: 0   },
  { id: 51, title: "HCL IT Park Jaipur MEP Coordination",       category: "MEP Coordination",     status: "Completed", client: "HCL Campus",                budget: "₹7.9 Cr",  year: 2023, duration: "12 months", progress: 100 },
  { id: 52, title: "TCS Jaipur Office MEP BIM",                 category: "MEP Coordination",     status: "Completed", client: "TCS Buildings",             budget: "₹4.5 Cr",  year: 2023, duration: "7 months",  progress: 100 },
  { id: 53, title: "Infosys BPO Block MEP",                     category: "MEP Coordination",     status: "Ongoing",   client: "Infosys Campus",            budget: "₹5.6 Cr",  year: 2024, duration: "9 months",  progress: 75  },
  { id: 54, title: "Embassy Business Park MEP",                 category: "MEP Coordination",     status: "Completed", client: "Embassy Group",             budget: "₹9.3 Cr",  year: 2022, duration: "14 months", progress: 100 },
  { id: 55, title: "RMZ Nexity Jaipur MEP",                     category: "MEP Coordination",     status: "Planned",   client: "RMZ Corp",                  budget: "₹11.5 Cr", year: 2025, duration: "18 months", progress: 0   },

  // ── Architectural Design ───────────────────────────────────────────
  { id: 56, title: "Vaishali Nagar Luxury Residences",          category: "Architectural Design", status: "Completed", client: "Lodha Group",               budget: "₹8.1 Cr",  year: 2022, duration: "12 months", progress: 100 },
  { id: 57, title: "Malviya Nagar Commercial Complex",          category: "Architectural Design", status: "Completed", client: "DLF Limited",               budget: "₹6.4 Cr",  year: 2021, duration: "10 months", progress: 100 },
  { id: 58, title: "C-Scheme Elite Tower Design",               category: "Architectural Design", status: "Ongoing",   client: "Oberoi Realty",             budget: "₹14.2 Cr", year: 2024, duration: "18 months", progress: 50  },
  { id: 59, title: "Tonk Road IT Hub Design",                   category: "Architectural Design", status: "Planned",   client: "RMZ Corp",                  budget: "₹18.5 Cr", year: 2025, duration: "24 months", progress: 0   },
  { id: 60, title: "Bani Park Heritage-Inspired Bungalows",     category: "Architectural Design", status: "Completed", client: "Hiranandani Group",         budget: "₹5.8 Cr",  year: 2023, duration: "9 months",  progress: 100 },
  { id: 61, title: "Jagatpura Business Park Design",            category: "Architectural Design", status: "Completed", client: "Brigade Group",             budget: "₹9.7 Cr",  year: 2022, duration: "13 months", progress: 100 },
  { id: 62, title: "Mansarovar Retail Mall Design",             category: "Architectural Design", status: "Ongoing",   client: "Phoenix Mills",             budget: "₹22.4 Cr", year: 2024, duration: "24 months", progress: 35  },
  { id: 63, title: "Sitapura SEZ Master Plan",                  category: "Architectural Design", status: "Completed", client: "RIICO Industrial",          budget: "₹12.8 Cr", year: 2023, duration: "15 months", progress: 100 },
  { id: 64, title: "Pratap Nagar Healthcare Hub",               category: "Architectural Design", status: "Planned",   client: "RUHS Hospital",             budget: "₹16.3 Cr", year: 2025, duration: "20 months", progress: 0   },
  { id: 65, title: "Murlipura Eco Residences",                  category: "Architectural Design", status: "Completed", client: "Sobha Developers",          budget: "₹7.6 Cr",  year: 2022, duration: "11 months", progress: 100 },

  // ── Infrastructure ─────────────────────────────────────────────────
  { id: 66, title: "Jaipur Ring Road Alignment Study",          category: "Infrastructure",       status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹45 Cr",   year: 2021, duration: "30 months", progress: 100 },
  { id: 67, title: "Bisalpur Water Pipeline BIM",               category: "Infrastructure",       status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹28 Cr",   year: 2022, duration: "20 months", progress: 100 },
  { id: 68, title: "Jaipur Multi-Level Parking",                category: "Infrastructure",       status: "Ongoing",   client: "Jaipur Metro Rail",         budget: "₹16.5 Cr", year: 2024, duration: "18 months", progress: 60  },
  { id: 69, title: "Kukas Road Widening Project",               category: "Infrastructure",       status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹9.3 Cr",  year: 2023, duration: "12 months", progress: 100 },
  { id: 70, title: "Jaipur International Airport Expansion",    category: "Infrastructure",       status: "Planned",   client: "Pink City Airport",         budget: "₹85 Cr",   year: 2025, duration: "36 months", progress: 0   },
  { id: 71, title: "Sanganer Flyover Design",                   category: "Infrastructure",       status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹12.7 Cr", year: 2022, duration: "14 months", progress: 100 },
  { id: 72, title: "Agra Road Six-Lane Expansion",              category: "Infrastructure",       status: "Ongoing",   client: "Rajasthan Govt PWD",        budget: "₹38 Cr",   year: 2024, duration: "24 months", progress: 40  },
  { id: 73, title: "Delhi Road Grade Separator",                category: "Infrastructure",       status: "Planned",   client: "Rajasthan Govt PWD",        budget: "₹22 Cr",   year: 2025, duration: "18 months", progress: 0   },
  { id: 74, title: "Mansarovar Sewage Treatment",               category: "Infrastructure",       status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹14 Cr",   year: 2023, duration: "16 months", progress: 100 },
  { id: 75, title: "Vaishali Nagar Metro Station",              category: "Infrastructure",       status: "Ongoing",   client: "Jaipur Metro Rail",         budget: "₹31 Cr",   year: 2024, duration: "28 months", progress: 55  },

  // ── Green Building ─────────────────────────────────────────────────
  { id: 76, title: "Sobha Green Residences LEED Certification",  category: "Green Building",      status: "Completed", client: "Sobha Developers",          budget: "₹3.2 Cr",  year: 2022, duration: "6 months",  progress: 100 },
  { id: 77, title: "Infosys Green Campus GRIHA Audit",           category: "Green Building",      status: "Completed", client: "Infosys Campus",            budget: "₹2.8 Cr",  year: 2021, duration: "5 months",  progress: 100 },
  { id: 78, title: "Adani Solar Rooftop Complex",                category: "Green Building",      status: "Ongoing",   client: "Adani Group",               budget: "₹7.5 Cr",  year: 2024, duration: "10 months", progress: 70  },
  { id: 79, title: "RIICO Net-Zero Factory",                     category: "Green Building",      status: "Planned",   client: "RIICO Industrial",          budget: "₹12.4 Cr", year: 2025, duration: "15 months", progress: 0   },
  { id: 80, title: "Jaipur Eco-Smart Residential Tower",         category: "Green Building",      status: "Completed", client: "Brigade Group",             budget: "₹9.8 Cr",  year: 2023, duration: "12 months", progress: 100 },
  { id: 81, title: "Phoenix Mall Green Retrofit",                category: "Green Building",      status: "Completed", client: "Phoenix Mills",             budget: "₹4.1 Cr",  year: 2022, duration: "7 months",  progress: 100 },
  { id: 82, title: "TCS Green IT Campus",                        category: "Green Building",      status: "Ongoing",   client: "TCS Buildings",             budget: "₹8.6 Cr",  year: 2024, duration: "14 months", progress: 50  },
  { id: 83, title: "Rajasthan Tourism Solar Heritage Hotel",     category: "Green Building",      status: "Planned",   client: "Rajasthan Tourism",         budget: "₹11.3 Cr", year: 2025, duration: "16 months", progress: 0   },
  { id: 84, title: "MNIT Jaipur Green Campus",                   category: "Green Building",      status: "Completed", client: "MNIT Jaipur",               budget: "₹5.9 Cr",  year: 2023, duration: "9 months",  progress: 100 },
  { id: 85, title: "Hiranandani Green Towers",                   category: "Green Building",      status: "Ongoing",   client: "Hiranandani Group",         budget: "₹14.7 Cr", year: 2024, duration: "18 months", progress: 40  },

  // ── Interior Design ────────────────────────────────────────────────
  { id: 86, title: "Oberoi Hotel Lobby Interiors",               category: "Interior Design",     status: "Completed", client: "Oberoi Realty",             budget: "₹4.8 Cr",  year: 2022, duration: "7 months",  progress: 100 },
  { id: 87, title: "Embassy Business Park Interiors",            category: "Interior Design",     status: "Completed", client: "Embassy Group",             budget: "₹6.2 Cr",  year: 2021, duration: "9 months",  progress: 100 },
  { id: 88, title: "RMZ Nexity Office Interiors",                category: "Interior Design",     status: "Ongoing",   client: "RMZ Corp",                  budget: "₹5.4 Cr",  year: 2024, duration: "8 months",  progress: 60  },
  { id: 89, title: "Prestige Luxury Apartment Interiors",        category: "Interior Design",     status: "Planned",   client: "Prestige Group",            budget: "₹7.9 Cr",  year: 2025, duration: "11 months", progress: 0   },
  { id: 90, title: "Nexus Mall Retail Interiors",                category: "Interior Design",     status: "Completed", client: "Nexus Malls",               budget: "₹3.7 Cr",  year: 2023, duration: "6 months",  progress: 100 },
  { id: 91, title: "Wipro Corporate Offices Jaipur",             category: "Interior Design",     status: "Completed", client: "Wipro Infrastructure",      budget: "₹2.9 Cr",  year: 2022, duration: "5 months",  progress: 100 },
  { id: 92, title: "Lodha Premium Residences Interiors",         category: "Interior Design",     status: "Ongoing",   client: "Lodha Group",               budget: "₹8.3 Cr",  year: 2024, duration: "12 months", progress: 45  },
  { id: 93, title: "Brigade Residences Jaipur Interiors",        category: "Interior Design",     status: "Completed", client: "Brigade Group",             budget: "₹3.1 Cr",  year: 2023, duration: "5 months",  progress: 100 },
  { id: 94, title: "RUHS Hospital Patient Wards Interior",       category: "Interior Design",     status: "Planned",   client: "RUHS Hospital",             budget: "₹5.6 Cr",  year: 2025, duration: "9 months",  progress: 0   },
  { id: 95, title: "DLF Corporate Spaces Interiors",             category: "Interior Design",     status: "Completed", client: "DLF Limited",               budget: "₹4.3 Cr",  year: 2022, duration: "7 months",  progress: 100 },

  // ── Smart Building ─────────────────────────────────────────────────
  { id: 96,  title: "Jaipur Smart Office Tower IoT",             category: "Smart Building",      status: "Completed", client: "RMZ Corp",                  budget: "₹9.1 Cr",  year: 2022, duration: "12 months", progress: 100 },
  { id: 97,  title: "HCL Smart Campus Integration",              category: "Smart Building",      status: "Completed", client: "HCL Campus",                budget: "₹11.4 Cr", year: 2023, duration: "14 months", progress: 100 },
  { id: 98,  title: "Shapoorji Smart Residences",                category: "Smart Building",      status: "Ongoing",   client: "Shapoorji Pallonji",        budget: "₹8.7 Cr",  year: 2024, duration: "12 months", progress: 65  },
  { id: 99,  title: "Adani Smart Industrial Hub",                category: "Smart Building",      status: "Planned",   client: "Adani Group",               budget: "₹24 Cr",   year: 2025, duration: "24 months", progress: 0   },
  { id: 100, title: "TCS Smart IT Park Jaipur",                  category: "Smart Building",      status: "Completed", client: "TCS Buildings",             budget: "₹13.5 Cr", year: 2023, duration: "18 months", progress: 100 },
  { id: 101, title: "Phoenix Smart Mall",                        category: "Smart Building",      status: "Ongoing",   client: "Phoenix Mills",             budget: "₹16.8 Cr", year: 2024, duration: "20 months", progress: 40  },
  { id: 102, title: "Infosys Smart Building Management",         category: "Smart Building",      status: "Completed", client: "Infosys Campus",            budget: "₹10.2 Cr", year: 2022, duration: "14 months", progress: 100 },
  { id: 103, title: "MNIT Smart Campus Platform",                category: "Smart Building",      status: "Planned",   client: "MNIT Jaipur",               budget: "₹7.3 Cr",  year: 2025, duration: "12 months", progress: 0   },
  { id: 104, title: "Embassy Smart Office",                      category: "Smart Building",      status: "Completed", client: "Embassy Group",             budget: "₹12.6 Cr", year: 2023, duration: "16 months", progress: 100 },
  { id: 105, title: "Nexus Smart Retail Hub",                    category: "Smart Building",      status: "Ongoing",   client: "Nexus Malls",               budget: "₹9.8 Cr",  year: 2024, duration: "14 months", progress: 55  },

  // ── Additional BIM Solutions (106-130) ─────────────────────────────
  { id: 106, title: "RSPCB Environment Lab BIM",                 category: "BIM Solutions",       status: "Completed", client: "RSPCB",                     budget: "₹2.1 Cr",  year: 2022, duration: "4 months",  progress: 100 },
  { id: 107, title: "Vidyadhar Nagar Mixed-Use BIM",             category: "BIM Solutions",       status: "Completed", client: "Lodha Group",               budget: "₹6.8 Cr",  year: 2023, duration: "10 months", progress: 100 },
  { id: 108, title: "Sikar Road Industrial Complex BIM",         category: "BIM Solutions",       status: "Ongoing",   client: "RIICO Industrial",          budget: "₹5.4 Cr",  year: 2024, duration: "9 months",  progress: 70  },
  { id: 109, title: "Raja Park Residential BIM",                 category: "BIM Solutions",       status: "Completed", client: "Godrej Properties",         budget: "₹3.6 Cr",  year: 2022, duration: "6 months",  progress: 100 },
  { id: 110, title: "Murlipura Commercial BIM",                  category: "BIM Solutions",       status: "Planned",   client: "DLF Limited",               budget: "₹4.2 Cr",  year: 2025, duration: "8 months",  progress: 0   },
  { id: 111, title: "Sanganer Warehouse BIM",                    category: "BIM Solutions",       status: "Completed", client: "L&T Construction",          budget: "₹2.9 Cr",  year: 2023, duration: "5 months",  progress: 100 },
  { id: 112, title: "Mahindra SEZ BIM Services",                 category: "BIM Solutions",       status: "Ongoing",   client: "Adani Group",               budget: "₹7.8 Cr",  year: 2024, duration: "12 months", progress: 45  },
  { id: 113, title: "Jagatpura Logistics Park BIM",              category: "BIM Solutions",       status: "Completed", client: "Tata Projects",             budget: "₹4.5 Cr",  year: 2023, duration: "7 months",  progress: 100 },
  { id: 114, title: "Pratap Nagar Hospital BIM LOD 500",         category: "BIM Solutions",       status: "Planned",   client: "RUHS Hospital",             budget: "₹8.3 Cr",  year: 2025, duration: "15 months", progress: 0   },
  { id: 115, title: "Civil Lines Office Complex BIM",            category: "BIM Solutions",       status: "Completed", client: "Embassy Group",             budget: "₹5.1 Cr",  year: 2022, duration: "8 months",  progress: 100 },
  { id: 116, title: "Mansarovar Extension BIM",                  category: "BIM Solutions",       status: "Ongoing",   client: "Sobha Developers",          budget: "₹6.3 Cr",  year: 2024, duration: "11 months", progress: 60  },
  { id: 117, title: "Agra Road Commercial Hub BIM",              category: "BIM Solutions",       status: "Completed", client: "Brigade Group",             budget: "₹3.8 Cr",  year: 2023, duration: "6 months",  progress: 100 },
  { id: 118, title: "Tonk Road IT Campus BIM",                   category: "BIM Solutions",       status: "Planned",   client: "Wipro Infrastructure",      budget: "₹9.4 Cr",  year: 2025, duration: "14 months", progress: 0   },
  { id: 119, title: "Delhi Road Mixed-Use BIM",                  category: "BIM Solutions",       status: "Completed", client: "Prestige Group",            budget: "₹4.7 Cr",  year: 2023, duration: "7 months",  progress: 100 },
  { id: 120, title: "Kukas BIM & Coordination Hub",              category: "BIM Solutions",       status: "Ongoing",   client: "Shapoorji Pallonji",        budget: "₹5.6 Cr",  year: 2024, duration: "10 months", progress: 50  },

  // ── Additional Scan-to-BIM (121-135) ───────────────────────────────
  { id: 121, title: "Albert Hall Museum Scan",                   category: "Scan-to-BIM",         status: "Completed", client: "Rajasthan Tourism",         budget: "₹2.4 Cr",  year: 2022, duration: "5 months",  progress: 100 },
  { id: 122, title: "Nahargarh Fort 3D Documentation",           category: "Scan-to-BIM",         status: "Ongoing",   client: "Rajasthan Tourism",         budget: "₹3.2 Cr",  year: 2024, duration: "8 months",  progress: 55  },
  { id: 123, title: "Rambagh Palace Scan-to-BIM",                category: "Scan-to-BIM",         status: "Completed", client: "Rajasthan Tourism",         budget: "₹4.1 Cr",  year: 2023, duration: "9 months",  progress: 100 },
  { id: 124, title: "Sisodia Rani Bagh Scan",                    category: "Scan-to-BIM",         status: "Planned",   client: "Rajasthan Tourism",         budget: "₹1.8 Cr",  year: 2025, duration: "4 months",  progress: 0   },
  { id: 125, title: "Galtaji Temple Complex Scan",               category: "Scan-to-BIM",         status: "Completed", client: "Rajasthan Tourism",         budget: "₹2.7 Cr",  year: 2022, duration: "6 months",  progress: 100 },
  { id: 126, title: "MNIT Heritage Building Scan",               category: "Scan-to-BIM",         status: "Completed", client: "MNIT Jaipur",               budget: "₹1.6 Cr",  year: 2023, duration: "3 months",  progress: 100 },
  { id: 127, title: "Old Secretariat Complex Scan",              category: "Scan-to-BIM",         status: "Ongoing",   client: "Rajasthan Govt PWD",        budget: "₹3.8 Cr",  year: 2024, duration: "9 months",  progress: 35  },
  { id: 128, title: "Pink City Heritage Walk Scan",              category: "Scan-to-BIM",         status: "Completed", client: "Rajasthan Tourism",         budget: "₹5.3 Cr",  year: 2023, duration: "11 months", progress: 100 },
  { id: 129, title: "Sawai Man Singh Stadium Scan",              category: "Scan-to-BIM",         status: "Planned",   client: "Rajasthan Govt PWD",        budget: "₹4.6 Cr",  year: 2025, duration: "8 months",  progress: 0   },
  { id: 130, title: "AIIMS Jodhpur Existing As-Built",           category: "Scan-to-BIM",         status: "Completed", client: "AIIMS Jodhpur",             budget: "₹3.5 Cr",  year: 2022, duration: "7 months",  progress: 100 },

  // ── Additional Automation (131-145) ────────────────────────────────
  { id: 131, title: "Mahindra SEZ Automation Platform",          category: "Automation",          status: "Completed", client: "Adani Group",               budget: "₹14.2 Cr", year: 2023, duration: "16 months", progress: 100 },
  { id: 132, title: "Wipro BPO Jaipur BMS Upgrade",             category: "Automation",          status: "Completed", client: "Wipro Infrastructure",      budget: "₹6.3 Cr",  year: 2022, duration: "9 months",  progress: 100 },
  { id: 133, title: "L&T Industrial Control System",             category: "Automation",          status: "Ongoing",   client: "L&T Construction",          budget: "₹18.5 Cr", year: 2024, duration: "22 months", progress: 50  },
  { id: 134, title: "Tata Projects Automation Suite",            category: "Automation",          status: "Planned",   client: "Tata Projects",             budget: "₹21 Cr",   year: 2025, duration: "24 months", progress: 0   },
  { id: 135, title: "RSPCB Monitoring Automation",               category: "Automation",          status: "Completed", client: "RSPCB",                     budget: "₹5.7 Cr",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 136, title: "Rajasthan Tourism Smart Ticketing",         category: "Automation",          status: "Completed", client: "Rajasthan Tourism",         budget: "₹3.4 Cr",  year: 2022, duration: "6 months",  progress: 100 },
  { id: 137, title: "HCL Factory Automation Integration",        category: "Automation",          status: "Ongoing",   client: "HCL Campus",                budget: "₹9.8 Cr",  year: 2024, duration: "14 months", progress: 60  },
  { id: 138, title: "Sobha Building Automation System",          category: "Automation",          status: "Completed", client: "Sobha Developers",          budget: "₹7.1 Cr",  year: 2023, duration: "10 months", progress: 100 },
  { id: 139, title: "RIICO Smart Park Management",               category: "Automation",          status: "Planned",   client: "RIICO Industrial",          budget: "₹11.4 Cr", year: 2025, duration: "16 months", progress: 0   },
  { id: 140, title: "Embassy Automation Controls Jaipur",        category: "Automation",          status: "Completed", client: "Embassy Group",             budget: "₹8.6 Cr",  year: 2022, duration: "12 months", progress: 100 },

  // ── Additional Infrastructure (141-155) ────────────────────────────
  { id: 141, title: "Jaipur Metro Phase 3 Alignment",            category: "Infrastructure",      status: "Planned",   client: "Jaipur Metro Rail",         budget: "₹120 Cr",  year: 2026, duration: "42 months", progress: 0   },
  { id: 142, title: "Sikar Road Industrial Corridor",             category: "Infrastructure",      status: "Ongoing",   client: "RIICO Industrial",          budget: "₹52 Cr",   year: 2024, duration: "30 months", progress: 35  },
  { id: 143, title: "Jaipur Smart City Phase 4",                 category: "Infrastructure",      status: "Planned",   client: "Rajasthan Govt PWD",        budget: "₹78 Cr",   year: 2025, duration: "36 months", progress: 0   },
  { id: 144, title: "Durgapura Elevated Expressway",             category: "Infrastructure",      status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹34 Cr",   year: 2023, duration: "24 months", progress: 100 },
  { id: 145, title: "Kalwar Road Widening & Drainage",           category: "Infrastructure",      status: "Ongoing",   client: "Rajasthan Govt PWD",        budget: "₹18.6 Cr", year: 2024, duration: "18 months", progress: 55  },
  { id: 146, title: "Tonk Road BRTS Corridor",                   category: "Infrastructure",      status: "Completed", client: "Jaipur Metro Rail",         budget: "₹29.4 Cr", year: 2022, duration: "22 months", progress: 100 },
  { id: 147, title: "Mansarovar Extension Road",                 category: "Infrastructure",      status: "Planned",   client: "Rajasthan Govt PWD",        budget: "₹14.2 Cr", year: 2025, duration: "15 months", progress: 0   },
  { id: 148, title: "Sanganer Dry Port Access Road",             category: "Infrastructure",      status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹8.9 Cr",  year: 2023, duration: "10 months", progress: 100 },
  { id: 149, title: "Mahindra SEZ Internal Roads",               category: "Infrastructure",      status: "Ongoing",   client: "Adani Group",               budget: "₹11.3 Cr", year: 2024, duration: "12 months", progress: 70  },
  { id: 150, title: "Pratap Nagar Pedestrian Bridge",            category: "Infrastructure",      status: "Completed", client: "Jaipur Metro Rail",         budget: "₹6.4 Cr",  year: 2023, duration: "8 months",  progress: 100 },

  // ── Additional MEP Coordination (151-165) ──────────────────────────
  { id: 151, title: "Rajasthan Police HQ MEP",                   category: "MEP Coordination",   status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹6.1 Cr",  year: 2022, duration: "9 months",  progress: 100 },
  { id: 152, title: "Jaipur Airport MEP Upgrade",                category: "MEP Coordination",   status: "Completed", client: "Pink City Airport",         budget: "₹14.5 Cr", year: 2023, duration: "14 months", progress: 100 },
  { id: 153, title: "Sobha MEP Clash Free Model",                category: "MEP Coordination",   status: "Ongoing",   client: "Sobha Developers",          budget: "₹7.2 Cr",  year: 2024, duration: "11 months", progress: 65  },
  { id: 154, title: "Adani Data Centre MEP",                     category: "MEP Coordination",   status: "Planned",   client: "Adani Group",               budget: "₹12.3 Cr", year: 2025, duration: "16 months", progress: 0   },
  { id: 155, title: "AIIMS Jodhpur MEP Coordination",            category: "MEP Coordination",   status: "Completed", client: "AIIMS Jodhpur",             budget: "₹9.8 Cr",  year: 2022, duration: "13 months", progress: 100 },
  { id: 156, title: "Lodha MEP Services Jaipur",                 category: "MEP Coordination",   status: "Completed", client: "Lodha Group",               budget: "₹4.9 Cr",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 157, title: "L&T Hospital MEP BIM",                      category: "MEP Coordination",   status: "Ongoing",   client: "L&T Construction",          budget: "₹8.6 Cr",  year: 2024, duration: "13 months", progress: 50  },
  { id: 158, title: "Tata Projects MEP Integration",             category: "MEP Coordination",   status: "Planned",   client: "Tata Projects",             budget: "₹10.4 Cr", year: 2025, duration: "14 months", progress: 0   },
  { id: 159, title: "Prestige MEP 3D Coordination",              category: "MEP Coordination",   status: "Completed", client: "Prestige Group",            budget: "₹5.7 Cr",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 160, title: "Brigade MEP Coordination Jaipur",           category: "MEP Coordination",   status: "Completed", client: "Brigade Group",             budget: "₹4.3 Cr",  year: 2022, duration: "7 months",  progress: 100 },

  // ── Additional Structural & Green (161-185) ─────────────────────────
  { id: 161, title: "DLF Garden City Structural Design",         category: "Structural Engineering", status: "Completed", client: "DLF Limited",             budget: "₹16.4 Cr", year: 2023, duration: "20 months", progress: 100 },
  { id: 162, title: "Lodha Bellevue Structural Analysis",        category: "Structural Engineering", status: "Ongoing",   client: "Lodha Group",             budget: "₹19.8 Cr", year: 2024, duration: "22 months", progress: 45  },
  { id: 163, title: "Phoenix Mall Extension Structural",         category: "Structural Engineering", status: "Planned",   client: "Phoenix Mills",           budget: "₹24.5 Cr", year: 2025, duration: "24 months", progress: 0   },
  { id: 164, title: "Rajasthan Vidhan Sabha Structural",         category: "Structural Engineering", status: "Completed", client: "Rajasthan Govt PWD",      budget: "₹22.1 Cr", year: 2022, duration: "28 months", progress: 100 },
  { id: 165, title: "Nexus City Mall Structural",                category: "Structural Engineering", status: "Ongoing",   client: "Nexus Malls",             budget: "₹18.3 Cr", year: 2024, duration: "20 months", progress: 40  },
  { id: 166, title: "Embassy Office Park Structural",            category: "Structural Engineering", status: "Completed", client: "Embassy Group",           budget: "₹15.7 Cr", year: 2023, duration: "18 months", progress: 100 },
  { id: 167, title: "Oberoi Trident Hotel Structural",           category: "Structural Engineering", status: "Planned",   client: "Oberoi Realty",           budget: "₹27.3 Cr", year: 2025, duration: "28 months", progress: 0   },
  { id: 168, title: "HCL Campus Expansion Structural",           category: "Structural Engineering", status: "Completed", client: "HCL Campus",              budget: "₹13.2 Cr", year: 2022, duration: "16 months", progress: 100 },
  { id: 169, title: "RMZ Nexity Structural Services",            category: "Structural Engineering", status: "Ongoing",   client: "RMZ Corp",                budget: "₹21.4 Cr", year: 2024, duration: "24 months", progress: 35  },
  { id: 170, title: "Shapoorji Commercial Tower Structural",     category: "Structural Engineering", status: "Completed", client: "Shapoorji Pallonji",      budget: "₹17.9 Cr", year: 2023, duration: "22 months", progress: 100 },

  { id: 171, title: "MNIT Research Block Green Design",          category: "Green Building",      status: "Completed", client: "MNIT Jaipur",               budget: "₹6.8 Cr",  year: 2022, duration: "10 months", progress: 100 },
  { id: 172, title: "Jaipur Rajwas Eco Resort",                  category: "Green Building",      status: "Ongoing",   client: "Rajasthan Tourism",         budget: "₹9.3 Cr",  year: 2024, duration: "14 months", progress: 55  },
  { id: 173, title: "Sobha Hartland LEED Gold",                  category: "Green Building",      status: "Completed", client: "Sobha Developers",          budget: "₹4.7 Cr",  year: 2023, duration: "8 months",  progress: 100 },
  { id: 174, title: "L&T Green Township",                        category: "Green Building",      status: "Planned",   client: "L&T Construction",          budget: "₹15.6 Cr", year: 2025, duration: "20 months", progress: 0   },
  { id: 175, title: "Adani Green City Initiative",               category: "Green Building",      status: "Ongoing",   client: "Adani Group",               budget: "₹22.8 Cr", year: 2024, duration: "28 months", progress: 30  },
  { id: 176, title: "Embassy Greens Jaipur",                     category: "Green Building",      status: "Completed", client: "Embassy Group",             budget: "₹8.4 Cr",  year: 2023, duration: "12 months", progress: 100 },
  { id: 177, title: "Prestige Greenland GRIHA",                  category: "Green Building",      status: "Planned",   client: "Prestige Group",            budget: "₹11.2 Cr", year: 2025, duration: "16 months", progress: 0   },
  { id: 178, title: "DLF Green Valley",                          category: "Green Building",      status: "Completed", client: "DLF Limited",               budget: "₹7.5 Cr",  year: 2022, duration: "11 months", progress: 100 },
  { id: 179, title: "Phoenix Eco Mall Retrofit",                 category: "Green Building",      status: "Ongoing",   client: "Phoenix Mills",             budget: "₹6.1 Cr",  year: 2024, duration: "10 months", progress: 65  },
  { id: 180, title: "Brigade Green Homes",                       category: "Green Building",      status: "Completed", client: "Brigade Group",             budget: "₹5.3 Cr",  year: 2023, duration: "9 months",  progress: 100 },

  // ── Final batch – Architectural & Smart (181-220) ──────────────────
  { id: 181, title: "Kukas Smart Warehouse",                     category: "Smart Building",      status: "Completed", client: "Adani Group",               budget: "₹8.2 Cr",  year: 2023, duration: "11 months", progress: 100 },
  { id: 182, title: "Vishwakarma IoT Factory",                   category: "Smart Building",      status: "Ongoing",   client: "RIICO Industrial",          budget: "₹12.7 Cr", year: 2024, duration: "16 months", progress: 50  },
  { id: 183, title: "Rajasthan Smart Health Grid",               category: "Smart Building",      status: "Planned",   client: "RUHS Hospital",             budget: "₹16.4 Cr", year: 2025, duration: "20 months", progress: 0   },
  { id: 184, title: "Jaipur Smart Parking Hub",                  category: "Smart Building",      status: "Completed", client: "Jaipur Metro Rail",         budget: "₹7.9 Cr",  year: 2023, duration: "10 months", progress: 100 },
  { id: 185, title: "Sikar Road Smart Commerce",                 category: "Smart Building",      status: "Ongoing",   client: "DLF Limited",               budget: "₹9.5 Cr",  year: 2024, duration: "13 months", progress: 45  },
  { id: 186, title: "Mansarovar Smart Residences",               category: "Smart Building",      status: "Planned",   client: "Lodha Group",               budget: "₹14.8 Cr", year: 2025, duration: "18 months", progress: 0   },
  { id: 187, title: "MI Road Smart Retail Spine",                category: "Smart Building",      status: "Completed", client: "Phoenix Mills",             budget: "₹11.3 Cr", year: 2022, duration: "15 months", progress: 100 },
  { id: 188, title: "Tonk Road Smart IT Corridor",               category: "Smart Building",      status: "Ongoing",   client: "TCS Buildings",             budget: "₹18.5 Cr", year: 2024, duration: "22 months", progress: 40  },
  { id: 189, title: "Pratap Nagar Smart Clinic",                 category: "Smart Building",      status: "Completed", client: "RUHS Hospital",             budget: "₹4.8 Cr",  year: 2023, duration: "7 months",  progress: 100 },
  { id: 190, title: "Bani Park Smart Heritage Hotel",            category: "Smart Building",      status: "Planned",   client: "Oberoi Realty",             budget: "₹19.6 Cr", year: 2025, duration: "22 months", progress: 0   },

  { id: 191, title: "Rajasthan Pavilion Expo 2025 Architecture", category: "Architectural Design", status: "Planned",  client: "Rajasthan Govt PWD",        budget: "₹8.7 Cr",  year: 2025, duration: "12 months", progress: 0   },
  { id: 192, title: "Jaipur Polo Ground Clubhouse",              category: "Architectural Design", status: "Completed", client: "Rajasthan Tourism",        budget: "₹5.4 Cr",  year: 2023, duration: "9 months",  progress: 100 },
  { id: 193, title: "Tata Sky Jaipur Office Design",             category: "Architectural Design", status: "Completed", client: "Tata Projects",            budget: "₹2.9 Cr",  year: 2022, duration: "5 months",  progress: 100 },
  { id: 194, title: "Hiranandani Jaipur Luxe Villa",             category: "Architectural Design", status: "Ongoing",   client: "Hiranandani Group",        budget: "₹11.4 Cr", year: 2024, duration: "15 months", progress: 60  },
  { id: 195, title: "RMZ Nextgen Office Tower Design",           category: "Architectural Design", status: "Planned",   client: "RMZ Corp",                 budget: "₹21.3 Cr", year: 2025, duration: "24 months", progress: 0   },
  { id: 196, title: "Prestige Sunbreeze Jaipur",                 category: "Architectural Design", status: "Completed", client: "Prestige Group",           budget: "₹8.6 Cr",  year: 2023, duration: "11 months", progress: 100 },
  { id: 197, title: "Brigade Arcadia Design",                    category: "Architectural Design", status: "Ongoing",   client: "Brigade Group",            budget: "₹14.2 Cr", year: 2024, duration: "18 months", progress: 35  },
  { id: 198, title: "Sobha Indraprastha Design",                 category: "Architectural Design", status: "Planned",   client: "Sobha Developers",         budget: "₹12.7 Cr", year: 2025, duration: "16 months", progress: 0   },
  { id: 199, title: "DLF Cyber City Jaipur Design",             category: "Architectural Design", status: "Ongoing",   client: "DLF Limited",              budget: "₹28.3 Cr", year: 2024, duration: "28 months", progress: 45  },
  { id: 200, title: "Adani Ports Jaipur Dry Port Design",       category: "Architectural Design", status: "Planned",   client: "Adani Group",              budget: "₹35.4 Cr", year: 2025, duration: "32 months", progress: 0   },

  { id: 201, title: "Jaipur Wax Museum BIM",                    category: "BIM Solutions",        status: "Completed", client: "Rajasthan Tourism",         budget: "₹1.8 Cr",  year: 2022, duration: "4 months",  progress: 100 },
  { id: 202, title: "MNIT Incubation Centre BIM",               category: "BIM Solutions",        status: "Ongoing",   client: "MNIT Jaipur",               budget: "₹3.7 Cr",  year: 2024, duration: "8 months",  progress: 55  },
  { id: 203, title: "IIT Jodhpur Research Park BIM",            category: "BIM Solutions",        status: "Planned",   client: "IIT Jodhpur",               budget: "₹7.2 Cr",  year: 2025, duration: "12 months", progress: 0   },
  { id: 204, title: "RSPCB Lab Expansion BIM",                  category: "BIM Solutions",        status: "Completed", client: "RSPCB",                     budget: "₹2.3 Cr",  year: 2023, duration: "5 months",  progress: 100 },
  { id: 205, title: "Rajasthan Cricket Association Stadium BIM", category: "BIM Solutions",        status: "Ongoing",   client: "Rajasthan Govt PWD",        budget: "₹14.6 Cr", year: 2024, duration: "20 months", progress: 40  },
  { id: 206, title: "Jaipur Gems Market Scan-to-BIM",           category: "Scan-to-BIM",          status: "Completed", client: "Rajasthan Tourism",         budget: "₹2.1 Cr",  year: 2023, duration: "4 months",  progress: 100 },
  { id: 207, title: "Jal Mahal Restoration Scan",               category: "Scan-to-BIM",          status: "Ongoing",   client: "Rajasthan Tourism",         budget: "₹3.4 Cr",  year: 2024, duration: "8 months",  progress: 45  },
  { id: 208, title: "Sisodia Rani Garden Scan",                 category: "Scan-to-BIM",          status: "Completed", client: "Rajasthan Tourism",         budget: "₹1.7 Cr",  year: 2022, duration: "3 months",  progress: 100 },
  { id: 209, title: "Kanak Vrindavan Scan-to-BIM",              category: "Scan-to-BIM",          status: "Planned",   client: "Rajasthan Tourism",         budget: "₹2.5 Cr",  year: 2025, duration: "5 months",  progress: 0   },
  { id: 210, title: "Jaipur Zoo Master Plan Scan",               category: "Scan-to-BIM",         status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹2.9 Cr",  year: 2023, duration: "6 months",  progress: 100 },

  { id: 211, title: "Rajasthan Energy Dept Automation",         category: "Automation",           status: "Completed", client: "JVVNL Substations",         budget: "₹9.4 Cr",  year: 2023, duration: "14 months", progress: 100 },
  { id: 212, title: "Jaipur Water Board SCADA",                 category: "Automation",           status: "Ongoing",   client: "Rajasthan Govt PWD",        budget: "₹16.3 Cr", year: 2024, duration: "20 months", progress: 50  },
  { id: 213, title: "AIIMS Jodhpur HVAC BAS",                   category: "Automation",           status: "Completed", client: "AIIMS Jodhpur",             budget: "₹7.8 Cr",  year: 2022, duration: "11 months", progress: 100 },
  { id: 214, title: "Jaipur Metro AFC Automation",              category: "Automation",           status: "Completed", client: "Jaipur Metro Rail",         budget: "₹12.4 Cr", year: 2023, duration: "15 months", progress: 100 },
  { id: 215, title: "RIICO Smart Factory SCADA",                category: "Automation",           status: "Planned",   client: "RIICO Industrial",          budget: "₹18.6 Cr", year: 2025, duration: "22 months", progress: 0   },
  { id: 216, title: "Jaipur Smart Street Lighting",             category: "Smart Building",       status: "Completed", client: "Rajasthan Govt PWD",        budget: "₹8.9 Cr",  year: 2023, duration: "10 months", progress: 100 },
  { id: 217, title: "Mansarovar Smart Grid Project",            category: "Smart Building",       status: "Ongoing",   client: "JVVNL Substations",         budget: "₹14.2 Cr", year: 2024, duration: "18 months", progress: 55  },
  { id: 218, title: "Rajasthan E-Governance Building",          category: "Smart Building",       status: "Planned",   client: "Rajasthan Govt PWD",        budget: "₹11.7 Cr", year: 2025, duration: "15 months", progress: 0   },
  { id: 219, title: "Jaipur Digital Twin City Pilot",           category: "Smart Building",       status: "Ongoing",   client: "Jaipur Metro Rail",         budget: "₹24.5 Cr", year: 2024, duration: "24 months", progress: 30  },
  { id: 220, title: "Rajasthan Tourism Smart Heritage Trail",   category: "Smart Building",       status: "Completed", client: "Rajasthan Tourism",         budget: "₹6.3 Cr",  year: 2023, duration: "9 months",  progress: 100 }
];

// Enrich with location, images, descriptions
const PROJECTS = rawProjects.map((p, idx) => ({
  ...p,
  origin: "Jaipur, Rajasthan, India",
  location: LOCATIONS_NEARBY[idx % LOCATIONS_NEARBY.length],
  image: getImage(idx),
  gallery: getExtraImages(idx),
  description: `A landmark ${p.category} engagement for ${p.client} executed by NewOrbit Services from our Jaipur headquarters. The project involved cutting-edge digital engineering, delivering ${p.status === "Completed" ? "on time with exceptional client satisfaction" : p.status === "Ongoing" ? "active execution with rigorous quality control" : "detailed planning and stakeholder alignment"}.`,
  tags: [p.category, p.status, "Jaipur", "Rajasthan", p.client.split(" ")[0]]
}));

// Testimonials
const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    designation: "Head of Projects, L&T Construction",
    text: "NewOrbit Services transformed our approach to BIM. Their Jaipur team delivered clash-free MEP coordination that saved us weeks of rework on site.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=11"
  },
  {
    name: "Priya Sharma",
    designation: "CTO, Infosys Campus Development",
    text: "The Scan-to-BIM accuracy was phenomenal. We received a highly detailed as-built model for our heritage campus within the agreed timeline.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=47"
  },
  {
    name: "Anil Verma",
    designation: "Director, RIICO Industrial",
    text: "Their automation platform has reduced our facility operational costs by 28%. Truly a world-class team operating out of Jaipur.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=32"
  },
  {
    name: "Sanjay Mehta",
    designation: "VP Infrastructure, Adani Group",
    text: "We have completed six projects with NewOrbit. Their structural engineering BIM models are precise and always delivered ahead of schedule.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=14"
  },
  {
    name: "Deepa Joshi",
    designation: "Project Manager, Rajasthan Tourism",
    text: "Our heritage Scan-to-BIM projects required extreme sensitivity and accuracy. NewOrbit exceeded every expectation for the Amber Fort documentation.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=53"
  },
  {
    name: "Vikram Singh",
    designation: "Director, Jaipur Metro Rail",
    text: "The BIM coordination for Metro Phase 2 has been seamless. NewOrbit's expertise in infrastructure BIM is unmatched in Rajasthan.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=61"
  }
];
