import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    direccion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Validación básica
    if (!formData.nombre || !formData.apellidos || !formData.edad || !formData.direccion) {
      setMessage('Por favor, completa todos los campos');
      setIsSubmitting(false);
      return;
    }

    if (formData.edad < 18) {
      setMessage('Debes ser mayor de 18 años para afiliarte');
      setIsSubmitting(false);
      return;
    }

    try {
      // Aquí harías la llamada a tu API para guardar en la tabla "afiliados" de "chevemarketdb"
      // const response = await fetch('/api/afiliados', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });

      // Simulación de envío exitoso
      setTimeout(() => {
        setMessage('¡Felicidades! Te has afiliado exitosamente. Pronto recibirás más información.');
        setFormData({
          nombre: '',
          apellidos: '',
          edad: '',
          direccion: ''
        });
        setIsSubmitting(false);
      }, 2000);

    } catch (error) {
      setMessage('Hubo un error al procesar tu solicitud. Intenta nuevamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="header-container">
          <div className="logo">
            <h2>CHEVEMARKET</h2>
          </div>
          <nav className="nav-links">
            <a href="#benefits">Beneficios</a>
            <a href="#affiliate-form">Afiliarse</a>
            <a href="/login">Iniciar Sesión</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Únete a Nuestro Programa de Afiliados</h1>
            <p className="hero-subtitle">
              Genera ingresos compartiendo las mejores cervezas del mundo. 
              Cada venta que generes te dará comisiones increíbles.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <h3>15%</h3>
                <p>Comisión por venta</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Cervezas disponibles</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Soporte dedicado</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="beer-placeholder">
              <div className="beer-icon">🍺</div>
              <p>Cervezas Premium</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <div className="container">
          <h2>¿Por qué ser afiliado?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Comisiones Altas</h3>
              <p>Gana hasta 15% de comisión por cada venta que generes a través de tus enlaces únicos.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔗</div>
              <h3>Enlaces Personalizados</h3>
              <p>Genera enlaces únicos para cualquier producto y comparte en tus redes sociales.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Dashboard Completo</h3>
              <p>Monitorea tus ventas, comisiones y estadísticas en tiempo real.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Pagos Rápidos</h3>
              <p>Recibe tus comisiones semanalmente directo a tu cuenta bancaria.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Marketing Tools</h3>
              <p>Accede a banners, imágenes y contenido promocional exclusivo.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🏆</div>
              <h3>Bonos Especiales</h3>
              <p>Obtén bonos adicionales por alcanzar metas mensuales de ventas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Form Section */}
      <section id="affiliate-form" className="form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>¡Comienza Hoy Mismo!</h2>
              <p>Completa el formulario y únete a nuestro programa de afiliados</p>
            </div>
            
            <div className="affiliate-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellidos">Apellidos *</label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    required
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edad">Edad *</label>
                  <input
                    type="number"
                    id="edad"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                    required
                    min="18"
                    placeholder="Tu edad"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion">Dirección *</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu dirección completa"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="affiliate-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Afiliarse Ahora'}
              </button>

              {message && (
                <div className={`message ${message.includes('exitosamente') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>BEER MARKET</h3>
              <p>El mejor marketplace de cervezas del mundo</p>
            </div>
            <div className="footer-section">
              <h4>Enlaces</h4>
              <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/productos">Productos</a></li>
                <li><a href="/contacto">Contacto</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Soporte</h4>
              <ul>
                <li><a href="/ayuda">Ayuda</a></li>
                <li><a href="/terminos">Términos</a></li>
                <li><a href="/privacidad">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Beer Market. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;