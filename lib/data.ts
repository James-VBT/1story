export interface Service {
  title: string;
  description: string;
  price: number | null;
  priceLabel: string;
  duration: string;
  category: "Personal Growth" | "Career Ambitions";
  image: string;
}

export interface Plan {
  name: string;
  price: number;
  savings: string;
  duration: string;
  description: string;
  features: string[];
  featured: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/book-now" },
  { label: "Plans", href: "/plans" },
  // { label: "Guides", href: "/guides" },
  { label: "Contact", href: "/#contact" },
];

export const services: Service[] = [
  {
    title: "Health & Wellness Coaching",
    description:
      "Transform your life, one healthy habit at a time.",
    price: 100,
    priceLabel: "$100",
    duration: "1 hr",
    category: "Personal Growth",
    image: "/images/services/health-wellness.jpg",
  },
  {
    title: "Personal Life Coaching",
    description:
      "Make, meet and exceed your personal and professional goals.",
    price: 100,
    priceLabel: "$100",
    duration: "1 hr",
    category: "Personal Growth",
    image: "/images/services/personal-life.jpg",
  },
  {
    title: "Career Coaching - Executive",
    description:
      "Enhance your leadership and management skills. Tailored to executives.",
    price: 250,
    priceLabel: "$250",
    duration: "1.5 hrs",
    category: "Career Ambitions",
    image: "/images/services/career-executive.jpg",
  },
  {
    title: "Introductory Consultation",
    description:
      "Get a free assessment and find out if life coaching is right for you.",
    price: null,
    priceLabel: "Free",
    duration: "15 min",
    category: "Personal Growth",
    image: "/images/services/intro-consultation.jpg",
  },
  {
    title: "Master Your Finances",
    description:
      "Take control of your finances once and for all.",
    price: 100,
    priceLabel: "$100",
    duration: "1 hr",
    category: "Personal Growth",
    image: "/images/services/master-finances.jpg",
  },
  {
    title: "Career Coaching - Individual",
    description:
      "Unlock your potential and enjoy the professional success you deserve.",
    price: 100,
    priceLabel: "$100",
    duration: "1 hr",
    category: "Career Ambitions",
    image: "/images/services/career-individual.jpg",
  },
  {
    title: "Team Coaching - Group",
    description:
      "Improve your team's productivity, efficiency, communication and more.",
    price: 550,
    priceLabel: "$550",
    duration: "5 hrs",
    category: "Career Ambitions",
    image: "/images/services/team-group.jpg",
  },
];

export const plans: Plan[] = [
  {
    name: "Discovery",
    price: 275,
    savings: "$25",
    duration: "3 Months",
    description: "Take the first steps on your path to a better future",
    features: ["3 Personal Life Coaching Sessions"],
    featured: false,
  },
  {
    name: "Development",
    price: 550,
    savings: "$50",
    duration: "6 Months",
    description: "Dive deeper into your personal and professional goals",
    features: ["6 Personal and Career Coaching Sessions"],
    featured: true,
  },
  {
    name: "Destiny",
    price: 900,
    savings: "$100",
    duration: "1 Year",
    description: "Elevate your future with a total transformation",
    features: ["Mix from all coaching session types"],
    featured: false,
  },
];

export const contactInfo = {
  address: "500 Terry Francine Street, San Francisco, CA 94158",
  phone: "123-456-7890",
  fax: "123-456-7890",
  email: "info@mysite.com",
};
