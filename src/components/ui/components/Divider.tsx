import { cn } from '@/lib/cn';

type DividerProps = {
    className?: string;
};

export function Divider({ className }: DividerProps) {
    return <hr className={cn('border-0 h-px bg-(--border-soft)', className)} />;
}
