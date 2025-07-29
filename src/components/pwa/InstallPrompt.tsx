import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if installed as PWA
    if (
      window.navigator &&
      "standalone" in window.navigator &&
      (window.navigator as any).standalone
    ) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI notify the user they can install the PWA
      setShowInstallPrompt(true);
      console.log("beforeinstallprompt event fired");
    };

    const handleAppInstalled = () => {
      // Clear the deferredPrompt so it can be garbage collected
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
      setIsInstalled(true);
      console.log("PWA was installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Check if should display install prompt
    const isIos = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase(),
    );
    if (isIos && !isInstalled) {
      // iOS doesn't support beforeinstallprompt, show custom instructions
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // iOS fallback
      const isIos = /iphone|ipad|ipod/.test(
        window.navigator.userAgent.toLowerCase(),
      );
      if (isIos) {
        alert(
          'To install this app on iOS:\n1. Tap the share button\n2. Tap "Add to Home Screen"',
        );
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // We no longer need the prompt. Clear it up.
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't clear deferredPrompt so user can still install later
  };

  if (!showInstallPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 md:bottom-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            Install FoodSwipe
          </h3>
          <p className="text-sm text-gray-600">
            Add FoodSwipe to your home screen for quick access and better
            experience!
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleInstallClick}
            className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 flex items-center space-x-1"
          >
            <Download size={16} />
            <span>Install</span>
          </button>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

