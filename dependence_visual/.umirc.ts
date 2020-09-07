import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
    exclude: [],
  },
  hash: true,
  antd: {},
  dva: false,
  devServer: { port: 8080 },
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
    { path: '/', redirect: '/multiple-system' },
    { path: "/login", component: "@/pages/login" },
    { path: "/multiple-system", component: "@/pages/multiple-system" },
    {
      path: "/:systemId",
      component: "@/layouts/base",
      routes: [
        { path: "test", component: "@/pages/test" },
        // { path: "home", component: "@/pages/home" },
        { path: "help/:name?", component: "@/pages/help" },
        { path: "system-evaluation", component: "@/pages/system-evaluation" },
        { path: "system-evaluation/QualityEvaluation", component: "@/pages/QualityEvaluation/QualityEvaluation" },
        { path: "system-evaluation/sizing-evaluation", component: "@/pages/SizingEvaluation/SizingEvaluation" },
        { path: "system-evaluation/coupling-evaluation", component: "@/pages/CouplingEvaluation/CouplingEvaluation" },
        { path: "system-evaluation/report/:id", component: "@/pages/system-evaluation/report" },
        {
          path: "retrofit-tools/plsql-to-kotlin",
          component: "@/pages/retrofit-tools/plsql2kotlin",
        },
        { path: "system-evolving", component: "@/pages/system-evolve" },
        { path: "analysis/dependence/:type?", component: "@/pages/analysis/dependence" },
        { path: "quality-gate-profile", component: "@/pages/quality-gate-profile" },
        { path: "metric/:type?", component: "@/pages/metrics" },
      ]
    },
  ],
  theme: {
    "@primary-color": "#3AAFAE",
  },
});
