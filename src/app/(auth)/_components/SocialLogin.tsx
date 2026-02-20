import { JSX } from "react";

export default function SocialLogin(): JSX.Element {
  return (
    <>
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-3 text-sm text-gray-400">OR CONTINUE WITH</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <div className="flex gap-4">
        <button className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition">
          Google
        </button>

        <button className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition">
          Facebook
        </button>
      </div>
    </>
  );
}
