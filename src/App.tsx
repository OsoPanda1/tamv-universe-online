import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Groups from "./pages/Groups";
import Channels from "./pages/Channels";
import Concerts from "./pages/Concerts";
import DreamSpaces from "./pages/DreamSpaces";
import Auctions from "./pages/Auctions";
import Marketplaces from "./pages/Marketplaces";
import Music from "./pages/Music";
import Wallet from "./pages/Wallet";
import Universidad from "./pages/Universidad";
import Lives from "./pages/Lives";
import Streaming from "./pages/Streaming";
import VideoCall from "./pages/VideoCall";
import IsabellaChat from "./pages/IsabellaChat";
import VirtualStore from "./pages/VirtualStore";
import DigitalPets from "./pages/DigitalPets";
import Memberships from "./pages/Memberships";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import KAOS from "./pages/KAOS";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/dreamspaces" element={<DreamSpaces />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/marketplaces" element={<Marketplaces />} />
          <Route path="/music" element={<Music />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/universidad" element={<Universidad />} />
          <Route path="/lives" element={<Lives />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/videocall" element={<VideoCall />} />
          <Route path="/isabella" element={<IsabellaChat />} />
          <Route path="/store" element={<VirtualStore />} />
          <Route path="/pets" element={<DigitalPets />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/kaos" element={<KAOS />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
