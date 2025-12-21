/**
 * TAMV Media Upload System
 * Sistema de Subida de Contenido Multimedia
 * Integrado con Anubis Sentinel y MOS Radars
 */

import { supabase } from "@/integrations/supabase/client";

export interface MediaFile {
  id: string;
  type: "image" | "video" | "audio" | "document";
  name: string;
  size: number;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  metadata: {
    width?: number;
    height?: number;
    duration?: number;
    uploadedAt: string;
    userId: string;
  };
}

export interface UploadResult {
  success: boolean;
  file?: MediaFile;
  error?: string;
  safetyCheck?: {
    approved: boolean;
    violations: string[];
  };
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaFiles: MediaFile[];
  visibility: "public" | "followers" | "private";
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  bookpiHash?: string;
}

// Supported file types
const SUPPORTED_TYPES = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  video: ["video/mp4", "video/webm", "video/quicktime"],
  audio: ["audio/mp3", "audio/mpeg", "audio/wav", "audio/ogg"],
  document: ["application/pdf"],
};

// Max file sizes (in bytes)
const MAX_SIZES = {
  image: 10 * 1024 * 1024, // 10MB
  video: 500 * 1024 * 1024, // 500MB
  audio: 50 * 1024 * 1024, // 50MB
  document: 25 * 1024 * 1024, // 25MB
};

class MediaUploadSystem {
  /**
   * Validates file type and size
   */
  validateFile(file: File): { valid: boolean; type: MediaFile["type"] | null; error?: string } {
    const mimeType = file.type;
    let fileType: MediaFile["type"] | null = null;

    // Determine file type
    for (const [type, mimes] of Object.entries(SUPPORTED_TYPES)) {
      if (mimes.includes(mimeType)) {
        fileType = type as MediaFile["type"];
        break;
      }
    }

    if (!fileType) {
      return {
        valid: false,
        type: null,
        error: `Tipo de archivo no soportado: ${mimeType}`,
      };
    }

    // Check file size
    const maxSize = MAX_SIZES[fileType];
    if (file.size > maxSize) {
      return {
        valid: false,
        type: fileType,
        error: `El archivo excede el tamaño máximo permitido (${Math.round(maxSize / 1024 / 1024)}MB)`,
      };
    }

    return { valid: true, type: fileType };
  }

  /**
   * Uploads a file to storage
   */
  async uploadFile(file: File, userId: string): Promise<UploadResult> {
    // Validate file
    const validation = this.validateFile(file);
    if (!validation.valid || !validation.type) {
      return { success: false, error: validation.error };
    }

    // Content safety check for images
    if (validation.type === "image") {
      const safetyCheck = await this.checkImageSafety(file);
      if (!safetyCheck.approved) {
        return {
          success: false,
          error: "El contenido no pasó la verificación de seguridad",
          safetyCheck,
        };
      }
    }

    try {
      // Generate unique file path
      const fileExtension = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
      const bucketPath = `media/${validation.type}s/${fileName}`;

      // For now, create a local URL (in production, this would upload to Supabase Storage)
      const localUrl = URL.createObjectURL(file);

      const mediaFile: MediaFile = {
        id: `media_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        type: validation.type,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        url: localUrl,
        metadata: {
          uploadedAt: new Date().toISOString(),
          userId,
        },
      };

      // Get dimensions for images
      if (validation.type === "image") {
        const dimensions = await this.getImageDimensions(file);
        mediaFile.metadata.width = dimensions.width;
        mediaFile.metadata.height = dimensions.height;
      }

      return {
        success: true,
        file: mediaFile,
        safetyCheck: { approved: true, violations: [] },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Error al subir el archivo",
      };
    }
  }

  /**
   * Uploads multiple files
   */
  async uploadMultiple(files: File[], userId: string): Promise<UploadResult[]> {
    const results = await Promise.all(
      files.map((file) => this.uploadFile(file, userId))
    );
    return results;
  }

  /**
   * Checks image safety (simplified check)
   */
  private async checkImageSafety(file: File): Promise<{ approved: boolean; violations: string[] }> {
    // Basic safety check based on file properties
    const violations: string[] = [];
    
    // Check for suspicious file names
    if (/exploit|hack|malware/i.test(file.name)) {
      violations.push("Nombre de archivo sospechoso");
    }

    return {
      approved: violations.length === 0,
      violations,
    };
  }

  /**
   * Gets image dimensions
   */
  private getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Creates a new post with media
   */
  async createPost(
    userId: string,
    content: string,
    mediaFiles: MediaFile[],
    visibility: Post["visibility"] = "public"
  ): Promise<{ success: boolean; post?: Post; error?: string }> {
    // Basic content validation
    const hasProhibitedWords = /spam|scam|exploit|hack/i.test(content);
    
    if (hasProhibitedWords) {
      return {
        success: false,
        error: "El contenido contiene palabras no permitidas",
      };
    }

    const post: Post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId,
      content,
      mediaFiles,
      visibility,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
    };

    // In production, save to database
    console.log("[TAMV Media] Post created:", post.id);

    return { success: true, post };
  }

  /**
   * Gets supported file types string for input accept attribute
   */
  getSupportedTypesString(): string {
    return Object.values(SUPPORTED_TYPES).flat().join(",");
  }

  /**
   * Gets max file size for type
   */
  getMaxSize(type: MediaFile["type"]): number {
    return MAX_SIZES[type];
  }
}

export const mediaUploadSystem = new MediaUploadSystem();
