import { defineConfig } from "vitepress";

export const zh = defineConfig({
  themeConfig: {
    nav: [{ text: '首页', link: '/zh/' }],
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2022-${new Date().getFullYear()} G.Y`,
    },
  },
});
