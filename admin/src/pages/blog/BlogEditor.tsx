import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { MediaUrlField } from "../../cms/components/MediaUrlField";
import { blogApi } from "../../services/api";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Blog } from "../../types";

type BlogFormData = Partial<Blog> & { tags?: string | string[] };

// ISO (UTC) → "YYYY-MM-DDTHH:mm" in the admin's local time, for <input type="datetime-local">
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isEdit = !!id;

  const { data: post } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogApi.getOne(id!).then((r) => r.data.post as Blog),
    enabled: isEdit,
  });

  const { register, handleSubmit, reset, watch, control, formState: { errors } } = useForm<BlogFormData>({
    defaultValues: { status: "draft", category: "AI Automation", readTime: "5 min read" },
  });

  useEffect(() => {
    if (post) reset({
      ...post,
      tags: post.tags?.join(", "),
      // datetime-local needs "YYYY-MM-DDTHH:mm" in local time
      scheduledAt: post.scheduledAt ? toLocalInput(post.scheduledAt) : undefined,
    });
  }, [post, reset]);

  const status = watch("status");

  const onSubmit = (data: BlogFormData) => {
    const payload: BlogFormData = {
      ...data,
      // Only keep a publish time for scheduled posts; send ISO (UTC) to the API
      scheduledAt: data.status === "scheduled" && data.scheduledAt
        ? new Date(data.scheduledAt as string).toISOString()
        : null,
    };
    mutation.mutate(payload);
  };

  const mutation = useMutation({
    mutationFn: (data: BlogFormData) => isEdit ? blogApi.update(id!, data) : blogApi.create(data),
    onSuccess: () => { toast.success(isEdit ? "Post updated" : "Post created"); qc.invalidateQueries({ queryKey: ["blogs"] }); navigate("/blog"); },
    onError: (err: unknown) => {
      const message = (err as { response?: { data?: { message?: string } } }).response?.data?.message;
      toast.error(message ?? "Save failed");
    },
  });

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate("/blog")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5">
        <ArrowLeft className="w-4 h-4" /> Back to posts
      </button>
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">{isEdit ? "Edit Post" : "New Post"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Title *</label>
            <input className="input" {...register("title", { required: "Title required" })} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="label">Excerpt *</label>
            <textarea className="input resize-none" rows={2} {...register("excerpt", { required: "Excerpt required" })} />
            {errors.excerpt && <p className="text-xs text-red-500 mt-1">{errors.excerpt.message}</p>}
          </div>
          <div>
            <label className="label">Content *</label>
            <textarea className="input resize-none" rows={10} {...register("content", { required: "Content required" })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Author</label>
              <input className="input" {...register("author")} />
            </div>
            <div>
              <label className="label">Category</label>
              <select className="input" {...register("category")}>
                <option value="AI Automation">AI Automation</option>
                <option value="Voice AI">Voice AI</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Legal">Legal</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div>
              <label className="label">Read Time</label>
              <input className="input" placeholder="5 min read" {...register("readTime")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select className="input" {...register("status")}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          {status === "scheduled" && (
            <div>
              <label className="label">Publish At *</label>
              <input
                type="datetime-local"
                className="input"
                {...register("scheduledAt", {
                  required: status === "scheduled" ? "Pick a publish date/time" : false,
                })}
              />
              <p className="text-xs text-gray-500 mt-1">
                The post stays hidden until this time, then auto-publishes (checked every minute).
              </p>
              {errors.scheduledAt && <p className="text-xs text-red-500 mt-1">{errors.scheduledAt.message as string}</p>}
            </div>
          )}
          <Controller name="image" control={control} render={({ field }) => (
            <MediaUrlField id="blog-cover" label="Cover image" kind="image" value={field.value ?? ""} onChange={field.onChange} hint="Shown at the top of the post and on blog cards. Recommended 970 × 450px or larger." />
          )} />
          <div>
            <label className="label">Tags (comma separated)</label>
            <input className="input" placeholder="AI, automation, business" {...register("tags")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Meta Title</label><input className="input" {...register("metaTitle")} /></div>
            <div><label className="label">Meta Description</label><input className="input" {...register("metaDescription")} /></div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => navigate("/blog")} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={mutation.isPending} className="btn-primary">
              {mutation.isPending ? "Saving..." : "Save Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
