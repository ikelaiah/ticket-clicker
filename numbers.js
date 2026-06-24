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

  const scaledFormats = new Map();
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

  function getScaledFormat(minimumFractionDigits, maximumFractionDigits) {
    const key = `${minimumFractionDigits}:${maximumFractionDigits}`;
    if (!scaledFormats.has(key)) {
      scaledFormats.set(
        key,
        new Intl.NumberFormat("en-US", {
          minimumFractionDigits,
          maximumFractionDigits,
        }),
      );
    }
    return scaledFormats.get(key);
  }

  function groupScaledFraction(number) {
    const [whole, fraction = ""] = number.split(".");
    if (fraction.length <= 3) {
      return { number };
    }

    const numberLead = `${whole}.${fraction.slice(0, 3)}`;
    const numberTail = fraction.slice(3);
    return {
      number: `${numberLead} ${numberTail}`,
      numberLead,
      numberTail,
      spokenNumber: `${numberLead}${numberTail}`,
    };
  }

  function formatScaledParts(value, options) {
    const maximumFractionDigits =
      options.compactMaximumFractionDigits ?? 2;
    const minimumFractionDigits = Math.min(
      maximumFractionDigits,
      options.compactMinimumFractionDigits ?? 0,
    );
    const scaledNumberFormat = getScaledFormat(
      minimumFractionDigits,
      maximumFractionDigits,
    );
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
    const precision = 10 ** maximumFractionDigits;
    const rounded = Math.round(scaled * precision) / precision;
    if (rounded >= 1000 && unitIndex + 1 < unitNames.length) {
      unitIndex += 1;
      scaled = value / 10 ** (unitIndex * 3);
    }

    const formatted = scaledNumberFormat.format(scaled);
    const numberParts = options.groupCompactFractionDigits
      ? groupScaledFraction(formatted)
      : { number: formatted };

    return {
      ...numberParts,
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

    return formatScaledParts(cleanValue, options);
  }

  function formatInline(parts) {
    return parts.unit ? `${parts.number} ${parts.unit}` : parts.number;
  }

  window.ticketClickerNumberUnits = {
    formatInline,
    formatParts,
  };
})();
