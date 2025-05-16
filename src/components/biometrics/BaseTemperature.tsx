
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const temperatureData = [
  { day: 'Mon', temp: 36.6 },
  { day: 'Tue', temp: 36.7 },
  { day: 'Wed', temp: 36.8 },
  { day: 'Thu', temp: 36.5 },
  { day: 'Fri', temp: 36.7 },
  { day: 'Sat', temp: 36.6 },
  { day: 'Sun', temp: 36.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md text-xs">
        <p className="font-medium">{label}</p>
        <p>Temperature: {payload[0].value}°C</p>
      </div>
    );
  }

  return null;
};

const BaseTemperature = () => {
  const currentTemp = temperatureData[temperatureData.length - 1].temp;
  const avgTemp = (temperatureData.reduce((sum, data) => sum + data.temp, 0) / temperatureData.length).toFixed(1);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer size={18} className="text-primary" />
          Base Temperature
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <div className="text-center">
            <div className="text-muted-foreground text-sm">Current</div>
            <div className="text-2xl font-semibold">{currentTemp}°<span className="text-sm">C</span></div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground text-sm">Average</div>
            <div className="text-2xl font-semibold">{avgTemp}°<span className="text-sm">C</span></div>
          </div>
        </div>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis domain={[36, 37]} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="temp"
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

export default BaseTemperature;
