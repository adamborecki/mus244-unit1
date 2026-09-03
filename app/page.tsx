'use client';

import { useState } from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';

type Resource = { label: string; href: string };

const totalSlides = 205;

// These are deliberately small, source-aware starting points. More individual
// connections can be added without changing the slide stream itself.
const resourcesBySlide: Record<number, Resource[]> = {
  4: [
    { label: 'Christian Lous Lange, Nobel lecture', href: 'https://www.nobelprize.org/prizes/peace/1921/lange/lecture/' },
    { label: 'Christian Lous Lange, Nobel Prize facts', href: 'https://www.nobelprize.org/prizes/peace/1921/summary/' },
  ],
  8: [
    { label: 'Chrome Music Lab: Sound Waves', href: 'https://musiclab.chromeexperiments.com/Sound-Waves/' },
  ],
  26: [
    { label: 'Ableton Learning Synths: Amplitude', href: 'https://learningsynths.ableton.com/en/making-changes/amplitude' },
    { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
  ],
  27: [
    { label: 'Ableton Learning Synths: Amplitude', href: 'https://learningsynths.ableton.com/en/making-changes/amplitude' },
    { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
  ],
  28: [
    { label: 'Ableton Learning Synths: Amplitude', href: 'https://learningsynths.ableton.com/en/making-changes/amplitude' },
    { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
  ],
  29: [
    { label: 'Ableton Learning Synths: Amplitude', href: 'https://learningsynths.ableton.com/en/making-changes/amplitude' },
    { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
  ],
  36: [
    { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
    { label: 'Ableton Learning Synths: How synths make sound', href: 'https://learningsynths.ableton.com/en/oscillators/how-synths-make-sound' },
  ],
  37: [
    { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
    { label: 'Ableton Learning Synths: How synths make sound', href: 'https://learningsynths.ableton.com/en/oscillators/how-synths-make-sound' },
  ],
  38: [
    { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
    { label: 'Ableton Learning Synths: How synths make sound', href: 'https://learningsynths.ableton.com/en/oscillators/how-synths-make-sound' },
  ],
};

const defaultResources: Resource[] = [
  { label: 'MUS 244 webapps', href: 'https://adamborecki.github.io/webapps/' },
  { label: 'Unit 1 review', href: 'https://adamborecki.github.io/mus244-unit1-review/' },
];

function resourcesForSlide(slide: number) {
  return resourcesBySlide[slide] ?? defaultResources;
}

export default function Home() {
  const [openSlide, setOpenSlide] = useState<number | null>(null);

  return (
    <main className="site-shell">
      <header className="site-header">
        <p>MUS 244 / Unit 1</p>
        <span>{totalSlides} slides</span>
      </header>
      <section className="slide-stream" aria-label="MUS 244 Unit 1 slides">
        {Array.from({ length: totalSlides }, (_, index) => {
          const slide = index + 1;
          const isOpen = openSlide === slide;
          return (
            <article className={`slide-entry${isOpen ? ' is-open' : ''}`} key={slide}>
              <button className="slide-card" type="button" onClick={() => setOpenSlide(isOpen ? null : slide)} aria-expanded={isOpen} aria-controls={`explore-${slide}`}>
                <img src={`slides/slide-${slide}.png`} alt={`Slide ${slide}`} loading={slide > 3 ? 'lazy' : 'eager'} />
                <span>Slide {slide}</span>
              </button>
              {isOpen && (
                <div className="explore-panel" id={`explore-${slide}`}>
                  <div><Compass aria-hidden="true" /><p>Explore more</p></div>
                  <div className="resource-list">
                    {resourcesForSlide(slide).map((resource) => (
                      <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer">
                        {resource.label}<ArrowUpRight aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
