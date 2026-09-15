import Loader from "./Loader";

interface PageLoaderProps {
  text?: string;
}

function PageLoader({ text = "Loading..." }: PageLoaderProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <Loader size="lg" text={text} />
    </div>
  );
}

export default PageLoader;
