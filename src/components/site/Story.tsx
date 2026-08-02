export function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-hero-deep py-20 text-hero-foreground lg:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div className="relative">
          <img
            src="/images/story.jpg"
            alt="Misty terraced tea fields in Uji, Japan at dawn"
            loading="lazy"
            width={1400}
            height={1000}
            className="w-full rounded-[2rem] object-cover"
          />
          <img
            src="/images/ritual.jpg"
            alt="Bamboo whisk and scoop beside a bowl of whisked matcha"
            loading="lazy"
            width={900}
            height={900}
            className="absolute -bottom-10 -right-4 hidden w-44 rounded-2xl object-cover ring-8 ring-hero-deep sm:block lg:-right-10 lg:w-56"
          />
        </div>

        <div className="max-w-lg">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-matcha-light">
            Our Story
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-extrabold leading-[1.04]">
            Shade-grown in Uji.
            <br />
            Stone-ground slowly.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-hero-foreground/70">
            Our leaf spends its final three weeks under shade, deepening the chlorophyll
            that gives kumo its colour and its sweetness. It is then milled on granite at
            thirty grams an hour — slow enough to keep the aroma intact.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-hero-foreground/15 pt-8">
            {[
              ["1912", "Family farm"],
              ["30g", "Milled per hour"],
              ["21", "Days of shade"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl font-extrabold text-matcha-light">
                  {value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-hero-foreground/55">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
