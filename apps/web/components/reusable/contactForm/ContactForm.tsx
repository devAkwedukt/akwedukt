"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { z } from "zod";

const subjectOptions = [
  "Chcę wyjechać na wolontariat/wymianę",
  "Chcę zorganizować wspólne działanie/warsztaty",
  "Jestem ze szkoły/instytucji i szukam współpracy",
  "Mam inne, szalone pytanie",
] as const;

const subjectOptionsEn = [
  "I want to become a volunteer!",
  "Let's organize a workshop/event together!",
  "I'm from a school/institution and looking for a partnership",
  "I have a completely different, crazy question!",
] as const;

type ContactFormLanguage = "pl" | "en";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
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
      success: "Dziękujemy, wiadomość została wysłana.",
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
      success: "Thank you, your message has been sent.",
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

const getContactFormSchema = (language: ContactFormLanguage) => {
  const messages = contactFormTranslations[language].errors;
  const validSubjectOptions = (
    language === "en" ? subjectOptionsEn : subjectOptions
  ) as readonly string[];

  return z.object({
    name: z.string().trim().min(1, messages.name),
    email: z.string().trim().min(1, messages.email).email(messages.emailFormat),
    subject: z.string().refine((value) => validSubjectOptions.includes(value as string), {
      message: messages.subject,
    }),
    message: z.string().trim().min(1, messages.message),
    acceptedTerms: z.boolean().refine((value) => value, {
      message: messages.acceptedTerms,
    }),
  });
};

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const translation = contactFormTranslations[language];
  const currentSubjectOptions = language === "en" ? subjectOptionsEn : subjectOptions;
  const contactFormSchema = getContactFormSchema(language);

  useEffect(() => {
    if (!isSubmitted) return;

    const timeoutId = window.setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSubmitted]);

  const clearFieldError = (field: keyof ContactFormValues) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const field = e.currentTarget.name as Exclude<keyof ContactFormValues, "acceptedTerms">;
    const fieldValue = e.currentTarget.value;

    setValues((prev) => ({
      ...prev,
      [field]: fieldValue,
    }));

    clearFieldError(field);
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isAccepted = e.currentTarget.checked;

    setValues((prev) => ({
      ...prev,
      acceptedTerms: isAccepted,
    }));

    clearFieldError("acceptedTerms");
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedForm = contactFormSchema.safeParse(values);

    if (!parsedForm.success) {
      const nextErrors: ContactFormErrors = {};

      for (const issue of parsedForm.error.issues) {
        const field = issue.path[0];

        if (typeof field === "string" && field in initialValues) {
          const typedField = field as keyof ContactFormValues;
          nextErrors[typedField] ??= issue.message;
        }
      }

      setErrors(nextErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setValues(initialValues);
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="max-w-480 py-8 md:py-16 2xl:py-24 px-6 md:px-20 flex flex-col-reverse md:flex-row items-center justify-end gap-0 md:gap-20 2xl:gap-[10%] mx-auto overflow-x-hidden"
    >
      <aside className="flex items-center h-90 md:h-auto ">
        <Image src="/contactFormDoodle.svg" width={550} height={550} alt="doodle" />
      </aside>

      <aside className="flex max-w-162.5 md:max-w-180 flex-col gap-10 2xl:gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="heading-2 text-4xl md:text-6xl">{headingText}</h2>
          <p className="text-base md:text-xl text-balance">{subHeadingText}</p>
        </div>

        <form className="mx-auto flex w-full flex-col gap-6" noValidate onSubmit={handleSubmit}>
          <div>
            <label
              className="cursor-pointer w-fit mb-1 block text-base md:text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="name"
            >
              {translation.labels.name}
            </label>
            <input
              autoComplete="name"
              className={inputClassName(Boolean(errors.name))}
              id="name"
              name="name"
              onChange={handleFieldChange}
              type="text"
              value={values.name}
            />
            {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
          </div>

          <div>
            <label
              className="cursor-pointer w-fit mb-1 block text-base md:text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              autoComplete="email"
              className={inputClassName(Boolean(errors.email))}
              id="email"
              name="email"
              onChange={handleFieldChange}
              type="email"
              value={values.email}
            />
            {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
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
                className={`${inputClassName(Boolean(errors.subject))} appearance-none pr-12`}
                id="subject"
                name="subject"
                onChange={handleFieldChange}
                value={values.subject}
              >
                <option value=""></option>
                {currentSubjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
            {errors.subject ? <p className="mt-1 text-sm text-red-600">{errors.subject}</p> : null}
          </div>

          <div>
            <label
              className="cursor-pointer w-fit mb-1 block text-base md:text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="message"
            >
              {translation.labels.message}
            </label>
            <textarea
              className={`${inputClassName(Boolean(errors.message))} min-h-30 resize-y`}
              id="message"
              name="message"
              onChange={handleFieldChange}
              rows={4}
              value={values.message}
            />
            {errors.message ? <p className="mt-1 text-sm text-red-600">{errors.message}</p> : null}
          </div>

          <div>
            <label className="flex items-center cursor-pointer gap-2 md:gap-3 w-fit">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={values.acceptedTerms}
                  onChange={handleTermsChange}
                  className="peer absolute h-0 w-0 opacity-0"
                />

                {/* Custom checkbox */}
                <div className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-md border border-deep-navy-blue-900 bg-transparent transition-colors peer-checked:bg-blue-200 peer-checked:[&>svg]:flex peer-checked:border-2">
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
              <p className="mt-1 text-sm text-red-600">{errors.acceptedTerms}</p>
            ) : null}
          </div>

          <button
            className="mt-3 rounded-xl cursor-pointer w-full border bg-ocean-green-700 border-ocean-green-700 px-4 py-4 text-background transition-colors tracking-wider hover:bg-ocean-green-900 hover:border-ocean-green-800 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
            type="submit"
          >
            {translation.labels.submit}
          </button>

          <div className="min-h-[1.5rem]">
            <p
              aria-live="polite"
              className={`text-lg font-semibold -tracking-[0.02em] transition-opacity duration-250 ease-in-out ${
                isSubmitted ? "opacity-100 text-deep-navy-blue-900" : "opacity-0"
              }`}
            >
              {translation.labels.success}
            </p>
          </div>
        </form>
      </aside>
    </section>
  );
}

export default ContactForm;
