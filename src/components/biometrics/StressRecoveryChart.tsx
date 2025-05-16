
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  ZAxis
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', recovery: 30, stress: 75, size: 100 },
  { day: 'Tue', recovery: 45, stress: 60, size: 100 },
  { day: 'Wed', recovery: 65, stress: 40, size: 100 },
  { day: 'Thu', recovery: 70, stress: 30, size: 100 },
  { day: 'Fri', recovery: 60, stress: 55, size: 100 },
  { day: 'Sat', recovery: 75, stress: 35, size: 100 },
  { day: 'Sun', recovery: 50, stress: 50, size: 100 },
];

// Connect the data points in sequential order
const lineData = [...weeklyData].sort((a, b) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.indexOf(a.day) - days.indexOf(b.day);
});

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md text-xs">
        <p className="font-medium">{payload[0].payload.day}</p>
        <p>Recovery: {payload[0].payload.recovery}</p>
        <p>Stress: {payload[0].payload.stress}</p>
      </div>
    );
  }

  return null;
};

const StressRecoveryChart = () => {
  const [viewMode, setViewMode] = useState<'trend' | 'map'>('trend');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Activity size={18} className="text-primary" />
            Stress/Recovery Balance
          </span>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant={viewMode === 'trend' ? 'default' : 'outline'}
              onClick={() => setViewMode('trend')}
            >
              Trend
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'map' ? 'default' : 'outline'}
              onClick={() => setViewMode('map')}
            >
              Map
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {viewMode === 'trend' ? (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 30,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="day" 
                  name="Day" 
                  tick={{ fontSize: 12 }} 
                />
                <YAxis 
                  dataKey="recovery" 
                  name="Recovery" 
                  tick={{ fontSize: 12 }} 
                  domain={[0, 100]} 
                  label={{ 
                    value: 'Recovery', 
                    angle: -90, 
                    position: 'left',
                    style: { textAnchor: 'middle', fontSize: '12px', fill: 'hsl(var(--muted-foreground))' }
                  }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter
                  name="Recovery"
                  data={weeklyData}
                  fill="hsl(var(--primary))"
                  line={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 30,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  type="number" 
                  dataKey="stress" 
                  name="Stress" 
                  domain={[0, 100]} 
                  label={{ 
                    value: 'Stress', 
                    position: 'bottom',
                    style: { textAnchor: 'middle', fontSize: '12px', fill: 'hsl(var(--muted-foreground))' }
                  }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="recovery" 
                  name="Recovery" 
                  domain={[0, 100]} 
                  label={{ 
                    value: 'Recovery', 
                    angle: -90, 
                    position: 'left',
                    style: { textAnchor: 'middle', fontSize: '12px', fill: 'hsl(var(--muted-foreground))' }
                  }} 
                />
                <ZAxis dataKey="size" range={[50, 500]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                
                {/* Connect dots with lines */}
                <Scatter
                  data={lineData}
                  line={{
                    type: 'monotone',
                    stroke: 'rgba(255, 255, 255, 0.5)',
                    strokeWidth: 1,
                  }}
                  shape={() => null}
                />
                
                {/* Show dots */}
                <Scatter
                  name="Balance"
                  data={weeklyData}
                  fill="hsl(var(--primary))"
                />
                
                {/* Show today's point highlighted */}
                <Scatter
                  data={[weeklyData[weeklyData.length - 1]]}
                  fill="#ffffff"
                  shape={(props) => (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={8}
                      fill="hsl(var(--primary))"
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  )}
                />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
        
        {viewMode === 'map' && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="text-left">Low stress</div>
            <div className="text-right">High stress</div>
            <div className="text-left">High recovery</div>
            <div className="text-right">Low recovery</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StressRecoveryChart;
