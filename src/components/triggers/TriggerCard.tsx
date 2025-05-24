
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TriggerCardProps {
  trigger: {
    id: number;
    name: string;
    frequency: string;
    lastOccurred: string;
    recovery: number;
    notes: string;
  };
  onViewChainAnalysis: (triggerId: number) => void;
}

const TriggerCard = ({ trigger, onViewChainAnalysis }: TriggerCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain size={18} className="text-primary" />
            {trigger.name}
          </div>
          <span className={`text-sm px-3 py-1 rounded-full ${
            trigger.frequency === 'High' ? 'bg-destructive/20 text-destructive' : 
            trigger.frequency === 'Medium' ? 'bg-amber-500/20 text-amber-700' : 
            'bg-emerald-500/20 text-emerald-700'
          }`}>
            {trigger.frequency} Frequency
          </span>
        </CardTitle>
        <CardDescription>Last occurred: {trigger.lastOccurred}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Recovery Progress</span>
              <span>{trigger.recovery}%</span>
            </div>
            <Progress value={trigger.recovery} />
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
            <p className="text-sm">{trigger.notes}</p>
          </div>
          
          <div className="pt-2 flex justify-end">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => onViewChainAnalysis(trigger.id)}
            >
              View Chain Analysis <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerCard;
