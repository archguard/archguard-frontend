import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
    exclude: [],
  },
  hash: true,
  antd: {},
  dva: false,
  devServer: { port: 3000 },
  define: {
    "process.env.BUILD_TARGET": process.env.BUILD_TARGET,
  },
  lessLoader: { javascriptEnabled: true },
  proxy: {
    "/api": {
      target: "https://localhost:10443/",
      changeOrigin: true,
      secure: false,
    },
  },
  routes: [
    {
      path: "/",
      component: "@/layouts/base",
      routes: [
        { path: "/", component: "@/pages/index" },
        { path: "/home", component: "@/pages/home" },
        { path: "/help/:name?", component: "@/pages/help" },
        { path: "/project-scan", component: "@/pages/project-scan" },
        { path: "/system-evaluation", component: "@/pages/system-evaluation" },
        { path: "/system-evaluation/report/:id", component: "@/pages/system-evaluation/report" },
        {
          path: "/retrofit-tools/plsql-to-kotlin",
          component: "@/pages/retrofit-tools/plsql2kotlin",
        },
        { path: "/analysis/dependence/:type?", component: "@/pages/analysis/dependence" },
        { path: "/analysis/plsql", component: "@/pages/analysis/plsql" },
      ],
    },
  ],
});
