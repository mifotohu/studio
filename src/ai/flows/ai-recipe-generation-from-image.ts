'use server';
/**
 * @fileOverview Ez a fájl valósítja meg a Genkit flow-t, amely képek alapján receptet generál.
 *
 * - generateRecipeFromImage - A funkció, amely a receptgenerálást végzi egy kép alapján.
 * - GenerateRecipeFromImageInput - A bemeneti típus.
 * - GenerateRecipeFromImageOutput - A kimeneti típus.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateRecipeFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "Egy fotó a maradék hozzávalókról, data URI formátumban, amelynek tartalmaznia kell a MIME típust és Base64 kódolást. Elvárt formátum: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateRecipeFromImageInput = z.infer<typeof GenerateRecipeFromImageInputSchema>;

const RecipeOutputSchema = z.object({
  hasFood: z.boolean().describe('Azt jelzi, hogy a kép tartalmaz-e azonosítható élelmiszert.'),
  errorMessage: z.string().optional().describe('Hibaüzenet, ha nem észlelhető étel vagy a feldolgozás sikertelen.'),
  recipe: z.object({
    title: z.string().describe('A generált recept címe.'),
    description: z.string().describe('A recept rövid leírása.'),
    ingredients: z.array(z.string()).describe('A recepthez szükséges hozzávalók listája.'),
    instructions: z.array(z.string()).describe('Lépésről lépésre kidolgozott elkészítési útmutató.'),
    tips: z.array(z.string()).optional().describe('Opcionális tippek a recepthez.'),
  }).optional(),
});
export type GenerateRecipeFromImageOutput = z.infer<typeof RecipeOutputSchema>;

export async function generateRecipeFromImage(input: GenerateRecipeFromImageInput): Promise<GenerateRecipeFromImageOutput> {
  return generateRecipeFromImageFlow(input);
}

const generateRecipePrompt = ai.definePrompt({
  name: 'generateRecipeFromImagePrompt',
  input: { schema: GenerateRecipeFromImageInputSchema },
  output: { schema: RecipeOutputSchema },
  prompt: `Te egy 'Maradék Séf' AI asszisztens vagy, aki arra specializálódott, hogy a rendelkezésre álló alapanyagokból finom és teljes recepteket készítsen.
A feladatod, hogy elemezd a kapott képet az alapanyagokról, és generálj egy receptet MAGYAR NYELVEN.

Ha a képen azonosítható élelmiszer található, állítsd a 'hasFood' értéket 'true'-ra, és generálj egy teljes, ehető és finom receptet. A recept tartalmazza a következőket:
1. Kreatív és vonzó cím.
2. Rövid leírás a receptről.
3. A képen azonosított összes hozzávaló listája, kiegészítve az alapvető éléskamrai cikkekkel (pl. só, olaj), amelyek szükségesek a teljes fogáshoz. Légy pontos a mennyiségekkel és az állapotokkal (pl. "1 közepes vöröshagyma, felkockázva", "200g sült csirke, felaprítva").
4. Lépésről lépésre kidolgozott főzési útmutató, egyértelműen sorszámozva.
5. Hasznos tippek az étel elkészítéséhez vagy tálalásához.

Ha nem tudsz élelmiszert azonosítani a képen, vagy ha a kép nem étellel kapcsolatos, állítsd a 'hasFood' értéket 'false'-ra, és adj meg egy segítőkész 'errorMessage'-t a felhasználónak magyarul, javasolva, hogy töltsön fel egy képet az alapanyagokról. Ebben az esetben ne generálj 'recipe' objektumot.

A választ szigorúan a megadott JSON formátumban add vissza, és minden szöveges tartalom MAGYARUL legyen.
{{_output_schema}}

Kép a hozzávalókról: {{media url=photoDataUri}}`,
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
