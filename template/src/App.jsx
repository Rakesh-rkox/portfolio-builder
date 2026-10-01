import { useEffect, useRef, useState } from "react";
import ParticleField from "./components/ParticleField.jsx";
import { useScrollVar, useRevealOnScroll, useTypewriter } from "./hooks.js";
import { profile, nav, projects, aboutCards, skills, contact } from "./content.js";

const GithubIcon = () => (
  <svg className="bubble-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.200-1.200 3.200-1.200.6 1.600.2 2.800.1 3.100.7.8 1.200 1.800 1.200 3.100 0 4.400-2.700 5.400-5.300 5.700.4.4.8 1.100.8 2.200v3.200c0 .4.2.7.8.6A11.500 11.500 0 0 0 23.500 12 11.500 11.500 0 0 0 12 .5z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg className="bubble-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.600h.05c.53-1 1.830-2.050 3.770-2.050 4.030 0 4.780 2.650 4.780 6.100V21h-4v-4.900c0-1.170-.02-2.670-1.630-2.670-1.630 0-1.880 1.270-1.880 2.590V21h-4z" />
  </svg>
);

function Bubble({ href, label, kind, children }) {
  if (!href) return null;
  return (
    <a className={`bubble bubble--${kind}`} href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <span className="bubble-glare" />
      <span className="bubble-wave" />
      {children}
    </a>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__pill">
        <a className="navbar__logo" href="#top" aria-label="Home">{profile.name.charAt(0)}.</a>
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
    </header>
  );
}

function Hero() {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useScrollVar(wrapRef);
  const { typed, done } = useTypewriter(profile.typedIntro);

  const onMove = (e) => {
    setTilt({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
  };

  return (
    <div className="hero-pin-wrapper" ref={wrapRef} onMouseMove={onMove}>
      <section className="hero" id="top">
        <div className="hero__stage" style={{ "--tx": tilt.x, "--ty": tilt.y }}>
          <img className="hero__img" src={profile.portrait} alt="" />
        </div>

        <div className="hero__socials">
          <Bubble href={profile.github} label="GitHub" kind="github"><GithubIcon /></Bubble>
          <Bubble href={profile.linkedin} label="LinkedIn" kind="linkedin"><LinkedinIcon /></Bubble>
        </div>

        <div className="hero__content">
          <p className="hero__hi">Hi, I’m</p>
          <h1 className="hero__name">{profile.firstName}</h1>
          <p className="hero__role">{profile.role}</p>
          <p className="hero__desc">
            <span className="hero__desc-measure">{profile.typedIntro}</span>
            <span className="hero__desc-typed">
              {typed}<span className={`hero__desc-caret ${done ? "is-done" : ""}`} />
            </span>
          </p>
          {profile.previousPortfolio.href && (
            <a className="hero__prev-link" href={profile.previousPortfolio.href} target="_blank" rel="noreferrer">
              {profile.previousPortfolio.label} ↗
            </a>
          )}
        </div>

        <a className="hero__scroll-cue" href="#work"><span>Scroll to explore</span><span>↓</span></a>
      </section>
    </div>
  );
}

function Work() {
  return (
    <section className="section work" id="work">
      <ParticleField />
      <div className="container">
        <h2 className="section__title" data-reveal>Selected Work</h2>
        <div className="work__grid">
          {projects.map((p, i) => (
            <article className="poster" key={p.title} data-reveal style={{ "--i": i }}>
              <div className="poster__media" style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}>
                {!p.image && <span className="poster__num">{String(i + 1).padStart(2, "0")}</span>}
              </div>
              <div className="poster__body">
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer">View project ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const secRef = useRef(null);
  const trackRef = useRef(null);

  // Section height = horizontal travel + one viewport; vertical scroll drives translateX.
  useEffect(() => {
    const sec = secRef.current, track = trackRef.current;
    let raf = 0, travel = 0;
    const measure = () => {
      travel = Math.max(0, track.scrollWidth - window.innerWidth);
      sec.style.height = `${travel + window.innerHeight}px`;
      update();
    };
    const update = () => {
      raf = 0;
      const top = -sec.getBoundingClientRect().top;
      const p = travel ? Math.min(1, Math.max(0, top / travel)) : 0;
      track.style.transform = `translate3d(${-p * travel}px,0,0)`;
      sec.style.setProperty("--ap", p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="horizontal-about" id="about" ref={secRef}>
      <div className="horizontal-about__bg-clip"><div className="horizontal-about__grid" /></div>
      <div className="horizontal-about__viewport">
        <span className="horizontal-about__kicker">● About</span>
        <div className="horizontal-about__track" ref={trackRef}>
          {aboutCards.map((c) => (
            <article className="hcard" key={c.kicker}>
              <header className="hcard__top"><span>{c.kicker}</span><span className="hcard__badge">{c.badge}</span></header>
              <h3 className="hcard__title">{c.title}</h3>
              {c.subtitle && <p className="hcard__sub">{c.subtitle}</p>}
              {c.body && <p className="hcard__body">{c.body}</p>}
              {c.chips && <div className="tags">{c.chips.map((t) => <span key={t}>{t}</span>)}</div>}
              {c.footer && <footer className="hcard__foot">{c.footer.map((f) => <span key={f}>{f}</span>)}</footer>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills" id="skills">
      <ParticleField density={0.00003} />
      <div className="container">
        <h2 className="section__title" data-reveal>{skills.heading}</h2>
        <div className="skills__head" data-reveal>
          <div><strong>{skills.groupLabel}</strong><br /><small>{skills.groupSub}</small></div>
        </div>
        <div className="skills__grid">
          {skills.items.map((s, i) => (
            <article className="skill" key={s.name} data-reveal style={{ "--i": i }}>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <footer><span>{s.meta}</span><span className="skill__level">{s.level}</span></footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <ParticleField density={0.00004} />
      <div className="container contact__inner" data-reveal>
        <h2 className="section__title">{contact.heading}</h2>
        <a className="btn" href={`mailto:${profile.email}`}>{contact.button}</a>
      </div>
    </section>
  );
}

export default function App() {
  useRevealOnScroll();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
