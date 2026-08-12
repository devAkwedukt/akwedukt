"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  contactFormFieldsSchema,
  type ContactFormLanguage,
  type ContactSubjectId,
} from "@/lib/contact-form";

const subjectOptions: Record<
  ContactFormLanguage,
  readonly { label: string; value: ContactSubjectId }[]
> = {
  pl: [
    { label: "Chcę wyjechać na wolontariat/wymianę", value: "volunteering" },
    { label: "Chcę zorganizować wspólne działanie/warsztaty", value: "event" },
    {
      label: "Jestem ze szkoły/instytucji i szukam współpracy",
      value: "partnership",
    },
    { label: "Mam inne, szalone pytanie", value: "other" },
  ],
  en: [
    { label: "I want to become a volunteer!", value: "volunteering" },
    { label: "Let's organize a workshop/event together!", value: "event" },
    {
      label: "I'm from a school/institution and looking for a partnership",
      value: "partnership",
    },
    { label: "I have a completely different, crazy question!", value: "other" },
  ],
};

type ContactFormValues = {
  name: string;
  email: string;
  subject: ContactSubjectId | "";
  message: string;
  acceptedTerms: boolean;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  acceptedTerms: false,
};

const contactFormTranslations = {
  pl: {
    labels: {
      name: "Imię i nazwisko",
      email: "Email",
      subject: "Wybierz temat",
      message: "Wpisz wiadomość",
      terms: "Akceptuję regulamin",
      submit: "Wyślij",
      submitting: "Wysyłanie…",
      success: "Dziękujemy! Wiadomość została wysłana. Odpowiemy na podany adres e-mail.",
      sendError: "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.",
      rateLimited: "Wysłano zbyt wiele wiadomości. Spróbuj ponownie za kilka minut.",
      unavailable: "Formularz jest chwilowo niedostępny. Spróbuj ponownie później.",
    },
    errors: {
      name: "Wpisz imię i nazwisko.",
      email: "Wpisz e-mail.",
      emailFormat: "Podaj poprawny adres e-mail.",
      subject: "Wybierz temat.",
      message: "Wpisz wiadomość.",
      acceptedTerms: "Zaakceptuj regulamin.",
    },
  },
  en: {
    labels: {
      name: "Full Name",
      email: "Email",
      subject: "Select a topic",
      message: "Your message",
      terms: "I accept the terms and conditions",
      submit: "Send",
      submitting: "Sending…",
      success: "Thank you! Your message has been sent. We will reply to the email provided.",
      sendError: "We couldn't send your message. Please try again shortly.",
      rateLimited: "Too many messages have been sent. Please try again in a few minutes.",
      unavailable: "The form is temporarily unavailable. Please try again later.",
    },
    errors: {
      name: "Enter your full name.",
      email: "Enter your email.",
      emailFormat: "Enter a valid email address.",
      subject: "Select a topic.",
      message: "Enter your message.",
      acceptedTerms: "Accept the terms and conditions.",
    },
  },
} as const;

type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "rate-limited"
  | "unavailable";

function inputClassName(hasError: boolean) {
  return `w-full rounded-md border bg-transparent px-4 py-3 text-base text-deep-navy-blue-900 placeholder:text-deep-navy-blue-900/90 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-600 focus:ring-red-200"
      : "border-deep-navy-blue-600 focus:ring-deep-navy-blue-200"
  }`;
}

interface ContactFormProps {
  headingText?: string;
  subHeadingText?: string;
  language?: ContactFormLanguage;
}

function ContactForm({
  headingText = "Napisz do nas",
  subHeadingText = "Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą najszybciej jak to możliwe.",
  language = "pl",
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [website, setWebsite] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const translation = contactFormTranslations[language];
  const currentSubjectOptions = subjectOptions[language];
  const isSubmitting = submissionStatus === "submitting";
  const isSubmissionError = ["error", "rate-limited", "unavailable"].includes(submissionStatus);
  const statusMessage =
    submissionStatus === "success"
      ? translation.labels.success
      : submissionStatus === "rate-limited"
        ? translation.labels.rateLimited
        : submissionStatus === "unavailable"
          ? translation.labels.unavailable
          : submissionStatus === "error"
            ? translation.labels.sendError
            : "";

  useEffect(() => {
    if (submissionStatus !== "success") return;

    const timeoutId = window.setTimeout(() => {
      setSubmissionStatus("idle");
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [submissionStatus]);

  const clearSubmissionStatus = () => {
    if (submissionStatus !== "idle" && submissionStatus !== "submitting") {
      setSubmissionStatus("idle");
    }
  };

  const clearFieldError = (field: keyof ContactFormValues) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const field = e.currentTarget.name as Exclude<keyof ContactFormValues, "acceptedTerms">;
    const fieldValue = e.currentTarget.value;

    if (field === "subject") {
      setValues((prev) => ({
        ...prev,
        subject: fieldValue as ContactSubjectId | "",
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [field]: fieldValue,
      }));
    }

    clearFieldError(field);
    clearSubmissionStatus();
  };

  const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isAccepted = e.currentTarget.checked;

    setValues((prev) => ({
      ...prev,
      acceptedTerms: isAccepted,
    }));

    clearFieldError("acceptedTerms");
    clearSubmissionStatus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedForm = contactFormFieldsSchema.safeParse(values);

    if (!parsedForm.success) {
      const nextErrors: ContactFormErrors = {};

      for (const issue of parsedForm.error.issues) {
        const field = issue.path[0];

        if (typeof field === "string" && field in initialValues) {
          const typedField = field as keyof ContactFormValues;
          nextErrors[typedField] ??=
            typedField === "email" && values.email.trim()
              ? translation.errors.emailFormat
              : translation.errors[typedField];
        }
      }

      setErrors(nextErrors);
      setSubmissionStatus("idle");
      return;
    }

    setErrors({});
    setSubmissionStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsedForm.data,
          language,
          sourcePath: window.location.pathname || "/",
          website,
        }),
      });

      if (!response.ok) {
        setSubmissionStatus(
          response.status === 429
            ? "rate-limited"
            : response.status === 503
              ? "unavailable"
              : "error"
        );
        return;
      }

      setValues(initialValues);
      setWebsite("");
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="max-w-480 py-8 md:py-16 2xl:py-24 px-6 md:px-20 flex flex-col-reverse md:flex-row items-center justify-end gap-0 md:gap-20 2xl:gap-[10%] mx-auto overflow-x-hidden"
    >
      <aside className="flex items-center h-90 md:h-auto w-auto">
        <Image src="/contactFormDoodle.svg" width={550} height={550} alt="" />
      </aside>

      <aside className="flex max-w-162.5 md:max-w-180 flex-col gap-10 2xl:gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="heading-2 text-4xl md:text-6xl">{headingText}</h2>
          <p className="text-base md:text-xl text-balance">{subHeadingText}</p>
        </div>

        <form
          aria-busy={isSubmitting}
          className="mx-auto flex w-full flex-col gap-6"
          noValidate
          onSubmit={handleSubmit}
        >
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Website</label>
            <input
              autoComplete="off"
              id="contact-website"
              maxLength={200}
              name="website"
              onChange={(event) => setWebsite(event.currentTarget.value)}
              tabIndex={-1}
              type="text"
              value={website}
            />
          </div>
          <div>
            <label
              className="cursor-pointer w-fit mb-1 block text-base md:text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="name"
            >
              {translation.labels.name}
            </label>
            <input
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
              className={inputClassName(Boolean(errors.name))}
              disabled={isSubmitting}
              id="name"
              maxLength={100}
              name="name"
              onChange={handleFieldChange}
              required
              type="text"
              value={values.name}
            />
            {errors.name ? (
              <p className="mt-1 text-sm text-red-600" id="name-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="cursor-pointer w-fit mb-1 block text-base md:text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="email"
            >
              {translation.labels.email}
            </label>
            <input
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              className={inputClassName(Boolean(errors.email))}
              disabled={isSubmitting}
              id="email"
              maxLength={254}
              name="email"
              onChange={handleFieldChange}
              required
              type="email"
              value={values.email}
            />
            {errors.email ? (
              <p className="mt-1 text-sm text-red-600" id="email-error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="cursor-pointer w-fit mb-1 block text-base md:text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="subject"
            >
              {translation.labels.subject}
            </label>
            <div className="relative">
              <select
                aria-describedby={errors.subject ? "subject-error" : undefined}
                aria-invalid={Boolean(errors.subject)}
                className={`${inputClassName(Boolean(errors.subject))} appearance-none pr-12`}
                disabled={isSubmitting}
                id="subject"
                name="subject"
                onChange={handleFieldChange}
                required
                value={values.subject}
              >
                <option disabled value=""></option>
                {currentSubjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-deep-navy-blue-900">
                <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 20 20" width="20">
                  <path
                    d="M5.5 7.75L10 12.25L14.5 7.75"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
            {errors.subject ? (
              <p className="mt-1 text-sm text-red-600" id="subject-error">
                {errors.subject}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="cursor-pointer w-fit mb-1 block text-base md:text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="message"
            >
              {translation.labels.message}
            </label>
            <textarea
              aria-describedby={errors.message ? "message-error" : undefined}
              aria-invalid={Boolean(errors.message)}
              className={`${inputClassName(Boolean(errors.message))} min-h-30 resize-y`}
              disabled={isSubmitting}
              id="message"
              maxLength={5000}
              name="message"
              onChange={handleFieldChange}
              required
              rows={4}
              value={values.message}
            />
            {errors.message ? (
              <p className="mt-1 text-sm text-red-600" id="message-error">
                {errors.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="flex items-center cursor-pointer gap-2 md:gap-3 w-fit">
              <div className="relative flex items-center justify-center">
                <input
                  aria-describedby={errors.acceptedTerms ? "acceptedTerms-error" : undefined}
                  aria-invalid={Boolean(errors.acceptedTerms)}
                  checked={values.acceptedTerms}
                  className="peer absolute h-0 w-0 opacity-0"
                  disabled={isSubmitting}
                  id="acceptedTerms"
                  name="acceptedTerms"
                  onChange={handleTermsChange}
                  required
                  type="checkbox"
                />

                {/* Custom checkbox */}
                <div className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-md border border-deep-navy-blue-900 bg-transparent transition-colors peer-checked:bg-blue-200 peer-checked:[&>svg]:flex peer-checked:border-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pink-400">
                  <svg
                    className="hidden h-5 w-5 text-deep-navy-blue-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <span className="text-base md:text-xl leading-none select-none">
                {translation.labels.terms}
              </span>
            </label>

            {errors.acceptedTerms ? (
              <p className="mt-1 text-sm text-red-600" id="acceptedTerms-error">
                {errors.acceptedTerms}
              </p>
            ) : null}
          </div>

          <button
            className="mt-3 rounded-xl cursor-pointer w-full border bg-ocean-green-700 border-ocean-green-700 px-4 py-4 text-background transition-colors tracking-wider hover:bg-ocean-green-900 hover:border-ocean-green-800 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 disabled:cursor-not-allowed disabled:opacity-65"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? translation.labels.submitting : translation.labels.submit}
          </button>

          <div aria-live="polite" className="min-h-[3rem]">
            {statusMessage ? (
              <p
                className={`text-lg font-semibold -tracking-[0.02em] ${
                  isSubmissionError ? "text-red-700" : "text-deep-navy-blue-900"
                }`}
                role={isSubmissionError ? "alert" : "status"}
              >
                {statusMessage}
              </p>
            ) : null}
          </div>
        </form>
      </aside>
    </section>
  );
}

export default ContactForm;
