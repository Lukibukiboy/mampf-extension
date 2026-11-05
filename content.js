// Scroll over THymE's speed dropdown to change playback speed (like Enhancer for YouTube).
// Hold Alt for fine steps.
const STEP = 0.1, FINE_STEP = 0.01, MIN = 0.1, MAX = 4;

const video = document.getElementById('video');
const select = document.getElementById('speed');

if (video && select) {
  // Holds non-preset speeds (e.g. 1.3x); hidden so the dropdown list only shows presets.
  const custom = new Option();
  custom.hidden = true;
  select.add(custom);
  select.title = 'Scroll to change speed';

  select.addEventListener('wheel', (e) => {
    if (!e.deltaY) return;
    e.preventDefault();
    const step = e.altKey ? FINE_STEP : STEP;
    const next = video.playbackRate + (e.deltaY < 0 ? step : -step);
    const rate = Math.min(MAX, Math.max(MIN, Math.round(next * 100) / 100));
    video.playbackRate = rate;
    const preset = [...select.options].find((o) => o !== custom && +o.value === rate);
    if (!preset) {
      custom.value = rate;
      custom.text = rate + 'x';
    }
    (preset || custom).selected = true;
  }, { passive: false });
}
