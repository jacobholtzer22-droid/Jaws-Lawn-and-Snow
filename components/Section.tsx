type Tone = "birch" | "pine" | "loam" | "cream";

type Props = {
  id?: string;
  /** Background band. birch/cream = warm readable; pine/loam = deep green spine. */
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

const toneClasses: Record<Tone, string> = {
  birch: "bg-birch text-loam",
  cream: "bg-birch-deep text-loam",
  pine: "bg-pine text-birch",
  loam: "bg-loam text-birch",
};

/** Consistent vertical rhythm + tone band. Keeps section padding in one place. */
export default function Section({
  id,
  tone = "birch",
  className = "",
  children,
}: Props) {
  return (
    <section id={id} className={`${toneClasses[tone]} py-20 sm:py-28 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
