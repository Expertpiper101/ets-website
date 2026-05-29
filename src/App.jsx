import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Fingerprint,
  Gauge,
  Layers3,
  LockKeyhole,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from 'lucide-react'
import etsLogo from './assets/brand/ets-logo-wide.jpg'
import heroImage from './assets/brand/touch-systems-hero.png'
import './App.css'

const services = [
  {
    icon: Fingerprint,
    title: 'Membrane keypads',
    text: 'Custom tactile and non-tactile switch panels engineered for harsh, repeated-use environments.',
  },
  {
    icon: Layers3,
    title: 'Graphic overlays',
    text: 'Polycarbonate and polyester overlays with crisp print, hard-wearing finishes, and precise adhesive systems.',
  },
  {
    icon: BadgeCheck,
    title: 'Badges and labels',
    text: 'Industrial product labels, domed badges, calibration plates, warning labels, and serialized identifiers.',
  },
  {
    icon: Sparkles,
    title: 'Laser and digital work',
    text: 'Laser cutting, engraving, marking, and short-run digital print support from prototype through production.',
  },
]

const processSteps = [
  'Design review',
  'Material selection',
  'Prototype sample',
  'Production run',
  'Quality dispatch',
]

const productMenuItems = [
  'Membrane Keypads',
  'Touch Switches',
  'Graphic Overlays',
  'Labels',
  'Domed Badges',
  'Laser Cutting & Engraving',
  'Digital Printing',
]

const products = [
  {
    icon: Fingerprint,
    title: 'Membrane Keypads',
    slug: 'membrane-keypads',
    summary:
      'Flat custom key panels with printed conductive circuits, tails and connector options for equipment control.',
    detail:
      'Available as tactile or non-tactile assemblies, with embossing, windows, LED ports, shielding and printed graphic layers.',
    tags: ['Tactile keys', 'Circuit tails', 'Embossing'],
  },
  {
    icon: Gauge,
    title: 'Touch Switches',
    slug: 'touch-switches',
    summary:
      'Integrated switch technology for smooth, sealed and reliable user interfaces.',
    detail:
      'Includes electroluminescent lamp options for backlighting selected areas of tactile or non-tactile membrane switches.',
    tags: ['Backlighting', 'Sealed interface', 'Custom zones'],
  },
  {
    icon: Layers3,
    title: 'Graphic Overlays',
    slug: 'graphic-overlays',
    summary:
      'Durable printed front overlays made from similar materials used in membrane keypad construction.',
    detail:
      'Designed for display windows, LEDs, mechanical key coverage, component cutouts and gloss or matt finishes.',
    tags: ['Polycarbonate', 'Display windows', 'Laser cut'],
  },
  {
    icon: FileCheck2,
    title: 'Labels',
    slug: 'labels',
    summary:
      'Vinyl and polycarbonate labels selected around application, environment, budget and required lifespan.',
    detail:
      'Labels can be die cut, laser cut, stamped or hand cut, with split backing liners and protective laminates where needed.',
    tags: ['Vinyl', 'Polycarbonate', 'Custom cut'],
  },
  {
    icon: BadgeCheck,
    title: 'Domed Badges',
    slug: 'domed-badges',
    summary:
      'Printed labels finished with a clear resin lens for extra depth, brightness and a premium tactile effect.',
    detail:
      'Weather resistant, cleanable, available in almost any shape and useful for product branding or identification.',
    tags: ['Resin dome', 'Weather resistant', 'Brand badges'],
  },
  {
    icon: Sparkles,
    title: 'Laser Cutting & Engraving',
    slug: 'laser-cutting-engraving',
    summary:
      'Precision cutting, marking and engraving for panels, overlays, acrylic, labels and production samples.',
    detail:
      'Useful for accurate component openings, edge finishing, serialized details and short-run manufacturing support.',
    tags: ['Engraving', 'Marking', 'Cutouts'],
  },
  {
    icon: Factory,
    title: 'Digital Printing',
    slug: 'digital-printing',
    summary:
      'Digital print support for vinyl, canvas and various substrates where short-run colour work is required.',
    detail:
      'A practical fit for prototypes, sample overlays, labels, decals and visual production proofs before larger runs.',
    tags: ['Vinyl', 'Canvas', 'Short runs'],
  },
]

const aboutHighlights = [
  {
    icon: Workflow,
    title: 'Design know-how',
    text: 'Decades of design experience place ETS at the forefront of economical production decisions and practical problem solving.',
  },
  {
    icon: UsersRound,
    title: 'A century of staff',
    text: 'Most staff members have been with ETS for 10 years or longer, creating a well-trained team ready for specialist requirements.',
  },
  {
    icon: Factory,
    title: 'Equipment',
    text: 'From laser cutting technology to traditional manufacturing equipment, ETS maintains production capacity to reduce bottlenecks.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality control',
    text: 'A documented production sheet follows the entire process from start to finish, with conformance treated as a necessity.',
  },
]

const aboutPrinciples = [
  'Lead times are handled openly around each client requirement.',
  'Low-cost tooling and prototyping support new designs and upgrades.',
  'Local manufacture remains central to ETS and the South African economy.',
  'BEE certificates and company policy documents can later sit inside a secure document area.',
]

const crmCards = [
  {
    icon: LockKeyhole,
    title: 'Client portal ready',
    text: 'A secure account area can later hold quote requests, artwork approvals, order documents, and repeat jobs.',
  },
  {
    icon: Workflow,
    title: 'CRM pipeline fit',
    text: 'The content model is ready to become leads, enquiries, opportunities, accounts, and production jobs.',
  },
  {
    icon: FileCheck2,
    title: 'Approval workflow',
    text: 'Future screens can manage artwork proofs, manufacturing notes, revision history, and customer sign-off.',
  },
]

const brandColours = [
  { name: 'Logo navy', value: '#1E255C' },
  { name: 'Technical blue', value: '#343E87' },
  { name: 'Interface violet', value: '#5961AE' },
  { name: 'Graphite', value: '#6B7280' },
  { name: 'Cloud', value: '#F4F6FB' },
]

const whatsappNumber = '27000000000'

const socialLinks = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29.2 29.2 0 0 0 2 12a29.2 29.2 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29.2 29.2 0 0 0 22 12a29.2 29.2 0 0 0-.4-4.8ZM10 15.1V8.9l5.4 3.1L10 15.1Z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.1 8.7V7.2c0-.7.5-.9.9-.9h2.1V2.7l-3-.1c-3.3 0-4.1 2.5-4.1 4v2.1H7.4v3.9H10v8.8h4.1v-8.8h2.8l.4-3.9h-3.2Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.8 8.8H3v12.1h3.8V8.8ZM4.9 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Zm16.1 11c0-3.3-1.8-5.5-4.7-5.5a4 4 0 0 0-3.6 2V8.8H9v12.1h3.8v-6.6c0-1.7.9-2.7 2.3-2.7 1.3 0 2.1.9 2.1 2.8v6.5H21V14Z" />
      </svg>
    ),
  },
]

const crmStats = [
  { label: 'Open enquiries', value: '18', trend: '+4 this week' },
  { label: 'Quotes pending', value: '7', trend: 'R 184k pipeline' },
  { label: 'Artwork approvals', value: '5', trend: '2 urgent' },
  { label: 'Production jobs', value: '12', trend: '4 due this week' },
]

const crmPipeline = [
  {
    stage: 'New lead',
    items: [
      { company: 'Nova Controls', product: 'Membrane keypad', value: 'R 18,400' },
      { company: 'Metro Labelling', product: 'Domed badges', value: 'R 6,900' },
    ],
  },
  {
    stage: 'Quoted',
    items: [
      { company: 'KZN Instruments', product: 'Graphic overlays', value: 'R 42,500' },
      { company: 'Aero Panel Works', product: 'Laser engraving', value: 'R 11,200' },
    ],
  },
  {
    stage: 'Approval',
    items: [
      { company: 'MedTech SA', product: 'Touch switches', value: 'R 68,000' },
      { company: 'PanelPro', product: 'Labels', value: 'R 9,800' },
    ],
  },
]

const crmJobs = [
  { job: 'ETS-1042', client: 'KZN Instruments', status: 'Artwork proof', due: '31 May' },
  { job: 'ETS-1043', client: 'MedTech SA', status: 'Material prep', due: '03 Jun' },
  { job: 'ETS-1044', client: 'Nova Controls', status: 'Quote draft', due: '04 Jun' },
  { job: 'ETS-1045', client: 'PanelPro', status: 'Ready to dispatch', due: '06 Jun' },
]

const crmContacts = [
  { name: 'A. Mokoena', company: 'MedTech SA', type: 'Key account' },
  { name: 'S. Naidoo', company: 'KZN Instruments', type: 'Buyer' },
  { name: 'J. van Wyk', company: 'Nova Controls', type: 'Engineer' },
]

function EtsLogo({ compact = false }) {
  return (
    <img
      className={compact ? 'ets-logo compact' : 'ets-logo'}
      src={etsLogo}
      alt="Electronic Touch Systems logo"
    />
  )
}

function App() {
  const [hash, setHash] = useState(window.location.hash || '#top')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isProductsPage = hash === '#products' || hash.startsWith('#product-')
  const isAboutPage = hash === '#about'
  const isAuthPage = hash === '#login' || hash === '#register'
  const isDashboardPage = hash === '#dashboard'

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#top')
      setIsMobileMenuOpen(false)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (!hash.startsWith('#product-')) return

    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }, [hash])

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Electronic Touch Systems home">
          <EtsLogo compact />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#top">Home</a>
          <a href="#about">About Us</a>
          <div className="nav-dropdown">
            <a href="#products" className="nav-dropdown-trigger">
              Products
              <ChevronDown size={15} />
            </a>
            <div className="submenu" aria-label="Product submenu">
              {productMenuItems.map((item) => (
                <a href={`#product-${item.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')}`} key={item}>
                  {item}
                </a>
              ))}
            </div>
          </div>
          <a href="#capabilities">Capabilities</a>
          <a href="#process">Process</a>
          <a href="#crm">CRM-ready</a>
          <a href="#dashboard">CRM Demo</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-action" href="#login">
          CRM Login
          <LogIn size={16} />
        </a>
        <button
          className="icon-button"
          type="button"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <Menu size={22} />
        </button>
      </header>

      <nav
        className={isMobileMenuOpen ? 'mobile-menu open' : 'mobile-menu'}
        id="mobile-menu"
        aria-label="Mobile navigation"
        onClick={(event) => {
          if (event.target.closest('a')) {
            setIsMobileMenuOpen(false)
          }
        }}
      >
        <a href="#top">Home</a>
        <a href="#about">About Us</a>
        <a href="#products">Products</a>
        <div className="mobile-submenu">
          {productMenuItems.map((item) => (
            <a href={`#product-${item.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')}`} key={item}>
              {item}
            </a>
          ))}
        </div>
        <a href="#capabilities">Capabilities</a>
        <a href="#process">Process</a>
        <a href="#crm">CRM-ready</a>
        <a href="#dashboard">CRM Demo</a>
        <a href="#contact">Contact</a>
        <a href="#login">CRM Login</a>
        <a href="#register">Register</a>
      </nav>

      {isProductsPage ? (
        <ProductsPage products={products} productMenuItems={productMenuItems} />
      ) : isAboutPage ? (
        <AboutPage />
      ) : isAuthPage ? (
        <AuthPage mode={hash === '#register' ? 'register' : 'login'} />
      ) : isDashboardPage ? (
        <CrmDashboard />
      ) : (
        <HomePage />
      )}

      <footer className="site-footer">
        <div>
          <EtsLogo compact />
          <strong>Touch Systems</strong>
          <span>Electronic Touch Systems (Pty) Ltd</span>
        </div>
        <div className="footer-links">
          <span><Phone size={15} /> Phone-ready</span>
          <span><Mail size={15} /> Email-ready</span>
          <span><MapPin size={15} /> South Africa</span>
          <span><ShieldCheck size={15} /> Auth-ready</span>
          <span><UsersRound size={15} /> CRM-ready</span>
          <span><Boxes size={15} /> Job-ready</span>
        </div>
      </footer>

      <div className="social-footer" aria-label="Social media links">
        <div className="social-links" aria-label="Social media links">
          {socialLinks.map((social) => {
            return (
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}>
                {social.icon}
              </a>
            )
          })}
        </div>
      </div>

      <a
        className="whatsapp-widget"
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello ETS, I would like to discuss a project.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat to ETS on WhatsApp Business"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16.01 3.2A12.68 12.68 0 0 0 5.07 22.3L3.7 28.8l6.64-1.55A12.68 12.68 0 1 0 16.01 3.2Zm0 2.34a10.34 10.34 0 0 1 8.8 15.76 10.34 10.34 0 0 1-13.96 3.6l-.38-.22-3.68.86.76-3.62-.25-.4A10.34 10.34 0 0 1 16 5.54Zm-4.46 5.2c-.23 0-.6.08-.92.43-.32.35-1.2 1.18-1.2 2.87s1.23 3.33 1.4 3.56c.17.23 2.38 3.82 5.86 5.2 2.9 1.15 3.49.92 4.12.86.63-.06 2.04-.83 2.33-1.64.29-.8.29-1.49.2-1.64-.08-.15-.32-.24-.66-.4-.34-.17-2.03-1-2.35-1.12-.31-.11-.54-.17-.77.17-.23.34-.89 1.12-1.09 1.35-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.68-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.55-.28-.67-.56-.58-.77-.59h-.68Z" />
        </svg>
        <span>
          <strong>WhatsApp</strong>
          <small>Business chat</small>
        </span>
      </a>
    </main>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <Factory size={16} />
            Interface solutions that perform
          </div>
          <h1>Electronic touch systems for products that need to perform.</h1>
          <p>
            A modern web presence for a specialist manufacturer of membrane keypads,
            graphic overlays, touch switches, badges, labels, laser marking, and digital print.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              Start an enquiry
              <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#capabilities">
              View capabilities
            </a>
          </div>
          <div className="trust-strip" aria-label="Company strengths">
            <span>Custom production</span>
            <span>In-house design</span>
            <span>Prototype to batch</span>
          </div>
          <div className="brand-colours" aria-label="ETS brand colours">
            {brandColours.map((colour) => (
              <span key={colour.value} title={`${colour.name} ${colour.value}`}>
                <i style={{ backgroundColor: colour.value }} />
                {colour.value}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-media">
          <img src={heroImage} alt="Membrane keypads and printed industrial overlays on a production bench" />
          <div className="quality-panel">
            <Gauge size={18} />
            <span>Artwork, materials and manufacturing aligned before production</span>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Manufacturing highlights">
        <div>
          <strong>30+</strong>
          <span>product categories supported</span>
        </div>
        <div>
          <strong>1</strong>
          <span>integrated design-to-production team</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>quote-first consultative workflow</span>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="section-heading">
          <span>Capabilities</span>
          <h2>Built for equipment brands that need durable, exact front-panel components.</h2>
          <p>
            The current business offering is reorganized into clear service lines, giving
            customers a faster path from need to enquiry.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article className="service-card" key={service.title}>
                <Icon size={24} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="split-section" id="process">
        <div className="section-heading compact">
          <span>How work moves</span>
          <h2>From sketch, sample or CAD file to production-ready parts.</h2>
          <p>
            A cleaner process story helps buyers understand what happens after they submit
            artwork, drawings, specifications, or replacement sample parts.
          </p>
        </div>
        <div className="process-list">
          {processSteps.map((step, index) => (
            <div className="process-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="crm-section" id="crm">
        <div className="section-heading">
          <span>Next phase</span>
          <h2>Designed now so authentication and CRM features can arrive cleanly later.</h2>
          <p>
            This React structure is intentionally app-like, so it can grow into private
            dashboards, customer records, quote tracking, and production workflows.
          </p>
        </div>
        <div className="crm-grid">
          {crmCards.map((card) => {
            const Icon = card.icon
            return (
              <article className="crm-card" key={card.title}>
                <Icon size={22} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <div className="eyebrow">
            <CalendarCheck size={16} />
            Quote and consultation
          </div>
          <h2>Make the first customer action obvious: send details, drawings or a sample brief.</h2>
          <p>
            This section can later become a secure lead form connected to a CRM. For now it
            gives the local prototype a polished conversion area and realistic content.
          </p>
        </div>
        <form className="quote-form">
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Company
            <input type="text" placeholder="Company name" />
          </label>
          <label>
            Project type
            <select defaultValue="">
              <option value="" disabled>
                Select a capability
              </option>
              <option>Membrane keypad</option>
              <option>Graphic overlay</option>
              <option>Labels or badges</option>
              <option>Laser or digital print</option>
            </select>
          </label>
          <label>
            Brief
            <textarea placeholder="Tell us about quantities, environment, materials or drawings available." />
          </label>
          <button type="button">
            Send enquiry
            <ArrowRight size={18} />
          </button>
        </form>
      </section>
    </>
  )
}

function ProductsPage({ products, productMenuItems }) {
  return (
    <section className="products-page" id="products">
      <div className="products-hero">
        <div>
          <div className="eyebrow">
            <Boxes size={16} />
            ETS product range
          </div>
          <h1>Products manufactured for control, identification and durable interface surfaces.</h1>
          <p>
            A dedicated products page using the original ETS product categories and the
            supplied brand palette, ready to become individual CRM-linked product records later.
          </p>
        </div>
        <div className="products-logo-panel">
          <EtsLogo />
          <div className="product-menu-list">
            {productMenuItems.map((item) => (
              <a href={`#product-${item.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')}`} key={item}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="products-layout">
        <aside className="products-sidebar" aria-label="Products submenu">
          <strong>Product submenu</strong>
          {productMenuItems.map((item) => (
            <a href={`#product-${item.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')}`} key={item}>
              {item}
            </a>
          ))}
        </aside>

        <div className="product-grid">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <article className="product-card" id={`product-${product.slug}`} key={product.title}>
                <div className="product-visual" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={34} />
                </div>
                <div className="product-content">
                  <Icon size={24} />
                  <h2>{product.title}</h2>
                  <p>{product.summary}</p>
                  <p>{product.detail}</p>
                  <div className="product-tags">
                    {product.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="about-page" id="about">
      <div className="about-hero">
        <div>
          <div className="eyebrow">
            <Factory size={16} />
            About Electronic Touch Systems
          </div>
          <h1>Practical design knowledge, trained people and controlled production.</h1>
          <p>
            ETS brings long-running manufacturing experience, equipment depth and quality
            discipline together to help clients avoid redesign, wasted time and unnecessary cost.
          </p>
        </div>
        <div className="about-statement">
          <EtsLogo />
          <strong>Time and attention to detail is our forte.</strong>
          <span>Challenge us to attain your goals.</span>
        </div>
      </div>

      <div className="about-grid">
        {aboutHighlights.map((item) => {
          const Icon = item.icon
          return (
            <article className="about-card" key={item.title}>
              <Icon size={26} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          )
        })}
      </div>

      <div className="about-band">
        <div>
          <span>Prototype to production</span>
          <h2>Low-cost tooling, realistic lead times and local manufacture.</h2>
        </div>
        <div className="principle-list">
          {aboutPrinciples.map((principle) => (
            <p key={principle}>
              <BadgeCheck size={18} />
              {principle}
            </p>
          ))}
        </div>
      </div>

      <div className="about-cta">
        <div>
          <h2>Explore products or start a technical discussion.</h2>
          <p>
            The About page now keeps the substance of the original ETS page while connecting
            naturally to product browsing and the future CRM enquiry flow.
          </p>
        </div>
        <div className="about-actions">
          <a className="primary-button" href="#products">
            Products page
            <ArrowRight size={18} />
          </a>
          <a className="secondary-button" href="#contact">
            Contact ETS
          </a>
        </div>
      </div>
    </section>
  )
}

function AuthPage({ mode }) {
  const isRegister = mode === 'register'

  return (
    <section className="auth-page" id={mode}>
      <div className="auth-shell">
        <div className="auth-intro">
          <EtsLogo />
          <div className="eyebrow">
            <LockKeyhole size={16} />
            CRM preparation
          </div>
          <h1>Customer portal access for quotes, approvals and production updates.</h1>
          <p>
            This page prepares the frontend for future authentication. The forms are local UI
            only for now, ready to connect to a secure backend, CRM records and client accounts.
          </p>
          <div className="auth-preview-list">
            <span><FileCheck2 size={18} /> Artwork approvals</span>
            <span><Workflow size={18} /> Quote pipeline</span>
            <span><Boxes size={18} /> Repeat orders</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
            <a className={!isRegister ? 'active' : ''} href="#login">
              Login
            </a>
            <a className={isRegister ? 'active' : ''} href="#register">
              Register
            </a>
          </div>

          <form className="auth-form">
            <div>
              <span>{isRegister ? 'Create account' : 'Welcome back'}</span>
              <h2>{isRegister ? 'Register for CRM access' : 'Login to the client portal'}</h2>
            </div>

            {isRegister && (
              <>
                <label>
                  Full name
                  <input type="text" placeholder="Your full name" />
                </label>
                <label>
                  Company
                  <input type="text" placeholder="Company name" />
                </label>
              </>
            )}

            <label>
              Email address
              <input type="email" placeholder="name@company.co.za" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Enter password" />
            </label>

            {isRegister && (
              <label>
                Account type
                <select defaultValue="">
                  <option value="" disabled>
                    Select account type
                  </option>
                  <option>Customer</option>
                  <option>Internal sales</option>
                  <option>Production team</option>
                  <option>Administrator</option>
                </select>
              </label>
            )}

            <button type="button">
              {isRegister ? 'Create CRM account' : 'Login'}
              <ArrowRight size={18} />
            </button>
            <a className="demo-dashboard-link" href="#dashboard">
              Open CRM demo dashboard
              <ArrowRight size={16} />
            </a>
            <p>
              {isRegister
                ? 'Registration will later create a CRM contact and approval workflow.'
                : 'Authentication will later connect to secure CRM roles and client data.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function CrmDashboard() {
  return (
    <section className="crm-dashboard-page" id="dashboard">
      <div className="crm-dashboard-shell">
        <aside className="crm-sidebar">
          <EtsLogo compact />
          <nav aria-label="CRM sections">
            <a className="active" href="#dashboard"><Gauge size={17} /> Overview</a>
            <a href="#dashboard"><UsersRound size={17} /> Contacts</a>
            <a href="#dashboard"><FileCheck2 size={17} /> Quotes</a>
            <a href="#dashboard"><ClipboardCheck size={17} /> Approvals</a>
            <a href="#dashboard"><Factory size={17} /> Production</a>
            <a href="#dashboard"><Mail size={17} /> Messages</a>
          </nav>
        </aside>

        <div className="crm-workspace">
          <div className="crm-topbar">
            <div>
              <span>ETS CRM demo</span>
              <h1>Sales, quotes and production visibility in one workspace.</h1>
            </div>
            <div className="crm-actions">
              <button type="button">New lead</button>
              <button type="button">New quote</button>
            </div>
          </div>

          <div className="crm-stat-grid">
            {crmStats.map((stat) => (
              <article className="crm-stat-card" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.trend}</small>
              </article>
            ))}
          </div>

          <div className="crm-main-grid">
            <section className="crm-panel pipeline-panel">
              <div className="crm-panel-heading">
                <h2>Quote pipeline</h2>
                <span>Mock CRM data</span>
              </div>
              <div className="pipeline-board">
                {crmPipeline.map((column) => (
                  <div className="pipeline-column" key={column.stage}>
                    <strong>{column.stage}</strong>
                    {column.items.map((item) => (
                      <article className="pipeline-card" key={`${column.stage}-${item.company}`}>
                        <span>{item.company}</span>
                        <p>{item.product}</p>
                        <small>{item.value}</small>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section className="crm-panel">
              <div className="crm-panel-heading">
                <h2>Production jobs</h2>
                <span>Live later</span>
              </div>
              <div className="crm-table">
                {crmJobs.map((job) => (
                  <div className="crm-row" key={job.job}>
                    <strong>{job.job}</strong>
                    <span>{job.client}</span>
                    <span>{job.status}</span>
                    <small>{job.due}</small>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="crm-bottom-grid">
            <section className="crm-panel">
              <div className="crm-panel-heading">
                <h2>Contacts</h2>
                <span>Customer records</span>
              </div>
              <div className="contact-list">
                {crmContacts.map((contact) => (
                  <article key={contact.name}>
                    <div>{contact.name.slice(0, 1)}</div>
                    <span>
                      <strong>{contact.name}</strong>
                      <small>{contact.company}</small>
                    </span>
                    <em>{contact.type}</em>
                  </article>
                ))}
              </div>
            </section>

            <section className="crm-panel crm-next-panel">
              <div className="crm-panel-heading">
                <h2>Next backend step</h2>
                <span>Phase 2</span>
              </div>
              <p>
                This dashboard is frontend-only. The next build step is adding Supabase auth,
                database tables for contacts, leads, quotes, jobs, approvals, and role-based access.
              </p>
              <a className="secondary-button" href="#login">Back to login</a>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
