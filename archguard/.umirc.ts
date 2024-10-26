import { defineConfig } from "umi";

export default defineConfig({
  title: "ArchGuard - 守护架构，放权代码",
  // nodeModulesTransform: {
  //   type: "none",
  //   exclude: [],
  // },
  // for Jupyter libs: zeromq, jmq,
  // extraBabelPlugins: ["@babel/plugin-transform-modules-commonjs"],
  devtool: false,
  hash: true,
  // antd: {},
  // dva: false,
  esbuildMinifyIIFE: true,
  plugins: ['@umijs/plugins/dist/locale'],
  locale: {
    default: "zh-CN",
  },
  // devServer: { port: 8081 },
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
    { path: "/", redirect: "/analysis/home" },
    { path: "/home", redirect: "/analysis/home" },
    {
      path: "/workbench",
      component: "@/components/Layouts/main/MainLayout",
      routes: [
        {
          path: "home",
          component: "@/pages/workbench/Workbench",
          title: 'ArchGuard - Workbench (ALPHA)',
        },
      ],
    },
    {
      path: "/insights",
      component: "@/components/Layouts/main/MainLayout",
      routes: [
        {
          path: "home",
          component: "@/pages/insights/Insights",
          title: 'ArchGuard Insights - Architecture Insights'
        },
      ],
    },
    {
      path: "/analysis",
      component: "@/components/Layouts/main/MainLayout",
      routes: [
        {
          path: "home",
          component: "@/pages/system/home/Home",
          title: 'ArchGuard - Subsystem Analysis',
        },
        {
          path: "code-analysis",
          component: "@/pages/codeAnalysis/CodeAnalysis",
          title: 'ArchGuard - Code Analysis'
        },
        {
          path: "change-diff",
          component: "@/pages/changeDiff/ChangeDiff",
        },
      ],
    },
    {
      exact: false,
      path: "/visual",
      component: "@/components/Layouts/main/MainLayout",
      routes: [
        {
          path: "services-map",
          component: "@/pages/servicesMap/ServicesMap",
        },
        {
          path: "database-map",
          component: "@/pages/databaseMap/DatabaseMap",
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
      component: "@/components/Layouts/subSystem/SubSystemLayout",
      title: "ArchGuard - Subsystem Analysis",
      routes: [
        {
          path: "analysis/dependence/Dependence",
          component: "@/pages/dependence/Dependence",
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
          path: "analysis/metric",
          component: "@/pages/system/metric/Metric",
        },
        {
          path: "analysis/metric/Dfms",
          component: "@/pages/system/metric/Dfms",
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
