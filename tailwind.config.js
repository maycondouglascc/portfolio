/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111",
        secondary: "#555",
        background: "#fdfdf8",
        card: "#e4e4e7",
        border: "#f2f2f2",
        link: "#222",
        "link-hover": "#111",
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
        md: "0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.08)",
        lg: "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.08)",
        xl: "0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)",
        "2xl": "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0px 2px 4px 0px rgba(0, 0, 0, 0.06)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in forwards",
      },
      fontSize: {
        "display-72-medium": [
          "72px",
          { lineHeight: "76px", letterSpacing: "-0.045em" },
        ],
        "display-72-regular": [
          "72px",
          { lineHeight: "80px", letterSpacing: "-0.04em" },
        ],
        "display-64-medium": [
          "64px",
          { lineHeight: "70px", letterSpacing: "-0.04em" },
        ],
        "display-64-regular": [
          "64px",
          { lineHeight: "72px", letterSpacing: "-0.035em" },
        ],
        "display-56-medium": [
          "56px",
          { lineHeight: "62px", letterSpacing: "-0.035em" },
        ],
        "display-56-regular": [
          "56px",
          { lineHeight: "64px", letterSpacing: "-0.03em" },
        ],
        "heading-48-medium": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.03em" },
        ],
        "heading-48-regular": [
          "48px",
          { lineHeight: "58px", letterSpacing: "-0.025em" },
        ],
        "heading-40-medium": [
          "40px",
          { lineHeight: "48px", letterSpacing: "-0.025em" },
        ],
        "heading-40-regular": [
          "40px",
          { lineHeight: "50px", letterSpacing: "-0.02em" },
        ],
        "heading-36-medium": [
          "36px",
          { lineHeight: "44px", letterSpacing: "-0.02em" },
        ],
        "heading-36-regular": [
          "36px",
          { lineHeight: "46px", letterSpacing: "-0.015em" },
        ],
        "heading-32-medium": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.015em" },
        ],
        "heading-32-regular": [
          "32px",
          { lineHeight: "42px", letterSpacing: "-0.01em" },
        ],
        "heading-28-medium": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em" },
        ],
        "heading-28-regular": [
          "28px",
          { lineHeight: "38px", letterSpacing: "-0.005em" },
        ],
        "subheading-24-medium": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.0075em" },
        ],
        "subheading-24-regular": [
          "24px",
          { lineHeight: "34px", letterSpacing: "-0.005em" },
        ],
        "subheading-20-medium": [
          "20px",
          { lineHeight: "28px", letterSpacing: "-0.0025em" },
        ],
        "subheading-20-regular": [
          "20px",
          { lineHeight: "30px", letterSpacing: "0em" },
        ],
        "body-18-medium": ["18px", { lineHeight: "27px", letterSpacing: "0em" }],
        "body-18-regular": [
          "18px",
          { lineHeight: "28px", letterSpacing: "0em" },
        ],
        "body-16-medium": ["16px", { lineHeight: "25px", letterSpacing: "0em" }],
        "body-16-regular": [
          "16px",
          { lineHeight: "26px", letterSpacing: "0em" },
        ],
        "body-15-medium": ["15px", { lineHeight: "23px", letterSpacing: "0em" }],
        "body-15-regular": [
          "15px",
          { lineHeight: "24px", letterSpacing: "0em" },
        ],
        "body-14-medium": [
          "14px",
          { lineHeight: "22px", letterSpacing: "0.0025em" },
        ],
        "body-14-regular": [
          "14px",
          { lineHeight: "22px", letterSpacing: "0em" },
        ],
        "caption-13-medium": [
          "13px",
          { lineHeight: "21px", letterSpacing: "0.0075em" },
        ],
        "caption-13-regular": [
          "13px",
          { lineHeight: "21px", letterSpacing: "0.005em" },
        ],
        "caption-12-medium": [
          "12px",
          { lineHeight: "19px", letterSpacing: "0.0125em" },
        ],
        "caption-12-regular": [
          "12px",
          { lineHeight: "20px", letterSpacing: "0.01em" },
        ],
        "caption-11-medium": [
          "11px",
          { lineHeight: "18px", letterSpacing: "0.0175em" },
        ],
        "caption-11-regular": [
          "11px",
          { lineHeight: "18px", letterSpacing: "0.015em" },
        ],
        "caption-10-medium": [
          "10px",
          { lineHeight: "17px", letterSpacing: "0.0225em" },
        ],
        "caption-10-regular": [
          "10px",
          { lineHeight: "17px", letterSpacing: "0.02em" },
        ],
      },
    },
  },
  plugins: [],
}

export default config
