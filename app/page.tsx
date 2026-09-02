'use client';

import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, Check, Clipboard, Headphones, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const answers = [
  'The pitch gets higher.',
  'The wave becomes louder or quieter.',
  'The wave no longer needs a medium.',
];

export default function Home() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [depth, setDepth] = useState(52);
  const [understand, setUnderstand] = useState('');
  const [help, setHelp] = useState('');
  const [copied, setCopied] = useState(false);

  const canvasText = `MUS 244 Unit 1: Amplitude Check-In\n\nConcept: Amplitude and loudness\nUnderstanding check: ${answer === answers[1] ? 'Correct' : 'In progress'}\nWhat I understand better: ${understand || '[Write 1-2 sentences]'}\nWhat I still need help with: ${help || '[Write one question]'}\nOptional practice completed: Ableton Learning Synths amplitude lesson\n\nCompleted in the MUS 244 Unit 1 learning site.`;

  async function copyCanvasText() {
    await navigator.clipboard.writeText(canvasText);
    setCopied(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f4ea] text-[#203033]">
      <section className="relative isolate overflow-hidden border-b border-[#203033]/10 px-5 pb-16 pt-6 sm:px-10 lg:px-16">
        <div className="signal-field absolute inset-0 -z-10 opacity-80" />
        <nav className="mx-auto flex max-w-6xl items-center justify-between" aria-label="Unit navigation">
          <a className="font-display text-xl font-bold tracking-tight" href="#top">MUS 244 / UNIT 1</a>
          <span className="rounded-full border border-[#203033]/15 bg-[#f7f4ea]/75 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[#3f6264]">DAYS 1-3</span>
        </nav>
        <div id="top" className="mx-auto grid max-w-6xl gap-10 pb-4 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="eyebrow">A new baseline for learning sound</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-black leading-[0.92] tracking-[-0.06em] text-[#153e43] sm:text-7xl">See it. Hear it. Then decide how deep to go.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#355052]">Every group starts with a clear 2D explanation. When a concept benefits from motion, sound, or space, you can open the next layer without leaving the lesson behind.</p>
          </div>
          <div className="rounded-[2rem] border border-[#153e43]/15 bg-[#fcfbf5]/80 p-6 shadow-[0_24px_70px_rgba(21,62,67,0.12)] backdrop-blur-sm">
            <p className="eyebrow">Today&apos;s route</p>
            <ol className="mt-5 space-y-4">
              {['What is sound?', 'Amplitude', 'Frequency'].map((item, index) => (
                <li key={item} className="flex items-center gap-4">
                  <span className={`grid size-9 place-items-center rounded-full font-display font-bold ${index === 1 ? 'bg-[#eb6d50] text-white' : 'bg-[#d8e4d8] text-[#153e43]'}`}>{index + 1}</span>
                  <span className="text-base font-semibold">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-10 lg:px-16" aria-labelledby="amplitude-title">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="eyebrow">Slides 26-29 / one learning group</p>
            <h2 id="amplitude-title" className="mt-3 font-display text-5xl font-black leading-none tracking-[-0.05em] text-[#153e43]">Amplitude</h2>
            <p className="mt-5 text-base leading-7 text-[#466063]">Don&apos;t memorize four separate slides. Keep one idea in view, test it, then use the tool when you are ready.</p>
            <a className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#bb4f36] underline decoration-2 underline-offset-4" href="https://learningsynths.ableton.com/en/making-changes/amplitude" target="_blank" rel="noreferrer">Try Ableton Learning Synths <ArrowUpRight className="size-4" /></a>
          </aside>

          <div className="space-y-5">
            <article className="rounded-[2rem] bg-[#153e43] p-7 text-[#f7f4ea] shadow-[0_20px_55px_rgba(21,62,67,0.18)] sm:p-9">
              <p className="eyebrow text-[#a9d7c8]">TL;DR</p>
              <p className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">Amplitude is the size of a vibration. When it changes, we usually hear a sound as louder or quieter.</p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-white/10 px-4 py-2">Physical: size of vibration</span><span className="rounded-full bg-white/10 px-4 py-2">Perception: loudness</span><span className="rounded-full bg-white/10 px-4 py-2">Measurement: dB</span></div>
            </article>

            <article className="overflow-hidden rounded-[2rem] border border-[#153e43]/15 bg-[#fcfbf5]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#153e43]/10 px-7 py-5"><div><p className="eyebrow">Look deeper</p><h3 className="mt-1 font-display text-2xl font-bold">Make the vibration taller</h3></div><label className="flex items-center gap-3 text-sm font-semibold" htmlFor="amplitude-control">Amplitude <span className="tabular-nums text-[#bb4f36]">{depth}%</span></label></div>
              <div className="wave-stage px-7 py-9">
                <div className="wave-line" style={{ '--wave-height': `${Math.max(18, depth / 1.5)}px` } as CSSProperties} aria-label={`Waveform at ${depth}% amplitude`} role="img">{Array.from({ length: 11 }, (_, index) => <span key={index} />)}</div>
                <input id="amplitude-control" className="mt-9 w-full accent-[#eb6d50]" type="range" min="20" max="100" value={depth} onChange={(event) => setDepth(Number(event.target.value))} />
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#466063]">The frequency has not changed. Only the height of the wave has changed, which is why this interaction is about level, not pitch.</p>
              </div>
            </article>

            <article className="rounded-[2rem] border border-[#153e43]/15 bg-[#d8e4d8] p-7 sm:p-9">
              <div className="flex items-start gap-3"><Headphones className="mt-1 size-5 text-[#bb4f36]" /><div><p className="eyebrow">Understanding check</p><h3 className="mt-1 font-display text-2xl font-bold">If a waveform becomes taller without changing its frequency, what changes most directly?</h3></div></div>
              <div className="mt-6 grid gap-3">{answers.map((option) => <button key={option} onClick={() => setAnswer(option)} className={`rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition ${answer === option ? 'border-[#153e43] bg-[#153e43] text-white' : 'border-[#153e43]/15 bg-[#f7f4ea]/70 hover:border-[#153e43]/45'}`}>{option}</button>)}</div>
              {answer && <p className={`mt-5 text-sm font-semibold ${answer === answers[1] ? 'text-[#1e6257]' : 'text-[#a44331]'}`}>{answer === answers[1] ? 'Yes. The overall level changes; pitch is tied to frequency.' : 'Try again. Frequency controls repetition rate and is usually heard as pitch.'}</p>}
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-[#153e43]/10 bg-[#efe5cf] px-5 py-16 sm:px-10 lg:px-16" aria-labelledby="canvas-title">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow">When this becomes homework</p><h2 id="canvas-title" className="mt-3 font-display text-5xl font-black leading-none tracking-[-0.05em] text-[#153e43]">Canvas, without a data trap.</h2><p className="mt-5 max-w-md leading-7 text-[#466063]">Your reflection stays on your device until you choose to copy it into Canvas. This site does not need student names, grades, or accounts to teach the lesson.</p></div>
          <div className="rounded-[2rem] bg-[#fcfbf5] p-7 shadow-[0_18px_55px_rgba(21,62,67,0.1)] sm:p-9">
            <label className="eyebrow" htmlFor="understand">One thing I understand better now</label>
            <Textarea id="understand" value={understand} onChange={(event) => setUnderstand(event.target.value)} placeholder="Example: I understand why a waveform can look taller without changing pitch." className="mt-3 bg-white" />
            <label className="mt-6 block eyebrow" htmlFor="help">One thing I still need help with</label>
            <Textarea id="help" value={help} onChange={(event) => setHelp(event.target.value)} placeholder="Write one specific question." className="mt-3 bg-white" />
            <pre className="mt-6 max-h-48 overflow-auto whitespace-pre-wrap rounded-2xl bg-[#153e43] p-5 font-mono text-xs leading-5 text-[#e9f4e7]">{canvasText}</pre>
            <Button onClick={copyCanvasText} className="mt-5 h-11 bg-[#eb6d50] px-5 hover:bg-[#c8553b]">{copied ? <><Check className="size-4" /> Copied for Canvas</> : <><Clipboard className="size-4" /> Copy Canvas text</>}</Button>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col justify-between gap-5 px-5 py-9 text-sm text-[#466063] sm:px-10 md:flex-row lg:px-16"><p><Sparkles className="mr-2 inline size-4 text-[#bb4f36]" />MUS 244 Unit 1 / source-aware learning paths</p><a className="underline underline-offset-4" href="https://www.physicsclassroom.com/class/sound/Lesson-1/Sound-is-a-Pressure-Wave" target="_blank" rel="noreferrer">Source: The Physics Classroom, Sound Is a Pressure Wave</a></footer>
    </main>
  );
}
