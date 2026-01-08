
export interface Lead {
  id: string;
  name: string;
  businessName: string;
  email: string;
  websiteType: string;
  budgetRange: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
}

export enum WebsiteType {
  Business = 'Business Website',
  Ecommerce = 'E-commerce Store',
  LandingPage = 'Landing Page',
  SaaS = 'SaaS Platform',
  Portfolio = 'Portfolio / Personal',
  Other = 'Other'
}

export enum BudgetRange {
  Startup = '$500 - $1,000',
  Growth = '$1,000 - $3,000',
  Enterprise = '$3,000 - $10,000',
  Custom = '$10,000+'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
}
