import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
    exclude: [],
  },
  // for Jupyter libs: zeromq, jmq,
  extraBabelPlugins: ["@babel/plugin-transform-modules-commonjs"],
  devtool: false,
  hash: true,
  antd: {},
  dva: false,
  locale: {
    default: "zh-CN",
  },
  devServer: { port: 8081 },
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
  analyze: {
    analyzerMode: "server",
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: "stats.json",
    logLevel: "info",
    defaultSizes: "parsed", // stat  // gzip
  },
  routes: [
    { path: "/", redirect: "/system/home" },
    { path: "/home", redirect: "/system/home" },
    {
      path: "/system",
      component: "@/components/Business/Layouts/june/JuneLayout",
      routes: [
        {
          path: "home",
          component: "@/pages/home",
        },
      ],
    },
    {
      path: "/workbench",
      component: "@/components/Business/Layouts/june/JuneLayout",
      routes: [
        {
          path: "home",
          component: "@/pages/interactiveAnalysis/InteractiveAnalysis",
        },
      ],
    },
    {
      path: "/analysis",
      component: "@/components/Business/Layouts/june/JuneLayout",
      routes: [
        {
          path: "code-analysis",
          component: "@/pages/code",
        },
      ],
    },
    {
      exact: false,
      path: "/visual",
      component: "@/components/Business/Layouts/june/JuneLayout",
      routes: [
        {
          path: "services-map",
          component: "@/pages/servicesMap/ServicesMap",
        },
        {
          path: "data-map",
          component: "@/pages/data/DatabaseMap",
        },
        {
          path: "message-map",
          component: "@/pages/messageMap/MessageMap",
        },
      ],
    },
    {
      exact: false,
      path: "/:systemId",
      component: "@/components/Business/Layouts/PageLayout",
      routes: [
        {
          path: "analysis/dependence",
          component: "@/pages/dependence",
        },
        {
          path: "systemSummary/Summary",
          component: "@/pages/system/systemSummary/Summary/Summary",
        },
        {
          path: "systemEvolving/MeasureIndicators",
          component: "@/pages/system/systemEvolving/MeasureIndicators/MeasureIndicators",
        },
        {
          path: "systemEvaluation/Redundancy",
          component: "@/pages/system/systemEvaluation/Redundancy/Redundancy",
        },
        {
          path: "systemEvaluation/SizingEvaluation",
          component: "@/pages/system/systemEvaluation/SizingEvaluation/SizingEvaluation",
        },
        {
          path: "systemEvaluation/CouplingEvaluation",
          component: "@/pages/system/systemEvaluation/CouplingEvaluation/CouplingEvaluation",
        },
        {
          path: "systemEvaluation/cohesionEvaluation",
          component: "@/pages/system/systemEvaluation/CohesionEvaluation/CohesionEvaluation",
        },
        {
          path: "analysis/metric/:type?",
          component: "@/pages/system/metrics",
        },
        {
          path: "systemAnalysis/Issue",
          component: "@/pages/system/systemAnalysis/Issue/Issue",
        },
        {
          path: "systemAnalysis/ApiAnalysis",
          component: "@/pages/system/systemAnalysis/ApiAnalysis/ApiAnalysis",
        },
        {
          path: "systemEvolving",
          component: "@/pages/system/systemEvolving/SystemEvolving",
        },
        {
          path: "systemEvolving/QualityGateProfile",
          component: "@/pages/system/systemEvolving/QualityGateProfile/QualityGateProfile",
        },
        {
          path: "systemEvaluation/TestEvaluation",
          component: "@/pages/system/systemEvaluation/TestEvaluation/TestEvaluation",
        },
        {
          path: "systemEvolving/BadSmellThreshold",
          component: "@/pages/system/systemEvolving/BadSmellThreshold/BadSmellThreshold",
        },
      ],
    },
  ],
  theme: {
    "@primary-color": "#3AAFAE",
  },
});
