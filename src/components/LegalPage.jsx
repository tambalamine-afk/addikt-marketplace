export default function LegalPage({ title, updatedAt, children }) {
  return (
    <div className="max-w-[760px] mx-auto px-6 py-12 md:py-16">
      <p className="text-xs uppercase tracking-widest text-secondary mb-3" style={{ fontFamily: '"Google Sans", sans-serif' }}>
        Mis à jour le {updatedAt}
      </p>
      <h1 className="text-[28px] md:text-[40px] font-bold uppercase leading-tight tracking-tight text-primary mb-10" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
        {title}
      </h1>
      <div className="flex flex-col gap-8 text-[16px] leading-relaxed text-on-surface-variant" style={{ fontFamily: '"Google Sans", sans-serif' }}>
        {children}
      </div>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[17px] font-bold uppercase text-primary" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function LegalList({ children }) {
  return <ul className="list-disc pl-5 flex flex-col gap-1.5">{children}</ul>;
}
