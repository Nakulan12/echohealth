
import { Link } from "react-router-dom";
import { Github, MessageCircle, ShieldCheck, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              EchoHealth - AI-powered health screening
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              to="#"
              className="text-gray-500 hover:text-echoTeal-600 dark:text-gray-400 dark:hover:text-echoTeal-400"
            >
              <span className="sr-only">GitHub</span>
              <Github size={20} />
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:text-echoTeal-600 dark:text-gray-400 dark:hover:text-echoTeal-400"
            >
              <span className="sr-only">Discord</span>
              <MessageCircle size={20} />
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:text-echoTeal-600 dark:text-gray-400 dark:hover:text-echoTeal-400"
            >
              <span className="sr-only">Privacy Policy</span>
              <ShieldCheck size={20} />
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:text-echoTeal-600 dark:text-gray-400 dark:hover:text-echoTeal-400"
            >
              <span className="sr-only">Contact</span>
              <Send size={20} />
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} EchoHealth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
