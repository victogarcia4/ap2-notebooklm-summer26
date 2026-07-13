import React, { useState, useRef } from 'react';
import { Student } from '../types';
import { UploadCloud, FileText, Sparkles, RefreshCw, Info } from 'lucide-react';

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
      alert("For security and student privacy, copy-pasting the text is recommended for PDF rosters, while standard .csv or .txt grade rosters can be uploaded directly!");
    }
  };

  return (
    <div className="space-y-8 text-[#1E293B]">
      
      {/* Title block */}
      <div className="bg-white border-4 border-[#1E293B] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#1E293B]">
        <h2 className="text-2xl sm:text-3xl font-display font-black text-[#1E293B] flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-[#8B5CF6]" />
          <span>Roster Relauncher &amp; Data Modeler</span>
        </h2>
        <p className="text-[#64748B] text-sm font-bold mt-2 leading-relaxed">
          Need to run this assignment portal for a different class section or load a fresh roster? This browser engine includes full client-side parsing. No data is ever transmitted to a remote server, fully respecting student privacy.
        </p>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-4 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 relative select-none ${
          isDragOver
            ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 translate-y-[-2px] shadow-[6px_6px_0px_0px_#1E293B]'
            : 'border-[#1E293B] hover:border-[#8B5CF6] bg-white hover:bg-[#FFFDF5] shadow-[6px_6px_0px_0px_#1E293B] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#1E293B]'
        }`}
      >
        <UploadCloud className="w-14 h-14 mx-auto text-[#8B5CF6] mb-4 stroke-[2.5px] hover:scale-110 transition-transform" />
        <p className="text-base font-display font-black text-[#1E293B]">
          Drag &amp; Drop your Class Roster <strong className="bg-[#F472B6] text-white px-2 py-0.5 inline-block border-2 border-[#1E293B] font-mono rounded">.CSV</strong> or <strong className="bg-[#FBBF24] text-[#1E293B] px-2 py-0.5 inline-block border-2 border-[#1E293B] font-mono rounded">.TXT</strong> here
        </p>
        <p className="text-xs text-[#64748B] mt-2.5 font-display uppercase tracking-widest font-black">
          Or click to browse files from your local system
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
      <div className="bg-white border-4 border-[#1E293B] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#1E293B] space-y-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-[#1E293B] pb-4">
          <h3 className="text-base font-display font-black text-[#1E293B] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#8B5CF6]" />
            <span>Alternative: Quick-Paste Roster Text</span>
          </h3>

          <button
            onClick={onResetDefault}
            className="text-xs font-display font-black uppercase tracking-wider text-[#1E293B] bg-[#FBBF24] border-2 border-[#1E293B] px-4 py-2 rounded-xl hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer pop-shadow-sm shrink-0"
          >
            Reset Original Class Roster (28 Enrolled)
          </button>
        </div>

        <p className="text-xs text-[#64748B] font-bold leading-normal">
          Copy rows from your Canvas gradebook roster directly, paste below, and hit Parse. Expected pattern: <code className="font-mono bg-gray-100 px-1.5 py-0.5 border border-gray-300 rounded text-[#8B5CF6] font-bold">[ID] [Tab/Space] [Last Name, First Name] [Tab/Space] [Level]</code>
        </p>

        <textarea
          rows={6}
          value={pasteArea}
          onChange={(e) => setPasteArea(e.target.value)}
          placeholder="Example format:&#10;1125859  Cantu, Crystal Michelle  Sophomore&#10;0892156  Chapa, Emma S  Junior"
          className="w-full border-2 border-[#1E293B] rounded-xl p-3.5 text-xs font-mono font-semibold outline-none focus:ring-2 focus:ring-[#8B5CF6] text-[#1E293B] bg-[#FFFDF5]"
        />

        <button
          onClick={() => parseRosterText(pasteArea)}
          className="candy-button inline-flex items-center gap-2 text-xs px-6 py-3 uppercase cursor-pointer"
        >
          <Sparkles className="w-4.5 h-4.5 text-white fill-white stroke-[2.5px]" />
          <span>Parse &amp; Inject Roster</span>
        </button>
      </div>

    </div>
  );
}
