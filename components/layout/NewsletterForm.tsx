'use client';

export default function NewsletterForm() {
  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="bg-cyber-black border border-cyber-cyan/15 text-cyber-text text-sm px-3 py-2.5 placeholder:text-cyber-muted/50 focus:outline-none focus:border-cyber-cyan/50 transition-colors font-space"
      />
      <button type="submit" className="cyber-btn w-full justify-center py-2.5">
        SUBSCRIBE
      </button>
    </form>
  );
}
