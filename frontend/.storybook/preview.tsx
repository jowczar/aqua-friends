import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import * as NextImage from "next/image";
import React from "react";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props: any) => (
    <OriginalNextImage
      {...props}
      unoptimized
    />
  ),
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
