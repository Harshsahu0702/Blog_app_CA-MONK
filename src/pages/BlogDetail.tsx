import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '@/services/api';
import { Button } from '@/components/ui/button';
import { BlogDetailSkeleton } from '@/components/LoadingSkeletons';
import { ThumbsUp, Clock, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => getBlogById(id!),
        enabled: !!id,
    });

    useGSAP(() => {
        if (!blog) return;

        const tl = gsap.timeline();

        // Use fromTo to ensure start and end states are explicit, avoiding 'stuck' invisible states
        tl.fromTo('.hero-card',
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", clearProps: "transform" } // clearProps transform to allow sticky/other css to work? no, just opacity/y is fine.
        )
            .fromTo('.hero-content > *',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.8"
            )
            .fromTo('.content-card',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.6"
            )
            .fromTo('.sidebar-card',
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            );

    }, { scope: containerRef, dependencies: [blog] });

    if (isLoading) return <BlogDetailSkeleton />;
    if (error || !blog) return <div className="p-8 text-center text-red-500 glass rounded-xl">Blog not found.</div>;

    return (
        <div className="max-w-5xl mx-auto pb-20 px-2" ref={containerRef}>
            <div className="space-y-8 pt-4">
                {/* Hero Section */}
                {/* Hero Section - Split Layout */}
                <div className="hero-card grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                    <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/10 group isolate h-min self-start">
                        <div className="absolute inset-0 z-[-1]">
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="hero-img object-cover w-full h-[120%] -mt-[10%]"
                            />
                        </div>
                        {/* Subtle inner shadow/gradient for depth */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
                    </div>

                    <div className="hero-content space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            {blog.category.map((cat, index) => (
                                <span key={cat} className={`uppercase text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full border shadow-sm ${index === 0 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white text-gray-500 border-gray-200'}`}>
                                    {cat}
                                </span>
                            ))}
                            <span className="text-muted-foreground text-xs font-medium flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/50">
                                <Clock className="w-3 h-3" /> 5 min read
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-[1.1]">
                            {blog.title}
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-primary/30 pl-4 font-medium">
                            {blog.description}
                        </p>

                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-10 w-10 rounded-full p-0.5 bg-gradient-to-tr from-primary to-purple-400">
                                <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-primary font-bold text-sm">
                                    A
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-sm text-gray-900">Anonymous Author</div>
                                <div className="text-xs text-muted-foreground">Financial Tech Expert</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <div className="content-card glass-card rounded-[2rem] p-8 md:p-12 space-y-8 relative overflow-hidden bg-white/80 border-white/60 shadow-xl ring-1 ring-black/5">
                            {/* Author Info */}
                            <div className="flex items-center gap-4 border-b border-gray-100 pb-8">
                                <div className="h-14 w-14 rounded-full p-1 bg-gradient-to-tr from-primary to-purple-400">
                                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-primary font-bold text-xl">
                                        A
                                    </div>
                                </div>
                                <div className="flex-1">
                                    {/* Fixed Text Alignment */}
                                    <div className="font-bold text-xl text-gray-900 leading-none mb-1">Anonymous Author</div>
                                    <div className="text-sm text-gray-500 font-medium">Financial Tech Expert</div>
                                </div>
                                <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors">
                                    Follow
                                </Button>
                            </div>

                            {/* Text Content */}
                            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-loose prose-a:text-primary prose-strong:text-gray-900 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-xl">
                                <p className="text-xl md:text-2xl font-light text-gray-500 leading-normal mb-8 border-l-4 border-purple-500 pl-6 py-1">
                                    {blog.description}
                                </p>
                                <div className="whitespace-pre-line text-lg text-gray-700 leading-8">
                                    {blog.content}
                                </div>
                            </div>

                            <div className="pt-10 border-t border-gray-100 flex justify-between items-center group cursor-pointer hover:bg-gray-50/50 -mx-4 px-4 rounded-xl transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Up Next</span>
                                    <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">The Future of AI in Banking</span>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Toc / Meta */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="sidebar-card glass-card rounded-[2rem] p-6 bg-white/60 sticky top-4">
                            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                <ThumbsUp className="w-5 h-5 text-primary" />
                                Popularity
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Views</span>
                                    <span className="font-mono font-bold">12.5k</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div className="bg-gradient-to-r from-primary to-purple-500 w-[75%] h-full rounded-full" />
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Likes</span>
                                    <span className="font-mono font-bold">843</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
