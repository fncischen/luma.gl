// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const path = require('path');

const ALIASES = {
  'luma.gl/test': path.resolve(__dirname, './test'),
  'luma.gl/constants': path.resolve(__dirname, './modules/core/constants'),
  'luma.gl': path.resolve(__dirname, './modules/core/src'),
  'dev-modules': path.resolve(__dirname, './dev-modules'),
  '@luma.gl/constants': path.resolve(__dirname, './modules/constants/src'),
  '@luma.gl/debug': path.resolve(__dirname, './modules/debug/src'),
  '@luma.gl/glfx': path.resolve(__dirname, './modules/glfx/src'),
  '@luma.gl/gpgpu': path.resolve(__dirname, './modules/gpgpu/src'),
  '@luma.gl/imageprocessing': path.resolve(__dirname, './modules/imageprocessing/src'),
  '@luma.gl/io': path.resolve(__dirname, './modules/io/src'),
  '@luma.gl/shadertools': path.resolve(__dirname, './modules/shadertools/src')
};

if (module.require) {
  // Enables ES2015 import/export in Node.js
  module.require('reify');

  const moduleAlias = module.require('module-alias');
  moduleAlias.addAliases(ALIASES);
}

module.exports = ALIASES;
