(() => {
  const unitNames = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
    "undecillion",
    "duodecillion",
    "tredecillion",
    "quattuordecillion",
    "quindecillion",
    "sexdecillion",
    "septemdecillion",
    "octodecillion",
    "novemdecillion",
    "vigintillion",
    "unvigintillion",
    "duovigintillion",
    "trevigintillion",
    "quattuorvigintillion",
    "quinvigintillion",
    "sexvigintillion",
    "septvigintillion",
    "octovigintillion",
    "nonvigintillion",
    "trigintillion",
    "untrigintillion",
    "duotrigintillion",
  ];

  const scaledNumberFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });
  const exactFormats = new Map();

  function clean(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, number) : 0;
  }

  function getExactFormat(maximumFractionDigits) {
    if (!exactFormats.has(maximumFractionDigits)) {
      exactFormats.set(
        maximumFractionDigits,
        new Intl.NumberFormat("en-US", { maximumFractionDigits }),
      );
    }
    return exactFormats.get(maximumFractionDigits);
  }

  function formatScaledParts(value) {
    let unitIndex = Math.floor(Math.log10(value) / 3);

    if (unitIndex >= unitNames.length) {
      const exponent = Math.floor(Math.log10(value));
      const coefficient = value / 10 ** exponent;
      return {
        number: scaledNumberFormat.format(coefficient),
        unit: `times ten to the power of ${exponent}`,
      };
    }

    let scaled = value / 10 ** (unitIndex * 3);
    const rounded = Math.round(scaled * 100) / 100;
    if (rounded >= 1000 && unitIndex + 1 < unitNames.length) {
      unitIndex += 1;
      scaled = value / 10 ** (unitIndex * 3);
    }

    return {
      number: scaledNumberFormat.format(scaled),
      unit: unitNames[unitIndex],
    };
  }

  function formatParts(value, options = {}) {
    const cleanValue = clean(value);
    const compactAt = options.compactAt ?? 1000;
    const maximumFractionDigits = options.maximumFractionDigits ?? 0;

    if (cleanValue < compactAt) {
      if (
        options.smallDecimal &&
        cleanValue < 10 &&
        cleanValue % 1 !== 0
      ) {
        return { number: cleanValue.toFixed(1), unit: "" };
      }

      const exactValue = options.floorExact
        ? Math.floor(cleanValue)
        : cleanValue;
      return {
        number: getExactFormat(maximumFractionDigits).format(exactValue),
        unit: "",
      };
    }

    return formatScaledParts(cleanValue);
  }

  function formatInline(parts) {
    return parts.unit ? `${parts.number} ${parts.unit}` : parts.number;
  }

  window.ticketClickerNumberUnits = {
    formatInline,
    formatParts,
  };
})();
