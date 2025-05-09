import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { BookText, Check, BookOpen, Pill, ArrowRight } from 'lucide-react';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

type JournalEntryForm = {
  morningMood: string;
  dailyGoal: string;
  todos: TodoItem[];
  eveningMood: string;
  reflection: string;
  medications: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    notes: string;
  };
};

const moodOptions = [
  { value: '1', label: 'Very Bad' },
  { value: '2', label: 'Bad' },
  { value: '3', label: 'Neutral' },
  { value: '4', label: 'Good' },
  { value: '5', label: 'Very Good' },
];

const NewJournalEntry = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('check-in');
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: '', completed: false },
    { id: 2, text: '', completed: false },
    { id: 3, text: '', completed: false },
  ]);
  const [newTodoText, setNewTodoText] = useState('');

  const form = useForm<JournalEntryForm>({
    defaultValues: {
      morningMood: '3',
      dailyGoal: '',
      todos: todos,
      eveningMood: '3',
      reflection: '',
      medications: {
        morning: false,
        afternoon: false,
        evening: false,
        notes: '',
      },
    },
  });

  const updateTodoText = (id: number, text: string) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleTodoComplete = (id: number) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const onSubmit = (data: JournalEntryForm) => {
    data.todos = todos;
    console.log('Journal entry submitted:', data);
    toast.success('Journal entry saved successfully!');
    onClose();
  };

  const completedTodos = todos.filter(todo => todo.completed).length;
  const todoProgress = todos.some(todo => todo.text.trim() !== '') 
    ? Math.round((completedTodos / todos.filter(todo => todo.text.trim() !== '').length) * 100) 
    : 0;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          New Journal Entry
        </CardTitle>
        <CardDescription>
          Track your mood, goals, and progress for {new Date().toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 mx-4">
          <TabsTrigger value="check-in">Morning Check-in</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="check-out">Evening Check-out</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <TabsContent value="check-in" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">How are you feeling this morning?</h3>
                  <RadioGroup 
                    defaultValue="3" 
                    className="flex space-x-2"
                    onValueChange={(value) => form.setValue('morningMood', value)}
                  >
                    {moodOptions.map((option) => (
                      <div key={option.value} className="flex flex-col items-center gap-1">
                        <RadioGroupItem 
                          value={option.value} 
                          id={`morning-mood-${option.value}`} 
                          className="peer sr-only" 
                        />
                        <Label 
                          htmlFor={`morning-mood-${option.value}`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                        >
                          <span className="text-xl mb-1">
                            {option.value === '1' ? '😢' : 
                             option.value === '2' ? '😕' : 
                             option.value === '3' ? '😐' : 
                             option.value === '4' ? '🙂' : '😄'}
                          </span>
                          <span className="text-xs">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="dailyGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What is your main goal for today?</FormLabel>
                        <FormControl>
                          <Input placeholder="Today I want to..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium mb-2">Top 3 To-Dos</h3>
                  {todos.map((todo, index) => (
                    <div key={todo.id} className="flex items-center gap-2">
                      <Input 
                        placeholder={`To-do ${index + 1}`} 
                        value={todo.text} 
                        onChange={(e) => updateTodoText(todo.id, e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="medications" className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Pill className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Medication Tracker</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="morning-meds" 
                        checked={form.watch('medications.morning')}
                        onCheckedChange={(checked) => 
                          form.setValue('medications.morning', checked as boolean)
                        }
                      />
                      <label
                        htmlFor="morning-meds"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Morning medication taken
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="afternoon-meds"
                        checked={form.watch('medications.afternoon')}
                        onCheckedChange={(checked) => 
                          form.setValue('medications.afternoon', checked as boolean)
                        } 
                      />
                      <label
                        htmlFor="afternoon-meds"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Afternoon medication taken
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="evening-meds"
                        checked={form.watch('medications.evening')}
                        onCheckedChange={(checked) => 
                          form.setValue('medications.evening', checked as boolean)
                        }
                      />
                      <label
                        htmlFor="evening-meds"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Evening medication taken
                      </label>
                    </div>
                    
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="medications.notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medication Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any side effects, changes, or notes about your medications..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="check-out" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">How are you feeling this evening?</h3>
                  <RadioGroup 
                    defaultValue="3" 
                    className="flex space-x-2"
                    onValueChange={(value) => form.setValue('eveningMood', value)}
                  >
                    {moodOptions.map((option) => (
                      <div key={option.value} className="flex flex-col items-center gap-1">
                        <RadioGroupItem 
                          value={option.value} 
                          id={`evening-mood-${option.value}`} 
                          className="peer sr-only" 
                        />
                        <Label 
                          htmlFor={`evening-mood-${option.value}`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                        >
                          <span className="text-xl mb-1">
                            {option.value === '1' ? '😢' : 
                             option.value === '2' ? '😕' : 
                             option.value === '3' ? '😐' : 
                             option.value === '4' ? '🙂' : '😄'}
                          </span>
                          <span className="text-xs">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">To-Do Progress</h3>
                  {todos.map((todo) => (
                    todo.text.trim() !== '' && (
                      <div key={todo.id} className="flex items-center gap-2">
                        <Checkbox 
                          id={`todo-${todo.id}`} 
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodoComplete(todo.id)}
                        />
                        <label
                          htmlFor={`todo-${todo.id}`}
                          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {todo.text}
                        </label>
                      </div>
                    )
                  ))}

                  {todos.some(todo => todo.text.trim() !== '') && (
                    <div className="mt-2">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${todoProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {completedTodos} of {todos.filter(todo => todo.text.trim() !== '').length} completed ({todoProgress}%)
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="reflection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Reflection</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Reflect on your day. What went well? What could have gone better?" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <div className="flex gap-2">
                {activeTab === "check-in" ? (
                  <Button type="button" onClick={() => setActiveTab("medications")}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : activeTab === "medications" ? (
                  <Button type="button" onClick={() => setActiveTab("check-out")}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit">
                    Save Entry <Check className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Form>
      </Tabs>
    </Card>
  );
};

export default NewJournalEntry;
