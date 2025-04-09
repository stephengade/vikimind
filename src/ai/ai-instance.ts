import {genkit} from 'genkit';

export const ai = genkit({
  promptDir: './prompts',
  model: 'googleai/gemini-2.0-flash',
});
