export const site = {
  name: "AI Product Designer Portfolio",
  url: "https://pei.design",
  author: "Pei",
  email: "hello@pei.design",
  description:
    "AI Product Designer and UI/UX Designer portfolio focused on AI-native products, agent workflows, design systems, and measurable product outcomes."
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
