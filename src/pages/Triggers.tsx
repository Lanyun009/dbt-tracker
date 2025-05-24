
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChainAnalysis from '@/components/triggers/ChainAnalysis';
import AddTriggerForm from '@/components/triggers/AddTriggerForm';
import TriggersList from '@/components/triggers/TriggersList';
import PotentialTriggersList from '@/components/triggers/PotentialTriggersList';
import { useTriggers } from '@/hooks/useTriggers';

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
  const { knownTriggers, potentialTriggers, isLoading, refetch } = useTriggers();
  const [selectedTriggerId, setSelectedTriggerId] = useState<string | null>(null);
  const [showChainAnalysis, setShowChainAnalysis] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const selectedTrigger = knownTriggers.find(trigger => trigger.id === selectedTriggerId);
  
  const handleViewChainAnalysis = (triggerId: string) => {
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

  const handleTriggerAdded = () => {
    refetch();
  };

  // Transform database triggers to match component interface
  const transformedKnownTriggers = knownTriggers.map(trigger => ({
    id: parseInt(trigger.id.slice(-6), 16), // Convert UUID to number for backward compatibility
    name: trigger.name,
    frequency: trigger.frequency.charAt(0).toUpperCase() + trigger.frequency.slice(1),
    lastOccurred: trigger.last_occurred ? new Date(trigger.last_occurred).toLocaleDateString() : 'Never',
    recovery: trigger.recovery,
    notes: trigger.notes || ''
  }));

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading triggers...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {showAddForm ? (
        <div className="animate-fade-in">
          <AddTriggerForm 
            onBack={handleBackFromForm} 
            onTriggerAdded={handleTriggerAdded}
          />
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
                triggers={transformedKnownTriggers}
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
