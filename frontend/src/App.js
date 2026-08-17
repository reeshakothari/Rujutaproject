import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/site/SmoothScroll";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import MobileCTABar from "@/components/site/MobileCTABar";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import RequestWorkshop from "@/pages/RequestWorkshop";
import Donate from "@/pages/Donate";
import Partner from "@/pages/Partner";
import Contact from "@/pages/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <SmoothScroll>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/request-workshop" element={<RequestWorkshop />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
            <div className="h-16 lg:hidden" aria-hidden="true" />
            <MobileCTABar />
          </SmoothScroll>
          <Toaster />
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
