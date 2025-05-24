
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddTriggerFormProps {
  onBack: () => void;
}

const AddTriggerForm = ({ onBack }: AddTriggerFormProps) => {
  const [triggerName, setTriggerName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [triggerType, setTriggerType] = useState('known');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!triggerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a trigger name.",
        variant: "destructive"
      });
      return;
    }

    if (!frequency) {
      toast({
        title: "Error", 
        description: "Please select a frequency level.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save the data to your backend/Supabase
    console.log('Saving trigger:', {
      name: triggerName,
      frequency,
      notes,
      type: triggerType,
      createdAt: new Date().toISOString()
    });

    toast({
      title: "Success",
      description: `Trigger "${triggerName}" has been added to ${triggerType} triggers.`,
    });

    // Reset form
    setTriggerName('');
    setFrequency('');
    setNotes('');
    setTriggerType('known');
    
    // Go back to triggers page
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Triggers
        </Button>
        <h1 className="text-3xl font-bold">Add New Trigger</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trigger Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="triggerName">Trigger Name *</Label>
              <Input
                id="triggerName"
                type="text"
                value={triggerName}
                onChange={(e) => setTriggerName(e.target.value)}
                placeholder="e.g., Work Deadlines, Social Events"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Frequency Level *</Label>
              <Select value={frequency} onValueChange={setFrequency} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Trigger Type</Label>
              <RadioGroup value={triggerType} onValueChange={setTriggerType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="known" id="known" />
                  <Label htmlFor="known">Known Trigger</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="potential" id="potential" />
                  <Label htmlFor="potential">Potential Trigger</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes about this trigger, symptoms, patterns, or coping strategies..."
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save Trigger
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTriggerForm;
