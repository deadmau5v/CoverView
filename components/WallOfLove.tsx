"use client";

import React, { useEffect } from "react";

export default function WallOfLove() {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "https://widget.senja.io/js/iframeResizer.min.js");

    const frame = document.getElementById("senja-frame-902012ea");
    if (frame) {
      frame.setAttribute(
        "src",
        "https://widget.senja.io/widget/902012ea-9b49-433a-96df-5cb43fd9a648"
      );
    }
    document.body.appendChild(script);
  }, []);

  return (
    <div className="h-screen w-full md:h-[800px]">
      <iframe
        id="senja-frame-902012ea"
        title="wall of love"
        src=""
        data-src="https://widget.senja.io/widget/902012ea-9b49-433a-96df-5cb43fd9a648"
        frameBorder="0"
        scrolling="no"
        width="100%"
        height="100%"
        className="mx-auto h-full px-6 py-4 md:w-9/12"
      ></iframe>
    </div>
  );
}
