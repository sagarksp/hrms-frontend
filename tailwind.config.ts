import type { Config } from "tailwindcss";

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Simplified content path
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom CSS variable for background color
        foreground: "var(--foreground)", // Custom CSS variable for foreground color
      },
    },
  },
  plugins: [],
};

export default config;


// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)", // Custom CSS variable for background color
//         foreground: "var(--foreground)", // Custom CSS variable for foreground color
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;



// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;
