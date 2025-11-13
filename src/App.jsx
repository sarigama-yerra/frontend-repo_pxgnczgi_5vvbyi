import { useState } from 'react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Submission failed')
      setResult({ ok: true, message: 'Thanks! Your message has been sent.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setResult({ ok: false, message: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen text-gray-900 bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold tracking-tight">Your Brand</a>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800">Hire Me</a>
          </nav>
          <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className="block w-5 h-[2px] bg-gray-900" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-3 flex flex-col gap-3">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="py-2 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="pt-28 md:pt-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest text-xs text-gray-500 mb-3">Designer • Developer</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              I craft clean, modern interfaces and delightful web experiences
            </h1>
            <p className="text-gray-600 mb-8">
              I help brands and startups turn ideas into polished products. From concept to code, I focus on clarity, performance, and detail.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="px-5 py-3 rounded-md bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800">View Work</a>
              <a href="#contact" className="px-5 py-3 rounded-md border border-gray-300 text-gray-800 font-semibold text-sm hover:bg-gray-100">Contact</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-inner" />
            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-200 shadow rounded-xl px-4 py-3 text-sm">
              <span className="font-semibold">10+ Years</span>
              <span className="ml-2 text-gray-500">experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-3">About</h2>
            <p className="text-gray-600">A short introduction</p>
          </div>
          <div className="md:col-span-2 space-y-4 text-gray-700">
            <p>
              I’m a multidisciplinary designer and developer dedicated to building elegant digital products. I blend thoughtful UX, visual design, and robust front-end engineering.
            </p>
            <p>
              My toolkit includes React, Tailwind, Framer Motion, and modern accessibility-first practices. I collaborate closely with teams to ship fast without sacrificing quality.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold">Services</h2>
              <p className="text-gray-600">What I can do for you</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Brand & Visual Design', desc: 'Identity, style guides, and design systems.' },
              { title: 'Product UX/UI', desc: 'User flows, wireframes, and polished interfaces.' },
              { title: 'Front-end Development', desc: 'High-quality, accessible, performant builds.' },
            ].map((s) => (
              <div key={s.title} className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold">Selected Work</h2>
              <p className="text-gray-600">A snapshot of recent projects</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <a key={i} href="#" className="group block rounded-xl overflow-hidden border border-gray-200 bg-white">
                <div className="aspect-[4/3] bg-gray-100 group-hover:opacity-90 transition-opacity" />
                <div className="p-4">
                  <h4 className="font-semibold">Project Title {i}</h4>
                  <p className="text-sm text-gray-500">UI/UX • Web</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: 'A joy to collaborate with — precise and creative.', n: 'Alex M.', r: 'Product Lead' },
              { q: 'Delivered beyond expectations, on time.', n: 'Priya S.', r: 'Founder' },
              { q: 'Top-notch craft and attention to detail.', n: 'Diego R.', r: 'Design Manager' },
            ].map((t, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="text-gray-700">“{t.q}”</p>
                <div className="mt-4 text-sm text-gray-500">{t.n} • {t.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-3">Let’s work together</h2>
            <p className="text-gray-600 mb-6">Tell me about your project and I’ll get back to you soon.</p>
            <div className="rounded-xl border border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea required rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                </div>
                <button disabled={submitting} className="inline-flex items-center px-5 py-3 rounded-md bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 disabled:opacity-60">
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
                {result && (
                  <p className={`${result.ok ? 'text-green-600' : 'text-red-600'} text-sm`}>{result.message}</p>
                )}
              </form>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold mb-2">Availability</h3>
              <p className="text-sm text-gray-600">Currently taking on new projects for the next quarter.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm text-gray-600">email@yourbrand.com</p>
              <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Your Brand. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Twitter</a>
            <a href="#" className="hover:text-gray-900">Dribbble</a>
            <a href="#" className="hover:text-gray-900">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
