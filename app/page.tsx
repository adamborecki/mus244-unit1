'use client';

import { useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Box, Rotate3D } from 'lucide-react';

type Resource = { label: string; href: string };

type SlideGroup = {
  id: string;
  label: string;
  slides: number[];
  resources: Resource[];
};

const totalSlides = 205;

const groups: SlideGroup[] = [
  {
    id: 'amplitude',
    label: 'Amplitude',
    slides: [26, 27, 28, 29],
    resources: [
      { label: 'Ableton Learning Synths: Amplitude', href: 'https://learningsynths.ableton.com/en/making-changes/amplitude' },
      { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
    ],
  },
  {
    id: 'frequency',
    label: 'Frequency',
    slides: [36, 37, 38],
    resources: [
      { label: 'Ableton Learning Synths: How synths make sound', href: 'https://learningsynths.ableton.com/en/oscillators/how-synths-make-sound' },
      { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
    ],
  },
];

function groupBeginningAt(slide: number) {
  return groups.find((group) => group.slides[0] === slide);
}

function groupContaining(slide: number) {
  return groups.find((group) => group.slides.includes(slide));
}

function SlideCard({ slide, onSelect }: { slide: number; onSelect: () => void }) {
  return (
    <button className="slide-card" type="button" onClick={onSelect} aria-label={`Select slide ${slide}`}>
      <img src={`slides/slide-${slide}.png`} alt={`Slide ${slide}`} loading={slide > 3 ? 'lazy' : 'eager'} />
      <span>{slide}</span>
    </button>
  );
}

function Prism({ group, onSelect }: { group: SlideGroup; onSelect: () => void }) {
  // Rest between slide faces so a group immediately reads as a dimensional object.
  const [turn, setTurn] = useState(0.5);
  const sides = group.slides.length * 2;
  const angle = 360 / sides;
  const radius = sides === 6 ? 345 : sides === 8 ? 490 : 250;
  const style = {
    '--sides': sides,
    '--rotation': `${turn * angle}deg`,
    '--radius': `${radius}px`,
  } as CSSProperties;

  return (
    <article className="prism-section" aria-label={`${group.label} slide group`} onMouseEnter={onSelect}>
      <div className="prism-kicker"><Box aria-hidden="true" /> {group.slides.length === 2 ? 'Cuboid' : `${sides}-sided prism`} / slides {group.slides[0]}-{group.slides.at(-1)}</div>
      <div className="prism-window">
        <div className="prism" style={style}>
          {Array.from({ length: sides }, (_, side) => {
            const isSlideFace = side % 2 === 0;
            const slide = group.slides[side / 2];
            return (
              <button
                className={`prism-face${isSlideFace ? ' prism-slide-face' : ' prism-material-face'}`}
                key={side}
                type="button"
                style={{ transform: `rotateY(${side * angle}deg) translateZ(${radius}px)` }}
                onClick={onSelect}
                aria-label={isSlideFace ? `Open ${group.label}, slide ${slide}` : `Open ${group.label} group`}
              >
                {isSlideFace ? <img src={`slides/slide-${slide}.png`} alt={`Slide ${slide}`} loading="lazy" /> : <span>{group.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="prism-footer">
        <div><strong>{group.label}</strong><span>{group.slides.length} connected slides</span></div>
        <div className="prism-controls">
          <button type="button" onClick={() => setTurn((value) => value + 2)} aria-label={`Rotate ${group.label} left`}><ArrowLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => setTurn((value) => value - 2)} aria-label={`Rotate ${group.label} right`}><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(1);
  const activeGroup = groupContaining(activeSlide);
  const stream: React.ReactNode[] = [];

  for (let slide = 1; slide <= totalSlides; slide += 1) {
    const group = groupBeginningAt(slide);
    if (group) {
      stream.push(<Prism key={group.id} group={group} onSelect={() => setActiveSlide(group.slides[0])} />);
      slide += group.slides.length - 1;
    } else {
      stream.push(<SlideCard key={slide} slide={slide} onSelect={() => setActiveSlide(slide)} />);
    }
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <div><p>MUS 244 / Unit 1</p><span>{totalSlides} slides</span></div>
        <Rotate3D aria-label="3D slide groups" />
      </header>
      <div className="course-layout">
        <section className="slide-stream" aria-label="Unit 1 slides">{stream}</section>
        <aside className="details-panel" aria-live="polite">
          <p className="details-count">{activeGroup ? `Slides ${activeGroup.slides[0]}-${activeGroup.slides.at(-1)}` : `Slide ${activeSlide}`}</p>
          {activeGroup ? (
            <>
              <h1>{activeGroup.label}</h1>
              <p className="details-copy">A connected slide group. Rotate it to see the other faces, then use any resource that helps you go further.</p>
              <div className="resource-list">
                <p>Explore more</p>
                {activeGroup.resources.map((resource) => (
                  <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer">
                    {resource.label}<ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </>
          ) : (
            <p className="details-copy">This is a slide in the main sequence. Not every slide needs another layer.</p>
          )}
        </aside>
      </div>
    </main>
  );
}
