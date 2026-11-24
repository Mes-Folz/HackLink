// Regions where HackLink accepts users and hosts events. Iloilo only for now;
// going global later means editing this list, not the code that reads it.
export const ALLOWED_REGIONS = [
  { id: "iloilo", name: "Iloilo", country: "PH", timezone: "Asia/Manila", currency: "PHP" },
] as const;
