const { stub, spy, assert } = require("sinon");
const utils = require("../../src/utils");
const helper = require("../../src/helper");

describe("proccessVersion function", () => {
  const resolve = spy((val) => Promise.resolve(val));
  let resolveVersionComparisonStub;
  const node = { current: "9.17.1" };
  const npm = { current: "3.10.0" };

  beforeEach(() => {
    resolveVersionComparisonStub = stub(utils, "resolveVersionComparison");
  });

  afterEach(() => {
    resolveVersionComparisonStub.restore();
  });

  describe("Node version", () => {
    it("Should returns current version when param is not passed", () => {
      helper
        .proccessVersion({
          nodeVersion: node.current,
          resolve
        })
        .then((result) => {
          expect(result).toMatchObject({ node });
        });
    });

    it("Should return current version and expected", () => {
      resolveVersionComparisonStub.returns([-1, "less"]);

      helper
        .proccessVersion({
          nodeVersion: node.current,
          node: "8.17.0",
          resolve
        })
        .then((result) => {
          expect(result).toMatchObject({
            node: Object.assign(node, {
              comparison: 1,
              comparisonString: "greater",
              expected: "8.17.0"
            })
          });
        });
    });
  });

  describe("Npm version", () => {
    it("Should returns node and npm current versions and expected", () => {
      resolveVersionComparisonStub.onCall(0).returns([-1, "less"]);
      resolveVersionComparisonStub.onCall(1).returns([1, "greater"]);

      helper
        .proccessVersion({
          nodeVersion: node.current,
          npmVersion: npm.current,
          node: "8.17.0",
          npm: "2.15.3",
          resolve
        })
        .then((result) => {
          expect(result).toMatchObject({
            node: Object.assign(node, {
              comparison: -1,
              comparisonString: "less",
              expected: "8.17.0"
            }),
            npm: Object.assign(npm, {
              comparison: 1,
              comparisonString: "greater",
              expected: "2.15.3"
            })
          });
        });
    });

    it("Should returns node current/exepcetd version and npm not installed", () => {
      resolveVersionComparisonStub.onCall(0).returns([-1, "less"]);
      resolveVersionComparisonStub.onCall(1).returns([1, "greater"]);

      helper
        .proccessVersion({
          nodeVersion: node.current,
          node: "8.17.0",
          npm: "2.15.3",
          resolve
        })
        .then((result) => {
          expect(result).toMatchObject({
            node: Object.assign(node, {
              comparison: -1,
              comparisonString: "less",
              expected: "8.17.0"
            }),
            npm: Object.assign(
              {},
              {
                current: "not installed",
                expected: "2.15.3"
              }
            )
          });
        });
    });
  });
});
