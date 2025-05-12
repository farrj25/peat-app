'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-between text-gray-100"
      style={{ backgroundColor: '#4682B4' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="w-full flex flex-col items-center pt-8 space-y-4">
        <motion.h1
          className="text-3xl font-semibold tracking-tight text-gray-100 drop-shadow"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PEAT
        </motion.h1>

        <motion.button
          onClick={() => router.push('/login')}
          className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          Login
        </motion.button>
      </div>

      {/* Tagline and Intro */}
      <motion.div
        className="text-center px-4 max-w-2xl mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl md:text-2xl font-medium text-white mb-2">
          Petroleum Equipment Asset Tracker
        </h2>
        <p className="text-gray-200 mb-4">
          Track. Maintain. Simplify fuel equipment management.
        </p>
        <p className="text-sm text-gray-200 leading-relaxed">
          PEAT helps fuel service providers monitor pumps, tanks, warranties, and service records—all from one secure platform.
          Designed for rugged field use and enterprise coordination, PEAT gives operators the clarity and control they need.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="w-full max-w-3xl px-6 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white border-b border-gray-300 pb-2 mb-6 text-center">
          Key Features
        </h3>
        <ul className="space-y-5 text-sm text-gray-200 font-light">
          {[
            { icon: '📍', text: 'Track assets by location, tank, and GPS coordinates' },
            { icon: '🛠', text: 'Log maintenance with automatic reminders' },
            { icon: '🔗', text: 'Scan QR codes to access equipment history' },
          ].map((item, index) => (
            <motion.li
              key={item.text}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + 0.15 * index, duration: 0.4 }}
            >
              <span className="text-gray-300 text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-gray-300 py-4 border-t border-gray-400">
        © 2025 Ledger Guard Systems
      </footer>
    </motion.div>
  );
}
