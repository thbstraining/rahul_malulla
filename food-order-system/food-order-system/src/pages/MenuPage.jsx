import { useParams } from "react-router-dom";
import Menu from "../components/Menu";

const MenuPage = () => {
  const { restaurantId } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Restaurant Menu</h1>
          <nav>
            <a href="/" className="text-blue-500 hover:text-blue-700 mx-3">
              Home
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto mt-10 px-4">
        <Menu restaurantId={restaurantId} />
      </main>

      <footer className="bg-white shadow-md py-6 px-4 w-full mt-auto">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-gray-600">
            &copy; 2024 Restaurant Menu. All rights reserved.
          </p>
          <nav>
            <a
              href="/privacy"
              className="text-blue-500 hover:text-blue-700 mx-3"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="text-blue-500 hover:text-blue-700 mx-3">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;
