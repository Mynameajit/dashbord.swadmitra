import { useEffect } from "react";

const useAutoLogout = () => {
  useEffect(() => {
    const handleUnload = () => {
      navigator.sendBeacon(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/auth/logout`,
        JSON.stringify({})
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
};

export default useAutoLogout;
