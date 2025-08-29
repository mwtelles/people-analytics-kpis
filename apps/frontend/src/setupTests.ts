import "@testing-library/jest-dom";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserverMock;
  }
  interface Global extends Window {}
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
