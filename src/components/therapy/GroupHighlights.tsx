
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const GroupHighlights = () => {
  const recentSessions = [
    {
      date: 'May 14, 2025',
      highlights: [
        'Practiced DEAR MAN technique for making requests',
        'Role played difficult conversations with family members',
        'Discussed managing strong emotions during confrontations'
      ],
      personalInsight: 'I realized I tend to avoid conflict even when addressing important needs. I'm going to practice stating my needs clearly while maintaining relationships.'
    },
    {
      date: 'May 7, 2025',
      highlights: [
        'Explored patterns of people-pleasing behavior',
        'Identified personal values and priorities',
        'Learned validation techniques for self and others'
      ],
      personalInsight: 'Understanding my core values helped me see why certain interactions feel so uncomfortable. I want to align my actions more closely with my values.'
    },
    {
      date: 'April 30, 2025',
      highlights: [
        'Focused on mindfulness in communication',
        'Discussed how to recognize emotional triggers',
        'Practiced active listening skills'
      ],
      personalInsight: 'I noticed how often I prepare my response instead of truly listening. Being more present during conversations has helped reduce misunderstandings.'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText size={18} className="text-primary" />
          Session Highlights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentSessions.map((session, index) => (
            <div key={index} className={`${index !== 0 ? 'border-t border-border pt-5' : ''}`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">{session.date}</h3>
                <span className="text-xs text-muted-foreground">Session {recentSessions.length - index}</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Group Highlights:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 pl-1">
                    {session.highlights.map((highlight, hIndex) => (
                      <li key={hIndex}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">My Insight:</h4>
                  <p className="text-sm italic">{session.personalInsight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupHighlights;
