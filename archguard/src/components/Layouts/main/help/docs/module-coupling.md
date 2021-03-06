# 模块耦合度

- **耦合度**：是对模块间关联程度的度量。耦合的强弱取决于模块间接口的复杂性、调用模块的方式以及通过界面传送数据的多少。模块间的耦合度是指模块之间的依赖关系，包括控制关系、调用关系、数据传递关系。模块间联系越多，其耦合性越强，同时表明其独立性越差( 降低耦合性，可以提高其独立性)。定量化衡量指标是：`耦合度(C) = 1 - 1 / (入向依赖数量 + 出向依赖数量)`
- **不稳定性**：组件的稳定性指的是它的变更成本。影响组件的变更成本的因素有很多，比如组件的代码量大小、复杂度、清晰度等等，最最重要的因素是依赖它的组件数量，让组件难以修改的一个最直接的办法就是让很多其他组件依赖于它！定量化衡量指标是：`不稳定性(I) = 出向依赖数量 / (入向依赖数量 + 出向依赖数量)`。
- **内部/外部**：根据自定义的 logic module 关系，将耦合度与不稳定性指标划分为逻辑模块内部相互调用的 Inner 指标以及逻辑模块间（即外部）的 Outer 指标
