import atelierHero from "../assets/projects/atelier-identity-0.png";
import atelierOne from "../assets/projects/atelier-identity-1.png";
import atelierTwo from "../assets/projects/atelier-identity-2.png";
import atelierThree from "../assets/projects/atelier-identity-3.png";
import northstarHero from "../assets/projects/northstar-ui-0.png";
import northstarOne from "../assets/projects/northstar-ui-1.png";
import northstarTwo from "../assets/projects/northstar-ui-2.png";
import northstarThree from "../assets/projects/northstar-ui-3.png";
import kineticHero from "../assets/projects/kinetic-archive-0.png";
import kineticOne from "../assets/projects/kinetic-archive-1.png";
import kineticTwo from "../assets/projects/kinetic-archive-2.png";
import kineticThree from "../assets/projects/kinetic-archive-3.png";
import signalHero from "../assets/projects/signal-system-0.png";
import signalOne from "../assets/projects/signal-system-1.png";
import signalTwo from "../assets/projects/signal-system-2.png";
import signalThree from "../assets/projects/signal-system-3.png";
import editorialHero from "../assets/projects/editorial-lab-0.png";
import editorialOne from "../assets/projects/editorial-lab-1.png";
import editorialTwo from "../assets/projects/editorial-lab-2.png";
import editorialThree from "../assets/projects/editorial-lab-3.png";
import motionHero from "../assets/projects/motion-field-0.png";
import motionOne from "../assets/projects/motion-field-1.png";
import motionTwo from "../assets/projects/motion-field-2.png";
import motionThree from "../assets/projects/motion-field-3.png";

export const filters = ["All", "Branding", "UI/UX", "Motion"];

export const projects = [
  {
    id: "atelier-rue",
    title: "Atelier Rue",
    category: "Branding",
    client: "Atelier Rue",
    year: "2026",
    role: "Brand Strategy, Visual Identity",
    description:
      "A restrained identity system for a boutique interiors studio, built around tactile print language, quiet typographic contrast, and a flexible set of editorial marks.",
    hero: atelierHero,
    gallery: [atelierOne, atelierTwo, atelierThree],
  },
  {
    id: "northstar-app",
    title: "Northstar App",
    category: "UI/UX",
    client: "Northstar Labs",
    year: "2025",
    role: "Product Design, Design System",
    description:
      "A focused analytics workspace that turns scattered product signals into a calm decision surface for founders and growth teams.",
    hero: northstarHero,
    gallery: [northstarOne, northstarTwo, northstarThree],
  },
  {
    id: "kinetic-archive",
    title: "Kinetic Archive",
    category: "Motion",
    client: "Museum of Form",
    year: "2025",
    role: "Motion Direction, Interaction",
    description:
      "A motion language for a digital archive, pairing rhythmic transitions with tactile image handling so collections feel alive without becoming loud.",
    hero: kineticHero,
    gallery: [kineticOne, kineticTwo, kineticThree],
  },
  {
    id: "signal-studio",
    title: "Signal Studio",
    category: "UI/UX",
    client: "Signal Studio",
    year: "2024",
    role: "UX Architecture, Prototype",
    description:
      "A creative operations tool for agencies that compresses briefs, feedback, asset review, and client approvals into one legible flow.",
    hero: signalHero,
    gallery: [signalOne, signalTwo, signalThree],
  },
  {
    id: "editorial-lab",
    title: "Editorial Lab",
    category: "Branding",
    client: "Editorial Lab",
    year: "2024",
    role: "Identity, Art Direction",
    description:
      "A brand refresh for an independent publishing program, with a modular identity that can move between digital essays, events, and printed editions.",
    hero: editorialHero,
    gallery: [editorialOne, editorialTwo, editorialThree],
  },
  {
    id: "motion-field",
    title: "Motion Field",
    category: "Motion",
    client: "Motion Field",
    year: "2023",
    role: "Animation System, Storyboards",
    description:
      "A compact visual system for motion explainers, designed to make product launches feel precise, warm, and unmistakably human.",
    hero: motionHero,
    gallery: [motionOne, motionTwo, motionThree],
  },
];
