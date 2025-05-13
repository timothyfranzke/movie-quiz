import { QuizProvider } from '../../context/QuizContext';
import MovieQuiz from '../../components/MovieQuiz';

export default function Dashboard() {
  return (
    <main className="container mx-auto py-8 px-4">
      <QuizProvider>
        <MovieQuiz />
      </QuizProvider>
    </main>
  );
}