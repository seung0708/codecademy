export function clearChildren (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
