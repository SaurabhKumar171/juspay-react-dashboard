import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react"; // A visually appealing icon from lucide-react

const NotFound = () => {
  const location = useLocation();

  // This smart logic is preserved from your original component
  const rawPage = location.pathname.split("/").filter(Boolean).pop() || "Home";
  const pageName = rawPage
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    // This helpful developer warning is also preserved
    console.warn("Page under development:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 px-6 overflow-hidden">
      {/* Decorative background gradients for a modern feel */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900/50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/50 rounded-full blur-3xl opacity-50"></div>

      <div className="text-center z-10">
        {/* Animate the content container for a smooth entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Main Icon */}
          <div className="inline-block p-4 bg-slate-200/60 dark:bg-gray-800/60 rounded-full mb-8 shadow-inner">
            <Rocket className="size-16 md:size-20 text-blue-600 dark:text-blue-400" />
          </div>

          {/* Gradient Heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-slate-50 dark:to-slate-400 mb-5">
            Coming Soon
          </h1>

          {/* Page Description */}
          <p className="text-lg max-w-xl mx-auto text-slate-600 dark:text-slate-400 mb-10">
            The{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {pageName}
            </span>{" "}
            page is currently under construction. We are working hard to bring
            this feature to you.
          </p>

          {/* Call-to-action Button (using <Link>) */}
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
