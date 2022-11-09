export const toIdleTask = (callback: () => void) => {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 0);
  }
};

/**
 * 組み合わせを順番に取り出す
 * @param {T[]} ary 対象の配列
 * @param {number} len 組み合わせの長さ
 * @return {Generator<T[], void, void>}
 */
export function* combination<T>(ary: T[], len: number) {
  function* gfn(a: T[], ary: T[]): Generator<T[], void, void> {
    if (a.length < len) {
      for (let i = 0; i < ary.length - len + a.length + 1; i++) {
        yield* gfn(a.concat(ary[i]), ary.slice(i + 1));
      }
    } else yield a;
  }

  yield* gfn([], ary);
}
