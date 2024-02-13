import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ToastProvider } from "./components/toast";
import "./tailwind.css";

import { LoaderFunctionArgs, json } from "@remix-run/node";

import { combineHeaders } from "./utils/misc";
import { makeTimings } from "./utils/timing.server";
import { getToast } from "./utils/toast.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const timings = makeTimings("root loader");
  const { toast, headers: toastHeaders } = await getToast(request);

  return json(
    { toast },
    {
      headers: combineHeaders(
        { "Server-Timing": timings.toString() },
        toastHeaders,
      ),
    },
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen w-screen items-center justify-center bg-gray-900">
        <ToastProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </ToastProvider>
      </body>
    </html>
  );
}
