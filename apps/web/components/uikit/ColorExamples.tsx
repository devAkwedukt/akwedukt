"use client";

export default function ColorExamples() {
  const Sample = ({ tone, backgroundColor }: { tone: string; backgroundColor: string }) => {
    return (
      <div
        className={`w-16 h-16 ${backgroundColor} rounded border text-white flex items-center justify-center text-xs`}
      >
        {tone}
      </div>
    );
  };
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Tailwind Color Examples</h1>

      {/* Deep Navy Blue */}
      <section>
        <h2 className="text-xl font-semibold mb-4">deep-navy-blue-</h2>
        <div className="flex flex-wrap gap-2">
          <Sample tone="50" backgroundColor="bg-deep-navy-blue-50" />
          <Sample tone="100" backgroundColor="bg-deep-navy-blue-100" />
          <Sample tone="200" backgroundColor="bg-deep-navy-blue-200" />
          <Sample tone="300" backgroundColor="bg-deep-navy-blue-300" />
          <Sample tone="400" backgroundColor="bg-deep-navy-blue-400" />
          <Sample tone="500" backgroundColor="bg-deep-navy-blue-500" />
          <Sample tone="600" backgroundColor="bg-deep-navy-blue-600" />
          <Sample tone="700" backgroundColor="bg-deep-navy-blue-700" />
          <Sample tone="800" backgroundColor="bg-deep-navy-blue-800" />
          <Sample tone="900" backgroundColor="bg-deep-navy-blue-900" />
          <Sample tone="950" backgroundColor="bg-deep-navy-blue-950" />
        </div>
      </section>

      {/* Ocean Green */}
      <section>
        <h2 className="text-xl font-semibold mb-4">ocean-green-</h2>
        <div className="flex flex-wrap gap-2">
          <Sample tone="50" backgroundColor="bg-ocean-green-50" />
          <Sample tone="100" backgroundColor="bg-ocean-green-100" />
          <Sample tone="200" backgroundColor="bg-ocean-green-200" />
          <Sample tone="300" backgroundColor="bg-ocean-green-300" />
          <Sample tone="400" backgroundColor="bg-ocean-green-400" />
          <Sample tone="500" backgroundColor="bg-ocean-green-500" />
          <Sample tone="600" backgroundColor="bg-ocean-green-600" />
          <Sample tone="700" backgroundColor="bg-ocean-green-700" />
          <Sample tone="800" backgroundColor="bg-ocean-green-800" />
          <Sample tone="900" backgroundColor="bg-ocean-green-900" />
          <Sample tone="950" backgroundColor="bg-ocean-green-950" />
        </div>
      </section>

      {/* Happy Green */}
      <section>
        <h2 className="text-xl font-semibold mb-4">happy-green-</h2>
        <div className="flex flex-wrap gap-2">
          <Sample tone="50" backgroundColor="bg-happy-green-50" />
          <Sample tone="100" backgroundColor="bg-happy-green-100" />
          <Sample tone="200" backgroundColor="bg-happy-green-200" />
          <Sample tone="300" backgroundColor="bg-happy-green-300" />
          <Sample tone="400" backgroundColor="bg-happy-green-400" />
          <Sample tone="500" backgroundColor="bg-happy-green-500" />
          <Sample tone="600" backgroundColor="bg-happy-green-600" />
          <Sample tone="700" backgroundColor="bg-happy-green-700" />
          <Sample tone="800" backgroundColor="bg-happy-green-800" />
          <Sample tone="900" backgroundColor="bg-happy-green-900" />
          <Sample tone="950" backgroundColor="bg-happy-green-950" />
        </div>
      </section>

      {/* Pink */}
      <section>
        <h2 className="text-xl font-semibold mb-4">pink-</h2>
        <div className="flex flex-wrap gap-2">
          <Sample tone="50" backgroundColor="bg-pink-50" />
          <Sample tone="100" backgroundColor="bg-pink-100" />
          <Sample tone="200" backgroundColor="bg-pink-200" />
          <Sample tone="300" backgroundColor="bg-pink-300" />
          <Sample tone="400" backgroundColor="bg-pink-400" />
          <Sample tone="500" backgroundColor="bg-pink-500" />
          <Sample tone="600" backgroundColor="bg-pink-600" />
          <Sample tone="700" backgroundColor="bg-pink-700" />
          <Sample tone="800" backgroundColor="bg-pink-800" />
          <Sample tone="900" backgroundColor="bg-pink-900" />
          <Sample tone="950" backgroundColor="bg-pink-950" />
        </div>
      </section>

      {/* Purple */}
      <section>
        <h2 className="text-xl font-semibold mb-4">purple-</h2>
        <div className="flex flex-wrap gap-2">
          <Sample tone="50" backgroundColor="bg-purple-50" />
          <Sample tone="100" backgroundColor="bg-purple-100" />
          <Sample tone="200" backgroundColor="bg-purple-200" />
          <Sample tone="300" backgroundColor="bg-purple-300" />
          <Sample tone="400" backgroundColor="bg-purple-400" />
          <Sample tone="500" backgroundColor="bg-purple-500" />
          <Sample tone="600" backgroundColor="bg-purple-600" />
          <Sample tone="700" backgroundColor="bg-purple-700" />
          <Sample tone="800" backgroundColor="bg-purple-800" />
          <Sample tone="900" backgroundColor="bg-purple-900" />
          <Sample tone="950" backgroundColor="bg-purple-950" />
        </div>
      </section>

      {/* Gray */}
      <section>
        <h2 className="text-xl font-semibold mb-4">gray-</h2>
        <div className="flex flex-wrap gap-2">
          <Sample tone="50" backgroundColor="bg-gray-50" />
          <Sample tone="100" backgroundColor="bg-gray-100" />
          <Sample tone="200" backgroundColor="bg-gray-200" />
          <Sample tone="300" backgroundColor="bg-gray-300" />
          <Sample tone="400" backgroundColor="bg-gray-400" />
          <Sample tone="500" backgroundColor="bg-gray-500" />
          <Sample tone="600" backgroundColor="bg-gray-600" />
          <Sample tone="700" backgroundColor="bg-gray-700" />
          <Sample tone="800" backgroundColor="bg-gray-800" />
          <Sample tone="900" backgroundColor="bg-gray-900" />
          <Sample tone="950" backgroundColor="bg-gray-950" />
        </div>
      </section>
    </div>
  );
}
