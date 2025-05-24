
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PotentialTriggerCardProps {
  item: {
    id: number;
    pattern: string;
    suggestion: string;
    confidence: string;
  };
}

const PotentialTriggerCard = ({ item }: PotentialTriggerCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {item.pattern}
          </div>
          <span className={`text-sm px-3 py-1 rounded-full ${
            item.confidence === 'High' ? 'bg-primary/20 text-primary' : 
            'bg-secondary/20 text-secondary'
          }`}>
            {item.confidence} Confidence
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{item.suggestion}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Dismiss</Button>
          <Button size="sm">Add to Known Triggers</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PotentialTriggerCard;
