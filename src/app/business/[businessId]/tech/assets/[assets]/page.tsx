'use client';
export const dynamic = 'force-dynamic';

import nextDynamic from 'next/dynamic';

const TechAssetView = nextDynamic(() => import('./client'), {
  ssr: false,
  loading: () => <div className="p-6">Loading asset...</div>,
});

export default function Page() {
  return <TechAssetView />;
}
