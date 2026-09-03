'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers3 } from 'lucide-react';

type Resource = {
  label: string;
  href: string;
};

type SlideGroup = {
  id: string;
  label: string;
  slides: number[];
  resources: Resource[];
};

const totalSlides = 205;

// Keep group information separate from the rendered deck so later slide updates
// only require adjusting this small manifest, not rebuilding the page structure.
const groups: SlideGroup[] = [
  {
    id: 'amplitude',
    label: 'Amplitude',
    slides: [26, 27, 28, 29],
    resources: [
      {
        label: 'Ableton Learning Synths: Amplitude',
        href: 'https://learningsynths.ableton.com/en/making-changes/amplitude',
      },
      {
        label: 'Sound Lab: Waveforms',
        href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms',
      },
    ],
  },
  {
    id: 'frequency',
    label: 'Frequency',
    slides: [36, 37, 38],
    resources: [
      {
        label: 'Ableton Learning Synths: How synths make sound',
        href: 'https://learningsynths.ableton.com/en/oscillators/how-synths-make-sound',
      },
      {
        label: 'Sound Lab: Frequency',
        href: 'https://adamborecki.github.io/sound-lab/#/station/frequency',
      },
    ],
  },
];

const slides = Array.from({ length: totalSlides }, (_, index) => index + 1);

function groupForSlide(slide: number) {
  return groups.find((group) => group.slides.includes(slide));
}

export default function Home() {
  const [selectedSlide, setSelectedSlide] = useState(1);
  const selectedGroup = groupForSlide(selectedSlide);

  function selectSlide(slide: number) {
    setSelectedSlide(Math.max(1, Math.min(totalSlides, slide)));
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="site-name" href="#slides">MUS 244 / Unit 1</a>
        <p>{totalSlides} slides</p>
      </header>

      <section className="selected-area" aria-label="Selected slide">
        <div className="slide-stack" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="selected-slide-frame">
          <img src={`slides/slide-${selectedSlide}.png`} alt={`Slide ${selectedSlide}`} />
        </div>
        <aside className="selected-info">
          <p className="slide-count">Slide {selectedSlide} of {totalSlides}</p>
          {selectedGroup ? (
            <>
              <h1>{selectedGroup.label}</h1>
              <div className="resource-list">
                <p>Go further</p>
                {selectedGroup.resources.map((resource) => (
                  <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer">
                    {resource.label}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </>
          ) : (
            <p className="quiet-note">This slide is part of the deck. More layers can be added later when they are useful.</p>
          )}
          <div className="slide-controls">
            <button type="button" onClick={() => selectSlide(selectedSlide - 1)} disabled={selectedSlide === 1} aria-label="Previous slide">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => selectSlide(selectedSlide + 1)} disabled={selectedSlide === totalSlides} aria-label="Next slide">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </aside>
      </section>

      <section id="slides" className="slides-section" aria-label="All slides">
        <div className="slides-heading">
          <div>
            <p>All slides</p>
            <span>Select any slide to bring it forward.</span>
          </div>
          <span className="layers-key"><Layers3 aria-hidden="true" /> Has a group</span>
        </div>
        <div className="slides-grid">
          {slides.map((slide) => {
            const group = groupForSlide(slide);
            const isSelected = slide === selectedSlide;
            return (
              <button
                className={`slide-tile${isSelected ? ' is-selected' : ''}${group ? ' has-group' : ''}`}
                key={slide}
                type="button"
                onClick={() => selectSlide(slide)}
                aria-label={`Select slide ${slide}${group ? `, ${group.label} group` : ''}`}
              >
                <img src={`slides/slide-${slide}.png`} alt="" loading={slide > 12 ? 'lazy' : 'eager'} />
                <span className="tile-number">{slide}</span>
                {group && <span className="group-dot" title={`${group.label} group`}><Layers3 aria-hidden="true" /></span>}
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
