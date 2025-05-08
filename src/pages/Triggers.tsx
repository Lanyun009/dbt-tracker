
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Plus, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChainAnalysis from '@/components/triggers/ChainAnalysis';

const knownTriggers = [
  {
    id: 1,
    name: 'Work Deadlines',
    frequency: 'High',
    lastOccurred: '2 days ago',
    recovery: 75,
    notes: 'Associated with increased heart rate and shallow breathing.'
  },
  {
    id: 2,
    name: 'Social Events',
    frequency: 'Medium',
    lastOccurred: '1 week ago',
    recovery: 45,
    notes: 'Usually experiences anticipatory anxiety 2-3 days before event.'
  },
  {
    id: 3,
    name: 'Family Conflicts',
    frequency: 'Low',
    lastOccurred: '3 weeks ago',
    recovery: 90,
    notes: 'DBT techniques have been effective in managing emotional responses.'
  }
];

const unknownTriggers = [
  {
    id: 1,
    pattern: 'Morning Anxiety',
    suggestion: 'Could be related to sleep quality or morning routine.',
    confidence: 'High'
  },
  {
    id: 2,
    pattern: 'Weekend Mood Shifts',
    suggestion: 'Possible correlation with reduced structure during weekends.',
    confidence: 'Medium'
  }
];

const Triggers = () => {
  const [selectedTriggerId, setSelectedTriggerId] = useState<number | null>(null);
  const [showChainAnalysis, setShowChainAnalysis] = useState(false);
  
  const selectedTrigger = knownTriggers.find(trigger => trigger.id === selectedTriggerId);
  
  const handleViewChainAnalysis = (triggerId: number) => {
    setSelectedTriggerId(triggerId);
    setShowChainAnalysis(true);
  };
  
  const closeChainAnalysis = () => {
    setShowChainAnalysis(false);
  };

  return (
    <MainLayout>
      {showChainAnalysis && selectedTrigger ? (
        <div className="animate-fade-in">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Chain Analysis</h1>
            <Button variant="outline" onClick={closeChainAnalysis}>
              Back to Triggers
            </Button>
          </div>
          <ChainAnalysis 
            triggerId={selectedTrigger.id}
            triggerName={selectedTrigger.name}
            onClose={closeChainAnalysis}
          />
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Trigger Management</h1>
            <p className="text-muted-foreground">
              Identify, track, and develop strategies for managing emotional triggers.
            </p>
          </div>

          <Tabs defaultValue="known" className="mb-6">
            <TabsList>
              <TabsTrigger value="known">Known Triggers</TabsTrigger>
              <TabsTrigger value="unknown">Potential Triggers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="known" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Known Triggers</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Trigger
                </Button>
              </div>
              
              <div className="space-y-6">
                {knownTriggers.map((trigger) => (
                  <Card key={trigger.id} className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Brain size={18} className="text-primary" />
                          {trigger.name}
                        </div>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          trigger.frequency === 'High' ? 'bg-destructive/20 text-destructive' : 
                          trigger.frequency === 'Medium' ? 'bg-amber-500/20 text-amber-700' : 
                          'bg-emerald-500/20 text-emerald-700'
                        }`}>
                          {trigger.frequency} Frequency
                        </span>
                      </CardTitle>
                      <CardDescription>Last occurred: {trigger.lastOccurred}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Recovery Progress</span>
                            <span>{trigger.recovery}%</span>
                          </div>
                          <Progress value={trigger.recovery} />
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                          <p className="text-sm">{trigger.notes}</p>
                        </div>
                        
                        <div className="pt-2 flex justify-end">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => handleViewChainAnalysis(trigger.id)}
                          >
                            View Chain Analysis <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="unknown" className="mt-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Potential Trigger Patterns</h2>
                <p className="text-muted-foreground">
                  Based on your journal entries and biometric data, these patterns may indicate unknown triggers.
                </p>
              </div>
              
              <div className="space-y-6">
                {unknownTriggers.map((item) => (
                  <Card key={item.id} className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {item.pattern}
                        </div>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          item.confidence === 'High' ? 'bg-primary/20 text-primary' : 
                          'bg-secondary/20 text-secondary'
                        }`}>
                          {item.confidence} Confidence
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{item.suggestion}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Dismiss</Button>
                        <Button size="sm">Add to Known Triggers</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </MainLayout>
  );
};

export default Triggers;
