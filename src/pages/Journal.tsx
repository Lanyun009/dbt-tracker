
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle } from 'lucide-react';

const journalEntries = [
  {
    id: 1,
    date: 'May 8, 2025',
    mood: 'Good',
    highlights: 'Completed meditation session, felt calm throughout the day.',
    medications: 'Morning regimen completed',
  },
  {
    id: 2,
    date: 'May 7, 2025',
    mood: 'Okay',
    highlights: 'Struggled with morning anxiety but used breathing techniques.',
    medications: 'Morning and evening regimen completed',
  },
  {
    id: 3,
    date: 'May 6, 2025',
    mood: 'Great',
    highlights: 'Therapy session went well. Practiced mindfulness while walking.',
    medications: 'Morning regimen completed, evening dose delayed',
  },
];

const Journal = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Journal</h1>
        <p className="text-muted-foreground">
          Track your mood, medications, and daily reflections.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Entries</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Entry
        </Button>
      </div>

      <div className="space-y-6">
        {journalEntries.map((entry) => (
          <Card key={entry.id} className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  {entry.date}
                </div>
                <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">
                  {entry.mood}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Highlights</h3>
                  <p>{entry.highlights}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Medications</h3>
                  <p>{entry.medications}</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Journal;
