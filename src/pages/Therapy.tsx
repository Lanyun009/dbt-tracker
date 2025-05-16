
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { User, Calendar, FileText } from 'lucide-react';
import GroupSummary from '@/components/therapy/GroupSummary';
import GroupHighlights from '@/components/therapy/GroupHighlights';
import NextSession from '@/components/therapy/NextSession';
import TherapyNotes from '@/components/therapy/TherapyNotes';

const Therapy = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Group Psychotherapy</h1>
        <p className="text-muted-foreground">
          Track your progress and insights from group therapy sessions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2">
          <GroupSummary />
        </div>
        
        <div className="md:col-span-1 lg:col-span-1">
          <NextSession />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <GroupHighlights />
        </div>
        
        <div className="md:col-span-1 lg:col-span-1">
          <TherapyNotes />
        </div>
      </div>
    </MainLayout>
  );
};

export default Therapy;
