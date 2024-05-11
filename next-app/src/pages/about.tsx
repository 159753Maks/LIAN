import React from 'react';
import './AboutUs.css'; // Підключаємо стилі CSS

// Компонент для блоку "Про наше агентство"
function AboutAgency() {
  return (
    <div className="about_agency">
      <div className="agency_text">
        <h1>ABOUT THE AGENCY</h1>
        <p>WELCOME TO LIAN</p>
      </div>
    </div>
  );
}

// Компонент для блоку "Наші навички"
function OurSkills() {
  return (
    <div className="our_skills">
      <h2>OUR SKILLS</h2>
      {/* Здесь может быть вставлен SVG код или JSX для отображения навыков */}
    </div>
  );
}

// Компонент для блоку "Наша команда"
function TeamMember({ name, position, image, description }) {
  return (
    <div className="workers">
      <img src={image} alt={name} />
      <div className="workers-text">
        <h1>{name}</h1>
        <h2>{position}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

// Компонент для всього контенту сторінки "Про нас"
function AboutUs() {
  return (
    <div>
      <AboutAgency />
      <div className="block_1">
        {/* Здесь может быть вставлен блок "Наша история" и компонент OurSkills */}
      </div>
      <div className="block_2">
        <div className="block-2-text">
          <h1>AWESOME TEAM</h1>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit.</p>
        </div>
        <div className="we">
          <TeamMember
            name="LIAN JOY"
            position="CEO/Founder"
            image="/img/worker1.jpg"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <TeamMember
            name="ALBERT THANH"
            position="CEO/Founder"
            image="/img/worker2.jpg"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <TeamMember
            name="JENN PEREIRA"
            position="CEO/Founder"
            image="/img/worker3.jpg"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
