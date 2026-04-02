# Landvest

A modern real estate investment platform built with React, Vite, and Supabase.

## Overview

Landvest is a web application that enables users to browse, create, and manage property listings and investment opportunities. The platform provides a seamless experience for real estate enthusiasts and investors.

## Features

- **Property Listings**: Browse and search available properties
- **Investment Opportunities**: Explore investment options and opportunities
- **User Authentication**: Secure login and signup functionality
- **Create Listings**: List your own properties for investment or sale
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Database**: Powered by Supabase for data management

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & PostCSS
- **Backend/Database**: Supabase
- **Code Quality**: ESLint
- **Package Manager**: npm/yarn

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── properties.jsx
│   ├── invest.jsx
│   ├── createListing.jsx
│   ├── about.jsx
│   └── Contact.jsx
├── styles/          # CSS & design system
├── App.jsx          # Main App component
├── main.jsx         # Vite entry point
├── index.css        # Global styles
├── supabaseClient.js # Supabase configuration
└── listingService.js # Business logic for listings
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd landvest
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build for production:

```bash
npm run build
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Usage

- **Browse Properties**: Navigate to the properties page to view available listings
- **Sign Up**: Create a new account to access full features
- **Create Listing**: List your own property through the create listing page
- **View Investments**: Explore investment opportunities on the invest page

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please open an issue on the repository or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: April 2, 2026
