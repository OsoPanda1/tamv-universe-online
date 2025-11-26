import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  author: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

const PostCard = ({ author, timestamp, content, likes, comments, shares }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Card className="p-6 glass hover:shadow-glow transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-primary/50">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {author.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{author}</h3>
            <p className="text-sm text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-muted/50">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <p className="mb-4 leading-relaxed">{content}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span>{likeCount} me gusta</span>
        <span>{comments} comentarios</span>
        <span>{shares} compartidos</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 gap-2 ${
            liked ? "text-destructive" : ""
          } hover:bg-destructive/10 hover:text-destructive transition-colors`}
          onClick={handleLike}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          Me gusta
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-2 hover:bg-primary/10 hover:text-primary">
          <MessageCircle className="w-4 h-4" />
          Comentar
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-2 hover:bg-secondary/10 hover:text-secondary">
          <Share2 className="w-4 h-4" />
          Compartir
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;
