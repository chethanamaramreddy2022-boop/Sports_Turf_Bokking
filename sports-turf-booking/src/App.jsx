import BookingForm from './components/BookingForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <span className="logo">&#9917; TurfBook</span>
          <nav>
            <a href="#booking">Book Now</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <h1>Book Your <span className="highlight">Sports Turf</span> in Seconds</h1>
              <p>Find and book the best sports turfs near you. Quick, easy, and instant confirmation.</p>
              <ul className="features">
                <li>&#10003; Instant Booking Confirmation</li>
                <li>&#10003; Multiple Sports Available</li>
                <li>&#10003; Best Prices Guaranteed</li>
              </ul>
            </div>
            <div className="hero-form" id="booking">
              <BookingForm />
            </div>
          </div>
        </section>

        <section className="turfs-section">
          <div className="container">
            <h2>Available Turfs</h2>
            <div className="turfs-grid">
              {[
                { icon: '&#9917;', name: 'Football', desc: 'Floodlit 5-a-side and 7-a-side pitches with premium artificial grass.' },
                { icon: '&#127951;', name: 'Cricket', desc: 'Full-size cricket ground with proper pitch and outfield.' },
                { icon: '&#127934;', name: 'Tennis', desc: 'All-weather synthetic courts with professional lighting.' },
                { icon: '&#127936;', name: 'Basketball', desc: 'Indoor and outdoor courts with regulation hoops.' },
                { icon: '&#127955;', name: 'Badminton', desc: 'Indoor wooden flooring courts with nets provided.' },
              ].map(turf => (
                <div key={turf.name} className="turf-card">
                  <span className="turf-icon" dangerouslySetInnerHTML={{ __html: turf.icon }} />
                  <h3>{turf.name}</h3>
                  <p>{turf.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 TurfBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
