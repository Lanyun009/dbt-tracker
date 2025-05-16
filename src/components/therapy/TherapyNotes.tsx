
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TherapyNotes = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText size={18} className="text-primary" />
          My Therapy Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border border-border rounded-md p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Pre-session goals:</h4>
              <span className="text-xs text-muted-foreground">May 21</span>
            </div>
            <p className="text-sm">
              1. Share my experience with the DEAR MAN technique<br/>
              2. Ask about handling criticism from family members<br/>
              3. Practice the validation exercise
            </p>
          </div>
          
          <div className="border border-border rounded-md p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Questions for facilitator:</h4>
              <span className="text-xs text-muted-foreground">May 21</span>
            </div>
            <p className="text-sm">
              • How to handle when someone ignores boundaries<br/>
              • Managing emotions when conversations become heated<br/>
              • Resources for practicing between sessions
            </p>
          </div>
          
          <Button className="w-full">
            Add New Notes
          </Button>
          
          <Button className="w-full" variant="outline">
            View Previous Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapyNotes;
