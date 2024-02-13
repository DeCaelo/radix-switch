import * as Toast from "@radix-ui/react-toast";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function Toastify({
  toast,
  setToast,
}: {
  toast: { message: string } | undefined;
  setToast: Dispatch<SetStateAction<{ message: string } | undefined>>;
}) {
  return (
    <div>
      <button
        onClick={() => setToast({ message: "All changes saved!" })}
        className="w-28 rounded border-t border-white/20 bg-sky-500 py-2 text-white"
      >
        Notify
      </button>

      <Toast.Provider>
        <AnimatePresence mode="popLayout">
          {toast && (
            <Toast.Root
              asChild
              duration={3000}
              className="flex items-center justify-between rounded border border-gray-700 bg-gray-800 px-6 py-4 text-sm font-medium"
            >
              <motion.li
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                layout
                exit={{ opacity: 0, zIndex: -1, transition: { duration: 0.2 } }}
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                className="flex items-center justify-between rounded border border-gray-700 bg-gray-800 px-6 py-4 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <Toast.Description className="text-white">
                  {toast.message}
                </Toast.Description>
                <Toast.Close className="text-gray-600 hover:text-gray-200 focus-visible:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500">
                  <X size={20} />
                </Toast.Close>
              </motion.li>
            </Toast.Root>
          )}
        </AnimatePresence>
        <Toast.Viewport className="fixed right-4 top-4 flex w-80 flex-col-reverse gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500" />
      </Toast.Provider>
    </div>
  );
}
