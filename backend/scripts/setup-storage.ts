// Creates (or updates) the public Supabase Storage bucket used for CMS uploads. Safe to re-run.
import "dotenv/config";
import supabase, { STORAGE_BUCKET } from "../src/config/supabase";
import { ALLOWED_MIME_TYPES, BUCKET_SIZE_LIMIT } from "../src/cms/mediaRules";

async function main() {
  const options = { public: true, fileSizeLimit: BUCKET_SIZE_LIMIT, allowedMimeTypes: ALLOWED_MIME_TYPES };
  const { data: existing } = await supabase.storage.getBucket(STORAGE_BUCKET);

  const { error } = existing
    ? await supabase.storage.updateBucket(STORAGE_BUCKET, options)
    : await supabase.storage.createBucket(STORAGE_BUCKET, options);
  if (error) throw error;

  const { data } = await supabase.storage.getBucket(STORAGE_BUCKET);
  console.log(`${existing ? "Updated" : "Created"} bucket "${STORAGE_BUCKET}":`, {
    public: data?.public,
    fileSizeLimit: data?.file_size_limit,
    allowedMimeTypes: data?.allowed_mime_types,
  });
}

main().catch((err) => {
  console.error("Storage setup failed:", err.message ?? err);
  process.exit(1);
});
