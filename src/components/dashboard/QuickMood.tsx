
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

const moodOptions = [
  { label: 'Calm', value: 'calm', category: 'positive' },
  { label: 'Motivated', value: 'motivated', category: 'positive' },
  { label: 'Content', value: 'content', category: 'positive' },
  { label: 'Meh', value: 'meh', category: 'neutral' },
  { label: 'Low', value: 'low', category: 'negative' },
  { label: 'Awful', value: 'awful', category: 'negative' },
];

const QuickMood = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };
  
  const handleSave = () => {
    if (selectedMood) {
      toast.success('Mood recorded successfully');
    } else {
      toast.error('Please select a mood first');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart size={18} className="text-primary" /> 
          How are you feeling?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {moodOptions.map((mood) => (
            <Button
              key={mood.value}
              variant={selectedMood === mood.value ? 'default' : 'outline'}
              className={selectedMood === mood.value ? `mood-${mood.category}` : ''}
              onClick={() => handleMoodSelect(mood.value)}
            >
              {mood.label}
            </Button>
          ))}
        </div>
        <Button 
          className="w-full" 
          onClick={handleSave}
          disabled={!selectedMood}
        >
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickMood;
