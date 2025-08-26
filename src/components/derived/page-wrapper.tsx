import gsap from "gsap";
import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function Page({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    }
  }, [title]);

  return (
    <div ref={ref} className="space-y-3.5">
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
