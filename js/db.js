function getLocal() {
  return JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
}

function setLocal(list) {
  localStorage.setItem('bem_all_subs', JSON.stringify(list));
}

window.db = {
  list() {
    return getLocal();
  },
  create(sub) {
    const list = getLocal();
    list.unshift(sub);
    setLocal(list);
    localStorage.setItem('bem_subscription', JSON.stringify(sub));
  },
  updateStatus(ref, status) {
    const list = getLocal();
    const idx = list.findIndex(s => s.ref === ref);
    if (idx !== -1) { list[idx].status = status; setLocal(list); }
  },
  remove(ref) {
    setLocal(getLocal().filter(s => s.ref !== ref));
  },
  clearAll() {
    localStorage.removeItem('bem_all_subs');
    localStorage.removeItem('bem_subscription');
  }
};
