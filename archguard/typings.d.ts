declare module '*.css';
declare module "*.png";
declare module '*.less';
declare module 'react-highlight-words';
declare module 'markdown-navbar';

// https://github.com/antvis/G6/issues/2806
declare module '@antv/g6/dist/g6.min.js' {
  const content: typeof import('@antv/g6')
  export default content
}
