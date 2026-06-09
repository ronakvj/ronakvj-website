import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  Compass,
  ExternalLink,
  GraduationCap,
  Hammer,
  Landmark,
  Lightbulb,
  Mail,
  Menu,
  Network,
  Orbit,
  PenTool,
  Play,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { defaultRoleContent, roleData, stages } from "./data/careerTree.js";
import { roleEnrichment } from "./data/excelEnrichment.js";
import aboutStageBackground from "./assets/media/about/ronak-stage-background.jpg";
import rjLogo from "./assets/media/brand/rj-logo.png";

function RootsIcon({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v7" />
      <path d="M12 10c-3 1-5 3-7 6" />
      <path d="M12 10c3 1 5 3 7 6" />
      <path d="M9 13c-2 1-3.5 2.5-5 5" />
      <path d="M15 13c2 1 3.5 2.5 5 5" />
      <path d="M12 10v10" />
      <path d="M12 16c-1.8.8-3.2 2-4.5 4" />
      <path d="M12 16c1.8.8 3.2 2 4.5 4" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 9v12" />
      <path d="M5 5.2v.1" />
      <path d="M10 21V9" />
      <path d="M10 14c0-2.8 1.8-5 4.5-5 2.6 0 4.5 1.8 4.5 5v7" />
    </svg>
  );
}

function XSocialIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
    </svg>
  );
}

function SubstackIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 5h14" />
      <path d="M5 9h14" />
      <path d="M5 13h14v7l-7-4-7 4z" />
    </svg>
  );
}

const stageIconMap = {
  roots: RootsIcon,
  graduation: GraduationCap,
  wrench: Wrench,
  network: Network,
  brain: BrainCircuit,
  orbit: Orbit,
  sparkles: Sparkles,
};

const roleIconMap = {
  origins: RootsIcon,
  identity: Compass,
  agency: Lightbulb,
  education: GraduationCap,
  "innovation-coach": Lightbulb,
  "makerspace-builder": Wrench,
  "stem-educator": GraduationCap,
  "project-manager": Network,
  "federal-grant-operations": Landmark,
  "program-management": Network,
  "stakeholder-orchestration": Orbit,
  "learning-design": PenTool,
  "innovation-lead": Sparkles,
  "policy-design-advocacy": Landmark,
  "strategic-ideation": Lightbulb,
  "government-relations": Landmark,
  "expert-learner": BookOpen,
  "systems-thinker": BrainCircuit,
  "hackathon-hacker": Hammer,
  "ai-research-fellow": BrainCircuit,
  "bombay-boston-bike": Compass,
  "ecosystem-architect": Orbit,
  "strategic-advisor": Compass,
  "policy-entrepreneur": Landmark,
  "author-storyteller": PenTool,
  seeker: Sparkles,
};

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const smoothstep = (value) => value * value * (3 - 2 * value);

function useHeaderMorphProgress() {
  const [state, setState] = useState({
    progress: 0,
    viewportWidth: typeof window === "undefined" ? 1280 : window.innerWidth,
  });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const aboutCopy = document.querySelector("[data-about-copy]");
      const workSection = document.getElementById("work");
      const viewportHeight = window.innerHeight || 1;
      const viewportWidth = window.innerWidth || 1280;

      if (!aboutCopy || !workSection) {
        setState((current) => ({ ...current, viewportWidth }));
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const aboutCopyBottom = aboutCopy.getBoundingClientRect().bottom + scrollY;
      const workTop = workSection.getBoundingClientRect().top + scrollY;
      const start = aboutCopyBottom - viewportHeight * 0.5;
      const end = workTop - 120;
      const progress = clamp((scrollY - start) / Math.max(end - start, 1));

      setState((current) => {
        if (
          Math.abs(current.progress - progress) < 0.003 &&
          current.viewportWidth === viewportWidth
        ) {
          return current;
        }

        return { progress, viewportWidth };
      });
    };

    const scheduleMeasure = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  return state;
}

export default function RonakLinearWebsite() {
  const [introDone, setIntroDone] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeStage, setActiveStage] = useState(stages[0]);
  const [activeRole, setActiveRole] = useState(null);
  const [expandedStage, setExpandedStage] = useState(null);
  const [openRole, setOpenRole] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key !== "Escape") return;

      if (activeProject) {
        event.preventDefault();
        setActiveProject(null);
        return;
      }

      if (openRole) {
        event.preventDefault();
        setOpenRole(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeProject, openRole]);

  function selectStage(stage) {
    setActiveStage(stage);
    setActiveRole(null);
    setExpandedStage((current) => (current?.id === stage.id ? null : stage));
  }

  function selectRole(roleId) {
    const role = getRole(roleId);
    setActiveStage(getStageForRole(role));
    setActiveRole(role);
    setExpandedStage(getStageForRole(role));
    setOpenRole(role);
  }

  return (
    <div className="site-root min-h-screen bg-[#050505] text-white" data-theme={theme}>
      <AnimatePresence>{!introDone && <IntroGate theme={theme} onThemeChange={setTheme} onComplete={() => setIntroDone(true)} />}</AnimatePresence>

      {introDone && (
        <>
          <Header theme={theme} onThemeChange={setTheme} />
          <main>
            <About />
            <WhatIDo />
            <SevenElementLine
              activeStage={activeStage}
              expandedStage={expandedStage}
              onSelectStage={selectStage}
              onSelectRole={selectRole}
            />
            <Contact />
          </main>
        </>
      )}

      <AnimatePresence>
        {openRole && (
          <RolePopup
            key={`role-${openRole.id}`}
            role={openRole}
            onSelectProject={setActiveProject}
            onClose={() => setOpenRole(null)}
          />
        )}
        {activeProject && <ProjectDrawer key={`project-${activeProject.role.id}-${activeProject.title}`} item={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
    </div>
  );
}

function titleFromId(id) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getStageById(stageId) {
  return stages.find((stage) => stage.id === stageId) || stages[0];
}

function getStageForRole(role) {
  return getStageById(role.stage);
}

function enrichRole(role) {
  const enrichment = roleEnrichment[role.id];

  if (!enrichment) return role;

  return {
    ...role,
    ...enrichment,
    id: role.id,
    title: role.title,
    stage: role.stage,
    projectsTitle: role.projectsTitle,
    projects: role.projects,
    gallery: enrichment.gallery ?? role.gallery,
  };
}

function getRoleGallery(role) {
  if (Array.isArray(role.gallery) && role.gallery.length > 0) return role.gallery;

  return role.projects?.find((project) => Array.isArray(project.gallery) && project.gallery.length > 0)?.gallery || [];
}

function getRole(id) {
  if (roleData[id]) return enrichRole(roleData[id]);

  const stage = stages.find((item) => item.roles.includes(id)) || stages[0];
  const base = defaultRoleContent[id] || {};

  return enrichRole({
    id,
    title: base.title || titleFromId(id),
    stage: stage.id,
    opening: base.opening || "This role is ready for final book-backed projects, examples, and reflections.",
    details: base.details || [stage.title, "Projects", "Impact", "Reflection"],
    projectsTitle: base.projectsTitle || (stage.id === "roots" ? "Formative Scenes" : "Definitive Projects"),
    projects: base.projects || [
      { title: "Project or Scene 1", line: "Add a book-backed project, scene, or initiative here." },
      { title: "Project or Scene 2", line: "Add stakeholders, role, and scale here." },
      { title: "Project or Scene 3", line: "Add related chapter or story here." },
      { title: "Project or Scene 4", line: "Add impact and learning here." },
    ],
    method: base.method || ["Discover", "Design", "Build", "Scale", "Reflect"],
    reflection: base.reflection || "This section carries the distilled lesson from the role.",
  });
}

function getStageIcon(stage) {
  return stageIconMap[stage.icon] || Sparkles;
}

function getRoleIcon(role) {
  return roleIconMap[role.id] || getStageIcon(getStageForRole(role));
}

function ThemeToggle({ theme, onThemeChange }) {
  const options = [
    { id: "dark", label: "Dark mode" },
    { id: "light", label: "Light mode" },
  ];

  return (
    <div className="theme-toggle theme-yin-yang" aria-label="Theme options" role="group">
      {options.map((option) => {
        const active = theme === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onThemeChange(option.id)}
            className={`theme-yin-yang-option theme-yin-yang-${option.id}${active ? " is-active" : ""}`}
            aria-label={option.label}
            aria-pressed={active}
          >
            <span aria-hidden="true" className="theme-yin-yang-dot" />
          </button>
        );
      })}
    </div>
  );
}

function IntroTubesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let cursorApp = null;
    let cancelled = false;

    if (!canvas) return undefined;

    const resizeCanvas = () => {
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    async function loadCursor() {
      try {
        const module = await import(
          /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );
        const TubesCursor = module.default || module;

        if (cancelled) return;

        cursorApp = TubesCursor(canvas, {
          tubes: {
            colors: ["#0197F6", "#8EE968", "#F4DA2D", "#FE9920", "#A41034", "#7F00FF", "#551166"],
            lights: {
              intensity: 180,
              colors: ["#0197F6", "#8EE968", "#F4DA2D", "#FE9920", "#A41034", "#7F00FF", "#551166"],
            },
          },
        });
      } catch (error) {
        console.error("Intro tube cursor failed to load.", error);
      }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    loadCursor();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resizeCanvas);

      if (typeof cursorApp?.destroy === "function") {
        cursorApp.destroy();
      }

      if (typeof cursorApp?.dispose === "function") {
        cursorApp.dispose();
      }
    };
  }, []);

  return <canvas ref={canvasRef} id="introCanvas" className="intro-tubes-canvas" aria-hidden="true" />;
}

function IntroGate({ onComplete }) {
  const handleKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onComplete();
  };

  return (
    <motion.section
      className="intro-tubes-gate fixed inset-0 z-[100] flex items-end justify-center bg-[#050505] px-6 pb-12 md:pb-16"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      onClick={onComplete}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Click anywhere to enter the website"
      style={{ background: "#000000", isolation: "isolate" }}
    >
      <IntroTubesCanvas />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.72)_100%)]" />

      <div className="pointer-events-none relative z-[2] text-center">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.55 }}
          className="intro-enter-prompt rounded-full border border-white/25 bg-transparent px-7 py-3 text-sm uppercase text-white/85 shadow-[0_0_40px_rgba(255,255,255,0.14)] backdrop-blur-md"
        >
          Click anywhere to enter
        </motion.div>
      </div>
    </motion.section>
  );
}

function Header({ theme, onThemeChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const navItems = [
    ["About", "about"],
    ["What I Do", "work"],
    ["My Journey", "line"],
    ["Contact", "contact"],
  ];
  const goToSection = (id) => {
    go(id);
    setMobileMenuOpen(false);
  };
  const { progress, viewportWidth } = useHeaderMorphProgress();
  const easedProgress = smoothstep(progress);
  const pillWidth = viewportWidth >= 768 ? Math.min(760, viewportWidth - 40) : viewportWidth - 24;
  const width = viewportWidth + (pillWidth - viewportWidth) * easedProgress;
  const left = (viewportWidth - width) / 2;
  const logoHeight = (viewportWidth >= 768 ? 56 : 48) - (viewportWidth >= 768 ? 20 : 14) * easedProgress;
  const verticalPadding = 16 - 6 * easedProgress;
  const horizontalPadding = 24 - 8 * easedProgress;
  const backgroundOpacity = 0.005 + 0.035 * easedProgress;
  const borderOpacity = 0.22 + 0.16 * easedProgress;
  const navStyle = {
    "--header-glass-strength": easedProgress,
    top: `${16 * easedProgress}px`,
    left: `${left}px`,
    width: `${width}px`,
    transform: "translateX(0)",
    borderRadius: `${999 * easedProgress}px`,
    padding: `${verticalPadding}px ${horizontalPadding}px`,
    borderColor:
      theme === "light"
        ? `rgba(255, 255, 255, ${0.42 + 0.18 * easedProgress})`
        : `rgba(255, 255, 255, ${borderOpacity})`,
    backgroundColor:
      theme === "light"
        ? `rgba(255, 255, 255, ${0.02 + 0.05 * easedProgress})`
        : `rgba(5, 5, 5, ${backgroundOpacity})`,
    boxShadow:
      easedProgress > 0.02
        ? `0 ${10 + 14 * easedProgress}px ${24 + 26 * easedProgress}px rgba(0, 0, 0, ${0.1 + 0.08 * easedProgress}), inset 0 1px 0 rgba(255, 255, 255, ${0.22 + 0.16 * easedProgress}), inset 0 -1px 0 rgba(255, 255, 255, ${0.05 + 0.06 * easedProgress})`
        : "none",
  };

  return (
    <motion.nav
      className="header-liquid-glass fixed z-50 flex items-center justify-between border backdrop-blur-md"
      style={navStyle}
      data-header-progress={progress.toFixed(3)}
    >
      <button onClick={() => goToSection("about")} className="flex items-center" aria-label="Ronak VJ home">
        <img src={rjLogo} alt="Ronak VJ" className="brand-logo w-auto" style={{ height: `${logoHeight}px` }} />
      </button>
      <div className="flex items-center gap-4">
        <div
          className="hidden items-center text-xs uppercase tracking-[0.18em] text-white/55 md:flex"
          style={{ columnGap: `${32 - 12 * easedProgress}px` }}
        >
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => goToSection(id)} className="hover:text-white">
              {label}
            </button>
          ))}
        </div>
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/70 md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050505]/94 p-2 shadow-2xl backdrop-blur-md md:hidden"
            style={{
              backgroundColor:
                theme === "light" ? "rgba(247, 245, 239, 0.96)" : "rgba(5, 5, 5, 0.94)",
            }}
          >
            {navItems.map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => goToSection(id)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm text-white/72 hover:bg-white/5 hover:text-white"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function About() {
  return (
    <section id="about" className="relative min-h-[200vh] bg-[#050505]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          src={aboutStageBackground}
          alt="Ronak VJ on stage"
          className="absolute inset-0 h-full w-full object-cover object-[54%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/95" />
      </div>

      <div className="relative z-10 -mt-[100vh] px-6 pb-28 pt-32 md:px-12 lg:px-20">
        <div className="flex min-h-[180vh] items-start">
          <div className="w-full max-w-2xl lg:w-1/2" data-about-copy>
            <div className="space-y-6 text-lg leading-9 text-white/76">
              <p>I build systems that survive, thrive, scale, and matter.</p>
              <p>
                My work sits at the intersection of strategy, execution, and first-principles thinking, focused on solving complex problems across innovation, education, applied AI, future of work, and entrepreneurship.
              </p>
              <p>
                I thrive in high-ambiguity environments that demand critical thinking, adaptability, and cross-functional leadership. Over the past decade, I have built programs and ecosystems across government, startups, and global academic settings.
              </p>
              <p>
                I began by fostering innovative and entrepreneurial mindsets in young people, and later became the youngest member of the founding team of India's apex innovation mission at NITI Aayog, Government of India. In that role, I helped build three core pillars of innovation culture at scale: one of the world's largest school innovation ecosystems through 10,000 Atal Tinkering Labs, a nationwide movement of local champions through thousands of Mentors of Change, and a national push to make innovation and entrepreneurship accessible across India's 22 scheduled languages.
              </p>
              <p>
                The work taught me how to operate at scale, align stakeholders, make decisions with incomplete information, and turn bold ideas into institutional reality. My thinking is shaped by lived implementation experience and strengthened by Harvard and MIT, where I explored systems thinking, disruptive innovation, and economic transformation.
              </p>
              <p>
                Today, I advise and build across innovation strategy, ecosystem design, education, applied AI, workforce transformation, and entrepreneurship. I currently serve as the youngest Senior Fellow in the Viksit Bharat programme and am writing a major work on India's innovation ecosystem and the future of institution-building in emerging economies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatIDo() {
  const items = [
    {
      id: "ecosystem-design",
      title: "Innovation Ecosystem Design",
      text: "Designing the conditions, partnerships, rituals, and platforms that help people create at scale.",
      color: "#7F00FF",
      branches: ["Institutional strategy", "Partner networks", "Innovation labs", "Mentor and maker communities"],
      method: ["Map actors", "Find leverage", "Design incentives", "Build shared rhythm"],
      impact:
        "I shape ecosystems where schools, government, industry, mentors, and learners can move in one coordinated direction.",
    },
    {
      id: "program-architecture",
      title: "Program Architecture and Implementation",
      text: "Turning ambitious ideas into operating programs with clear journeys, roles, timelines, and outcomes.",
      color: "#0197F6",
      branches: ["Program blueprints", "Delivery systems", "Stakeholder operations", "Outcome and showcase design"],
      method: ["Clarify purpose", "Sequence experiences", "Align teams", "Deliver and adapt"],
      impact:
        "I translate strategy into programs that can actually run, scale, and produce visible evidence of learning or change.",
    },
    {
      id: "future-skills",
      title: "AI, Tinkering, and Future Skills Education",
      text: "Building hands-on learning pathways where learners use emerging technology with curiosity, agency, and responsibility.",
      color: "#8EE968",
      branches: ["AI literacy", "Tinkering pedagogy", "STEM learning journeys", "Portfolio-ready projects"],
      method: ["Make it tangible", "Prototype early", "Reflect publicly", "Connect to real problems"],
      impact:
        "I help learners move from exposure to capability by making future skills practical, creative, and visible.",
    },
    {
      id: "policy-storytelling",
      title: "Policy Storytelling and Impact Narratives",
      text: "Turning field experience, evidence, and public purpose into stories that leaders, institutions, and communities can use.",
      color: "#FE9920",
      branches: ["Policy narratives", "Impact documentation", "Book and essay frameworks", "Public communication"],
      method: ["Listen deeply", "Find the pattern", "Frame the stakes", "Make the story travel"],
      impact:
        "I create narratives that help complex work become understandable, credible, and useful for decision-making.",
    },
  ];
  const [activeItemId, setActiveItemId] = useState(null);
  const activeItem = items.find((item) => item.id === activeItemId) || null;

  return (
    <section id="work" className="border-t border-white/10 px-6 py-24 md:px-12 lg:px-20">
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">What I Do</p>
      <h2 className="mt-4 text-5xl leading-tight md:text-7xl">Design. Build. Scale. Tell.</h2>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const itemIsActive = activeItemId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveItemId((current) => (current === item.id ? null : item.id))}
              className={`group rounded-3xl border bg-white/[0.035] p-6 text-left transition hover:-translate-y-1 hover:bg-white/[0.06] ${
                itemIsActive ? "border-white/30" : "border-white/10"
              }`}
              style={{ boxShadow: itemIsActive ? `0 0 32px ${item.color}22` : "none" }}
              aria-expanded={itemIsActive}
              aria-controls={`${item.id}-focus-area`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/35">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 transition group-hover:translate-x-1">
                  <ArrowRight className={`h-4 w-4 transition ${itemIsActive ? "rotate-90" : ""}`} style={{ color: item.color }} />
                </span>
              </div>
              <h3 className="mt-8 text-xl leading-7" style={{ color: itemIsActive ? item.color : undefined }}>
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/55">{item.text}</p>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeItem && (
          <motion.section
            key={activeItem.id}
            id={`${activeItem.id}-focus-area`}
            initial={{ opacity: 0, height: 0, y: 14 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: activeItem.color }}>
                  Focus Area
                </p>
                <h3 className="mt-4 max-w-2xl text-3xl leading-tight md:text-5xl">{activeItem.title}</h3>
                <p className="mt-6 text-base leading-8 text-white/62">{activeItem.impact}</p>
              </div>

              <div className="grid gap-3">
                {activeItem.branches.map((branch, index) => (
                  <div key={branch} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs"
                      style={{ color: activeItem.color }}
                    >
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-white/70">{branch}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {activeItem.method.map((step, index) => (
                <React.Fragment key={step}>
                  <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/70">{step}</span>
                  {index < activeItem.method.length - 1 && <span className="text-white/25">-&gt;</span>}
                </React.Fragment>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
}

function SevenElementLine({ activeStage, expandedStage, onSelectStage, onSelectRole }) {
  const activeIndex = stages.findIndex((stage) => stage.id === activeStage.id);
  const progress = `${(activeIndex / (stages.length - 1)) * 100}%`;

  return (
    <section id="line" className="relative overflow-hidden border-t border-white/10 px-6 py-24 md:px-12 lg:px-20">
      <GridGlow color={activeStage.color} />
      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">My Journey</p>
        <h2 className="mt-4 text-5xl leading-tight md:text-7xl">The tree becomes a line.</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
          All seven top-level tree elements are preserved here as connected points. The line simply replaces branching navigation.
        </p>
      </div>

      <div className="relative z-10 mt-20">
        <div className="absolute left-4 right-4 top-[42px] hidden h-px bg-white/12 md:block" />
        <motion.div className="absolute left-4 top-[42px] hidden h-px bg-white md:block" animate={{ width: progress }} transition={{ duration: 0.5 }} />

        <div className="grid gap-6 md:grid-cols-7">
          {stages.map((stage, index) => {
            const Icon = getStageIcon(stage);
            const active = activeStage.id === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage)}
                className="relative rounded-3xl border border-white/10 bg-black/55 p-4 text-left backdrop-blur-md transition hover:border-white/30"
                style={{ boxShadow: active ? `0 0 38px ${stage.color}44` : "none" }}
              >
                <div className="flex items-center gap-3 md:block">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-black"
                    style={{ borderColor: stage.color }}
                    animate={{ scale: active ? [1, 1.08, 1] : 1 }}
                    transition={{ duration: 2, repeat: active ? Infinity : 0 }}
                  >
                    <Icon className="h-6 w-6" style={{ color: stage.color }} />
                  </motion.div>
                  <div className="min-w-0 md:mt-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">0{index + 1}</p>
                    <h3 className="mt-1 text-sm leading-5 text-white md:min-h-[40px]">{stage.title}</h3>
                    <p className="mt-1 text-xs text-white/38">{stage.short}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {expandedStage ? (
          <StageRoleStrip key={expandedStage.id} stage={expandedStage} onSelectRole={onSelectRole} />
        ) : (
          <motion.p
            key="closed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative z-10 mt-10 max-w-2xl text-sm leading-7 text-white/45"
          >
            Select an element to reveal its roles below the line.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}

function StageRoleStrip({ stage, onSelectRole }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="relative z-10 mt-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Roles inside {stage.title}</p>
          <h3 className="mt-2 text-3xl">{stage.title}</h3>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/50">{stage.description}</p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {stage.roles.map((roleId) => {
          const role = getRole(roleId);
          const RoleIcon = getRoleIcon(role);
          const gallery = getRoleGallery(role);
          const hasGallery = gallery.length > 0;

          if (hasGallery) {
            return (
              <article
                key={role.id}
                className="rounded-[2rem] border border-white/10 bg-black/35 p-4 md:col-span-2 lg:col-span-4 lg:grid lg:grid-cols-[1.1fr_.9fr] lg:gap-7 lg:p-6"
                style={{ boxShadow: `0 0 42px ${stage.color}22` }}
              >
                <ImageSlideshow images={gallery} title={role.title} />
                <div className="mt-6 flex flex-col justify-between lg:mt-0">
                  <div>
                    <div className="flex items-center gap-3">
                      <RoleIcon className="h-6 w-6" style={{ color: stage.color }} />
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Featured Story</p>
                    </div>
                    <h4 className="mt-5 text-3xl leading-tight md:text-5xl">{role.title}</h4>
                    <p className="mt-5 text-sm leading-7 text-white/55">{role.opening}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {role.details.map((detail) => (
                        <span key={detail} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-white/62">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectRole(role.id)}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
                  >
                    Open details <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          }

          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="group rounded-2xl border border-white/10 bg-black/35 p-5 text-left transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.05]"
            >
              <RoleIcon className="h-6 w-6 text-white/42 transition group-hover:text-white" style={{ color: stage.color }} />
              <h4 className="mt-5 text-xl leading-6">{role.title}</h4>
              <p className="mt-3 text-xs leading-6 text-white/45">{role.opening}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-white/62 group-hover:text-white">
                Open details <ChevronRight className="h-4 w-4" />
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function RolePopup({ role, onSelectProject, onClose }) {
  const stage = getStageForRole(role);

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm md:px-8 md:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-label={`${role.title} details`}
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#080808] p-5 shadow-2xl md:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">{stage.title}</p>
            <h2 className="mt-2 text-3xl md:text-5xl">{role.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close role details" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <RolePanel role={role} onSelectProject={onSelectProject} />
      </motion.article>
    </motion.div>
  );
}

function StagePanel({ stage, activeRole, onSelectRole }) {
  const Icon = getStageIcon(stage);

  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">Selected Element</p>
          <h3 className="mt-3 text-4xl">{stage.title}</h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
          <Icon className="h-8 w-8" style={{ color: stage.color }} />
        </div>
      </div>

      <p className="mt-6 text-base leading-8 text-white/62">{stage.description}</p>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-white/35">Roles inside this element</p>
        <div className="mt-4 grid gap-2">
          {stage.roles.map((roleId) => {
            const role = getRole(roleId);
            const RoleIcon = getRoleIcon(role);
            const selected = activeRole.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/35 p-4 text-left transition hover:border-white/30"
                style={{ boxShadow: selected ? `0 0 24px ${stage.color}33` : "none" }}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <RoleIcon className="h-5 w-5 shrink-0" style={{ color: stage.color }} />
                  <span className="text-sm text-white/72">{role.title}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white/35" />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function RolePanel({ role, onSelectProject }) {
  const stage = getStageForRole(role);
  const RoleIcon = getRoleIcon(role);
  const hasGallery = Array.isArray(role.gallery) && role.gallery.length > 0;

  return (
    <motion.div
      key={role.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">{stage.title}</p>
          <h3 className="mt-3 text-4xl">{role.title}</h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
          <RoleIcon className="h-8 w-8" style={{ color: stage.color }} />
        </div>
      </div>

      <p className="mt-6 text-base leading-8 text-white/62">{role.opening}</p>

      {hasGallery && (
        <div className="mt-8">
          <ImageSlideshow images={role.gallery} title={role.title} />
        </div>
      )}

      <div className="mt-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/35">Key Competencies and Skillsets</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {role.method.map((step) => (
              <span key={step} className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm text-white/68">
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-white/35">{role.projectsTitle}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {role.projects.map((project) => (
            <button
              key={project.title}
              onClick={() => onSelectProject({ ...project, role, stage })}
              className="group rounded-2xl border border-white/10 bg-black/35 p-5 text-left transition hover:border-white/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-3">
                <Hammer className="h-5 w-5 text-white/38 group-hover:text-white" />
                {project.schoolLogo && (
                  <img
                    src={project.schoolLogo.src}
                    alt={project.schoolLogo.alt}
                    className="h-9 w-24 rounded-lg border border-white/10 bg-white object-contain p-1"
                  />
                )}
              </div>
              {Array.isArray(project.gallery) && project.gallery.length > 0 && (
                <img
                  src={project.gallery[0].src}
                  alt={project.gallery[0].alt}
                  className="mt-5 aspect-video w-full rounded-xl border border-white/10 object-cover"
                />
              )}
              <h4 className="mt-5 text-lg leading-6">{project.title}</h4>
              <p className="mt-4 text-xs leading-6 text-white/45">{project.line}</p>
              {project.type === "class" && <ProfessorMini professor={project.professor} />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-white/35">Reflection</p>
        <p className="mt-4 text-sm leading-7 text-white/62">{role.reflection}</p>
      </div>
    </motion.div>
  );
}

function ImageSlideshow({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!Array.isArray(images) || images.length === 0) return null;

  const activeImage = images[activeIndex] || images[0];
  const goToPrevious = () => setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  const goToNext = () => setActiveIndex((current) => (current + 1) % images.length);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/30 p-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
        <img src={activeImage.src} alt={activeImage.alt || title} className="aspect-[4/3] w-full object-cover" />
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white/80 backdrop-blur-md transition hover:border-white/50 hover:text-white"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white/80 backdrop-blur-md transition hover:border-white/50 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-white/58">{activeImage.caption}</p>
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
          {activeIndex + 1} / {images.length}
        </p>
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              className={`overflow-hidden rounded-xl border transition ${
                index === activeIndex ? "border-white/60" : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={image.src} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfessorMini({ professor }) {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 p-3">
      <ProfessorAvatar professor={professor} size="small" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Professor</p>
        <p className="mt-1 truncate text-xs text-white/62">{professor?.name || "Professor name to be added"}</p>
      </div>
    </div>
  );
}

function ProfessorAvatar({ professor, size = "large" }) {
  const avatarSize = size === "small" ? "h-10 w-10" : "h-16 w-16";

  if (professor?.headshot) {
    return (
      <img
        src={professor.headshot}
        alt={professor.name || "Professor headshot"}
        className={`${avatarSize} shrink-0 rounded-full border border-white/10 object-cover`}
      />
    );
  }

  return (
    <div className={`${avatarSize} flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]`}>
      <BookOpen className={size === "small" ? "h-4 w-4 text-white/45" : "h-6 w-6 text-white/45"} />
    </div>
  );
}

function ProfessorBlock({ professor }) {
  const safeProfessor = professor || {};
  const links = [
    ["Profile", safeProfessor.website],
    ["LinkedIn", safeProfessor.linkedin],
  ];

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-white/35">Professor</p>
      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <ProfessorAvatar professor={safeProfessor} />
          <div>
            <p className="text-xl text-white">{safeProfessor.name || "Professor name to be added"}</p>
            <p className="mt-2 text-sm leading-6 text-white/50">Headshot space, official profile, and LinkedIn for this class.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {links.map(([label, url]) => (
            <a
              key={label}
              href={url || "#"}
              target={url ? "_blank" : undefined}
              rel={url ? "noreferrer" : undefined}
              aria-disabled={!url}
              onClick={(event) => {
                if (!url) event.preventDefault();
              }}
              className={`inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition ${
                url ? "text-white/70 hover:border-white/30 hover:text-white" : "cursor-not-allowed text-white/32"
              }`}
            >
              {label} <ExternalLink className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchoolLogo({ logo, school, compact = false }) {
  if (!logo?.src) {
    return (
      <div className={`${compact ? "h-12 w-32" : "h-16 w-44"} flex shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-xs uppercase tracking-[0.18em] text-white/50`}>
        {school || "School"}
      </div>
    );
  }

  return (
    <img
      src={logo.src}
      alt={logo.alt || `${school} logo`}
      className={`${compact ? "h-12 w-32" : "h-16 w-44"} shrink-0 rounded-2xl border border-white/10 bg-white object-contain p-2 shadow-2xl`}
    />
  );
}

function ClassIdentityCard({ item }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <SchoolLogo logo={item.schoolLogo} school={item.school} />
      <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-white/35">Home School</p>
      <h3 className="mt-3 text-3xl leading-tight">{item.school || "School to be added"}</h3>
      <p className="mt-5 text-sm leading-7 text-white/58">{item.theory || "Key theories and practices will appear here."}</p>
    </div>
  );
}

function ResourceLinks({ links }) {
  const safeLinks = (links || []).filter(([, url]) => url);

  if (safeLinks.length === 0) return null;

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-white/35">Course and Framework Links</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {safeLinks.map(([label, url]) => (
          <a
            key={`${label}-${url}`}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
          >
            {label} <ExternalLink className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

function getYouTubeEmbedUrl(url) {
  if (typeof url !== "string") return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let videoId = null;

    if (host === "youtube.com" || host === "m.youtube.com") {
      videoId = parsed.searchParams.get("v");

      if (!videoId && parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/").filter(Boolean)[1];
      }

      if (!videoId && parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/").filter(Boolean)[1];
      }
    }

    if (host === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1` : null;
  } catch {
    return null;
  }
}

function ProjectDrawer({ item, onClose }) {
  const hasGallery = Array.isArray(item.gallery) && item.gallery.length > 0;
  const hasProfessor = item.type === "class" || Boolean(item.professor);
  const hasSchoolLogo = item.type === "class" && Boolean(item.schoolLogo);
  const storyBlocks = [
    ["My Role", item.myRole],
    ["Work", item.work],
    ["Stakeholders", item.stakeholders],
    ["Impact", item.impact],
    ["Key Competencies and Skillsets", item.theory],
  ].filter(([, value]) => value);
  const mediaUrl = typeof item.media === "string" ? item.media : "";
  const youtubeEmbedUrl = getYouTubeEmbedUrl(mediaUrl);
  const hasMediaLink = mediaUrl.startsWith("http");
  const mediaText = item.mediaCaption || item.media || "Add a photo, short video, artifact image, or recreated visual for this project.";

  return (
    <motion.div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 210, damping: 28 }}
        className="absolute right-0 top-0 h-full w-full max-w-6xl overflow-y-auto border-l border-white/10 bg-[#080808] p-5 shadow-2xl md:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start">
            {hasSchoolLogo && <SchoolLogo logo={item.schoolLogo} school={item.school} compact />}
            <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
              {item.stage.title} / {item.role.title}
            </p>
            <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{item.title}</h2>
              {item.sourceTitle && item.sourceTitle !== item.title && (
                <p className="mt-3 text-sm leading-6 text-white/42">Workbook title: {item.sourceTitle}</p>
              )}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close project details" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className="flex min-h-[360px] flex-col justify-between rounded-[2rem] border border-dashed border-white/15 bg-black/30 p-6"
            style={{ boxShadow: `0 0 46px ${item.stage.color}18` }}
          >
            <div>
              {hasGallery ? (
                <ImageSlideshow images={item.gallery} title={item.title} />
              ) : youtubeEmbedUrl ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                  <iframe
                    title={`${item.title} video`}
                    src={youtubeEmbedUrl}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : hasSchoolLogo ? (
                <ClassIdentityCard item={item} />
              ) : (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035]">
                    <Play className="h-6 w-6" style={{ color: item.stage.color }} />
                  </div>
                  <h3 className="mt-3 text-3xl leading-tight">Visual evidence lives here.</h3>
                </>
              )}
              <p className="mt-8 text-[10px] uppercase tracking-[0.26em] text-white/35">
                {hasGallery ? "Image Slideshow" : youtubeEmbedUrl ? "Video Evidence" : hasSchoolLogo ? "Course Institution" : "Photo / Video Placeholder"}
              </p>
              <p className="mt-5 text-sm leading-7 text-white/58">{mediaText}</p>
              {hasMediaLink && (
                <a href={item.media} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                  Open reference <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-white/62">{item.stage.title}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-white/62">{item.role.title}</span>
            </div>
          </div>

          <div>
            <div className="h-1 w-24 rounded-full" style={{ background: item.stage.color }} />
            <p className="mt-7 text-base leading-8 text-white/62">{item.line}</p>

            {storyBlocks.length > 0 && (
              <div className="mt-8 grid gap-3">
                {storyBlocks.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">{label}</p>
                    <p className="mt-3 text-sm leading-7 text-white/62">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {hasProfessor && <ProfessorBlock professor={item.professor} />}

            <ResourceLinks links={item.resourceLinks} />

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">How this fits the line</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-white/58">
                <p><span className="text-white">Element:</span> {item.stage.description}</p>
                <p><span className="text-white">Role:</span> {item.role.opening}</p>
                <p><span className="text-white">Reflection:</span> {item.role.reflection}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function Contact() {
  const socialLinks = [
    {
      label: "Email Ronak",
      href: "mailto:ronakvj@alumni.harvard.edu",
      icon: Mail,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ronakvj/",
      icon: InstagramIcon,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ronakvj/",
      icon: LinkedInIcon,
    },
    {
      label: "Twitter / X",
      href: "https://x.com/ronakvj",
      icon: XSocialIcon,
    },
    {
      label: "Substack",
      href: "https://ronakvj.substack.com/",
      icon: SubstackIcon,
    },
  ];

  return (
    <section id="contact" className="border-t border-white/10 px-6 py-24 md:px-12 lg:px-20">
      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-5xl leading-tight md:text-7xl">Let's build together.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              For innovation ecosystem research, strategy consulting, product design, program advisory, policy advocacy, storytelling, and collaborations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              const external = link.href.startsWith("http");

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  aria-label={link.label}
                  title={link.label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/68 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function GridGlow({ color = "#0197F6" }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -right-40 top-20 h-[480px] w-[480px] rounded-full blur-[120px]"
        style={{ background: `${color}28` }}
      />
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
}
