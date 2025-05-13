# Daily Movie Quiz

A web-based daily movie quiz application built with Next.js and Tailwind CSS. This application presents users with a daily quiz featuring movies from IMDb's Top 250 list.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Daily movie quiz featuring films from IMDb's Top 250 list
- Initial clues include the movie's genre and release year
- Six attempts to guess the correct movie title
- Option to reveal an actor's name (counts as one attempt)
- Responsive design with Tailwind CSS
- State persistence across page reloads
- Daily quiz reset

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font family.

## How It Works

1. Each day, a new movie is selected from IMDb's Top 250 list
2. Users are presented with the movie's genre and release year as initial clues
3. Users have six attempts to guess the correct movie title
4. Users can choose to reveal an actor's name, which counts as one attempt
5. Feedback is provided after each guess
6. At the end of the quiz, the correct answer and movie details are revealed

## Data Source

The application uses data from the IMDb Top 250 movies list, which is fetched from a JSON file that updates every six hours. The data includes the movie title, release year, genres, and main actors.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
