export function renderList(containerElement, items, templateFn) {
  containerElement.innerHTML = '';
  items.forEach((item) => {
    const element = document.createElement('div');
    element.innerHTML = templateFn(item);
    containerElement.appendChild(element);
  });
}
