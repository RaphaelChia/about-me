import { CheckboxRow } from '@/app/lab/checks/components/checkbox';
import CheckboxStats from '@/app/lab/checks/components/checkbox-stats';

const Page = () => {
  return (
    <div className="pad-x-page pad-y-page w-full bg-red-100">
      <CheckboxStats />
      <CheckboxRow />
    </div>
  );
};

export default Page;
