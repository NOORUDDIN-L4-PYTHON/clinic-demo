import { useState } from "react";

const CLINIC = {
  name: "Palm Grove Dental",
  tagline: "Gentle, modern dental care for the whole family.",
  phone: "+971 00 000 0000",
  whatsapp: "971000000000", // placeholder number, digits only
  address: "Sample Street, Abu Dhabi, UAE",
  hours: "Sat to Thu: 9:00 AM to 9:00 PM",
};

const services = [
  { title: "Check-ups & Cleaning", desc: "Routine exams and professional cleaning to keep your smile healthy." },
  { title: "Teeth Whitening", desc: "Safe, effective whitening for a brighter smile." },
  { title: "Braces & Aligners", desc: "Straighter teeth for children and adults." },
  { title: "Fillings & Root Canals", desc: "Comfortable treatment that relieves pain and saves teeth." },
  { title: "Dental Implants", desc: "Long-lasting replacements for missing teeth." },
  { title: "Kids' Dentistry", desc: "A friendly, relaxed environment for young patients." },
];

const team = [
  { name: "Dr. Sample One", role: "General Dentist" },
  { name: "Dr. Sample Two", role: "Orthodontist" },
  { name: "Dr. Sample Three", role: "Pediatric Dentist" },
];

const reviews = [
  { text: "Sample review text. Replace with a real testimonial.", who: "Patient name" },
  { text: "Sample review text. Replace with a real testimonial.", who: "Patient name" },
  { text: "Sample review text. Replace with a real testimonial.", who: "Patient name" },
];

export default function App() {
  const [form, setForm] = useState({ name: "", phone: "", service: services[0].title, message: "" });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const text =
      `Hello ${CLINIC.name}, I'd like to book an appointment.\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\n` +
      `Notes: ${form.message || "None"}`;
    window.open(`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div>
      <nav className="nav">
        <strong>{CLINIC.name}</strong>
        <div className="navlinks">
          <a href="#services">Services</a>
          <a href="#team">Team</a>
          <a href="#book">Book</a>
        </div>
      </nav>

      <header className="hero">
        <h1>{CLINIC.tagline}</h1>
        <p>Book online in under a minute. Same-week appointments available.</p>
        <a className="btn" href="#book">Book an appointment</a>
      </header>

      <section id="services" className="section">
        <h2>Our services</h2>
        <div className="grid">
          {services.map((s) => (
            <div className="card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="section alt">
        <h2>Meet the team</h2>
        <div className="grid">
          {team.map((t) => (
            <div className="card center" key={t.name}>
              <div className="avatar" />
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>What patients say</h2>
        <div className="grid">
          {reviews.map((r, i) => (
            <div className="card" key={i}>
              <p>"{r.text}"</p>
              <strong>{r.who}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="book" className="section alt">
        <h2>Book an appointment</h2>
        <form className="form" onSubmit={submit}>
          <input name="name" placeholder="Your name" value={form.name} onChange={update} required />
          <input name="phone" placeholder="Phone number" value={form.phone} onChange={update} required />
          <select name="service" value={form.service} onChange={update}>
            {services.map((s) => (
              <option key={s.title}>{s.title}</option>
            ))}
          </select>
          <textarea name="message" placeholder="Anything we should know? (optional)" value={form.message} onChange={update} rows={3} />
          <button className="btn" type="submit">Send via WhatsApp</button>
        </form>
      </section>

      <section className="section">
        <h2>Visit us</h2>
        <p>{CLINIC.address}</p>
        <p>{CLINIC.hours}</p>
        <p>{CLINIC.phone}</p>
      </section>

      <footer>
        <p>Demo website created as a portfolio sample. Clinic details are fictional.</p>
      </footer>
    </div>
  );
}