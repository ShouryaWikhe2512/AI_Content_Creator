import EnhancedScriptToVideo from "@/components/ScriptToVideoSection";

export default function EnhancedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <EnhancedScriptToVideo
          script="Generate a futuristic cityscape with flying cars, holographic billboards, and neon lights reflecting off glass skyscrapers. The scene should be set at night with a cyberpunk aesthetic."
          videoSrc="/placeholder.svg?height=720&width=1280"
          staticVideoSrc="/placeholder.svg?height=720&width=1280"
        />
      </div>
    </main>
  );
}
