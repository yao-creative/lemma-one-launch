# LemmaOne Launch Page

## Overview

LemmaOne is an all-in-one sports tournament platform designed to connect athletes and organizers, providing a space to grow sports from amateur to semi-pro levels. This repository contains the code for the LemmaOne launch page, which serves as a waitlist and information hub for potential users.

## Goals

1. Introduce LemmaOne's concept to potential users
2. Collect waitlist signups from both players and organizers
3. Provide information about the platform's features and vision
4. Build a community around the project
5. Showcase the team behind LemmaOne

## Features

- Responsive design for various screen sizes
- Waitlist signup form for players and organizers
- Sections for platform information, community links, and FAQs
- About section introducing the team
- Social media and community channel links

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Open Sans (custom font implementation)
- **Backend**: Firebase (Authentication and Firestore)
- **Deployment**: Vercel

## Project Structure

The main components of the project are:

1. `app/page.tsx`: The main page component
2. `app/components/`: Directory containing reusable components
3. `app/layout.tsx`: The root layout component
4. `app/globals.css`: Global styles
5. `public/`: Static assets (images, icons)

## Key Components

- `WaitListForm`: Handles user signups for the waitlist
- `FAQSection`: Displays frequently asked questions
- `AboutSection`: Introduces the team behind LemmaOne

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The project is set up for easy deployment on Vercel. The `next.config.js` file contains the necessary configuration for optimal performance and SEO.

## Contributing

We welcome contributions to improve the launch page. Please feel free to submit issues or pull requests.

## License

[MIT License](LICENSE)