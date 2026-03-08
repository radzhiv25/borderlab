import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <MainContent />
    </div>
  );
}
