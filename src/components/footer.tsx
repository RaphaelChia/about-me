const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pad-x-page font-mono text-sm flex gap-2 flex-wrap items-center justify-between">
      <span>Delivering 0-1 till i&apos;m old.</span>
      <span>{currentYear} (c). Raphael Chia. Made with ❤️ from Singapore.</span>
    </div>
  );
};

export default Footer;
