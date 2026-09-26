import { List, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TocItem {
  index: number;
  preview: string;
  ts?: number;
}

interface SessionTocSidebarProps {
  items: TocItem[];
  onItemClick: (index: number) => void;
}

export function SessionTocSidebar({
  items,
  onItemClick,
}: SessionTocSidebarProps) {
  const { t } = useTranslation();
  if (items.length <= 2) return null;

  return (
    <div className="w-64 border-l shrink-0 hidden xl:block">
      <div className="p-3 border-b">
        <div className="flex items-center gap-2 text-[12.35px] leading-[1.3] font-medium text-muted-foreground">
          <List className="size-3.5" />
          <span>{t("sessionManager.tocTitle")}</span>
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-40px)]">
        <div className="p-2 space-y-0.5">
          {items.map((item, tocIndex) => (
            <Button
              key={item.index}
              type="button"
              variant="ghost"
              onClick={() => onItemClick(item.index)}
              className="h-auto w-full min-w-0 items-start justify-start gap-1 overflow-hidden whitespace-normal px-2 py-1 text-left text-[12.35px] leading-[1.3] duration-0"
            >
              <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-[4px] bg-primary/10 px-1 text-primary text-[12.35px] font-medium">
                {tocIndex + 1}
              </span>
              <span
                title={item.preview}
                className="min-w-0 flex-1 line-clamp-2 [overflow-wrap:anywhere]"
              >
                {item.preview}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

interface SessionTocDialogProps {
  items: TocItem[];
  onItemClick: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SessionTocDialog({
  items,
  onItemClick,
  open,
  onOpenChange,
}: SessionTocDialogProps) {
  const { t } = useTranslation();
  if (items.length <= 2) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-8 right-4 xl:hidden rounded-[30px] shadow-lg z-30"
        >
          <List className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-md max-h-[70vh] flex flex-col p-0 gap-0"
        zIndex="alert"
        onInteractOutside={() => onOpenChange(false)}
        onEscapeKeyDown={() => onOpenChange(false)}
      >
        <DialogHeader className="p-2 relative">
          <DialogTitle className="flex items-center gap-2 text-[12.35px] leading-[1.3] font-semibold">
            <List className="size-4 text-primary" />
            {t("sessionManager.tocTitle")}
          </DialogTitle>
          <DialogClose
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={t("common.close")}
          >
            <X className="size-4 text-muted-foreground" />
          </DialogClose>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(70vh-80px)]">
          <div className="p-3 pb-4 space-y-1">
            {items.map((item, tocIndex) => (
              <Button
                key={item.index}
                type="button"
                variant="ghost"
                onClick={() => onItemClick(item.index)}
                className="h-auto w-full min-w-0 items-start justify-start gap-1 overflow-hidden whitespace-normal px-2 py-1 text-left text-[12.35px] leading-[1.3] duration-0"
              >
                <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-[4px] bg-primary px-1 text-primary-foreground text-[12.35px] font-medium">
                  {tocIndex + 1}
                </span>
                <span
                  title={item.preview}
                  className="min-w-0 flex-1 line-clamp-2 [overflow-wrap:anywhere]"
                >
                  {item.preview}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
