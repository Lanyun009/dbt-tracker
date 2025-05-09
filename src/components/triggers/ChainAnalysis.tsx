import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ArrowRight, Brain, Problem, Link, Check } from 'lucide-react';

type ChainStep = {
  id: string;
  completed: boolean;
  content: string;
};

type ChainAnalysisProps = {
  triggerId: number;
  triggerName: string;
  onClose: () => void;
};

const ChainAnalysis = ({ triggerId, triggerName, onClose }: ChainAnalysisProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState<ChainStep[]>([
    { id: 'vulnerability', completed: false, content: '' },
    { id: 'promptEvent', completed: false, content: '' },
    { id: 'problemBehavior', completed: false, content: '' },
    { id: 'links', completed: false, content: '' },
    { id: 'consequences', completed: false, content: '' },
    { id: 'alternativeBehavior', completed: false, content: '' },
    { id: 'preventionPlan', completed: false, content: '' },
    { id: 'repair', completed: false, content: '' }
  ]);

  const form = useForm({
    defaultValues: {
      currentStep: ''
    }
  });

  const handleNext = () => {
    const updatedSteps = [...steps];
    updatedSteps[activeStep].completed = true;
    updatedSteps[activeStep].content = form.getValues().currentStep;
    
    setSteps(updatedSteps);
    form.reset({ currentStep: '' });
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      form.setValue('currentStep', steps[activeStep - 1].content);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <CardTitle className="flex items-center gap-2 mb-4">
              <Brain size={20} className="text-primary" />
              Vulnerability Factors
            </CardTitle>
            <CardDescription className="mb-4">
              Describe any factors that made you more vulnerable to this trigger (lack of sleep, hunger, illness, stress, etc.)
            </CardDescription>
          </>
        );
      case 1:
        return (
          <>
            <CardTitle className="flex items-center gap-2 mb-4">
              <ArrowRight size={20} className="text-primary" />
              Prompt Event
            </CardTitle>
            <CardDescription className="mb-4">
              What specific event triggered the emotional reaction or problem behavior?
            </CardDescription>
          </>
        );
      case 2:
        return (
          <>
            <CardTitle className="flex items-center gap-2 mb-4">
              <Brain size={20} className="text-primary" />
              Problem Behavior
            </CardTitle>
            <CardDescription className="mb-4">
              Describe the exact behavior that occurred as a result of the trigger.
            </CardDescription>
          </>
        );
      case 3:
        return (
          <>
            <CardTitle className="flex items-center gap-2 mb-4">
              <Link size={20} className="text-primary" />
              Links in the Chain
            </CardTitle>
            <CardDescription className="mb-4">
              Describe the thoughts, emotions, and actions that led from the prompt event to the problem behavior.
            </CardDescription>
          </>
        );
      case 4:
        return (
          <>
            <CardTitle className="flex items-center gap-2 mb-4">
              <ArrowRight size={20} className="text-primary" />
              Consequences
            </CardTitle>
            <CardDescription className="mb-4">
              What were the short-term and long-term consequences of this behavior?
            </CardDescription>
          </>
        );
      case 5:
        return (
          <>
            <CardTitle className="flex items-center gap-2 mb-4">
              <Check size={20} className="text-primary" />
              Alternative Behavior
            </CardTitle>
            <CardDescription className="mb-4">
              What would be a more effective behavior to replace the problem behavior?
            </CardDescription>
          </>
        );
      case 6:
        return (
          <>
            <CardTitle className="flex items-center gap-2 mb-4">
              <Brain size={20} className="text-primary" />
              Prevention Plan
            </CardTitle>
            <CardDescription className="mb-4">
              What can you do to reduce vulnerability factors and prevent similar triggers?
            </CardDescription>
          </>
        );
      case 7:
        return (
          <>
            <CardTitle className="flex items-center gap-2 mb-4">
              <Check size={20} className="text-primary" />
              Problem Repair
            </CardTitle>
            <CardDescription className="mb-4">
              How can you repair any damage from the problem behavior and move towards acceptance?
            </CardDescription>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Chain Analysis: {triggerName}</div>
          <span className="text-sm font-normal text-muted-foreground">
            Step {activeStep + 1} of {steps.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          {/* Progress Indicator */}
          <div className="w-full flex mb-8 relative">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div 
                  className={`flex items-center justify-center rounded-full h-8 w-8 z-10 
                    ${index < activeStep || step.completed 
                      ? 'bg-primary text-primary-foreground' 
                      : index === activeStep 
                        ? 'bg-primary/80 text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'}`}
                >
                  {index < activeStep || step.completed ? <Check size={16} /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`grow h-1 mt-4 ${
                      index < activeStep ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-6">
            {renderStepContent()}
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleNext)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentStep"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter your response here..."
                        className="min-h-[150px]"
                        defaultValue={steps[activeStep].content}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  
                  {activeStep > 0 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handlePrevious}
                      className="ml-2"
                    >
                      Previous
                    </Button>
                  )}
                </div>
                
                <Button type="submit">
                  {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChainAnalysis;
