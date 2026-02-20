# **App Name**: Leftover Chef

## Core Features:

- Image Capture and Upload: Capture images directly from the camera (on mobile) or upload/drag-and-drop images (on desktop). The images are optimized client-side before being sent to the API.
- AI Recipe Generation: Utilize Vision AI (OpenAI or Anthropic) to analyze the uploaded image of leftover ingredients and generate a complete recipe, including ingredients, steps, and tips, using the Vercel AI SDK's streamObject function with Zod schema validation for the AI's response.
- Real-time Recipe Streaming: Stream the generated recipe content (ingredients, steps, tips) to the user interface in real-time using the Vercel AI SDK's streaming capabilities.
- Loading State Management: Display engaging loading messages while the AI is processing the image and generating the recipe (e.g., "The digital chef is inspecting your fridge...").
- Error Handling: Gracefully handle errors, such as when the image does not contain food, and prompt the user to try again with helpful messages.

## Style Guidelines:

- Primary color: Fresh light-green (#B2D732) evoking natural ingredients.
- Background color: Light off-white (#F2F4F3), offering a clean and spacious feel (9% saturation, 95% brightness).
- Accent color: Soft yellow-orange (#FFC447) for interactive elements and highlights, creating contrast and focus.
- Body font: 'Inter', a grotesque-style sans-serif with a modern, machined, objective, neutral look.
- Headline font: 'Space Grotesk', a proportional sans-serif with a computerized, techy, scientific feel.
- Use Lucide React icons for a clean and consistent look throughout the application.
- Employ a minimalist layout with generous whitespace and subtle glassmorphism cards for displaying recipes.
- Integrate Framer Motion for smooth, subtle animations to enhance user interaction and provide feedback.