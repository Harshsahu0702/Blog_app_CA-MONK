import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog, type NewBlog } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, Sparkles, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function CreateBlog() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<NewBlog>({
        title: '',
        category: [],
        description: '',
        date: new Date().toISOString(),
        coverImage: '',
        content: ''
    });

    const [categoryInput, setCategoryInput] = useState('');

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            navigate(`/blog/${data.id}`);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            ...formData,
            date: new Date().toISOString()
        });
    };

    const handleCategoryAdd = () => {
        if (categoryInput.trim()) {
            setFormData(prev => ({
                ...prev,
                category: [...prev.category, categoryInput.trim()]
            }));
            setCategoryInput('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto py-8"
        >
            <Card className="glass-card shadow-2xl border-white/40 bg-white/70">
                <CardHeader className="space-y-1 text-center pb-8 border-b border-gray-100/50">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-primary flex items-center justify-center mb-4 shadow-xl shadow-primary/20">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        Create New Blog
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-500">Share your brilliant ideas with the world</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 group">
                            <Label htmlFor="title" className="group-focus-within:text-primary transition-colors text-gray-700 font-semibold">Title</Label>
                            <Input
                                id="title"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter an eye-catching title..."
                                className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 h-12 text-lg text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-gray-700 font-semibold">Categories</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="category"
                                    value={categoryInput}
                                    onChange={e => setCategoryInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleCategoryAdd();
                                        }
                                    }}
                                    placeholder="Add a category tag"
                                    className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 text-gray-900 placeholder:text-gray-400"
                                />
                                <Button type="button" onClick={handleCategoryAdd} variant="secondary" className="hover:bg-primary hover:text-white transition-colors bg-white border border-gray-200 shadow-sm">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3 min-h-[30px]">
                                {formData.category.map((cat, idx) => (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        key={idx}
                                        className="bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-bold"
                                    >
                                        {cat}
                                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, category: prev.category.filter(c => c !== cat) }))} className="hover:text-red-500 text-primary/60 transition-colors">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverImage" className="text-gray-700 font-semibold">Cover Image URL</Label>
                            <Input
                                id="coverImage"
                                required
                                value={formData.coverImage}
                                onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                                className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 font-mono text-xs text-gray-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-700 font-semibold">Short Description</Label>
                            <Textarea
                                id="description"
                                required
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="What is this article about?"
                                rows={3}
                                className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 resize-none text-gray-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-gray-700 font-semibold">Content</Label>
                            <Textarea
                                id="content"
                                required
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Start writing your masterpiece..."
                                className="min-h-[250px] bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 font-light leading-relaxed p-4 text-gray-900"
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 text-white" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publishing...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 h-5 w-5" /> Publish to the World
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
