import React, { useState, useEffect } from 'react';
import { SubmittedNotebook } from '../types';
import { BookOpen, ExternalLink, Plus, Search, User, Award, CheckCircle, Info, Sparkles, X } from 'lucide-react';
import GeminiNotebookName from './GeminiNotebookName';

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

  const renderNotebookTitle = (notebookTitle: string) => {
    const titleParts = notebookTitle.split(/Notebook\s*LM/i);

    return titleParts.map((part, index) => (
      <React.Fragment key={`${part}-${index}`}>
        {part}
        {index < titleParts.length - 1 && <GeminiNotebookName />}
      </React.Fragment>
    ));
  };

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
    setSuccessMsg("Study link submitted and added to the class dashboard successfully!");

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
    <section className="bg-transparent py-6 text-[#1E293B]" id="notebooks-delivery-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Header (Pop Card box) */}
        <div className="bg-white border-4 border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#1E293B] mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#8B5CF6] font-display text-xs uppercase tracking-wider font-extrabold mb-1">
              <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
              <span>Volume II &bull; Delivered Intellectual Assets</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1E293B] leading-none">
              Class <GeminiNotebookName /> Repository
            </h2>
            <p className="text-[#64748B] text-sm mt-2 max-w-xl font-medium leading-relaxed">
              Access the master Google <GeminiNotebookName /> study environments developed by Dr. Garcia Martinez 
              and peer researchers. Link your own live Notebook below to complement the study hub!
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="candy-button inline-flex items-center gap-2 text-xs py-3.5 px-6 cursor-pointer uppercase self-start md:self-center shrink-0"
          >
            <Plus className="w-4.5 h-4.5 text-white stroke-[3px]" />
            <span>Submit Study Notebook</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="bg-[#34D399] border-4 border-[#1E293B] p-4 rounded-2xl mb-8 flex items-center gap-3 shadow-[4px_4px_0px_0px_#1E293B] text-[#1E293B] font-bold">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-display">{successMsg}</span>
          </div>
        )}

        {/* Submission form drawer */}
        {isFormOpen && (
          <div className="bg-white border-4 border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#8B5CF6] mb-10 max-w-2xl mx-auto relative">
            <div className="flex items-center justify-between border-b-4 border-[#1E293B] pb-4 mb-6">
              <h3 className="text-xl font-display font-black text-[#1E293B] flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F472B6]" />
                <span>Deliver Your <GeminiNotebookName /> Link</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full border-2 border-[#1E293B] hover:bg-gray-100 flex items-center justify-center text-[#1E293B] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <p className="bg-[#F472B6]/15 border-2 border-[#F472B6] text-[#1E293B] text-xs font-bold p-3.5 rounded-xl mb-4">
                {errorMsg}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-sm font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1E293B] font-display text-xs uppercase tracking-wider mb-1.5 font-extrabold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Victor Garcia Martinez"
                    className="w-full px-3 py-2.5 border-2 border-[#1E293B] rounded-xl bg-[#FFFDF5] text-[#1E293B] outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[#1E293B] font-display text-xs uppercase tracking-wider mb-1.5 font-extrabold">
                    Your Academic Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'student' | 'instructor')}
                    className="w-full px-3 py-3 border-2 border-[#1E293B] rounded-xl bg-[#FFFDF5] text-[#1E293B] outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm cursor-pointer font-bold"
                  >
                    <option value="student">Student / Peer Researcher</option>
                    <option value="instructor">Instructor / Faculty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#1E293B] font-display text-xs uppercase tracking-wider mb-1.5 font-extrabold">
                  Google <GeminiNotebookName /> URL *
                </label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://notebooklm.google.com/notebook/..."
                  className="w-full px-3 py-2.5 border-2 border-[#1E293B] rounded-xl bg-[#FFFDF5] text-[#1E293B] outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-[#1E293B] font-display text-xs uppercase tracking-wider mb-1.5 font-extrabold">
                  Notebook Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Gemini Notebook LM (Blood) - ABO & Rh Transfusion"
                  className="w-full px-3 py-2.5 border-2 border-[#1E293B] rounded-xl bg-[#FFFDF5] text-[#1E293B] outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1E293B] font-display text-xs uppercase tracking-wider mb-1.5 font-extrabold">
                    Lecture Exam Milestone *
                  </label>
                  <select
                    value={examId}
                    onChange={(e) => setExamId(e.target.value as any)}
                    className="w-full px-3 py-3 border-2 border-[#1E293B] rounded-xl bg-[#FFFDF5] text-[#1E293B] outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm cursor-pointer font-bold"
                  >
                    <option value="exam1">Lecture Exam 1 (Ch 13, 14, 15)</option>
                    <option value="exam2">Lecture Exam 2 (Ch 16, 19)</option>
                    <option value="exam3">Lecture Exam 3 (Ch 17, 18)</option>
                    <option value="exam4">Lecture Exam 4 (Ch 20, 21)</option>
                    <option value="exam5">Lecture Exam 5 (Ch 22, 23, 24)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1E293B] font-display text-xs uppercase tracking-wider mb-1.5 font-extrabold">
                    Core Subject / Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Blood Types or Adrenal Zones"
                    className="w-full px-3 py-2.5 border-2 border-[#1E293B] rounded-xl bg-[#FFFDF5] text-[#1E293B] outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1E293B] font-display text-xs uppercase tracking-wider mb-1.5 font-extrabold">
                  Description / Study Objective
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize what this Notebook covers or which specific learning outcomes it is configured to address..."
                  rows={3}
                  className="w-full px-3 py-2.5 border-2 border-[#1E293B] rounded-xl bg-[#FFFDF5] text-[#1E293B] outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm font-medium"
                />
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 border-2 border-[#1E293B] rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1E293B] font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="candy-button px-6 py-2.5 text-xs uppercase cursor-pointer"
                >
                  Publish to Repository
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter bar (Pop card box) */}
        <div className="bg-white border-4 border-[#1E293B] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#1E293B] mb-8 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-[#8B5CF6] stroke-[2.5px]" />
            <input
              type="text"
              placeholder="Search notebooks, authors, anatomical topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-[#1E293B] rounded-xl bg-[#FFFDF5] text-[#1E293B] outline-none text-sm focus:ring-2 focus:ring-[#8B5CF6] placeholder:italic placeholder:text-[#64748B] font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={filterExam}
              onChange={(e) => setFilterExam(e.target.value)}
              className="px-3 py-2.5 border-2 border-[#1E293B] rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#8B5CF6] text-[#1E293B] cursor-pointer font-bold"
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
              className="px-3 py-2.5 border-2 border-[#1E293B] rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-[#8B5CF6] text-[#1E293B] cursor-pointer font-bold"
            >
              <option value="all">All Roles</option>
              <option value="instructor">Instructors Only</option>
              <option value="student">Students Only</option>
            </select>
          </div>
        </div>

        {/* Notebook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotebooks.map((nb) => {
            const isInstructor = nb.role === 'instructor';
            return (
              <div
                key={nb.id}
                className="bg-white border-4 border-[#1E293B] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[8px_8px_0px_0px_#1E293B] hover:-translate-y-1 transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] font-display font-black uppercase px-2.5 py-1 rounded-full border-2 border-[#1E293B] bg-[#FFFDF5] text-[#8B5CF6]">
                      {nb.examId === 'exam1' ? 'Exam 1 (Ch 13-15)' :
                       nb.examId === 'exam2' ? 'Exam 2 (Ch 16, 19)' :
                       nb.examId === 'exam3' ? 'Exam 3 (Ch 17-18)' :
                       nb.examId === 'exam4' ? 'Exam 4 (Ch 20-21)' :
                       'Exam 5 (Ch 22-24)'}
                    </span>
                    
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-display font-black uppercase px-2.5 py-1 rounded-full border-2 border-[#1E293B] ${
                      isInstructor ? 'bg-[#F472B6] text-white' : 'bg-[#34D399] text-[#1E293B]'
                    }`}>
                      {isInstructor ? (
                        <>
                          <Award className="w-3.5 h-3.5" />
                          <span>Faculty</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3.5 h-3.5" />
                          <span>Scholar</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h4 className="text-lg font-display font-extrabold text-[#1E293B] mb-2 leading-snug">
                    {renderNotebookTitle(nb.title)}
                  </h4>

                  <p className="text-xs text-[#64748B] mb-4 flex items-center gap-1 font-bold">
                    <span className="text-[#1E293B]">{nb.author}</span> &bull; <span>{nb.createdAt}</span>
                  </p>

                  <div className="bg-[#FFFDF5] rounded-xl p-4 mb-5 border-2 border-[#1E293B] text-xs font-semibold">
                    <p className="font-display text-[#8B5CF6] uppercase tracking-wide text-[9px] mb-1 font-black">
                      Anatomical Objective:
                    </p>
                    <p className="text-[#1E293B] font-bold mb-2 text-sm">{nb.topic}</p>
                    <p className="text-[#64748B] leading-relaxed italic">
                      "{nb.description}"
                    </p>
                  </div>
                </div>

                <a
                  href={nb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full candy-button inline-flex items-center justify-center gap-2 text-xs py-3.5 px-4 uppercase cursor-pointer shrink-0"
                >
                  <ExternalLink className="w-4 h-4 text-white stroke-[3px]" />
                  <span>Launch <GeminiNotebookName /></span>
                </a>
              </div>
            );
          })}

          {filteredNotebooks.length === 0 && (
            <div className="col-span-full bg-white border-4 border-[#1E293B] rounded-2xl p-16 text-center text-[#64748B] shadow-[4px_4px_0px_0px_#1E293B]">
              <Info className="w-12 h-12 mx-auto text-[#8B5CF6] mb-3 opacity-60" />
              <p className="font-display text-lg text-[#1E293B] font-black">No Academic Notebooks Found</p>
              <p className="text-sm font-semibold mt-1">Try adjusting or relaxing your search parameters above.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
