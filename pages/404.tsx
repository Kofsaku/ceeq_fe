import { CeeqLayout } from "@/components/layout";
import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6">
        <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
NotFound.layout = CeeqLayout.BLANK;
