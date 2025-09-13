import React, { useEffect, useRef, useState } from "react";

interface SplineViewerProps {
  url: string;
  className?: string;
}

const SplineViewer: React.FC<SplineViewerProps> = ({ url, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically load the Spline web component script if not already loaded
    if (!document.querySelector("script[data-spline-viewer]")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js";
      script.setAttribute("data-spline-viewer", "true");
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Remove any previous viewer
    container.innerHTML = "";
    // Create the spline-viewer element
    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", url);
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.display = "block";
    viewer.style.border = "none";
    viewer.style.outline = "none";
    viewer.setAttribute("touch-action", "auto");
    // Listen for load event
    const handleLoad = () => setLoading(false);
    viewer.addEventListener("load", handleLoad);
    // Listen for error (optional)
    viewer.addEventListener("error", () => setLoading(false));
    container.appendChild(viewer);
    // Clean up
    return () => {
      viewer.removeEventListener("load", handleLoad);
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        minHeight: 400,
        overflow: "hidden",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(9,29,35,0.7)",
            zIndex: 2,
          }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#F8D991] border-opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default SplineViewer;
