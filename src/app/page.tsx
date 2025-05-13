import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-50 to-purple-50">
      <main className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Daily Movie Quiz</h1>
          <p className="text-lg mb-8 text-gray-600">
            Test your movie knowledge with our daily quiz featuring movies from IMDb's Top 250 list.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">How to Play:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>Each day, you'll be given a movie's genre and release year as clues.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>You have six attempts to guess the correct movie title.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>Need help? You can reveal an actor's name, but it will count as one attempt.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>A new movie is featured every day!</span>
              </li>
            </ul>
          </div>
          
          <Link 
            href="/dashboard" 
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Start Today's Quiz
          </Link>
        </div>
        
        <div className="bg-blue-800 text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 mb-4 md:mb-0">
              Featuring movies from IMDb's Top 250 list
            </p>
            <div className="flex space-x-4">
              <Link 
                href="/dashboard" 
                className="text-white hover:text-blue-200 transition-colors"
              >
                Play Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
