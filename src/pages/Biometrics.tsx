
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { HeartPulse, Thermometer, Activity } from 'lucide-react';
import BiometricsChart from '@/components/biometrics/BiometricsChart';
import RestingHeartRate from '@/components/biometrics/RestingHeartRate';
import BaseTemperature from '@/components/biometrics/BaseTemperature';
import HRVTrends from '@/components/biometrics/HRVTrends';
import StressRecoveryChart from '@/components/biometrics/StressRecoveryChart';

const Biometrics = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Biometric Data</h1>
        <p className="text-muted-foreground">
          Track your physical wellness metrics to understand your body's responses.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2">
          <StressRecoveryChart />
        </div>
        
        <div className="md:col-span-1 lg:col-span-1">
          <RestingHeartRate />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <BaseTemperature />
        </div>

        <div className="md:col-span-1 lg:col-span-2">
          <HRVTrends />
        </div>
      </div>
    </MainLayout>
  );
};

export default Biometrics;
