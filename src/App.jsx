import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const EMAIL = 'earlkennethpanuncial@gmail.com';
const GITHUB = 'https://github.com/earlpc05-hash';
const INSTAGRAM = 'https://www.instagram.com/erl_kk';


const PHOTO_SRC = '/earl.jpg';

const RESUME_URL = '';

const THEME_KEY = 'earl-portfolio-theme-v2';
const FUEL_API = '/api/fuel'; 


const TRACKS = [
  {
    title: 'bye (Altare Remix)',
    src: '/music/Ariana%20Grande%20-%20bye%20%5BAltare%20Remix%5D.mp3',
  },
  {
    title: 'One Of The Girls',
    src: '/music/One%20Of%20The%20Girls%20-%20The%20Weeknd.mp3',
  },
  {
  title: 'Trance',
  src: '/music/Trance%20-%20Metro%20Boomin.mp3',
  },
  {
    title: 'Confident',
    src: '/music/Confident%20-%20Justin%20Bieber.mp3',
  },
  {
    title: 'hate that i made you love me',
    src: '/music/hate%20that%20i%20made%20you%20love%20me%20-%20Ariana%20Grande.mp3',
  },
  {
    title: 'Baby Powder',
    src: '/music/Baby%20Powder%20-%20Jenevieve.mp3',
  },
  {
    title: 'Disillusioned',
    src: '/music/Disillusioned%20-%20Daniel%20Caesar.mp3',
  },
  {
    title: 'Like I Want You',
    src: '/music/Like%20I%20Want%20You%20-%20GIVEON.mp3',
  },
  {
    title: 'blue',
    src: '/music/blue%20-%20kamal.mp3',
  },
  {
    title: 'Paris in the Rain',
    src: '/music/Paris%20in%20the%20Rain%20-%20Lauv.mp3',
  },
];


const BYTEBOND = {
  name: 'ByteBond',
  summary: 'A collaborative organization portfolio website showcasing ByteBond, its members, projects, and shared vision.',
  why: 'Created as a school organization portfolio project to establish an online presence and present the organization in a professional and engaging way.',
  role: 'Frontend Developer',

  contributions: [
    'Built the frontend using React.',
    'Collaborated with my partner, who handled the backend development.',
    'Contributed to the website layout, responsive design, content, and interactive elements.'
  ],

  stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Tailwind CSS'],

  decisions: [],

  category: 'Collaborative project',

  shots: [
    {
      src: '/images/bytebond/home.webp',
      width: 1600,
      height: 790,
      alt: 'ByteBond home page with the headline “Connecting Ideas. Building Together.” and the ByteBond logo',
      caption: 'Home page on desktop',
    },
    {
      src: '/images/bytebond/projects.webp',
      width: 1600,
      height: 797,
      alt: 'ByteBond Projects and Activities page showing a grid of project cards',
      caption: 'Projects and activities page',
    },
    {
      src: '/images/bytebond/mobile.webp',
      width: 644,
      height: 856,
      alt: 'ByteBond home page on a phone screen',
      caption: 'Layout on a phone',
    },
  ],

  challenge: 'This was our first web development project as a group. We had to learn how to collaborate effectively, divide responsibilities, and use GitHub for version control.',

  status: 'Live on Vercel. This was my first major collaborative web development project, created during my second year as a BSIT student.',

  demo: 'https://bytebond.vercel.app/',
  repo: 'https://github.com/earlpc05-hash/Bytebond',
};

// Skills, grouped by what they are. No ratings or percentages.
// file = name of the logo in public/images/skills (without .svg)
// dark = true when that logo also has a white "-on-dark" version
const SKILL_GROUPS = [
  {
    title: 'Programming languages',
    items: [
      { name: 'HTML5', file: 'html5' },
      { name: 'CSS3', file: 'css3' },
      { name: 'JavaScript', file: 'javascript' },
      { name: 'Python', file: 'python' },
      { name: 'Java', file: 'java' },
    ],
  },
  {
    title: 'Frameworks and styling',
    items: [
      { name: 'React', file: 'react' },
      { name: 'Tailwind CSS', file: 'tailwind' },
    ],
  },
  {
    title: 'Development tools',
    items: [
      { name: 'Visual Studio Code', file: 'vscode' },
      { name: 'Node.js', file: 'nodejs' },
      { name: 'npm', file: 'npm' },
      { name: 'Vite', file: 'vite' },
    ],
  },
  {
    title: 'Version control and hosting',
    items: [
      { name: 'Git', file: 'git' },
      { name: 'GitHub', file: 'github', dark: true },
      { name: 'Vercel', file: 'vercel', dark: true },
    ],
  },
  {
    title: 'Design and creative',
    items: [
      { name: 'AutoCAD', file: 'autocad' },
      { name: 'Canva', file: 'canva' },
      { name: 'CapCut', file: 'capcut', dark: true },
    ],
  },
  {
    title: 'AI tools',
    items: [{ name: 'Claude', file: 'claude' }],
  },
  {
    title: 'Productivity',
    items: [
      { name: 'Word', file: 'word' },
      { name: 'Excel', file: 'excel' },
      { name: 'PowerPoint', file: 'powerpoint' },
    ],
  },
];

// Things I'm into. Add a line here whenever there is something new.
const INTERESTS = [
  'Computers',
  'Programming',
  'Web design',
  'Technology',
  'Creative work: design and video',
];

const ACHIEVEMENTS = [];

const NAV = [
  ['home', 'Home'],
  ['work', 'Work'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['achievements', 'Achievements'],
  ['interests', 'Interests'],
  ['resume', 'Résumé'],
  ['contact', 'Contact'],
];

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    external: <><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></>,
    github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7A5.2 5.2 0 0 0 18.8 5 4.8 4.8 0 0 0 18.7 1S17.5.7 15 2.5a13.4 13.4 0 0 0-7 0C5.5.7 4.3 1 4.3 1A4.8 4.8 0 0 0 4.2 5a5.2 5.2 0 0 0-1.4 3.7c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 8 18.1V22" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    play: <path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none" />,
    pause: <><path d="M8 5h3v14H8z" fill="currentColor" stroke="none" /><path d="M15 5h3v14h-3z" fill="currentColor" stroke="none" /></>,
    next: <><path d="m5 5 10 7-10 7z" fill="currentColor" stroke="none" /><path d="M19 5v14" /></>,
    previous: <><path d="m19 5-10 7 10 7z" fill="currentColor" stroke="none" /><path d="M5 5v14" /></>,
    music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="0.7" fill="currentColor" stroke="none" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    volume: <><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13" /></>,
    volumeOff: <><path d="M11 5 6 9H3v6h3l5 4z" /><path d="m16 9 5 6m0-6-5 6" /></>,
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}

// One official logo per tool, stored as an SVG file in public/images/skills.
// Black logos (GitHub, Vercel, CapCut) have a white "-on-dark.svg" twin that the
// CSS swaps in for the dark theme. Every logo is drawn at its own proportions.
function SkillLogo({ file, hasDarkVariant }) {
  const base = `/images/skills/${file}`;
  return (
    <span className="skill-logo" aria-hidden="true">
      <img className="on-light" src={`${base}.svg`} alt="" width="40" height="40" loading="lazy" decoding="async" />
      {hasDarkVariant && (
        <img className="on-dark" src={`${base}-on-dark.svg`} alt="" width="40" height="40" loading="lazy" decoding="async" />
      )}
    </span>
  );
}

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function MusicPlayer({ open, onToggle, onClose }) {
  const rootRef = useRef(null);
  const audioRef = useRef(null);
  const wantPlayRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.72);
  const [failed, setFailed] = useState(false);
  const track = TRACKS[index];

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

 
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !wantPlayRef.current) return;
    audio.play().catch(() => {
      wantPlayRef.current = false;
      setPlaying(false);
      setFailed(true);
    });
  }, [index]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, onClose]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      wantPlayRef.current = false;
      audio.pause();
      return;
    }

    wantPlayRef.current = true;
    setFailed(false);
    try {
      await audio.play();
    } catch {
      wantPlayRef.current = false;
      setPlaying(false);
      setFailed(true);
    }
  }

  function changeTrack(direction) {
    setIndex((current) => (current + direction + TRACKS.length) % TRACKS.length);
    setCurrentTime(0);
    setDuration(0);
    setFailed(false);
  }

  function seek(event) {
    const nextTime = Number(event.target.value);
    if (audioRef.current && Number.isFinite(nextTime)) {
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={rootRef}
      className={`music ${open ? 'is-open' : ''}`}
      role="group"
      aria-label="Music player"
    >
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
        onLoadedMetadata={(event) =>
          setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)
        }
        onDurationChange={(event) =>
          setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)
        }
        onEnded={() => changeTrack(1)}
        onError={() => {
          wantPlayRef.current = false;
          setPlaying(false);
          setFailed(true);
        }}
      />

      <button
        className="music-toggle"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="music-body"
        aria-label={open ? 'Collapse music player' : 'Expand music player'}
      >
        <Icon name="music" size={16} />
        <span className={`music-bars ${playing ? 'is-playing' : ''}`} aria-hidden="true">
          <i /><i /><i />
        </span>
      </button>

      <div className="music-body" id="music-body" inert={!open}>
        <div className="music-controls">
          <button className="music-btn" onClick={() => changeTrack(-1)} aria-label="Previous track">
            <Icon name="previous" size={15} />
          </button>
          <button
            className="music-play"
            onClick={togglePlayback}
            aria-label={playing ? 'Pause music' : 'Play music'}
          >
            <Icon name={playing ? 'pause' : 'play'} size={15} />
          </button>
          <button className="music-btn" onClick={() => changeTrack(1)} aria-label="Next track">
            <Icon name="next" size={15} />
          </button>
        </div>

        <div className="music-track">
          <div className="music-track-top">
            <strong title={track.title}>{failed ? 'Could not load this track' : track.title}</strong>
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <input
            aria-label="Track progress"
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={Math.min(currentTime, duration || 100)}
            onChange={seek}
            className="range-input"
            style={{ '--range-progress': `${progress}%` }}
          />
        </div>

        <label className="music-volume">
          <Icon name={volume === 0 ? 'volumeOff' : 'volume'} size={14} />
          <input
            aria-label="Volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="range-input"
            style={{ '--range-progress': `${volume * 100}%` }}
          />
        </label>
      </div>
    </div>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="portrait" data-reveal>
      <div className="portrait-frame">
        {!failed && (
          <img
            src={PHOTO_SRC}
            alt="Portrait of Earl Panuncial"
            onError={() => setFailed(true)}
            decoding="async"
          />
        )}
        {failed && (
          <div className="portrait-fallback" aria-hidden="true">
            <span>E</span><span>P</span>
          </div>
        )}
      </div>
      <figcaption>
        <span>Earl Panuncial</span>
        <span>BSIT · Year 2</span>
      </figcaption>
    </figure>
  );
}

function SectionHeading({ index, eyebrow, children }) {
  return (
    <div className="section-heading" data-reveal>
      <div className="section-meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2>{children}</h2>
    </div>
  );
}

function CaseRow({ label, kind = 'text', value }) {
  return (
    <div className="case-row">
      <dt>{label}</dt>
      <dd>
        {kind === 'text' && <p>{value}</p>}
        {kind === 'list' && (
          <ul>
            {value.map((item) => <li key={item}>{item}</li>)}
          </ul>
        )}
        {kind === 'tags' && (
          <div className="tag-list">
            {value.map((item) => <span className="tag" key={item}>{item}</span>)}
          </div>
        )}
      </dd>
    </div>
  );
}

function useCountTo(target) {
  const [shown, setShown] = useState(0);
  const shownRef = useRef(0);

  useEffect(() => {
    if (target === null || shownRef.current === target) return undefined;

    const from = shownRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 0 : Math.abs(target - from) > 1 ? 650 : 240;
    const start = performance.now();
    let frame = 0;

    const step = (now) => {
      const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (target - from) * eased);
      shownRef.current = value;
      setShown(value);
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return shown;
}

// How many bars the battery has. It only affects how the icon looks.
const BATTERY_BARS = 5;

function FuelTheBuild() {
  const [count, setCount] = useState(null); // total confirmed by the server
  const [unavailable, setUnavailable] = useState(false); // the first load failed
  const [charging, setCharging] = useState(false); // battery animation
  const [saving, setSaving] = useState(0); // taps still waiting for the server
  const [failed, setFailed] = useState(false); // the last tap was not saved
  const [level, setLevel] = useState(1); // battery bars lit: starts low, fills as you tap
  const lastTapRef = useRef(0);
  const shown = useCountTo(count);

  
  useEffect(() => {
    let cancelled = false;

    fetch(FUEL_API, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Counter request failed');
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        const total = Number(data.count);
        if (Number.isFinite(total)) setCount((current) => Math.max(current ?? 0, total));
        else setUnavailable(true);
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);


  useEffect(() => {
    if (!charging) return undefined;
    const timeout = window.setTimeout(() => setCharging(false), 1100);
    return () => window.clearTimeout(timeout);
  }, [charging]);


  useEffect(() => {
    if (!failed) return undefined;
    const timeout = window.setTimeout(() => setFailed(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [failed]);

  async function handleTap() {
    setCharging(true); 

    
    const now = Date.now();
    if (now - lastTapRef.current < 500) return;
    lastTapRef.current = now;

    setFailed(false);
    setSaving((n) => n + 1);

    try {
      const response = await fetch(FUEL_API, { method: 'POST' });
      const data = await response.json().catch(() => null);
      const total = Number(data?.count);

      
      if (Number.isFinite(total)) setCount((current) => Math.max(current ?? 0, total));

      
      const saved = response.ok && Number.isFinite(total);
      if (!saved && response.status !== 429) throw new Error('Tap was not saved');
      if (saved) setLevel((current) => Math.min(BATTERY_BARS, current + 1));
    } catch {
      setFailed(true);
    } finally {
      setSaving((n) => n - 1);
    }
  }

  const label = count === null ? (unavailable ? '—' : '···') : shown.toLocaleString();
  const status = failed ? 'Could not save your tap. Try again.' : '';

  return (
    <div
      className={`build-widget ${charging ? 'charging' : ''} ${saving > 0 ? 'is-saving' : ''} ${failed ? 'is-error' : ''}`}
    >
      <button
        className="build-button"
        onClick={handleTap}
        aria-label={`${count === null ? '' : `${label} `}Fuel the Build · Tap to recharge`}
      >
        <span className="fuel-row" aria-hidden="true">
          <span className="battery">
            <span className="battery-body">
              {Array.from({ length: BATTERY_BARS }, (_, index) => (
                <i
                  key={index}
                  className={`battery-bar ${index < level ? 'on' : ''}`}
                  style={{ '--i': index }}
                />
              ))}
            </span>
            <span className="battery-nub" />
          </span>
          <span className="fuel-count">
            <span className="fuel-num" key={count}>{label}</span>
          </span>
        </span>
        <span className="fuel-caption" aria-hidden="true">Fuel the Build · Tap to recharge</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">{status}</span>
    </div>
  );
}


// Case study panel. It uses the browser's built-in <dialog>, which already
// handles Escape, keeps keyboard focus inside, and returns focus to the button
// that opened it.
function CaseStudy({ open, onClose, rows }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();

    // Stop the page behind the panel from scrolling while it is open
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const [mainShot, ...otherShots] = BYTEBOND.shots;

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={(event) => {
        // A click on the dark area outside the panel closes it
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="case-sheet">
        <div className="case-bar">
          <span className="case-bar-label">Case study</span>
          <button type="button" className="case-close" onClick={onClose}>
            Close <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="case-head">
          <p className="project-meta">
            <span>{BYTEBOND.category}</span>
            <span>Live on Vercel</span>
          </p>
          <h2 id="case-title">{BYTEBOND.name}</h2>
          <p className="case-lede">{BYTEBOND.summary}</p>
          <div className="case-head-links">
            {BYTEBOND.demo && (
              <a className="btn-solid" href={BYTEBOND.demo} target="_blank" rel="noreferrer">
                Live demo <Icon name="external" size={14} />
              </a>
            )}
            {BYTEBOND.repo && (
              <a className="text-link" href={BYTEBOND.repo} target="_blank" rel="noreferrer">
                GitHub repository <Icon name="github" size={14} />
              </a>
            )}
          </div>
        </div>

        <figure className="shot shot-main">
          <img src={mainShot.src} width={mainShot.width} height={mainShot.height} alt={mainShot.alt} decoding="async" />
          <figcaption>{mainShot.caption}</figcaption>
        </figure>

        <dl className="case-rows">
          {rows.map(([label, kind, value]) => (
            <CaseRow key={label} label={label} kind={kind} value={value} />
          ))}
        </dl>

        <div className="shot-grid">
          {otherShots.map((shot) => (
            <figure className="shot" key={shot.src}>
              <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" decoding="async" />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </dialog>
  );
}

export default function App() {
  const lightRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'light';
    } catch {
      return 'light';
    }
  });

  const [playerOpen, setPlayerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copyState, setCopyState] = useState('idle');
  const [caseOpen, setCaseOpen] = useState(false);

  // Theme
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Storage may be blocked; the theme still works for this visit.
    }
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.7] },
    );

    NAV.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Contact is shorter than the screen, so it can never reach the observer's
    // "active" zone. At the very bottom of the page we mark it active by hand,
    // and when the visitor scrolls back up we work out the active section again.
    const pickActive = () => {
      const line = window.innerHeight * 0.35;
      let current = NAV[0][0];
      NAV.forEach(([id]) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      });
      return current;
    };

    let wasAtBottom = false;
    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActiveSection('contact');
      else if (wasAtBottom) setActiveSection(pickActive());
      wasAtBottom = atBottom;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const light = lightRef.current;
    if (!light || !window.matchMedia('(pointer: fine)').matches) return undefined;

    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        light.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        light.style.opacity = '1';
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  function switchTheme(event) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const rect = event.currentTarget.getBoundingClientRect();
    const root = document.documentElement;

    root.style.setProperty('--theme-x', `${rect.left + rect.width / 2}px`);
    root.style.setProperty('--theme-y', `${rect.top + rect.height / 2}px`);

    const apply = () => {
      root.dataset.theme = nextTheme;
      setTheme(nextTheme);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduce && typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => flushSync(apply));
    } else {
      apply();
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    window.setTimeout(() => setCopyState('idle'), 2200);
  }

  const caseRows = [
    ['Overview', 'text', BYTEBOND.summary],
    ['Purpose and goal', 'text', BYTEBOND.why],
    ['My role', 'text', BYTEBOND.role],
    ['What I did', 'list', BYTEBOND.contributions],
    ['Built with', 'tags', BYTEBOND.stack],
    ['Technical decisions', 'list', BYTEBOND.decisions],
    ['A challenge', 'text', BYTEBOND.challenge],
    ['Where it stands', 'text', BYTEBOND.status],
  ].filter(([, kind, value]) => (kind === 'text' ? Boolean(value) : value.length > 0));

  const copyLabel =
    copyState === 'copied' ? 'Address copied' : copyState === 'failed' ? 'Copy failed' : 'Copy address';

  return (
    <div className={`portfolio-app ${playerOpen ? 'player-open' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="cursor-light" ref={lightRef} aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-mark">EP</span>
          <span className="brand-name">Earl Panuncial</span>
          <span className="sr-only">, back to top</span>
        </a>

        <div className="header-right">
          <nav className="header-nav" aria-label="Main navigation">
            <a className={activeSection === 'home' ? 'active' : ''} href="#home" aria-current={activeSection === 'home' ? 'true' : undefined}>Home</a>
            <a className={activeSection === 'work' ? 'active' : ''} href="#work" aria-current={activeSection === 'work' ? 'true' : undefined}>Work</a>
            <a className={activeSection === 'about' ? 'active' : ''} href="#about" aria-current={activeSection === 'about' ? 'true' : undefined}>About</a>
            <a className={activeSection === 'skills' ? 'active' : ''} href="#skills" aria-current={activeSection === 'skills' ? 'true' : undefined}>Skills</a>
            <a className={activeSection === 'contact' ? 'active' : ''} href="#contact" aria-current={activeSection === 'contact' ? 'true' : undefined}>Contact</a>
          </nav>

          <button
            className="theme-toggle"
            onClick={switchTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>

      <nav className="side-index" aria-label="Section index">
        {NAV.map(([id, label], index) => (
          <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} aria-label={label} aria-current={activeSection === id ? 'true' : undefined}>
            <em data-no={String(index + 1).padStart(2, '0')}>{label}</em>
            <span />
          </a>
        ))}
      </nav>

      <main id="main" tabIndex={-1}>
        {/* ---------------- INTRO ---------------- */}
        <section id="home" className="hero">
          <svg className="hero-curves" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M-50 640 C 250 520, 520 760, 820 560 S 1150 320, 1280 400" />
            <path d="M-50 700 C 280 590, 540 820, 850 620 S 1160 400, 1280 470" />
            <circle cx="1010" cy="250" r="260" />
            <circle cx="1010" cy="250" r="340" />
          </svg>

          <div className="hero-copy">
            <p className="eyebrow">
              <span className="live-dot" /> BSIT student <span>·</span> Personal IT portfolio
            </p>

            <h1>
              <span className="h1-small">Hi, I’m</span>
              <span>Earl</span>
              <span>Panuncial.</span>
            </h1>

            <p className="hero-lead">I build websites, and I care how they feel to use.</p>

            <p className="hero-support">
              I’m a second-year BSIT student working with HTML, CSS, JavaScript, Python and React.
            </p>
            <p className="hero-detail">
              I pay attention to first impressions, error states, and the small details that make a page easier to use.
            </p>

            <div className="hero-actions">
              <a className="btn-solid" href="#work">See my work <Icon name="arrow" size={15} /></a>
              <a className="text-link" href="#contact">Get in touch <Icon name="arrow" size={14} /></a>
            </div>

            <p className="hero-looking">
              <span>Currently</span> BS Information Technology, second year
            </p>
          </div>

          <Portrait />
        </section>

        {/* ---------------- WORK ---------------- */}
        <section id="work" className="section">
          <SectionHeading index="01" eyebrow="Selected work">
            Selected <em>work</em>
          </SectionHeading>

          <ul className="project-grid">
            <li className="project-card" data-reveal>
              <button
                type="button"
                className="project-thumb"
                onClick={() => setCaseOpen(true)}
                aria-label={`Open the ${BYTEBOND.name} case study`}
              >
                <img
                  src={BYTEBOND.shots[0].src}
                  width={BYTEBOND.shots[0].width}
                  height={BYTEBOND.shots[0].height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>

              <div className="project-body">
                <p className="project-meta">
                  <span>01</span>
                  <span>{BYTEBOND.category}</span>
                  <span>Live</span>
                </p>
                <h3>{BYTEBOND.name}</h3>
                <p className="project-text">{BYTEBOND.summary}</p>
                <div className="tag-list">
                  {BYTEBOND.stack.map((item) => <span className="tag" key={item}>{item}</span>)}
                </div>
                <div className="project-actions">
                  <button type="button" className="btn-solid" onClick={() => setCaseOpen(true)}>
                    Read case study <Icon name="arrow" size={15} />
                  </button>
                  <a className="text-link" href={BYTEBOND.demo} target="_blank" rel="noreferrer">
                    Live demo <Icon name="external" size={13} />
                  </a>
                </div>
              </div>
            </li>
          </ul>

          <CaseStudy open={caseOpen} onClose={() => setCaseOpen(false)} rows={caseRows} />

          <p className="section-note">Personal, school and experimental projects will be added here as I build them.</p>
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <section id="about" className="section">
          <SectionHeading index="02" eyebrow="About">
            About <em>me</em>
          </SectionHeading>

          <div className="about-layout">
            <div className="about-copy" data-reveal>
              <p className="about-lead">
                I’m a second-year BSIT student who likes building websites and paying attention to how they feel to use.
              </p>
              <p>
                I’m interested in computers, programming, web design and technology in general. I write HTML, CSS, JavaScript, Python and Java, and I build interfaces with React and Tailwind CSS. I like to make something, look at it critically, and improve it over a few tries.
              </p>
              <p>
                I care about reducing friction for the person using a website. A lot of that happens in the first few seconds: can someone tell where they are, what they can do, and what to click next? I also look at the details that are easy to skip, like what a page does when something fails, or whether a button tells you anything when you press it.
              </p>
              <p>
                There’s a creative side to what I do as well. I use AutoCAD for 2D and 3D work, Canva for design and CapCut for video editing.
              </p>
              <p>
                This site is a fair example of how I work: the theme switch, the music player and the battery in the corner are all written without a UI library.
              </p>
            </div>

            <dl className="about-facts" data-reveal>
              <div><dt>Studying</dt><dd>BS Information Technology, second year</dd></div>
              <div><dt>Interested in</dt><dd>Computers, programming, web design and technology</dd></div>
              <div><dt>Pays attention to</dt><dd>First impressions, error states, and how interactions feel</dd></div>
            </dl>
          </div>
        </section>

        {/* ---------------- SKILLS ---------------- */}
        <section id="skills" className="section">
          <SectionHeading index="03" eyebrow="Skills">
            What I <em>know</em>
          </SectionHeading>

          <ul className="skill-groups" data-reveal>
            {SKILL_GROUPS.map((group) => (
              <li className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="skill-grid">
                  {group.items.map((item) => (
                    <li className="skill-item" key={item.name}>
                      <SkillLogo file={item.file} hasDarkVariant={item.dark} />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------- ACHIEVEMENTS ---------------- */}
        <section id="achievements" className="section">
          <SectionHeading index="04" eyebrow="Achievements and certificates">
            Achievements
          </SectionHeading>

          <ol className="timeline" data-reveal>
            <li>
              <span className="timeline-when">Now</span>
              <div>
                <h3>BS Information Technology</h3>
                <p>Second year. Coursework, plus projects in web development, programming and design tools.</p>
              </div>
            </li>
            {ACHIEVEMENTS.map((item) => (
              <li key={item.title}>
                <span className="timeline-when">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.issuer}</p>
                  {item.link && (
                    <a className="text-link" href={item.link} target="_blank" rel="noreferrer">
                      View <Icon name="external" size={13} />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {ACHIEVEMENTS.length === 0 && (
            <p className="section-note">No certificates or achievements to list yet. They’ll be added here when I have real ones to show.</p>
          )}
        </section>

        {/* ---------------- INTERESTS ---------------- */}
        <section id="interests" className="section">
          <SectionHeading index="05" eyebrow="Interests">
            Things I’m <em>into</em>
          </SectionHeading>

          <ol className="interest-list" data-reveal>
            {INTERESTS.map((item, index) => (
              <li key={item}>
                <span className="interest-no">{String(index + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- RÉSUMÉ ---------------- */}
        <section id="resume" className="section resume">
          <div className="resume-row" data-reveal>
            <div>
              <div className="section-meta"><span>06</span><span>Résumé</span></div>
              <h2>Résumé</h2>
            </div>
            <div className="resume-side">
              {RESUME_URL ? (
                <>
                  <p>A one-page summary of what’s on this site.</p>
                  <a className="btn-solid" href={RESUME_URL} download>
                    Download PDF <Icon name="download" size={15} />
                  </a>
                </>
              ) : (
                <p>A one-page summary of this site will be available here as a PDF once it’s ready.</p>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="contact">
          <div className="contact-inner" data-reveal>
            <div className="section-meta"><span>07</span><span>Contact</span></div>
            <h2>
              Write to <em>me.</em>
            </h2>
            <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p>
              If you’d like to talk about something I’ve built, or just say hi, email is the fastest way to reach me.
            </p>
            <div className="contact-actions">
              <a className="btn-inverse" href={`mailto:${EMAIL}`}>
                Send an email <Icon name="mail" size={15} />
              </a>
              <button className="btn-ghost" onClick={copyEmail} aria-live="polite">
                {copyLabel} <Icon name={copyState === 'copied' ? 'check' : 'mail'} size={15} />
              </button>
              <a className="btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
                GitHub <Icon name="external" size={14} />
              </a>
              <a className="btn-ghost" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram profile, erl_kk (opens in a new tab)">
                Instagram <Icon name="instagram" size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Earl Panuncial</span>
        <div className="footer-right">
          <a href="#home">Back to top ↑</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub <Icon name="external" size={11} /></a>
        </div>
      </footer>

      {/* Music capsule (bottom left) */}
      <aside className="music-slot" aria-label="Music">
        <MusicPlayer
          open={playerOpen}
          onToggle={() => setPlayerOpen((open) => !open)}
          onClose={() => setPlayerOpen(false)}
        />
      </aside>

      {/* Fuel the Build battery (bottom right), kept separate from the music player */}
      <FuelTheBuild />
    </div>
  );
}