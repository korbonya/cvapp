(function () {
  const shareBtn = document.getElementById('btn-share');
  const printBtn = document.getElementById('btn-print');
  const toast = document.getElementById('toast');
  const body = document.body;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  function doShare() {
    const shareData = {
      title: document.title,
      text: 'Consultez le CV de Mamadou Alpha Baldé',
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData)
        .catch(() => {})
        .finally(() => showToast('Lien partagé (ou action annulée)'));
    } else if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareData.url)
        .then(() => showToast('Lien copié dans le presse-papiers'))
        .catch(() => showToast('Impossible de copier le lien'));
    } else {
      // Fallback prompt
      const ok = window.prompt('Copiez le lien ci-dessous', shareData.url);
      if (ok !== null) showToast('Lien prêt à être partagé');
    }
  }

  function doPrint() {
    // Enable print design mode to preserve accents/gradients, then print
    enablePrintDesign();
    // Allow layout to settle before invoking print
    setTimeout(() => {
      window.print();
      showToast('Utilisez "Enregistrer en PDF" dans la boîte d’impression');
    }, 50);
  }

  function enablePrintDesign() {
    body.classList.add('print-design');
  }

  function disablePrintDesign() {
    body.classList.remove('print-design');
  }

  // Ensure print-design mode applies even when user uses Ctrl+P or browser menu
  window.addEventListener('beforeprint', enablePrintDesign);
  window.addEventListener('afterprint', disablePrintDesign);

  // Fallback for browsers using matchMedia change events
  if (window.matchMedia) {
    const mql = window.matchMedia('print');
    // Some older browsers use addListener/removeListener
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', (e) => {
        if (e.matches) enablePrintDesign();
        else disablePrintDesign();
      });
    } else if (typeof mql.addListener === 'function') {
      mql.addListener((e) => {
        if (e.matches) enablePrintDesign();
        else disablePrintDesign();
      });
    }
  }

  if (shareBtn) shareBtn.addEventListener('click', doShare);
  if (printBtn) printBtn.addEventListener('click', doPrint);
})();
