
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sunset, Music, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MindfulPractice = () => {
  const practices = [
    {
      id: 1,
      name: 'Guided Meditation',
      duration: '10 min',
      icon: <Sunset className="text-primary" size={18} />,
    },
    {
      id: 2,
      name: 'Calming Music',
      duration: '15 min',
      icon: <Music className="text-primary" size={18} />,
    },
    {
      id: 3,
      name: 'Progressive Relaxation',
      duration: '12 min',
      icon: <Activity className="text-primary" size={18} />,
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mindful Practices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {practices.map((practice) => (
            <div key={practice.id} className="flex items-center justify-between p-2 rounded-md border hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                {practice.icon}
                <div>
                  <div className="font-medium">{practice.name}</div>
                  <div className="text-xs text-muted-foreground">{practice.duration}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">Start</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MindfulPractice;
