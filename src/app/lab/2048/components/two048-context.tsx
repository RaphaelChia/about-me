'use client';

import CodeInline from '@/components/code/code-inline';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Two048Context = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Context</AccordionTrigger>
        <AccordionContent>
          <div>
            2048 core concept is simple: <strong>Array Manipulation.</strong>
            <br />
            One interesting things is, there&apos;s only 1 function to move rows
            to the left. So, shifting up, down, left, right, all reuses the same
            function.
            <br />
            To determine if the game is over, i just check for 3 things:
            <div className="flex flex-wrap gap-0.5">
              <CodeInline>!hasHorizontalMerges</CodeInline>
              <CodeInline>!hasVerticalMerges</CodeInline>
              <CodeInline>!hasEmptyCells</CodeInline>
            </div>
            If <strong>all</strong> of these are true, the game is over.
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Two048Context;
