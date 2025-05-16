
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const GroupSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User size={18} className="text-primary" />
          Group Therapy Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">Interpersonal Effectiveness Group</h3>
            <p className="text-muted-foreground">
              This group focuses on developing skills to navigate relationships effectively while maintaining 
              self-respect and strengthening relationships. Through structured exercises and feedback, 
              members learn to balance priorities versus demands, maintain relationships, and build self-respect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border border-border rounded-md p-4">
              <h4 className="font-medium mb-2">Recent Topics</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Setting healthy boundaries</li>
                <li>Effective communication strategies</li>
                <li>Managing emotional responses</li>
                <li>Building distress tolerance</li>
              </ul>
            </div>
            
            <div className="border border-border rounded-md p-4">
              <h4 className="font-medium mb-2">Group Progress</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Improved group cohesion</li>
                <li>Increased participation from all members</li>
                <li>More vulnerable sharing</li>
                <li>Application of skills between sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupSummary;
