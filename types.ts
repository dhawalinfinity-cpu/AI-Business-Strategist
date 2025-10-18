
export interface StrategySection {
  title: string;
  description: string;
  userInput: string;
  aiOutput: string;
  placeholder: string;
  prompt: (input: string, context?: string) => string;
}
