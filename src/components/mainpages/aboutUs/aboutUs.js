import React from "react";
import PinturaImg from "../../../utils/logo_pinturas.png";

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <img src={PinturaImg} alt="" width="400px" />
        <section className="about-section">
          <h2>Sobre Nosotros</h2>
          <p>

            Desde nuestra fundación, hemos trabajado incansablemente para destacar en la industria de la pintura en aerosol, y nuestra dedicación a la excelencia nos ha consolidado como líderes en el mercado
          </p>
        </section>

        <section className="contact-section">
          <h2>Contacto</h2>
          <p>Email: icanspray@yahoo.com</p>
        </section>

        <section className="phone-section">
          <h2>Teléfono</h2>
          <p>+52.81.2127-5800</p>
        </section>

        <section className="whatsapp-section">
          <h2>WhatsApp</h2>
          <p>+52 81 1169 2889</p>
        </section>

        <section className="address-section">
          <h2>Dirección</h2>
          <p>COL. MIRASIERRA  San Pedro Garza García, Nuevo León, México. 66240</p>
        </section>

        {/* Secciones adicionales */}
        <section className="mission-section">
          <h2>Misión</h2>
          <p>
            El equipo detrás de nuestro negocio comparte una visión común de brindar soluciones creativas a través del color
          </p>
        </section>

        <section className="team-section">
          <h2>Equipo</h2>
          <p>
            Cada miembro aporta habilidades únicas y experiencia, creando un ambiente colaborativo que impulsa la innovación y la excelencia en cada etapa de nuestro proceso.
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutUs;
