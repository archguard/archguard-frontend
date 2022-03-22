import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
    exclude: [],
  },
  hash: true,
  antd: {},
  dva: false,
  locale: {
    default: 'zh-CN'
  },
  devServer: { port: 8080 },
  define: {
    "process.env.BUILD_TARGET": process.env.BUILD_TARGET,
  },
  lessLoader: { javascriptEnabled: true },
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
    },
  },
  routes: [
    { path: "/", redirect: "/multipleSystem" },
    { path: "/login", component: "@/pages/login" },
    { path: "/multipleSystem", component: "@/pages/multipleSystem" },
    {
      exact: false,
      path: "/:systemId",
      component: "@/components/Business/Layouts/PageLayout",
      routes: [
        {
          path: "systemSummary/Summary",
          component: "@/pages/systemSummary/Summary/Summary",
        },
        {
          path: "systemEvolving/MeasureIndicators",
          component: "@/pages/systemEvolving/MeasureIndicators/MeasureIndicators",
        },
        {
          path: "systemEvaluation/Redundancy",
          component: "@/pages/systemEvaluation/Redundancy/Redundancy",
        },
        {
          path: "systemEvaluation/SizingEvaluation",
          component: "@/pages/systemEvaluation/SizingEvaluation/SizingEvaluation",
        },
        {
          path: "systemEvaluation/CouplingEvaluation",
          component: "@/pages/systemEvaluation/CouplingEvaluation/CouplingEvaluation",
        },
        {
          path: "systemEvaluation/cohesionEvaluation",
          component: "@/pages/systemEvaluation/CohesionEvaluation/CohesionEvaluation",
        },
        {
          path: "analysis/metric/:type?",
          component: "@/pages/analysis/metrics",
        },
        {
          path: "analysis/dependence",
          component: "@/pages/analysis/dependence",
        },
        {
          path: "systemEvolving",
          component: "@/pages/systemEvolving/SystemEvolving",
        },
        {
          path: "systemEvolving/QualityGateProfile",
          component: "@/pages/systemEvolving/QualityGateProfile/QualityGateProfile",
        },
        {
          path: "systemEvaluation/TestEvaluation",
          component: "@/pages/systemEvaluation/TestEvaluation/TestEvaluation",
        },
        {
          path: "systemEvolving/BadSmellThreshold",
          component: "@/pages/systemEvolving/BadSmellThreshold/BadSmellThreshold",
        },
        {
          path: "systemEvolving/BadSmellOverview",
          component: "@/pages/systemEvolving/BadSmellOverview/BadSmellOverview",
        },
      ],
    },
  ],
  theme: {
    "@primary-color": "#3AAFAE",
  },
});
