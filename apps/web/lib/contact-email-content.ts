import type { ContactFormRequest, ContactSubjectId } from "@/lib/contact-form";

export type ContactEmailData = Omit<ContactFormRequest, "acceptedTerms" | "website">;

const subjectLabels: Record<ContactSubjectId, string> = {
  volunteering: "Wolontariat lub wymiana",
  event: "Wspólne działanie lub warsztaty",
  partnership: "Współpraca ze szkołą lub instytucją",
  other: "Inna sprawa",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/gu, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export function createContactEmailContent(data: ContactEmailData, sentAt = new Date()) {
  const topic = subjectLabels[data.subject];
  const language = data.language === "pl" ? "polski" : "angielski";
  const timestamp = sentAt.toISOString();
  const escapedMessage = escapeHtml(data.message).replace(/\r?\n/gu, "<br />");

  const subject = `[Akwedukt] Nowa wiadomość — ${topic}`;
  const text = [
    "NOWA WIADOMOŚĆ Z FORMULARZA AKWEDUKT",
    "",
    `Imię i nazwisko: ${data.name}`,
    `E-mail: ${data.email}`,
    `Temat: ${topic}`,
    `Język formularza: ${language}`,
    `Strona: ${data.sourcePath}`,
    `Wysłano: ${timestamp}`,
    "",
    "WIADOMOŚĆ",
    "---",
    data.message,
    "---",
    "",
    "Aby odpowiedzieć nadawcy, użyj funkcji „Odpowiedz”.",
  ].join("\n");

  const html = `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;background:#f5f7f7;color:#102a43;font-family:Arial,sans-serif;">
    <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
      <div style="overflow:hidden;border:1px solid #d8e2e5;border-radius:16px;background:#ffffff;">
        <div style="padding:24px 28px;background:#103770;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;line-height:1.3;">Nowa wiadomość z formularza Akwedukt</h1>
        </div>
        <div style="padding:28px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.5;">
            <tr><td style="width:170px;padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Imię i nazwisko</td><td style="padding:6px 0;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">E-mail</td><td style="padding:6px 0;">${escapeHtml(data.email)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Temat</td><td style="padding:6px 0;">${escapeHtml(topic)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Język formularza</td><td style="padding:6px 0;">${language}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Strona</td><td style="padding:6px 0;">${escapeHtml(data.sourcePath)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Wysłano</td><td style="padding:6px 0;">${timestamp}</td></tr>
          </table>
          <h2 style="margin:28px 0 10px;font-size:18px;">Treść wiadomości</h2>
          <div style="padding:18px;border-radius:10px;background:#f2f8f7;font-size:16px;line-height:1.65;overflow-wrap:anywhere;">${escapedMessage}</div>
          <p style="margin:24px 0 0;color:#526d7a;font-size:13px;line-height:1.5;">Odpowiedz na tę wiadomość, aby napisać bezpośrednio do nadawcy.</p>
        </div>
      </div>
    </div>
  </body>
</html>`;

  return { html, subject, text };
}
