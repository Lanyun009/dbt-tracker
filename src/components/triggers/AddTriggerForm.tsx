
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
import { supabase } from '@/integrations/supabase/client';

interface AddTriggerFormProps {
  onBack: () => void;
  onTriggerAdded?: () => void;
}

const AddTriggerForm = ({ onBack, onTriggerAdded }: AddTriggerFormProps) => {
  const [triggerName, setTriggerName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [triggerType, setTriggerType] = useState('known');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save triggers.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('triggers')
        .insert({
          user_id: user.id,
          name: triggerName.trim(),
          frequency: frequency,
          trigger_type: triggerType,
          notes: notes.trim() || null,
        });

      if (error) {
        console.error('Error saving trigger:', error);
        toast({
          title: "Error",
          description: "Failed to save trigger. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: `Trigger "${triggerName}" has been saved successfully.`,
      });

      // Reset form
      setTriggerName('');
      setFrequency('');
      setNotes('');
      setTriggerType('known');
      
      // Notify parent component and go back
      onTriggerAdded?.();
      onBack();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
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
                disabled={isLoading}
              />
            </div>

            <div className="space-y-3">
              <Label>Frequency Level *</Label>
              <Select value={frequency} onValueChange={setFrequency} required disabled={isLoading}>
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
              <RadioGroup value={triggerType} onValueChange={setTriggerType} disabled={isLoading}>
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
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Trigger'}
              </Button>
              <Button type="button" variant="outline" onClick={onBack} disabled={isLoading}>
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
