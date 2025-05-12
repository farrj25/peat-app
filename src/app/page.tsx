'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-between text-gray-800"
      style={{ backgroundColor: '#6FB8E9' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Top Section: Logo + Login */}
      <div className="w-full flex flex-col items-center py-6 space-y-2">
        <motion.h1
          className="text-4xl font-extrabold text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PEAT
        </motion.h1>
        <motion.button
          onClick={() => router.push('/login')}
          className="bg-yellow-400 text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-300 shadow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          Login
        </motion.button>
      </div>

      {/* Intro Section */}
      <motion.div
        className="text-center px-4 max-w-3xl"
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
        <p className="text-gray-700">
          PEAT helps fuel service providers track pumps, tanks, warranties, and service logs—all in one place. 
          Designed for ease-of-use in the field or the office, PEAT brings visibility and control to your fuel equipment operations.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="bg-white bg-opacity-80 rounded-2xl mx-auto p-6 my-10 w-full max-w-3xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
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
              transition={{ delay: 0.8 + 0.2 * index, duration: 0.5 }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-4 w-full border-t border-gray-300">
        © 2025 Ledger Guard Systems
      </footer>
    </motion.div>
  );
}
