import * as Switch from "@radix-ui/react-switch";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Switch.Root className=" h-5 w-5 bg-white data-[state=checked]:bg-emerald-500">
      <Switch.Thumb />
    </Switch.Root>
  );
}
