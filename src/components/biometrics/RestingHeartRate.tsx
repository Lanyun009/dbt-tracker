
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const heartRateData = [
  { day: 'Mon', rate: 67 },
  { day: 'Tue', rate: 65 },
  { day: 'Wed', rate: 68 },
  { day: 'Thu', rate: 64 },
  { day: 'Fri', rate: 66 },
  { day: 'Sat', rate: 63 },
  { day: 'Sun', rate: 65 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md text-xs">
        <p className="font-medium">{label}</p>
        <p>Rate: {payload[0].value} bpm</p>
      </div>
    );
  }

  return null;
};

const RestingHeartRate = () => {
  const currentRate = heartRateData[heartRateData.length - 1].rate;
  const avgRate = Math.round(heartRateData.reduce((sum, data) => sum + data.rate, 0) / heartRateData.length);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse size={18} className="text-primary" />
          Resting Heart Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <div className="text-center">
            <div className="text-muted-foreground text-sm">Current</div>
            <div className="text-2xl font-semibold">{currentRate} <span className="text-sm">bpm</span></div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground text-sm">Average</div>
            <div className="text-2xl font-semibold">{avgRate} <span className="text-sm">bpm</span></div>
          </div>
        </div>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis domain={[55, 75]} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestingHeartRate;
