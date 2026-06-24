(() => {
  /*
   * Ticket Clicker's large-number formatter uses the modern English short scale:
   *
   *   10^3  = thousand
   *   10^6  = million       (the 1st "-illion")
   *   10^9  = billion       (the 2nd "-illion")
   *   10^303 = centillion   (the 100th "-illion")
   *
   * Short-scale "-illion" number N therefore represents 10^(3 * N + 3).
   * Names above nineteen are assembled with the Conway-Guy Latin-root system.
   * The supplied naming range ends at millinillion, 10^3003.
   */

  // The first nineteen names are dictionary spellings, not reliably generated
  // by the general root rules. Keep them explicit, including accepted variants
  // such as "sedecillion" and "novendecillion".
  const dictionaryIllions = [
    "",
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
    "sedecillion",
    "septendecillion",
    "octodecillion",
    "novendecillion",
  ];

  /*
   * For names from vigintillion onward, split the "-illion" index into decimal
   * digits and join the corresponding units, tens, and hundreds roots:
   *
   *   42 -> duo + quadraginta -> duoquadragintillion
   *   300 -> trecenti         -> trecentillion
   *
   * A marker describes the first sound in the next root. Some unit roots change
   * their ending to join that sound correctly; assimilateUnitRoot handles this.
   * For example, 23 uses "tres" before "viginti": tresvigintillion.
   */
  const unitRoots = [
    "",
    "un",
    "duo",
    "tre",
    "quattuor",
    "quin",
    "se",
    "septe",
    "octo",
    "nove",
  ];
  const tensRoots = [
    // marker letters: m/n/s/x trigger Conway-Guy joining variants.
    { root: "", marker: "" },
    { root: "deci", marker: "n" },
    { root: "viginti", marker: "ms" },
    { root: "triginta", marker: "ns" },
    { root: "quadraginta", marker: "ns" },
    { root: "quinquaginta", marker: "ns" },
    { root: "sexaginta", marker: "n" },
    { root: "septuaginta", marker: "n" },
    { root: "octoginta", marker: "mx" },
    { root: "nonaginta", marker: "" },
  ];
  const hundredsRoots = [
    { root: "", marker: "" },
    { root: "centi", marker: "nx" },
    { root: "ducenti", marker: "n" },
    { root: "trecenti", marker: "ns" },
    { root: "quadringenti", marker: "ns" },
    { root: "quingenti", marker: "ns" },
    { root: "sescenti", marker: "n" },
    { root: "septingenti", marker: "n" },
    { root: "octingenti", marker: "mx" },
    { root: "nongenti", marker: "" },
  ];

  // The current naming implementation deliberately follows the supplied table
  // through the 1000th "-illion". Values above it use scientific wording.
  const MAX_NAMED_ILLION = 1000;

  // Intl.NumberFormat construction is relatively expensive during the game
  // loop, so cache one formatter for each requested precision.
  const scaledFormats = new Map();
  const exactFormats = new Map();

  // Apply the joining rules described above. `unit` is the final decimal digit
  // of the "-illion" index; `marker` belongs to the following root.
  function assimilateUnitRoot(unit, marker) {
    if (unit === 3 && marker.includes("s")) {
      return "tres";
    }
    if (unit === 6) {
      if (marker.includes("s")) {
        return "ses";
      }
      if (marker.includes("x")) {
        return "sex";
      }
    }
    if (unit === 7) {
      if (marker.includes("m")) {
        return "septem";
      }
      if (marker.includes("n")) {
        return "septen";
      }
    }
    if (unit === 9) {
      if (marker.includes("m")) {
        return "novem";
      }
      if (marker.includes("n")) {
        return "noven";
      }
    }
    return unitRoots[unit];
  }

  /*
   * Return the name of a short-scale "-illion" index, not a power-of-1000 index.
   *
   *   getIllionName(1)    -> "million"
   *   getIllionName(100)  -> "centillion"
   *   getIllionName(1000) -> "millinillion"
   */
  function getIllionName(index) {
    if (index < dictionaryIllions.length) {
      return dictionaryIllions[index];
    }
    if (index === MAX_NAMED_ILLION) {
      return "millinillion";
    }
    if (index < 1 || index > MAX_NAMED_ILLION) {
      return "";
    }

    const unit = index % 10;
    const ten = Math.floor(index / 10) % 10;
    const hundred = Math.floor(index / 100) % 10;

    // A units root joins to the tens root when one exists; otherwise it joins
    // directly to the hundreds root.
    const nextMarker = ten
      ? tensRoots[ten].marker
      : hundredsRoots[hundred].marker;
    const root = [
      assimilateUnitRoot(unit, nextMarker),
      tensRoots[ten].root,
      hundredsRoots[hundred].root,
    ].join("");

    // The final Latin root drops its trailing vowel before "-illion":
    // "centi" + "illion" becomes "centillion".
    return `${root.replace(/[aeiou]$/, "")}illion`;
  }

  /*
   * `unitIndex` is the power-of-1000 group used by the display formatter:
   *
   *   0 -> no unit, 1 -> thousand, 2 -> million, 3 -> billion.
   *
   * It is offset by one from the "-illion" index because thousand sits between
   * the unscaled numbers and million.
   */
  function getUnitName(unitIndex) {
    if (unitIndex === 0) {
      return "";
    }
    if (unitIndex === 1) {
      return "thousand";
    }
    return getIllionName(unitIndex - 1);
  }

  /*
   * Normalize supported inputs into one of two shapes:
   *
   *   { number: 2580 }                  for an ordinary finite Number
   *   { coefficient: 2.58, exponent: 3003 } for a value beyond Number's range
   *
   * Strings such as "2.58e3003" are parsed manually because Number("1e3003")
   * becomes Infinity. Only the leading significant digits are needed for the
   * compact display; the decimal exponent preserves the value's scale.
   *
   * This parser extends formatting only. The game state still uses JavaScript
   * Number arithmetic and therefore cannot calculate gameplay values above
   * roughly 1e308 without a separate arbitrary-exponent number implementation.
   */
  function parseMagnitude(value) {
    if (typeof value === "number") {
      return Number.isFinite(value)
        ? { number: Math.max(0, value) }
        : { number: 0 };
    }

    const source =
      typeof value === "bigint"
        ? value.toString()
        : typeof value === "string"
          ? value.trim()
          : "";
    if (!source || source.startsWith("-")) {
      return { number: 0 };
    }

    const finiteValue = Number(source);
    if (Number.isFinite(finiteValue)) {
      return { number: Math.max(0, finiteValue) };
    }

    const match = source.match(
      /^\+?(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:e([+-]?\d+))?$/i,
    );
    if (!match) {
      return { number: 0 };
    }

    const integerDigits = match[1] || "0";
    const fractionDigits = match[2] ?? match[3] ?? "";
    const explicitExponent = Number(match[4] || 0);
    if (!Number.isSafeInteger(explicitExponent)) {
      return { number: 0 };
    }

    const digits = `${integerDigits}${fractionDigits}`;
    const firstSignificant = digits.search(/[1-9]/);
    if (firstSignificant < 0) {
      return { number: 0 };
    }

    const significantDigits = digits.slice(firstSignificant);

    // Keep enough significant digits for the six-place odometer while avoiding
    // a false promise of arbitrary decimal precision.
    const coefficient = Number(
      significantDigits.length === 1
        ? significantDigits
        : `${significantDigits[0]}.${significantDigits.slice(1, 16)}`,
    );

    return {
      coefficient,
      exponent:
        explicitExponent + integerDigits.length - firstSignificant - 1,
    };
  }

  // Convert a regular positive Number to scientific components. Keeping this
  // representation lets the remaining formatting path handle Numbers and
  // scientific strings identically.
  function magnitudeFromNumber(value) {
    const exponent = Math.floor(Math.log10(value));
    return {
      coefficient: value / 10 ** exponent,
      exponent,
    };
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

  // The primary counter can render six decimals as two visual groups:
  // "2.580 123 quadrillion". `spokenNumber` removes the visual space so screen
  // readers announce one decimal number.
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

  /*
   * Convert scientific components to a compact value and named unit.
   *
   * Example: { coefficient: 2.58, exponent: 15 }
   *   unitIndex = floor(15 / 3) = 5
   *   unit      = quadrillion
   *   result    = "2.58 quadrillion"
   */
  function formatScaledParts(magnitude, options) {
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
    let unitIndex = Math.floor(magnitude.exponent / 3);
    let unit = getUnitName(unitIndex);

    // An empty unit above the base group means the value is beyond the naming
    // table. Scientific wording remains accurate and avoids inventing a name.
    if (!unit && unitIndex > 0) {
      return {
        number: scaledNumberFormat.format(magnitude.coefficient),
        unit: `times ten to the power of ${magnitude.exponent}`,
      };
    }

    let scaled =
      magnitude.coefficient *
      10 ** (magnitude.exponent - unitIndex * 3);
    const precision = 10 ** maximumFractionDigits;
    const rounded = Math.round(scaled * precision) / precision;

    // Rounding 999.999... may cross into the next group. Promote the unit so
    // the UI says "1 billion", not "1,000 million".
    if (rounded >= 1000) {
      unitIndex += 1;
      unit = getUnitName(unitIndex);
      if (!unit) {
        return {
          number: scaledNumberFormat.format(magnitude.coefficient),
          unit: `times ten to the power of ${magnitude.exponent}`,
        };
      }
      scaled /= 1000;
    }

    const formatted = scaledNumberFormat.format(scaled);
    const numberParts = options.groupCompactFractionDigits
      ? groupScaledFraction(formatted)
      : { number: formatted };

    return {
      ...numberParts,
      unit,
    };
  }

  /*
   * Public structured formatter.
   *
   * Useful options:
   * - compactAt: begin named-unit formatting at this numeric value.
   * - maximumFractionDigits: precision before compact formatting begins.
   * - compactMinimumFractionDigits / compactMaximumFractionDigits:
   *   precision for compact named values.
   * - groupCompactFractionDigits: expose lead/tail fields for the odometer UI.
   * - floorExact: discard fractional tickets in an unscaled exact display.
   * - smallDecimal: retain one decimal place for small rates below ten.
   */
  function formatParts(value, options = {}) {
    const magnitude = parseMagnitude(value);
    const compactAt = options.compactAt ?? 1000;
    const maximumFractionDigits = options.maximumFractionDigits ?? 0;

    if ("number" in magnitude && magnitude.number < compactAt) {
      const cleanValue = magnitude.number;
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

    const scaledMagnitude =
      "number" in magnitude
        ? magnitudeFromNumber(magnitude.number)
        : magnitude;
    return formatScaledParts(scaledMagnitude, options);
  }

  // Convenience wrapper for logs and labels that do not need separately styled
  // number and unit elements.
  function formatInline(parts) {
    return parts.unit ? `${parts.number} ${parts.unit}` : parts.number;
  }

  window.ticketClickerNumberUnits = {
    formatInline,
    formatParts,
    getIllionName,
  };
})();
