import type { VolunteerTypes } from "@/sanity/typegen";

export default function VolunteerTypes({ item }: { item: VolunteerTypes }) {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="heading-2 mb-16 text-center">{item.title}</h2>

        <div className="grid gap-10 lg:grid-cols-3">
          {item.sections?.map((section) => (
            <article key={section._key}>
              <div className="mb-6">
                <span className="text-5xl font-bold">{section.number}</span>

                <h3 className="mt-2">{section.title}</h3>
              </div>

              <div className="space-y-6">
                {section.items?.map((subItem) => (
                  <div key={subItem._key}>
                    <h4 className="font-semibold">{subItem.title}</h4>

                    <p>{subItem.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
