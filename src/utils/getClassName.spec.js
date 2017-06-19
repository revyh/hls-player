import getClassName from './getClassName';

const getStyles = () => ({
  firstMod: 'base firstMod',
  secondMod: 'base secondMod',
});

it('should always return className if awailable', () => {
  const className = {className: 'someClass'};

  expect(getClassName(getStyles(), className))
    .toBe('someClass');

  expect(getClassName(getStyles(), className, 'fallback'))
    .toBe('someClass fallback');

  expect(getClassName(getStyles(), {...className, mods: 'firstMod'}, 'fallback'))
    .toBe('someClass base firstMod');
});

it('should add modificator class names', () => {
  expect(getClassName(getStyles(), {mods: 'firstMod'}, 'fallback'))
    .toBe('base firstMod');
});

it('should add class names for array of modificators', () => {
  expect(getClassName(getStyles(), {mods: ['firstMod', 'secondMod']}, 'fallback'))
    .toBe('base firstMod base secondMod');
});

it('should return fallback for no modificator', () => {
  expect(getClassName(getStyles(), {}, 'fallback')).toBe('fallback');
});

it('should return empty string for no modificator and fallback', () => {
  expect(getClassName(getStyles(), {})).toBe('');
});

it('should filter out unexpected modificator from array', () => {
  expect(getClassName(getStyles(), {mods: ['unexpectedMod', 'firstMod']}, 'fallback'))
    .toBe('base firstMod');
});

it('should return fallback for unexpected modificator', () => {
  expect(getClassName(getStyles(), {mods: 'unexpectedMod'}, 'fallback'))
    .toBe('fallback');
});

it('should return empty string for unexpected modificator and no fallback', () => {
  expect(getClassName(getStyles(), {mods: 'unexpectedMod'}))
    .toBe('');
});
