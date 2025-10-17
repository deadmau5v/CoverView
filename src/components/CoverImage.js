import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CoverImage.css";
import "../assets/css/patterns.css";
import ModernTheme from "./Themes/ModernTheme";
import BasicTheme from "./Themes/BasicTheme";
import OutlineTheme from "./Themes/OutlineTheme";
import PreviewTheme from "./Themes/PreviewTheme";
import StylishTheme from "./Themes/StylishTheme";
import MobileMockupTheme from "./Themes/MobileMockupTheme";
import BackgroundTheme from "./Themes/BackgroundTheme";

const CoverImage = (props) => {
	// hexToRgbA(hex, opacity) {
	// 	var c;
	// 	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
	// 		c = hex.substring(1).split("");
	// 		if (c.length === 3) {
	// 			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
	// 		}
	// 		c = "0x" + c.join("");
	// 		return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + `,${opacity})`;
	// 	}
	// 	throw new Error("Bad Hex");
	// }

	const { theme } = props;

	const parsedWidth = useMemo(() => parseInt(props.width, 10), [props.width]);
	const parsedHeight = useMemo(() => parseInt(props.height, 10), [props.height]);

	const normalizedWidth = Number.isFinite(parsedWidth) && parsedWidth > 0 ? parsedWidth : null;
	const normalizedHeight = Number.isFinite(parsedHeight) && parsedHeight > 0 ? parsedHeight : null;

	const wrapperRef = useRef(null);
	const [scale, setScale] = useState(1);

	useEffect(() => {
		const updateScale = () => {
			if (!wrapperRef.current) return;

			const parent = wrapperRef.current.parentElement;
			const availableWidth = parent ? parent.clientWidth : wrapperRef.current.offsetWidth;
			if (!normalizedWidth) {
				setScale(1);
				return;
			}
			const widthScale = availableWidth ? availableWidth / normalizedWidth : 1;
			const nextScale = Math.min(1, widthScale || 1);

			if (!Number.isFinite(nextScale) || nextScale <= 0) {
				setScale(1);
				return;
			}

			setScale(nextScale);
		};

		updateScale();
		window.addEventListener("resize", updateScale);
		return () => window.removeEventListener("resize", updateScale);
	}, [normalizedWidth]);

	const containerStyle = {
		width: normalizedWidth ? `${normalizedWidth}px` : undefined,
		height: normalizedHeight ? `${normalizedHeight}px` : undefined,
		transform: `scale(${scale})`,
		transformOrigin: "top left",
	};

	const wrapperStyle = {
		width: normalizedWidth && scale ? `${normalizedWidth * Math.min(scale, 1)}px` : "100%",
		maxWidth: "100%",
		height: normalizedHeight && scale ? `${normalizedHeight * scale}px` : "auto",
		margin: "0 auto",
		overflow: "hidden",
	};

	const selectTheme = (theme) => {
		switch (theme) {
			case 'basic': return <BasicTheme config={props} />
			case 'modern': return <ModernTheme config={props} />
			case 'outline': return <OutlineTheme config={props} />
			case 'preview': return <PreviewTheme config={props} />
			case 'stylish': return <StylishTheme config={props} />
			case 'mobile': return <MobileMockupTheme config={props} />
			case 'background': return <BackgroundTheme config={props} />

			default: return <BasicTheme config={props} />
		}
	}


	return (
		<div ref={wrapperRef} className="cover-wrapper" style={wrapperStyle}>
			<div className="border-2 border-gray-50 cover-dimensions" style={containerStyle}>
				{selectTheme(theme)}
			</div>
		</div>
	);

}

export default CoverImage;
