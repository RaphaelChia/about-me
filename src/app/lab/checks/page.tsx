import { CheckboxWindow } from '@/app/lab/checks/components/checkbox';

const Page = () => {
  return (
    <div className="pad-x-page pad-y-page flex w-full flex-col gap-8 max-sm:flex-col-reverse xl:flex-row-reverse xl:justify-end">
      <CheckboxWindow />
    </div>
  );
};

export default Page;
