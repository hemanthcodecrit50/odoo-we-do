import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold font-headline", className)}>
      <div className="p-1.5 bg-primary rounded-md">
        <Leaf className="h-5 w-5 text-primary-foreground" />
      </div>
      <span>EcoFinds</span>
    </Link>
  );
}
