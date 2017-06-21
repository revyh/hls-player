export default function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - (hours * 3600)) / 60);
  const seconds = Math.floor(time - (hours * 3600) - (minutes * 60));
  const result = hours
    ? [hours, minutes, seconds]
    : [minutes, seconds];

  return result.map(value => `${value}`.padStart(2, '0')).join(':');
}
