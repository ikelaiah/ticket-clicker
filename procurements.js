(() => {
  const procurementItems = [
    ["mouse_mat", "Mouse Mat"],
    ["usb_c_dongle", "USB-C Dongle"],
    ["laptop_stand", "Laptop Stand"],
    ["hdmi_cable", "HDMI Cable"],
    ["webcam_cover", "Webcam Cover"],
    ["headset", "Call-Centre Headset"],
    ["keyboard", "Ergonomic Keyboard"],
    ["monitor_arm", "Monitor Arm"],
    ["docking_station", "Docking Station"],
    ["cable_labels", "Cable Label Pack"],
    ["spare_charger", "Spare Laptop Charger"],
    ["speakerphone", "Conference Speakerphone"],
    ["wifi_survey", "Wi-Fi Survey"],
    ["printer_toner", "Printer Toner Reserve"],
    ["vault_seat", "Password Vault Seat"],
    ["log_collector", "Central Log Collector"],
    ["backup_appliance", "Backup Appliance"],
    ["firewall_review", "Firewall Rule Review"],
    ["rack_shelf", "Server Rack Shelf"],
    ["cloud_sandbox", "Cloud Sandbox"],
    ["support_license", "Premium Support License"],
  ].map(([id, name]) => ({ id, name }));

  const procurementStories = [
    {
      id: "emergency",
      prefix: "Emergency",
      detail: (item) =>
        `Requested after the previous ${item} became shared equipment and disappeared.`,
    },
    {
      id: "strategic",
      prefix: "Strategic",
      detail: () =>
        "The business case says it pays for itself by carefully avoiding any payback calculation.",
    },
    {
      id: "interim",
      prefix: "Interim",
      detail: (item) =>
        `Temporary ${item} approved for twelve years while the permanent solution is assessed.`,
    },
    {
      id: "premium",
      prefix: "Premium",
      detail: () =>
        "Includes 24/7 support in a timezone nobody in the contract can identify.",
    },
    {
      id: "mandatory",
      prefix: "Mandatory",
      detail: () =>
        "Nobody requested it, but the steering committee has already selected the color.",
    },
    {
      id: "compliant",
      prefix: "Compliant",
      detail: (item) =>
        `The ${item} requires a six-week security review and arrives with password admin.`,
    },
    {
      id: "cloud_ready",
      prefix: "Cloud-Ready",
      detail: () =>
        "The cloud feature is a PDF explaining how to email the vendor.",
    },
    {
      id: "ai_enabled",
      prefix: "AI-Enabled",
      detail: () =>
        "AI selects the most expensive option and produces a confident executive summary.",
    },
    {
      id: "vendor_locked",
      prefix: "Vendor-Locked",
      detail: () =>
        "Compatible only with accessories available through the same account manager.",
    },
    {
      id: "phase_two",
      prefix: "Phase-Two",
      detail: () =>
        "Phase one delivered the logo, governance model, and reasons phase two is urgent.",
    },
    {
      id: "executive",
      prefix: "Executive",
      detail: (item) =>
        `The standard ${item} was rejected because its box did not look sufficiently strategic.`,
    },
    {
      id: "year_end",
      prefix: "Year-End",
      detail: () =>
        "Purchased at 4:58 PM so next year's budget is not punished for this year's restraint.",
    },
    {
      id: "sole_source",
      prefix: "Sole-Source",
      detail: () =>
        "Three quotes were collected from three resellers owned by the same parent company.",
    },
    {
      id: "pilot",
      prefix: "Pilot",
      detail: () =>
        "The pilot includes 4,000 users, production data, and no documented exit criteria.",
    },
    {
      id: "enterprise",
      prefix: "Enterprise",
      detail: () =>
        "The minimum order is 500 because one employee opened a high-priority request.",
    },
    {
      id: "audit_ready",
      prefix: "Audit-Ready",
      detail: (item) =>
        `The asset tag, custody form, and disposal plan cost more than the ${item}.`,
    },
    {
      id: "zero_trust",
      prefix: "Zero-Trust",
      detail: () =>
        "Requires four approvals, two shared passwords, and one unsigned spreadsheet.",
    },
    {
      id: "sustainable",
      prefix: "Sustainable",
      detail: () =>
        "Arrives in six nested boxes with a forty-page printed sustainability statement.",
    },
    {
      id: "globally_harmonized",
      prefix: "Globally Harmonized",
      detail: () =>
        "Procurement saved three percent by selecting the wrong regional power plug everywhere.",
    },
    {
      id: "auto_renewing",
      prefix: "Auto-Renewing",
      detail: () =>
        "Renews for five years unless cancelled through a portal open one Tuesday per quarter.",
    },
    {
      id: "retrospective",
      prefix: "Retrospectively Approved",
      detail: () =>
        "The purchase order was raised after delivery to preserve the established sequence of events.",
    },
  ];

  const formatAmount = (value) =>
    window.ticketClickerNumberUnits.formatInline(
      window.ticketClickerNumberUnits.formatParts(value),
    );

  const effectKinds = [
    "click-flat",
    "passive-flat",
    "click-mult",
    "passive-mult",
  ];

  window.ticketClickerProcurementCatalog = procurementStories.flatMap(
    (story, storyIndex) =>
      procurementItems.map((item, itemIndex) => {
        const index = storyIndex * procurementItems.length + itemIndex;
        const kind = effectKinds[index % effectKinds.length];
        const isMultiplier = kind.endsWith("mult");
        const amount = isMultiplier
          ? 4.25 + index * 0.18
          : Math.pow(10, 12.5 + index * 0.19);
        const effect =
          kind === "click-flat"
            ? `+${formatAmount(amount)} tickets per click`
            : kind === "passive-flat"
              ? `+${formatAmount(amount)} tickets per second`
              : kind === "click-mult"
                ? `+${Math.round(amount * 100)}% click power`
                : `+${Math.round(amount * 100)}% automation output`;

        return {
          id: `proc_${story.id}_${item.id}`,
          name: `${story.prefix} ${item.name}`,
          description: `${effect}. ${story.detail(item.name.toLowerCase())}`,
          baseCost: Math.round(2e15 * Math.pow(1.55, index)),
          growth: 1.18 + (index % 9) * 0.01,
          kind,
          amount,
        };
      }),
  );
})();
