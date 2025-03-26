import EnhancedCinemaReel from "@/components/cinema-reel";

export default function EnhancedPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-8">
          Enhanced Cinema Reel Animation
        </h1>
        <p className="text-center text-amber-200/80 max-w-2xl mx-auto mb-12">
          An immersive cinema reel with advanced effects, smooth transitions,
          and interactive controls.
        </p>

        <EnhancedCinemaReel />
      </div>
    </main>
  );
}
