import { useState } from 'react'
import { createListingService } from '../services/listingService'
import '../styles/createListing.css'

export default function CreateListing() {

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    files: [],
    description: '',
    propertyType: 'apartment',
  })

  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fileNames, setFileNames] = useState([])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === 'file') {
      const fileList = Array.from(files || [])
      setFormData({
        ...formData,
        files: fileList,
      })
      setFileNames(fileList.map(f => f.name))
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.location ||
      !formData.price ||
      !formData.area ||
      !formData.bedrooms ||
      !formData.bathrooms ||
      formData.files.length === 0 ||
      !formData.description
    ) {
      setErrorMessage('Please fill in all fields and upload at least one file')
      setTimeout(() => setErrorMessage(''), 30)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    const result = await createListingService(formData)

    if (result.success) {

      setSubmitted(true)
      setSuccessMessage(`Property "${formData.name}" has been listed successfully!`)

      setTimeout(() => {

        setFormData({
          name: '',
          location: '',
          price: '',
          area: '',
          bedrooms: '',
          bathrooms: '',
          files: [],
          description: '',
          propertyType: 'apartment',
        })
        setFileNames([])

        setSubmitted(false)
        setSuccessMessage('')
        setIsLoading(false)

      }, 3000)

    } else {

      setErrorMessage(`Error: ${result.error}`)
      setIsLoading(false)
      setTimeout(() => setErrorMessage(''), 3000)

    }
  }

  return (
    <div className="create-listing-container">

      <div className="listing-form-wrapper">

        <div className="listing-header">
          <h1>Create New Listing</h1>
          <p>Add your property to our platform</p>
        </div>

        {submitted && successMessage && (
          <div className="success-message">
            <span>✓</span>
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            <span>!</span>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="listing-form">

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="name">Property Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Luxury Apartment at Douala"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="propertyType">Property Type</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
                <option value="land">Land</option>
                <option value="rental">Rental</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Douala, Littoral Region"
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="area">Area (sqm)</label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

          </div>

          <div className="form-group">
              <label htmlFor="files">Property Pictures or Video</label>
              <input
                type="file"
                multiple
                accept='image/*, video/*'
                id="files"
                name="files"
                onChange={handleChange}
                required
              />
              {fileNames.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-semibold">Selected files: {fileNames.length}</p>
                  <ul className="list-disc list-inside mt-2">
                    {fileNames.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-submit"
            disabled={isLoading || submitted}
          >
            {isLoading ? 'Creating Listing...' : 'Create Listing'}
          </button>

        </form>

      </div>
    </div>
  )
}