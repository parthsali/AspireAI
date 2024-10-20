import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate bg-blue-600 bg-opacity-70 text-white py-20">
        <div className="container mx-auto px-6 pt-14 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Aspire AI
            </h1>
            <p className="mt-6 text-lg leading-8">
              Your Personalized Career Mentor with AI-Powered Guidance
            </p>
            <Link
              to="/login"
              className="mt-8 inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">
            Why Choose Aspire AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature text-center bg-gray-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Career Guidance</h3>
              <p className="text-gray-700">
                Receive personalized career recommendations based on your
                strengths, skills, and goals.
              </p>
            </div>
            <div className="feature text-center bg-gray-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Mock Interviews</h3>
              <p className="text-gray-700">
                Practice your interview skills with AI-driven mock interview
                sessions and receive real-time feedback.
              </p>
            </div>
            <div className="feature text-center bg-gray-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Roadmap Generation
              </h3>
              <p className="text-gray-700">
                Create tailored learning paths and action plans to efficiently
                achieve your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta bg-blue-600 bg-opacity-70 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to take your career to the next level?
          </h2>
          <p className="mb-8">
            Join Aspire AI today and start your personalized career journey.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-200">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Aspire AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
