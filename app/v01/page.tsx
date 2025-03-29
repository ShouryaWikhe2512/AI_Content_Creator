import Hero from "@/components/hero";
import AiTools from "@/components/ai-tools";
import FinalCta from "@/components/final-cta";
import RobotScrollScene from "@/components/robot-scroll-screen";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <RobotScrollScene>
        <Hero />
        <AiTools />
        <FinalCta />
      </RobotScrollScene>
    </div>
  );
}
