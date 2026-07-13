/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SubmittedNotebook } from '../types';
import { BookOpen, ExternalLink, Plus, Search, User, Award, CheckCircle, Info } from 'lucide-react';

const SEED_NOTEBOOKS: SubmittedNotebook[] = [
  {
    id: "seed-blood-compatible",
    title: "Notebook LM (Blood) - ABO & Rh Transfusion Compatibility",
    url: "https://notebooklm.google.com/notebook/d5dee6fd-7c9a-4c53-9701-091da2b2eddb",
    author: "Dr. Victor Garcia Martinez",
    role: "instructor",
    examId: "exam1",
    topic: "Blood Transfusion & ABO/Rh Compatibility",
    description: "Predict which blood types are compatible and what happens when the incorrect ABO or Rh blood type is transfused.",
    createdAt: "2026-07-12"
  }
];

export default function SubmittedNotebooks() {
  const [notebooks, setNotebooks] = useState<SubmittedNotebook[]>([]);
  const [search, setSearch] = useState("");
  const [filterExam, setFilterExam] = useState<string>("all");
  const [filterRole, setFilterRole] = useState<string>("all");

  // Form states
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState<'student' | 'instructor'>("student");
  const [examId, setExamId] = useState<'exam1' | 'exam2' | 'exam3' | 'exam4' | 'exam5'>("exam1");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load from LocalStorage or seed
  useEffect(() => {
    const saved = localStorage.getItem('biol2402_notebooks');
    if (saved) {
      try {
        setNotebooks(JSON.parse(saved));
      } catch (e) {
        setNotebooks(SEED_NOTEBOOKS);
      }
    } else {
      setNotebooks(SEED_NOTEBOOKS);
      localStorage.setItem('biol2402_notebooks', JSON.stringify(SEED_NOTEBOOKS));
    }
  }, []);

  const handleSave = (updated: SubmittedNotebook[]) => {
    setNotebooks(updated);
    localStorage.setItem('biol2402_notebooks', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !url.trim() || !author.trim() || !topic.trim()) {
      setErrorMsg("Please fill in all required fields marked with *.");
      return;
    }

    // URL validation
    let validUrl = url.trim();
    if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
      validUrl = "https://" + validUrl;
    }

    try {
      new URL(validUrl);
    } catch (_) {
      setErrorMsg("Please provide a valid URL.");
      return;
    }

    const newNotebook: SubmittedNotebook = {
      id: "notebook-" + Date.now(),
      title: title.trim(),
      url: validUrl,
      author: author.trim(),
      role,
      examId,
      topic: topic.trim(),
      description: description.trim() || "No description provided.",
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedList = [newNotebook, ...notebooks];
    handleSave(updatedList);

    // Reset Form
    setTitle("");
    setUrl("");
    setAuthor("");
    setTopic("");
    setDescription("");
    setIsFormOpen(false);
    setSuccessMsg("Notebook LM link submitted and added to the class dashboard successfully!");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  const filteredNotebooks = notebooks.filter(nb => {
    const matchesSearch = 
      nb.title.toLowerCase().includes(search.toLowerCase()) ||
      nb.author.toLowerCase().includes(search.toLowerCase()) ||
      nb.topic.toLowerCase().includes(search.toLowerCase()) ||
      nb.description.toLowerCase().includes(search.toLowerCase());

    const matchesExam = filterExam === "all" || nb.examId === filterExam;
    const matchesRole = filterRole === "all" || nb.role === filterRole;

    return matchesSearch && matchesExam && matchesRole;
  });

  return (
    <section className="bg-gray-50 py-16" id="notebooks-delivery-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs tracking-widest uppercase mb-2">
              <BookOpen className="w-4 h-4" />
              <span>DELIVERED INTELLECTUAL ASSETS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 leading-tight">
              Class Notebook LM Repository
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-xl">
              Access the master Google Notebook LM study environments developed by Dr. Garcia Martinez 
              and peer researchers. Link your own live Notebook below to complement the hub!
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm px-5 py-3 rounded-lg shadow-md transition-all self-start md:self-end"
          >
            <Plus className="w-4 h-4" />
            <span>Submit New Notebook Link</span>
          </button>
        </div>

        {/* Success/Error Alerts */}
        {successMsg && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-8 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 text-sm font-medium">{successMsg}</span>
          </div>
        )}

        {/* Submission form drawer */}
        {isFormOpen && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-lg mb-10 max-w-2xl mx-auto transition-all">
            <h3 className="text-xl font-serif text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-600" />
              <span>Deliver Your Notebook LM Link</span>
            </h3>

            {errorMsg && (
              <p className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded mb-4">
                {errorMsg}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Dr. Victor Garcia Martinez"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 outline-none text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Your Academic Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'student' | 'instructor')}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 outline-none bg-white text-gray-800"
                  >
                    <option value="student">Student / Student Researcher</option>
                    <option value="instructor">Instructor / Faculty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Google Notebook LM URL *
                </label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://notebooklm.google.com/notebook/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 outline-none text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Notebook Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Notebook LM (Blood) - ABO & Rh Transfusion"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 outline-none text-gray-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Lecture Exam Milestone *
                  </label>
                  <select
                    value={examId}
                    onChange={(e) => setExamId(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 outline-none bg-white text-gray-800"
                  >
                    <option value="exam1">Lecture Exam 1 (Ch 13, 14, 15)</option>
                    <option value="exam2">Lecture Exam 2 (Ch 16, 19)</option>
                    <option value="exam3">Lecture Exam 3 (Ch 17, 18)</option>
                    <option value="exam4">Lecture Exam 4 (Ch 20, 21)</option>
                    <option value="exam5">Lecture Exam 5 (Ch 22, 23, 24)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Core Subject / Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Blood Types or Adrenal Zones"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 outline-none text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description / Study Objective
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize what this Notebook covers or which specific learning outcomes it is configured to address..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 outline-none text-gray-800"
                />
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded font-medium shadow"
                >
                  Publish to Dashboard
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-8 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notebooks, authors, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-teal-500 text-gray-800"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={filterExam}
              onChange={(e) => setFilterExam(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-teal-500 text-gray-800"
            >
              <option value="all">All Milestones</option>
              <option value="exam1">Lecture Exam 1</option>
              <option value="exam2">Lecture Exam 2</option>
              <option value="exam3">Lecture Exam 3</option>
              <option value="exam4">Lecture Exam 4</option>
              <option value="exam5">Lecture Exam 5</option>
            </select>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-teal-500 text-gray-800"
            >
              <option value="all">All Roles</option>
              <option value="instructor">Instructors Only</option>
              <option value="student">Students Only</option>
            </select>
          </div>
        </div>

        {/* Notebook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotebooks.map((nb) => {
            const isInstructor = nb.role === 'instructor';
            return (
              <div
                key={nb.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 tracking-wider">
                      {nb.examId === 'exam1' ? 'Exam 1 (Ch 13-15)' :
                       nb.examId === 'exam2' ? 'Exam 2 (Ch 16, 19)' :
                       nb.examId === 'exam3' ? 'Exam 3 (Ch 17-18)' :
                       nb.examId === 'exam4' ? 'Exam 4 (Ch 20-21)' :
                       'Exam 5 (Ch 22-24)'}
                    </span>
                    
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      isInstructor ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {isInstructor ? (
                        <>
                          <Award className="w-3 h-3" />
                          <span>Instructor</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3" />
                          <span>Student</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-normal text-gray-900 mb-2 leading-tight">
                    {nb.title}
                  </h4>

                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <span className="font-semibold text-gray-700">{nb.author}</span> &bull; <span>{nb.createdAt}</span>
                  </p>

                  <div className="bg-gray-50 rounded p-3 mb-4 border border-gray-100 text-xs">
                    <p className="font-semibold text-teal-800 uppercase tracking-wide text-[9px] mb-1">
                      CORE SUBJECT / TOPIC:
                    </p>
                    <p className="text-gray-800 font-medium mb-2">{nb.topic}</p>
                    <p className="text-gray-600 leading-relaxed italic">
                      "{nb.description}"
                    </p>
                  </div>
                </div>

                <a
                  href={nb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs py-2.5 px-4 rounded-lg transition-colors mt-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Google Notebook LM</span>
                </a>
              </div>
            );
          })}

          {filteredNotebooks.length === 0 && (
            <div className="col-span-full bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
              <Info className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="font-serif text-lg text-gray-800 mb-1">No Notebook LMs Found</p>
              <p className="text-sm">Try relaxing your search terms or filters above.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
