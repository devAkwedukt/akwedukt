"use client";

import { Button } from "../ui/Button";

export default function ButtonExamples() {
  return (
    <div className="flex flex-col gap-6">
      {/* SMALL */}
      <div className="flex flex-wrap gap-4 sm:flex-nowrap">
        <Button
          size="small"
          variant="primary"
          leftIcon="arrow-left-alt"
          rightIcon="arrow-right-alt"
        >
          variant: primary size: small
        </Button>

        <Button
          size="small"
          variant="secondary"
          leftIcon="arrow-left-alt"
          rightIcon="arrow-right-alt"
        >
          variant: secondary size: small
        </Button>

        <Button size="small" variant="link" leftIcon="arrow-left-alt" rightIcon="arrow-right-alt">
          variant: link size: small
        </Button>
      </div>

      {/* MEDIUM */}
      <div className="flex flex-wrap gap-4 sm:flex-nowrap">
        <Button
          size="medium"
          variant="primary"
          leftIcon="arrow-left-alt"
          rightIcon="arrow-right-alt"
        >
          variant: primary size: medium
        </Button>

        <Button
          size="medium"
          variant="secondary"
          leftIcon="arrow-left-alt"
          rightIcon="arrow-right-alt"
        >
          variant: secondary size: medium
        </Button>

        <Button size="medium" variant="link" leftIcon="arrow-left-alt" rightIcon="arrow-right-alt">
          variant: link size: medium
        </Button>
      </div>

      {/* LARGE */}
      <div className="flex flex-wrap gap-4 sm:flex-nowrap">
        <Button
          size="large"
          variant="primary"
          leftIcon="arrow-left-alt"
          rightIcon="arrow-right-alt"
        >
          variant: primary size: large
        </Button>

        <Button
          size="large"
          variant="secondary"
          leftIcon="arrow-left-alt"
          rightIcon="arrow-right-alt"
        >
          variant: secondary size: large
        </Button>

        <Button size="large" variant="link" leftIcon="arrow-left-alt" rightIcon="arrow-right-alt">
          variant: link size: large
        </Button>
      </div>

      {/* DISABLED STATES */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-700">Disabled States</h3>
        <div className="flex flex-wrap gap-8 sm:flex-nowrap">
          <Button size="small" variant="primary" disabled>
            variant: primary size: small
          </Button>
          <Button size="medium" variant="secondary" disabled>
            variant: secondary size: medium
          </Button>
          <Button size="large" variant="link" disabled>
            variant: link size: large
          </Button>
        </div>
      </div>
      <div>
        <Button size="xs" variant="filter" rightIcon="add">
          variant: filter size: xs
        </Button>
      </div>
    </div>
  );
}
