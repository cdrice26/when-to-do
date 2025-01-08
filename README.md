# WhenToDo

WhenToDo is a simple task scheduler that helps you plan your week. It is built with Next.js and TailwindCSS. Enter your sleep schedule and events for the week, and then enter your tasks for the week and WhenToDo will schedule them for you. It'll even account for driving time and do its best to keep you from ending up outside in the rain. 

## Getting Started

You'll need an API key for the OpenRouteService API. You can get one [here](https://openrouteservice.org/dev/#/api-docs/). Then create a `.env.local` file in the root directory and add your API key as `API_KEY=YOUR_API_KEY`.

Then you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the app.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.