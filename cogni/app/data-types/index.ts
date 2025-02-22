export interface AIAgent {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    industry: string;
    functionality: string[];
    image: string;
    developerName: string;
    developerRating: number;
    totalSales: number;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
  }


export interface Contract{
    id : string;
    name : string;
    ask_description: string;
    price: number;
    complexity: number
    company_name:string;
    functionality:string[];
    createdAt: Date;
    tags : [];
    contact: {
        email:string;
        website:string;
        
    }






}