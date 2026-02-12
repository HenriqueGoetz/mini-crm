export function getInteractionNicename(value: string): string {
  if (value === "call") return "Ligação";
  if (value === "meeting") return "Reunião";
  if (value === "email") return "E-mail";
  if (value === "other") return "Outro";
  return value;
}
