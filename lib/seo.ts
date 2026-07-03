export const site = {
  name: "Pei Design",
  url: "https://pei.design",
  author: "Pei Jinxian",
  email: "pjx983447405@outlook.com",
  description:
    "Pei Jinxian is a Product Designer focused on AI products, interaction design, motion, enterprise systems, AI shopping, content creation, and scalable design systems."
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
