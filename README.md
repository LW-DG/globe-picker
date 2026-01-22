# Globe Picker - ETF Country Allocation Visualizer

An interactive 3D globe visualization tool for exploring and comparing country allocations across different international ETFs. Built with React, TypeScript, and Vite.

## Features

- **Interactive 3D Globe**: Visualize ETF country allocations on a rotating 3D globe using react-globe.gl
- **ETF Selection**: Choose from multiple international ETFs (VEU, VXUS, EFA, and more)
- **Compare Mode**: Compare country allocations between two ETFs side-by-side
- **Country Details**: Hover over countries to view allocation percentages and ETF information
- **Compact View**: Toggle between full and compact selector modes for better visibility
- **Real-time Data**: View current ETF values, changes, and percentage changes

## Supported ETFs

The application includes data for several major international ETFs:
- VEU (Vanguard FTSE All-World ex-US)
- VXUS (Vanguard Total International Stock)
- EFA (iShares MSCI EAFE)
- IEFA (iShares Core MSCI EAFE)
- VWO (Vanguard Emerging Markets)
- IEMG (iShares Core MSCI Emerging Markets)
- VGK (Vanguard FTSE Europe)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **react-globe.gl** - 3D globe visualization
- **ESLint** - Code linting
