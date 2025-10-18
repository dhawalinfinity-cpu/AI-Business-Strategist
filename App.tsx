
import React, { useState, useCallback } from 'react';
import { STRATEGY_STEPS } from './constants';
import { generateContent } from './services/geminiService';
import { StrategySection } from './types';
import Stepper from './components/Stepper';
import LoadingSpinner from './components/LoadingSpinner';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { ChevronLeftIcon, ChevronRightIcon } from './components/icons/ChevronIcons';

const initialStrategyData: StrategySection[] = STRATEGY_STEPS.map(step => ({
  ...step,
  userInput: '',
  aiOutput: '',
}));

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [strategyData, setStrategyData] = useState<StrategySection[]>(initialStrategyData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeStep = strategyData[currentStep];

  const handleInputChange = (field: 'userInput' | 'aiOutput', value: string) => {
    const newData = [...strategyData];
    newData[currentStep][field] = value;
    setStrategyData(newData);
  };

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const context = currentStep > 0 ? strategyData[0].userInput : '';
    const prompt = activeStep.prompt(activeStep.userInput, context);
    const result = await generateContent(prompt);
    
    if (result.startsWith('An error occurred')) {
      setError(result);
    } else {
      const newData = [...strategyData];
      newData[currentStep].aiOutput = result;
      setStrategyData(newData);
    }

    setIsLoading(false);
  }, [activeStep, currentStep, strategyData]);

  const handleNext = () => {
    if (currentStep < STRATEGY_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleReset = () => {
    setStrategyData(initialStrategyData);
    setCurrentStep(0);
    setError(null);
  }

  const isFinalStep = currentStep === STRATEGY_STEPS.length - 1;

  const renderCurrentStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{activeStep.title}</h2>
        <p className="mt-1 text-text-secondary">{activeStep.description}</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="userInput" className="block text-sm font-medium text-text-primary">Your Input</label>
        <textarea
          id="userInput"
          rows={4}
          className="w-full p-3 border border-border-color rounded-md shadow-sm focus:ring-primary focus:border-primary transition"
          placeholder={activeStep.placeholder}
          value={activeStep.userInput}
          onChange={(e) => handleInputChange('userInput', e.target.value)}
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={isLoading || !activeStep.userInput}
          className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <SparklesIcon className="w-5 h-5" />
          {isLoading ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {isLoading && <LoadingSpinner />}
      
      {activeStep.aiOutput && !isLoading && (
        <div className="space-y-2">
          <label htmlFor="aiOutput" className="block text-sm font-medium text-text-primary">AI Generated Strategy</label>
          <textarea
            id="aiOutput"
            rows={15}
            className="w-full p-3 border border-border-color rounded-md shadow-sm bg-gray-50 focus:ring-primary focus:border-primary transition"
            value={activeStep.aiOutput}
            onChange={(e) => handleInputChange('aiOutput', e.target.value)}
          />
        </div>
      )}
    </div>
  );
  
  const renderSummary = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-text-primary text-center">Your Business Strategy</h2>
        <p className="mt-2 text-text-secondary text-center">Here is the complete strategy based on your inputs and AI generation.</p>
      </div>
      <div className="bg-card-bg p-6 sm:p-8 rounded-lg shadow-md space-y-6 border border-border-color">
        {strategyData.map(section => (
          <div key={section.title}>
            <h3 className="text-xl font-semibold text-primary border-b-2 border-primary pb-2 mb-3">{section.title}</h3>
            <div className="prose prose-sm sm:prose-base max-w-none text-text-secondary whitespace-pre-wrap">{section.aiOutput || "No content generated for this section."}</div>
          </div>
        ))}
      </div>
       <div className="text-center">
         <button
            onClick={handleReset}
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
         >
            Start Over
         </button>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            AI Business Strategist
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            Build a comprehensive business plan step-by-step with the power of generative AI.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-card-bg p-6 sm:p-8 rounded-lg shadow-lg border border-border-color">
            <div className="mb-8">
              <Stepper steps={STRATEGY_STEPS} currentStep={currentStep} />
            </div>
            
            { currentStep < STRATEGY_STEPS.length ? renderCurrentStep() : renderSummary() }
            
            { currentStep < STRATEGY_STEPS.length && (
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border-color text-sm font-medium rounded-md text-text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!activeStep.aiOutput}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {currentStep === STRATEGY_STEPS.length - 1 ? 'View Full Strategy' : 'Next'}
                  <ChevronRightIcon />
                </button>
              </div>
            )}
            
            { currentStep === STRATEGY_STEPS.length && (
               <div className="mt-8 flex justify-center">
                 <button
                   onClick={() => setCurrentStep(currentStep - 1)}
                   className="inline-flex items-center gap-2 px-4 py-2 border border-border-color text-sm font-medium rounded-md text-text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                 >
                   <ChevronLeftIcon />
                   Back to Edit
                 </button>
               </div>
            )}
          </div>
        </main>
        <footer className="text-center mt-12 text-sm text-text-secondary">
          <p>Powered by Google Gemini. All rights reserved &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
