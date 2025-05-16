
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const highlights = [
  {
    week: "Week 1",
    topic: "Introduction to DBT",
    insight: "Understanding emotions as signals rather than problems."
  },
  {
    week: "Week 2",
    topic: "Mindfulness Skills",
    insight: "Learning to observe thoughts without judgment."
  },
  {
    week: "Week 3",
    topic: "Distress Tolerance",
    insight: "Developing techniques to weather emotional storms."
  },
  {
    week: "Week 4",
    topic: "Interpersonal Effectiveness",
    insight: "Balancing objectives with relationship needs."
  }
];

const GroupHighlights = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users size={18} className="text-primary" />
          Group Highlights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {highlights.map((highlight, index) => (
            <div key={index} className="border-b pb-3 last:border-b-0">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-primary">{highlight.week}</span>
                <span className="text-sm text-muted-foreground">{highlight.topic}</span>
              </div>
              <p className="text-sm">{highlight.insight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupHighlights;
