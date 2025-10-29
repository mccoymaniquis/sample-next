export function handleMouseEnter(columnId: string) {
  document
    .querySelectorAll(`td[data-column-id="${columnId}"]`)
    .forEach((cell) => {
      (cell as HTMLElement).style.backgroundColor = "rgb(236 242 254)";
    });

  const thead: HTMLTableCellElement | null = document.querySelector(
    `th[data-column-id="${columnId}"]`,
  );
  if (thead)
    thead.style.backgroundColor = "#B4B4B4";
}

export function handleMouseLeave(columnId: string) {
  document
    .querySelectorAll(`td[data-column-id="${columnId}"]`)
    .forEach((cell) => {
      (cell as HTMLElement).style.backgroundColor = "transparent";
    });

  const thead: HTMLTableCellElement | null = document.querySelector(
    `th[data-column-id="${columnId}"]`,
  );
  if (thead)
    thead.style.backgroundColor = "#EAE8E8";
}

export function hoverColumnByClass(selector: string, className: string) {
  const column: HTMLTableCellElement | null = document.querySelector(selector);
  if (column)
    column.classList.add(className);
}

export function hoverAllColumnByClass(selector: string, className: string) {
  document.querySelectorAll(selector).forEach((cell) => {
    cell.classList.add(className);
  });
}

export function handleMouseLeaveByClass() {
  document.querySelectorAll("td").forEach((cell) => {
    (cell as HTMLElement).classList.remove("highlight-column");
    (cell as HTMLElement).style.backgroundColor = "transparent";
  });
}
