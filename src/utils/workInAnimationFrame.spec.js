import workInAnimationFrame from './workInAnimationFrame';

const origFn = jest.fn();

global.requestAnimationFrame = jest.fn();

beforeEach(() => {
  global.requestAnimationFrame.mockReset();
  origFn.mockReset();
});

it('should call rAF', () => {
  workInAnimationFrame(origFn)();

  expect(global.requestAnimationFrame).toHaveBeenCalled();
});

it('should call original function', () => {
  global.requestAnimationFrame.mockImplementationOnce(fn => fn());
  workInAnimationFrame(origFn)();

  expect(origFn).toHaveBeenCalled();
});


it('should pass params to original function', () => {
  global.requestAnimationFrame.mockImplementationOnce(fn => fn());
  workInAnimationFrame(origFn)('some', 'params', 1);

  expect(origFn).toHaveBeenCalledWith('some', 'params', 1);
});

it('should debounce calls to rAF', () => {
  const debouncedFn = workInAnimationFrame(jest.fn());

  debouncedFn();
  debouncedFn();
  debouncedFn();

  expect(global.requestAnimationFrame).toHaveBeenCalledTimes(1);
});
