# E-Waste Management Dashboard

A comprehensive dashboard for visualizing and analyzing global e-waste management data.

## Features

- Interactive data visualizations
- Global e-waste distribution maps
- Trend analysis and predictions
- Material composition insights
- Recovery efficiency tracking

## Setup Instructions

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

### ML Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Generate plots:
```bash
cd ml_scripts
python generate_plots.py
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. For production deployment:
```bash
vercel --prod
```

### Build Commands

- Development build: `npm run build`
- Production build: `npm run build:prod`

## Project Structure

```
e-waste-management/
├── public/
│   └── plots/           # Generated visualization plots
├── src/
│   ├── components/      # React components
│   ├── assets/          # Static assets
│   └── styles/          # CSS styles
├── ml_scripts/
│   └── generate_plots.py # ML code for generating plots
└── package.json
```

## Technologies Used

- React.js
- TypeScript
- Styled Components
- Plotly.js
- Python (Data Analysis)
- Pandas
- Plotly Python

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
