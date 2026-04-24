// ── NGO Verticals ──────────────────────────────────────────────
export const verticals = [
  {
    id: 1, name: "Food Security", slug: "food-security",
    color: "#D4891A", lightColor: "#FFF3E0", icon: "🌾",
    description: "Fighting hunger through food drives, community kitchens, and distribution camps across India.",
    stats: { campaigns: 12, volunteers: 340, impact: "25,000 Meals Served" }
  },
  {
    id: 2, name: "Child Welfare", slug: "child-welfare",
    color: "#1976D2", lightColor: "#E3F2FD", icon: "👶",
    description: "Empowering children with education, healthcare, and mentoring programs for a brighter future.",
    stats: { campaigns: 8, volunteers: 210, impact: "1,800 Children Impacted" }
  },
  {
    id: 3, name: "Animal Rescue", slug: "animal-rescue",
    color: "#C0392B", lightColor: "#FFEBEE", icon: "🐾",
    description: "Rescuing, rehabilitating, and rehoming animals through shelters, vet camps, and adoption drives.",
    stats: { campaigns: 10, volunteers: 185, impact: "620 Animals Rescued" }
  },
  {
    id: 4, name: "Environment", slug: "environment",
    color: "#2E7D32", lightColor: "#E8F5E9", icon: "🌿",
    description: "Protecting our planet through tree planting, beach cleanups, and environmental awareness campaigns.",
    stats: { campaigns: 15, volunteers: 420, impact: "12,500 Trees Planted" }
  }
];

// ── Campaigns ──────────────────────────────────────────────────
export const campaigns = [
  {
    id: 1, verticalId: 1, title: "Mumbai Food Drive 2025",
    description: "Join us in distributing 5,000 meal packs across Dharavi and surrounding communities. Volunteers will help with packing, logistics, and on-ground distribution over the weekend.",
    dateStart: "2025-07-15", dateEnd: "2025-07-16",
    location: "Dharavi Community Center, Mumbai",
    city: "Mumbai", maxVolunteers: 80, enrolledCount: 62,
    status: "active", coordinator: "Priya Sharma",
    image: null,
    requirements: ["Weekend availability", "Physical fitness for lifting", "Own transportation preferred"],
    impact: { metric: "Meals Served", target: 5000, current: 3200 }
  },
  {
    id: 2, verticalId: 2, title: "Bangalore Education Camp",
    description: "A 3-day education camp for underprivileged children covering mathematics, English, and computer basics. Volunteers will teach, mentor, and inspire young minds.",
    dateStart: "2025-07-20", dateEnd: "2025-07-22",
    location: "Government School, Koramangala, Bangalore",
    city: "Bangalore", maxVolunteers: 40, enrolledCount: 28,
    status: "active", coordinator: "Rahul Menon",
    image: null,
    requirements: ["Teaching experience preferred", "Laptop for computer sessions", "Patience and enthusiasm"],
    impact: { metric: "Children Impacted", target: 200, current: 0 }
  },
  {
    id: 3, verticalId: 3, title: "Delhi Stray Animal Rescue Drive",
    description: "Collaborative rescue operation across South Delhi to vaccinate, treat, and shelter stray dogs and cats. Veterinary volunteers especially needed.",
    dateStart: "2025-08-01", dateEnd: "2025-08-03",
    location: "Saket Animal Shelter, New Delhi",
    city: "Delhi", maxVolunteers: 50, enrolledCount: 45,
    status: "active", coordinator: "Dr. Ananya Gupta",
    image: null,
    requirements: ["Veterinary background preferred", "Comfortable with animals", "Tetanus vaccination required"],
    impact: { metric: "Animals Rescued", target: 150, current: 87 }
  },
  {
    id: 4, verticalId: 4, title: "Chennai Beach Cleanup Marathon",
    description: "Massive cleanup initiative covering Marina Beach and Elliot's Beach. Goal: Remove 2 tonnes of plastic waste and raise awareness about ocean conservation.",
    dateStart: "2025-07-28", dateEnd: "2025-07-28",
    location: "Marina Beach, Chennai",
    city: "Chennai", maxVolunteers: 200, enrolledCount: 156,
    status: "active", coordinator: "Karthik Iyer",
    image: null,
    requirements: ["Sunscreen and hat", "Reusable water bottle", "Comfortable shoes"],
    impact: { metric: "Kgs Waste Collected", target: 2000, current: 0 }
  },
  {
    id: 5, verticalId: 1, title: "Pune Community Kitchen Launch",
    description: "Help establish a permanent community kitchen in Pune's Hadapsar area that will serve 500 meals daily to the homeless and migrant workers.",
    dateStart: "2025-08-10", dateEnd: "2025-08-15",
    location: "Hadapsar Social Center, Pune",
    city: "Pune", maxVolunteers: 60, enrolledCount: 33,
    status: "upcoming", coordinator: "Sunita Deshpande",
    image: null,
    requirements: ["Food safety knowledge helpful", "Early morning availability", "Physical stamina"],
    impact: { metric: "Meals Served", target: 3000, current: 0 }
  },
  {
    id: 6, verticalId: 4, title: "Hyderabad Tree Plantation Drive",
    description: "Plant 10,000 saplings across Hyderabad's urban zones to combat rising temperatures. Each volunteer plants and adopts 20 trees for year-long nurturing.",
    dateStart: "2025-08-05", dateEnd: "2025-08-06",
    location: "KBR National Park, Hyderabad",
    city: "Hyderabad", maxVolunteers: 500, enrolledCount: 312,
    status: "active", coordinator: "Vijay Reddy",
    image: null,
    requirements: ["Gardening gloves", "Water bottle", "Sun protection"],
    impact: { metric: "Trees Planted", target: 10000, current: 4200 }
  },
  {
    id: 7, verticalId: 2, title: "Kolkata Child Health Check Camp",
    description: "Free health screening camp for children in Kolkata's underserved neighborhoods. Medical volunteers will provide check-ups, vaccinations, and health education.",
    dateStart: "2025-08-12", dateEnd: "2025-08-13",
    location: "Salt Lake Community Hall, Kolkata",
    city: "Kolkata", maxVolunteers: 35, enrolledCount: 19,
    status: "upcoming", coordinator: "Dr. Sneha Roy",
    image: null,
    requirements: ["Medical background required for clinical roles", "Non-medical volunteers for logistics", "Empathy"],
    impact: { metric: "Children Impacted", target: 500, current: 0 }
  },
  {
    id: 8, verticalId: 3, title: "Jaipur Adoption Drive & Vet Camp",
    description: "Weekend adoption drive paired with free veterinary camp. Help match rescued animals with loving families and provide medical care to shelter animals.",
    dateStart: "2025-08-18", dateEnd: "2025-08-19",
    location: "Jaipur Animal Welfare Society, Jaipur",
    city: "Jaipur", maxVolunteers: 45, enrolledCount: 12,
    status: "upcoming", coordinator: "Meera Agarwal",
    image: null,
    requirements: ["Animal handling experience helpful", "Social media skills for adoption campaigns", "Weekend commitment"],
    impact: { metric: "Animals Rescued", target: 80, current: 0 }
  },
  {
    id: 9, verticalId: 4, title: "Goa Mangrove Restoration Project",
    description: "Restore 5 hectares of degraded mangrove habitat along Goa's coastline. Volunteers will plant mangrove saplings, remove invasive species, and set up monitoring stations.",
    dateStart: "2025-09-01", dateEnd: "2025-09-05",
    location: "Mandovi River Estuary, Goa",
    city: "Goa", maxVolunteers: 100, enrolledCount: 67,
    status: "upcoming", coordinator: "Antonio Fernandes",
    image: null,
    requirements: ["Comfortable in muddy terrain", "Basic swimming ability", "5-day commitment"],
    impact: { metric: "Trees Planted", target: 5000, current: 0 }
  },
];

// ── Platform Stats ─────────────────────────────────────────────
export const platformStats = {
  totalVolunteers: 1155,
  activeCampaigns: 9,
  totalHoursDonated: 18420,
  citiesCovered: 14,
  mealsServed: 25000,
  childrenImpacted: 1800,
  animalsRescued: 620,
  treesPlanted: 12500
};

// ── Volunteer Profile Data ─────────────────────────────────────
export const volunteerProfile = {
  id: 1,
  fullName: "Akshay Kumar",
  email: "akshay@example.com",
  phone: "+91 98765 43210",
  city: "Mumbai",
  bio: "Passionate about social impact and community development. Computer Science student by day, volunteer by heart.",
  skills: ["Teaching", "Event Management", "Photography", "First Aid"],
  avatar: null,
  joinedDate: "2024-11-15",
  totalHours: 128,
  campaignsJoined: 7,
  ngoAffiliations: ["Food Security", "Environment", "Child Welfare"],
  documents: [
    { id: 1, type: "Aadhar Card", status: "approved", uploadedAt: "2024-11-15" },
    { id: 2, type: "College ID", status: "approved", uploadedAt: "2024-11-15" },
    { id: 3, type: "First Aid Certificate", status: "pending", uploadedAt: "2025-06-01" },
  ],
  enrolledCampaigns: [
    { campaignId: 1, title: "Mumbai Food Drive 2025", vertical: "Food Security", hoursLogged: 12, status: "active" },
    { campaignId: 4, title: "Chennai Beach Cleanup Marathon", vertical: "Environment", hoursLogged: 8, status: "active" },
    { campaignId: 6, title: "Hyderabad Tree Plantation Drive", vertical: "Environment", hoursLogged: 16, status: "active" },
  ]
};

// ── Chart Data ─────────────────────────────────────────────────
export const monthlyHours = [
  { month: "Jul '24", hours: 8, campaign: "Food Drive" },
  { month: "Aug '24", hours: 16, campaign: "Tree Planting" },
  { month: "Sep '24", hours: 12, campaign: "Education Camp" },
  { month: "Oct '24", hours: 6, campaign: "Animal Rescue" },
  { month: "Nov '24", hours: 20, campaign: "Beach Cleanup" },
  { month: "Dec '24", hours: 14, campaign: "Food Kitchen" },
  { month: "Jan '25", hours: 10, campaign: "Mentoring" },
  { month: "Feb '25", hours: 18, campaign: "Tree Planting" },
  { month: "Mar '25", hours: 8, campaign: "Health Camp" },
  { month: "Apr '25", hours: 22, campaign: "Rescue Drive" },
  { month: "May '25", hours: 0, campaign: "" },
  { month: "Jun '25", hours: 14, campaign: "Food Drive" },
];

export const ngoDistribution = [
  { name: "Food Security", value: 35, color: "#D4891A" },
  { name: "Child Welfare", value: 20, color: "#1976D2" },
  { name: "Animal Rescue", value: 15, color: "#C0392B" },
  { name: "Environment", value: 30, color: "#2E7D32" },
];

export const weeklyActivity = [
  { day: "Mon", food: 2, child: 1, animal: 0, env: 3 },
  { day: "Tue", food: 0, child: 2, animal: 1, env: 1 },
  { day: "Wed", food: 3, child: 0, animal: 2, env: 2 },
  { day: "Thu", food: 1, child: 3, animal: 0, env: 1 },
  { day: "Fri", food: 2, child: 1, animal: 3, env: 0 },
  { day: "Sat", food: 4, child: 2, animal: 1, env: 4 },
  { day: "Sun", food: 3, child: 1, animal: 2, env: 3 },
];

// ── Admin Analytics ────────────────────────────────────────────
export const adminKPIs = {
  totalVolunteers: 1155,
  pendingApprovals: 23,
  activeCampaigns: 9,
  totalHoursLogged: 18420,
};

export const volunteersPerVertical = [
  { vertical: "Food Security", count: 340, color: "#D4891A" },
  { vertical: "Child Welfare", count: 210, color: "#1976D2" },
  { vertical: "Animal Rescue", count: 185, color: "#C0392B" },
  { vertical: "Environment", count: 420, color: "#2E7D32" },
];

export const dailySignups = [
  { date: "Jun 1", signups: 5 }, { date: "Jun 2", signups: 8 },
  { date: "Jun 3", signups: 3 }, { date: "Jun 4", signups: 12 },
  { date: "Jun 5", signups: 7 }, { date: "Jun 6", signups: 15 },
  { date: "Jun 7", signups: 9 }, { date: "Jun 8", signups: 11 },
  { date: "Jun 9", signups: 6 }, { date: "Jun 10", signups: 18 },
  { date: "Jun 11", signups: 14 }, { date: "Jun 12", signups: 8 },
  { date: "Jun 13", signups: 22 }, { date: "Jun 14", signups: 10 },
  { date: "Jun 15", signups: 16 }, { date: "Jun 16", signups: 13 },
  { date: "Jun 17", signups: 7 }, { date: "Jun 18", signups: 20 },
  { date: "Jun 19", signups: 11 }, { date: "Jun 20", signups: 9 },
  { date: "Jun 21", signups: 25 }, { date: "Jun 22", signups: 14 },
  { date: "Jun 23", signups: 17 }, { date: "Jun 24", signups: 8 },
  { date: "Jun 25", signups: 19 }, { date: "Jun 26", signups: 12 },
  { date: "Jun 27", signups: 21 }, { date: "Jun 28", signups: 15 },
  { date: "Jun 29", signups: 10 }, { date: "Jun 30", signups: 23 },
];

export const allVolunteers = [
  { id: 1, name: "Akshay Kumar", email: "akshay@example.com", city: "Mumbai", joinedDate: "2024-11-15", hours: 128, status: "approved", verticals: ["Food Security", "Environment"] },
  { id: 2, name: "Priya Patel", email: "priya@example.com", city: "Bangalore", joinedDate: "2024-12-01", hours: 96, status: "approved", verticals: ["Child Welfare"] },
  { id: 3, name: "Rahul Singh", email: "rahul@example.com", city: "Delhi", joinedDate: "2025-01-10", hours: 64, status: "approved", verticals: ["Animal Rescue", "Environment"] },
  { id: 4, name: "Sneha Reddy", email: "sneha@example.com", city: "Hyderabad", joinedDate: "2025-02-05", hours: 42, status: "pending", verticals: ["Food Security"] },
  { id: 5, name: "Arjun Nair", email: "arjun@example.com", city: "Chennai", joinedDate: "2025-03-15", hours: 88, status: "approved", verticals: ["Environment"] },
  { id: 6, name: "Meera Joshi", email: "meera@example.com", city: "Pune", joinedDate: "2025-03-20", hours: 35, status: "approved", verticals: ["Child Welfare", "Food Security"] },
  { id: 7, name: "Vikram Das", email: "vikram@example.com", city: "Kolkata", joinedDate: "2025-04-01", hours: 20, status: "pending", verticals: ["Animal Rescue"] },
  { id: 8, name: "Ananya Gupta", email: "ananya@example.com", city: "Jaipur", joinedDate: "2025-04-10", hours: 55, status: "approved", verticals: ["Environment", "Animal Rescue"] },
  { id: 9, name: "Karan Mehta", email: "karan@example.com", city: "Mumbai", joinedDate: "2025-05-01", hours: 12, status: "pending", verticals: ["Food Security"] },
  { id: 10, name: "Divya Sharma", email: "divya@example.com", city: "Delhi", joinedDate: "2025-05-15", hours: 72, status: "approved", verticals: ["Child Welfare", "Environment"] },
];

export const pendingDocuments = [
  { id: 1, volunteerId: 4, volunteerName: "Sneha Reddy", docType: "Aadhar Card", uploadedAt: "2025-06-10", status: "pending" },
  { id: 2, volunteerId: 7, volunteerName: "Vikram Das", docType: "College ID", uploadedAt: "2025-06-12", status: "pending" },
  { id: 3, volunteerId: 9, volunteerName: "Karan Mehta", docType: "Aadhar Card", uploadedAt: "2025-06-14", status: "pending" },
  { id: 4, volunteerId: 4, volunteerName: "Sneha Reddy", docType: "Work ID", uploadedAt: "2025-06-15", status: "pending" },
  { id: 5, volunteerId: 7, volunteerName: "Vikram Das", docType: "First Aid Certificate", uploadedAt: "2025-06-16", status: "pending" },
];
