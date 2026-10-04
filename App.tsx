import { useEffect, useState, type FormEvent, type ReactNode } from "react"

type Page = "home" | "menu" | "about" | "experience" | "visit" | "booking"

const pages: { key: Page label: string }[] = [
  { key: "home", label: "Home" },
  { key: "menu", label: "Menu" },
  { key: "about", label: "About" },
  { key: "experience", label: "Experience" },
  { key: "visit", label: "Visit us" },
]

const images = {
  hero: "/images/exterior.jpg",
  patio: "/images/exterior.jpg",
  sports: "/images/drinks.jpg",
  friends: "/images/exterior.jpg",
  fish: "/images/fish-and-chips.jpg",
  drinks: "/images/drinks.jpg",
  grill: "/images/grill-plate.jpg",
  exterior: "/images/exterior.jpg",
}

function getPage(): Page {
  const page = window.location.hash.replace("#/", "") as Page
  return pages.some((item) => item.key === page) || page === "booking" ? page : "home"
}

function Icon({
  name,
  size = 20,
}: {
  name: "arrow" | "menu" | "close" | "pin" | "clock" | "star" | "facebook" | "card" | "car"
  size?: number
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }
  if (name === "menu")
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    )
  if (name === "close")
    return (
      <svg {...common}>
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    )
  if (name === "pin")
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  if (name === "clock")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    )
  if (name === "star")
    return (
      <svg {...common} fill="currentColor" strokeWidth="0">
        <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
      </svg>
    )
  if (name === "facebook")
    return (
      <svg {...common} fill="currentColor" strokeWidth="0">
        <path d="M14.2 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.7H7.3V13h3.1v9h3.8Z" />
      </svg>
    )
  if (name === "card")
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </svg>
    )
  if (name === "car")
    return (
      <svg {...common}>
        <path d="m5 11 2-5h10l2 5M4 11h16v7h-2v-2H6v2H4v-7Z" />
        <circle cx="7" cy="13.5" r=".8" fill="currentColor" />
        <circle cx="17" cy="13.5" r=".8" fill="currentColor" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function Link({
  to,
  children,
  className = "",
  onClick,
  external = false,
}: {
  to: string
  children: ReactNode
  className?: string
  onClick?: () => void
  external?: boolean
}) {
  return (
    <a
      href={external ? to : `#/${to}`}
      className={className}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  )
}

function Button({
  to,
  children,
  variant = "primary",
  external = false,
}: {
  to: string
  children: ReactNode
  variant?: "primary" | "light" | "outline" | "dark"
  external?: boolean
}) {
  return (
    <Link to={to} external={external} className={`button button-${variant}`}>
      <span>{children}</span>
      <Icon name="arrow" size={18} />
    </Link>
  )
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</div>
  )
}

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [page])
  return (
    <header className="header">
      <div className="nav-shell">
        <Link to="home" className="brand" onClick={() => setOpen(false)}>
          <span>masakeng</span>
          <small>BISTRO · SOWETO</small>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {pages.map((item) => (
            <Link
              key={item.key}
              to={item.key}
              className={page === item.key ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link to="booking" className="contact-link">
            Book a table <Icon name="arrow" size={16} />
          </Link>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} size={26} />
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {pages.map((item, index) => (
            <Link key={item.key} to={item.key} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link
            to="booking"
            className="mobile-contact"
            onClick={() => setOpen(false)}
          >
            <span>06</span>
            Book a table <Icon name="arrow" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="brand brand-light">
            <span>masakeng</span>
            <small>BISTRO · SOWETO</small>
          </div>
          <p>Authentic Soweto flavor with a modern neighborhood vibe.</p>
          <Link
            to="https://www.facebook.com/Masakeng%20Bistro"
            external
            className="social"
            aria-label="Masakeng Bistro on Facebook"
          >
            <Icon name="facebook" /> <span>Follow us on Facebook</span>
          </Link>
        </div>
        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            {pages.map((item) => (
              <Link key={item.key} to={item.key}>
                {item.label}
              </Link>
            ))}
            <Link to="booking">Book a table</Link>
          </div>
          <div>
            <h3>Find us</h3>
            <p>
              642 Kinini St
              <br />
              Mofolo Central
              <br />
              Soweto, 1800
            </p>
          </div>
          <div>
            <h3>Opening hours</h3>
            <p>
              Fri–Sat: 12 PM–8 PM
              <br />
              Sun: 12 PM–7 PM
              <br />
              <em>Mon–Thu: Closed</em>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Masakeng Bistro</span>
        <span>Create · taste · connect</span>
      </div>
    </footer>
  )
}

function PageHero({
  eyebrow,
  title,
  text,
  image,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  text?: string
  image: string
  children?: ReactNode
}) {
  return (
    <section
      className="page-hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(10,30,24,.88), rgba(10,30,24,.15)), url("${image}")`,
      }}
    >
      <div className="page-hero-content">
        {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </section>
  )
}

function IntroBlock({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow: string
  title: ReactNode
  text: string
  action?: ReactNode
}) {
  return (
    <div className="intro-block wrap">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      <div>
        <p>{text}</p>
        {action}
      </div>
    </div>
  )
}

const experiences = [
  {
    title: "Good food",
    text: "Comforting favorites and local flavors.",
    image: images.fish,
    no: "01",
  },
  {
    title: "Good company",
    text: "A relaxed place for friends, family and fellow locals.",
    image: images.friends,
    no: "02",
  },
  {
    title: "Live sports",
    text: "Big-screen sports and an energetic social atmosphere.",
    image: images.sports,
    no: "03",
  },
  {
    title: "Weekend vibes",
    text: "A neighborhood setting that comes alive on weekends.",
    image: images.patio,
    no: "04",
  },
]

function Home() {
  return (
    <>
      <section
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(5,22,17,.9) 0%, rgba(5,22,17,.45) 60%, rgba(5,22,17,.18) 100%), url("${images.hero}")`,
        }}
      >
        <div className="home-hero-content">
          <div className="open-pill">
            <span></span> Open Friday–Sunday
          </div>
          <h1>
            MASAKENG
            <br />
            <i>BISTRO</i>
          </h1>
          <h2>Soweto flavor. Good people. Great moments.</h2>
          <p>
            Authentic local flavors served with a modern, laid-back neighborhood
            vibe in the heart of Mofolo Central.
          </p>
          <div className="hero-actions">
            <Button to="menu" variant="light">
              View menu
            </Button>
            <Button to="visit" variant="outline">
              Visit us
            </Button>
          </div>
        </div>
        <div className="hero-side">
          <Icon name="pin" />
          <span>
            642 Kinini St
            <br />
            Mofolo Central, Soweto
          </span>
        </div>
        <div className="scroll-note">
          Scroll to discover <span></span>
        </div>
      </section>

      <main>
        <IntroBlock
          eyebrow="A Mofolo original"
          title={
            <>
              Your local spot, with a little more <i>flavor.</i>
            </>
          }
          text="Masakeng Bistro brings together authentic Soweto flavors, welcoming hospitality and a relaxed social atmosphere. Whether you're stopping by for a meal, catching the game or spending time with friends, there's always a reason to stay a little longer."
          action={
            <Button to="about" variant="dark">
              Discover Masakeng
            </Button>
          }
        />

        <section className="food-feature">
          <div className="food-image">
            <img
              src={images.fish}
              alt="Masakeng Bistro fish and chips with onion rings"
            />
            <div className="rating-card">
              <strong>4.2</strong>
              <span>
                <span className="stars">★★★★★</span>
                <br />
                68 local reviews
              </span>
            </div>
          </div>
          <div className="food-copy">
            <Eyebrow>From our kitchen</Eyebrow>
            <h2>
              Good food.
              <br />
              <i>No fuss.</i>
            </h2>
            <p>
              From our much-loved fish and chips to hearty pub-style meals,
              traditional favorites and special mogodu menu days—everything is
              made for easy, satisfying eating.
            </p>
            <div className="dish-list">
              {[
                "Fish & chips",
                "Hearty pub classics",
                "Traditional favorites",
                "Mogodu specials",
              ].map((dish) => (
                <span key={dish}>
                  <b>+</b>
                  {dish}
                </span>
              ))}
            </div>
            <Button to="menu" variant="dark">
              Explore the menu
            </Button>
          </div>
        </section>

        <section className="experience-section wrap-wide">
          <div className="section-head">
            <div>
              <Eyebrow>The Masakeng way</Eyebrow>
              <h2>
                All the right <i>ingredients.</i>
              </h2>
            </div>
            <Button to="experience" variant="dark">
              See the experience
            </Button>
          </div>
          <div className="experience-grid">
            {experiences.map((item) => (
              <article className="experience-card" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="experience-overlay">
                  <span>{item.no}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-preview">
          <div className="gallery-copy">
            <Eyebrow light>Life at Masakeng</Eyebrow>
            <h2>
              Come for the food.
              <br />
              Stay for the <i>vibe.</i>
            </h2>
            <p>
              Warm plates, cold drinks, lively games and the people who make it
              all worthwhile.
            </p>
            <Button to="experience" variant="light">
              View gallery
            </Button>
          </div>
          <div className="gallery-mosaic">
            <img
              src={images.exterior}
              alt="Masakeng Bistro exterior and patio"
            />
            <img src={images.drinks} alt="Drinks at Masakeng Bistro" />
            <img src={images.grill} alt="Grilled meal at Masakeng Bistro" />
            <img src={images.sports} alt="Friends watching sport together" />
          </div>
        </section>

        <LocationPreview />

        <section
          className="final-cta"
          style={{
            backgroundImage: `linear-gradient(rgba(5,26,20,.7), rgba(5,26,20,.7)), url("${images.patio}")`,
          }}
        >
          <Eyebrow light>This weekend</Eyebrow>
          <h2>
            Your table is <i>waiting.</i>
          </h2>
          <p>
            Come through for good food, good company and the unmistakable energy
            of Soweto.
          </p>
          <div>
            <Button to="menu" variant="light">
              View menu
            </Button>
            <Button to="visit" variant="outline">
              Visit Masakeng
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}

function LocationPreview() {
  return (
    <section className="location-preview wrap-wide">
      <div
        className="map-art"
        aria-label="Stylized map showing Masakeng Bistro in Mofolo Central"
      >
        <div className="map-grid"></div>
        <div className="map-pin">
          <Icon name="pin" size={28} />
          <span>
            MASAKENG
            <br />
            <small>BISTRO</small>
          </span>
        </div>
        <span className="road road-one">KININI STREET</span>
        <span className="road road-two">MOFOLO CENTRAL</span>
      </div>
      <div className="location-copy">
        <Eyebrow>Come through</Eyebrow>
        <h2>
          Find us in
          <br />
          <i>Mofolo Central.</i>
        </h2>
        <p className="address">
          <Icon name="pin" />
          642 Kinini St
          <br />
          Mofolo Central
          <br />
          Soweto, 1800
        </p>
        <div className="location-actions">
          <Button
            to="https://www.google.com/maps/search/?api=1&query=Masakeng+Bistro+642+Kinini+St+Soweto"
            external
            variant="primary"
          >
            Get directions
          </Button>
          <Button to="visit" variant="dark">
            Visiting info
          </Button>
        </div>
      </div>
    </section>
  )
}

function MenuPage() {
  const groups = [
    {
      no: "01",
      title: "Signature favorites",
      image: images.fish,
      items: [
        ["Fish & Chips", "One of Masakeng's recognizable favorites."],
        [
          "Masakeng plates",
          "Comforting bistro meals made for sharing good moments.",
        ],
      ],
    },
    {
      no: "02",
      title: "Pub classics",
      image: images.grill,
      items: [
        [
          "Hearty pub-style meals",
          "Relaxed, satisfying favorites for an easy afternoon.",
        ],
        [
          "Grill favorites",
          "Generous plates with the unmistakable Masakeng spirit.",
        ],
      ],
    },
    {
      no: "03",
      title: "Traditional / local",
      image: images.exterior,
      items: [
        ["Mogodu", "A much-loved traditional menu-day favorite."],
        [
          "Traditional favorites",
          "Local flavors, familiar comfort and plenty of soul.",
        ],
      ],
    },
    {
      no: "04",
      title: "Specials",
      image: images.patio,
      items: [
        [
          "Menu-day specials",
          "Ask the team what is being served when you visit.",
        ],
        [
          "Weekend plates",
          "Good food for slow afternoons and lively evenings.",
        ],
      ],
    },
    {
      no: "05",
      title: "Drinks",
      image: images.drinks,
      items: [
        [
          "Wines, beers & spirits",
          "Something chilled to enjoy with your meal.",
        ],
        ["Soft drinks", "Refreshing options for every kind of gathering."],
      ],
    },
  ]
  return (
    <>
      <PageHero
        eyebrow="The menu"
        title={
          <>
            Come <i>hungry.</i>
          </>
        }
        text="From comforting pub favorites to traditional Soweto flavors."
        image={images.fish}
      >
        <div className="hero-note">
          No prices online — ask our team about today's menu and specials.
        </div>
      </PageHero>
      <main>
        <IntroBlock
          eyebrow="Food with feeling"
          title={
            <>
              Familiar favorites.
              <br />
              <i>Local soul.</i>
            </>
          }
          text="Our menu is all about satisfying food, served without ceremony. Browse the kind of dishes you can expect, then come through and see what's cooking."
        />
        <section className="menu-groups wrap-wide">
          {groups.map((group, index) => (
            <article
              className={`menu-group ${index % 2 ? "reverse" : ""}`}
              key={group.title}
            >
              <div className="menu-photo">
                <img src={group.image} alt={group.title} />
                <span>{group.no}</span>
              </div>
              <div className="menu-copy">
                <Eyebrow>Menu selection</Eyebrow>
                <h2>{group.title}</h2>
                {group.items.map(([name, detail]) => (
                  <div className="menu-item" key={name}>
                    <h3>{name}</h3>
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
        <section className="simple-cta">
          <Eyebrow>Good to know</Eyebrow>
          <h2>Hungry already?</h2>
          <p>
            We're open Friday to Sunday. Come early, settle in and stay a while.
          </p>
          <Button to="visit">Plan your visit</Button>
        </section>
      </main>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            More than a bistro.
            <br />
            It's a local <i>gathering place.</i>
          </>
        }
        image={images.exterior}
      />
      <main>
        <IntroBlock
          eyebrow="Made in Mofolo"
          title={
            <>
              Authentically Soweto.
              <br />
              <i>Always welcoming.</i>
            </>
          }
          text="Masakeng Bistro combines authentic Soweto flavors with a modern, laid-back neighborhood atmosphere. It is a place made for real connection: familiar faces, generous food and weekends well spent."
        />
        <section className="story-feature wrap-wide">
          <div className="story-photo">
            <img
              src={images.exterior}
              alt="Masakeng Bistro storefront in Mofolo Central"
            />
            <span>
              642
              <br />
              KININI ST
            </span>
          </div>
          <div className="story-copy">
            <Eyebrow>Our story</Eyebrow>
            <h2>A neighborhood place, through and through.</h2>
            <p>
              Rooted in Mofolo Central, Masakeng is relaxed, social and proudly
              local. The bistro was created as the kind of place where a quick
              meal can turn into a long afternoon—and where there is always room
              for one more around the table.
            </p>
            <p>
              It brings the warmth of Soweto hospitality together with a
              polished, contemporary bistro spirit.
            </p>
          </div>
        </section>
        <section className="people-section">
          <div className="people-copy">
            <Eyebrow light>Our people</Eyebrow>
            <h2>
              Meet Godfrey
              <br />& <i>Gloria.</i>
            </h2>
            <p>
              At the heart of Masakeng are owners Godfrey and Gloria. Their
              vision is simple: serve good food, create a welcoming space and
              give the community somewhere it can truly call its own.
            </p>
          </div>
          <img
            src={images.friends}
            alt="Friends sharing time together at a neighborhood venue"
          />
        </section>
        <section className="community wrap">
          <div>
            <Eyebrow>Our community</Eyebrow>
            <h2>Made better by the people who walk through our doors.</h2>
          </div>
          <div>
            <p>
              Masakeng is shaped by its regulars, its weekend visitors and the
              energy of the neighborhood around it. It is a place to watch the
              game, reconnect with friends, celebrate the small wins and simply
              feel at home.
            </p>
            <blockquote>“Create. Taste. Connect.”</blockquote>
          </div>
        </section>
        <section className="simple-cta dark">
          <Eyebrow light>See you soon</Eyebrow>
          <h2>
            Come experience <i>Masakeng.</i>
          </h2>
          <Button to="visit" variant="light">
            Visit us
          </Button>
        </section>
      </main>
    </>
  )
}

function ExperiencePage() {
  const features = [
    {
      title: "Food & drinks",
      kicker: "Eat well",
      text: "Local favorites, hearty pub classics, wines, beers and spirits—all served with easy-going warmth.",
      image: images.grill,
    },
    {
      title: "Live sports",
      kicker: "Game on",
      text: "Catch the action on the big screens with fellow fans and the kind of energy you cannot recreate at home.",
      image: images.sports,
    },
    {
      title: "Outdoor patio",
      kicker: "Take it outside",
      text: "Settle into the relaxed patio, order something cold and watch Mofolo move around you.",
      image: images.exterior,
    },
    {
      title: "Social atmosphere",
      kicker: "Your people",
      text: "Bring friends, meet familiar faces and let a simple meal become a memorable afternoon.",
      image: images.friends,
    },
    {
      title: "Weekend energy",
      kicker: "Friday to Sunday",
      text: "Our doors open for the weekend—when the food is flowing, the game is on and the neighborhood comes alive.",
      image: images.patio,
    },
  ]
  return (
    <>
      <PageHero
        eyebrow="The Masakeng experience"
        title={
          <>
            Come for
            <br />
            the <i>vibe.</i>
          </>
        }
        text="Good food is only the beginning."
        image={images.hero}
      />
      <main>
        <IntroBlock
          eyebrow="Settle in"
          title={
            <>
              Your weekend starts <i>here.</i>
            </>
          }
          text="Masakeng is made for those unhurried moments that turn into the best stories. Come as you are, find your spot and enjoy the atmosphere."
        />
        <section className="feature-stack wrap-wide">
          {features.map((item, index) => (
            <article
              className={`feature-row ${index % 2 ? "reverse" : ""}`}
              key={item.title}
            >
              <div className="feature-image">
                <img src={item.image} alt={item.title} />
                <span>0{index + 1}</span>
              </div>
              <div className="feature-text">
                <Eyebrow>{item.kicker}</Eyebrow>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="full-gallery">
          <div className="section-head">
            <div>
              <Eyebrow light>Scenes from Masakeng</Eyebrow>
              <h2>
                A little taste of <i>the vibe.</i>
              </h2>
            </div>
          </div>
          <div className="gallery-grid">
            {[
              images.exterior,
              images.fish,
              images.hero,
              images.drinks,
              images.sports,
              images.grill,
            ].map((src, i) => (
              <img
                src={src}
                alt={
                  [
                    "Outdoor patio",
                    "Fish and chips",
                    "Restaurant atmosphere",
                    "Drinks",
                    "Live sport atmosphere",
                    "Masakeng meal",
                  ][i]
                }
                key={src}
              />
            ))}
          </div>
        </section>
        <section className="simple-cta">
          <Eyebrow>Friday to Sunday</Eyebrow>
          <h2>Ready to come through?</h2>
          <Button to="visit">Visit us</Button>
        </section>
      </main>
    </>
  )
}

function Hours() {
  return (
    <div className="hours-card">
      <div className="hours-title">
        <Icon name="clock" size={30} />
        <div>
          <Eyebrow>Opening hours</Eyebrow>
          <h2>Weekend mode.</h2>
        </div>
      </div>
      {[
        ["Monday–Thursday", "Closed"],
        ["Friday", "12:00 PM–8:00 PM"],
        ["Saturday", "12:00 PM–8:00 PM"],
        ["Sunday", "12:00 PM–7:00 PM"],
      ].map(([day, time]) => (
        <div
          className={`hours-row ${time === "Closed" ? "closed" : ""}`}
          key={day}
        >
          <span>{day}</span>
          <strong>{time}</strong>
        </div>
      ))}
    </div>
  )
}

function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit Masakeng"
        title={
          <>
            Come <i>through.</i>
          </>
        }
        text="Your local weekend spot in the heart of Mofolo Central."
        image={images.exterior}
      >
        <div className="hero-address">
          <Icon name="pin" />
          642 Kinini St · Mofolo Central · Soweto, 1800
        </div>
      </PageHero>
      <main>
        <section className="visit-top wrap-wide">
          <Hours />
          <div className="visit-photo">
            <img
              src={images.exterior}
              alt="Masakeng Bistro at 642 Kinini Street"
            />
            <div>
              <Icon name="star" />
              <strong>4.2</strong>
              <span>68 Google reviews</span>
            </div>
          </div>
        </section>
        <section className="directions-section">
          <div className="directions-copy">
            <Eyebrow light>Getting here</Eyebrow>
            <h2>
              Right in the heart
              <br />
              of <i>Mofolo Central.</i>
            </h2>
            <p>
              Find us at 642 Kinini Street. Free parking options and free street
              parking are available nearby.
            </p>
            <Button
              to="https://www.google.com/maps/search/?api=1&query=Masakeng+Bistro+642+Kinini+St+Soweto"
              external
              variant="light"
            >
              Get directions
            </Button>
          </div>
          <div className="map-art large">
            <div className="map-grid"></div>
            <div className="map-pin">
              <Icon name="pin" size={30} />
              <span>
                MASAKENG
                <br />
                <small>642 KININI ST</small>
              </span>
            </div>
            <span className="road road-one">KININI STREET</span>
            <span className="road road-two">MOFOLO CENTRAL</span>
          </div>
        </section>
        <section className="practical wrap-wide">
          <article>
            <Icon name="car" size={30} />
            <Eyebrow>Parking</Eyebrow>
            <h3>Park easy.</h3>
            <p>Free parking options and free street parking are available.</p>
          </article>
          <article>
            <Icon name="card" size={30} />
            <Eyebrow>Payment</Eyebrow>
            <h3>Pay your way.</h3>
            <p>Digital payments, credit cards and debit cards are welcome.</p>
          </article>
          <article>
            <Icon name="arrow" size={30} />
            <Eyebrow>Dining</Eyebrow>
            <h3>Stay or take away.</h3>
            <p>
              Dine-in and takeout are available. Delivery is not currently
              offered.
            </p>
          </article>
        </section>
        <section className="simple-cta dark">
          <Eyebrow light>Good food. Good people.</Eyebrow>
          <h2>
            See you at <i>Masakeng.</i>
          </h2>
          <p>Open Friday, Saturday and Sunday.</p>
        </section>
      </main>
    </>
  )
}

function BookingPage() {
  const [submitted, setSubmitted] = useState(false)

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 560, behavior: "smooth" })
  }

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title={
          <>
            Book a <i>table.</i>
          </>
        }
        text="Planning a meal with friends, family or the whole crew? Send us your details and we'll help you plan your visit."
        image={images.exterior}
      />
      <main className="booking-main">
        <section className="booking-layout wrap-wide">
          <div className="booking-form-panel">
            {submitted ? (
              <div className="booking-confirmation" role="status">
                <div className="confirmation-mark">
                  <Icon name="arrow" size={30} />
                </div>
                <Eyebrow>Booking request</Eyebrow>
                <h2>Request received.</h2>
                <p>
                  Thank you for your booking request. The Masakeng Bistro team
                  will review your details and get back to you to confirm
                  availability.
                </p>
                <Button to="home" variant="dark">
                  Back to home
                </Button>
              </div>
            ) : (
              <>
                <div className="booking-heading">
                  <Eyebrow>Reserve your spot</Eyebrow>
                  <h2>Plan your visit.</h2>
                  <p>
                    Share a few details below and the Masakeng team will follow
                    up with you about availability.
                  </p>
                </div>
                <form className="booking-form" onSubmit={submitBooking}>
                  <fieldset>
                    <legend>Customer details</legend>
                    <div className="form-grid">
                      <label className="field field-wide">
                        <span>Full Name</span>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          placeholder="Your full name"
                          required
                        />
                      </label>
                      <label className="field">
                        <span>Phone Number</span>
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          placeholder="Your phone number"
                          required
                        />
                      </label>
                      <label className="field">
                        <span>Email Address</span>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder="Your email address"
                          required
                        />
                      </label>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>Booking details</legend>
                    <div className="form-grid booking-detail-grid">
                      <label className="field">
                        <span>Date</span>
                        <input type="date" name="date" required />
                      </label>
                      <label className="field">
                        <span>Preferred Time</span>
                        <input type="time" name="time" required />
                      </label>
                      <label className="field field-wide">
                        <span>Number of Guests</span>
                        <select name="guests" defaultValue="" required>
                          <option value="" disabled>
                            Select party size
                          </option>
                          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(
                            (count) => (
                              <option value={count} key={count}>
                                {count}
                              </option>
                            ),
                          )}
                        </select>
                      </label>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>Additional information</legend>
                    <label className="field">
                      <span>Special Requests / Notes</span>
                      <textarea
                        name="notes"
                        rows={6}
                        placeholder="Let us know if you have any special requests, seating preferences or anything else we should know."
                      />
                    </label>
                  </fieldset>

                  <button type="submit" className="booking-submit">
                    <span>Request a booking</span>
                    <Icon name="arrow" size={18} />
                  </button>
                  <p className="booking-disclaimer">
                    Please note: submitting a request does not automatically
                    confirm your reservation. The Masakeng Bistro team will
                    confirm availability with you.
                  </p>
                </form>
              </>
            )}
          </div>

          <aside className="booking-sidebar">
            <img
              src={images.exterior}
              alt="Masakeng Bistro exterior at 642 Kinini Street"
            />
            <div className="booking-side-content">
              <div className="booking-message">
                <Eyebrow light>Come as you are</Eyebrow>
                <h2>Good food tastes better together.</h2>
                <p>
                  Gather your people and settle in for a relaxed Soweto weekend
                  at Masakeng.
                </p>
              </div>

              <div className="booking-info-block">
                <h3>Opening hours</h3>
                <div>
                  <span>Monday – Thursday</span>
                  <strong>Closed</strong>
                </div>
                <div>
                  <span>Friday – Saturday</span>
                  <strong>12:00 PM – 8:00 PM</strong>
                </div>
                <div>
                  <span>Sunday</span>
                  <strong>12:00 PM – 7:00 PM</strong>
                </div>
              </div>

              <div className="booking-info-block location">
                <h3>Location</h3>
                <p>
                  <strong>642 Kinini St</strong>
                  <br />
                  Mofolo Central
                  <br />
                  Soweto, 1800
                </p>
                <Button
                  to="https://www.google.com/maps/search/?api=1&query=Masakeng+Bistro+642+Kinini+St+Soweto"
                  external
                  variant="light"
                >
                  Get directions
                </Button>
              </div>

              <div className="booking-info-block contact">
                <h3>Contact</h3>
                <p>
                  Use the booking form to send your reservation request, or
                  connect with Masakeng Bistro on Facebook for restaurant
                  updates.
                </p>
                <Link
                  to="https://www.facebook.com/Masakeng%20Bistro"
                  external
                  className="booking-facebook"
                >
                  <Icon name="facebook" />
                  Facebook
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>(getPage)
  useEffect(() => {
    const onHash = () => {
      setPage(getPage())
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])
  const content: Record<Page, ReactNode> = {
    home: <Home />,
    menu: <MenuPage />,
    about: <AboutPage />,
    experience: <ExperiencePage />,
    visit: <VisitPage />,
    booking: <BookingPage />,
  }
  return (
    <>
      <Header page={page} />
      {content[page]}
      <Footer />
    </>
  )
}
