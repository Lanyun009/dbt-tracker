
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sunset, Music, Activity, FileText, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const recommendedPractices = [
  {
    id: 1,
    name: 'Body Scan Meditation',
    category: 'Meditation',
    duration: '15 min',
    description: 'A guided practice to develop awareness of your body and release tension.',
    icon: <Sunset size={24} />,
    effectiveness: 'High'
  },
  {
    id: 2,
    name: 'Ambient Nature Sounds',
    category: 'Music',
    duration: '30 min',
    description: 'Gentle nature sounds to promote relaxation and focus.',
    icon: <Music size={24} />,
    effectiveness: 'Medium'
  },
  {
    id: 3,
    name: 'Progressive Muscle Relaxation',
    category: 'Activity',
    duration: '10 min',
    description: 'Systematically tense and relax muscle groups to reduce physical tension.',
    icon: <Activity size={24} />,
    effectiveness: 'High'
  }
];

const allPractices = [
  ...recommendedPractices,
  {
    id: 4,
    name: 'Mindful Journaling',
    category: 'Activity',
    duration: '20 min',
    description: 'Reflect on thoughts and feelings without judgment.',
    icon: <FileText size={24} />,
    effectiveness: 'Medium'
  },
  {
    id: 5,
    name: 'Loving-Kindness Meditation',
    category: 'Meditation',
    duration: '12 min',
    description: 'Develop compassion for yourself and others.',
    icon: <Heart size={24} />,
    effectiveness: 'Medium'
  },
];

const Mindfulness = () => {
  const categories = ['All', 'Meditation', 'Music', 'Activity'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  const filteredPractices = selectedCategory === 'All' 
    ? allPractices 
    : allPractices.filter(p => p.category === selectedCategory);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mindfulness</h1>
        <p className="text-muted-foreground">
          Discover practices to help you relax, focus, and manage emotions.
        </p>
      </div>
      
      <Tabs defaultValue="recommended" className="mb-6">
        <TabsList>
          <TabsTrigger value="recommended">Recommended for You</TabsTrigger>
          <TabsTrigger value="all">All Practices</TabsTrigger>
          <TabsTrigger value="favorites">Your Favorites</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Recommended Practices</h2>
            <p className="text-muted-foreground">
              Based on your patterns and preferences, these practices may be most beneficial.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedPractices.map((practice) => (
              <Card key={practice.id} className="card-hover">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    {React.cloneElement(practice.icon, { className: "text-primary" })}
                  </div>
                  <CardTitle>{practice.name}</CardTitle>
                  <CardDescription>
                    {practice.duration} • {practice.effectiveness} Effectiveness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {practice.description}
                  </p>
                  <Button className="w-full">Begin Practice</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Mindful Practices</h2>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPractices.map((practice) => (
              <Card key={practice.id} className="card-hover">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    {React.cloneElement(practice.icon, { className: "text-primary" })}
                  </div>
                  <CardTitle>{practice.name}</CardTitle>
                  <CardDescription>
                    {practice.duration} • {practice.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {practice.description}
                  </p>
                  <Button className="w-full">Begin Practice</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Add practices to your favorites to see them here.
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Your practice history will appear here.
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Mindfulness;
