
import { StrategySection } from './types';

export const STRATEGY_STEPS: Omit<StrategySection, 'userInput' | 'aiOutput'>[] = [
  {
    title: 'Business Idea & Vision',
    description: "Start with the big picture. What is your core business idea? What is your mission and vision for the company?",
    placeholder: "e.g., An eco-friendly subscription box for cleaning products that reduces plastic waste.",
    prompt: (input) => `
      Based on the business idea: "${input}", generate a compelling Mission Statement and a Vision Statement.
      Then, write a detailed company summary that elaborates on the core concept, its value proposition, and long-term goals.
      Format the output in Markdown with clear headings for 'Mission Statement', 'Vision Statement', and 'Company Summary'.`
  },
  {
    title: 'Market Analysis',
    description: "Understand your battlefield. Who is your target audience, and who are your main competitors?",
    placeholder: "Based on my idea, help me understand the market.",
    prompt: (input, context) => `
      Here is the business idea: ${context}.
      And here are some initial thoughts from the user: "${input}".
      
      Conduct a detailed market analysis. The analysis should be formatted in Markdown and include the following sections:
      1.  **Target Audience:** Create detailed personas, including demographics, psychographics, needs, and pain points.
      2.  **Market Size & Trends:** Estimate the market size and identify 3-5 key industry trends.
      3.  **Competitor Analysis:** Identify at least 3 main competitors. For each, describe their strengths, weaknesses, and market positioning.`
  },
  {
    title: 'Product & Service Details',
    description: "Define what you sell. What are the features, benefits, and unique selling propositions (USPs) of your products or services?",
    placeholder: "Describe the key features of the products/services.",
    prompt: (input, context) => `
      The business concept is: ${context}.
      The user has provided these details about the product/service: "${input}".

      Elaborate on this to create a detailed 'Product & Service' description. Format in Markdown and include:
      1.  **Core Offerings:** A detailed list of the products or services.
      2.  **Key Features & Benefits:** Explain what each offering does and what problem it solves for the customer.
      3.  **Unique Selling Proposition (USP):** Clearly state what makes this offering different and better than the competition.`
  },
  {
    title: 'Marketing & Sales Strategy',
    description: "How will you reach your customers and generate revenue? Outline your marketing channels and sales process.",
    placeholder: "I'm thinking of using social media, but I need a more complete plan.",
     prompt: (input, context) => `
      The business is: ${context}.
      The user's initial marketing ideas are: "${input}".

      Develop a comprehensive Marketing and Sales Strategy. Format in Markdown and cover these areas:
      1.  **Marketing Channels:** Suggest a mix of digital and traditional channels (e.g., Content Marketing, SEO, Social Media, Email Marketing, Partnerships).
      2.  **Sales Funnel:** Describe the stages of the customer journey from awareness to purchase.
      3.  **Key Messaging:** What core messages will you use to attract and convert customers?`
  },
  {
    title: 'Financial Projections',
    description: "Let's talk numbers. What are your main revenue streams and what are the key costs you anticipate?",
    placeholder: "Revenue from monthly subscriptions. Costs include product sourcing, packaging, and marketing.",
     prompt: (input, context) => `
      The business is: ${context}.
      The user's thoughts on financials are: "${input}".

      Create a foundational financial plan. Format in Markdown with these sections:
      1.  **Revenue Streams:** Detail the primary ways the business will make money.
      2.  **Cost Structure:** Break down the major anticipated costs (Cost of Goods Sold, operational expenses, marketing budget, etc.).
      3.  **Pricing Strategy:** Suggest a pricing model and justification.`
  },
];
