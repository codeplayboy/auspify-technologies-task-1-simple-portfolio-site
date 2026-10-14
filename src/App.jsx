import React, { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Download, Github, Linkedin, Mail, MapPin, Send, X } from 'lucide-react'
import CharacterScene from './components/CharacterScene'

const asset = path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const projects = [
  { number: '01', title: 'Atlas Ledger', type: 'Mock finance system', meta: 'React · Data visualization · UX systems', image: asset('/images/desk.jpg'), description: 'A concept finance interface that turns messy activity into calm decisions.', detail: 'A fictional product concept exploring a calmer way to see the month: clear movement, honest guardrails, and an interaction model designed around the next decision.', tags: ['React', 'Data viz', 'UX systems'], outcome: 'A portfolio concept focused on reducing cognitive load.' },
  { number: '02', title: 'Northstar LMS', type: 'Mock learning platform', meta: 'Node · Product design · Responsive', image: asset('/images/campus.jpg'), description: 'A learning concept that makes progress visible and momentum easy.', detail: 'A fictional learning product exploring progress as a place you can return to, with a clear route from today’s work to the bigger arc.', tags: ['Node', 'Progress', 'Responsive'], outcome: 'A portfolio concept for making course momentum legible.' },
  { number: '03', title: 'Registrar', type: 'Mock operations tool', meta: 'Full stack · CRUD · Accessibility', image: asset('/images/portrait.jpg'), description: 'A human-scale attendance concept for real academic operations.', detail: 'A fictional operations surface for moments that need speed: search, status, follow-up, and a record that stays trustworthy.', tags: ['CRUD', 'Forms', 'Accessibility'], outcome: 'A portfolio concept for a confident daily ritual.' },
]

const skills = [
  ['01', 'Product thinking', 'I turn ambiguous requirements into clear flows, useful states, and interfaces people can trust.'],
  ['02', 'Frontend craft', 'React, JavaScript, semantic HTML, responsive CSS, interaction motion, and performance-minded UI.'],
  ['03', 'Backend systems', 'Node, Express, REST APIs, authentication, validation, persistence, and deployment-ready boundaries.'],
  ['04', 'Visual direction', 'Editorial layouts, type systems, art direction, prototyping, design tokens, and purposeful motion.'],
]

const toolStack = [
  ['React', 'https://cdn.simpleicons.org/react/61DAFB'],
  ['JavaScript', 'https://cdn.simpleicons.org/javascript/F7DF1E'],
  ['Node.js', 'https://cdn.simpleicons.org/nodedotjs/83CD29'],
  ['Express', 'https://cdn.simpleicons.org/express/F4F1E8'],
  ['MongoDB', 'https://cdn.simpleicons.org/mongodb/47A248'],
  ['Git', 'https://cdn.simpleicons.org/git/F05032'],
]

export default function App() {
  const [chapter, setChapter] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState('')
  const experiences = [
    ['Full-stack developer', 'Northstar Systems · Colombo · 2025—Present', 'NORTH / 01'],
    ['Frontend engineer', 'Morrow Labs · Remote · 2024—2025', 'MORROW / 02'],
    ['Product design intern', 'Fieldnote Studio · Colombo · 2023—2024', 'FIELD / 03'],
  ]
  const submitContact = async event => {
    event.preventDefault()
    const form = event.currentTarget
    setSending(true)
    setFormError('')
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
      if (!response.ok) throw new Error('The message could not be sent.')
      form.reset()
      setSent(true)
    } catch (error) {
      setFormError('The contact service is unavailable right now. Please email hello@auspify.dev directly.')
    } finally { setSending(false) }
  }
  useEffect(() => {
    const nodes = document.querySelectorAll('section, .marquee, footer')
    nodes.forEach(node => node.classList.add('reveal-ready'))
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible') }), { threshold: .14 })
    nodes.forEach(node => observer.observe(node))
    const hero = document.querySelector('.newspaper-hero')
    const onPointerMove = event => {
      if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - .5
      const y = (event.clientY - bounds.top) / bounds.height - .5
      hero.style.setProperty('--parallax-x', `${(x * 12).toFixed(2)}px`)
      hero.style.setProperty('--parallax-y', `${(y * 10).toFixed(2)}px`)
      hero.style.setProperty('--parallax-rotate', `${(x * 1.4).toFixed(2)}deg`)
    }
    const onPointerLeave = () => {
      if (!hero) return
      hero.style.setProperty('--parallax-x', '0px')
      hero.style.setProperty('--parallax-y', '0px')
      hero.style.setProperty('--parallax-rotate', '0deg')
    }
    hero?.addEventListener('pointermove', onPointerMove)
    hero?.addEventListener('pointerleave', onPointerLeave)
    return () => {
      observer.disconnect()
      hero?.removeEventListener('pointermove', onPointerMove)
      hero?.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <main>
    <nav className="site-nav"><a className="brand-lockup" href="#intro"><img src={asset('/images/arun-mark.png')} alt=""/><b>ARUN<span>.S</span></b></a><div className="nav-links"><a href="#about">About</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div><a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={14}/></a></nav>

    <section id="intro" className="hero introduction newspaper-hero"><div className="newspaper-kicker"><span>THE ARUN.S EDITION</span><span>COLOMBO / 2026</span><span>VOL. 01 — NO. 04</span></div><div className="hero-copy"><p className="eyebrow">FULL STACK DEVELOPER · PRODUCT THINKER</p><h1><span>ARUN</span><i>.S</i></h1><div className="headline-deck"><strong>Interfaces for complex ideas.</strong><p>Independent developer building useful digital systems with a point of view.</p></div><div className="hero-actions"><a className="cta" href="#projects">Explore the work <ArrowUpRight size={16}/></a><a className="text-link" href="#about">A little about me <ArrowRight size={15}/></a><a className="cv-download" href={asset('/downloads/arun-s-sample-cv.pdf')} download="Arun-S-Sample-CV.pdf"><Download size={16}/> Download CV</a></div></div><CharacterScene/><div className="hero-portrait newspaper-image"><img src={asset('/images/arun-frontpage.png')} alt="Editorial photograph of a creative coding desk"/><span>FIG. 01 / A PLACE TO THINK</span></div><div className="newspaper-caption">THIS WEEK’S COVER STORY<br/><b>DESIGNING SOFTWARE PEOPLE WANT TO RETURN TO</b></div><div className="hero-note">SCROLL TO EXPLORE <span>↓</span></div></section>

    <div className="marquee" aria-hidden="true"><span>PRODUCT THINKING · FRONTEND CRAFT · SYSTEMS THAT FEEL HUMAN · </span><span>PRODUCT THINKING · FRONTEND CRAFT · SYSTEMS THAT FEEL HUMAN · </span></div>
    <section id="about" className="about about-section"><div className="section-label"><span>02</span><p className="eyebrow">ABOUT / THE PERSON BEHIND THE WORK</p></div><div className="about-grid"><div><p className="about-kicker">ARUN S · FICTIONAL PORTFOLIO PROFILE</p><h2>I build the kind of software people remember by how naturally it works.</h2><p className="body-copy">I’m Arun, a Colombo-based full-stack developer who moves between product thinking, interface design, and the engineering underneath. I’m drawn to the moment a complicated brief becomes a clear route: a screen with the right rhythm, an API with an honest boundary, an empty state that tells you what to do next.</p><p className="body-copy">The career story on this page is intentionally mock portfolio context. It imagines time spent with Northstar Systems, Morrow Labs, and Fieldnote Studio—fictional teams where I learned to pair careful visual decisions with dependable React, Node, and REST work.</p><div className="facts"><span><MapPin size={15}/> Colombo, Sri Lanka</span><span>React · Node · Product</span></div></div><div className="about-card"><img src={asset('/images/portrait.jpg')} alt="Portrait of Arun"/><div><strong>THE SHORT VERSION</strong><span>Curious engineer. Editorial eye. Comfortable taking a product from its first question to a useful, finished system.</span></div></div></div></section>

    <section id="skills" className="skills-section"><div className="section-label"><span>03</span><p className="eyebrow">SKILLS / WHAT I BRING</p></div><div className="skills-heading"><h2>From first question<br/>to final interface.</h2><p className="body-copy">A senior-minded workflow with enough range to move from a blank page to a shipped, maintainable product.</p></div><div className="skill-list">{skills.map(item => <article className="skill-row" key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><ArrowUpRight size={19}/></article>)}</div><div className="stack-line"><span>TOOLS I USE</span>{toolStack.map(([name, icon]) => <b className="tool-chip" key={name}><img src={icon} alt=""/> {name}</b>)}</div></section>

    <section id="experience" className="pinned-story"><div className="section-label"><span>04</span><p className="eyebrow">EXPERIENCE / PAST WORK · FICTIONAL TIMELINE</p></div><div className="story-frame"><div className="story-title"><span>CAREER / {experiences[chapter][2]}</span><h2>{experiences[chapter][0]}</h2><p>{experiences[chapter][1]}. Building full-stack product surfaces, API boundaries, and visual systems that make complex work feel coherent.</p></div><div className={`story-art art-${chapter}`}><span>{String(chapter + 1).padStart(2, '0')}</span><img src="https://images.unsplash.com/photo-1637249769470-3c4f4506a263?auto=format&fit=crop&w=900&q=85" alt="Blue-lit creative workspace with a developer at a desk"/><b>{chapter === 0 ? 'N' : chapter === 1 ? 'M' : 'F'}</b></div></div><div className="story-controls">{experiences.map((item, index) => <button className={chapter === index ? 'active' : ''} onClick={() => setChapter(index)} key={item[2]}>{item[2]}</button>)}</div></section>

    <section id="projects" className="work projects-section"><div className="section-label"><span>05</span><p className="eyebrow">PROJECTS / MOCK BUILDS</p></div><div className="projects-heading"><h2>Three complete<br/>product stories.</h2><p className="body-copy">Fictional end-to-end builds for finance, learning, and academic operations. Each project is a mock case study with a clear product problem, interface direction, and full-stack point of view.</p></div><div className="project-rail"><div><span>01 / DOMAINS</span><strong>Finance · learning · operations</strong></div><div><span>02 / SCOPE</span><strong>Flows · states · responsive UI</strong></div><div><span>03 / BUILD LENS</span><strong>React · Node · accessible systems</strong></div></div><div className="project-list">{projects.map(project => <article className="project project-button" key={project.number} role="button" tabIndex="0" onClick={() => setSelectedProject(project)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') setSelectedProject(project) }}><span>{project.number}</span><div><small>{project.type}</small><h3>{project.title}</h3><p>{project.description}</p><em>{project.meta}</em></div><img src={project.image} alt=""/><ArrowUpRight/></article>)}</div></section>

    <section className="process-section"><div className="section-label"><span>06</span><p className="eyebrow">PROCESS / HOW I WORK</p></div><div className="process-grid"><h2>Good work is a sequence of clear decisions.</h2><div className="process-steps"><div><b>01 / FRAME</b><p>Find the real problem beneath the brief and define what success should feel like.</p></div><div><b>02 / SHAPE</b><p>Make the flow visible with prototypes, content, states, and a visual language.</p></div><div><b>03 / BUILD</b><p>Ship the system with clean code, useful feedback, and room for the next version.</p></div></div></div></section>

    <section id="contact" className="contact contact-section"><div className="section-label"><span>07</span><p className="eyebrow">CONTACT / START A CONVERSATION</p></div><div className="contact-grid"><div><h2>Have a good<br/><i>problem?</i></h2><p className="body-copy">Tell me what you’re trying to make clearer, faster, or more useful. I’ll get back to you within two working days.</p><a className="email" href="mailto:hello@auspify.dev"><Mail size={17}/> hello@auspify.dev</a><div className="socials"><a href="https://github.com" aria-label="GitHub"><Github size={17}/></a><a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={17}/></a></div></div><form className="contact-form" onSubmit={submitContact}>{sent ? <div className="sent-state"><Check size={22}/><h3>Message sent.</h3><p>Thanks — I’ll be in touch soon.</p><button type="button" onClick={() => { setSent(false); setFormError('') }}>Send another</button></div> : <>{formError && <p className="form-error" role="alert">{formError}</p>}<label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input name="email" required type="email" placeholder="you@company.com"/></label><label>What are you building?<textarea name="message" required rows="4" placeholder="A product, a system, a good problem..."/></label><button className="submit" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send inquiry'} {!sending && <Send size={15}/>}</button></>}</form></div></section>

    <footer><a className="brand-lockup" href="#intro"><img src={asset('/images/arun-mark.png')} alt=""/><b>ARUN<span>.S</span></b></a><span>© 2026 · Built with curiosity and care.</span><a href="#intro">Back to top ↑</a></footer>
    {selectedProject && <div className="case-study-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><article className="case-study" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} case study`} onClick={event => event.stopPropagation()}><button className="case-close" aria-label="Close case study" onClick={() => setSelectedProject(null)}><X size={18}/></button><img src={selectedProject.image} alt=""/><div className="case-copy"><p className="eyebrow">{selectedProject.number} / {selectedProject.meta}</p><h2>{selectedProject.title}</h2><p>{selectedProject.detail}</p><div className="case-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div><strong><ArrowRight size={16}/> {selectedProject.outcome}</strong></div></article></div>}
  </main>
}
