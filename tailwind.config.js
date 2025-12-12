// tailwind.config.js
import animate from "tailwindcss-animate";

export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0ea5e9",
                secondary: "#06b6d4",
                accent: "#22d3ee",
                success: "#10b981",
                danger: "#ef4444",
                warning: "#f59e0b",
            },
            backgroundImage: {
                "hero-gradient": "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #22d3ee 100%)",
                "card-gradient": "linear-gradient(145deg, #0ea5e9, #22d3ee)",
            },
            boxShadow: {
                "glow": "0 0 30px rgba(14, 165, 233, 0.4)",
                "glow-lg": "0 0 50px rgba(34, 211, 238, 0.5)",
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "fade-in": "fadeIn 1s ease-out",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [animate],
};