/** Independent fictional fixture. No client records or architecture are used. */
export type DemoRecord = Readonly<{
  id: string;
  station: string;
  units: number | null;
}>;

export const DEMO_THRESHOLD = 90;
export const demoRecords: readonly DemoRecord[] = Array.from({ length: 12 }, (_, i) => ({
  id: `EV-${String(i + 1).padStart(2, "0")}`,
  station: ["North", "Central", "South"][i % 3],
  units: [2, 7, 10].includes(i) ? null : (i + 1) * 4,
}));

export const demoCorrections: Readonly<Record<string, number>> = {
  "EV-03": 12,
  "EV-08": 32,
  "EV-11": 44,
};

export function applyCorrections(resolved: readonly string[]): readonly DemoRecord[] {
  return demoRecords.map((record) => ({
    ...record,
    units: resolved.includes(record.id) && Object.hasOwn(demoCorrections, record.id)
      ? demoCorrections[record.id]
      : record.units,
  }));
}

export function validateRecords(records: readonly DemoRecord[]) {
  const counts = new Map<string, number>();
  for (const record of records) counts.set(record.id, (counts.get(record.id) ?? 0) + 1);
  return records.map((record) => {
    const issues: string[] = [];
    if (!record.id.trim()) issues.push("Missing event identifier");
    if ((counts.get(record.id) ?? 0) > 1) issues.push("Duplicate event identifier");
    if (!record.station.trim()) issues.push("Missing station");
    if (record.units === null) issues.push("Missing units");
    else if (!Number.isSafeInteger(record.units) || record.units < 0) issues.push("Units must be a non-negative safe integer");
    return { ...record, issues, valid: issues.length === 0 };
  });
}

export function readiness(records: readonly DemoRecord[]) {
  const checked = validateRecords(records);
  const passed = checked.filter((record) => record.valid).length;
  const percent = records.length ? passed / records.length * 100 : 0;
  return { checked, passed, total: records.length, percent, eligible: records.length > 0 && percent >= DEMO_THRESHOLD };
}
