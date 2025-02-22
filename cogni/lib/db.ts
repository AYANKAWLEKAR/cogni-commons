// lib/db.ts
import { 
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    limit,
    startAfter,
    orderBy,
    QueryDocumentSnapshot,
    DocumentData
  } from 'firebase/firestore';
  import { db } from './firebase';
  import { AIAgent } from '@/app/data-types';
import { has } from 'lodash';
  
  export interface AgentQueryOptions {
    _query?: string;
    industry?: string;
    functionality?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    limit?: number;
    lastDoc?: QueryDocumentSnapshot<DocumentData>[];
  }

  export interface GetAgentReturn{

    agents: AIAgent[];
    lastVisible: QueryDocumentSnapshot<DocumentData>[];
    hasMore: boolean;
  }
  
  export async function getAgents({
    _query,
    industry,
    functionality,
    minPrice,
    maxPrice,
    minRating,
    limit: pageLimit = 12,
    lastDoc
  }: AgentQueryOptions) {
   /* try {
      let q = collection(db, 'agents');
      let constraints: any[] = [orderBy('createdAt', 'desc')];
  
      if (_query) {
        constraints.push(where('searchTerms', 'array-contains', _query.toLowerCase()));
      }
  
      if (industry) {
        constraints.push(where('industry', '==', industry));
      }
  
      if (functionality) {
        constraints.push(where('functionality', 'array-contains', functionality));
      }
  
      if (minPrice) {
        constraints.push(where('price', '>=', minPrice));
      }
  
      if (maxPrice) {
        constraints.push(where('price', '<=', maxPrice));
      }
  
      if (minRating) {
        constraints.push(where('rating', '>=', minRating));
      }
  
      constraints.push(limit(pageLimit));
  
      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }
  
      const querySnapshot = await getDocs(query(q, ...constraints));
      
      const agents: AIAgent[] = [];
      querySnapshot.forEach((doc) => {
        agents.push({ id: doc.id, ...doc.data() } as AIAgent);
      });
  
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  
      return {
        agents,
        lastVisible,
        hasMore: querySnapshot.docs.length === pageLimit
      };
    } catch (error) {
      console.error('Error getting agents:', error);
      throw error;
    }
      */

    try{ return generateMockAgents(1,12);}
    catch(error){ console.error("error getting agents", error); 
      throw error;
    }
  }
  
  export async function addAgent(agentData: Omit<AIAgent, 'id'>) {
    try {
      // Add search terms for better querying
      const searchTerms = [
        agentData.name.toLowerCase(),
        agentData.description.toLowerCase(),
        ...agentData.tags.map(tag => tag.toLowerCase())
      ];
  
      const docRef = await addDoc(collection(db, 'agents'), {
        ...agentData,
        searchTerms,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      return docRef.id;
    } catch (error) {
      console.error('Error adding agent:', error);
      throw error;
    }
  }
  
  export async function updateAgent(id: string, agentData: Partial<AIAgent>) {
    try {
      const agentRef = doc(db, 'agents', id);
      await updateDoc(agentRef, {
        ...agentData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  }
  
  export async function deleteAgent(id: string) {
    try {
      await deleteDoc(doc(db, 'agents', id));
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  }

  function generateMockAgents(offset: number, limit: number): GetAgentReturn{ //Mock get Agents response
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
    const lastVisible: QueryDocumentSnapshot<DocumentData>[] = [];//agents[agents.length-1];
    const hasMore=false;
  
    return {agents,lastVisible,hasMore}

  }