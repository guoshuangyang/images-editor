const ImagesEditor = require('../src/index')
test("version is 0.0.1?", () => {
    const test = ImagesEditor;
    expect(test()).toBe("0.0.1-beta.0");
});
