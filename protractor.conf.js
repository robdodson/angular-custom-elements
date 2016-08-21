exports.config = {
  specs: [
    'test/**/*-spec.js'
  ],
  multiCapabilities: [
    {
      browserName: 'chrome'
    },
    {
      browserName: 'firefox'
    }
  ]
};