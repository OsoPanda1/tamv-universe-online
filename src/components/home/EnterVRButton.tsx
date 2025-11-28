import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Glasses, AlertCircle } from "lucide-react";

const VR_PROMPT_KEY = "tamv_hide_vr_prompt";

export const EnterVRButton = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [hidePrompt, setHidePrompt] = useState(false);

  useEffect(() => {
    // Check WebXR support
    if ("xr" in navigator) {
      (navigator as any).xr?.isSessionSupported("immersive-vr").then((supported: boolean) => {
        setIsSupported(supported);
      });
    }

    // Check if user wants to hide prompt
    const hidden = localStorage.getItem(VR_PROMPT_KEY);
    setHidePrompt(hidden === "true");
  }, []);

  const handleClick = () => {
    if (isSupported) {
      // TODO: Implement startXRScene()
      console.log("Starting VR session...");
    } else {
      if (!hidePrompt) {
        setShowDialog(true);
      }
    }
  };

  const handleDontShowAgain = () => {
    localStorage.setItem(VR_PROMPT_KEY, "true");
    setHidePrompt(true);
    setShowDialog(false);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        size="lg"
        variant="outline"
        className="fixed bottom-6 left-6 z-40 gap-2 shadow-lg hover:shadow-xl transition-all"
      >
        <Glasses className="w-5 h-5" />
        <span>Entrar en VR</span>
        {isSupported && (
          <Badge className="bg-emerald-500/90 ml-2">Disponible</Badge>
        )}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Modo VR no disponible
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-4">
              <p>
                Tu dispositivo actual no soporta WebXR para experiencias de realidad virtual.
              </p>
              <p className="text-sm">
                Puedes disfrutar TAMV en modo 3D estándar o acceder desde un dispositivo con
                capacidades VR (Meta Quest, HTC Vive, etc.).
              </p>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Continuar en modo normal
                </Button>
                <Button onClick={handleDontShowAgain}>
                  No volver a mostrar
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
