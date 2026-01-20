import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/services/api';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BlogListSkeleton } from '@/components/LoadingSkeletons';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function BlogList() {
    const listRef = useRef<HTMLDivElement>(null);
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    });

    useGSAP(() => {
        if (!blogs?.length) return;

        gsap.fromTo('.blog-card-item',
            { y: 50, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.5)",
                clearProps: "all"
            }
        );
    }, { scope: listRef, dependencies: [blogs] });

    if (isLoading) return <BlogListSkeleton />;

    if (error) {
        return <div className="text-red-500 glass p-4 rounded-lg border-red-200 bg-red-50/50">Error loading blogs. Please try again later.</div>;
    }

    return (
        <div className="h-full flex flex-col pt-2" ref={listRef}>
            <div className="flex justify-between items-center mb-6 px-1">
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-purple-600 drop-shadow-sm pb-1">
                    Latest Reads
                </h2>
            </div>
            <div className="grid gap-4 pr-3 overflow-y-auto custom-scrollbar pb-20 flex-1">
                {blogs?.map((blog) => (
                    <div key={blog.id} className="blog-card-item transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                        <Link to={`/blog/${blog.id}`} className="block group">
                            <Card className="glass-card h-full overflow-hidden relative border-none ring-1 ring-black/5 bg-white/70">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <CardHeader className="pb-4 relative z-10 p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex flex-wrap gap-2">
                                            {blog.category.slice(0, 2).map(cat => (
                                                <Badge key={cat} variant="outline" className="text-[10px] uppercase tracking-wider bg-white/80 border-black/10 text-black/70 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 font-bold shadow-sm">
                                                    {cat}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <span className="text-[10px] text-muted-foreground font-mono bg-black/5 px-2 py-1 rounded-md mb-2 w-fit">
                                        {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>

                                    <CardTitle className="text-xl font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors duration-300 mt-2">
                                        {blog.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 mt-3 text-sm text-gray-500 font-medium leading-relaxed">
                                        {blog.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>
                ))}
                {blogs?.length === 0 && (
                    <div className="text-center text-muted-foreground p-12 glass rounded-3xl border-dashed border-2 border-gray-300">
                        <div className="text-4xl mb-4">📭</div>
                        No articles found. Time to write one!
                    </div>
                )}
            </div>
        </div>
    );
}
