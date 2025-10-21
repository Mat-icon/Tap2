declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'use:intersect'?: any;
    'on:intersect'?: (event: CustomEvent<boolean>) => void;
  }
}