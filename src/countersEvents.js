export default function sendEventToCounters(params) {
  const { action, label } = params;

  // console.log('GOAL: ', `rzd_${action}_${label}`, params);

  if (typeof ym !== 'undefined') {
    // eslint-disable-next-line no-undef
    ym(94762518, 'reachGoal', `rzd_${action}_${label}`);
  }
}
