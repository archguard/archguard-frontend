export const FEATURES = {
  CODE_SCANNER: "CODE_SCANNER",
  INSIDE_FEATURE: "INSIDE_FEATURE",
};

const config = {
  features: {
    CODE_SCANNER: {
      zh: false,
      default: true,
    },
    INSIDE_FEATURE: {
      zh: false,
    },
  },
};

export const BUILD_TARGET = process.env.BUILD_TARGET || "default";

export function getFeature(name) {
  const feature = config.features[name];
  const featureEnabled = feature[BUILD_TARGET];
  return featureEnabled !== undefined ? featureEnabled : true;
}

export function configForTargets(configs) {
  const config = configs[BUILD_TARGET];
  return config || configs["default"];
}
