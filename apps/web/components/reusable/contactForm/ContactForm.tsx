"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";

const subjectOptions = [
  "Chcę wyjechać na wolontariat/wymianę",
  "Chcę zorganizować wspólne działanie/warsztaty",
  "Jestem ze szkoły/instytucji i szukam współpracy",
  "Mam inne, szalone pytanie",
] as const;

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

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Wpisz imię."),
  email: z.string().trim().min(1, "Wpisz e-mail.").email("Podaj poprawny adres e-mail."),
  subject: z
    .string()
    .refine((value) => subjectOptions.includes(value as (typeof subjectOptions)[number]), {
      message: "Wybierz temat.",
    }),
  message: z.string().trim().min(1, "Wpisz wiadomość."),
  acceptedTerms: z.boolean().refine((value) => value, {
    message: "Zaakceptuj regulamin.",
  }),
});

function inputClassName(hasError: boolean) {
  return `w-full rounded-md border bg-transparent px-4 py-3 text-base text-deep-navy-blue-900 placeholder:text-deep-navy-blue-900/90 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-600 focus:ring-red-200"
      : "border-deep-navy-blue-600 focus:ring-deep-navy-blue-200"
  }`;
}

function ContactForm() {
  const mapsPin = "Stowarzyszenie%20Akwedukt,+Kościuszki+35/2,+82-500+Kwidzyn";

  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <section className="py-24 px-20 gap-[10%] flex flex-row items-center justify-between">
      <aside className="flex max-w-162.5 flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-6xl font-bold tracking-tight">Napisz do nas</h2>
          <p className="text-xl text-balance">
            Masz pytanie, problem lub propozycję? Wyślij wiadomość, skontaktujemy się z Tobą
            najszybciej jak to możliwe.
          </p>
        </div>

        <form className="mx-auto flex w-full flex-col gap-6" noValidate onSubmit={handleSubmit}>
          <div>
            <label
              className="cursor-pointer w-fit mb-1 block text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="name"
            >
              Imię
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
              className="cursor-pointer w-fit mb-1 block text-xl font-semibold text-deep-navy-blue-900"
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
              className="cursor-pointer w-fit mb-1 block text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="subject"
            >
              Wybierz temat
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
                {subjectOptions.map((option) => (
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
              className="cursor-pointer w-fit mb-1 block text-xl font-semibold text-deep-navy-blue-900"
              htmlFor="message"
            >
              Wpisz wiadomość
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
            <label className="flex items-center cursor-pointer gap-3">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={values.acceptedTerms}
                  onChange={handleTermsChange}
                  className="peer absolute h-0 w-0 opacity-0"
                />

                {/* Custom checkbox */}
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-deep-navy-blue-900 bg-transparent transition-colors peer-checked:bg-blue-200 peer-checked:[&>svg]:flex peer-checked:border-2">
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

              <span className="text-xl leading-none select-none">
                Akceptuję <span className="underline">Regulamin</span>
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
            Wyślij
          </button>

          {isSubmitted ? (
            <p className="text-lg font-semibold -tracking-[0.02em]">
              Dziękujemy, wiadomość została wysłana.
            </p>
          ) : null}
        </form>
      </aside>

      <aside className="flex justify-center items-center overflow-hidden w-full">
        <iframe
          width="100%"
          height="auto"
          className="aspect-2/1.5"
          //loading="lazy"
          allowFullScreen
          suppressHydrationWarning={true}
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokalizacja Stowarzyszenia Akwedukt na mapie Google Maps"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY}&q=${mapsPin}&zoom=15&maptype=roadmap&language=pl&region=PL`}
        ></iframe>
      </aside>
    </section>
  );
}

export default ContactForm;
