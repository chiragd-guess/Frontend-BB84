import React from "react";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function ContactCard({ name, role, title, email, photo }) {
  return (
    <div className="contact-card">
      <div className="contact-avatar">
        {photo ? (
          <img src={photo} alt={name} />
        ) : (
          <span>{initials(name)}</span>
        )}
        <span className="contact-avatar-ring" />
      </div>

      <h3 className="contact-name">{name}</h3>

      <span
        className={`contact-role ${
          role === "Mentor" ? "contact-role--mentor" : "contact-role--mentee"
        }`}
      >
        {role}
      </span>

      {title && <p className="contact-title">{title}</p>}

      <a className="contact-email" href={`mailto:${email}`}>
        ✉ {email}
      </a>
    </div>
  );
}

export default function Contacts() {
  const mentors = [
    {
      name: "Pritesh Thakur",
      role: "Mentor",
      title: "Lead Mentor",
      email: "priteshthakur402@gmail.com",
      photo: "/contacts/pritesh.jpg",
    },
    {
      name: "Swechchha Adhikari",
      role: "Mentor",
      title: "Co-Mentor",
      email: "swechchha.adhikari4@gmail.com",
      photo: "/contacts/swechchha.jpg",
    },
  ];

  const mentees = [
    { name: "Anamol Neupane", role: "Mentee", title: "Presentation Design & BB84 Research", email: "anamolneupane123@gmail.com", photo: "/contacts/anmol.jpg", },
    { name: "Anju Dhakal", role: "Mentee", title: "Post Design, Experimental design & BB84 Research", email: "pinganjudhakal@gmail.com", photo: "/contacts/anju.png", },
    { name: "Atal Chalise", role: "Mentee", title: "Backend Development, Experimental design & Technical Documentation", email: "atalchalise@gmail.com", photo: "/contacts/atal.png",},
    { name: "Bibhuti Ranabhat", role: "Mentee", title: "Technical Documentation, Post Design & BB84 Research", email: "biburanabhat756311@gmail.com", photo: "/contacts/bib.jpg", },
    { name: "Chirag Dahal", role: "Mentee", title: "Web Development, Backend & Deployment", email: "chiragdahal0013@gmail.com", photo: "contacts/chirag.png",},
    { name: "Drone Chaudhary", role: "Mentee", title: "UI/UX Design, Web Development & Post Design", email: "dronechaudhary@gmail.com", photo: "/contacts/drone.png", },
  ];

  return (
    <div className="contacts-page">
      <section className="contacts-hero">
        <p className="contacts-kicker">Team</p>
        <h1 className="contacts-title">
          Contacts <span>// Team</span>
        </h1>
        <p className="contacts-subtitle">
          The mentors and mentees behind BB84 // Sim
        </p>
      </section>

      <section className="contacts-panel">
        <p className="contacts-panel-title">Mentors</p>
        <div className="contacts-grid contacts-grid--mentors">
          {mentors.map((m) => (
            <ContactCard key={m.email} {...m} />
          ))}
        </div>
      </section>

      <section className="contacts-panel">
        <p className="contacts-panel-title">Mentees</p>
        <div className="contacts-grid contacts-grid--mentees">
          {mentees.map((m) => (
            <ContactCard key={m.email} {...m} />
          ))}
        </div>
      </section>
    </div>
  );
}