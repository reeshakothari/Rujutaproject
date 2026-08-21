import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s0-9]{7,}$/;

export function useSimpleForm(fields) {
  // fields: [{ name, required, type }]
  const { t } = useLang();
  const initial = Object.fromEntries(fields.map((f) => [f.name, ""]));
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const setField = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  }, []);

  const validate = useCallback(() => {
    const errs = {};
    fields.forEach((f) => {
      const val = (values[f.name] || "").trim();
      if (f.required && !val) errs[f.name] = t.forms.required;
      else if (f.type === "email" && val && !EMAIL_RE.test(val)) errs[f.name] = t.forms.email;
      else if (f.type === "tel" && val && !PHONE_RE.test(val)) errs[f.name] = t.forms.phone;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [fields, values, t]);

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) {
        const first = document.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      setStatus("loading");
      // Frontend-only: simulate submission. Not connected to a backend.
      setTimeout(() => setStatus("success"), 900);
    },
    [validate]
  );

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, errors, status, setField, submit, reset };
}

export function Field({ label, name, values, errors, setField, type = "text", required, testid, ...rest }) {
  const err = errors[name];
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-rutuja-ink">
        {label} {!required && <Optional />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        data-testid={testid}
        value={values[name]}
        onChange={(e) => setField(name, e.target.value)}
        aria-invalid={err ? "true" : "false"}
        aria-describedby={err ? `${name}-error` : undefined}
        className={`w-full border bg-white px-4 py-3 text-base text-rutuja-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-rutuja-muted focus:border-rutuja-pink focus:shadow-[0_0_0_4px_rgba(200,43,98,0.15),0_0_24px_-8px_rgba(200,43,98,0.5)] ${
          err ? "border-rutuja-pink shadow-[0_0_0_3px_rgba(200,43,98,0.12)]" : "border-rutuja-line"
        }`}
        {...rest}
      />
      {err && <ErrorText id={`${name}-error`}>{err}</ErrorText>}
    </div>
  );
}

export function TextAreaField({ label, name, values, errors, setField, required, testid, rows = 5 }) {
  const err = errors[name];
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-rutuja-ink">
        {label} {!required && <Optional />}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        data-testid={testid}
        value={values[name]}
        onChange={(e) => setField(name, e.target.value)}
        aria-invalid={err ? "true" : "false"}
        aria-describedby={err ? `${name}-error` : undefined}
        className={`w-full resize-y border bg-white px-4 py-3 text-base text-rutuja-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-rutuja-pink focus:shadow-[0_0_0_4px_rgba(200,43,98,0.15),0_0_24px_-8px_rgba(200,43,98,0.5)] ${
          err ? "border-rutuja-pink shadow-[0_0_0_3px_rgba(200,43,98,0.12)]" : "border-rutuja-line"
        }`}
      />
      {err && <ErrorText id={`${name}-error`}>{err}</ErrorText>}
    </div>
  );
}

export function SelectField({ label, name, values, errors, setField, options, required, testid }) {
  const { t } = useLang();
  const err = errors[name];
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-rutuja-ink">
        {label} {!required && <Optional />}
      </label>
      <select
        id={name}
        name={name}
        data-testid={testid}
        value={values[name]}
        onChange={(e) => setField(name, e.target.value)}
        aria-invalid={err ? "true" : "false"}
        aria-describedby={err ? `${name}-error` : undefined}
        className={`w-full appearance-none border bg-white px-4 py-3 text-base outline-none transition-[border-color,box-shadow] duration-300 focus:border-rutuja-pink focus:shadow-[0_0_0_4px_rgba(200,43,98,0.15),0_0_24px_-8px_rgba(200,43,98,0.5)] ${
          err ? "border-rutuja-pink shadow-[0_0_0_3px_rgba(200,43,98,0.12)]" : "border-rutuja-line"
        } ${values[name] ? "text-rutuja-ink" : "text-rutuja-muted"}`}
      >
        <option value="">{t.forms.select}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-rutuja-ink">
            {o}
          </option>
        ))}
      </select>
      {err && <ErrorText id={`${name}-error`}>{err}</ErrorText>}
    </div>
  );
}

function Optional() {
  const { t } = useLang();
  return <span className="text-xs font-normal text-rutuja-muted">({t.forms.optional})</span>;
}

function ErrorText({ id, children }) {
  return (
    <p id={id} role="alert" className="text-sm text-rutuja-pink">
      {children}
    </p>
  );
}

export function SubmitButton({ status, testid }) {
  const { t } = useLang();
  return (
    <button
      type="submit"
      data-testid={testid}
      disabled={status === "loading"}
      className={`btn-primary rounded-sm px-8 py-4 text-base disabled:opacity-70 ${status === "loading" ? "" : "animate-glow-pulse-sm"}`}
    >
      {status === "loading" ? (
        <>
          <Loader2 size={18} className="animate-spin" /> {t.forms.sending}
        </>
      ) : (
        <>
          {t.forms.submit} <ArrowUpRight size={18} />
        </>
      )}
    </button>
  );
}

export function SuccessState({ onReset, testid }) {
  const { t } = useLang();
  return (
    <motion.div
      data-testid={testid}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-5 border border-rutuja-pink/20 bg-rutuja-soft p-8 shadow-[0_25px_60px_-28px_rgba(200,43,98,0.4)] md:p-10"
    >
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <CheckCircle2 size={40} className="text-rutuja-pink drop-shadow-[0_0_16px_rgba(200,43,98,0.6)]" />
      </motion.span>
      <div>
        <h3 className="font-serif text-2xl text-rutuja-ink md:text-3xl">{t.forms.successTitle}</h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-rutuja-slate">{t.forms.successBody}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button onClick={onReset} data-testid="form-reset" className="btn-outline rounded-sm">
          {t.forms.another}
        </button>
        <Link to="/" className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-rutuja-blue">
          {t.forms.backHome}
        </Link>
      </div>
    </motion.div>
  );
}
