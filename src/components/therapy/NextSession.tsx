
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NextSession = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          Next Group Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <h3 className="font-medium text-lg mb-1">Interpersonal Skills Group</h3>
          <div className="font-semibold text-xl mb-2">Wednesday, May 21</div>
          <div className="text-primary font-medium">6:00 PM - 7:30 PM</div>
          <div className="text-sm text-muted-foreground mt-2 mb-4">Community Health Center<br/>Room 204</div>
          
          <div className="space-y-2">
            <Button className="w-full" variant="default">
              Add to Calendar
            </Button>
            <Button className="w-full" variant="outline">
              View Details
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="font-medium mb-2">Upcoming Topic</h4>
            <p className="text-sm text-muted-foreground">
              Assertiveness skills and managing "challenging personalities" in your support network
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextSession;
