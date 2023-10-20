import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      "primary": "hsl(180, 30%, 5%)",
      "secondary": "hsl(139, 17%, 37%)",
      "infoblue": "hsl(183, 94%, 76%)",
      "timber": "hsl(0, 12%, 87%)",
      "dangerred": "hsl(1, 91%, 38%)"

    }
  },
  plugins: [],
};
export default config;
