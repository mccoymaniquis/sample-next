import { useEffect, useRef } from "react";

export function useHorizontalDrag(tableName?: string, shouldDisableDraggingRef?: boolean) {
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const isGrabbingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let tableContainer = document.querySelector("tbody") as HTMLDivElement;

    if (tableName) {
      tableContainer = document.querySelector(
        `#${tableName}`,
      ) as HTMLDivElement;
    }

    if (!tableContainer)
      return;
    tableContainerRef.current = tableContainer;

    const handleMouseDown = (e: MouseEvent) => {
      if (shouldDisableDraggingRef)
        return;

      isGrabbingRef.current = true;
      startXRef.current = e.pageX - tableContainer.offsetLeft;
      scrollLeftRef.current = tableContainer.scrollLeft;
      tableContainer.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isGrabbingRef.current || shouldDisableDraggingRef)
        return;
      e.preventDefault();

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const x = e.pageX - tableContainer.offsetLeft;
        const walk = (x - startXRef.current) * 2; // Adjust sensitivity
        tableContainer.scrollLeft = scrollLeftRef.current - walk;
      });
    };

    const handleMouseUp = () => {
      isGrabbingRef.current = false;
      tableContainer.style.cursor = "grab";
    };

    tableContainer.addEventListener("mousedown", handleMouseDown);
    tableContainer.addEventListener("mousemove", handleMouseMove);
    tableContainer.addEventListener("mouseup", handleMouseUp);
    tableContainer.addEventListener("mouseleave", handleMouseUp);

    return () => {
      tableContainer.removeEventListener("mousedown", handleMouseDown);
      tableContainer.removeEventListener("mousemove", handleMouseMove);
      tableContainer.removeEventListener("mouseup", handleMouseUp);
      tableContainer.removeEventListener("mouseleave", handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [tableName, shouldDisableDraggingRef]);

  return { tableContainerRef };
}
