export interface ContactFormField {
  id: string
  name: string
  label: string
  valueType: string
  required: boolean
}

export const CONTACT_FORM_FIELDS: ContactFormField[] = [
  { id: "local-name", name: "Name", label: "Full Name", valueType: "text", required: true },
  { id: "local-email", name: "Email", label: "Email Address", valueType: "text", required: true },
  { id: "local-phone", name: "Phone", label: "Phone Number", valueType: "number", required: true },
  { id: "local-message", name: "Message", label: "Message", valueType: "text", required: true },
]

export function isEmailField(field: Pick<ContactFormField, "name" | "label" | "valueType">) {
  const type = field.valueType?.toLowerCase() || ""
  if (type === "email") return true
  return /email/i.test(field.name) || /email/i.test(field.label)
}

export function isPhoneField(field: Pick<ContactFormField, "name" | "label" | "valueType">) {
  const type = field.valueType?.toLowerCase() || ""
  if (type === "tel" || type === "phone") return true
  return /phone|mobile|tel/i.test(field.name) || /phone|mobile|tel/i.test(field.label)
}

export function isMessageField(field: Pick<ContactFormField, "name" | "label" | "valueType">) {
  const type = field.valueType?.toLowerCase() || ""
  if (type === "textarea" || type === "longtext" || type === "richtext") return true
  return (
    /message|comment|inquiry|enquiry|note/i.test(field.name) ||
    /message|comment|inquiry|enquiry|note/i.test(field.label)
  )
}

export function getContactFieldPlaceholder(field: ContactFormField): string {
  if (isEmailField(field)) return "Enter your email"
  if (isPhoneField(field)) return "Enter your phone number"
  if (isMessageField(field)) return "Tell us about your needs..."
  if (/name/i.test(field.name) || /name/i.test(field.label)) return "Enter your name"
  return `Enter ${field.label.toLowerCase()}`
}
