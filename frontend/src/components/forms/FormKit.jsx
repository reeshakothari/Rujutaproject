import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ArrowUpRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabaseClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s0-9]{7,}$/;

export function useSimpleForm(fields, formType) {
  // fields: [{ name, required, type }]
  const { t, lang } = useLang();
  const initial = Object.fromEntries(fields.map((f) => [f.name, ""]));
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

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
    async (e) => {
      e.preventDefault();
      if (!validate()) {
        const first = document.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      setStatus("loading");
      const { error } = await supabase.from("rutuja_form_submissions").insert({
        form_type: formType,
        name: values.name || null,
        email: values.email || values.contactDetails || null,
        phone: values.phone || values.whatsapp || null,
        language: lang,
        data: values,
      });
      setStatus(error ? "error" : "success");
    },
    [validate, formType, values, lang]
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
    <div>
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
      {status === "error" && (
        <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-rutuja-pink" data-testid={`${testid}-error`}>
          <AlertCircle size={16} className="shrink-0" aria-hidden="true" /> {t.forms.submitError}
        </p>
      )}
    </div>
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
        <CheckCircle2 size={40} className="animate-icon-glow text-rutuja-pink" />
      </motion.span>
      <div>
        <h3 className="font-serif text-2xl text-rutuja-ink md:text-3xl">{t.forms.successTitle}</h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-rutuja-slate">{t.forms.successBody}</p>
      </div>
      <div className="w-full border-t border-rutuja-pink/15 pt-6" data-testid={`${testid}-what-happens-next`}>
        <h4 className="font-serif text-lg text-rutuja-ink">{t.forms.whatHappensNext.title}</h4>
        <ol className="mt-4 space-y-3">
          {t.forms.whatHappensNext.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-rutuja-slate">
              <span
                style={{ animationDelay: `${i * 0.2}s` }}
                className="mt-0.5 grid h-6 w-6 shrink-0 animate-glow-pulse-sm place-items-center rounded-full bg-rutuja-pink/10 font-serif text-xs font-semibold text-rutuja-pinkdark"
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
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
