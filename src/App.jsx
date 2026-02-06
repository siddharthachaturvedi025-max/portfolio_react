import React from 'react';
import { DriveProvider } from './context/DriveContext';
import { content } from './data/content';
import {
  Navbar, Hero, BioSection, QuoteSection, Competencies,
  SoftwareSection, Projects, Research, Supplementary, Footer
} from './components/PortfolioSections';

function App() {
  return (
    <DriveProvider>
      <div className="app-container">
        <Navbar />
        <Hero data={content.hero} />
        <BioSection data={content.bio} />
        <QuoteSection data={content.quote} />
        <Competencies data={content.competencies} />
        <SoftwareSection data={content.software} />
        <Projects data={content.projects} />
        <Research data={content.research} />
        <Supplementary />
        <Footer />
      </div>
    </DriveProvider>
  );
}

export default App;
