"use client";

import React from "react";

interface ThemeSkeletonPreviewProps {
  theme: string;
  selected: boolean;
  label: string;
  onClick: () => void;
}

function BackgroundSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-200">
      {/* Image icon placeholder */}
      <svg className="mb-1 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
      <div className="h-1.5 w-10 rounded bg-white/80"></div>
      <div className="mt-1 h-1 w-6 rounded bg-white/60"></div>
    </div>
  );
}

function StylishSkeleton() {
  return (
    <div className="flex h-full w-full flex-row bg-gray-100">
      {/* Left: text area */}
      <div className="flex w-1/2 flex-col justify-center gap-1 p-2">
        <div className="h-1.5 w-full rounded bg-gray-300"></div>
        <div className="h-1.5 w-3/4 rounded bg-gray-300"></div>
        <div className="mt-1 flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-1 w-4 rounded bg-gray-200"></div>
        </div>
      </div>
      {/* Right: image area */}
      <div className="flex w-1/2 items-center justify-center bg-gray-200">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>
    </div>
  );
}

function BasicSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 p-2">
      <div className="flex w-full flex-col items-center rounded-md bg-white p-2 shadow-sm">
        <div className="h-1.5 w-10 rounded bg-gray-300"></div>
        <div className="mt-1 h-1.5 w-8 rounded bg-gray-300"></div>
        <div className="mt-2 flex w-full items-center justify-between px-1">
          <div className="h-3 w-3 rounded-full bg-gray-200"></div>
          <div className="h-1 w-5 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

function ModernSkeleton() {
  return (
    <div className="flex h-full w-full flex-row items-center bg-gray-100 p-2">
      {/* Left: circle icon */}
      <div className="flex flex-shrink-0 items-center justify-center">
        <div className="h-5 w-5 rounded-full bg-gray-200"></div>
      </div>
      {/* Right: text card */}
      <div className="ml-1.5 flex flex-1 flex-col justify-center rounded-md bg-white p-1.5 shadow-sm">
        <div className="h-1.5 w-full rounded bg-gray-300"></div>
        <div className="mt-1 h-1.5 w-3/4 rounded bg-gray-300"></div>
        <div className="mt-1.5 h-1 w-1/2 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}

function OutlineSkeleton() {
  return (
    <div className="flex h-full w-full flex-col bg-gray-100 p-2">
      {/* Icon */}
      <div className="h-4 w-4 rounded-full bg-gray-200"></div>
      {/* Title lines */}
      <div className="mt-1.5 h-1.5 w-full rounded bg-gray-300"></div>
      <div className="mt-1 h-1.5 w-3/4 rounded bg-gray-300"></div>
      {/* Author at bottom */}
      <div className="mt-auto h-1 w-6 rounded bg-gray-200"></div>
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="flex h-full w-full flex-col bg-gray-100 p-1.5">
      {/* Title */}
      <div className="mx-auto mt-0.5 h-1.5 w-10 rounded bg-gray-300"></div>
      {/* Browser window mockup */}
      <div className="mx-auto mt-1.5 flex w-full flex-1 flex-col overflow-hidden rounded-t-md bg-white shadow-sm">
        {/* Browser bar */}
        <div className="flex h-2.5 items-center gap-0.5 bg-gray-200 px-1">
          <div className="h-1 w-1 rounded-full bg-red-300"></div>
          <div className="h-1 w-1 rounded-full bg-yellow-300"></div>
          <div className="h-1 w-1 rounded-full bg-green-300"></div>
        </div>
        {/* Content area */}
        <div className="flex flex-1 flex-col items-center justify-center gap-1 p-1">
          <div className="h-1 w-8 rounded bg-gray-200"></div>
          <div className="h-1 w-6 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

function MobileSkeleton() {
  return (
    <div className="flex h-full w-full flex-row items-center bg-gray-100 p-2">
      {/* Left: title */}
      <div className="flex w-1/2 flex-col gap-1">
        <div className="h-1.5 w-full rounded bg-gray-300"></div>
        <div className="h-1.5 w-3/4 rounded bg-gray-300"></div>
      </div>
      {/* Right: phone mockup */}
      <div className="ml-auto flex h-full w-5/12 flex-col overflow-hidden rounded-t-lg border-2 border-gray-300 bg-white">
        {/* Phone notch bar */}
        <div className="flex h-2 items-center justify-center bg-gray-300">
          <div className="h-0.5 w-3 rounded-full bg-white"></div>
        </div>
        {/* Phone content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-0.5 p-0.5">
          <div className="h-1 w-4 rounded bg-gray-200"></div>
          <div className="h-1 w-3 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

const SKELETON_MAP: Record<string, React.FC> = {
  background: BackgroundSkeleton,
  stylish: StylishSkeleton,
  basic: BasicSkeleton,
  modern: ModernSkeleton,
  outline: OutlineSkeleton,
  preview: PreviewSkeleton,
  mobile: MobileSkeleton,
};

export default function ThemeSkeletonPreview({
  theme,
  selected,
  label,
  onClick,
}: ThemeSkeletonPreviewProps) {
  const SkeletonComponent = SKELETON_MAP[theme];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center gap-1 rounded-md p-1 transition-transform duration-200 hover:scale-105 ${
        selected ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="relative h-16 w-24 overflow-hidden rounded-md shadow-sm md:h-20 md:w-28">
        {SkeletonComponent ? <SkeletonComponent /> : <div className="h-full w-full bg-gray-200" />}
      </div>
      <span className="max-w-[7rem] truncate text-center text-xs font-medium text-gray-600 group-hover:text-gray-800">
        {label}
      </span>
    </button>
  );
}
