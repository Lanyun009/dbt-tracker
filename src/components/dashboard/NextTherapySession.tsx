
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const NextTherapySession = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          Next Therapy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <h3 className="font-medium text-lg mb-1">Dr. Sarah Johnson</h3>
          <div className="font-semibold text-xl mb-2">Thursday, May 15</div>
          <div className="text-primary font-medium">3:00 PM - 4:00 PM</div>
          <div className="text-sm text-muted-foreground mt-2">Virtual Session</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextTherapySession;
