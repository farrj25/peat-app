'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#ADD8E6] text-gray-800">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-6">
        <motion.h1
          className="text-3xl font-bold text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PEAT
        </motion.h1>

        <motion.button
          onClick={() => router.push('/login')}
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-300 font-semibold shadow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          Login
        </motion.button>
      </div>

      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center text-center px-4 flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          Petroleum Equipment Asset Tracker
        </h2>
        <p className="text-lg md:text-xl text-gray-800 mb-6">
          Track. Maintain. Simplify fuel equipment management.
        </p>
        <p className="max-w-2xl text-gray-700">
          PEAT helps fuel service providers track pumps, tanks, warranties, and service logs—all in one place. 
          Designed for ease-of-use in the field or the office, PEAT brings visibility and control to your fuel equipment operations.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="bg-white bg-opacity-30 rounded-md mx-auto p-6 mb-10 w-full max-w-3xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
        <ul className="space-y-3 text-gray-800 font-medium">
          {[
            '📍 Location-based equipment inventory',
            '🛠 Maintenance logs with reminders',
            '📎 QR code access in the field',
          ].map((feature, index) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + 0.2 * index, duration: 0.5 }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-4 border-t border-gray-300">
        © 2025 Ledger Guard Systems
      </footer>
    </div>
  );
}
