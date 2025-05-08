
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MoodChart from '@/components/dashboard/MoodChart';
import DailyTodos from '@/components/dashboard/DailyTodos';
import QuickMood from '@/components/dashboard/QuickMood';
import TriggerInsights from '@/components/dashboard/TriggerInsights';
import NextTherapySession from '@/components/dashboard/NextTherapySession';
import MindfulPractice from '@/components/dashboard/MindfulPractice';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, Alex</h1>
        <p className="text-muted-foreground">
          Remember, every small step counts on your journey to recovery.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Dashboard</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Journal Entry
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2">
          <MoodChart />
        </div>
        
        <div className="md:col-span-1 lg:col-span-1">
          <QuickMood />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <DailyTodos />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <TriggerInsights />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <NextTherapySession />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <MindfulPractice />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
