/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Student } from '../types';
import { UploadCloud, FileText, Sparkles, RefreshCw } from 'lucide-react';

interface RosterRelauncherProps {
  onImportRoster: (students: Student[]) => void;
  onResetDefault: () => void;
}

export default function RosterRelauncher({ onImportRoster, onResetDefault }: RosterRelauncherProps) {
  const [pasteArea, setPasteArea] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseRosterText = (text: string) => {
    if (!text.trim()) return;
    const lines = text.split("\n");
    const parsedStudents: Student[] = [];

    lines.forEach((line) => {
      if (!line.trim()) return;

      // Extract Lone Star College 7-digit ID (e.g. 1125859)
      const idMatch = line.match(/\b\d{7}\b/);
      if (!idMatch) return;

      const id = idMatch[0];
      let restOfLine = line.replace(id, "").replace(/\t/g, " ").trim();

      // Extract Level
      let level = "Sophomore";
      if (/freshman/i.test(restOfLine)) {
        level = "Freshman";
        restOfLine = restOfLine.replace(/freshman/i, "");
      } else if (/sophomore/i.test(restOfLine)) {
        level = "Sophomore";
        restOfLine = restOfLine.replace(/sophomore/i, "");
      } else if (/junior/i.test(restOfLine)) {
        level = "Junior";
        restOfLine = restOfLine.replace(/junior/i, "");
      } else if (/senior/i.test(restOfLine)) {
        level = "Senior";
        restOfLine = restOfLine.replace(/senior/i, "");
      }

      // Format clean Name
      let name = restOfLine.replace(/["'\[\]]/g, "").trim();
      name = name.replace(/,\s*,/g, ",").trim();
      if (name.endsWith(",")) name = name.slice(0, -1);

      if (!name) name = `Scholar-${id}`;

      parsedStudents.push({
        id,
        name,
        gradeBasis: "Graded",
        units: "4.00",
        plan: "Associate of Science (AS)",
        level
      });
    });

    if (parsedStudents.length > 0) {
      onImportRoster(parsedStudents);
      setPasteArea("");
    } else {
      alert("No valid roster data parsed. Please check that rows contain a 7-digit student ID and Name.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file.name.endsWith(".csv") || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setPasteArea(text);
        parseRosterText(text);
      };
      reader.readAsText(file);
    } else {
      alert("For security and performance, copy-pasting the text is recommended for PDF files, while .csv and .txt can be uploaded directly!");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-gray-950 flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-teal-700 animate-spin-slow" />
          <span>Roster Relauncher &amp; Data Modeler</span>
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Need to run this assignment portal for a different class section or load a fresh roster? This browser engine includes full client-side parsing. No data is ever transmitted to a remote server, fully respecting student privacy.
        </p>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-teal-600 bg-teal-50/30'
            : 'border-gray-300 hover:border-teal-500 bg-white/50'
        }`}
      >
        <UploadCloud className="w-12 h-12 mx-auto text-teal-600 mb-4" />
        <p className="text-sm font-semibold text-gray-800">
          Drag &amp; Drop your Class Roster <strong>.CSV</strong> or <strong>.TXT</strong> here
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Or click to browse files from your computer
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv,.txt"
          className="hidden"
        />
      </div>

      {/* Quick Paste Area */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <h3 className="text-base font-serif font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>Alternative: Quick-Paste Roster Text</span>
          </h3>

          <button
            onClick={onResetDefault}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded transition-colors self-start sm:self-auto cursor-pointer"
          >
            Reset Default Class Roster (28 Enrolled)
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-normal">
          Copy rows from your LSC/Canvas gradebook roster directly, paste below, and hit Parse. Expected pattern: <code className="font-mono bg-gray-50 px-1 border border-gray-100">[ID] [Tab/Space] [Last Name, First Name] [Tab/Space] [Level]</code>
        </p>

        <textarea
          rows={6}
          value={pasteArea}
          onChange={(e) => setPasteArea(e.target.value)}
          placeholder="Example format:&#10;1125859  Cantu, Crystal Michelle  Sophomore&#10;0892156  Chapa, Emma S  Junior"
          className="w-full border border-gray-300 rounded p-3 text-xs font-mono outline-none focus:border-teal-500 text-gray-800 bg-gray-50/50"
        />

        <button
          onClick={() => parseRosterText(pasteArea)}
          className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs px-5 py-2.5 rounded-lg shadow transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-green-300" />
          <span>Parse &amp; Inject Roster</span>
        </button>
      </div>
    </div>
  );
}
