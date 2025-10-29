export type DownloadBlobProps = {
  blob: Blob;
  fileName: string;
};

export function downloadBlob(props: DownloadBlobProps): void {
  const { blob, fileName } = props;
  try {
    if (!(blob instanceof Blob)) {
      throw new TypeError("Provided input is not a valid Blob.");
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  catch (error) {
    console.error("Failed to download blob:", error);
    throw new Error("Download failed: Blob could not be processed.");
  }
}
