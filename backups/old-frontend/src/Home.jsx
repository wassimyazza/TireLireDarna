import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Home.css';

function Home() {
  const [activeTab, setActiveTab] = useState('buy');

  const properties = [
    { price: '850,000 MAD', beds: 3, baths: 2, area: '120m²', location: 'Casablanca, Maarif', badge: 'New' },
    { price: '1,200,000 MAD', beds: 4, baths: 3, area: '180m²', location: 'Rabat, Agdal', badge: 'Featured' },
    { price: '650,000 MAD', beds: 2, baths: 2, area: '95m²', location: 'Marrakech, Guéliz', badge: 'Sale' },
    { price: '2,500,000 MAD', beds: 5, baths: 4, area: '300m²', location: 'Tanger, Malabata', badge: 'Luxury' },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Home</h1>
          
          <div className="search-card">
            <div className="search-tabs">
              <button 
                className={`tab-btn ${activeTab === 'buy' ? 'active' : ''}`}
                onClick={() => setActiveTab('buy')}
              >
                Buy
              </button>
              <button 
                className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
                onClick={() => setActiveTab('rent')}
              >
                Rent
              </button>
              <button 
                className={`tab-btn ${activeTab === 'daret' ? 'active' : ''}`}
                onClick={() => setActiveTab('daret')}
              >
                Daret
              </button>
            </div>

            <div className="search-input-wrapper">
              <input type="text" placeholder="City, neighborhood, or ZIP code" />
              <button className="search-btn">Search</button>
            </div>

            <div className="search-filters">
              <select className="filter-select">
                <option>Price</option>
                <option>Under 500K</option>
                <option>500K - 1M</option>
                <option>1M - 2M</option>
                <option>2M+</option>
              </select>
              <select className="filter-select">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
              </select>
              <select className="filter-select">
                <option>Bedrooms</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="quick-links-bar">
        <div className="quick-links">
          <a href="#">Apartments in Casablanca</a>
          <a href="#">Villas in Marrakech</a>
          <a href="#">Houses in Rabat</a>
          <a href="#">Rentals in Tanger</a>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured Properties</h2>
          <Link to="/properties" className="section-link">See all</Link>
        </div>
        <div className="property-grid">
          {properties.map((prop, index) => (
            <div key={index} className="property-item">
              <div className="property-img">
                <span className="property-badge">{prop.badge}</span>
              </div>
              <div className="property-details">
                <div className="property-price">{prop.price}</div>
                <div className="property-meta">{prop.beds} bd • {prop.baths} ba • {prop.area}</div>
                <div className="property-location">{prop.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="how-section">
        <div className="how-container">
          <h2 className="how-title">How It Works</h2>
          <div className="steps">
            <div className="step-item">
              <div className="step-num">1</div>
              <h3 className="step-title">Search</h3>
              <p className="step-desc">Browse thousands of listings with advanced filters</p>
            </div>
            <div className="step-item">
              <div className="step-num">2</div>
              <h3 className="step-title">Connect</h3>
              <p className="step-desc">Contact owners directly via our messaging system</p>
            </div>
            <div className="step-item">
              <div className="step-num">3</div>
              <h3 className="step-title">Visit</h3>
              <p className="step-desc">Schedule visits and discover your future home</p>
            </div>
            <div className="step-item">
              <div className="step-num">4</div>
              <h3 className="step-title">Finance</h3>
              <p className="step-desc">Join a Daret group to fund your project</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Active Daret Groups</h2>
          <Link to="/daret" className="section-link">Explore</Link>
        </div>
        <div className="property-grid">
          <div className="property-item">
            <div className="property-img"></div>
            <div className="property-details">
              <div className="property-price">20,000 MAD/mo</div>
              <div className="property-meta">8/12 members • 4 months left</div>
              <div className="property-location">Casa Center Group</div>
            </div>
          </div>
          <div className="property-item">
            <div className="property-img"></div>
            <div className="property-details">
              <div className="property-price">15,000 MAD/mo</div>
              <div className="property-meta">6/10 members • 6 months left</div>
              <div className="property-location">Rabat Agdal Group</div>
            </div>
          </div>
          <div className="property-item">
            <div className="property-img"></div>
            <div className="property-details">
              <div className="property-price">30,000 MAD/mo</div>
              <div className="property-meta">10/15 members • 3 months left</div>
              <div className="property-location">Marrakech Premium</div>
            </div>
          </div>
          <div className="property-item">
            <div className="property-img"></div>
            <div className="property-details">
              <div className="property-price">25,000 MAD/mo</div>
              <div className="property-meta">12/15 members • 2 months left</div>
              <div className="property-location">Tanger Med Group</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2 className="cta-title">Ready to get started?</h2>
        <p className="cta-text">Create your free account and access all features</p>
        <Link to="/register" className="cta-button">Sign Up</Link>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Dart l'Darna</h3>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Discover</h3>
              <ul>
                <li><a href="#">Buy</a></li>
                <li><a href="#">Rent</a></li>
                <li><a href="#">Sell</a></li>
                <li><a href="#">Daret</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Guides</a></li>
                <li><a href="#">Calculators</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Business</h3>
              <ul>
                <li><a href="#">For Agents</a></li>
                <li><a href="#">For Developers</a></li>
                <li><a href="#">Advertising</a></li>
                <li><a href="#">Partnerships</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © 2024 Dart l'Darna. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;