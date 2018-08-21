/* eslint-disable camelcase */
import {createGLContext, assembleShaders, picking, fp64} from 'luma.gl';
// import {getShaderModule} from 'luma.gl/shadertools/src/lib/resolve-modules';
// import {makeSpy} from 'probe.gl/test-utils';
import test from 'tape-catch';

const fixture = {
  gl: createGLContext()
};

const VS_GLSL_300 = `\
#version 300 es

in vec4 positions;

void main(void) {
  gl_Position = positions;
}
`;
const FS_GLSL_300 = `\
#version 300 es

precision highp float;

out vec4 fragmentColor;

void main(void) {
  fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

test('assembleShaders#import', t => {
  t.ok(assembleShaders !== undefined, 'assembleShaders import successful');
  t.end();
});

test('assembleShaders#version_directive', t => {
  const assembleResult = assembleShaders(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300,
    modules: [picking]
  });
  // Verify version directive remains as first line.
  t.equal(assembleResult.vs.indexOf('#version 300 es'), 0,
    'version directive should be first statement');
  t.equal(assembleResult.fs.indexOf('#version 300 es'), 0,
    'version directive should be first statement');
  t.end();
});

test('assembleShaders#getUniforms', t => {

  const testModuleSettings = {pickingActive: true};

  // inject spy into the picking module's getUniforms
  // const module = getShaderModule(picking);
  // const getUniformsSpy = makeSpy(module, 'getUniforms');

  let assembleResult;

  // Without shader modules
  assembleResult = assembleShaders(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300
  });
  // Verify getUniforms is function
  t.is(typeof assembleResult.getUniforms, 'function', 'getUniforms should be function');

  // With shader modules
  const testModule = {
    name: 'test-module',
    vs: '',
    fs: '',
    getUniforms: (opts, context) => {
      // Check a uniform generated by its dependency
      t.ok(context.picking_uActive, 'module getUniforms is called with correct context');
      return {};
    },
    dependencies: ['picking']
  };

  assembleResult = assembleShaders(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300,
    modules: [picking, testModule, fp64]
  });

  // Verify getUniforms is function
  t.is(typeof assembleResult.getUniforms, 'function', 'getUniforms should be function');

  assembleResult.getUniforms(testModuleSettings);

  // t.ok(module.getUniforms.called, 'module getUniforms is called');

  // TODO: probe.gl spy does not yet support args
  // t.deepEqual(
  //   picking.getUniforms.getCall(0).args[0],
  //   testModuleSettings,
  //   'module getUniforms is called with correct opts');

  // t.ok(testModule.getUniforms.calledAfter(picking.getUniforms),
  //   'module getUniforms is called after its dependencies');

  // TODO: probe.gl spy does not yet support args
  // t.deepEqual(
  //   testModule.getUniforms.getCall(0).args[0],
  //   testModuleSettings,
  //   'module getUniforms is called with correct opts');

  // getUniformsSpy.restore();

  t.end();
});
