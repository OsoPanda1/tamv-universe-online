/**
 * TAMV - Modal de Creación de Contenido
 * Sistema completo para publicar fotos, videos y audios
 */

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  Video,
  Music,
  X,
  Upload,
  Sparkles,
  Send,
  Camera,
  Mic,
  FileVideo,
  Globe,
  Lock,
  Users,
  Hash,
  Smile,
  MapPin,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (post: PostData) => void;
}

export interface PostData {
  id: string;
  type: "text" | "photo" | "video" | "audio";
  content: string;
  mediaUrls: string[];
  visibility: "public" | "friends" | "private";
  tags: string[];
  location?: string;
  createdAt: Date;
}

type MediaType = "photo" | "video" | "audio";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: MediaType;
  progress: number;
}

export const CreatePostModal = ({ isOpen, onClose, onPost }: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [activeTab, setActiveTab] = useState<MediaType | "text">("text");
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">("public");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [location, setLocation] = useState("");

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (type: MediaType) => {
    switch (type) {
      case "photo":
        photoInputRef.current?.click();
        break;
      case "video":
        videoInputRef.current?.click();
        break;
      case "audio":
        audioInputRef.current?.click();
        break;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: MediaType) => {
    const files = e.target.files;
    if (!files) return;

    const newMediaFiles: MediaFile[] = [];

    Array.from(files).forEach((file) => {
      const id = `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const preview = URL.createObjectURL(file);

      newMediaFiles.push({
        id,
        file,
        preview,
        type,
        progress: 0,
      });
    });

    setMediaFiles((prev) => [...prev, ...newMediaFiles]);
    simulateUpload(newMediaFiles);
  };

  const simulateUpload = (files: MediaFile[]) => {
    setIsUploading(true);
    
    files.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setIsUploading(false);
        }
        setMediaFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress: Math.min(100, progress) } : f))
        );
      }, 200);
    });
  };

  const removeMedia = (id: string) => {
    setMediaFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handlePost = () => {
    if (!content.trim() && mediaFiles.length === 0) {
      toast({
        title: "Contenido vacío",
        description: "Agrega texto o archivos multimedia para publicar.",
        variant: "destructive",
      });
      return;
    }

    const postData: PostData = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: mediaFiles.length > 0 ? mediaFiles[0].type : "text",
      content,
      mediaUrls: mediaFiles.map((f) => f.preview),
      visibility,
      tags,
      location: location || undefined,
      createdAt: new Date(),
    };

    onPost(postData);
    toast({
      title: "¡Publicación creada!",
      description: "Tu contenido se ha compartido exitosamente.",
    });

    // Reset form
    setContent("");
    setMediaFiles([]);
    setTags([]);
    setLocation("");
    onClose();
  };

  const getVisibilityIcon = () => {
    switch (visibility) {
      case "public":
        return <Globe className="w-4 h-4" />;
      case "friends":
        return <Users className="w-4 h-4" />;
      case "private":
        return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass border border-primary/20 p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-border/50">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-primary" />
            Crear Publicación
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          {/* Media Type Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as MediaType | "text")}>
            <TabsList className="w-full grid grid-cols-4 glass">
              <TabsTrigger value="text" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Texto
              </TabsTrigger>
              <TabsTrigger value="photo" className="gap-2">
                <Image className="w-4 h-4" />
                Foto
              </TabsTrigger>
              <TabsTrigger value="video" className="gap-2">
                <Video className="w-4 h-4" />
                Video
              </TabsTrigger>
              <TabsTrigger value="audio" className="gap-2">
                <Music className="w-4 h-4" />
                Audio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="¿Qué estás pensando? Comparte tus ideas con el metaverso..."
                className="min-h-[120px] resize-none bg-muted/30 border-border/50 focus:border-primary"
              />
            </TabsContent>

            <TabsContent value="photo" className="mt-4">
              <div className="space-y-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe tu foto..."
                  className="min-h-[80px] resize-none bg-muted/30 border-border/50 focus:border-primary"
                />
                <Card
                  onClick={() => handleFileSelect("photo")}
                  className="border-2 border-dashed border-primary/30 hover:border-primary/50 p-8 text-center cursor-pointer transition-colors"
                >
                  <Camera className="w-12 h-12 mx-auto text-primary/60 mb-2" />
                  <p className="text-muted-foreground">Haz clic para subir fotos</p>
                  <p className="text-xs text-muted-foreground/70">JPG, PNG, GIF hasta 10MB</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="video" className="mt-4">
              <div className="space-y-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe tu video..."
                  className="min-h-[80px] resize-none bg-muted/30 border-border/50 focus:border-primary"
                />
                <Card
                  onClick={() => handleFileSelect("video")}
                  className="border-2 border-dashed border-secondary/30 hover:border-secondary/50 p-8 text-center cursor-pointer transition-colors"
                >
                  <FileVideo className="w-12 h-12 mx-auto text-secondary/60 mb-2" />
                  <p className="text-muted-foreground">Haz clic para subir videos</p>
                  <p className="text-xs text-muted-foreground/70">MP4, MOV, WebM hasta 500MB</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audio" className="mt-4">
              <div className="space-y-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe tu audio..."
                  className="min-h-[80px] resize-none bg-muted/30 border-border/50 focus:border-primary"
                />
                <Card
                  onClick={() => handleFileSelect("audio")}
                  className="border-2 border-dashed border-accent/30 hover:border-accent/50 p-8 text-center cursor-pointer transition-colors"
                >
                  <Mic className="w-12 h-12 mx-auto text-accent/60 mb-2" />
                  <p className="text-muted-foreground">Haz clic para subir audio</p>
                  <p className="text-xs text-muted-foreground/70">MP3, WAV, OGG hasta 50MB</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Hidden File Inputs */}
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileChange(e, "photo")}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "video")}
          />
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "audio")}
          />

          {/* Media Preview */}
          <AnimatePresence>
            {mediaFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
                {mediaFiles.map((media) => (
                  <motion.div
                    key={media.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative aspect-square rounded-lg overflow-hidden border border-border/50"
                  >
                    {media.type === "photo" && (
                      <img
                        src={media.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {media.type === "video" && (
                      <video
                        src={media.preview}
                        className="w-full h-full object-cover"
                        muted
                      />
                    )}
                    {media.type === "audio" && (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                        <Music className="w-12 h-12 text-accent" />
                      </div>
                    )}

                    {/* Progress overlay */}
                    {media.progress < 100 && (
                      <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center p-4">
                        <Upload className="w-6 h-6 text-primary mb-2 animate-pulse" />
                        <Progress value={media.progress} className="w-full h-2" />
                        <span className="text-xs mt-1">{Math.round(media.progress)}%</span>
                      </div>
                    )}

                    {/* Remove button */}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 w-6 h-6"
                      onClick={() => removeMedia(media.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                placeholder="Agregar etiquetas..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              />
              <Button size="sm" variant="ghost" onClick={addTag}>
                Agregar
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/20"
                    onClick={() => removeTag(tag)}
                  >
                    #{tag} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Agregar ubicación..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setVisibility(
                  visibility === "public"
                    ? "friends"
                    : visibility === "friends"
                    ? "private"
                    : "public"
                )
              }
              className="gap-2"
            >
              {getVisibilityIcon()}
              {visibility === "public" && "Público"}
              {visibility === "friends" && "Amigos"}
              {visibility === "private" && "Privado"}
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handlePost}
              disabled={isUploading}
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Send className="w-4 h-4" />
              Publicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
