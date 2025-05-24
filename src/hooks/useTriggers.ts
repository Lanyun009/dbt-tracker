
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Trigger {
  id: string;
  name: string;
  frequency: string;
  trigger_type: string;
  notes: string | null;
  last_occurred: string | null;
  recovery: number;
  created_at: string;
  updated_at: string;
}

export const useTriggers = () => {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTriggers = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setTriggers([]);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('triggers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching triggers:', error);
        toast({
          title: "Error",
          description: "Failed to load triggers.",
          variant: "destructive"
        });
        return;
      }

      setTriggers(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading triggers.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTriggers();
  }, []);

  const knownTriggers = triggers.filter(trigger => trigger.trigger_type === 'known');
  const potentialTriggers = triggers.filter(trigger => trigger.trigger_type === 'potential');

  return {
    triggers,
    knownTriggers,
    potentialTriggers,
    isLoading,
    refetch: fetchTriggers
  };
};
