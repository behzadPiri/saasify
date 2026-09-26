export function getRelativeTime(dateValue: string | Date, locale = "en") {
  const target = new Date(dateValue).getTime();
  const now = Date.now();
  const diffInMs = target - now;
  const absMs = Math.abs(diffInMs);

  const units: Array<{value: number; unit: Intl.RelativeTimeFormatUnit}> = [
    {value: 1000 * 60 * 60 * 24 * 30, unit: "month"},
    {value: 1000 * 60 * 60 * 24 * 7, unit: "week"},
    {value: 1000 * 60 * 60 * 24, unit: "day"},
    {value: 1000 * 60 * 60, unit: "hour"},
    {value: 1000 * 60, unit: "minute"},
    {value: 1000, unit: "second"},
  ];

  const formatter = new Intl.RelativeTimeFormat(locale, {numeric: "auto"});

  for (const unit of units) {
    const amount = absMs / unit.value;
    if (amount >= 1) {
      const rounded = Math.round(amount);
      return formatter.format(Math.sign(diffInMs) * rounded, unit.unit);
    }
  }

  return formatter.format(0, "second");
}
