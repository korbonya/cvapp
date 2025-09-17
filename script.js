(function () {
  const shareBtn = document.getElementById('btn-share');
  const printBtn = document.getElementById('btn-print');
  const toast = document.getElementById('toast');

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
    // Use native print dialog; user can select "Save as PDF"
    window.print();
    showToast('Utilisez "Enregistrer en PDF" dans la boîte d’impression');
  }

  if (shareBtn) shareBtn.addEventListener('click', doShare);
  if (printBtn) printBtn.addEventListener('click', doPrint);
})();
