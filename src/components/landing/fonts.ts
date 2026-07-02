import { Fraunces } from "next/font/google";

// Display serif used only for landing-page headlines. The rest of the
// product (and the rest of this page) inherits the app-wide monospace body
// font set on <body> in the root layout, so this stays scoped to
// components under `components/landing`.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});
