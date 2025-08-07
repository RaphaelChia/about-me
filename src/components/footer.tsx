const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pad-x-page font-mono text-sm flex gap-2 flex-wrap items-center justify-between max-md:justify-end">
      <span className="max-md:hidden">🚢-ing 0-1 till i&apos;m old.</span>
      <div className="flex gap-2">
        <span>{currentYear} (c). Raphael Chia.</span>
        <span className="max-md:hidden">Made with ❤️ from Singapore.</span>
      </div>
    </div>
  );
};

export default Footer;
