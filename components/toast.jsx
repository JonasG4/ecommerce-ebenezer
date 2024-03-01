"use client";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";

export const ToastGlobal = () => {
  return <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />;
};

export const toastSuccess = (msg, title, subtitle) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <CheckBadgeIcon className="w-10 text-indigo-500" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  ));
};

export class notification {
  constructor() {
    this.toast = toast;
  }

  success(msg, title = "Creado con éxito") {
    this.toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
              <CheckCircleIcon className="w-6 text-indigo-500" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-indigo-600">{title}</p>
              <p className="text-sm text-gray-500">{msg}</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => this.toast.dismiss(t.id)}
          className="flex items-center mx-4"
        >
          <XMarkIcon className="w-4 text-slate-600 cursor-pointer" />
        </div>
      </div>
    ));
  }

  error(msg, title = "Error") {
    this.toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-red-600 ring-opacity-25`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <XCircleIcon className="w-6 text-red-600" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-base font-bold text-red-600">{title}</p>
              <p className="text-sm text-gray-500">{msg}</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => this.toast.dismiss(t.id)}
          className="flex items-center mx-4"
        >
          <XMarkIcon className="w-4 text-slate-600 cursor-pointer" />
        </div>
      </div>
    ));
  }
}
