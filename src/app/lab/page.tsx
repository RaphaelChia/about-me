import LinkButton from '@/components/general/link-button';

const Page = () => {
  //   redirect("/");
  return (
    <div className="pad-x-page pad-y-page h-[250px] w-full items-center justify-center text-center">
      Go ahead. Have a blast.{' '}
      <LinkButton
        external
        className="inline-block"
        href="https://backprop.finance"
      >
        Let me know
      </LinkButton>{' '}
      where can I improve.
    </div>
  );
};

export default Page;
