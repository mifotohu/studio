'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a recipe from an image of ingredients.
 *
 * - generateRecipeFromImage - A function that handles the recipe generation process from an image.
 * - GenerateRecipeFromImageInput - The input type for the generateRecipeFromImage function.
 * - GenerateRecipeFromImageOutput - The return type for the generateRecipeFromImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateRecipeFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of leftover ingredients, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateRecipeFromImageInput = z.infer<typeof GenerateRecipeFromImageInputSchema>;

const RecipeOutputSchema = z.object({
  hasFood: z.boolean().describe('Whether the image contains identifiable food ingredients.'),
  errorMessage: z.string().optional().describe('An error message if no food is detected or processing fails.'),
  recipe: z.object({
    title: z.string().describe('The title of the generated recipe.'),
    description: z.string().describe('A brief description of the recipe.'),
    ingredients: z.array(z.string()).describe('A list of ingredients required for the recipe.'),
    instructions: z.array(z.string()).describe('Step-by-step instructions for preparing the recipe.'),
    tips: z.array(z.string()).optional().describe('Optional tips for the recipe.'),
  }).optional(), // recipe object is optional if hasFood is false
});
export type GenerateRecipeFromImageOutput = z.infer<typeof RecipeOutputSchema>;

export async function generateRecipeFromImage(input: GenerateRecipeFromImageInput): Promise<GenerateRecipeFromImageOutput> {
  return generateRecipeFromImageFlow(input);
}

const generateRecipePrompt = ai.definePrompt({
  name: 'generateRecipeFromImagePrompt',
  input: { schema: GenerateRecipeFromImageInputSchema },
  output: { schema: RecipeOutputSchema },
  prompt: `You are a 'Leftover Chef' AI assistant, specialized in creating delicious and complete recipes from available ingredients.
Your task is to analyze the provided image of food ingredients and generate a recipe.

If the image contains identifiable food ingredients, set 'hasFood' to 'true' and generate a complete, edible, and delicious recipe. The recipe should include:
1.  A creative and appealing title.
2.  A brief description of the recipe.
3.  A list of all ingredients identified in the image, along with any other common pantry items needed to make a complete meal. Be specific with quantities and states (e.g., "1 medium onion, diced", "200g cooked chicken, shredded").
4.  Step-by-step cooking instructions, clearly numbered.
5.  Helpful tips for preparing or serving the dish.

If you cannot identify any food ingredients in the image, or if the image is not food-related, set 'hasFood' to 'false' and provide a helpful 'errorMessage' to the user, suggesting they upload an image of food. Do not generate a 'recipe' object in this case.

Return the response strictly in the following JSON format:
{{_output_schema}}

Image of ingredients: {{media url=photoDataUri}}`,
});

const generateRecipeFromImageFlow = ai.defineFlow(
  {
    name: 'generateRecipeFromImageFlow',
    inputSchema: GenerateRecipeFromImageInputSchema,
    outputSchema: RecipeOutputSchema,
  },
  async (input) => {
    const { output } = await generateRecipePrompt(input);
    return output!;
  }
);
