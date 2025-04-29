'use client';

import BaseHookFabricCanvas from '@/features/fabric/ui/base-hook-fabric';
import dynamic from 'next/dynamic';

const KnovaCanvas = dynamic(() => import('../features/konva'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="w-full border-b bg-white shadow-sm px-8 py-4">
        <h1 className="text-2xl font-bold text-center">🖌️ Fabric.js vs Konva.js</h1>
        <p className="text-center text-sm text-gray-500">
          React 환경에서의 드로잉 라이브러리 비교
        </p>
      </header>

      {/* Canvas 비교 영역 */}
      <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="rounded-lg bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-center text-blue-600">
            Fabric.js
          </h2>
          <BaseHookFabricCanvas />
        </div>

        <div className="rounded-lg bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-center text-green-600">
            Konva.js
          </h2>
          <KnovaCanvas />
        </div>
      </section>
    </main>
  );
}
