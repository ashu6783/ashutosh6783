# Mathongo PYQ Chapter-wise App

This is a [Next.js](https://nextjs.org) project for browsing and tracking chapter-wise Previous Year Questions (PYQs) for Physics, Chemistry, and Mathematics. The app features a modern UI, subject tabs, animated chapter lists, and dark mode support.

## Features

- Chapter-wise PYQ breakdown for Physics, Chemistry, and Mathematics
- Animated UI with [framer-motion](https://www.framer.com/motion/)
- Dark mode toggle
- Responsive design
- Progress tracking for solved questions
- Built with [Next.js App Router](https://nextjs.org/docs/app)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State management using [Redux Toolkit](https://redux-toolkit.js.org/)

## Getting Started

First, install dependencies:

```sh
npm install
# or
yarn install
```

Then, run the development server:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` - Next.js app directory (entry point, global styles)
- `components/` - UI components (e.g., `Header`, `SubjectTabs`, `ChapterList`, `chapterItem.tsx`)
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and helpers
- `store/` - Redux store and slices
- `types/` - TypeScript types

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- Redux Toolkit
- Framer Motion
- Phosphor React Icons
- Lucide React Icons

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) (see dependencies for details)

---
