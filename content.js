// Scroll over THymE's speed dropdown to change playback speed (like Enhancer for YouTube).
// Hold the fine-step key (default Alt) for fine steps. Step sizes and key are set in the popup.
const MIN = 0.1, MAX = 4;

let settings = DEFAULTS;
const load = () => chrome.storage.sync.get(DEFAULTS, (s) => (settings = s));
load();
chrome.storage.onChanged.addListener(load);

const video = document.getElementById('video');
const select = document.getElementById('speed');

if (video && select) {
  // Holds non-preset speeds (e.g. 1.3x); hidden so the dropdown list only shows presets.
  const custom = new Option();
  custom.hidden = true;
  select.add(custom);
  select.title = 'Scroll to change speed';

  select.addEventListener('wheel', (e) => {
    const d = e.deltaY || (e.shiftKey && e.deltaX); // Chrome turns Shift+wheel into horizontal scroll
    if (!d) return;
    e.preventDefault();
    const step = e[settings.fineKey] ? settings.fineStep : settings.step;
    const next = video.playbackRate + (d < 0 ? step : -step);
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
