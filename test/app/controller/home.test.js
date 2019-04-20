'use strict';
const {
  app,
  // assert,
} = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  // assert(true);
  it('[GET] [URL]: / ', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });
});
