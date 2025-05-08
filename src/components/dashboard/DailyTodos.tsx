
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const initialTodos = [
  { id: 1, description: '10-minute meditation', completed: false },
  { id: 2, description: 'Take medication at 2pm', completed: false },
  { id: 3, description: 'Journal about morning triggers', completed: false },
];

const DailyTodos = () => {
  const [todos, setTodos] = useState(initialTodos);
  
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const progress = (completedCount / todos.length) * 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="progress-bar">
            <div className="progress-value" style={{ width: `${progress}%` }} />
          </div>
          
          <div className="text-xs text-muted-foreground mb-2">
            {completedCount} of {todos.length} completed
          </div>
          
          <div className="space-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <Label
                  htmlFor={`todo-${todo.id}`}
                  className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                >
                  {todo.description}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyTodos;
