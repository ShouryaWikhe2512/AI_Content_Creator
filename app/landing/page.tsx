import DraggableText from "@/components/DraggableText";
import Header from "@/components/Header";
import MemeGenerator from "@/components/MemeGenerator";
import Navbar from "@/components/navbar";
import ReelSyncUploader from "@/components/ReelSyncUploader";
import ScriptToVideoSection from "@/components/ScriptToVideoSection";
import VideoCarousel from "@/components/videoCarousel";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-black text-white animate-fadeIn">
      {/* Navbar Space */}
      {/* <header className="h-20 bg-gradient-to-r from-blue-900/80 via-blue-600/80 to-blue-900/80 backdrop-blur-lg shadow-2xl rounded-b-3xl border-b border-blue-500/50 flex items-center justify-center px-10 animate-fadeIn">
        <div className="w-full max-w-6xl flex justify-center">
          <Navbar />
        </div>
      </header> */}
      <Header />

      <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-cyan-400 to-green-700 text-center my-16 animate-fadeIn drop-shadow-lg">
        <DraggableText text="Dive into Absolute AI!  " />
      </div>

      {/* Video Carousel Placeholder */}

      <section
        className="relative w-[85%] max-w-6xl h-[600px] flex items-center justify-center mr-30 my-16 animate-fadeInUp rounded-3xl mx-auto overflow-hidden shadow-[0px_0px_40px_rgba(0,255,255,0.3)] border border-lime-500 backdrop-blur-lg p-15
  transition-all duration-500 hover:shadow-[0px_0px_60px_rgba(0,255,255,0.5)] scale-100 hover:scale-[1.02]"
      >
        {/* Inner Glow & Radial Light */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent)] 
       before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]"
        >
          {/* Particle Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-20 w-10 h-10 bg-purple-300 rounded-full opacity-40 animate-ping"></div>
            <div className="absolute bottom-10 right-20 w-14 h-14 bg-orange-300 rounded-full opacity-30 animate-ping"></div>

            {/* Video Carousel */}
            <VideoCarousel
              videos={[
                "/videos/oLuR0kHPgQO5fzdKx5DlugYjb0.mp4",
                "/videos/uOGQQ7pVUTdt8kE55DBzSoaTPw.mp4",
                "/videos/eJWPLw5oOX16bDOw9jWpFxAjSc.mp4",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <main className="flex flex-col items-center w-full min-h-screen bg-black px-6 py-14">
        {/* Full-width ScriptToVideoSection */}
        <div className="w-full">
          <ScriptToVideoSection />
          <ReelSyncUploader />
          <MemeGenerator />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
          <div className="p-10 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 md:col-span-2 mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              📸 Create Thumbnail with Text
            </h2>
            <p className="text-gray-400 mb-6">
              Generate eye-catching thumbnails with custom text in seconds.
            </p>
            <img
              src="/images/thumbnail-example.jpg"
              alt="Thumbnail Example"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          </div>

          <div className="p-8 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold mb-4">🎬 Video from Script</h2>
            <p className="text-gray-400 mb-6">
              Upload a script, and we'll automatically generate a video for you.
            </p>
            <video className="w-full h-48 rounded-md mb-4" controls>
              <source src="/videos/sample-script-video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="p-12 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 md:col-span-2 mx-auto">
            <h2 className="text-4xl font-bold mb-6">🎵 Upload Music & Clips</h2>
            <p className="text-gray-400 mb-6">
              Enhance your videos by adding background music and clips.
            </p>
            <img
              src="/images/music-upload.jpg"
              alt="Music Upload"
              className="w-full h-56 object-cover rounded-md mb-4"
            />
          </div>

          <div className="p-8 bg-gray-800 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 md:max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              😂 Instant Meme Generator
            </h2>
            <p className="text-gray-400 mb-6">
              Create funny memes instantly with AI-powered tools.
            </p>
            <img
              src="/images/meme-generator.jpg"
              alt="Meme Generator"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
