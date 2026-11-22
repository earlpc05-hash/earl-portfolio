import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const EMAIL = 'earlpersonal16@gmail.com';
const GITHUB = 'https://github.com/earlpc05-hash';


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

  challenge: 'This was our first web development project as a group. We had to learn how to collaborate effectively, divide responsibilities, and use GitHub for version control.',

  status: 'Live on Vercel. This was my first major collaborative web development project, created during my second year as a BSIT student.',

  demo: 'https://bytebond.vercel.app/',
  repo: 'https://github.com/earlpc05-hash/Bytebond',
};

const SKILLS = [
  { name: 'HTML', detail: 'Page structure and semantic markup.', level: 'Used in projects', logo: 'html' },
  { name: 'CSS', detail: 'Layouts, styling, and responsive design.', level: 'Used in projects', logo: 'css' },
  { name: 'JavaScript', detail: 'Interaction and programming fundamentals.', level: 'Used in projects', logo: 'js' },
  { name: 'Python', detail: 'Programming fundamentals and problem solving.', level: 'Used in projects', logo: 'python' },
  { name: 'React', detail: 'Components, props, and state. This site is built with it.', level: 'Learning the fundamentals', logo: 'react' },
];

const ACHIEVEMENTS = [];

const NAV = [
  ['home', 'Intro'],
  ['work', 'Work'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['achievements', 'Achievements'],
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
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    volume: <><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13" /></>,
    volumeOff: <><path d="M11 5 6 9H3v6h3l5 4z" /><path d="m16 9 5 6m0-6-5 6" /></>,
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}

function TechLogo({ name }) {
  const props = { width: 34, height: 34, viewBox: '0 0 32 32', 'aria-hidden': true };

  if (name === 'html') {
    return (
      <svg {...props}>
        <path d="M5 3h22l-2 22.5L16 29l-9-3.5z" fill="#e44d26" />
        <path d="M16 5.5v21.7l7.3-2.4L25 5.5z" fill="#f16529" />
        <path d="M10 10h12l-.3 3.2H13.4l.2 3h7.8l-.6 6.4-4.8 1.4-4.8-1.4-.3-3.6h3.1l.2 1.8 1.8.5 1.8-.5.2-2.4h-7.4z" fill="#fff" />
      </svg>
    );
  }
  if (name === 'css') {
    return (
      <svg {...props}>
        <path d="M5 3h22l-2 22.5L16 29l-9-3.5z" fill="#1572b6" />
        <path d="M16 5.5v21.7l7.3-2.4L25 5.5z" fill="#33a9dc" />
        <path d="M22 10H10l.3 3.2h8.3l-.2 2.6H10.6l.3 3.2h7.2l-.2 2.4-2 .6-2-.6-.1-1.6H9.7l.3 3.7 6 1.7 5.8-1.7.8-9z" fill="#fff" />
      </svg>
    );
  }
  if (name === 'js') {
    return (
      <svg {...props}>
        <rect x="3" y="3" width="26" height="26" rx="2" fill="#f7df1e" />
        <text x="16" y="25" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#111">JS</text>
      </svg>
    );
  }
  if (name === 'python') {
    return (
      <svg {...props}>
        <rect x="4" y="3" width="15" height="15" rx="6" fill="#3776ab" />
        <rect x="13" y="14" width="15" height="15" rx="6" fill="#ffd43b" />
        <circle cx="10" cy="8" r="1.4" fill="#fff" />
        <circle cx="22" cy="24" r="1.4" fill="#3776ab" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <g fill="none" stroke="#61dafb" strokeWidth="1.6">
        <ellipse cx="16" cy="16" rx="12.5" ry="4.8" />
        <ellipse cx="16" cy="16" rx="12.5" ry="4.8" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12.5" ry="4.8" transform="rotate(120 16 16)" />
      </g>
      <circle cx="16" cy="16" r="2.3" fill="#61dafb" />
    </svg>
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

function FuelTheBuild() {
  const [count, setCount] = useState(null); // total confirmed by the server
  const [unavailable, setUnavailable] = useState(false); // the first load failed
  const [charging, setCharging] = useState(false); // battery animation
  const [saving, setSaving] = useState(0); // taps still waiting for the server
  const [failed, setFailed] = useState(false); // the last tap was not saved
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
        aria-label={
          count === null
            ? 'Fuel the Build. Tap the battery to add one.'
            : `Fuel the Build. ${count.toLocaleString()} taps so far. Tap the battery to add one.`
        }
      >
        <span className="battery-shell" aria-hidden="true">
          <i className="battery-cell" />
          <i className="battery-cell" />
          <i className="battery-cell" />
          <span className="fuel-bolt">⚡</span>
        </span>
        <span className="fuel-count" aria-hidden="true">
          <span className="fuel-num" key={count}>{label}</span>
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">{status}</span>
    </div>
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

    return () => observer.disconnect();
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
    ['What it is', 'text', BYTEBOND.summary],
    ['Why I made it', 'text', BYTEBOND.why],
    ['My role', 'text', BYTEBOND.role],
    ['What I did', 'list', BYTEBOND.contributions],
    ['Built with', 'tags', BYTEBOND.stack],
    ['Technical decisions', 'list', BYTEBOND.decisions],
    ['A problem I hit', 'text', BYTEBOND.challenge],
    ['Where it stands', 'text', BYTEBOND.status],
  ].filter(([, kind, value]) => (kind === 'text' ? Boolean(value) : value.length > 0));

  const copyLabel =
    copyState === 'copied' ? 'Address copied' : copyState === 'failed' ? 'Copy failed' : 'Copy address';

  return (
    <div className={`portfolio-app ${playerOpen ? 'player-open' : ''}`}>
      <div className="cursor-light" ref={lightRef} aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Earl Panuncial, back to top">
          <span className="brand-mark">EP</span>
          <span className="brand-name">Earl Panuncial</span>
        </a>

        <div className="header-right">
          <nav className="header-nav" aria-label="Main navigation">
            <a className={activeSection === 'work' ? 'active' : ''} href="#work">Work</a>
            <a className={activeSection === 'about' ? 'active' : ''} href="#about">About</a>
            <a className={activeSection === 'skills' ? 'active' : ''} href="#skills">Skills</a>
            <a className={activeSection === 'contact' ? 'active' : ''} href="#contact">Contact</a>
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
          <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} aria-label={label}>
            <em>{String(index + 1).padStart(2, '0')} / {label}</em>
            <span />
          </a>
        ))}
      </nav>

      <main>
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
              <span className="live-dot" /> Aspiring web developer <span>·</span> BSIT student
            </p>

            <h1>
              <span className="h1-small">Hi, I’m</span>
              <span>Earl</span>
              <span>Panuncial.</span>
            </h1>

            <p className="hero-lead">An aspiring web developer and BSIT student.</p>

            <p className="hero-support">
              Exploring web development through code, creativity, and continuous learning.
            </p>
            <p className="hero-detail">
              I’m developing my programming and web development skills, with an interest in creative problem-solving and thoughtful design.
            </p>

            <div className="hero-actions">
              <a className="btn-solid" href="#work">See my work <Icon name="arrow" size={15} /></a>
              <a className="text-link" href="#contact">Get in touch <Icon name="arrow" size={14} /></a>
            </div>

            <p className="hero-looking">
              <span>Looking for</span> Web development internships
            </p>
          </div>

          <Portrait />
        </section>

        {/* ---------------- WORK ---------------- */}
        <section id="work" className="section">
          <SectionHeading index="01" eyebrow="Selected work">
            Selected <em>work</em>
          </SectionHeading>

          <article className="case" data-reveal>
            <aside className="case-side">
              <span className="case-no">01</span>
              <h3>{BYTEBOND.name}</h3>
              <p className="case-kind">Featured project</p>
              <div className="case-links">
                {BYTEBOND.demo && (
                  <a href={BYTEBOND.demo} target="_blank" rel="noreferrer">
                    Live demo <Icon name="external" size={13} />
                  </a>
                )}
                <a href={BYTEBOND.repo || GITHUB} target="_blank" rel="noreferrer">
                  {BYTEBOND.repo ? 'Repository' : 'GitHub profile'} <Icon name="github" size={13} />
                </a>
              </div>
            </aside>

            <div className="case-main">
              {caseRows.length > 0 ? (
                <dl>
                  {caseRows.map(([label, kind, value]) => (
                    <CaseRow key={label} label={label} kind={kind} value={value} />
                  ))}
                </dl>
              ) : (
                <p className="case-empty">
                  I’m still writing up this case study. It will cover what ByteBond is, what I built, and what went wrong along the way.
                </p>
              )}
            </div>
          </article>

          <p className="section-note">More projects will be added here once they’re finished and I can explain them properly.</p>
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <section id="about" className="section">
          <SectionHeading index="02" eyebrow="About">
            About <em>me</em>
          </SectionHeading>

          <div className="about-layout">
            <div className="about-copy" data-reveal>
              <p className="about-lead">
                I’m a second-year BSIT student, and I’m looking for a web development internship.
              </p>
              <p>
                A lot of what I care about in a website happens in the first few seconds: does someone understand where they are, what they can do, and what to click next? I try to build with that person in mind, not just the screen in front of me.
              </p>
              <p>
                I also pay attention to the parts that are easy to skip. What the page does when something fails. Whether a button tells you anything when you press it. Whether a task takes more effort than it should.
              </p>
              <p>
                I’m still learning, and I’d rather show you what I can do today than pretend to be further along. This site is one example: the theme switch, the music player, and the battery in the corner are all written without a UI library.
              </p>
            </div>

            <dl className="about-facts" data-reveal>
              <div><dt>Studying</dt><dd>BS Information Technology, second year</dd></div>
              <div><dt>Looking for</dt><dd>Web development internships, then junior web developer roles</dd></div>
              <div><dt>Learning now</dt><dd>React fundamentals</dd></div>
              <div><dt>Pays attention to</dt><dd>First impressions, error states, and how interactions feel</dd></div>
            </dl>
          </div>
        </section>

        {/* ---------------- SKILLS ---------------- */}
        <section id="skills" className="section">
          <SectionHeading index="03" eyebrow="Skills">
            What I <em>use</em>
          </SectionHeading>

          <ul className="ledger" data-reveal>
            {SKILLS.map((skill) => (
              <li className="ledger-row" key={skill.name}>
                <span className="ledger-logo"><TechLogo name={skill.logo} /></span>
                <h3>{skill.name}</h3>
                <p>{skill.detail}</p>
                <span className="ledger-level">{skill.level}</span>
              </li>
            ))}
          </ul>

          <p className="section-note">No percentage bars. These labels say how I actually use each one right now.</p>
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
                <p>Second year. Coursework plus practice in web development and programming.</p>
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
            <p className="section-note">No certificates yet. I’ll add them here when I have real ones to show.</p>
          )}
        </section>

        {/* ---------------- RÉSUMÉ ---------------- */}
        <section id="resume" className="section resume">
          <div className="resume-row" data-reveal>
            <div>
              <div className="section-meta"><span>05</span><span>Résumé</span></div>
              <h2>Résumé</h2>
            </div>
            <div className="resume-side">
              {RESUME_URL ? (
                <>
                  <p>The same information as this page, on one sheet.</p>
                  <a className="btn-solid" href={RESUME_URL} download>
                    Download PDF <Icon name="download" size={15} />
                  </a>
                </>
              ) : (
                <>
                  <p>I’m still finalizing my résumé, so there’s nothing to download yet. It will appear here as a PDF.</p>
                  <a className="text-link" href={`mailto:${EMAIL}`}>
                    Email me in the meantime <Icon name="arrow" size={14} />
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="contact">
          <div className="contact-inner" data-reveal>
            <div className="section-meta"><span>06</span><span>Contact</span></div>
            <h2>
              Write to <em>me.</em>
            </h2>
            <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p>
              If you’re hiring interns, or want to talk about something I’ve built, email is the fastest way to reach me.
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
      <div className="music-slot">
        <MusicPlayer
          open={playerOpen}
          onToggle={() => setPlayerOpen((open) => !open)}
          onClose={() => setPlayerOpen(false)}
        />
      </div>

      {/* Fuel the Build battery (bottom right), kept separate from the music player */}
      <FuelTheBuild />
    </div>
  );
}