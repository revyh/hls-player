import formatTime from './formatTime';

function getFormattedTime(...args) {
  const time = args.reduceRight(
    (accum, value, ind) => accum + ((60 ** (args.length - ind - 1)) * value),
  );

  return formatTime(time);
}

it('should count seconds', () => {
  expect(getFormattedTime(40)).toBe('00:40');
});

it('should count minutes', () => {
  expect(getFormattedTime(3, 35)).toBe('03:35');
});

it('should count hours', () => {
  expect(getFormattedTime(5, 55, 27)).toBe('05:55:27');
});

it('should pad values', () => {
  expect(getFormattedTime(1, 1, 1)).toBe('01:01:01');
});

it('should show only non-zero hours', () => {
  expect(getFormattedTime(1, 0, 0)).toBe('01:00:00');
  expect(getFormattedTime(59, 59)).toBe('59:59');
});

it('should floor float amount of seconds', () => {
  expect(formatTime(3666.8)).toBe('01:01:06');
});
