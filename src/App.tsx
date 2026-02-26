import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrayerTimes from "./pages/PrayerTimes";
import About from "./pages/About";
import Activities from "./pages/Activities";
import Donations from "./pages/Donations";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Partners from "./pages/Partners";
import NotFound from "./pages/NotFound";
import { NotificationProvider } from "./components/NotificationProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NotificationProvider />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prieres" element={<PrayerTimes />} />
          <Route path="/apropos" element={<About />} />
          <Route path="/activites" element={<Activities />} />
          <Route path="/dons" element={<Donations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/actualites" element={<News />} />
          <Route path="/partenaires" element={<Partners />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
