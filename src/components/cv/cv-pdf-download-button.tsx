"use client";

import { useCallback } from "react";

export function CVPdfDownloadButton() {
  const handleDownload = useCallback(async () => {
    const html2pdf = (await import("html2pdf.js")).default;

    const element = document.getElementById("cv-content");
    if (!element) return;

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: "thomas-van-der-meer-cv.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0D1610",
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
    };

    html2pdf().set(opt).from(element).save();
  }, []);

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg border border-[#5F8C6B]/15 bg-[#152119] px-4 py-2 text-sm font-medium text-[#E8F0E9] hover:bg-[#1E2D24] hover:shadow-[#5F8C6B]/10 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#5F8C6B] focus:ring-offset-2 focus:ring-offset-[#0D1610]"
      aria-label="Download CV as PDF"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download CV as PDF
    </button>
  );
}
