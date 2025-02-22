import type { NextApiRequest, NextApiResponse } from 'next';
import { AIAgent } from '@/app/data-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    query,
    industry,
    functionality,
    minPrice,
    maxPrice,
    minRating,
    page = 1,
    limit = 12,
  } = req.query;

  try {
    // In a real application, this would be your database query
    // For now, we'll simulate pagination and filtering
    const offset = (Number(page) - 1) * Number(limit);
    
    // Implement your database query here
    // const agents = await prisma.aiAgents.findMany({
    //   where: {
    //     AND: [
    //       query ? {
    //         OR: [
    //           { name: { contains: query, mode: 'insensitive' } },
    //           { description: { contains: query, mode: 'insensitive' } },
    //           { tags: { hasSome: [query] } },
    //         ],
    //       } : {},
    //       industry ? { industry } : {},
    //       functionality ? { functionality: { hasSome: [functionality] } } : {},
    //       minPrice ? { price: { gte: Number(minPrice) } } : {},
    //       maxPrice ? { price: { lte: Number(maxPrice) } } : {},
    //       minRating ? { rating: { gte: Number(minRating) } } : {},
    //     ],
    //   },
    //   skip: offset,
    //   take: Number(limit),
    //   orderBy: { rating: 'desc' },
    // });

    
    const agents = generateMockAgents(offset, Number(limit));

    res.status(200).json({
      agents,
      totalPages: Math.ceil(3 / Number(limit)), // Replace 100 with actual count
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching agents' });
  }
}

function generateMockAgents(offset: number, limit: number): AIAgent[] {
  const agents: AIAgent[] = [];
  const industries = ['Retail', 'Healthcare', 'Finance', 'Technology', 'Education'];
  const functionalities = ['Chatbot', 'Data Analysis', 'Automation', 'Content Generation'];
  const tags =['Simple', "GenerativeAI", "ResearchBot", "Small Business", "Code Generation"]

  for (let i = 0; i < limit; i++) {
    agents.push({
      id: `agent-${offset + i}`,
      name: `AI Agent ${offset + i}`,
      description: `Advanced AI solution for ${industries[i % industries.length]} industry`,
      price: Math.floor(Math.random() * 900) + 100,
      rating: Math.floor(Math.random() * 2) + 3,
      industry: industries[i % industries.length],
      functionality: [functionalities[i % functionalities.length]],
      image: `/api/placeholder/400/320`,
      developerName: `Developer ${i}`,
      developerRating: Math.floor(Math.random() * 2) + 3,
      totalSales: Math.floor(Math.random() * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [`tag: ${tags[i]}`, `category${i}`],
    });
  }

  return agents;
}