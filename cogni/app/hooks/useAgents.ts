import { useState, useEffect } from 'react';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { AIAgent } from '../data-types';
import { getAgents, AgentQueryOptions } from '@/lib/db';

interface UseAgentsReturn {
  agents: AIAgent[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useAgents(options: AgentQueryOptions): UseAgentsReturn {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  //const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | undefined>();
  const [hasMore, setHasMore] = useState(true);

  const fetchAgents = async (refresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const result = await getAgents({
        ...options,
        //lastDoc: refresh ? undefined : lastDoc
      });

      setAgents(prev => refresh ? result.agents : [...prev, ...result.agents]);
      //setLastDoc(result.lastVisible);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch agents'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAgents([]);
    //setLastDoc(undefined);
    setHasMore(true);
    fetchAgents(true);
  }, [options._query, options.industry, options.functionality, options.minPrice, 
      options.maxPrice, options.minRating]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      await fetchAgents();
    }
  };

  const refresh = () => fetchAgents(true);

  return {
    agents,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  };
}