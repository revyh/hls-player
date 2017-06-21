import deepFreeze from 'deep-freeze';
import {actions, reducer, selectors, actionTypes} from '.';

// eslint-disable-next-line no-var
var mockXhr;

jest.mock('utils/xhr', () => {
  mockXhr = mockXhr || jest.fn(() => Promise.resolve('{}'));
  return mockXhr;
});

function createState({
  url = null,
  title = '',
} = {}) {
  return {title, url};
}

function genActionMocks(state) {
  return {
    mockDispatch: jest.fn(),
    mockGetState: jest.fn(() => state || createState()),
  };
}

describe('actions', () => {
  it('should create \'setMedia\' start action', () => {
    const {mockDispatch, mockGetState} = genActionMocks();

    actions.setMedia('some-media-url')(mockDispatch, mockGetState);

    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: actionTypes.LOAD_MEDIA_START,
    });
  });

  it('should create \'setMedia\' success action', () => {
    const {mockDispatch, mockGetState} = genActionMocks();
    const mockPromise = Promise.resolve(JSON.stringify({
      url: 'some-url',
      title: 'some-title',
    }));
    mockXhr.mockReturnValueOnce(mockPromise);

    actions.setMedia('some-media-url')(mockDispatch, mockGetState);

    return mockPromise.then(() => {
      expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: actionTypes.LOAD_MEDIA_SUCCESS,
        payload: {
          url: 'some-url',
          title: 'some-title',
        },
      });
    });
  });

  it('should create \'setMedia\' fail action', () => {
    const {mockDispatch, mockGetState} = genActionMocks();
    const mockError = new Error('some error');
    mockError.status = 404;
    mockError.statusText = '404';

    const mockPromise = Promise.reject(mockError);
    mockXhr.mockReturnValueOnce(mockPromise);

    actions.setMedia('some-media-url')(mockDispatch, mockGetState);

    return mockPromise.catch(() => {
      expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: actionTypes.LOAD_MEDIA_FAIL,
        payload: mockError,
      });
    });
  });
});


describe('reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual({
      url: null,
      title: '',
    });
  });

  it('should not change state on unknown action', () => {
    const state = createState();

    expect(reducer(state, {type: 'UNKNOWN_ACTION'})).toBe(state);
  });

  it('should reset media on load', () => {
    const state = createState({
      url: 'some-url',
      title: 'some-title',
    });
    const action = {
      type: actionTypes.LOAD_MEDIA_START,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      url: null,
      title: '',
    });
  });

  it('should set media on success load', () => {
    const state = createState();
    const action = {
      type: actionTypes.LOAD_MEDIA_SUCCESS,
      payload: {
        url: 'some-url',
        title: 'some-title',
      },
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      url: 'some-url',
      title: 'some-title',
    });
  });
});

describe('selectors', () => {
  it('should select media state', () => {
    const state = createState();

    expect(selectors.media(state)).toEqual(state);
  });
});
