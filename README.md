# 🎧 PodcastHub

PodcastHub is a modern web platform that integrates with the iTunes API to let users explore, search, and play podcast episodes directly from their browser. Users can browse trending podcasts, filter by genres, and enjoy a smooth listening experience with playback controls.

---

## 🚀 Features

- 🔍 **Search Podcasts** by keyword or title.
- 🔝 **Trending Podcasts** section for popular content.
- 🎭 **Filter by Genre** to explore topics you love.
- ▶️ **Audio Player** with play/pause, seek, and skip.
- 📱 **Responsive Design** optimized for all devices.
- ⚡ **Fast UI** using Next.js with server-side rendering.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **API Integration:** [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Version Control:** [GitHub](https://github.com/)

---

## 📦 Getting Started

Follow these steps to set up and run PodcastHub locally.

#### 1️⃣ Clone the repository

git clone https://github.com/HamadAloqayli/podcasthub.git

#### 2️⃣ Install dependencies

Make sure you have Node.js installed then run **npm install**

#### 3️⃣ Run the development server

**npm run dev** and visit http://localhost:3000 in your browser.

### 🧪 Available Scripts

```
npm run dev – Runs the app in development mode.
npm run build – Builds the app for production.
npm run start – Starts the production server.
```

### 🗂️ Project Structure

```
.
├── public/
│ └── favicon.ico
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ └── podcasts/
│ │ │ └── [id]/
│ │ │ └── episodes/
│ │ │ └── route.ts
│ │ │ └── route.ts
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── ui/
│ │ │ ├── button.tsx
│ │ │ ├── card.tsx
│ │ │ ├── input.tsx
│ │ │ ├── sonner.tsx
│ │ │ ├── toast.tsx
│ │ │ ├── toaster.tsx
│ │ │ ├── tooltip.tsx
│ │ │ └── use-toast.ts
│ │ ├── AudioPlayer.tsx
│ │ ├── EpisodeList.tsx
│ │ ├── GenreCard.tsx
│ │ ├── PodcastCard.tsx
│ │ ├── PodcastDetails.tsx
│ │ ├── SearchBar.tsx
│ │ └── TrendingSection.tsx
│ ├── hooks/
│ ├── lib/
│ └── utils/
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### 🌍 Live Demo

Check out the live version hosted on Vercel:

👉 https://podcasthub-seven.vercel.app/

### 📬 Contact

For any inquiries, please reach out to:

Hamad Aloqayli

Email: 7mdx97@gmail.com

Website: https://i7md.com
