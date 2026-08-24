import type { CmsFormField } from "@/lib/contact-form";
export type { CmsFormField } from "@/lib/contact-form";
export {
  DEFAULT_CONTACT_FORM_FIELDS,
  buildCmsFormSubmissionData,
  extractLegacyContactValues,
  getContactFieldPlaceholder,
  isEmailField,
  isMessageField,
  isPhoneField,
} from "@/lib/contact-form";

const CMS_BASE_URL = (process.env.CMS_BASE_URL || "").replace(/\/$/, "");
const CMS_API_KEY = process.env.CMS_API_KEY || "";
const CMS_WEBSITE_ID = process.env.CMS_WEBSITE_ID || "";
const CMS_MEDIA_BASE_URL = (process.env.CMS_MEDIA_BASE_URL || "").replace(/\/$/, "");

export const BLOG_IMAGE_FALLBACK = "/images/Blog.jpg";

/** Static hero images in /public/images, keyed by existing CMS blog slug. */
const BLOG_STATIC_IMAGES: Record<string, string> = {
  "signs-your-child-may-need-speech-therapy": "/images/Blog7.jpeg",
  "avt-auditory-training-therapy-for-children-hearing-speech": "/images/Blog6.jpg",
  "aphasia-understanding-and-recovery": "/images/blog5.webp",
  "cochlear-implant-speech-therapy-children": "/images/Blog4.jpeg",
  "autism-awareness-vs-acceptance-child-support-therapy": "/images/Blog%203.jpeg",
  "life-after-stroke-recovery-beyond-therapy-pune": "/images/Blog2.jpeg",
};

export function getBlogStaticHeroImage(slug: string): string {
  return BLOG_STATIC_IMAGES[slug] ?? BLOG_IMAGE_FALLBACK;
}

export interface CmsCategory {
  id: string;
  name: string;
  description?: string;
  websiteId?: string;
  createdAt?: string;
}

export interface CmsBlog {
  id: string;
  title: string;
  shortDescription?: string;
  body?: string;
  metaTitle?: string;
  metaDescription?: string;
  categoryId?: string;
  websiteId?: string;
  authorId?: string;
  author?: string | { name?: string; fullName?: string };
  tags?: string[];
  slug: string;
  heroImage?: string | null;
  contentImages?: string[];
  ogImage?: string | null;
  focusKeyPhrase?: string[];
  publishDate?: string;
  displayDate?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CmsPaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function assertCmsConfig() {
  if (!CMS_BASE_URL || !CMS_API_KEY || !CMS_WEBSITE_ID) {
    throw new Error("CMS configuration is incomplete. Set CMS_BASE_URL, CMS_API_KEY, and CMS_WEBSITE_ID.");
  }
}

function buildCmsUrl(path: string, params: Record<string, string | number | undefined> = {}) {
  assertCmsConfig();
  const url = new URL(`${CMS_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`);
  url.searchParams.set("websiteId", CMS_WEBSITE_ID);
  url.searchParams.set("apiKey", CMS_API_KEY);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function cmsFetch<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const response = await fetch(buildCmsUrl(path, params), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || `CMS request failed (${response.status})`);
  }

  return data as T;
}

async function cmsPost<T>(path: string, body: unknown, params?: Record<string, string | number | undefined>): Promise<T> {
  const response = await fetch(buildCmsUrl(path, params), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || `CMS request failed (${response.status})`);
  }

  return data as T;
}

export interface CmsForm {
  id: string;
  name: string;
  websiteId?: string;
  isActive?: boolean;
  CreatedAt?: string;
  UpdatedAt?: string;
}

function extractForms(payload: any): CmsForm[] {
  const candidates = [payload?.data?.forms, payload?.forms, payload?.data, payload];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate as CmsForm[];
  }
  return [];
}

function extractFormFields(payload: any): CmsFormField[] {
  const candidates = [payload?.data?.fields, payload?.fields, payload?.data, payload];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate as CmsFormField[];
  }
  return [];
}

export const cmsFormApi = {
  async getAll(page: number = 1, limit: number = 100) {
    const payload = await cmsFetch<{
      success?: boolean;
      data?: { forms?: CmsForm[]; meta?: CmsPaginatedMeta };
      forms?: CmsForm[];
    }>("/forms", { page, limit });

    return {
      forms: extractForms(payload).filter((form) => form.isActive !== false),
      meta: payload?.data?.meta,
      raw: payload,
    };
  },

  async getById(formId: string) {
    const payload = await cmsFetch<{
      success?: boolean;
      data?: CmsForm;
      form?: CmsForm;
    }>(`/forms/${encodeURIComponent(formId)}`);

    const form = (payload?.data || payload?.form || payload) as CmsForm | undefined;
    if (!form?.id) throw new Error("Form not found");
    return form;
  },

  async getFields(formId: string) {
    const payload = await cmsFetch<{
      success?: boolean;
      data?: CmsFormField[];
    }>(`/forms/${encodeURIComponent(formId)}/fields`);

    return extractFormFields(payload).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },

  async submit(formId: string, data: Record<string, string | number>) {
    return cmsPost<{
      success?: boolean;
      message?: string;
      data?: unknown;
    }>(`/forms/${encodeURIComponent(formId)}/submit`, { data });
  },

  /** Resolve the website contact form and its fields from the CMS. */
  async getContactForm() {
    const configuredId = process.env.CMS_CONTACT_FORM_ID?.trim();

    let form: CmsForm | undefined;

    if (configuredId) {
      form = await this.getById(configuredId);
    } else {
      const { forms } = await this.getAll(1, 100);
      form =
        forms.find((f) => /contact/i.test(f.name)) ||
        forms[0];
    }

    if (!form?.id) {
      throw new Error("No active contact form found in CMS");
    }

    const fields = await this.getFields(form.id);
    if (!fields.length) {
      throw new Error("Contact form has no fields configured in CMS");
    }

    return { form, fields };
  },
};


/**
 * Resolve a CMS media path/URL against CMS_MEDIA_BASE_URL.
 * The API often returns https://cms.aspune.cloud/media/... which 404s;
 * files are actually served from CMS_MEDIA_BASE_URL (cms-media.aspune.cloud).
 */
export function getCmsMediaUrl(path: string | null | undefined, fallback: string = BLOG_IMAGE_FALLBACK): string {
  if (!path) return fallback;

  let cleanPath = String(path).replace(/\\/g, "/").trim();
  if (!cleanPath) return fallback;

  if (cleanPath.startsWith("data:")) {
    return cleanPath;
  }

  // Prefer https for the media host to avoid mixed-content blocks on HTTPS sites.
  const mediaBase = CMS_MEDIA_BASE_URL
    ? CMS_MEDIA_BASE_URL.replace(/^http:\/\//i, "https://")
    : "";

  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    try {
      const url = new URL(cleanPath);
      const host = url.hostname.toLowerCase();
      const isCmsHost =
        host === "cms.aspune.cloud" ||
        host === "cms-api.aspune.cloud" ||
        host === "cms-media.aspune.cloud" ||
        host.endsWith(".aspune.cloud");

      if (mediaBase && isCmsHost) {
        return `${mediaBase}${url.pathname}${url.search}`;
      }

      return cleanPath;
    } catch {
      return cleanPath;
    }
  }

  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  if (mediaBase) {
    return `${mediaBase}${cleanPath}`;
  }

  return cleanPath;
}

export function getBlogHeroImage(blog: Pick<CmsBlog, "heroImage" | "ogImage">): string {
  return getCmsMediaUrl(blog.heroImage || blog.ogImage, BLOG_IMAGE_FALLBACK);
}

export function getBlogDate(blog: Pick<CmsBlog, "displayDate" | "publishDate" | "createdAt">): string {
  return blog.displayDate || blog.publishDate || blog.createdAt || new Date().toISOString();
}

export function getBlogAuthorName(blog: Pick<CmsBlog, "author">): string {
  if (typeof blog.author === "string" && blog.author.trim()) {
    return blog.author.trim();
  }
  if (blog.author && typeof blog.author === "object") {
    const name = blog.author.name || blog.author.fullName;
    if (name?.trim()) return name.trim();
  }
  return "SynapCare Health Team";
}

function extractBlogs(payload: any): CmsBlog[] {
  const candidates = [
    payload?.data?.blogs,
    payload?.blogs,
    payload?.data,
    payload,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate as CmsBlog[];
  }

  return [];
}

function extractCategories(payload: any): CmsCategory[] {
  const candidates = [
    payload?.data?.categories,
    payload?.categories,
    payload?.data,
    payload,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate as CmsCategory[];
  }

  return [];
}

export const cmsBlogApi = {
  async getAll(page: number = 1, limit: number = 100) {
    const payload = await cmsFetch<{
      success?: boolean;
      data?: { blogs?: CmsBlog[]; meta?: CmsPaginatedMeta };
      blogs?: CmsBlog[];
    }>("/blogs", { page, limit });

    return {
      blogs: extractBlogs(payload).filter(
        (blog) => !blog.status || blog.status.toUpperCase() === "PUBLISHED"
      ),
      meta: payload?.data?.meta,
      raw: payload,
    };
  },

  async getBySlug(slug: string) {
    const payload = await cmsFetch<{
      success?: boolean;
      data?: CmsBlog;
      blog?: CmsBlog;
    }>(`/blogs/${encodeURIComponent(slug)}`);

    const blog = (payload?.data || payload?.blog || payload) as CmsBlog | undefined;
    if (!blog || !blog.title) {
      throw new Error("Blog not found");
    }

    return blog;
  },
};

export const cmsCategoryApi = {
  async getAll(page: number = 1, limit: number = 100) {
    const payload = await cmsFetch<{
      success?: boolean;
      data?: { categories?: CmsCategory[]; meta?: CmsPaginatedMeta };
      categories?: CmsCategory[];
    }>("/categories", { page, limit });

    return {
      categories: extractCategories(payload),
      meta: payload?.data?.meta,
      raw: payload,
    };
  },
};
