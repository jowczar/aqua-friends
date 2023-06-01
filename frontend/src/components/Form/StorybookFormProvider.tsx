import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { ReactElement, ReactNode, FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const StorybookFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();

  const onSubmit = methods.handleSubmit(action("[React Hooks Form] Submit"));

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

const StorybookFormDecorator =
  (showSubmitButton: boolean) =>
  // eslint-disable-next-line react/display-name
  (Story: FC): ReturnType<StoryFn<ReactElement>> =>
    (
      <StorybookFormProvider>
        <Story />
        {showSubmitButton && (
          <button
            type="submit"
            className="bg-blue-500 text-xs mt-4 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </StorybookFormProvider>
    );

export default StorybookFormDecorator;
