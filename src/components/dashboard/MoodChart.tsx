
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', mood: 4 },
  { name: 'Tue', mood: 5 },
  { name: 'Wed', mood: 3 },
  { name: 'Thu', mood: 6 },
  { name: 'Fri', mood: 7 },
  { name: 'Sat', mood: 5 },
  { name: 'Sun', mood: 6 },
];

const MoodChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Mood</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.3)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Lower</span>
          <span>Mood Rating</span>
          <span>Higher</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChart;
