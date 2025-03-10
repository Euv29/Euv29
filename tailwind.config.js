/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          primary: "var(--primary)",
          "primary-hover": "var(--primary-hover)",
          card: "var(--card)",
          "card-foreground": "var(--card-foreground)",
          border: "var(--border)",
          input: "var(--input)",
          ring: "var(--ring)",
          muted: "var(--muted)",
          "muted-foreground": "var(--muted-foreground)",
          accent: "var(--accent)",
          "accent-foreground": "var(--accent-foreground)",
        },
      },
    },
    plugins: [],
}
