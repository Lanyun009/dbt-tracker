
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MainLayout from '@/components/layout/MainLayout';

// Helper function to check if a date is a Tuesday, Wednesday or Friday
const isIOPDay = (date: Date) => {
  const day = date.getDay();
  return day === 2 || day === 3 || day === 5; // Tuesday(2), Wednesday(3), Friday(5)
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  // Generate events based on the selected date
  const events = React.useMemo(() => {
    if (isIOPDay(date)) {
      return [
        {
          id: 1,
          title: "IOP Group Therapy",
          time: "9:00 AM - 12:00 PM",
          type: "therapy"
        }
      ];
    }
    return [];
  }, [date]);

  // Generate events for the entire month for the calendar highlighting
  const getCalendarEvents = (currentDate: Date) => {
    const events = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get number of days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Check each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (isIOPDay(date)) {
        events.push({
          date,
          title: "IOP Group Therapy"
        });
      }
    }
    
    return events;
  };
  
  const calendarEvents = getCalendarEvents(date);
  
  // Function to check if a date has an event
  const hasEvent = (day: Date) => {
    return calendarEvents.some(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Program Calendar</h1>
        <p className="text-muted-foreground">
          View and manage your therapy and program schedule.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Date Selection</CardTitle>
              <CardDescription>Choose a date to view scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                      modifiers={{
                        event: (day) => hasEvent(day),
                      }}
                      modifiersStyles={{
                        event: {
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                          color: 'var(--primary)',
                          backgroundColor: 'var(--accent)',
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Events for {format(date, "PPP")}</CardTitle>
              <CardDescription>
                {isIOPDay(date) 
                  ? "IOP Program sessions scheduled for today" 
                  : "No IOP Program sessions scheduled for today"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">
                        {event.type === "therapy" ? "Therapy" : "Other"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No events scheduled for this date.</p>
                  <p className="text-sm mt-2">IOP Program sessions are held on Tuesday, Wednesday, and Friday mornings.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
