import { useState } from 'react'
import './BookingForm.css'

const TURFS = [
  { id: 'football', name: 'Football Turf', price: 800 },
  { id: 'cricket', name: 'Cricket Ground', price: 1200 },
  { id: 'tennis', name: 'Tennis Court', price: 600 },
  { id: 'basketball', name: 'Basketball Court', price: 700 },
  { id: 'badminton', name: 'Badminton Court', price: 500 },
]

const TIME_SLOTS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
  '09:00 PM',
]

const DURATIONS = [
  { value: 1, label: '1 Hour' },
  { value: 2, label: '2 Hours' },
  { value: 3, label: '3 Hours' },
]

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    turf: '',
    date: '',
    time: '',
    duration: 1,
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const selectedTurf = TURFS.find(t => t.id === formData.turf)
  const totalPrice = selectedTurf ? selectedTurf.price * formData.duration : 0

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits'
    }
    if (!formData.turf) newErrors.turf = 'Select a turf'
    if (!formData.date) newErrors.date = 'Select a date'
    if (!formData.time) newErrors.time = 'Select a time slot'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', turf: '', date: '', time: '', duration: 1 })
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="success-icon">&#10003;</div>
        <h2>Booking Confirmed!</h2>
        <p>Thank you, <strong>{formData.name}</strong>. Your {selectedTurf?.name} is booked.</p>
        <div className="booking-summary">
          <p><strong>Date:</strong> {formData.date}</p>
          <p><strong>Time:</strong> {formData.time}</p>
          <p><strong>Duration:</strong> {formData.duration} hour(s)</p>
          <p><strong>Total:</strong> ₹{totalPrice}</p>
        </div>
        <button className="btn btn-secondary" onClick={handleReset}>Book Another</button>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Book Your Turf</h2>

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="turf">Select Turf</label>
        <select id="turf" name="turf" value={formData.turf} onChange={handleChange}>
          <option value="">-- Choose a Turf --</option>
          {TURFS.map(t => (
            <option key={t.id} value={t.id}>{t.name} - ₹{t.price}/hr</option>
          ))}
        </select>
        {errors.turf && <span className="error">{errors.turf}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="time">Time Slot</label>
          <select id="time" name="time" value={formData.time} onChange={handleChange}>
            <option value="">-- Select Time --</option>
            {TIME_SLOTS.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.time && <span className="error">{errors.time}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <select id="duration" name="duration" value={formData.duration} onChange={handleChange}>
          {DURATIONS.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      {selectedTurf && (
        <div className="price-summary">
          <p>{selectedTurf.name} x {formData.duration} hr(s)</p>
          <p className="total">Total: ₹{totalPrice}</p>
        </div>
      )}

      <button type="submit" className="btn btn-primary">Confirm Booking</button>
    </form>
  )
}
