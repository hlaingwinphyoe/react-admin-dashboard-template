import { Suspense, ComponentType, FC } from "react";
import Spinner from "@/components/shared/Spinner";

const Loadable = <P extends object>(Component: ComponentType<P>): FC<P> => {
  return function LoadableComponent(props: P) {
    return (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default Loadable;
