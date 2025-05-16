
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';

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
  const [motivationLevel, setMotivationLevel] = useState<number>(50);
  const [stressLevel, setStressLevel] = useState<number>(50);
  const [showSliders, setShowSliders] = useState<boolean>(false);
  
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowSliders(true);
  };
  
  const handleSave = () => {
    if (selectedMood) {
      toast.success('Mood recorded successfully', {
        description: `${selectedMood} mood with ${motivationLevel}% motivation and ${stressLevel}% stress`
      });
      // Reset after saving
      setShowSliders(false);
      setMotivationLevel(50);
      setStressLevel(50);
      setSelectedMood(null);
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

        {showSliders && (
          <div className="space-y-4 mt-4 mb-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Motivation Level</span>
                <span className="font-medium">{motivationLevel}%</span>
              </div>
              <Slider
                value={[motivationLevel]}
                min={0}
                max={100}
                step={5}
                onValueChange={(values) => setMotivationLevel(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Stress Level</span>
                <span className="font-medium">{stressLevel}%</span>
              </div>
              <Slider
                value={[stressLevel]}
                min={0}
                max={100}
                step={5}
                onValueChange={(values) => setStressLevel(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        )}

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
