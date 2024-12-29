import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
  reset: () => void;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options?: UseActionFeedbackOptions
) => {
  const ref = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    if (!ref.current) return;
    ref.current.reset();
  };

  const prevUpdate = useRef(actionState.timestamp);
  const isUpdate = actionState.timestamp !== prevUpdate.current;

  useEffect(() => {
    if (isUpdate) {
      if (options?.onSuccess && actionState.status === "SUCCESS") {
        options.onSuccess({
          actionState,
          reset: handleReset,
        });
      }

      if (options?.onError && actionState.status === "ERROR") {
        options.onError({
          actionState,
          reset: handleReset,
        });
      }

      prevUpdate.current = actionState.timestamp;
    }
  }, [isUpdate, actionState, options]);

  return { ref };
};

export { useActionFeedback };
