import type { AppointmentService } from "@/lib/square/types";

export function groupServicesByCategory(services: AppointmentService[]) {
  const groups = new Map<string, AppointmentService[]>();
  for (const service of services) {
    const key = inferCategory(service);
    const list = groups.get(key) ?? [];
    list.push(service);
    groups.set(key, list);
  }
  return groups;
}

export function inferCategory(service: AppointmentService) {
  if (service.categoryName) return service.categoryName;
  const haystack = `${service.name} ${service.description}`.toLowerCase();
  if (/(nail|mani|pedi|gel|acrylic|dip|chrome)/.test(haystack)) return "Nails";
  if (/(lash|brow|wax|facial|skin)/.test(haystack)) return "Beauty";
  if (/(makeup|glam|cosmetic)/.test(haystack)) return "Makeup";
  return "Beauty services";
}

export function isLikelyNailService(service: AppointmentService) {
  return inferCategory(service) === "Nails";
}
