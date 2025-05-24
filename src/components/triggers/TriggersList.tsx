
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TriggerCard from './TriggerCard';

interface TriggersListProps {
  triggers: Array<{
    id: number;
    name: string;
    frequency: string;
    lastOccurred: string;
    recovery: number;
    notes: string;
  }>;
  onAddTrigger: () => void;
  onViewChainAnalysis: (triggerId: number) => void;
}

const TriggersList = ({ triggers, onAddTrigger, onViewChainAnalysis }: TriggersListProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Known Triggers</h2>
        <Button onClick={onAddTrigger}>
          <Plus className="mr-2 h-4 w-4" /> Add Trigger
        </Button>
      </div>
      
      <div className="space-y-6">
        {triggers.map((trigger) => (
          <TriggerCard 
            key={trigger.id} 
            trigger={trigger} 
            onViewChainAnalysis={onViewChainAnalysis}
          />
        ))}
      </div>
    </>
  );
};

export default TriggersList;
