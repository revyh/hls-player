import classNames from 'classnames';

export default function getClassName(styles, props, fallback) {
  let mods = Array.isArray(props.mods)
    ? props.mods
    : [props.mods || ''];

  mods = mods.reduce(
    (result, next) => {
      if (styles[next])
        result.push(styles[next]);

      return result;
    },
    [],
  );

  mods = mods.length
    ? mods
    : fallback;

  return classNames(props.className, mods);
}
