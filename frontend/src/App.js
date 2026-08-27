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
import Gallery from "@/pages/Gallery";
import Videos from "@/pages/Videos";
import Impact from "@/pages/Impact";
import About from "@/pages/About";
import AmbassadorApply from "@/pages/AmbassadorApply";
import Volunteer from "@/pages/Volunteer";
import GetInvolved from "@/pages/GetInvolved";
import Activities from "@/pages/Activities";

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
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/about" element={<About />} />
              <Route path="/apply-ambassador" element={<AmbassadorApply />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/activities" element={<Activities />} />
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
