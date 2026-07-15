export interface CmsFormField {
  id: string
  formId: string
  name: string
  label: string
  valueType: string
  required: boolean
  order: number
  CreatedAt?: string
  UpdatedAt?: string
}

/** Fallback fields matching the current contact UI if CMS is unavailable. */
export const DEFAULT_CONTACT_FORM_FIELDS: CmsFormField[] = [
  {
    id: "local-name",
    formId: "local",
    name: "Name",
    label: "Full Name",
    valueType: "text",
    required: true,
    order: 1,
  },
  {
    id: "local-email",
    formId: "local",
    name: "Email",
    label: "Email Address",
    valueType: "text",
    required: true,
    order: 2,
  },
  {
    id: "local-phone",
    formId: "local",
    name: "Phone",
    label: "Phone Number",
    valueType: "number",
    required: true,
    order: 3,
  },
  {
    id: "local-message",
    formId: "local",
    name: "Message",
    label: "Message",
    valueType: "text",
    required: true,
    order: 4,
  },
]

export function isEmailField(field: Pick<CmsFormField, "name" | "label" | "valueType">) {
  const type = field.valueType?.toLowerCase() || ""
  if (type === "email") return true
  return /email/i.test(field.name) || /email/i.test(field.label)
}

export function isPhoneField(field: Pick<CmsFormField, "name" | "label" | "valueType">) {
  const type = field.valueType?.toLowerCase() || ""
  if (type === "tel" || type === "phone") return true
  return /phone|mobile|tel/i.test(field.name) || /phone|mobile|tel/i.test(field.label)
}

export function isMessageField(field: Pick<CmsFormField, "name" | "label" | "valueType">) {
  const type = field.valueType?.toLowerCase() || ""
  if (type === "textarea" || type === "longtext" || type === "richtext") return true
  return (
    /message|comment|inquiry|enquiry|note/i.test(field.name) ||
    /message|comment|inquiry|enquiry|note/i.test(field.label)
  )
}

export function getContactFieldPlaceholder(field: CmsFormField): string {
  if (isEmailField(field)) return "Enter your email"
  if (isPhoneField(field)) return "Enter your phone number"
  if (isMessageField(field)) return "Tell us about your needs..."
  if (/name/i.test(field.name) || /name/i.test(field.label)) return "Enter your name"
  return `Enter ${field.label.toLowerCase()}`
}

/** Coerce submitted values to the types the CMS expects (e.g. number fields). */
export function buildCmsFormSubmissionData(
  fields: CmsFormField[],
  values: Record<string, string>
): Record<string, string | number> {
  const data: Record<string, string | number> = {}

  for (const field of fields) {
    const raw = (values[field.name] ?? "").trim()
    const type = field.valueType?.toLowerCase() || "text"

    if (type === "number" || type === "integer" || type === "float") {
      const digits = raw.replace(/[^\d.]/g, "")
      const num = Number(digits)
      if (digits && Number.isFinite(num)) {
        data[field.name] = num
      } else if (raw) {
        data[field.name] = raw
      }
      continue
    }

    data[field.name] = raw
  }

  return data
}

export function extractLegacyContactValues(data: Record<string, unknown>) {
  const pick = (...keys: string[]) => {
    for (const key of keys) {
      const match = Object.entries(data).find(([k]) => k.toLowerCase() === key.toLowerCase())
      if (match && match[1] != null && String(match[1]).trim()) {
        return String(match[1]).trim()
      }
    }
    return ""
  }

  return {
    name: pick("Name", "Full Name", "fullName"),
    email: pick("Email", "Email Address", "emailAddress"),
    phone: pick("Phone", "Phone Number", "Mobile", "phoneNumber"),
    message: pick("Message", "Comments", "Inquiry"),
  }
}
