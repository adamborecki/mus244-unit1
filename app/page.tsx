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
    { label: 'Sound Lab: What Is Sound?', href: 'https://adamborecki.github.io/sound-lab/#/station/sound-waves' },
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
    { label: '440 Hz: a closer listen', href: 'https://www.youtube.com/watch?v=UnhlQUBsd6g' },
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
    { label: 'Sound Lab: FFT', href: 'https://adamborecki.github.io/sound-lab/#/station/fft' },
    { label: 'Sound Lab: Spectrum Analyzer', href: 'https://adamborecki.github.io/sound-lab/#/station/spectrum' },
  ],
  161: [
    { label: 'LA Phil: Stockhausen, Gesang der Jünglinge', href: 'https://www.laphil.com/works/gesang-der-juenglinge-song-of-the-youths' },
    { label: 'IRCAM: how Gesang der Jünglinge was realized', href: 'https://medias.ircam.fr/en/media/xe7eafe' },
    { label: 'Ice Ice Baby / Under Pressure sampling case', href: 'https://blogs.law.gwu.edu/mcir/case/queen-david-bowie-v-vanilla-ice/' },
  ],
  168: [
    { label: 'LA Phil: Stockhausen, Gesang der Jünglinge', href: 'https://www.laphil.com/works/gesang-der-juenglinge-song-of-the-youths' },
    { label: 'IRCAM: how Gesang der Jünglinge was realized', href: 'https://medias.ircam.fr/en/media/xe7eafe' },
    { label: 'Ice Ice Baby / Under Pressure sampling case', href: 'https://blogs.law.gwu.edu/mcir/case/queen-david-bowie-v-vanilla-ice/' },
  ],
};

const resourceRanges: Array<{ from: number; to: number; resources: Resource[] }> = [
  {
    from: 1,
    to: 7,
    resources: [
      { label: 'Sound Lab: What Is Sound?', href: 'https://adamborecki.github.io/sound-lab/#/station/sound-waves' },
      { label: 'PhET: Wave on a String', href: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html' },
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
      { label: 'Sound Lab: Amplitude', href: 'https://adamborecki.github.io/sound-lab/#/station/amplitude' },
      { label: 'Sound Lab: Decibels', href: 'https://adamborecki.github.io/sound-lab/#/station/decibels' },
    ],
  },
  {
    from: 33,
    to: 35,
    resources: [
      { label: 'Chrome Music Lab: Oscillators', href: 'https://musiclab.chromeexperiments.com/Oscillators/' },
      { label: 'Sound Lab: Periodic vs. Aperiodic', href: 'https://adamborecki.github.io/sound-lab/#/station/periodic' },
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
      { label: 'Sound Lab: Oscillator', href: 'https://adamborecki.github.io/sound-lab/#/station/oscillator' },
      { label: 'Sound Lab: Colors of Noise', href: 'https://adamborecki.github.io/sound-lab/#/station/colors-of-noise' },
    ],
  },
  {
    from: 72,
    to: 84,
    resources: [
      { label: 'Sound Lab: Phase', href: 'https://adamborecki.github.io/sound-lab/#/station/phase' },
      { label: 'Sound Lab: Polarity', href: 'https://adamborecki.github.io/sound-lab/#/station/polarity' },
      { label: 'Sound Lab: Constructive Interference', href: 'https://adamborecki.github.io/sound-lab/#/station/constructive-interference' },
    ],
  },
  {
    from: 85,
    to: 106,
    resources: [
      { label: 'Sound Lab: Beating Patterns', href: 'https://adamborecki.github.io/sound-lab/#/station/beating' },
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
      { label: 'Sound Lab: Spectrum Analyzer', href: 'https://adamborecki.github.io/sound-lab/#/station/spectrum' },
      { label: 'Sound Lab: Spectrogram', href: 'https://adamborecki.github.io/sound-lab/#/station/spectrogram' },
      { label: 'Sound Lab: FFT', href: 'https://adamborecki.github.io/sound-lab/#/station/fft' },
    ],
  },
];

const slidesWithoutExplore = new Set([
  1, 2, 3, 5, 7, 24, 25, 48, 49, 50, 51, 52, 53, 56, 70, 71, 81, 82, 83, 84, 85, 86, 106, 107, 126,
]);

function resourcesForSlide(slide: number) {
  return resourcesBySlide[slide] ?? resourceRanges.find((range) => slide >= range.from && slide <= range.to)?.resources ?? [];
}

function canExplore(slide: number) {
  return Boolean(resourcesForSlide(slide).length) && !slidesWithoutExplore.has(slide);
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
          const hasExplore = canExplore(slide);
          return (
            <article className={`slide-entry${isOpen ? ' is-open' : ''}`} key={slide}>
              <button className="slide-card" type="button" onClick={() => hasExplore && setOpenSlide(isOpen ? null : slide)} aria-expanded={hasExplore && isOpen} aria-controls={hasExplore ? `explore-${slide}` : undefined} disabled={!hasExplore}>
                <img src={`slides/slide-${slide}.png`} alt={`Slide ${slide}`} loading={slide > 3 ? 'lazy' : 'eager'} />
                <span>Slide {slide}</span>
              </button>
              {hasExplore && isOpen && (
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
