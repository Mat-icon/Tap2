// src/lib/utils/observer.ts
export function intersect(
  node: HTMLElement,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const observer = new IntersectionObserver(([entry]) => {
    node.dispatchEvent(new CustomEvent("intersect", { detail: entry.isIntersecting }));
  }, options);

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    }
  };
}
