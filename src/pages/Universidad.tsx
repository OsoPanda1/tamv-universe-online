import { useState } from "react";
import TopToolbar from "@/components/layout/TopToolbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Book, Users, Clock } from "lucide-react";
import universityBg from "@/assets/university-background.jpg";

const Universidad = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [topToolbarExpanded, setTopToolbarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("universidad");

  const courses = [
    { id: 1, title: "Desarrollo en Metaverso", instructor: "Dr. Silva", students: 156, duration: "8 semanas", level: "Intermedio", image: universityBg },
    { id: 2, title: "IA y Consciencia Digital", instructor: "Dra. Martínez", students: 203, duration: "10 semanas", level: "Avanzado", image: universityBg },
    { id: 3, title: "Blockchain Fundamentals", instructor: "Ing. López", students: 342, duration: "6 semanas", level: "Principiante", image: universityBg },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <TopToolbar
        expanded={topToolbarExpanded}
        onToggleExpand={() => setTopToolbarExpanded(!topToolbarExpanded)}
        onSectionChange={setActiveSection}
      />

      <div className="flex h-[calc(100vh-64px)] mt-16">
        <LeftSidebar
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 holographic">Universidad TAMV</h1>
              <p className="text-muted-foreground">Aprende las tecnologías del futuro</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="glass overflow-hidden hover:shadow-neon-purple transition-all">
                  <div className="relative aspect-video">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <Badge className="absolute top-4 right-4">{course.level}</Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-primary mt-1" />
                      <h3 className="text-2xl font-bold">{course.title}</h3>
                    </div>
                    <p className="text-primary mb-4">{course.instructor}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{course.students} estudiantes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <Button className="w-full gap-2">
                      <Book className="w-4 h-4" />
                      Inscribirse
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <RightSidebar
          isOpen={rightSidebarOpen}
          onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        />
      </div>
    </div>
  );
};

export default Universidad;
