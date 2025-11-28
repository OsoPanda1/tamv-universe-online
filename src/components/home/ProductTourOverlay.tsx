import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ChevronRight } from "lucide-react";
import { ProductTourStep } from "@/types/tamv";

interface ProductTourOverlayProps {
  steps: ProductTourStep[];
  currentStepIndex: number;
  isActive: boolean;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

export const ProductTourOverlay = ({
  steps,
  currentStepIndex,
  isActive,
  onNext,
  onSkip,
  onFinish,
}: ProductTourOverlayProps) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  useEffect(() => {
    if (isActive && currentStep) {
      const element = document.querySelector(currentStep.targetSelector) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isActive, currentStep]);

  if (!isActive || !currentStep) return null;

  const targetRect = targetElement?.getBoundingClientRect();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Spotlight en el elemento objetivo */}
        {targetRect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute pointer-events-none"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              boxShadow: "0 0 0 4px rgba(96, 165, 250, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.7)",
              borderRadius: "12px",
              zIndex: 51,
            }}
          />
        )}

        {/* Tarjeta flotante con instrucciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-52 mx-4 max-w-md"
        >
          <Card className="glass border-2 border-primary/60 p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {currentStep.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentStep.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onSkip}
                className="ml-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentStepIndex
                        ? "w-8 bg-primary"
                        : index < currentStepIndex
                        ? "w-4 bg-primary/50"
                        : "w-4 bg-border"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onSkip}>
                  Omitir tour
                </Button>
                <Button size="sm" onClick={isLastStep ? onFinish : onNext}>
                  {isLastStep ? "Finalizar" : "Siguiente"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
