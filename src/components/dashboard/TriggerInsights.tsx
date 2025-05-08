
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const insights = [
  {
    id: 1,
    trigger: 'Work pressure',
    insight: 'You often feel overwhelmed on Monday mornings. Try preparing for the week on Sunday evening.'
  },
  {
    id: 2,
    trigger: 'Social media',
    insight: 'Usage patterns show increased anxiety after 30+ minutes of social media. Consider setting time limits.'
  },
  {
    id: 3,
    trigger: 'Sleep patterns',
    insight: 'Poor sleep correlates with lower mood the next day. Focus on consistent sleep schedule.'
  }
];

const TriggerInsights = () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  
  const nextInsight = () => {
    setCurrentInsight((prev) => (prev + 1) % insights.length);
  };
  
  const prevInsight = () => {
    setCurrentInsight((prev) => (prev - 1 + insights.length) % insights.length);
  };
  
  const insight = insights[currentInsight];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain size={18} className="text-primary" />
          Trigger Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[100px] mb-4">
          <div className="font-medium mb-1">{insight.trigger}</div>
          <p className="text-sm text-muted-foreground">{insight.insight}</p>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={prevInsight}>Previous</Button>
          <Button variant="outline" size="sm" onClick={nextInsight}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerInsights;
