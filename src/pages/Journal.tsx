
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, PlusCircle, BookText, Pill } from 'lucide-react';
import NewJournalEntry from '@/components/journal/NewJournalEntry';

const journalEntries = [
  {
    id: 1,
    date: 'May 8, 2025',
    mood: {
      morning: 'Good',
      evening: 'Great'
    },
    dailyGoal: 'Practice mindfulness throughout the day',
    highlights: 'Completed meditation session, felt calm throughout the day.',
    medications: 'Morning regimen completed',
    todoProgress: '3/3',
  },
  {
    id: 2,
    date: 'May 7, 2025',
    mood: {
      morning: 'Okay',
      evening: 'Good'
    },
    dailyGoal: 'Use breathing techniques when anxious',
    highlights: 'Struggled with morning anxiety but used breathing techniques.',
    medications: 'Morning and evening regimen completed',
    todoProgress: '2/3',
  },
  {
    id: 3,
    date: 'May 6, 2025',
    mood: {
      morning: 'Great',
      evening: 'Good'
    },
    dailyGoal: 'Focus on therapy goals',
    highlights: 'Therapy session went well. Practiced mindfulness while walking.',
    medications: 'Morning regimen completed, evening dose delayed',
    todoProgress: '3/3',
  },
];

const Journal = () => {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Journal</h1>
        <p className="text-muted-foreground">
          Track your mood, medications, and daily reflections.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-md"
        >
          <TabsList>
            <TabsTrigger value="all">All Entries</TabsTrigger>
            <TabsTrigger value="medications">Medication Log</TabsTrigger>
          </TabsList>
        
          <TabsContent value="all" className="space-y-6 mt-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id} className="card-hover">
                <CardHeader className="pb-3">
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-primary" />
                      {entry.date}
                    </div>
                    <div className="flex gap-4">
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center">
                        <span className="mr-1">Morning:</span> {entry.mood.morning}
                      </span>
                      <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full flex items-center">
                        <span className="mr-1">Evening:</span> {entry.mood.evening}
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Daily Goal</h3>
                      <p>{entry.dailyGoal}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-1">Highlights</h3>
                      <p>{entry.highlights}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground mb-1">Medications</h3>
                        <p>{entry.medications}</p>
                      </div>
                      <div className="text-right">
                        <h3 className="font-medium text-sm text-muted-foreground mb-1">To-Do Progress</h3>
                        <p className="font-medium">{entry.todoProgress}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="medications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Medication Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center py-3 border-b">
                      <div>
                        <p className="font-medium">{entry.date}</p>
                        <p className="text-sm text-muted-foreground">{entry.medications}</p>
                      </div>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Button onClick={() => setIsNewEntryOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Entry
        </Button>
      </div>

      <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-auto max-h-[90vh]">
          <NewJournalEntry onClose={() => setIsNewEntryOpen(false)} />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Journal;
