# Expert-Weighted Confidence Index (EWCI) Dashboard

A stunning data hub for sports prediction markets that provides insights into why teams might win or lose, factors affecting outcomes, and expert-weighted predictions.

## Features

- **Crowd vs Expert Comparison**: Visual comparison between general crowd sentiment and expert-weighted confidence
- **Sports Market Cards**: Interactive cards showing active markets with key insights
- **Detailed Team Analysis**: Comprehensive breakdown of team strengths, weaknesses, and injury reports
- **Top Predictors Table**: Rankings of top predictors weighted by historical accuracy
- **Expert Insights Modal**: Deep dive into specific markets with detailed analysis

## Design

- **Background**: Pure white (#ffffff)
- **Accent Color**: Teal green (#1ebc8d) for buttons and clickable elements
- **Font**: Poppins (Google Fonts)
- **Animations**: Smooth fade-in and slide-in transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Twitter Developer Account (for API access)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Twitter API credentials:
   - Follow the guide in `TWITTER_SETUP.md`
   - Copy `.env.example` to `.env.local`
   - Add your Twitter API credentials to `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Test Twitter API connection:
   - Visit [http://localhost:3000/test-twitter](http://localhost:3000/test-twitter)
   - Click "Test Connection" to verify your API credentials

## Project Structure

```
limitless/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles with Poppins font
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main dashboard page
│   └── components/
│       ├── EWCIDashboard.tsx        # Main dashboard component
│       ├── Header.tsx               # Top navigation header
│       ├── ConfidenceComparison.tsx # Crowd vs EWCI comparison
│       ├── SportsMarketCard.tsx     # Market card component
│       ├── ExpertInsights.tsx       # Detailed insights modal
│       └── TopPredictors.tsx        # Top predictors table
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization
- **Lucide React**: Icon library

## Key Components

### ConfidenceComparison
Displays side-by-side comparison of crowd confidence vs EWCI with visual bar chart and key insights.

### SportsMarketCard
Interactive cards showing:
- Team matchups
- Crowd and EWCI percentages
- Divergence alerts
- Injury warnings
- Quick factor previews

### ExpertInsights
Modal popup with detailed analysis:
- Team strengths and weaknesses
- Injury reports
- Expert analysis summary
- Visual team comparison

### TopPredictors
Table showing top predictors ranked by:
- Historical accuracy
- Category expertise
- Win rate
- Total bets placed

## Customization

The dashboard uses sample data. To connect to real data:

1. Update the `markets` array in `EWCIDashboard.tsx`
2. Replace mock data in `TopPredictors.tsx` with API calls
3. Add data fetching logic using Next.js API routes or external APIs

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

