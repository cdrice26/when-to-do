module.exports = {
  presets: ['next/babel'],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react']
    }
  }
};
