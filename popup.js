const keyName = document.getElementById('key-name');
const showKey = () => (keyName.textContent = document.getElementById('fineKey').selectedOptions[0].text);

chrome.storage.sync.get(DEFAULTS, (s) => {
  for (const id in DEFAULTS) document.getElementById(id).value = s[id];
  showKey();
});

// 'input', not 'change': the popup can close before a 'change' fires.
document.addEventListener('input', ({ target: el }) => {
  if (!el.checkValidity()) return;
  chrome.storage.sync.set({ [el.id]: el.type === 'number' ? +el.value : el.value });
  showKey();
});
