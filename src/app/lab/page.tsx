import LinkButton from '@/components/general/link-button';

const Page = () => {
  //   redirect("/");
  return (
    <div className="pad-x-page pad-y-page flex h-[150px] grow items-center justify-center">
      Go ahead. Have a blast.&nbsp;
      <LinkButton
        external
        className="inline-flex"
        href="https://linkedin.com/in/raphaelchia"
      >
        Tell me
      </LinkButton>
      &nbsp;where can I improve.
    </div>
  );
};

export default Page;
