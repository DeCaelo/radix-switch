import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Switch from "@radix-ui/react-switch";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { Check } from "lucide-react";
import { z } from "zod";
import { useToast } from "~/components/toast";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const schema = z.object({
  switch: z.optional(z.enum(["on", "off"])),
  agree: z.enum(["on", "off"]),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(submission);
  return redirect("/");
}

export default function Index() {
  const { showToast } = useToast();
  const [form, fields] = useForm({
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  return (
    <>
      <Form method="post" id={form.id} onSubmit={form.onSubmit}>
        <label className="flex space-x-4" htmlFor="switch">
          <span className="font-medium text-white">Airplane Mode</span>
          <Switch.Root
            name={fields.switch.name}
            className="w-11 rounded-full bg-gray-800 p-px shadow-inner shadow-black/50 transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-gray-600 data-[state=checked]:bg-sky-500 active:data-[state=checked]:bg-sky-400"
          >
            <Switch.Thumb className="block h-6 w-6 rounded-full bg-gray-200 shadow-sm transition duration-500 data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white" />
          </Switch.Root>
        </label>
        <div className="text-red-500">{fields.switch.errors}</div>
        <div className="mt-8">
          <label className="mr-2 text-white" htmlFor="agree">
            Agree to terms?
          </label>
          <Checkbox.Root
            name={fields.agree.name}
            className="h-4 w-4 rounded-sm bg-slate-50"
          >
            <Checkbox.Indicator className="block">
              <Check size="16" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <div className="text-red-500">{fields.agree.errors}</div>
        </div>
        <div className="mt-4">
          <button
            className="rounded bg-white/90 px-3 py-1 font-bold text-gray-900"
            type="submit"
            onClick={() => {
              showToast("User saved!");
            }}
          >
            save
          </button>
        </div>
      </Form>
    </>
  );
}
