
import React from 'react';

interface StepperProps {
  steps: { title: string }[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.title} className="md:flex-1">
            {index < currentStep ? (
              <div className="group flex flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-primary transition-colors">{`Step ${index + 1}`}</span>
                <span className="text-sm font-medium text-text-primary">{step.title}</span>
              </div>
            ) : index === currentStep ? (
              <div className="flex flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4" aria-current="step">
                <span className="text-sm font-medium text-primary">{`Step ${index + 1}`}</span>
                <span className="text-sm font-medium text-text-primary">{step.title}</span>
              </div>
            ) : (
              <div className="group flex flex-col border-l-4 border-border-color py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-text-secondary transition-colors">{`Step ${index + 1}`}</span>
                <span className="text-sm font-medium text-text-secondary">{step.title}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;
