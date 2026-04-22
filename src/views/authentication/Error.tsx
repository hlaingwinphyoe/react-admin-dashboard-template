import { Button } from "@/components/ui/button";
import ErrorImg from "@/assets/images/backgrounds/errorimg.svg";
import { Link } from "react-router";

const Error = () => (
  <>
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center">
        <img src={ErrorImg} alt="error" className="mb-4" width={500} />
        <h1 className="mb-6 text-4xl text-foreground">Opps!!!</h1>
        <h6 className="text-xl text-foreground">
          This page you are looking for could not be found.
        </h6>
        <Button variant={"default"} className="w-fit mt-6 mx-auto rounded-md">
          <Link to={"/"}>Go Back to Home</Link>
        </Button>
      </div>
    </div>
  </>
);

export default Error;
