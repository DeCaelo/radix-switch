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
    <Switch.Root className="w-11 rounded-full bg-gray-800 p-px shadow-inner shadow-black/50 transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-gray-600 data-[state=checked]:bg-sky-500 active:data-[state=checked]:bg-sky-400">
      <Switch.Thumb className="block h-6 w-6 rounded-full bg-gray-200 shadow-sm transition duration-500 data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white" />
    </Switch.Root>
  );
}
