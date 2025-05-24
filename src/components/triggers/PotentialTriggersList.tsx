
import React from 'react';
import PotentialTriggerCard from './PotentialTriggerCard';

interface PotentialTriggersListProps {
  triggers: Array<{
    id: number;
    pattern: string;
    suggestion: string;
    confidence: string;
  }>;
}

const PotentialTriggersList = ({ triggers }: PotentialTriggersListProps) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Potential Trigger Patterns</h2>
        <p className="text-muted-foreground">
          Based on your journal entries and biometric data, these patterns may indicate unknown triggers.
        </p>
      </div>
      
      <div className="space-y-6">
        {triggers.map((item) => (
          <PotentialTriggerCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default PotentialTriggersList;
