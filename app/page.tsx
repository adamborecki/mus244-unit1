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
  12: [
    { label: 'NASA: the sounds of interstellar space', href: 'https://science.nasa.gov/science-research/planetary-science/01nov_ismsounds/' },
    { label: 'NASA: mechanical vs electromagnetic waves', href: 'https://science.nasa.gov/ems/02_anatomy/' },
    { label: 'Chrome Music Lab: Sound Waves', href: 'https://musiclab.chromeexperiments.com/Sound-Waves/' },
  ],
  15: [
    { label: 'Sonic Visualiser: look inside recordings', href: 'https://www.sonicvisualiser.org/' },
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
  42: [
    { label: 'NOAA: the sound of the beluga', href: 'https://graysreef.noaa.gov/education/activities/pdfs/gr_sound_of_the_beluga.pdf' },
    { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
    { label: 'Chrome Music Lab: Sound Waves', href: 'https://musiclab.chromeexperiments.com/Sound-Waves/' },
  ],
  43: [
    { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
    { label: 'Chrome Music Lab: Oscillators', href: 'https://musiclab.chromeexperiments.com/Oscillators/' },
  ],
  44: [
    { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
    { label: 'musictheory.net: Intervals', href: 'https://www.musictheory.net/lessons/30' },
  ],
  88: [
    { label: 'Bose: how noise cancelling works', href: 'https://www.bose.com/stories/how-do-noise-cancelling-headphones-work' },
    { label: 'Mod FX: guided effect experiments', href: 'https://adamborecki.github.io/mod-fx/' },
    { label: 'NASA: seeing sound activity', href: 'https://www.nasa.gov/sites/default/files/atoms/files/seeing_sound_k-8-v2_0.pdf' },
  ],
  89: [
    { label: 'Bose: how noise cancelling works', href: 'https://www.bose.com/stories/how-do-noise-cancelling-headphones-work' },
    { label: 'Mod FX: guided effect experiments', href: 'https://adamborecki.github.io/mod-fx/' },
  ],
  98: [
    { label: 'Harmonic Series Builder', href: 'https://adamborecki.github.io/harmonic-series-builder-gen3/' },
    { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
  ],
  102: [
    { label: 'Steve Reich: Piano Phase', href: 'https://www.youtube.com/watch?v=7P_9hDzG1i0' },
    { label: 'Mod FX: guided effect experiments', href: 'https://adamborecki.github.io/mod-fx/' },
  ],
  103: [
    { label: 'Steve Reich: Piano Phase', href: 'https://www.youtube.com/watch?v=7P_9hDzG1i0' },
    { label: 'Mod FX: guided effect experiments', href: 'https://adamborecki.github.io/mod-fx/' },
  ],
  105: [
    { label: 'Mod FX: guided effect experiments', href: 'https://adamborecki.github.io/mod-fx/' },
    { label: 'Steve Reich: Piano Phase', href: 'https://www.youtube.com/watch?v=7P_9hDzG1i0' },
  ],
  130: [
    { label: '3Blue1Brown: Fourier transform visualized', href: 'https://www.3blue1brown.com/lessons/fourier-transforms/' },
    { label: 'Sonic Visualiser: spectrogram reference', href: 'https://sonicvisualiser.org/doc/reference/5.0.0/en/' },
    { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
  ],
};

const resourceRanges: Array<{ from: number; to: number; resources: Resource[] }> = [
  {
    from: 1,
    to: 7,
    resources: [
      { label: 'MUS 244 webapps', href: 'https://adamborecki.github.io/webapps/' },
      { label: 'Sonic Visualiser: look inside recordings', href: 'https://www.sonicvisualiser.org/' },
    ],
  },
  {
    from: 8,
    to: 25,
    resources: [
      { label: 'Chrome Music Lab: Sound Waves', href: 'https://musiclab.chromeexperiments.com/Sound-Waves/' },
      { label: 'PhET: Wave on a String', href: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html' },
      { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
    ],
  },
  {
    from: 26,
    to: 32,
    resources: [
      { label: 'Ableton Learning Synths: Amplitude', href: 'https://learningsynths.ableton.com/en/making-changes/amplitude' },
      { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
      { label: 'Sonic Visualiser: waveform and dB views', href: 'https://www.sonicvisualiser.org/screenshots.html' },
    ],
  },
  {
    from: 33,
    to: 35,
    resources: [
      { label: 'Chrome Music Lab: Oscillators', href: 'https://musiclab.chromeexperiments.com/Oscillators/' },
      { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
      { label: 'Try a related MUS 244 webapp', href: 'https://adamborecki.github.io/webapps/' },
    ],
  },
  {
    from: 36,
    to: 49,
    resources: [
      { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
      { label: 'Ableton Learning Synths: How synths make sound', href: 'https://learningsynths.ableton.com/en/oscillators/how-synths-make-sound' },
      { label: 'PhET: Wave on a String', href: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html' },
    ],
  },
  {
    from: 50,
    to: 61,
    resources: [
      { label: 'Chrome Music Lab: Sound Waves', href: 'https://musiclab.chromeexperiments.com/Sound-Waves/' },
      { label: 'PhET: Wave on a String', href: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html' },
      { label: 'Unit 1 review', href: 'https://adamborecki.github.io/mus244-unit1-review/' },
    ],
  },
  {
    from: 62,
    to: 71,
    resources: [
      { label: 'Chrome Music Lab: Oscillators', href: 'https://musiclab.chromeexperiments.com/Oscillators/' },
      { label: 'Ableton Learning Synths: How synths make sound', href: 'https://learningsynths.ableton.com/en/oscillators/how-synths-make-sound' },
      { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
    ],
  },
  {
    from: 72,
    to: 84,
    resources: [
      { label: 'Mod FX: guided effect experiments', href: 'https://adamborecki.github.io/mod-fx/' },
      { label: 'Chrome Music Lab: Oscillators', href: 'https://musiclab.chromeexperiments.com/Oscillators/' },
      { label: 'PhET: Wave on a String', href: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html' },
    ],
  },
  {
    from: 85,
    to: 106,
    resources: [
      { label: 'Harmonic Series Builder', href: 'https://adamborecki.github.io/harmonic-series-builder-gen3/' },
      { label: 'Steve Reich: Piano Phase', href: 'https://www.youtube.com/watch?v=7P_9hDzG1i0' },
      { label: 'Mod FX: guided effect experiments', href: 'https://adamborecki.github.io/mod-fx/' },
    ],
  },
  {
    from: 107,
    to: 115,
    resources: [
      { label: 'musictheory.net: Generic Intervals', href: 'https://www.musictheory.net/lessons/30' },
      { label: 'musictheory.net: Specific Intervals', href: 'https://www.musictheory.net/lessons/31' },
      { label: 'Sound Lab: Frequency', href: 'https://adamborecki.github.io/sound-lab/#/station/frequency' },
    ],
  },
  {
    from: 116,
    to: 126,
    resources: [
      { label: 'Harmonic Series Builder', href: 'https://adamborecki.github.io/harmonic-series-builder-gen3/' },
      { label: 'Chrome Music Lab: Harmonics', href: 'https://musiclab.chromeexperiments.com/Harmonics/' },
      { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
    ],
  },
  {
    from: 127,
    to: 130,
    resources: [
      { label: 'Sonic Visualiser: audio analysis', href: 'https://www.sonicvisualiser.org/' },
      { label: 'Sonic Visualiser: spectrogram reference', href: 'https://sonicvisualiser.org/doc/reference/5.0.0/en/' },
      { label: 'Sound Lab: Waveforms', href: 'https://adamborecki.github.io/sound-lab/#/station/waveforms' },
    ],
  },
];

const laterSlideResources: Resource[] = [
  { label: 'MUS 244 webapps', href: 'https://adamborecki.github.io/webapps/' },
  { label: 'Unit 1 review', href: 'https://adamborecki.github.io/mus244-unit1-review/' },
];

function resourcesForSlide(slide: number) {
  return resourcesBySlide[slide] ?? resourceRanges.find((range) => slide >= range.from && slide <= range.to)?.resources ?? laterSlideResources;
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
