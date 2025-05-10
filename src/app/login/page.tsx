'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, 'userDirectory', uid));
      if (!userDoc.exists()) {
        setError('No user role found.');
        return;
      }

      const role = userDoc.data()?.role;
      const businessId = userDoc.data()?.businessId;

      if (!businessId && role !== 'master') {
        setError('No business ID assigned to user.');
        return;
      }

      if (role === 'master') router.push('/admin');
      else if (role === 'admin') router.push(`/business/${businessId}/admin`);
      else if (role === 'tech') router.push(`/business/${businessId}/tech`);
      else setError('Invalid user role.');
    } catch (err) {
      console.error('Firebase login error:', err);
      setError('Login failed. Check your email and password.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 w-full">
        Login
      </button>
    </div>
  );
}
