// https://medium.com/@tatismolin/testing-your-react-app-with-mocha-chai-and-other-beverages-e9a16ca7b9bb

module.exports = (api) => {
  const presets = ["react-app"];
  const plugins = [
      "@babel/plugin-transform-modules-commonjs",
  ]; 

  api.cache(false); 
 
  return {
      presets,
      plugins
  };
};
