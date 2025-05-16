
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const hrvData = [
  { day: 'Mon', morning: 45, evening: 42 },
  { day: 'Tue', morning: 47, evening: 43 },
  { day: 'Wed', morning: 51, evening: 48 },
  { day: 'Thu', morning: 53, evening: 50 },
  { day: 'Fri', morning: 49, evening: 45 },
  { day: 'Sat', morning: 55, evening: 52 },
  { day: 'Sun', morning: 52, evening: 48 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md text-xs">
        <p className="font-medium">{label}</p>
        <p>Morning HRV: {payload[0].value} ms</p>
        <p>Evening HRV: {payload[1].value} ms</p>
      </div>
    );
  }

  return null;
};

const HRVTrends = () => {
  const latestMorningHRV = hrvData[hrvData.length - 1].morning;
  const latestEveningHRV = hrvData[hrvData.length - 1].evening;
  const avgMorningHRV = Math.round(hrvData.reduce((sum, data) => sum + data.morning, 0) / hrvData.length);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          Heart Rate Variability (HRV)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div className="text-muted-foreground text-sm">Morning</div>
            <div className="text-2xl font-semibold">{latestMorningHRV} <span className="text-sm">ms</span></div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground text-sm">Evening</div>
            <div className="text-2xl font-semibold">{latestEveningHRV} <span className="text-sm">ms</span></div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground text-sm">Avg</div>
            <div className="text-2xl font-semibold">{avgMorningHRV} <span className="text-sm">ms</span></div>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hrvData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis domain={[40, 60]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="morning"
                name="Morning"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="evening" 
                name="Evening"
                stroke="#8B5CF6"
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

export default HRVTrends;
