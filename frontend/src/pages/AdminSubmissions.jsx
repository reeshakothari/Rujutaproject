import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import {
  Search,
  Download,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Loader2,
  ShieldAlert,
  Inbox,
  LogOut,
} from "lucide-react";

const FORM_TYPES = ["all", "workshop", "donate", "partner", "contact", "volunteer", "ambassador_apply"];

const FORM_TYPE_LABELS = {
  workshop: "Workshop Request",
  donate: "Donation Pledge",
  partner: "Partnership",
  contact: "Contact Message",
  volunteer: "Volunteer / Intern",
  ambassador_apply: "Ambassador Application",
};

function humanizeKey(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function AdminSubmissions() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    document.title = "Form Submissions | Rutuja Admin";
  }, []);

  const fetchRows = useCallback(async () => {
    setLoadingRows(true);
    setLoadError("");
    const { data, error } = await supabase.from("rutuja_form_submissions").select("*").order("created_at", { ascending: false });
    if (error) setLoadError(error.message);
    else setRows(data || []);
    setLoadingRows(false);
  }, []);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const counts = useMemo(() => {
    const c = { all: rows.length };
    rows.forEach((r) => {
      c[r.form_type] = (c[r.form_type] || 0) + 1;
    });
    return c;
  }, [rows]);

  const filtered = useMemo(() => {
    let list = activeType === "all" ? rows : rows.filter((r) => r.form_type === activeType);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((r) => [r.name, r.email, r.phone].filter(Boolean).some((v) => v.toLowerCase().includes(q)));
    }
    return list;
  }, [rows, activeType, query]);

  const exportCsv = () => {
    const headers = ["created_at", "form_type", "name", "email", "phone", "language"];
    const lines = [headers.join(",")];
    filtered.forEach((r) => {
      const vals = headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`);
      lines.push(vals.join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rutuja-submissions-${activeType}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-rutuja-soft pt-[72px]" data-testid="admin-submissions-page">
      <div className="container-edge py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-rutuja-ink md:text-3xl">Form Submissions</h1>
            <p className="mt-1 text-xs text-rutuja-muted">All entries submitted through the site's forms.</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={fetchRows} className="btn-outline rounded-sm px-4 py-2 text-xs">
              <RefreshCw size={14} aria-hidden="true" /> Refresh
            </button>
            <button type="button" onClick={exportCsv} className="btn-outline rounded-sm px-4 py-2 text-xs">
              <Download size={14} aria-hidden="true" /> Export CSV
            </button>
            <button type="button" onClick={handleSignOut} data-testid="admin-sign-out" className="btn-outline rounded-sm px-4 py-2 text-xs">
              <LogOut size={14} aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>

        {loadError && (
          <div className="mt-6 flex items-center gap-2 border border-rutuja-pink/30 bg-white p-4 text-sm text-rutuja-pinkdark">
            <ShieldAlert size={16} aria-hidden="true" /> Couldn't load submissions: {loadError}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2" data-testid="admin-type-tabs">
          {FORM_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              data-testid={`admin-tab-${type}`}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeType === type ? "border-rutuja-pink bg-rutuja-pink text-white" : "border-rutuja-line bg-white text-rutuja-ink hover:border-rutuja-pink"
              }`}
            >
              {type === "all" ? "All" : FORM_TYPE_LABELS[type] || type} ({counts[type] || 0})
            </button>
          ))}
        </div>

        <div className="relative mt-4 max-w-sm">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-rutuja-muted" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search name, email or phone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="admin-search"
            className="w-full border border-rutuja-line bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-rutuja-pink"
          />
        </div>

        <div className="mt-6 overflow-x-auto border border-rutuja-line bg-white">
          {loadingRows ? (
            <div className="flex items-center justify-center gap-2 p-10 text-sm text-rutuja-muted">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Loading submissions…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 p-14 text-center text-sm text-rutuja-muted">
              <Inbox size={28} aria-hidden="true" />
              No submissions {activeType !== "all" ? `for ${FORM_TYPE_LABELS[activeType] || activeType}` : ""}
              {query ? " matching your search" : ""}.
            </div>
          ) : (
            <table className="w-full min-w-[720px] border-collapse text-sm" data-testid="admin-table">
              <thead>
                <tr className="border-b border-rutuja-line text-left text-xs uppercase tracking-wide text-rutuja-muted">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <SubmissionRow key={row.id} row={row} isOpen={expandedId === row.id} onToggle={() => setExpandedId(expandedId === row.id ? null : row.id)} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

function SubmissionRow({ row, isOpen, onToggle }) {
  return (
    <>
      <tr className="border-b border-rutuja-line/60 hover:bg-rutuja-soft/40">
        <td className="whitespace-nowrap px-4 py-3 text-rutuja-slate">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} className="text-rutuja-muted" aria-hidden="true" /> {formatDate(row.created_at)}
          </span>
        </td>
        <td className="whitespace-nowrap px-4 py-3">
          <span className="rounded-full bg-rutuja-soft px-2.5 py-1 text-xs font-semibold text-rutuja-blue">
            {FORM_TYPE_LABELS[row.form_type] || row.form_type}
          </span>
        </td>
        <td className="px-4 py-3 font-medium text-rutuja-ink">{row.name || "—"}</td>
        <td className="px-4 py-3 text-rutuja-slate">
          {row.email ? (
            <a href={`mailto:${row.email}`} className="inline-flex items-center gap-1.5 hover:text-rutuja-pink">
              <Mail size={13} aria-hidden="true" /> {row.email}
            </a>
          ) : (
            "—"
          )}
        </td>
        <td className="px-4 py-3 text-rutuja-slate">
          {row.phone ? (
            <a href={`tel:${row.phone}`} className="inline-flex items-center gap-1.5 hover:text-rutuja-pink">
              <Phone size={13} aria-hidden="true" /> {row.phone}
            </a>
          ) : (
            "—"
          )}
        </td>
        <td className="px-4 py-3 text-right">
          <button type="button" onClick={onToggle} data-testid={`admin-row-toggle-${row.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-rutuja-blue">
            {isOpen ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />} {isOpen ? "Hide" : "Details"}
          </button>
        </td>
      </tr>
      {isOpen && (
        <tr className="border-b border-rutuja-line/60 bg-rutuja-soft/30">
          <td colSpan={6} className="px-4 py-4">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {Object.entries(row.data || {})
                .filter(([, v]) => v !== "" && v != null)
                .map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-rutuja-muted">{humanizeKey(k)}</dt>
                    <dd className="text-sm text-rutuja-ink">{String(v)}</dd>
                  </div>
                ))}
              <div className="flex flex-col">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-rutuja-muted">Language</dt>
                <dd className="text-sm text-rutuja-ink">{row.language === "hi" ? "Hindi" : "English"}</dd>
              </div>
            </dl>
          </td>
        </tr>
      )}
    </>
  );
}
