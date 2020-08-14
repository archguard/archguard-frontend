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
      target: "https://ec2-68-79-38-105.cn-northwest-1.compute.amazonaws.com.cn:10443/",
      // target: "https://localhost:10443/",
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
        { path: "/test", component: "@/pages/test" },
        { path: "/home", component: "@/pages/home" },
        { path: "/help/:name?", component: "@/pages/help" },
        { path: "/system-evaluation", component: "@/pages/system-evaluation" },
        { path: "/system-evaluation/report/:id", component: "@/pages/system-evaluation/report" },
        {
          path: "/retrofit-tools/plsql-to-kotlin",
          component: "@/pages/retrofit-tools/plsql2kotlin",
        },
        { path: "/analysis/dependence/:type?", component: "@/pages/analysis/dependence" },
        { path: "/quality-gate-profile", component: "@/pages/quality-gate-profile" },
      ],
    },
  ],
});
