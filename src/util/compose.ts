export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return <T>(arg: T): T => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => <T>(...args: T[]) => a(b(...args)));
}
