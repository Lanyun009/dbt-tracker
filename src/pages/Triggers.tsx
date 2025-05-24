
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChainAnalysis from '@/components/triggers/ChainAnalysis';
import AddTriggerForm from '@/components/triggers/AddTriggerForm';
import TriggersList from '@/components/triggers/TriggersList';
import PotentialTriggersList from '@/components/triggers/PotentialTriggersList';

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
  const [showAddForm, setShowAddForm] = useState(false);
  
  const selectedTrigger = knownTriggers.find(trigger => trigger.id === selectedTriggerId);
  
  const handleViewChainAnalysis = (triggerId: number) => {
    setSelectedTriggerId(triggerId);
    setShowChainAnalysis(true);
  };
  
  const closeChainAnalysis = () => {
    setShowChainAnalysis(false);
  };

  const handleAddTrigger = () => {
    setShowAddForm(true);
  };

  const handleBackFromForm = () => {
    setShowAddForm(false);
  };

  return (
    <MainLayout>
      {showAddForm ? (
        <div className="animate-fade-in">
          <AddTriggerForm onBack={handleBackFromForm} />
        </div>
      ) : showChainAnalysis && selectedTrigger ? (
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
              <TriggersList 
                triggers={knownTriggers}
                onAddTrigger={handleAddTrigger}
                onViewChainAnalysis={handleViewChainAnalysis}
              />
            </TabsContent>
            
            <TabsContent value="unknown" className="mt-6">
              <PotentialTriggersList triggers={unknownTriggers} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </MainLayout>
  );
};

export default Triggers;
